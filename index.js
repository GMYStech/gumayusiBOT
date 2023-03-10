const {
  Client,
  ChannelType,
  GatewayIntentBits,
  Collection,
} = require('discord.js')
const { serverInfo } = require('./lib/serverInfo.js')
const { showComponent, replayChampionInfoURL } = require('./lib/utils.js')
const {
  CreateRoomButtonBuilder,
  GumaButtonsBuilder,
  MemberLimitSetModalBuilder,
  RoomSettingButtonsBuilder,

  ReNameModalBuilder,
  SetRoomNameModalBuilder,
  ChampionBuildSearchModalBuilder,
  ChampionMatchUpSearchModalBuilder,
  JumpPointBuilder,
  OpggModalBuilder,
} = require('./lib/customBuilder.js')
const fs = require('node:fs')
const path = require('node:path')
const dotenv = require('dotenv')
dotenv.config()
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
})
client.commands = new Collection()

const createChannels = []
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

const updateCreateChannels = async () => {
  const channel = await client.channels.fetch(
    serverInfo[0].createRoomCategory,
    {
      type: 'Category',
    }
  )
  const textChannels = channel.children.cache.filter(
    (child) =>
      child.id !== '1057885109367361647' && child.type === ChannelType.GuildText
  )

  textChannels.forEach((tc) => {
    const vcId = tc.topic
    const vc = channel.children.cache.find((child) => child.id === vcId)
    createChannels.push({ vc, tc })
  })
  console.log('-----------------------')
  createChannels.forEach((channel) => {
    const { vc, tc } = channel
    console.log({
      vc: { name: vc.name, id: vc.id },
      tc: { name: tc.name, id: tc.id },
    })
  })
  console.log('-----------------------')
}

client.on('ready', async (client) => {
  console.log(`==== Logged in: ${client.user.tag} ====`)
  console.log('--------ready---------')
  await updateCreateChannels()
})
//?????????????????????Hi!????????????

client.on('messageCreate', async (message) => {
  console.log(`??? [${message.author.tag}] ${message.content}`)
  if (message.mentions.users.has(client.user.id)) {
    message.reply('??????????????????')
  }
  const server = serverInfo.find(
    (server) => server.guildId === message.guild.id
  )
  if (!message.member) return
  if (message.system || message.member.user.bot === true) {
    console.log('?????????????????????bot??????????????????')
    return
  }

  const { channel } = message
  if (message.content.startsWith('!dl') && message.guild) {
    const messages = await channel.messages.fetch({ limit: 100 })
    const mentionMembers = await message.mentions.members.map((m) => m.user.id)
    const mentionFilter = await messages.filter((msg) =>
      mentionMembers.some((userID) => userID === msg.author.id)
    )
    await channel.send({
      content: `<@${mentionMembers}>?????????100???????????????????????????????????????`,
      ephemeral: true,
    })
    channel.bulkDelete(mentionFilter) // ??????????????????????????????????????????
  }

  if (message.content === '9192631770') {
    const members = await message.guild.members.fetch() // ???????????????????????????
    await members.map(async (member) => {
      await member.roles.add('1049170550758576248')
      await channel.send(`${member.displayName}?????????`)
    })
  }

  if (message.content === 'jumpPoint') {
    const buttons = JumpPointBuilder()
    await showComponent(channel, buttons, '????????????')
  }

  if (message.content === 'createRoomButton') {
    const CreateRoomButton = CreateRoomButtonBuilder()
    await showComponent(
      channel,
      CreateRoomButton,
      '?????????????????????????????????????????????'
    )
  }

  if (message.content === 'createGumaButton') {
    const { buttons, tierList } = GumaButtonsBuilder()
    await showComponent(
      channel,
      buttons,
      '??????????????????????????????????????????????????????????????????'
    )
    await showComponent(
      channel,
      tierList,
      '?????????????????????????????????????????????????????????????????????'
    )
  }
  if (serverInfo.some((server) => server.guildId === message.guild.id)) {
    if (serverInfo.some((server) => server.sleepText === message.channelId)) {
      const server = serverInfo.find(
        (server) => server.guildId === message.guild.id
      )
      const sleepText = message.guild.channels.cache.get(server.sleepText)
      const memberChk = message.mentions.members.size !== 1
      const member = await message.mentions.members.first()
      const sleepMember = await message.mentions.members.map((m) => m.user.id)
      console.log(`${member}`)
      switch (message.content) {
        case `<@${sleepMember}>`:
          if (!member.voice.channel) {
            return sleepText.send('????????????VC??????????????????')
          }
          const sleepChannel = message.guild.channels.cache.get(server.sleepVc)

          await member.voice.setChannel(sleepChannel)
          return sleepText.send(`${member}????????????????????????????????????`)
      }
    }
  }
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  if (serverInfo.some((server) => server.guildId === newState.guild.id)) {
    if (
      createChannels.some((channel) => channel.vc.id === oldState.channelId)
    ) {
      const newVCId = oldState.channel.id
      const isChangeChannel =
        oldState.channelId !== undefined && newState.channelId !== undefined
      if (isChangeChannel) {
        const channelset = createChannels.find((channelset) => {
          if (channelset.vc) {
            return channelset.vc.id === newVCId
          }
        })
        if (channelset) {
          if (channelset.vc.members.size === 0) {
            await channelset.vc.delete()
            await channelset.tc.delete()

            createChannels.forEach((channels, i) => {
              if (!channels.vc) {
                channels.tc.delete()
              } else if (!channels.tc) {
                channels.vc.delete()
              }
            })
            await updateCreateChannels()
          }
        } else {
          throw new Error(
            `channel move : channelset not found.  notFoundVCID: ${newVCId}`
          )
        }
      }
    }
  }
  if (createChannels.some((channel) => channel.vc.id === oldState.channelId)) {
    const isLeaveChannel =
      oldState.channelId !== undefined && newState.channelId === undefined
    if (isLeaveChannel) {
      const newVCId = oldState.channel.id
      const channelset = createChannels.find((channelset) => {
        if (channelset.vc) {
          return channelset.vc.id === newVCId
        }
      })

      if (channelset) {
        if (channelset.vc.members.size === 0) {
          await channelset.vc.delete()
          await channelset.tc.delete()
          createChannels.forEach((channels, i) => {
            if (!channels.vc) {
              channels.tc.delete()
            } else if (!channels.tc) {
              channels.vc.delete()
            }
          })
          await updateCreateChannels()
        }
      } else {
        throw new Error(
          `channel leave : channelset not found. notFoundVCID: ${newVCId}`
        )
      }
    }
  }
})

client.on('interactionCreate', async (interaction) => {
  const server = serverInfo.find(
    (server) => server.guildId === interaction.guild.id
  )

  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    }
  }

  if (interaction.customId === 'ReNameModal') {
    const modal = ReNameModalBuilder()
    await interaction.showModal(modal) // 5
  }
  if (interaction.customId === 'ReNameModalFom') {
    const TCId = interaction.channel.id

    const channelset = createChannels.find((channelset) => {
      return channelset.tc.id === TCId
    })
    const value = interaction.fields.getTextInputValue('roomReName')
    try {
      await channelset.vc.setName(value)
      await channelset.tc.setName(value)
    } catch (er) {
      console.log(er)
    }
    await updateCreateChannels()
    interaction.reply({
      content: '?????????????????????????????????',
      ephemeral: true,
    })
    return
  }
  if (interaction.customId === 'memberLimitSet') {
    const modal = MemberLimitSetModalBuilder()
    await interaction.showModal(modal)
  }
  if (interaction.customId === 'memberLimitSetFom') {
    const TCId = interaction.channel.id
    const value = interaction.fields.getTextInputValue('setLimit')
    const channelset = createChannels.find(
      (channelset) => channelset.tc.id === TCId
    )
    await channelset.vc.setUserLimit(value)
    interaction.reply({
      content: '????????????????????????????????????',
      ephemeral: true,
    })
  }
  if (interaction.customId === 'roomButton') {
    const modal = SetRoomNameModalBuilder()
    await interaction.showModal(modal) // 5
  }
  if (interaction.customId === 'RoomButtonFom') {
    const value = interaction.fields.getTextInputValue('roomName')
    const newVc = await interaction.guild.channels.create({
      name: `${value}`,
      type: ChannelType.GuildVoice,
      parent: server.createRoomCategory,
    })
    const newTc = await interaction.guild.channels.create({
      name: `${value}`,
      type: ChannelType.GuildText,
      parent: server.createRoomCategory,
    })

    await newTc.setTopic(newVc.id)
    interaction.reply({
      content: '??????????????????',
      ephemeral: true,
    })
    createChannels.push({ vc: newVc, tc: newTc })
    const roomSettingButtons = RoomSettingButtonsBuilder()
    await showComponent(
      newTc,
      roomSettingButtons,
      `${interaction.member}\n??????????????????????????????????????????????????????\n?????????????????????10????????????????????????????????????????????????????????????10?????????????????????????????????`
    )
  }
  if (interaction.customId === 'buildButton') {
    const championBuildSearchModal = ChampionBuildSearchModalBuilder()
    await interaction.showModal(championBuildSearchModal) // 5
  }
  if (interaction.customId === 'buildButtonFom') {
    const searchChampionName =
      interaction.fields.getTextInputValue('searchChampionName')

    replayChampionInfoURL(interaction, 'build', searchChampionName)
  }
  if (interaction.customId === 'matchUpButton') {
    const modal = ChampionMatchUpSearchModalBuilder()
    await interaction.showModal(modal) // 5
  }
  if (interaction.customId === 'matchupButtonFom') {
    const searchChampionName = interaction.fields.getTextInputValue(
      'matchUpSearchChampionName'
    )

    replayChampionInfoURL(interaction, 'counters', searchChampionName)
    return
  }

  if (interaction.customId === 'opggButton') {
    const opggModal = OpggModalBuilder()
    await interaction.showModal(opggModal)
  }

  if (interaction.customId === 'opggButtonFom') {
    const searchSamonerName =
      interaction.fields.getTextInputValue('samonerName')

    interaction.reply({
      content: `${searchSamonerName}?????????????????????\n https://www.op.gg/summoners/jp/${searchSamonerName}`,
      ephemeral: true,
    })
  }
})

client.on('error', async (error) => {
  const errorChannel = await client.channels.fetch('1059064447827722302')
  console.error(error)
  errorChannel.send(`Erorr: ${error.message}`)
})

client.login(process.env.DISCORD_BOT_TOKEN)
