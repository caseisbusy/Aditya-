const express = require("express")

 function server({ port }) {
	let webServer = express()
	webServer.get("/", (request, response) => response.send("Server is up"))
	webServer.listen(port, (/*Add stuff if needed*/) => console.log(`Server is up and running on port ${port}`))
}

module.exports = {
	server
}