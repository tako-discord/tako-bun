import { readdir } from 'node:fs/promises';
import { API } from '@discordjs/core/http-only';
import { REST } from 'discord.js';
import i18next from '../../i18n.js';
import { isDev } from '../../util/checks.js';
import { createEmbed, getLanguage } from '../../util/general.js';
import { loadCommands } from '../../util/loaders.js';
import type { Command } from '../index.js';

export default {
	data: {
		name: 'sync',
		description: 'Sync application commands with Discord',
	},
	async execute(interaction) {
		const language = await getLanguage(interaction.guildId);

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

		const commands = [];
		const commandData = [];

		for (const dir of (await readdir(`${import.meta.dir}/commands`, { withFileTypes: true }))
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name)) {
			commands.push(await loadCommands(Bun.pathToFileURL(`${import.meta.dir}/commands/${dir}`)));
		}

		for (const command of commands) {
			for (const cmd of [...command.values()].map((command) => command.data)) {
				commandData.push(cmd);
			}
		}

		const rest = new REST({ version: '10' }).setToken(Bun.env.DISCORD_TOKEN!);
		const api = new API(rest);

		const result = await api.applicationCommands.bulkOverwriteGlobalCommands(Bun.env.APPLICATION_ID!, commandData);

		await interaction.reply({ content: `Successfully registered ${result.length} commands.` });
	},
} satisfies Command;
