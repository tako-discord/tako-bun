import type { Client } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import config from '../../config.ts';
import type { EmbedOptions } from '../@types/general';
import prisma from '../database.ts';

export function createEmbed({ color = 'primary', description, emoji, fields, image, thumbnail, title }: EmbedOptions) {
	const embed = new EmbedBuilder()
		.setColor(typeof color === 'string' ? config.colors[color] : color)
		.setTitle(`${emoji ? config.emojis[emoji] + ' ' : ''}${title}`);

	if (description) embed.setDescription(description);
	if (fields) embed.setFields(fields);
	if (thumbnail) embed.setThumbnail(thumbnail);
	if (image) embed.setImage(image);

	return embed;
}

export async function getColor(guildId: string | null, userId?: string, client?: Client) {
	let color = config.colors.primary;
	if (guildId) {
		const guild = await prisma.guild.findFirst({ where: { id: guildId } });
		if (guild?.color) color = guild.color;
	}

	if (userId) {
		const user = await prisma.user.findFirst({ where: { id: userId } });

		if (!user?.color && client) {
			const user = await client.users.fetch(userId, { force: true });
			if (user) color = user.accentColor ?? color;
			return color;
		}

		color = user?.color ?? color;
	}

	return color;
}

export async function getLanguage(guildId: string | null) {
	let language = 'en';
	if (guildId) {
		const guild = await prisma.guild.findFirst({ where: { id: guildId } });
		if (guild?.language) language = guild.language;
	}

	return language;
}

export async function getBanner(userId: string) {
	const user = await prisma.user.findFirst({ where: { id: userId } });
	return user?.background;
}
