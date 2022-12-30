const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
} = require("discord.js");
//大文字スタートで統一しませんか？
const JumpPointBuilder = () => {
  const glitch = new ButtonBuilder()
    .setLabel("Glitch")
    .setURL(
      "https://glitch.com/edit/#!/nanobot-projeect?path=index.js%3A278%3A37"
    )
    .setStyle(ButtonStyle.Link);
  const git = new ButtonBuilder()
    .setLabel("github")
    .setURL("https://github.com/")
    .setStyle(ButtonStyle.Link);
  const guide = new ButtonBuilder()
    .setLabel("discord.js Guide")
    .setURL("https://discord.js.org/#/docs/discord.js/main/general/welcome")
    .setStyle(ButtonStyle.Link);
  //ここjumpにまとめなくてもいいかも？
  return [glitch, git, guide];
};

const CreateRoomButtonBuilder = () =>
  new ButtonBuilder()
    .setCustomId("roomButton") //buttonにIDを割り当てる   *必須
    .setStyle(ButtonStyle.Primary) //buttonのstyleを設定する  *必須
    .setLabel("部屋生成");

const GumaButtonsBuilder = () => {
  const buildButton = new ButtonBuilder()
    .setCustomId("buildButton") //buttonにIDを割り当てる   *必須
    .setStyle(ButtonStyle.Primary) //buttonのstyleを設定する  *必須
    .setLabel("ビルド検索");
  const matchUpButton = new ButtonBuilder()
    .setCustomId("matchUpButton") //buttonにIDを割り当てる   *必須
    .setStyle(ButtonStyle.Primary) //buttonのstyleを設定する  *必須
    .setLabel("マッチアップ検索");
  const opggButton = new ButtonBuilder()
    .setCustomId("opggButton") //buttonにIDを割り当てる   *必須
    .setStyle(ButtonStyle.Primary) //buttonのstyleを設定する  *必須
    .setLabel("サモナー検索");

  const lanes = ["top", "jungle", "middle", "bottom", "support"];

  const tierList = lanes.map((lane) => {
    return new ButtonBuilder()
      .setURL(`https://lolalytics.com/lol/tierlist/?lane=${lane}`)
      .setStyle(ButtonStyle.Link)
      .setLabel(lane);
  });
  return {
    buttons: [buildButton, matchUpButton, opggButton],
    tierList,
  };
};

const ReNameModalBuilder = () => {
  const modal = new ModalBuilder({
    customId: "ReNameModalFom",
    title: "ルーム名変更",
  });
  const favoriteColorInput = new TextInputBuilder()
    .setCustomId("roomReName")
    .setLabel("ルーム名")
    .setRequired(true)
    .setStyle("Short"); // 2

  const firstActionRow = new ActionRowBuilder().addComponents(
    favoriteColorInput
  );
  modal.addComponents(firstActionRow);
  return modal;
};

const MemberLimitSetModalBuilder = () => {
  const modal = new ModalBuilder({
    customId: "memberLimitSetFom",
    title: "部屋人数の上限変更",
  });
  const setLimitImput = new TextInputBuilder()
    .setCustomId("setLimit")
    .setLabel("変更後の人数")
    .setRequired(true)
    .setStyle("Short"); // 2

  const firstActionRow = new ActionRowBuilder().addComponents(setLimitImput);
  modal.addComponents(firstActionRow); // 4
  return modal;
};

const SetRoomNameModalBuilder = () => {
  const modal = new ModalBuilder()
    .setCustomId(`RoomButtonFom`)
    .setTitle("部屋の名前を書いてください"); // 1
  const roomNameInput = new TextInputBuilder()
    .setCustomId("roomName")
    .setLabel("部屋の名前")
    .setRequired(true)
    .setStyle("Short"); // 2
  const firstActionRow = new ActionRowBuilder().addComponents(roomNameInput);
  modal.addComponents(firstActionRow); // 4
  return modal;
};

const RoomSettingButtonsBuilder = () => {
  const tic1 = new ButtonBuilder()
    .setCustomId("ReNameModal") //buttonにIDを割り当てる   *必須
    .setStyle(ButtonStyle.Primary) //buttonのstyleを設定する  *必須
    .setLabel("部屋名変更");
  const tic2 = new ButtonBuilder()
    .setCustomId("memberLimitSet") //buttonにIDを割り当てる   *必須
    .setStyle(ButtonStyle.Primary) //buttonのstyleを設定する  *必須
    .setLabel("人数上限の変更");
  return [tic1, tic2];
};

const ChampionBuildSearchModalBuilder = () => {
  const modal = new ModalBuilder({
    custom_id: `buildButtonFom`,
    title: "チャンピオンの名前を書いてください",
  });

  const championNameInput = new TextInputBuilder()
    .setCustomId("searchChampionName")
    .setLabel("チャンピオンの名前")
    .setRequired(true)
    .setStyle("Short"); // 2

  const firstActionRow = new ActionRowBuilder().addComponents(
    championNameInput
  );
  modal.addComponents(firstActionRow); // 4
  return modal;
};

const ChampionMatchUpSearchModalBuilder = () => {
  const modal = new ModalBuilder()
    .setCustomId(`matchupButtonFom`)
    .setTitle("チャンピオンの名前を書いてください"); // 1
  const roomNameInput = new TextInputBuilder()
    .setCustomId("matchUpSearchChampionName")
    .setLabel("チャンピオンの名前")
    .setRequired(true)
    .setStyle("Short"); // 2

  const firstActionRow = new ActionRowBuilder().addComponents(roomNameInput);
  modal.addComponents(firstActionRow); // 4
  return modal;
};

const OpggModalBuilder = () => {
  const modal = new ModalBuilder({
    custom_id: `opggButtonFom`,
    title: "サモナーの名前を書いてください",
  });

  const samonerNameInput = new TextInputBuilder()
    .setCustomId("samonerName")
    .setLabel("サモナーの名前")
    .setRequired(true)
    .setStyle("Short"); // 2

  const firstActionRow = new ActionRowBuilder().addComponents(samonerNameInput);
  modal.addComponents(firstActionRow); // 4
  return modal;
};
module.exports = {
  CreateRoomButtonBuilder,
  GumaButtonsBuilder,
  ReNameModalBuilder,
  MemberLimitSetModalBuilder,
  SetRoomNameModalBuilder,
  RoomSettingButtonsBuilder,
  ChampionBuildSearchModalBuilder,
  ChampionMatchUpSearchModalBuilder,
  JumpPointBuilder,
  OpggModalBuilder,
};
