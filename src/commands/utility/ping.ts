import {
  SlashCommandBuilder,
  CommandInteraction,
  ChannelType,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with your input!')
  .addStringOption((option) =>
    option
      .setName('input')
      .setDescription('The input to echo back')
      // Ensure the text will fit in an embed description, if the user chooses that option
      .setMaxLength(2_000)
  )
  .addChannelOption((option) =>
    option
      .setName('channel')
      .setDescription('The channel to echo into')
      // Ensure the user can only select a TextChannel for output
      .addChannelTypes(ChannelType.GuildText)
  )
  .addBooleanOption((option) =>
    option
      .setName('embed')
      .setDescription('Whether or not the echo should be embedded')
  );

async function execute(interaction: CommandInteraction) {
  await interaction.reply(
    `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
  );
}

const cooldown = 5;

export { data, execute, cooldown };
