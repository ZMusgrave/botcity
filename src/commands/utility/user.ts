import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Provides information about the user.');

async function execute(interaction: CommandInteraction) {
  // interaction.user is the object representing the User who ran the command
  // interaction.member is the GuildMember object, which represents the user in the specific guild
  await interaction.reply(
    `This command was run by ${interaction.user.username}, who joined on ${interaction?.user?.createdAt}.`
  );
}

const cooldown = 5;

export { data, execute, cooldown };
