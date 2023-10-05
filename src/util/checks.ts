import type { Client } from 'discord.js';
import config from '../../config.ts';

export function isDev(client: Client, id: string) {
	return config.devs.includes(id);
}
