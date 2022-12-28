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

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

async function builds(message) {
  const msg = message.content;
  const str2 = msg.substr(3);

  switch (str2) {
    case "アーゴット":
      var result = str2.replace(`${str2}`, "urgot");
      break;
    case "アーリ":
      var result = str2.replace("アーリ", "ahri");
      break;
    case "アイバーン":
      var result = str2.replace("アイバーン", "ivern");
      break;
    case "アカリ":
      var result = str2.replace("アカリ", "akali");
      break;
    case "アクシャン":
      var result = str2.replace(`${str2}`, "akshan");
      break;
    case "アジール":
      var result = str2.replace(`${str2}`, "azil");
      break;
    case "アッシュ":
      var result = str2.replace(`${str2}`, "ashe");
      break;
    case "アニー":
      var result = str2.replace(`${str2}`, "annie");
      break;
    case "アニビア":
      var result = str2.replace(`${str2}`, "anivia");
      break;
    case "アフェリオス":
      var result = str2.replace(`${str2}`, "aphelios");
      break;
    case "アフェ":
      var result = str2.replace(`${str2}`, "aphelios");
      break;
    case "アリスター":
      var result = str2.replace(`${str2}`, "alistar");
      break;
    case "アムム":
      var result = str2.replace(`${str2}`, "amumu");
      break;
    case "イブリン":
      var result = str2.replace(`${str2}`, "evelynn");
      break;
    case "イラオイ":
      var result = str2.replace(`${str2}`, "illaoi");
      break;
    case "イレリア":
      var result = str2.replace(`${str2}`, "irelia");
      break;
    case "ウーコン":
      var result = str2.replace(`${str2}`, "wukong");
      break;
    case "ウディア":
      var result = str2.replace(`${str2}`, "udyr");
      break;
    case "エイトロックス":
      var result = str2.replace(`${str2}`, "aatrox");
      break;
    case "エイトロ":
      var result = str2.replace(`${str2}`, "aatrox");
      break;
    case "エコー":
      var result = str2.replace(`${str2}`, "ekko");
      break;
    case "エズリアル":
      var result = str2.replace(`${str2}`, "ezreal");
      break;
    case "エズ":
      var result = str2.replace(`${str2}`, "ezreal");
      break;
    case "エリス":
      var result = str2.replace(`${str2}`, "elise");
      break;
    case "オーン":
      var result = str2.replace(`${str2}`, "ornn");
      break;
    case "オラフ":
      var result = str2.replace(`${str2}`, "olaf");
      break;
    case "オリアナ":
      var result = str2.replace(`${str2}`, "orianna");
      break;
    case "オレリオンソル":
      var result = str2.replace(`${str2}`, "aurelionsol");
      break;
    case "オレソル":
      var result = str2.replace(`${str2}`, "aurelionsol");
      break;
    case "カサンテ":
      var result = str2.replace(`${str2}`, "ksante");
      break;
    case "カーサス":
      var result = str2.replace(`${str2}`, "karthus");
      break;
    case "カジックス":
      var result = str2.replace(`${str2}`, "khazix");
      break;
    case "カジ":
      var result = str2.replace(`${str2}`, "khazix");
      break;
    case "カイサ":
      var result = str2.replace(`${str2}`, "kaisa");
      break;
    case "カサディン":
      var result = str2.replace(`${str2}`, "kassadin");
      break;
    case "カシオペア":
      var result = str2.replace(`${str2}`, "cassipeia");
      break;
    case "カタリナ":
      var result = str2.replace(`${str2}`, "katarina");
      break;
    case "カミール":
      var result = str2.replace(`${str2}`, "camille");
      break;
    case "カリスタ":
      var result = str2.replace(`${str2}`, "kalista");
      break;
    case "カルマ":
      var result = str2.replace(`${str2}`, "karma");
      break;
    case "ガリオ":
      var result = str2.replace(`${str2}`, "galio");
      break;
    case "ガレン":
      var result = str2.replace(`${str2}`, "garen");
      break;
    case "ガングプランク":
      var result = str2.replace(`${str2}`, "gangplank");
      break;
    case "GP":
      var result = str2.replace(`${str2}`, "gangplank");
      break;
    case "キンドレッド":
      var result = str2.replace(`${str2}`, "kindred");
      break;
    case "キンド":
      var result = str2.replace(`${str2}`, "kindred");
      break;
    case "キヤナ":
      var result = str2.replace(`${str2}`, "qiyana");
      break;
    case "クイン":
      var result = str2.replace(`${str2}`, "quinn");
      break;
    case "クレッド":
      var result = str2.replace(`${str2}`, "kled");
      break;
    case "グウェン":
      var result = str2.replace(`${str2}`, "gwen");
      break;
    case "グラガス":
      var result = str2.replace(`${str2}`, "gragas");
      break;
    case "グレイブス":
      var result = str2.replace(`${str2}`, "graves");
      break;
    case "グブ":
      var result = str2.replace(`${str2}`, "graves");
      break;
    case "ケイトリン":
      var result = str2.replace(`${str2}`, "caitlyn");
      break;
    case "ケイト":
      var result = str2.replace(`${str2}`, "caitlyn");
      break;
    case "ケイル":
      var result = str2.replace(`${str2}`, "kayle");
      break;
    case "ケイン":
      var result = str2.replace(`${str2}`, "kayn");
      break;
    case "ケネン":
      var result = str2.replace(`${str2}`, "kennen");
      break;
    case "コーキ":
      var result = str2.replace(`${str2}`, "corki");
      break;
    case "コグマウ":
      var result = str2.replace(`${str2}`, "kogmaw");
      break;
    case "コグ":
      var result = str2.replace(`${str2}`, "kogmaw");
      break;
    case "サイオン":
      var result = str2.replace(`${str2}`, "sion");
      break;
    case "サイラス":
      var result = str2.replace(`${str2}`, "sylas");
      break;
    case "サミーラ":
      var result = str2.replace(`${str2}`, "samira");
      break;
    case "ザイラ":
      var result = str2.replace(`${str2}`, "zyra");
      break;
    case "ザック":
      var result = str2.replace(`${str2}`, "zac");
      break;
    case "ザヤ":
      var result = str2.replace(`${str2}`, "xayah");
      break;
    case "シェン":
      var result = str2.replace(`${str2}`, "shen");
      break;
    case "シャコ":
      var result = str2.replace(`${str2}`, "shaco");
      break;
    case "シンジャオ":
      var result = str2.replace(`${str2}`, "xinzhao");
      break;
    case "ジャオ":
      var result = str2.replace(`${str2}`, "xinzhao");
      break;
    case "シンジド":
      var result = str2.replace(`${str2}`, "singed");
      break;
    case "シンドラ":
      var result = str2.replace(`${str2}`, "syndra");
      break;
    case "シヴァーナ":
      var result = str2.replace(`${str2}`, "shyvana");
      break;
    case "シヴァ":
      var result = str2.replace(`${str2}`, "shyvana");
      break;
    case "シヴィア":
      var result = str2.replace(`${str2}`, "sivir");
      break;
    case "ジェイス":
      var result = str2.replace(`${str2}`, "jayce");
      break;
    case "ジグス":
      var result = str2.replace(`${str2}`, "ziggs");
      break;
    case "ジャーヴァンⅣ":
      var result = str2.replace(`${str2}`, "jarvaniv");
      break;
    case "J4":
      var result = str2.replace(`${str2}`, "jarvaniv");
      break;
    case "ジャックス":
      var result = str2.replace(`${str2}`, "jax");
      break;
    case "ジャンナ":
      var result = str2.replace(`${str2}`, "janna");
      break;
    case "ジリアン":
      var result = str2.replace(`${str2}`, "zilean");
      break;
    case "ジン":
      var result = str2.replace(`${str2}`, "jhin");
      break;
    case "ジンクス":
      var result = str2.replace(`${str2}`, "jinx");
      break;
    case "スウェイン":
      var result = str2.replace(`${str2}`, "swain");
      break;
    case "スカーナー":
      var result = str2.replace(`${str2}`, "skarner");
      break;
    case "スレッシュ":
      var result = str2.replace(`${str2}`, "thresh");
      break;
    case "セジュアニ":
      var result = str2.replace(`${str2}`, "sejuani");
      break;
    case "セジュ":
      var result = str2.replace(`${str2}`, "sejuani");
      break;
    case "セト":
      var result = str2.replace(`${str2}`, "sett");
      break;
    case "セナ":
      var result = str2.replace(`${str2}`, "senna");
      break;
    case "セラフィーン":
      var result = str2.replace(`${str2}`, "seraphine");
      break;
    case "セラフ":
      var result = str2.replace(`${str2}`, "seraphine");
      break;
    case "セラフィン":
      var result = str2.replace(`${str2}`, "seraphine");
      break;

    case "ゼド":
      var result = str2.replace(`${str2}`, "zed");
      break;
    case "ゼラス":
      var result = str2.replace(`${str2}`, "xerath");
      break;
    case "ゼリ":
      var result = str2.replace(`${str2}`, "zeri");
      break;
    case "ソナ":
      var result = str2.replace(`${str2}`, "sona");
      break;
    case "ソラカ":
      var result = str2.replace(`${str2}`, "soraka");
      break;
    case "ゾーイ":
      var result = str2.replace(`${str2}`, "zoe");
      break;
    case "タムケンチ":
      var result = str2.replace(`${str2}`, "tahmkench");
      break;
    case "タム":
      var result = str2.replace(`${str2}`, "tahmkench");
      break;
    case "タリック":
      var result = str2.replace(`${str2}`, "taric");
      break;
    case "タリヤ":
      var result = str2.replace(`${str2}`, "taliyah");
      break;
    case "タロン":
      var result = str2.replace(`${str2}`, "talon");
      break;
    case "ダイアナ":
      var result = str2.replace(`${str2}`, "diana");
      break;
    case "ダリウス":
      var result = str2.replace(`${str2}`, "darius");
      break;
    case "チョガス":
      var result = str2.replace(`${str2}`, "chogath");
      break;
    case "ツイステッドフェイト":
      var result = str2.replace(`${str2}`, "twistedfate");
      break;
    case "TF":
      var result = str2.replace(`${str2}`, "twistedfate");
      break;
    case "ティーモ":
      var result = str2.replace(`${str2}`, "teemo");
      break;
    case "トゥイッチ":
      var result = str2.replace(`${str2}`, "twitch");
      break;
    case "トランドル":
      var result = str2.replace(`${str2}`, "trundle");
      break;
    case "トリスターナ":
      var result = str2.replace(`${str2}`, "tristana");
      break;
    case "トリス":
      var result = str2.replace(`${str2}`, "tristana");
      break;
    case "トリンダメア":
      var result = str2.replace(`${str2}`, "tryndamere");
      break;
    case "トリン":
      var result = str2.replace(`${str2}`, "tryndamere");
      break;
    case "ドクタームンド":
      var result = str2.replace(`${str2}`, "drmundo");
      break;
    case "ムンド":
      var result = str2.replace(`${str2}`, "drmundo");
      break;
    case "ドレイヴン":
      var result = str2.replace(`${str2}`, "draven");
      break;
    case "ドレイブン":
      var result = str2.replace(`${str2}`, "draven");
      break;
    case "ナー":
      var result = str2.replace(`${str2}`, "gnar");
      break;
    case "ナサス":
      var result = str2.replace(`${str2}`, "nasus");
      break;
    case "ナミ":
      var result = str2.replace(`${str2}`, "nami");
      break;
    case "ニーコ":
      var result = str2.replace(`${str2}`, "neeko");
      break;
    case "ニーラ":
      var result = str2.replace(`${str2}`, "nilah");
      break;
    case "ニダリー":
      var result = str2.replace(`${str2}`, "nidalee");
      break;
    case "ヌヌ&ウィルンプ":
      var result = str2.replace(`${str2}`, "nunu");
      break;
    case "ヌヌ":
      var result = str2.replace(`${str2}`, "nunu");
      break;
    case "ヌヌンプ":
      var result = str2.replace(`${str2}`, "nunu");
      break;
    case "ノーチラス":
      var result = str2.replace(`${str2}`, "nautilus");
      break;
    case "ノーチ":
      var result = str2.replace(`${str2}`, "nautilus");
      break;
    case "ノクターン":
      var result = str2.replace(`${str2}`, "nocturne");
      break;
    case "ノク":
      var result = str2.replace(`${str2}`, "nocturne");
      break;
    case "ハイマーディンガー":
      var result = str2.replace(`${str2}`, "heimerdinger");
      message.channel.send(
        `私を使うのか？！光栄だな！\n https://lolalytics.com/lol/${result}/build/`
      );
      return;
      break;
    case "ハイマー":
      var result = str2.replace(`${str2}`, "heimerdinger");
      message.channel.send(
        `私を使うのか？！光栄だな！\n https://lolalytics.com/lol/${result}/build/`
      );
      return;
      break;
    case "バード":
      var result = str2.replace(`${str2}`, "bard");
      break;
    case "パイク":
      var result = str2.replace(`${str2}`, "pyke");
      break;
    case "パンテオン":
      var result = str2.replace(`${str2}`, "pantheon");
      break;
    case "ビクター":
      var result = str2.replace(`${str2}`, "viktor");
      break;
    case "フィオラ":
      var result = str2.replace(`${str2}`, "fiora");
      break;
    case "フィズ":
      var result = str2.replace(`${str2}`, "fizz");
      break;
    case "フィドルスティックス":
      var result = str2.replace(`${str2}`, "fiddlesticks");
      break;
    case "フィドル":
      var result = str2.replace(`${str2}`, "fiddlesticks");
      break;
    case "ブラウム":
      var result = str2.replace(`${str2}`, "braum");
      break;
    case "ブラッドミア":
      var result = str2.replace(`${str2}`, "vladmir");
      break;
    case "ブラッド":
      var result = str2.replace(`${str2}`, "vladmir");
      break;
    case "ブランド":
      var result = str2.replace(`${str2}`, "brand");
      break;
    case "ブリッツクランク":
      var result = str2.replace(`${str2}`, "blitzcrank");
      break;
    case "ブリッツ":
      var result = str2.replace(`${str2}`, "blitzcrank");
      break;
    case "ヘカリム":
      var result = str2.replace(`${str2}`, "hecarim");
      break;
    case "ベイガー":
      var result = str2.replace(`${str2}`, "veigar");
      break;
    case "ベルヴェス":
      var result = str2.replace(`${str2}`, "belveth");
      break;
    case "ベルヴェズ":
      var result = str2.replace(`${str2}`, "belveth");
      message.channel.send(
        `「ベルヴェス」だ愚か者 \n https://lolalytics.com/lol/${result}/build/`
      );
      return;
      break;
    case "ヴェルベズ":
      var result = str2.replace(`${str2}`, "belveth");
      message.channel.send(
        `「ベルヴェス」だ愚か者 \n https://lolalytics.com/lol/${result}/build/`
      );
      return;
      break;
    case "ボリベア":
      var result = str2.replace(`${str2}`, "volibear");
      break;
    case "ポッピー":
      var result = str2.replace(`${str2}`, "poppy");
      break;
    case "マオカイ":
      var result = str2.replace(`${str2}`, "maokai");
      break;
    case "マスターイー":
      var result = str2.replace(`${str2}`, "masteryi");
      break;
    case "Yi":
      var result = str2.replace(`${str2}`, "masteryi");
      break;
    case "マルザハール":
      var result = str2.replace(`${str2}`, "malzahar");
      break;
    case "マルザ":
      var result = str2.replace(`${str2}`, "malzahar");
      break;
    case "マルファイト":
      var result = str2.replace(`${str2}`, "malphite");
      break;
    case "ミスフォーチュン":
      var result = str2.replace(`${str2}`, "missfortune");
      break;
    case "MF":
      var result = str2.replace(`${str2}`, "missfortune");
      break;
    case "モルガナ":
      var result = str2.replace(`${str2}`, "morgana");
      break;
    case "モルデカイザー":
      var result = str2.replace(`${str2}`, "mordekaiser");
      break;
    case "モルデ":
      var result = str2.replace(`${str2}`, "mordekaiser");
      break;
    case "ヤスオ":
      var result = str2.replace(`${str2}`, "yasuo");
      break;
    case "ユーミ":
      var result = str2.replace(`${str2}`, "yuumi");
      break;
    case "ヨネ":
      var result = str2.replace(`${str2}`, "yone");
      break;
    case "ヨリック":
      var result = str2.replace(`${str2}`, "yorick");
      break;
    case "ライズ":
      var result = str2.replace(`${str2}`, "ryze");
      break;
    case "ラカン":
      var result = str2.replace(`${str2}`, "rakan");
      break;
    case "ラックス":
      var result = str2.replace(`${str2}`, "lux");
      break;
    case "ラムス":
      var result = str2.replace(`${str2}`, "rammus");
      break;
    case "ランブル":
      var result = str2.replace(`${str2}`, "rumble");
      break;
    case "リーシン":
      var result = str2.replace(`${str2}`, "leesin");
      break;
    case "リサンドラ":
      var result = str2.replace(`${str2}`, "lissandra");
      break;
    case "リリア":
      var result = str2.replace(`${str2}`, "lillia");
      break;
    case "リヴェン":
      var result = str2.replace(`${str2}`, "riven");
      break;
    case "ルシアン":
      var result = str2.replace(`${str2}`, "lucian");
      break;
    case "ルブラン":
      var result = str2.replace(`${str2}`, "leblank");
      break;
    case "ルル":
      var result = str2.replace(`${str2}`, "lulu");
      break;
    case "レオナ":
      var result = str2.replace(`${str2}`, "leona");
      break;
    case "レクサイ":
      var result = str2.replace(`${str2}`, "reksai");
      break;
    case "レナータグラスク":
      var result = str2.replace(`${str2}`, "renataglasc");
      break;
    case "レナータ":
      var result = str2.replace(`${str2}`, "renataglasc");
      break;
    case "レネクトン":
      var result = str2.replace(`${str2}`, "renekton");
      break;
    case "レネク":
      var result = str2.replace(`${str2}`, "renekton");
      break;
    case "レル":
      var result = str2.replace(`${str2}`, "rell");
      break;
    case "レンガー":
      var result = str2.replace(`${str2}`, "rengar");
      break;
    case "ワーウィック":
      var result = str2.replace(`${str2}`, "warwick");
      break;
    case "WW":
      var result = str2.replace(`${str2}`, "warwick");
      break;
    case "ヴァイ":
      var result = str2.replace(`${str2}`, "vi");
      break;
    case "ヴァルス":
      var result = str2.replace(`${str2}`, "varus");
      break;
    case "ヴィエゴ":
      var result = str2.replace(`${str2}`, "viego");
      break;
    case "ヴェイン":
      var result = str2.replace(`${str2}`, "vayne");
      break;
    case "ヴェックス":
      var result = str2.replace(`${str2}`, "vex");
      break;
    case "ヴェルコズ":
      var result = str2.replace(`${str2}`, "velkoz");
      break;
    default:
      message.channel.send("チャンプの名前すらまともに打てないのか愚か者");
      return;
  }

  message.channel.send(
    `${str2}のビルドだな？\n https://lolalytics.com/lol/${result}/build/`
  );
}

module.exports = {
  builds,
};
