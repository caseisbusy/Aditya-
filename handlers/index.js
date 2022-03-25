const { promisify } = require("util")
const { glob } = require("glob")
const promise = promisify(glob)

module.exports = async client => {
	const files = await promise(`${process.cwd()}/commands/**/*.ts`)
	files.map(v => {
		const splitContent = v.split("/")
		const dir = splitContent[splitContent.length - 2]
		const perFile = require(v)
    if(perFile.name) {
			client.commands.set(perFile.name, { dir, ...perFile })
	 }
	})
	 const slash = await promise(`${process.cwd()}/slashCommands.*/*.ts`);
    const array = [];
    slash.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        array.push(file);
    });
client.on("ready", async () => {
	await client.guilds.cache.get("880768504024944650").commands.set(array)
   // await client.application.commands.set(array);
  })
	    const event = await promise(`${process.cwd()}/events/*.ts`);
    event.map((v) => require(v));

	  const lavaLink = await promise(`${process.cwd()}/events/Lavalink/*.ts`);
	lavaLink.map(v => require(v))

}