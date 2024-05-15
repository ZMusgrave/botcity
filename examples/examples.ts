/*

String, Integer, Number and Boolean options all accept primitive values of their associated type.
Integer only accepts whole numbers.
Number accepts both whole numbers and decimals.
User, Channel, Role and Mentionable options will show a selection list in the Discord interface for their associated type, or will accept a Snowflake (id) as input.
Attachment options prompt the user to make an upload along with the slash command.
Subcommand and SubcommandGroup options allow you to have branching pathways of subsequent options for your commands - more on that later on this page.

---Add Options Example---

.addBooleanOption(option =>
	option.setName('ephemeral')
		.setDescription('Whether or not the echo should be ephemeral'));

---Sub command example---

.addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('server')
			.setDescription('Info about the server'));

---Edited Response example---

const wait = require('node:timers/promises').setTimeout;

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
		await wait(2_000);
		await interaction.editReply('Pong again!');
	}
});

---Deferred Response Example---

const wait = require('node:timers/promises').setTimeout;

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.deferReply();
		await wait(4_000);
		await interaction.editReply('Pong!');
	}
});
*/
