import type { GuildMemberRoleManager, UserFlagsBitField } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';
import i18next from '../../i18n.ts';
import { createEmbed, getBanner, getColor, getLanguage } from '../../util/general.ts';
import type { Command } from '../index.ts';

function handleFlags(flags: Readonly<UserFlagsBitField>, language: string) {
	const flagsArray = [];
	for (const [index, flag] of flags.toArray().entries()) {
		let addable = ', ';
		if (index === flags.toArray().length - 2) {
			addable = ' & ';
		}

		if (index === flags.toArray().length - 1) {
			addable = '';
		}

		flagsArray.push(i18next.t(`user.flag.${flag}`, { ns: 'info', lng: language }) + addable);
	}

	if (flagsArray.length === 0) return i18next.t('user.noFlags', { ns: 'info', lng: language });
	return flagsArray.join('');
}

function handleRoles(roles: GuildMemberRoleManager, language: string) {
	const rolesArray = [];
	const sortedRoles = Array.from(roles.cache.sort((a, b) => b.position - a.position).values());
	const everyoneIndex = sortedRoles.indexOf(roles.guild.roles.everyone);
	if (everyoneIndex > -1) sortedRoles.splice(everyoneIndex, 1);

	for (const role of sortedRoles) {
		if (role === roles.guild.roles.everyone) continue;

		let addable = ', ';
		const index = sortedRoles.indexOf(role);

		if (index === sortedRoles.length - 2) {
			addable = ' & ';
		}

		if (index === sortedRoles.length - 1) {
			addable = '';
		}

		rolesArray.push(role.toString() + addable);
	}

	if (rolesArray.length === 0) return i18next.t('user.noRoles', { ns: 'info', lng: language });
	return rolesArray.join('');
}

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
		const language = await getLanguage(interaction.guildId);
		const target = interaction.options.getUser('target') ?? interaction.user;
		await target.fetch();
		const fields = [];
		const seperator = '\n**❯** ';

		const general = [
			'',
			i18next.t('user.username', { ns: 'info', lng: language, username: target.tag }),
			i18next.t('user.id', { ns: 'info', lng: language, id: target.id }),
			i18next.t('user.flags', {
				ns: 'info',
				lng: language,
				flags: target.flags
					? handleFlags(target.flags, 'en')
					: i18next.t('user.noFlags', { ns: 'info', lng: language }),
			}),
		];
		if (target.createdTimestamp) {
			general.push(
				i18next.t('user.created', {
					ns: 'info',
					lng: language,
					date: `<t:${Math.round(target.createdTimestamp / 1_000)}:d>`,
					relative: `<t:${Math.round(target.createdTimestamp / 1_000)}:R>`,
				}),
			);
		}

		if (target.avatar) {
			general.push(
				i18next.t('user.avatar', { ns: 'info', lng: language }) +
					`[PNG](${target.avatarURL({ extension: 'png' })}) | [JPG](${target.avatarURL({
						extension: 'jpg',
					})}) | [WEBP](${target.avatarURL({ extension: 'webp' })})${
						target.avatar.startsWith('a_') ? ' | [GIF](' + target.avatarURL({ forceStatic: false }) + ')' : ''
					}`,
			);
		} else {
			general.push(i18next.t('user.avatar', { ns: 'info', lng: language }) + `[URL](${target.defaultAvatarURL})`);
		}

		fields.push({
			name: i18next.t('user.general', { ns: 'info', lng: language }),
			value: general.join(seperator),
		});

		const member = interaction.guild?.members.cache.get(target.id);
		if (member) {
			const server = [
				'',
				i18next.t('user.roles', {
					ns: 'info',
					lng: language,
					roles: handleRoles(member.roles, language) ?? i18next.t('user.noRoles', { ns: 'info', lng: language }),
				}),
			];

			if (member.roles.cache.size > 1) {
				server.push(i18next.t('user.topRole', { ns: 'info', lng: language, role: member.roles.highest.id }));
				if (member.roles.hoist)
					server.push(i18next.t('user.hoistRole', { ns: 'info', lng: language, role: member.roles.hoist.id }));
			}

			if (member.joinedTimestamp) {
				server.push(
					i18next.t('user.joined', {
						ns: 'info',
						lng: language,
						date: `<t:${Math.round(member.joinedTimestamp / 1_000)}:d>`,
						relative: `<t:${Math.round(member.joinedTimestamp / 1_000)}:R>`,
					}),
				);
			}

			if (
				!target.avatarURL({ extension: 'png' }) ??
				target.defaultAvatarURL === target.displayAvatarURL({ extension: 'png' })
			) {
				server.push(
					i18next.t('user.serverAvatar', { ns: 'info', lng: language }) +
						`[PNG](${target.displayAvatarURL({ extension: 'png', size: 4_096 })}) | [JPG](${target.displayAvatarURL({
							extension: 'jpg',
							size: 4_096,
						})}) | [WEBP](${target.displayAvatarURL({ extension: 'webp', size: 4_096 })})${
							target.displayAvatarURL().startsWith('a_')
								? ' | [GIF](' + target.avatarURL({ extension: 'gif', forceStatic: false, size: 4_096 }) + ')'
								: ''
						}`,
				);
			}

			fields.push({
				name: i18next.t('user.server', { ns: 'info', lng: language }),
				value: server.join(seperator),
			});
		}

		const embed = createEmbed({
			title: i18next.t('user.title', { ns: 'info', lng: language, user: target.displayName }),
			description: i18next.t('user.embedDescription', { ns: 'info', lng: language, user: target.id }),
			color: await getColor(interaction.guildId, target.id, interaction.client),
			fields,
			thumbnail: target.displayAvatarURL(),
			image: (await getBanner(target.id)) ?? target.bannerURL({ size: 512 }),
		});
		await interaction.reply({ embeds: [embed] });
	},
} satisfies Command;