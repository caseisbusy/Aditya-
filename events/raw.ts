const client = require("../index")
client.on("raw", (p) => {
	  client.manager?.updateVoiceState(p);
})