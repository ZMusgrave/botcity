import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

async function execute(interaction: CommandInteraction) {
  await interaction.reply(
    `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
  );
}

const cooldown = 5;

export { data, execute, cooldown };
