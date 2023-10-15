import type { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';
import Uwuifier from 'uwuifier';
import i18next from '../../i18n.ts';
import { slashCommandTranslator } from '../../util/general.ts';
import type { Command } from '../index.ts';

export default {
	data: new SlashCommandBuilder()
		.setName(i18next.t('uwuify.name', { ns: 'misc' }))
		.setNameLocalizations(slashCommandTranslator('uwuify.name', 'misc'))
		.setDescription(i18next.t('uwuify.description', { ns: 'misc' }))
		.addStringOption((option) =>
			option
				.setName(i18next.t('uwuify.options.message.name', { ns: 'misc' }))
				.setNameLocalizations(slashCommandTranslator('uwuify.options.message.name', 'misc'))
				.setDescription(i18next.t('uwuify.options.message.description', { ns: 'misc' }))
				.setDescriptionLocalizations(slashCommandTranslator('uwuify.options.message.description', 'misc'))
				.setRequired(true),
		)
		.addNumberOption((option) =>
			option
				.setName(i18next.t('uwuify.options.stutters.name', { ns: 'misc' }))
				.setNameLocalizations(slashCommandTranslator('uwuify.options.stutters.name', 'misc'))
				.setDescription(i18next.t('uwuify.options.stutters.description', { ns: 'misc' }))
				.setDescriptionLocalizations(slashCommandTranslator('uwuify.options.stutters.description', 'misc')),
		)
		.addNumberOption((option) =>
			option
				.setName(i18next.t('uwuify.options.faces.name', { ns: 'misc' }))
				.setNameLocalizations(slashCommandTranslator('uwuify.options.faces.name', 'misc'))
				.setDescription(i18next.t('uwuify.options.faces.description', { ns: 'misc' }))
				.setDescriptionLocalizations(slashCommandTranslator('uwuify.options.faces.description', 'misc')),
		)
		.addNumberOption((option) =>
			option
				.setName(i18next.t('uwuify.options.actions.name', { ns: 'misc' }))
				.setNameLocalizations(slashCommandTranslator('uwuify.options.actions.name', 'misc'))
				.setDescription(i18next.t('uwuify.options.actions.description', { ns: 'misc' }))
				.setDescriptionLocalizations(slashCommandTranslator('uwuify.options.actions.description', 'misc')),
		)
		.addNumberOption((option) =>
			option
				.setName(i18next.t('uwuify.options.exclamations.name', { ns: 'misc' }))
				.setNameLocalizations(slashCommandTranslator('uwuify.options.exclamations.name', 'misc'))
				.setDescription(i18next.t('uwuify.options.exclamations.description', { ns: 'misc' }))
				.setDescriptionLocalizations(slashCommandTranslator('uwuify.options.exclamations.description', 'misc')),
		)
		.toJSON(),
	async execute(interaction: ChatInputCommandInteraction) {
		const message = interaction.options.getString(i18next.t('uwuify.options.message.name', { ns: 'misc' })) ?? '';
		const stutters = interaction.options.getNumber(i18next.t('uwuify.options.stutters.name', { ns: 'misc' })) ?? 10;
		const faces = interaction.options.getNumber(i18next.t('uwuify.options.faces.name', { ns: 'misc' })) ?? 0;
		const actions = interaction.options.getNumber(i18next.t('uwuify.options.actions.name', { ns: 'misc' })) ?? 5;
		const exclamations =
			interaction.options.getNumber(i18next.t('uwuify.options.exclamations.name', { ns: 'misc' })) ?? 25;

		const uwuifier = new Uwuifier({
			spaces: {
				stutters: stutters / 100,
				faces: faces / 100,
				actions: actions / 100,
			},
			exclamations: exclamations / 100,
		});
		uwuifier.actions = uwuifier.actions.map((action) => action.replaceAll('*', '***'));

		await interaction.reply({ content: uwuifier.uwuifySentence(message).replace('-', '~') });
	},
} satisfies Command;
