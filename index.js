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

client.on('ready', async (client) => {
  console.log(`==== Logged in: ${client.user.tag} ====`)
  const channel = await client.channels.fetch('1045530787723874347', {
    type: 'Category',
  })
  const textChannels = channel.children.cache.filter(
    (child) =>
      child.name !== 'createchannel' && child.type === ChannelType.GuildText
  )

  textChannels.forEach((tc) => {
    const vcId = tc.topic
    const vc = channel.children.cache.find((child) => child.id === vcId)
    createChannels.push({ vc, tc })
  })
})
//メンションに「Hi!」と返信

client.on('messageCreate', async (message) => {
  console.log(`▶ [${message.author.tag}] ${message.content}`)
  if (message.mentions.users.has(client.user.id)) {
    message.reply('ぐまゆしです')
  }
  const server = serverInfo.find((server) => server.guildId == message.guild.id)
  if (!message.member) return
  if (message.system || message.member.user.bot == true) {
    console.log('システムまたはbotのメッセージ')
    return
  }

  const { channel } = message
  if (message.content.startsWith(`!dl`) && message.guild) {
    const messages = await channel.messages.fetch({ limit: 100 })
    const mentionMembers = await message.mentions.members.map((m) => m.user.id)
    const mentionFilter = await messages.filter((msg) =>
      mentionMembers.some((userID) => userID == msg.author.id)
    )
    await channel.send({
      content: `<@${mentionMembers}>の直近100件のメッセージを消しました`,
      ephemeral: true,
    })
    channel.bulkDelete(mentionFilter) // それらのメッセージを一括削除
  }

  if (message.content === '9192631770') {
    const members = await message.guild.members.fetch() // メンバーを全員取得
    await members.map(async (member) => {
      await member.roles.add('1049170550758576248')
      await channel.send(`${member.displayName}に付与`)
    })
  }

  if (message.content === 'jumpPoint') {
    const buttons = JumpPointBuilder()
    await showComponent(channel, buttons, '飛べるよ')
  }

  if (message.content === 'createRoomButton') {
    const CreateRoomButton = CreateRoomButtonBuilder()
    await showComponent(
      channel,
      CreateRoomButton,
      'ボタンを押せば部屋が作られるよ'
    )
  }

  if (message.content === 'createGumaButton') {
    const { buttons, tierList } = GumaButtonsBuilder()
    await showComponent(
      channel,
      buttons,
      '下のボタンから利用したい機能を選んでください'
    )
    await showComponent(
      channel,
      tierList,
      'ティアリストを見たい方はこちらで選んでください'
    )
  }
  if (serverInfo.some((server) => server.guildId == message.guild.id)) {
    if (serverInfo.some((server) => server.sleepText == message.channelId)) {
      const server = serverInfo.find(
        (server) => server.guildId == message.guild.id
      )
      const memberChk = message.mentions.members.size !== 1
      const member = await message.mentions.members.first()
      const sleepMember = await message.mentions.members.map((m) => m.user.id)
      console.log(`${member}`)
      switch (message.content) {
        case 'n!s':
          return channel.send('メンバーを1人指定して！')
          break
        case `<@${sleepMember}>`:
          if (!member.voice.channel) {
            return channel.send('この人はVCに居ないよ？')
          }
          const channel = message.guild.channels.cache.get(server.sleepVc)
          await member.voice.setChannel(channel)
          return channel.send(`${member}を寝落ち部屋に送ったよ！`)
          break
      }
    }
  }
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  if (serverInfo.some((server) => server.guildId == newState.guild.id)) {
    const isChangeChannel =
      oldState.channelId != undefined && newState.channelId != undefined
    if (isChangeChannel) {
      const newVCId = oldState.channel.id
      const channelset = createChannels.find(
        (channelset) => channelset.vc.id === newVCId
      )

      if (channelset.vc.members.size === 0) {
        await channelset.vc.delete()
        await channelset.tc.delete()
      }
    }
    const isLeaveChannel =
      oldState.channelId != undefined && newState.channelId == undefined
    if (isLeaveChannel) {
      const newVCId = oldState.channel.id
      const channelset = createChannels.find(
        (channelset) => channelset.vc.id === newVCId
      )

      if (channelset.vc.members.size === 0) {
        await channelset.vc.delete()
        await channelset.tc.delete()
      }
    }
  }
})

client.on('interactionCreate', async (interaction) => {
  const server = serverInfo.find(
    (server) => server.guildId == interaction.guild.id
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
  if (interaction.customId == 'ReNameModalFom') {
    const TCId = interaction.channel.id

    const channelsetIndex = createChannels.findIndex((channelset) => {
      return channelset.tc.id === TCId
    })
    const value = interaction.fields.getTextInputValue('roomReName')
    let newVc
    let newTc
    try {
      newVc = await createChannels[channelsetIndex].vc.setName(value)
      newTc = await createChannels[channelsetIndex].tc.setName(value)
    } catch (er) {
      console.log(er)
    }
    createChannels[channelsetIndex].vc = newVc
    createChannels[channelsetIndex].tc = newTc
    interaction.reply({
      content: '名前の変更をしました。',
      ephemeral: true,
    })
    return
  }
  if (interaction.customId == 'memberLimitSet') {
    const modal = MemberLimitSetModalBuilder()
    await interaction.showModal(modal) // 5
  }
  if (interaction.customId == 'memberLimitSetFom') {
    const nowVc = interaction.member.voice.channel
    const value = interaction.fields.getTextInputValue('setLimit')
    await nowVc.setUserLimit(value)
    interaction.reply({
      content: '人数上限を変更しました。',
      ephemeral: true,
    })
  }
  if (interaction.customId == 'roomButton') {
    const modal = SetRoomNameModalBuilder()
    await interaction.showModal(modal) // 5
  }
  if (interaction.customId == 'RoomButtonFom') {
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
      content: '生成しました',
      ephemeral: true,
    })
    createChannels.push({ vc: newVc, tc: newTc })
    const roomSettingButtons = RoomSettingButtonsBuilder()
    await showComponent(
      newTc,
      roomSettingButtons,
      `${interaction.member}\n以下のボタンから操作を選んでください`
    )
  }
  if (interaction.customId == 'buildButton') {
    const championBuildSearchModal = ChampionBuildSearchModalBuilder()
    await interaction.showModal(championBuildSearchModal) // 5
  }
  if (interaction.customId == 'buildButtonFom') {
    const searchChampionName =
      interaction.fields.getTextInputValue('searchChampionName')

    replayChampionInfoURL(interaction, 'build', searchChampionName)
  }
  if (interaction.customId == 'matchUpButton') {
    const modal = ChampionMatchUpSearchModalBuilder()
    await interaction.showModal(modal) // 5
  }
  if (interaction.customId == 'matchupButtonFom') {
    const searchChampionName = interaction.fields.getTextInputValue(
      'matchUpSearchChampionName'
    )

    replayChampionInfoURL(interaction, 'counters', searchChampionName)
    return
  }

  if (interaction.customId == 'opggButton') {
    const opggModal = OpggModalBuilder()
    await interaction.showModal(opggModal)
  }

  if (interaction.customId == 'opggButtonFom') {
    const searchSamonerName =
      interaction.fields.getTextInputValue('samonerName')

    interaction.reply({
      content: `${searchSamonerName}の情報ですね？\n https://www.op.gg/summoners/jp/${searchSamonerName}`,
      ephemeral: true,
    })
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
