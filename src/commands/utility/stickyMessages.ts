import type { ChatInputCommandInteraction, ModalActionRowComponentBuilder } from 'discord.js';
import { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import i18next from '../../i18n.ts';
import { getLanguage } from '../../util/general.ts';
import type { Command } from '../index.ts';

export default {
	data: new SlashCommandBuilder()
		.setName('sticky-message')
		.setDescription('Set a sticky message for a channel. That message will always be at the bottom of the channel.')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('set')
				.setDescription('Set the sticky message')
				.addChannelOption((option) =>
					option.setName('channel').setDescription('The channel to create the sticky message in'),
				)
				.addBooleanOption((option) =>
					option.setName('embed').setDescription('Whether or not to send the message as an embed'),
				),
		)
		.toJSON(),
	async execute(interaction: ChatInputCommandInteraction) {
		if (interaction.options.getSubcommand() === 'set') {
			const channel = interaction.options.getChannel('channel') ?? interaction.channel;
			const language = await getLanguage(interaction.guildId);
			const embed = interaction.options.getBoolean('embed') ?? false;
			const maxLength = embed ? 4_000 : 2_000;

			const modal = new ModalBuilder()
				.setCustomId('stickyMessage')
				.setTitle(i18next.t('stickyMessages.modal.title', { ns: 'utility', lng: language }));

			const message = new TextInputBuilder()
				.setCustomId('stickyMessage-message')
				.setLabel(i18next.t('stickyMessages.modal.label', { ns: 'utility', lng: language }))
				.setStyle(TextInputStyle.Paragraph)
				.setMaxLength(maxLength)
				.setPlaceholder(i18next.t('stickyMessages.modal.placeholder', { ns: 'utility', lng: language }))
				.setMinLength(1)
				.setRequired(true);

			modal.addComponents(new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(message));

			await interaction.showModal(modal);
		}
	},
} satisfies Command;
