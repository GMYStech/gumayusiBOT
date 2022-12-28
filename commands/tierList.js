const {
  Client,
  Intents,
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

async function tierList(message) {
  const str = message.content;
  const str2 = str.substr(3);
  switch (str2) {
    case "top":
      var result = str2.replace(`${str2}`, "top");
      break;
    case "トップ":
      var result = str2.replace(`${str2}`, "top");
      break;
    case "jg":
      var result = str2.replace(`${str2}`, "jungle");
      break;
    case "ジャングル":
      var result = str2.replace(`${str2}`, "jungle");
      break;
    case "mid":
      var result = str2.replace(`${str2}`, "middle");
      break;
    case "ミッド":
      var result = str2.replace(`${str2}`, "middle");
      break;
    case "ad":
      var result = str2.replace(`${str2}`, "bottom");
      break;
    case "adc":
      var result = str2.replace(`${str2}`, "bottom");
      break;
    case "sup":
      var result = str2.replace(`${str2}`, "support");
      break;
    default:
      message.channel.send("コマンドかレーンが違うぞ愚か者");
      return;
  }
  message.channel.send(
    `${str2}のtierリストが見たいんだな？ \n https://lolalytics.com/lol/tierlist/?lane=${result}`
  );
}

module.exports = {
  tierList,
};
