import { ApplicationCommandOptionType, REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
const commands = [
    {
        name: "get-records",
        description: "Get records matching the title",
        options: [
            {
                name: "title",
                description: "title of the record",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: "create-record",
        description: "create a Record",
        options: [
            {
                name: "title",
                description: "title of record",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "description",
                description: "description of record",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "assigned_to",
                description: "assign record to user",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: "status",
                description: "set record status",
                type: ApplicationCommandOptionType.String,
                required: false
            }
        ]
    }
];
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log("registering slash commands...");
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        console.log("Slash commands were registers successfully");
    }
    catch (error) {
        console.log(error.message);
    }
})();
