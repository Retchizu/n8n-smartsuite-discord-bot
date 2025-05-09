import axios from "axios";
import { CacheType, ChatInputCommandInteraction, CommandInteractionOptionResolver } from "discord.js"

export const getRecords = async (options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">, interaction: ChatInputCommandInteraction<CacheType>, commandName: string) => {
  const recordTitle = options.get("title", true);
  await interaction.deferReply();

  const webhookUrl = "https://isaax.app.n8n.cloud/webhook-test/get-record";
  try {
    const n8nResponse = await axios.get(webhookUrl, {
      params: {
        commandName,
        recordTitle,
      }
    });
    await interaction.editReply(n8nResponse.data.message);
  } catch (error) {
    await interaction.editReply("Failed to send task to SmartSuite.");
  }

}
