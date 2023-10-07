import { API } from '@discordjs/core/http-only';
import { REST } from 'discord.js';
import i18next from '../i18n.ts';
import { isDev } from '../util/checks.ts';
import { createEmbed, getLanguage } from '../util/general.ts';
import { loadCommands } from '../util/loaders.ts';
import type { Command } from './index.ts';

export default {
	data: {
		name: 'sync',
		description: 'Sync application commands with Discord',
	},
	async execute(interaction) {
		const language = getLanguage(interaction.guildId);

		if (!isDev(interaction.client, interaction.user.id)) {
			const embed = createEmbed({
				color: 'red',
				description: i18next.t('checks.devOnly.title', { ns: 'errors', lng: language }),
				emoji: 'error',
				title: i18next.t('checks.devOnly.title', { ns: 'errors', lng: language }),
			});
			await interaction.reply({ embeds: [embed], ephemeral: true });
			return;
		}

		const commands = await loadCommands(Bun.pathToFileURL(import.meta.dir));
		const commandData = [...commands.values()].map((command) => command.data);

		const rest = new REST({ version: '10' }).setToken(Bun.env.DISCORD_TOKEN!);
		const api = new API(rest);

		const result = await api.applicationCommands.bulkOverwriteGlobalCommands(Bun.env.APPLICATION_ID!, commandData);

		await interaction.reply({ content: `Successfully registered ${result.length} commands.` });
	},
} satisfies Command;
