import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { Player } from 'discord-player';

const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Allows posting songs for youtube or spotify')
  .addStringOption((option) =>
    option
      .setName('music')
      .setDescription('Where the music will play from Spotify Or Youtube')
      .setRequired(true)
      .addChoices(
        {
          name: 'Spotify',
          value: 'spotify',
        },
        {
          name: 'Youtube',
          value: 'youtube',
        }
      )
  );

async function execute(interaction: CommandInteraction) {
  const player = new Player(interaction.client);

  await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

  player.events.on('playerStart', (queue, track) => {
    // we will later define queue.metadata object while creating the queue
    queue.metadata.channel.send(`Started playing **${track.title}**!`);
  });

  player.on('error', (error) => {
    console.log(`Error emitted from the queue: ${error.message}`);
  });

  await interaction.reply(
    `Play Request Received, your song is currently #3 in the queue`
  );
}

const cooldown = 5;

export { data, execute, cooldown };
