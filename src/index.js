const uwuifier = require('uwuify');
const uwuify = new uwuifier();
const fs = require('fs');

const uwuEmoticon = [
    "(ᵘʷᵘ)",
    "(ᵘﻌᵘ)",
    "(◡ ω ◡)",
    "(◡ ꒳ ◡)",
    "(◡ w ◡)",
    "(◡ ሠ ◡)",
    "(˘ω˘)",
    "(⑅˘꒳˘)",
    "(˘ᵕ˘)",
    "(˘ሠ˘)",
    "(˘³˘)",
    "(˘ε˘)",
    "(´˘`)",
    "(´꒳`)",
    "(˘ ˘ ˘)",
    "( ᴜ ω ᴜ )",
    "( ´ω` )۶",
    "(„ᵕᴗᵕ„)",
    "(*ฅ́˘ฅ̀*)",
    "(ㅅꈍ ˘ ꈍ)",
    "(⑅˘꒳˘)",
    "( ｡ᵘ ᵕ ᵘ ｡)",
    "( ᵘ ꒳ ᵘ ✼)",
    "( ˘ᴗ˘ )",
    "ᐡ꒳ᐡ",
    "(˯ ᵘ ꒳ ᵘ ˯)",
    "(ᵘᆸᵘ)",
    "(ᵕᴗ ᵕ⁎)",
    "*:･ﾟ✧(ꈍᴗꈍ)✧･ﾟ:* *˚*(ꈍ ω ꈍ).₊̣̇.",
    "(。U ω U。)",
    "(。U⁄ ⁄ω⁄ ⁄ U。)",
    "(U ᵕ U❁)",
    "(U ﹏ U)",
    "(◦ ᵕ ˘ ᵕ ◦)",
    "ღ(U꒳Uღ)",
    "♥(。U ω U。)",
    "– ̗̀ (ᵕ꒳ᵕ) ̖́ –",
    "ಇ( ꈍᴗꈍ)ಇ", 
    "ᕦ( ˘ᴗ˘ )ᕤ",
    "(⁄˘⁄ ⁄ ω⁄ ⁄ ˘⁄)♡",
    "( ͡U ω ͡U )",
    "( ͡o ᵕ ͡o )",
    "( ͡o ꒳ ͡o )",
    ".(❀˘꒳˘)♡(˘꒳˘❀)",
    "( ˊ.ᴗˋ )",
    "(灬´ᴗ`灬)",
    "[̲̅$̲̅(̲̅ ᵕ꒳ᵕ)̲̅$̲̅]",
    "★⌒ヽ(˘꒳˘ *)",
    "( ˶˘ ³˘(ᵕ꒳ᵕ)*₊˚♡ "
]

const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');

const tweetClient = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

const blockedMedias = [ // I'm sorry :(, but i want to keep this "professional"
  'MV-lehti',
  'Magneettimedia',
  'Partisaani'
];

async function main() {
  let lastRunTime = Date.now(); 
  try {
    lastRunTime = parseInt(fs.readFileSync('lastRunTime.txt'));
  } catch(e) {}
  const res = await axios.get('https://trollitehdas.ru/feed');
  const news = res.data.articles.filter(article => {
    return new Date(article.date).getTime() > lastRunTime
  })
  news.forEach(async article => {
    if (blockedMedias.includes(article.outlet)) return;
    console.log(article.title);
    console.log(uwuify.uwuify(article.title))
    if (`${uwuify.uwuify(article.title)} ${uwuEmoticon[Math.floor(Math.random() * uwuEmoticon.length)]} (${article.outlet}) ${article.link}`.length > 280) return;
    await tweetClient.v1.tweet(`${uwuify.uwuify(article.title)} ${uwuEmoticon[Math.floor(Math.random() * uwuEmoticon.length)]} (${article.outlet}) ${article.link}`);
  })
  fs.writeFileSync('lastRunTime.txt', Date.now().toString())
}

main();