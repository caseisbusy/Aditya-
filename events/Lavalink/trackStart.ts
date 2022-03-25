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
	
})