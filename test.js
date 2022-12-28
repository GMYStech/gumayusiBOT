const championNameList = require("./champion.json");
const searchChamoionBuild = (msg) => {
  const searchChampionName = msg.content;
  const championName = championNameList.names.find((name) => {
    return name.jp === searchChampionName;
  });
  message.channel.send(
    `${searchChampionName}のカウンターマッチが見たいんだな？\n https://lolalytics.com/lol/${championName.en}/counters/`
  );
};
