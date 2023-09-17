import i18next from '../i18n.ts';
import type { Command } from './index.ts';

export default {
	data: {
		name: 'ping',
		description: 'Ping the bot',
	},
	async execute(interaction) {
		await interaction.reply(i18next.t("ping.response", { latency: "100", lng: "en" }));
	},
} satisfies Command;
