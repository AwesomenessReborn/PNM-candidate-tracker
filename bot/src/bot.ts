import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const feedbackListenerBot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Required to read message content
    ]
});

feedbackListenerBot.once('ready', () => {
    console.log(`Bot is online as ${feedbackListenerBot.user?.tag}`);
});

feedbackListenerBot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Check if the message has a feedback format
    // TODO need to fix this pattern, currently does not work 
    /**
     * NOTE
     * first one works, but it requires a single order. 
     * 
     * second one does not work at all. 
     */
    // const feedbackPattern = /^PNM:\s*(.+?)\nReason:\s*(.+)(?:\nSeverity:\s*(-?\d+))?(?:\nRelease:\s*(true|false))?$/i;
    const feedbackPattern = /^PNM:\s*(.+?)\n(?=.*\bReason:\s*(.+))(?:(?:Severity:\s*(-?\d+))|(?:Release:\s*(true|false))|\s*)*$/i;

    const match = message.content.match(feedbackPattern);

    if (match) {
        const [ , pnm, details, severityString, releaseString ] = match;
        
        // Assign values based on the parsed message content
        const feedbackData = {
            pnm,
            details,
            assignee: message.author.id,  // Discord ID of the user who posted
            severity: severityString ? parseInt(severityString, 10) : 0,  // Default to 0 if not provided
            release: releaseString === 'true',  // Default to false if not provided
            date: new Date().toISOString()  // Auto-populated current date
        };

        try {
            // Send feedback to the Express server
            await axios.post('http://localhost:3000/api/feedback', feedbackData);
            message.channel.send(`Feedback for ${pnm} recorded successfully.`);
        } catch (error) {
            console.error('Error sending feedback:', error);
            message.channel.send('Failed to record feedback.');
        }
    }
});

feedbackListenerBot.login(process.env.DISCORD_TOKEN);
