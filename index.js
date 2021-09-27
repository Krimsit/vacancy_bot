const { Client, Intents } = require("discord.js")
const dotenv = require("dotenv")
var cron = require("node-cron")
const http = require("http")

const push_to = require("./push_to.js")
const channels = require("./channels.json")

dotenv.config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once("ready", async () => {
    console.log("Ready!")
    cron.schedule(
        "0 10 * * *",
        () => {
            for (channel in channels) {
                const channel_room = client.channels.cache.get(channels[channel])
                push_to[channel](channel_room)
            }
            console.log("New vacancies uploaded")
        },
        {
            timezone: "Europe/Moscow",
        }
    )
})

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return

    const { commandName } = interaction

    if (commandName === "ping") {
        interaction.reply("Pong")
    }
})

client.login(process.env.TOKEN)

http.createServer().listen(process.env.PORT || 8080, (err) => {
    if (err) {
        console.error(err)
    } else {
    }
})
