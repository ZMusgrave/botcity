import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Provides information about the server');

async function execute(interaction: CommandInteraction) {
  // interaction.guild is the object representing the Guild in which the command was run
  await interaction.reply(
    `This server is ${interaction?.guild?.name} and has ${interaction?.guild?.memberCount} members.`
  );
}

const cooldown = 5;

export { data, execute, cooldown };
