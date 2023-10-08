import i18next from '../../i18n.ts';
import { createEmbed, getLanguage } from '../../util/general.ts';
import type { Command } from '../index.ts';

export default {
	data: {
		name: 'ping',
		description: 'Ping the bot',
	},
	async execute(interaction) {
		const ping = interaction.client.ws.ping;
		const language = await getLanguage(interaction.guildId);

		const embed = createEmbed({
			color: ping < 200 ? 'green' : ping < 400 ? 'yellow' : 'red',
			title: i18next.t('ping.title', { ns: 'info', lng: language }),
			emoji: 'ping',
			description: i18next.t('ping.response', { ns: 'info', lng: language, latency: ping }),
		});
		await interaction.reply({ embeds: [embed] });
	},
} satisfies Command;
