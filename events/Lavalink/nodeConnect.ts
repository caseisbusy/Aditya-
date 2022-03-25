const client = require("../../index")

client.manager.on("nodeConnect", node => {
        console.log(`Lavalink: Node ${node.options.identifier} connected`)
})