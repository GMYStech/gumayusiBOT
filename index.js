const {
  Client,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  GatewayIntentBits,
  TextInputBuilder,
} = require("discord.js");
const { serverInfo } = require("./lib/serverInfo.js");
const { showComponent, replayChampionInfoURL } = require("./lib/utils.js");
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
} = require("./lib/customBuilder.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on("ready", () => {
  console.log(`==== Logged in: ${client.user.tag} ====`);
});
//メンションに「Hi!」と返信

client.on("messageCreate", async (message) => {
  console.log(`▶ [${message.author.tag}] ${message.content}`);
  if (message.mentions.users.has(client.user.id)) {
    message.reply("ぐまゆしです");
  }
  const server = serverInfo.find(
    (server) => server.guildId == message.guild.id
  );
  if (!message.member) return;
  if (message.system || message.member.user.bot == true) {
    console.log("システムまたはbotのメッセージ");
    return;
  }

  const { channel } = message;
  if (message.content.startsWith(`!dl`) && message.guild) {
    const messages = await channel.messages.fetch({ limit: 100 });
    const mentionMembers = await message.mentions.members.map((m) => m.user.id);
    const mentionFilter = await messages.filter((msg) =>
      mentionMembers.some((userID) => userID == msg.author.id)
    );
    await channel.send({
      content: `<@${mentionMembers}>の直近100件のメッセージを消しました`,
      ephemeral: true,
    });
    channel.bulkDelete(mentionFilter); // それらのメッセージを一括削除
  }

  const msgFunc = () => {};

  if (message.content === "9192631770") {
    const members = await message.guild.members.fetch(); // メンバーを全員取得
    await members.map(async (member) => {
      await member.roles.add("1049170550758576248");
      await channel.send(`${member.displayName}に付与`);
    });
  }

  if (message.content === "jumpPoint") {
    const buttons = JumpPointBuilder();
    await showComponent(channel, buttons, "飛べるよ");
  }

  if (message.content === "createRoomButton") {
    const CreateRoomButton = CreateRoomButtonBuilder();
    await showComponent(
      channel,
      CreateRoomButton,
      "ボタンを押せば部屋が作られるよ"
    );
  }

  if (message.content === "createGumaButton") {
    const { buttons, tierList } = GumaButtonsBuilder();
    await showComponent(
      channel,
      buttons,
      "下のボタンから利用したい機能を選んでください"
    );
    await showComponent(
      channel,
      tierList,
      "ティアリストを見たい方はこちらで選んでください"
    );
  }
  if (serverInfo.some((server) => server.guildId == message.guild.id)) {
    if (serverInfo.some((server) => server.sleepText == message.channelId)) {
      const server = serverInfo.find(
        (server) => server.guildId == message.guild.id
      );
      const memberChk = message.mentions.members.size !== 1;
      const member = await message.mentions.members.first();
      const sleepMember = await message.mentions.members.map((m) => m.user.id);
      console.log(`${member}`);
      switch (message.content) {
        case "n!s":
          return channel.send("メンバーを1人指定して！");
          break;
        case `<@${sleepMember}>`:
          if (!member.voice.channel) {
            return channel.send("この人はVCに居ないよ？");
          }
          const channel = message.guild.channels.cache.get(server.sleepVc);
          await member.voice.setChannel(channel);
          return channel.send(`${member}を寝落ち部屋に送ったよ！`);
          break;
      }
    }
  }
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  if (serverInfo.some((server) => server.guildId == newState.guild.id)) {
    const server = serverInfo.find(
      (server) => server.guildId == newState.guild.id
    );

    const isChangeChannel =
      oldState.channelId != undefined && newState.channelId != undefined;
    if (isChangeChannel) {
      const chId = oldState.channel.id;
      const newTc = oldState.guild.channels.cache.find(
        (channel) => channel.topic === `${chId}`
      );

      await oldState.channel.parent.children.cache.map(async (channel) => {
        if (
          channel.id != server.createRoom &&
          channel.type === ChannelType.GuildVoice &&
          channel.members.size === 0
        ) {
          await newTc.delete();
          await channel.delete();
        }
      });
    }
    const isLeaveChannel =
      oldState.channelId != undefined && newState.channelId == undefined;
    if (isLeaveChannel) {
      if (
        serverInfo.some(
          (server) => server.createRoomCategory == oldState.channel.parentId
        )
      ) {
        const chId = oldState.channel.id;

        const newTc = oldState.guild.channels.cache.find(
          (channel) => channel.topic === `${chId}`
        );

        await oldState.channel.parent.children.cache.map(async (channel) => {
          if (
            channel.id != server.createRoom &&
            channel.type == ChannelType.GuildVoice &&
            channel.members.size == 0
          ) {
            await newTc.delete();
            await channel.delete();
          }
        });
      }
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  const server = serverInfo.find(
    (server) => server.guildId == interaction.guild.id
  );
  if (interaction.customId === "ReNameModal") {
    const modal = ReNameModalBuilder();
    await interaction.showModal(modal); // 5
  }
  if (interaction.customId == "ReNameModalFom") {
    const nowVc = interaction.member.voice.channel;

    if (interaction.channel.parentId == server.createRoomCategory) {
      if (
        interaction.channel.members.some((x) => x.id == interaction.member.id)
      ) {
        const value = interaction.fields.getTextInputValue("roomReName");
        await interaction.channel.setName(value);
        await nowVc.setName(value);

        interaction.reply({
          content: "部屋名を変更しました。",
          ephemeral: true,
        });
        return;
      } else {
        return await interaction.reply({
          content: "VCに入らないと設定できないよ。",
          ephemeral: true,
        });
      }
    }
  }
  if (interaction.customId == "memberLimitSet") {
    const modal = MemberLimitSetModalBuilder();
    await interaction.showModal(modal); // 5
  }
  if (interaction.customId == "memberLimitSetFom") {
    const nowVc = interaction.member.voice.channel;
    const value = interaction.fields.getTextInputValue("setLimit");
    await nowVc.setUserLimit(value);
    interaction.reply({
      content: "人数上限を変更しました。",
      ephemeral: true,
    });
  }
  if (interaction.customId == "roomButton") {
    const modal = SetRoomNameModalBuilder();
    await interaction.showModal(modal); // 5
  }
  if (interaction.customId == "RoomButtonFom") {
    const value = interaction.fields.getTextInputValue("roomName");
    let newVc = await interaction.guild.channels.create({
      name: `${value}`,
      type: ChannelType.GuildVoice,
      parent: server.createRoomCategory,
    });
    const newTc = await interaction.guild.channels.create({
      name: `${value}`,
      type: ChannelType.GuildText,
      parent: server.createRoomCategory,
    });
    await newTc.setTopic(newVc.id);
    interaction.reply({
      content: "生成しました",
      ephemeral: true,
    });
    const roomSettingButtons = RoomSettingButtonsBuilder();
    await showComponent(
      newTc,
      roomSettingButtons,
      `${interaction.member}\n以下のボタンから操作を選んでください`
    );
  }
  if (interaction.customId == "buildButton") {
    const championBuildSearchModal = ChampionBuildSearchModalBuilder();
    await interaction.showModal(championBuildSearchModal); // 5
  }
  if (interaction.customId == "buildButtonFom") {
    const searchChampionName =
      interaction.fields.getTextInputValue("searchChampionName");

    replayChampionInfoURL(interaction, "build", searchChampionName);
  }
  if (interaction.customId == "matchUpButton") {
    const modal = ChampionMatchUpSearchModalBuilder();
    await interaction.showModal(modal); // 5
  }
  if (interaction.customId == "matchupButtonFom") {
    const searchChampionName = interaction.fields.getTextInputValue(
      "matchUpSearchChampionName"
    );

    replayChampionInfoURL(interaction, "counters", searchChampionName);
    return;
  }

  if (interaction.customId == "opggButton") {
    const opggModal = OpggModalBuilder();
    await interaction.showModal(opggModal);
  }

  if (interaction.customId == "opggButtonFom") {
    const searchSamonerName =
      interaction.fields.getTextInputValue("samonerName");

    interaction.reply({
      content: `${searchSamonerName}の情報ですね？\n https://www.op.gg/summoners/jp/${searchSamonerName}`,
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
