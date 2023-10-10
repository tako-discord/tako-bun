import { SlashCommandBuilder } from 'discord.js';
import { userInfo } from '../../util/info.ts';
import type { Command } from '../index.ts';

export default {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about anything')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('user')
				.setDescription('Get info about a user or yourself')
				.addUserOption((option) =>
					option.setName('target').setDescription('The user to get the info from').setRequired(false),
				),
		)
		.toJSON(),
	async execute(interaction) {
		const target = interaction.options.getUser('target') ?? interaction.user;
		await userInfo(interaction, target);
	},
} satisfies Command;
