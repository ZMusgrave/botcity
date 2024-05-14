import { Events, Client } from 'discord.js';
import { ReadyEvent } from 'types/event';

async function execute(client: Client) {
  console.log(`Ready! Logged in as ${client?.user?.tag}`);
}

const event: ReadyEvent = {
  name: Events.ClientReady,
  once: true,
  execute,
};

export { event };
