import fs from 'node:fs';
import { ClientWithCommands } from '../types/client';
import path from 'node:path';
import { fileURLToPath } from 'url';

import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

export default async function Bot() {
  let client = new Client({
    intents: [GatewayIntentBits.Guilds],
  }) as ClientWithCommands;

  client.commands = new Collection();

  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const foldersPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);

    client = await loadCommands(commandsPath, client);
  }

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const commandClient = interaction.client as ClientWithCommands;

    const command = commandClient.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
    console.log(interaction);
  });

  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  });

  const token = process.env.TOKEN;

  client.login(token);
}

async function loadCommands(commandsPath: string, client: ClientWithCommands) {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }

  return client;
}