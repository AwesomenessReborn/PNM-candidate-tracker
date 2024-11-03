import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const feedbackListenerBot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ], 
});

feedbackListenerBot.on('ready', () => {
    console.log(`done... logged in as ${feedbackListenerBot.user?.tag}`);
}); 

feedbackListenerBot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('PNM:')) {
        const [pnmLine, reasonLine] = message.content.split('\n');
        const pnm = pnmLine.replace('PNM: ', '').trim();
        const reason = reasonLine.replace('Reason: ', '').trim();

        try {
            await axios.post('http://localhost:3000/api/feedback', {
                pnm,
                reason,
                author: message.author.username
            });
            message.channel.send('Feedback recorded successfully.');
        } catch (error) {
            // handle error in updating information 

            // TODO prompt for more information or bad formatting
            console.error(error);
            message.channel.send('Failed to record feedback.');
        }
    }
});

feedbackListenerBot.login(process.env.DISCORD_TOKEN);
