import { URL } from 'node:url';
import { Client, GatewayIntentBits } from 'discord.js';
import { loadCommands, loadEvents } from './util/loaders.ts';
import { registerEvents } from './util/registerEvents.ts';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const events = await loadEvents(new URL('events/', import.meta.url));
const commands = await loadCommands(new URL('commands/', import.meta.url));

registerEvents(commands, events, client);

void client.login(Bun.env.DISCORD_TOKEN);
