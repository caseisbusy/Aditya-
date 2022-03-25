const client = require("../../index")

client.manager.on("nodeReconnect", node => {
			console.log(`Lavalink: Node ${node.options.identifier} reconnecting..`)
		})