import type { APIEmbedField } from 'discord.js';
import type config from '../../config.ts';

export type EmbedOptions = {
	color: number | keyof typeof config.colors;
	description?: string;
	emoji?: keyof typeof config.emojis;
	fields?: APIEmbedField[];
	image?: string | null;
	thumbnail?: string;
	title: string;
};
