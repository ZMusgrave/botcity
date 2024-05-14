import { Events, Client } from 'discord.js';

interface ReadyEvent {
  name: typeof Events.ClientReady;
  once: boolean;
  execute: (client: Client) => void;
}

export { ReadyEvent };
