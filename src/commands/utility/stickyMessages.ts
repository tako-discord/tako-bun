import type { ChatInputCommandInteraction, ModalActionRowComponentBuilder } from 'discord.js';
import { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import i18next from '../../i18n.ts';
import { getLanguage, slashCommandTranslator } from '../../util/general.ts';
import type { Command } from '../index.ts';

export default {
	data: new SlashCommandBuilder()
		.setName(i18next.t('stickyMessages.name', { ns: 'utility' }))
		.setNameLocalizations(slashCommandTranslator('stickyMessages.name', 'utility'))
		.setDescription(i18next.t('stickyMessages.description', { ns: 'utility' }))
		.setDescriptionLocalizations(slashCommandTranslator('stickyMessages.description', 'utility'))
		.addSubcommand((subcommand) =>
			subcommand
				.setName(i18next.t('stickyMessages.set.name', { ns: 'utility' }))
				.setNameLocalizations(slashCommandTranslator('stickyMessages.set.name', 'utility'))
				.setDescription(i18next.t('stickyMessages.set.description', { ns: 'utility' }))
				.setDescriptionLocalizations(slashCommandTranslator('stickyMessages.set.description', 'utility'))
				.addChannelOption((option) =>
					option
						.setName(i18next.t('stickyMessages.set.options.channel.name', { ns: 'utility' }))
						.setNameLocalizations(slashCommandTranslator('stickyMessages.set.options.channel.name', 'utility'))
						.setDescription(i18next.t('stickyMessages.set.options.channel.description', { ns: 'utility' }))
						.setDescriptionLocalizations(
							slashCommandTranslator('stickyMessages.set.options.channel.description', 'utility'),
						),
				)
				.addBooleanOption((option) =>
					option
						.setName(i18next.t('stickyMessages.set.options.embed.name', { ns: 'utility' }))
						.setNameLocalizations(slashCommandTranslator('stickyMessages.set.options.embed.name', 'utility'))
						.setDescription(i18next.t('stickyMessages.set.options.embed.description', { ns: 'utility' }))
						.setDescriptionLocalizations(
							slashCommandTranslator('stickyMessages.set.options.embed.description', 'utility'),
						),
				),
		)
		.toJSON(),
	async execute(interaction: ChatInputCommandInteraction) {
		if (interaction.options.getSubcommand() === 'set') {
			const channel = interaction.options.getChannel('channel') ?? interaction.channel;
			const language = await getLanguage(interaction.guildId, interaction.user.id);
			const embed = interaction.options.getBoolean('embed') ?? false;
			const maxLength = embed ? 4_000 : 2_000;

			const modal = new ModalBuilder()
				.setCustomId('stickyMessage')
				.setTitle(i18next.t('stickyMessages.set.modal.title', { ns: 'utility', lng: language }));

			const message = new TextInputBuilder()
				.setCustomId('stickyMessage-message')
				.setLabel(i18next.t('stickyMessages.set.modal.label', { ns: 'utility', lng: language }))
				.setStyle(TextInputStyle.Paragraph)
				.setMaxLength(maxLength)
				.setPlaceholder(i18next.t('stickyMessages.set.modal.placeholder', { ns: 'utility', lng: language }))
				.setMinLength(1)
				.setRequired(true);

			modal.addComponents(new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(message));

			await interaction.showModal(modal);
		}
	},
} satisfies Command;
