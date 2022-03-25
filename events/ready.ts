const client = require("../index")

client.once("ready", () => {
	client.manager.init(client.user?.id)
	console.log(`${client.user.username} | ${client.user.tag} (${client.user.id}) \n Status: Ready \n Guilds: ${client.guilds.cache.size}`)
})