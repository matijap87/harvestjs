const discordClient = require('./discordClient.js')
const dates = require('./dates.js')

async function send(messages) {
  const greetingSent = await sendGreetingMessage()
  if (!greetingSent.status) {
    return greetingSent
  }

  return await discordClient.sendMessageToDiscord({message: messages.join("\n")})
}

async function sendGreetingMessage() {
  const userId = process.env.NODE_ENV === 'prod' ? process.env.PROD_USER_ID : process.env.DEV_USER_ID

  return await discordClient.sendMessageToDiscord({message: `<@${userId}>, kejsovi za mesec ${dates.getCurrentMonthDate()} za <@${process.env.DISCORD_USER_ID}>`})
}

module.exports = {
  send
}
