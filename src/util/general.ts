import type { APIEmbedField } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import config from '../../config.ts';

type EmbedOptions = {
	color: keyof typeof config.colors;
	description?: string;
	emoji?: keyof typeof config.emojis;
	fields?: APIEmbedField[];
	title: string;
};

export function createEmbed({ color = 'primary', description, emoji, fields, title }: EmbedOptions) {
	const embed = new EmbedBuilder()
		.setColor(config.colors[color])
		.setTitle(`${emoji ? config.emojis[emoji] : ''} ${title}`);

	if (description) embed.setDescription(description);
	if (fields) embed.setFields(fields);

	return embed;
}
