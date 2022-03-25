const client = require("../../index")
const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js")

client.manager.on("trackStart", async(player, track, payload) => {
	const embed = new MessageEmbed()
    .setAuthor({ name: `Playing: ${track.author} - ${track.title}` })
		.addFields(
			{
			name: "Requester",
			value: `${track.requester.tag}`,
			inline: true
		},
			{
				name: "Author",
				value: `${track.author}`,
				inline: true
			},
			{
				name: "Volume",
				value: `${player.volume}/150`,
				inline: true
			}
)
	let Button1 = new MessageButton()
	.setCustomId("lowervolume")
	.setEmoji("🔉")
	.setStyle("SECONDARY")
	let Button2 = new MessageButton()
	.setCustomId("highervolume")
	.setEmoji("🔊")
	.setStyle("SECONDARY")
	const row = new MessageActionRow()
	.addComponents(Button1)
	const row2 = new MessageActionRow()
	.addComponents(Button2)

	let playing = await client.channels.cache.get(player.textChannel).send({
		embeds: embed,
		components: [row, row2]
	})
	player.setNowplayingMessage(playing)

	const embed2 = new MessageEmbed()
	.setTimestamp()
	const colletor = playing.createMessageComponentCollector({
		filter: (filt) => {
			if(filt.guild.me.voice.channel && filt.guild.me.voice.channelId === filt.member.voice.channel) { 
			return true;
		} else {
				filt.reply({ content: "You must be in a voice channel", ephemeral: true }) return false
		}
	}
	time: track.duration,
	})
	collector.on("collect" async interaction => {
			await interaction.deferReply({
				ephemeral: true
			});
		if(interaction.customId === "lowervolume") {
			if(!player) return interaction.editReply({ content: "There is no song playing" })
			let volume = Number(player.volume) - 10
			await player.setVolume(volume)
			const e = new MessageEmbed()
			.setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true })})
			.setDescription(`🔉 Volume now set to: **${volume}**`)
			interaction.editReply({ embeds: [e] })
		} else if(interaction.customId === "highervolume") {
			if(!player) return interaction.editReply({ content: "There is no song playing" })
			  let amount = Number(player.volume) + 10;
				const er = new MessageEmbed()
			.setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`Volume cannot be higher than 150`)
			if (amount >= 150) return interaction.editReply({ embeds: [er] })
      await player.setVolume(amount)
			const e = new MessageEmbed()
			.setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true })})
			.setDescription(`🔉 Volume now set to: **${volume}**`)
			interaction.editReply({ embeds: [e] })
		}
	})
})