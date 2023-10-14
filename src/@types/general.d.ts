import type { APIEmbedField } from 'discord.js';
import config from '../../config.ts';

const emojis = config.emojis;
type baseEmojis = Exclude<keyof typeof config.emojis, 'pagination'>;
type paginationEmojis = keyof (typeof config.emojis)['pagination'];

export type EmbedOptions = {
	color: number | keyof typeof config.colors;
	description?: string;
	emoji?: (typeof config.emojis.pagination)[paginationEmojis] | (typeof config.emojis)[baseEmojis];
	fields?: APIEmbedField[];
	image?: string | null;
	thumbnail?: string;
	title: string;
};
