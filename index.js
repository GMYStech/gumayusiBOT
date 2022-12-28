const {
  Client,
  Intents,
  ChannelType,
  PermissionsBitField,
  Permissions,
  GuildMember,
  TextChannel,
  InteractionCollector,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  Modal,
  TextInputComponent,
} = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const { counter } = require("./commands/counter.js");
const { builds } = require("./commands/builds.js");
const { tierList } = require("./commands/tierList.js");
const { serverInfo } = require("./serverInfo.js");
client.on("ready", () => {
  console.log(`==== Logged in: ${client.user.tag} ====`);
});
//メンションに「Hi!」と返信
client.on("messageCreate", (message) => {
  console.log(`▶ [${message.author.tag}] ${message.content}`);
  if (message.mentions.users.has(client.user.id)) {
    message.reply("想定より小さいな……");
  }
});

client.on("messageCreate", async (message) => {
  const server = serverInfo.find(
    (server) => server.guildId == message.guild.id
  );
  if (!message.member) return;
  if (message.system || message.member.user.bot == true) {
    console.log("システムまたはbotのメッセージ");
    return;
  }
  if (message.content.startsWith(`!b`) && message.guild) {
    builds(message);
  }

  if (message.content.startsWith(`!c`) && message.guild) {
    counter(message);
  }
  if (message.content.startsWith(`!t`) && message.guild) {
    tierList(message);
  }

  if (message.content.startsWith(`!dl`) && message.guild) {
    const messages = await message.channel.messages.fetch({ limit: 100 });
    const mentionMembers = await message.mentions.members.map((m) => m.user.id);
    const mentionFilter = await messages.filter((msg) =>
      mentionMembers.some((userID) => userID == msg.author.id)
    );
    await message.channel.send({
      content: `<@${mentionMembers}>の直近100件のメッセージを消したよ！`,
      ephemeral: true,
    });
    message.channel.bulkDelete(mentionFilter); // それらのメッセージを一括削除
  }

  if (message.content === "9192631770") {
    const members = await message.guild.members.fetch(); // メンバーを全員取得
    await members.map(async (member) => {
      await member.roles.add("1049170550758576248");
      await message.channel.send(`${member.displayName}に付与`);
    });
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
          return message.channel.send("メンバーを1人指定して！");
          break;
        case `<@${sleepMember}>`:
          if (!member.voice.channel) {
            return message.channel.send("この人はVCに居ないよ？");
          }
          const channel = message.guild.channels.cache.get(server.sleepVc);
          await member.voice.setChannel(channel);
          return message.channel.send(`${member}を寝落ち部屋に送ったよ！`);
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
    if (oldState.channelId == undefined && newState.channelId != undefined) {
      if (
        serverInfo.some((server) => server.createRoom == newState.channelId)
      ) {
        let newVc = await newState.guild.channels.create(
          `${newState.member.displayName}の部屋`,
          {
            type: "GUILD_VOICE",
            parent: server.createRoomCategory,
          }
        );
        const newTc = await newState.guild.channels.create(
          `${newState.member.displayName}の部屋`,
          {
            typetype: "GUILD_TEXT",
            parent: server.createRoomCategory,
          }
        );

        const tic1 = new MessageButton()
          .setCustomId("ReNameModal") //buttonにIDを割り当てる   *必須
          .setStyle("PRIMARY") //buttonのstyleを設定する  *必須
          .setLabel("部屋名変更");
        const tic2 = new MessageButton()
          .setCustomId("memberLimitSet") //buttonにIDを割り当てる   *必須
          .setStyle("PRIMARY") //buttonのstyleを設定する  *必須
          .setLabel("人数上限の変更");

        await newTc.send({
          content: `${newState.member}\n以下のボタンから操作を選んでください`,
          components: [
            new MessageActionRow().addComponents(tic1).addComponents(tic2),
          ],
        });
        await newVc.setUserLimit(newState.channel.userLimit);
        await newState.member.voice.setChannel(newVc);
        await newTc.setTopic(newVc.id);
      }
    }

    if (oldState.channelId != undefined && newState.channelId != undefined) {
      if (
        newState.channelId == server.createRoom &&
        oldState.channelId != server.createRoom
      ) {
        let newVc = await newState.guild.channels.create(
          `${newState.member.displayName}の部屋`,
          {
            type: "GUILD_VOICE",
            parent: server.createRoomCategory,
          }
        );
        const newTc = await newState.guild.channels.create(
          `${newState.member.displayName}の部屋`,
          {
            typetype: "GUILD_TEXT",
            parent: server.createRoomCategory,
            topic: `${newState.channelId}`,
          }
        );

        const tic1 = new MessageButton()
          .setCustomId("ReNameModal") //buttonにIDを割り当てる   *必須
          .setStyle("PRIMARY") //buttonのstyleを設定する  *必須
          .setLabel("部屋名変更");
        const tic2 = new MessageButton()
          .setCustomId("memberLimitSet") //buttonにIDを割り当てる   *必須
          .setStyle("PRIMARY") //buttonのstyleを設定する  *必須
          .setLabel("人数上限の変更");

        await newTc.send({
          content: `${newState.member}\n以下のボタンから操作を選んでください`,
          components: [
            new MessageActionRow().addComponents(tic1).addComponents(tic2),
          ],
        });
        await newVc.setUserLimit(newState.channel.userLimit);
        await newState.member.voice.setChannel(newVc);
        await newTc.setTopic(newVc.id);
      }
      if (
        //新→新以外
        oldState.channel.parentId == server.createRoomCategory &&
        oldState.channelId != server.createRoom &&
        newState.channel.parentId != server.createRoomCategory
      ) {
        const chId = oldState.channel.id;
        const role = oldState.guild.roles.cache.find(
          (role) => role.name === `${chId}`
        );

        const newTc = newState.guild.channels.cache.find(
          (channel) => channel.topic === `${chId}`
        );

        await oldState.channel.parent.children.map(async (channel) => {
          if (
            channel.id != server.createRoom &&
            channel.type == "GUILD_VOICE" &&
            channel.members.size == 0
          ) {
            await newTc.delete();
            await channel.delete();
          }
        });
      }
    }

    if (oldState.channelId != undefined && newState.channelId == undefined) {
      if (
        serverInfo.some(
          (server) => server.createRoomCategory == oldState.channel.parentId
        )
      ) {
        const chId = oldState.channel.id;
        console.log(chId);
        const newTc = newState.guild.channels.cache.find(
          (channel) => channel.topic === `${chId}`
        );

        await oldState.channel.parent.children.map(async (channel) => {
          if (
            channel.id != server.createRoom &&
            channel.type == "GUILD_VOICE" &&
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
    const modal = new Modal()
      .setCustomId(`ReNameModalFom`)
      .setTitle("ルーム名変更"); // 1
    const favoriteColorInput = new TextInputComponent()
      .setCustomId("roomName")
      .setLabel("ルーム名")
      .setRequired(true)
      .setStyle("SHORT"); // 2

    const firstActionRow = new MessageActionRow().addComponents(
      favoriteColorInput
    );
    modal.addComponents(firstActionRow); // 4
    await interaction.showModal(modal); // 5
  }
  if (interaction.customId == "ReNameModalFom") {
    const nowVc = interaction.member.voice.channel;

    if (interaction.channel.parentId == server.createRoomCategory) {
      if (
        interaction.channel.members.some((x) => x.id == interaction.member.id)
      ) {
        const value = interaction.fields.getTextInputValue("roomName");
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
    const modal = new Modal()
      .setCustomId(`memberLimitSetFom`)
      .setTitle("部屋人数の上限変更"); // 1
    const setLimitImput = new TextInputComponent()
      .setCustomId("setLimit")
      .setLabel("変更後の人数")
      .setRequired(true)
      .setStyle("SHORT"); // 2

    const firstActionRow = new MessageActionRow().addComponents(setLimitImput);
    modal.addComponents(firstActionRow); // 4
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
  return;
});

client.login(process.env.DISCORD_BOT_TOKEN);
