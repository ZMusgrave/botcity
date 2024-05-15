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

/*
Sub command example

.addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('server')
			.setDescription('Info about the server'));
*/
