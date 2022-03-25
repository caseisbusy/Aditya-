module.exports = {
	name: "test",
	run: async(client, interaction, args) => {
		interaction.followUp({ content: "SlashCommands are working" })
	}
}