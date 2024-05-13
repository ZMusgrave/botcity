import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export interface CommandData {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
