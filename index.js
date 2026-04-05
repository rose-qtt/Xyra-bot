require('dotenv').config();
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {

  // Bot apne messages ignore kare
  if (message.author.bot) return;

  // 🏓 Ping command
  if (message.content === '!ping') {
    message.reply('Pong 🏓');
  }

  // 🔨 Ban command
  if (message.content.startsWith('!ban')) {

    // Permission check
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply("❌ Tumhe permission nahi hai!");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("⚠️ Kisi user ko mention karo ban karne ke liye!");
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply("User server me nahi mila!");
    }

    await member.ban();
    message.channel.send(`🔨 ${user.tag} ko ban kar diya gaya!`);
  }

});

client.login(process.env.TOKEN);