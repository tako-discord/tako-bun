import i18next from '../i18n.ts';
import { createEmbed } from '../util/general.ts';
import type { Command } from './index.ts';

export default {
	data: {
		name: 'ping',
		description: 'Ping the bot',
	},
	async execute(interaction) {
		const ping = interaction.client.ws.ping;

		const embed = createEmbed({
			color: ping < 200 ? 'green' : ping < 400 ? 'yellow' : 'red',
			title: i18next.t('info:ping.title'),
			emoji: 'ping',
			description: i18next.t('info:ping.response', { latency: ping }),
		});
		await interaction.reply({ embeds: [embed] });
	},
} satisfies Command;
