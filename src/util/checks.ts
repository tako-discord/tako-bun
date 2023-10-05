import type { Client } from 'discord.js';
import { User } from 'discord.js';
import { log } from './logger';

export function isDev(client: Client, id: string) {
	const owner = client.application?.owner;
	log.debug(client.application);
	log.debug(owner);
	if (owner === null || owner === undefined) return false;
	if (owner instanceof User) {
		return owner.id === id;
	}

	log.debug(owner.members.some((member) => member.user.id === id));
	return owner.members.some((member) => member.user.id === id);
}
