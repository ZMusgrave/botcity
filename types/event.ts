import { Events, Client, Interaction } from 'discord.js';

interface ReadyEvent {
  name: typeof Events.ClientReady;
  once: boolean;
  execute: (client: Client) => void;
}

interface InteractionCreate {
  name: typeof Events.InteractionCreate;
  once: boolean;
  execute: (interaction: Interaction) => void;
}

export { ReadyEvent, InteractionCreate };
