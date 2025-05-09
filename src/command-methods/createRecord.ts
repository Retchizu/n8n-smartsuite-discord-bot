import axios from "axios";
import { CacheType, ChatInputCommandInteraction, CommandInteractionOptionResolver } from "discord.js";

export const createRecord = async (options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused">, interaction: ChatInputCommandInteraction<CacheType>, commandName: string) => {
  const fieldInput = {
    recordTitle: options.get("title", true),
    description: options.get("description", true),
    assigned_to: options.get("assigned_to", true),
    status: options.get("status", false),
  }
  await interaction.deferReply();
  const webhookUrl = "https://isaax.app.n8n.cloud/webhook-test/discord-command";
  try {
    const n8nResponse = await axios.get(webhookUrl, {
      params: {
        commandName,
        fieldInput
      }
    })
    await interaction.editReply(n8nResponse.data.message);
  } catch (error) {
    await interaction.editReply("Failed to create record in SmartSuite.");
  }
}
