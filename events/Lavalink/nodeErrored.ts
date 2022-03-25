const client = require("../../index")
	
client.manager.on("nodeError", (node, error) => {
console.log(`Lavalink: Node ${node.options.identifier} had an error: ${error.message}`)
})