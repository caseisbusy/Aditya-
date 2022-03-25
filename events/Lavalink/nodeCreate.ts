const client = require("../../index")
client.manager.on("nodeCreate", node => {
       console.log(`Lavalink: Node ${node.options.identifier} created `)    
		})