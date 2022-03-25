const client = require("../../index")
	
client.manager.on("nodeDisconnect", node => {
console.log(`Lavalink: Node ${node.options.identifier} disconnected`)
})