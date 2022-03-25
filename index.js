const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

const client = new Client({
	intents: 32767,
	presence: {
		status: "idle"
	}
})

module.exports = client;

/*global.exports = client;*/ //You can use this if you client to be global and you wont have to require client, this might break your code

require("./handlers/")(client)

client.configuration = require("./config.json")
client.slashCommands = new Collection()
client.commands = new Collection()

client.login(client.configuration.token)

const { Manager } = require("erela.js")

client.manager = new Manager({
	nodes: [{
		host: "lava.link", //lavalink.darrennathanael.com for more hosts
		port: 80,
		password: "yourpassword" //NOTE: your password has to be the same as the password in application.yml
	}],
	autoPlay: true,
	send(id, payload) {
		const guild = client.guilds.cache.get(id)
		if(guild) { 
			guild.shard.send(payload)
		}
	}
})


client.setMaxListeners(25);
require('events').defaultMaxListeners = 25;

const { server } = require("./server.ts")
server({ port: 3000 })

console.log("Everything is ready")