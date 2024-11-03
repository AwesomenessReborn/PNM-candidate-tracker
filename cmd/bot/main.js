const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('messageCreate', async (message) => {
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
            console.error(error);
            message.channel.send('Failed to record feedback.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
