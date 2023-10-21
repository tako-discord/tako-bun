import { SlashCommandBuilder } from 'discord.js';
import config from '../../../config.ts';
import type { UrbanDictionaryResponse } from '../../@types/info.d.ts';
import i18next from '../../i18n.ts';
import { getLanguage, slashCommandTranslator } from '../../util/general.ts';
import type { Command } from '../index.ts';

export default {
	data: new SlashCommandBuilder()
		.setName(i18next.t('urban.name', { ns: 'info' }))
		.setNameLocalizations(slashCommandTranslator('urban.name', 'info'))
		.setDescription(i18next.t('urban.description', { ns: 'info' }))
		.setDescriptionLocalizations(slashCommandTranslator('urban.description', 'info'))
		.addStringOption((option) =>
			option
				.setName(i18next.t('urban.options.term.name', { ns: 'info' }))
				.setNameLocalizations(slashCommandTranslator('urban.options.term.name', 'info'))
				.setDescription(i18next.t('urban.options.term.description', { ns: 'info' }))
				.setDescriptionLocalizations(slashCommandTranslator('urban.options.term.description', 'info'))
				.setRequired(true)
				.setAutocomplete(true),
		)
		.addBooleanOption((option) =>
			option
				.setName(i18next.t('urban.options.strict.name', { ns: 'info' }))
				.setNameLocalizations(slashCommandTranslator('urban.options.strict.name', 'info'))
				.setDescription(i18next.t('urban.options.strict.description', { ns: 'info' }))
				.setDescriptionLocalizations(slashCommandTranslator('urban.options.strict.description', 'info')),
		)
		.addBooleanOption((option) =>
			option
				.setName(i18next.t('urban.options.matchCase.name', { ns: 'info' }))
				.setNameLocalizations(slashCommandTranslator('urban.options.matchCase.name', 'info'))
				.setDescription(i18next.t('urban.options.matchCase.description', { ns: 'info' }))
				.setDescriptionLocalizations(slashCommandTranslator('urban.options.matchCase.description', 'info')),
		)
		.toJSON(),
	async execute(interaction) {
		await interaction.reply({ content: 'Not implemented yet' });
	},
	async autocomplete(interaction) {
		const term = interaction.options.getFocused();
		const url = `${config.apis.urban}/search?term=${encodeURIComponent(term)}&limit=25`;

		const options = [];

		const response = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		let body: UrbanDictionaryResponse | null = null;
		try {
			body = await response.json();
		} catch {}

		if (!body) {
			await interaction.respond([]);
			return;
		}

		if (body.statusCode !== 200) {
			await interaction.respond([]);
			return;
		}

		for (const definition of body.data) {
			options.push({
				name: `${definition.word} (${definition.contributor})`,
				value: `${term} urbanApiDataIndex=${body.data.indexOf(definition)}`,
			});
		}

		await interaction.respond(options.slice(0, 25));
	},
} satisfies Command;
