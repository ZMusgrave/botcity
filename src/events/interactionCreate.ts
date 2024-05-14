import { Events, Interaction } from 'discord.js';
import { InteractionCreate } from 'types/event';
import { ClientWithCommands } from 'types/client';

async function execute(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  const commandClient = interaction.client as ClientWithCommands;

  const command = commandClient.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
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
}

const event: InteractionCreate = {
  name: Events.InteractionCreate,
  once: false,
  execute,
};

export { event };
