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

const championNameList = require("./champion.json");
const showComponent = async (channel, components, label) => {
  await channel.send({
    content: label,
    components: [new ActionRowBuilder().addComponents(components)],
  });
};
const findChampion = (searchChampionName) => {
  return championNameList.names.find((name) => name.jp === searchChampionName);
};

const replayChampionInfoURL = (
  interaction,
  searchOption,
  searchChampionName
) => {
  const championName = findChampion(searchChampionName);
  if (!championName) {
    interaction.reply({
      content: `${searchChampionName}というチャンピオンはいません。もう一度入力してください`,
      ephemeral: true,
    });
    return;
  }

  const jpText = {
    build: "ビルド",
    counters: "マッチアップ",
  };

  interaction.reply({
    content: `${searchChampionName}の${jpText[searchOption]}ですね？\n https://lolalytics.com/lol/${championName.en}/${searchOption}/`,
    ephemeral: true,
  });
};
module.exports = {
  showComponent,
  replayChampionInfoURL,
};
