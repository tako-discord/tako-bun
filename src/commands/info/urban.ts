import { SlashCommandBuilder } from 'discord.js';
import i18next from '../../i18n.ts';
import { slashCommandTranslator } from '../../util/general.ts';
import type { Command } from '../index.ts';

export default {
	data: new SlashCommandBuilder()
		.setName(i18next.t('urban.name', { ns: 'info' }))
		.setNameLocalizations(slashCommandTranslator('urban.name', 'info'))
		.setDescription(i18next.t('urban.description', { ns: 'info' }))
		.setDescriptionLocalizations(slashCommandTranslator('urban.description', 'info'))
		.toJSON(),
	async execute(interaction) {
		await interaction.reply({ content: 'Not implemented yet' });
	},
} satisfies Command;
