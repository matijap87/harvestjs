const Discord = require('discord.js')

const srLocale = require('date-fns/locale/sr-Latn');

const { Client, Intents, GuildMessages } = require('discord.js')
const dateFns = require('date-fns');
const client = new Client({
  intents: [
    ]
})

client.on('ready', async () => {
  console.log(`logged in as ${client.user.tag}`)
})
function getChanneldId() {
  return process.env.NODE_ENV === 'prod' ? process.env.PROD_CHANNEL_ID : process.env.DEV_CHANNEL_ID
}
async function getChannel() {
  return await client.channels.fetch(getChanneldId())
}

async function send(messages) {
  await sendGreetingMessage()
  await sendToDiscord(messages)
}

async function sendGreetingMessage() {
  const channel = await getChannel()
  const month = dateFns.format(new Date, 'LLLL', {locale: srLocale})

  const userId = process.env.NODE_ENV === 'prod' ? process.env.PROD_USER_ID : process.env.DEV_USER_ID

  channel.send({content: `<@${userId}>, kejsovi za mesec ${month}`})
}

async function sendToDiscord(messages) {
  const channel = await getChannel()
  messages.forEach(content => channel.send({content}))
}

module.exports = {
  send
}

client.login(process.env.DISCORD_BOT_TOKEN)