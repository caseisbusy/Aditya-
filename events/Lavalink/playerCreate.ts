const client = require("../../index")

client.manager.on("playerCreate", (player, guild) => {
  console.log(`Lavalink: A play for the guild: ${player.guild} was created`)
})