import process from 'node:process';
import { URL } from 'node:url';
import { API } from '@discordjs/core/http-only';
import { REST } from 'discord.js';
import { isDev } from '../util/checks.ts';
import { loadCommands } from '../util/loaders.ts';
import type { Command } from './index.ts';

export default {
	data: {
		name: 'sync',
		description: 'Sync application commands with Discord',
	},
	async execute(interaction) {
		// eslint-disable-next-line no-warning-comments
		// TODO: Find out, why client.application is undefined
		const dev = isDev(interaction.client, interaction.user.id).toString();
		await interaction.reply({ content: dev, ephemeral: true });
	},
} satisfies Command;
