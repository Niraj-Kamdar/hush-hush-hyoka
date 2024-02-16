import { ChannelType, Client, GatewayIntentBits } from 'discord.js';
import { registerEvents } from './utils';
import Events from './events';
import Keys from './keys';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping
  ],
});

// registerEvents(client, Events);

client.login(Keys.clientToken)
  .catch((err) => {
    console.error('[Login Error]', err);
    process.exit(1);
  });

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.on('messageCreate', message => {
  // Prevent the bot from responding to its own messages
  if (message.author.bot) return;
  console.log(`Received Message: ${message.content}`);
  if (message.channel.type === ChannelType.DM) {
      console.log(`Received DM: ${message.content}`);
      // Respond to the DM
      message.reply('Thanks for your message!');
  } else {
      // This will now only reply in non-DM channels
      console.log(`Received Message: ${message.content}`);
      message.reply("Thanks you idiot!");
  }
});