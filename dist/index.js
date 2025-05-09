import { Client, IntentsBitField } from "discord.js";
import dotenv from "dotenv";
import { getRecords } from "./command-methods/getRecords.js";
dotenv.config();
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});
client.on("ready", (c) => {
    console.log(`${c.user.username} is online.`);
});
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const { commandName, options } = interaction;
    switch (commandName) {
        case "get-records":
            getRecords(options, interaction, commandName);
            break;
        default: break;
    }
});
client.login(process.env.DISCORD_TOKEN);
