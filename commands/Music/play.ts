const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "play",

	run: async(client, message, args) => {
		if(!message.member.voice.channel) return message.reply({ content: "You must be in a voice channel" })
 if(!message.guild.me.permissionsIn(message.member.voice.channel).has(["CONNECT", "SPEAK"])) return message.reply({ content: `I need \`CONNECT\` and \`SPEAK\` Permissions To Use This Command` })

if(!message.guild.me.permissions.has(["CONNECT", "SPEAK"])) return message.reply({ content: `I need \`CONNECT\` and \`SPEAK\` Permissions To Use This Command` })

	try {
		let player = client.manager.get(message.guild.id)
		if(!player) {
			player = client.manager.create({
				guild: message.guild.id,
				voiceChannel: message.member.voice.channel.id,
				textChannel: message.channel.id,
				volume: 80,
				selfDeafen: true
			})
			if(player && player.state !== "CONNECTED") {
				player.connect()
			}			
		}
		const song = args.join(" ")
		let search = await player.search(song, message.author)
		switch (search.loadType) {
			case "TRACK_LOADED":
				player.queue.add(search.tracks[0])
				if(!player.playing) { 
					player.play()
				  message.reply({ content: `now playing ${search.tracks[0]}` })
				}
				break;
			case "SEARCH_RESULT": 
				let tracks = search.tracks;
				player.queue.add(search.tracks[0])
				if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) { 
					await player.play()
					message.reply({ content: `now playing ${search.tracks[0]}` })
}
		}
	 } catch(err) {
		return message.reply({ content:`${err}`/*) "No results found"*/ })
	 }
	}
}