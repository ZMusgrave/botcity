import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { Player } from 'discord-player';

const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Allows posting songs for youtube or spotify');

async function execute(interaction: CommandInteraction) {
  const player = new Player(interaction.client);
  console.log(player);
  await interaction.reply(
    `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
  );
}

const cooldown = 5;

export { data, execute, cooldown };
