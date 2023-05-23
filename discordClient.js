const Discord = require('discord.js')

const { Client, Intents, GuildMessages } = require('discord.js')
const client = new Client({
  intents: []
})

client.on('ready', async () => {
  console.log(`logged in as ${client.user.tag}`)
})

async function getChannel() {
  return await client.channels.fetch(getChannelId())
}

function getChannelId() {
  return process.env.NODE_ENV === 'prod' ? process.env.PROD_CHANNEL_ID : process.env.DEV_CHANNEL_ID
}

async function sendMessageToDiscord(payload) {
  const channel = await getChannel()
  try {
    await channel.send({content: payload.message})
    return {status: true}
  } catch (err) {
    return {status: false, message: err.rawError.message}
  }
}

module.exports = {
  sendMessageToDiscord
}

client.login(process.env.DISCORD_BOT_TOKEN)