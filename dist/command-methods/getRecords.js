import axios from "axios";
export const getRecords = async (options, interaction, commandName) => {
    const recordTitle = options.get("title", true);
    await interaction.deferReply();
    const webhookUrl = "https://isaax.app.n8n.cloud/webhook-test/discord-command";
    try {
        const n8nResponse = await axios.get(webhookUrl, {
            params: {
                commandName,
                recordTitle,
            }
        });
        await interaction.editReply(n8nResponse.data.message);
    }
    catch (error) {
        await interaction.editReply("Failed to get records in SmartSuite.");
    }
};
