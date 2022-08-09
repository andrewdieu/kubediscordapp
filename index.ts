import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import mongoose from 'mongoose'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import 'dotenv/config'
import testSchema from './test-schema'


const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
})

client.on('ready', async () => {
    await mongoose.connect(process.env.MONGO_URI || '', 
    {
        keepAlive: true,
    })

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['982194960487034910'],
        // mongoUri: process.env.MONGO_URI,
    })

    setTimeout(async () => {
        await new testSchema({
            message: 'hello world',
        }).save()
    }, 1000)
})

client.login(process.env.TOKEN)