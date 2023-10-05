import process from 'node:process';
import { URL } from 'node:url';
import { API } from '@discordjs/core/http-only';
import { REST } from 'discord.js';
import i18next from '../i18n.ts';
import { isDev } from '../util/checks.ts';
import { createEmbed } from '../util/general.ts';
import { loadCommands } from '../util/loaders.ts';
import type { Command } from './index.ts';

export default {
	data: {
		name: 'sync',
		description: 'Sync application commands with Discord',
	},
	async execute(interaction) {
		if (!isDev(interaction.client, interaction.user.id)) {
			const embed = createEmbed({
				color: 'red',
				description: i18next.t('errors:checks.devOnly.title'),
				emoji: 'error',
				title: i18next.t('errors:checks.devOnly.title'),
			});
			await interaction.reply({ embeds: [embed], ephemeral: true });
		}
	},
} satisfies Command;
