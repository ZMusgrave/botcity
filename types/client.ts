import { Collection, Client } from 'discord.js';

export interface ClientWithCommands extends Client {
  commands: Collection<string, any>;
}
