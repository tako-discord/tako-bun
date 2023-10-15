import { SlashCommandBuilder } from 'discord.js';
import i18next from '../../i18n.ts';
import { slashCommandTranslator } from '../../util/general.ts';
import { userInfo } from '../../util/info.ts';
import type { Command } from '../index.ts';

export default {
	data: new SlashCommandBuilder()
		.setName(i18next.t('info.name', { ns: 'info' }))
		.setNameLocalizations(slashCommandTranslator('info.name', 'info'))
		.setDescription(i18next.t('info.description', { ns: 'info' }))
		.setDescriptionLocalizations(slashCommandTranslator('info.description', 'info'))
		.addSubcommand((subcommand) =>
			subcommand
				.setName(i18next.t('info.user.name', { ns: 'info' }))
				.setNameLocalizations(slashCommandTranslator('info.user.name', 'info'))
				.setDescription(i18next.t('info.user.description', { ns: 'info' }))
				.setDescriptionLocalizations(slashCommandTranslator('info.user.description', 'info'))
				.addUserOption((option) =>
					option
						.setName(i18next.t('info.user.options.user.name', { ns: 'info' }))
						.setNameLocalizations(slashCommandTranslator('info.user.options.user.name', 'info'))
						.setDescription(i18next.t('info.user.options.user.description', { ns: 'info' }))
						.setDescriptionLocalizations(slashCommandTranslator('info.user.options.user.description', 'info'))
						.setRequired(false),
				),
		)
		.toJSON(),
	async execute(interaction) {
		const target =
			interaction.options.getUser(i18next.t('info.user.options.user.name', { ns: 'info' })) ?? interaction.user;
		await userInfo(interaction, target);
	},
} satisfies Command;
