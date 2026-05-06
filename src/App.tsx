import type { FormEvent } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Languages, Play, Pause, Heart, Send, Sparkles, Star, Music, ArrowRight, ArrowLeft, Menu, Disc, MessageSquare, Volume2, VolumeX, History, Mic2, MessageCircle, Reply } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';
import BackgroundMusic from './BackgroundMusic';

const Player = ReactPlayer as any;

const TRANSLATIONS = {
  zh: {
    ticker: "✨ Mona 首张专辑 'No.1' POPUP STORE 举办中！周边贩售及握手会详情请点击查看 · 🎀 全新单曲 MV 视听解禁！ · ✨ Mona 首张专辑 'No.1' POPUP STORE 举办中！",
    fanSite: "mona粉丝站",
    recommended: "推荐单曲",
    producer: "致：制作人",
    profile: "人物介绍",
    personality: "性格特点",
    background: "背景故事",
    relMap: "人物关系图",
    sister: "成海圣奈 (姐姐)",
    fans: "粉丝们",
    mostImportant: "最重要的人",
    reasons: "被吸引的理由",
    fansVoice: "粉丝心声",
    discography: "作品集",
    latest: "单曲试听",
    mvPreview: "MV赏析",
    playing: "播放中",
    boardTitle: "粉丝留言板",
    boardSubtitle: "支持与热爱，送给最闪耀的偶像！",
    post: "发布留言",
    placeholder: "写下你对 Mona 酱的热爱吧！✨",
    thanks: "来自 Mona 的谢意",
    loveYou: "最喜欢你了！",
    monaBio: "性格元气努力、不服输、要强又可爱。怀揣着“我也要在属于我的舞台上闪耀”的决心，Mona 踏上了残酷又绚丽的偶像之路。为了梦想，她目前全心投入事业，暂时没有恋爱计划。",
    monaStory: "2018年3月以《我的偶像宣言》正式出道。拒绝靠着姐姐成海圣奈的名气，坚持凭自己的努力在寺门艺能事务所作为新人偶像奋斗。2021年发行首张个人专辑，如今已是一线新人偶像。",
    details: { birthday: "4月24日", age: "16岁（高一）", height: "160cm", blood: "AB型", cv: "夏川椎菜", identity: "寺门艺能所属偶像" },
    relSena: "成海圣奈", relSenaDesc: "最强后盾 / 竞争对手", relLIP: "LIP×LIP", relLIPDesc: "同事 / 目标", relMinami: "南 (Minami)", relMinamiDesc: "好友 / YouTuber",
    historyTitle: "星光历程",
    historyItems: ["2018.03 以《我的偶像宣言》正式出道", "拒绝靠姐姐名气，坚持凭自己努力在寺门艺能奋斗", "2021.02 发布首张个人专辑《#No.1》", "举办多场个人演唱会，与粉丝建立了最深厚的羁绊"],
    role: "超级偶像", name: "成海 萌奈", love: "爱心！", shaping: "塑造成长中", clickOpen: "点击开始了解",
    producerLabel: "致：制作人", loveText: "ラブ！", relSister: "姐姐", relSisterStatus: "憧憬/自卑", relFans: "双向奔赴", relFansStatus: "最重要的人",
    quotes: [
      { text: "「总是全力以赴，把粉丝放在第一位的样子最喜欢了！」", Author: "来自后援会的A君" },
      { text: "「虽然偶尔有些小迷糊，但在舞台上比谁都要闪耀✨」", Author: "永远单推的B酱" },
      { text: "「每一次的饭撒都精准击中我的心！绝对会一直支持你！」", Author: "被饭撒拯救的C酱" },
      { text: "「看着Mona一步步走向顶点，真的很感动，这就是养成系偶像的魅力吧！」", Author: "某位老粉留" },
    ],
    songs: [
      { title: '私、アイドル宣言', desc: '最初的偶像宣言！一起享受舞台吧。', tag: '经典·出道' },
      { title: 'ファンサ', desc: '用实力获胜！最棒的饭撒送给你。', tag: '百万热门' },
      { title: 'No.1', desc: '向着梦想闪耀的轨迹。', tag: '专辑主打' },
      { title: '誇り高きアイドル', desc: '骄傲的偶像，挥洒汗水与泪水的舞台。', tag: 'Live人气曲' },
      { title: '人生は最高の暇つぶし', desc: '坚持做自己，保持自信。', tag: '病毒式走红' },
    ]
  },
  ja: {
    ticker: "✨ Mona 1st Album 'No.1' POPUP STORE 開催中！グッズ販売や握手会の詳細をチェック · 🎀 新曲MV先行公開中！ · ✨ Mona 1st Album 'No.1' POPUP STORE 開催中！",
    fanSite: "monaファンサイト",
    recommended: "おすすめ曲",
    producer: "To: プロデューサーへ",
    profile: "プロフィール",
    personality: "性格",
    background: "経歴",
    relMap: "相関図",
    sister: "成海聖奈 (お姉ちゃん)",
    fans: "ファンの皆さん",
    mostImportant: "大事な人",
    reasons: "私たちが惹かれる理由",
    fansVoice: "ファンの声",
    discography: "ディスコグラフィ",
    latest: "シングル試聴",
    mvPreview: "MV鑑賞",
    playing: "再生中",
    boardTitle: "ファン掲示板",
    boardSubtitle: "輝くアイドルへ、愛と応援を届けよう！",
    post: "投稿する",
    placeholder: "Monaちゃんへの愛を叫ぼう！✨",
    thanks: "Monaからのメッセージ",
    loveYou: "大好きだよ！",
    monaBio: "負けず嫌いで、情熱と活力に満ちた努力家！時折不器用な面も見せますが、ファンの前では常に120%の完璧な笑顔を絶やしません。夢のために、現在は恋愛禁止で活動中。",
    monaStory: "2018年3月『私、アイドル宣言』でデビュー。姉・成海聖奈に頼らず、自らの力で輝くことを決意。寺門芸能所属の新人アイドルとして奮闘し、2021年には1stアルバムをリリースしました。",
    details: { birthday: "4月24日", age: "16歳（高一）", height: "160cm", blood: "AB型", cv: "夏川椎菜", identity: "寺門芸能所属アイドル" },
    relSena: "成海聖奈", relSenaDesc: "最強の味方 / ライバル", relLIP: "LIP×LIP", relLIPDesc: "同僚 / 目標", relMinami: "南 (Minami)", relMinamiDesc: "親友 / YouTuber",
    historyTitle: "活動ヒストリー",
    historyItems: ["2018.03 『私、アイドル宣言』で本格デビュー", "姉・聖奈の力に頼らず、寺門芸能にて自らの力で活動", "2021.02 1stアルバム『#No.1』をリリース", "ワンマンライブ開催など、ファンと共に歩み続けています"],
    role: "#No.1 アイドル", name: "成海 萌奈", love: "大好き！", shaping: "成長中", clickOpen: "アーカイブを開く",
    producerLabel: "To: プロデューサー", loveText: "ラブ！", relSister: "姉", relSisterStatus: "憧れ/劣等感", relFans: "相愛", relFansStatus: "大事な人",
    quotes: [
      { text: "「常に全力投球で、ファンを第一に考える姿が大好きです！」", Author: "後援会のA君より" },
      { text: "「時々ドジなところもあるけど、ステージでは誰よりも輝いてる✨」", Author: "永遠の単推しBちゃん" },
      { text: "「ファンサのたびにハートを射抜かれます！ずっと応援するよ！」", Author: "ファンサに救われたCちゃん" },
      { text: "「Monaが頂点へ向かう姿に感動しています。これがアイドルの魅力！」", Author: "とある古参ファンより" },
    ],
    songs: [
      { title: '私、アイドル宣言', desc: '最強アイドルの甘えん坊宣言！ハートを感じて。', tag: 'デビュー曲' },
      { title: 'ファンサ', desc: '実力で心をつかむ！最高のファンサをあなたに。', tag: 'ミリオンヒット' },
      { title: 'No.1', desc: '夢に向かって輝く軌跡。', tag: 'アルバムタイトル' },
      { title: '誇り高きアイドル', desc: '誇り高きアイドル、汗と涙のステージ。', tag: 'ライブ人気' },
      { title: '人生は最高の暇つぶし', desc: '自分らしく、絶対自信のスイートアタック。', tag: 'バイラルヒット' },
    ]
  },
  en: {
    ticker: "✨ Mona 1st Album 'No.1' POPUP STORE Now Open! Check out merch & handshake events · 🎀 New MV released! · ✨ Mona 1st Album 'No.1' POPUP STORE Now Open!",
    fanSite: "Mona Fansite",
    recommended: "Recommended",
    producer: "To: Producer",
    profile: "Profile",
    personality: "Personality",
    background: "Background",
    relMap: "Relationships",
    sister: "Sena Narumi (Sister)",
    fans: "Fans",
    mostImportant: "Most Important",
    reasons: "Why We Love Her",
    fansVoice: "Fan Voices",
    discography: "Discography",
    latest: "Single Previews",
    mvPreview: "MV Previews",
    playing: "Now Playing",
    boardTitle: "Fan Board",
    boardSubtitle: "Send love & support to our shining idol!",
    post: "Post",
    placeholder: "Express your love for Mona! ✨",
    thanks: "Message from Mona",
    loveYou: "I love you all!",
    monaBio: "Energetic, competitive, and full of vitality! Though sometimes clumsy, she never fails to show a 120% perfect smile to her fans. Currently putting romance on pause to focus entirely on her dream.",
    monaStory: "Debuted in March 2018 with 'Watashi, Idol Sengen'. Determined to shine on her own merits without relying on her sister's fame. Released her 1st album in 2021 as a rising top idol.",
    details: { birthday: "April 24", age: "16 (1st Year HS)", height: "160cm", blood: "AB", cv: "Shiina Natsukawa", identity: "Idol at Terakado Ent." },
    relSena: "Sena Narumi", relSenaDesc: "Biggest Supporter / Rival", relLIP: "LIP×LIP", relLIPDesc: "Colleagues / Goal", relMinami: "Minami", relMinamiDesc: "Best Friend / YouTuber",
    historyTitle: "Idol Journey",
    historyItems: ["Mar 2018: Debuted with 'Watashi, Idol Sengen'", "Forged her own path at Terakado Entertainment", "Feb 2021: Released 1st Album '#No.1'", "Held solo concerts, building strong bonds with fans"],
    role: "Super Idol", name: "Mona Narumi", love: "Love!", shaping: "Growing", clickOpen: "Click to Open",
    producerLabel: "To: Producer", loveText: "Love!", relSister: "Sister", relSisterStatus: "Admiration", relFans: "Mutual Love", relFansStatus: "Most Important",
    quotes: [
      { text: "I love how she always goes all out and puts fans first!", Author: "Fan Club Member A" },
      { text: "She might be a bit clumsy sometimes, but on stage she shines brighter than anyone ✨", Author: "Forever Fan B" },
      { text: "Her fan service hits me right in the heart every time!", Author: "Saved by Fan Service C" },
      { text: "Watching Mona reach the top is incredibly moving. That's the charm of an idol!", Author: "Veteran Fan" },
    ],
    songs: [
      { title: 'Watashi, Idol Sengen', desc: 'The first idol declaration! Enjoy the stage.', tag: 'Debut' },
      { title: 'Fansa', desc: 'Winning hearts with skill! The best fanservice.', tag: 'Million Hit' },
      { title: 'No.1', desc: 'The shining path towards dreams.', tag: 'Album Lead' },
      { title: 'Hokori Takaki Idol', desc: 'A proud idol, a stage of sweat and tears.', tag: 'Live Favorite' },
      { title: 'Jinsei wa Saikou no Himatsubushi', desc: 'Stay true to yourself with absolute confidence.', tag: 'Viral Hit' },
    ]
  },
  ko: {
    ticker: "✨ Mona 첫 정규 앨범 'No.1' 팝업 스토어 진행 중! 굿즈 및 악수회 정보 확인 · 🎀 신곡 MV 선행 공개! · ✨ Mona 첫 정규 앨범 'No.1' 팝업 스토어 진행 중!",
    fanSite: "모나 팬사이트",
    recommended: "추천곡",
    producer: "To: 프로듀서",
    profile: "프로필",
    personality: "성격",
    background: "배경 이야기",
    relMap: "인물 관계도",
    sister: "나루미 세나 (언니)",
    fans: "팬 여러분",
    mostImportant: "가장 소중한 사람",
    reasons: "매력 포인트",
    fansVoice: "팬들의 목소리",
    discography: "디스코그래피",
    latest: "싱글 미리듣기",
    mvPreview: "MV 미리보기",
    playing: "재생 중",
    boardTitle: "팬 게시판",
    boardSubtitle: "가장 빛나는 아이돌에게 사랑과 응원을!",
    post: "작성",
    placeholder: "모나를 향한 사랑을 적어주세요! ✨",
    thanks: "모나의 메시지",
    loveYou: "정말 사랑해요!",
    monaBio: "지기 싫어하고 활기찬 노력가! 가끔 서투른 모습도 보이지만 팬들 앞에서는 항상 120%의 완벽한 미소를 보여줍니다. 꿈을 위해 현재는 연애금지!",
    monaStory: "2018년 3월 '나, 아이돌 선언'으로 데뷔. 언니 세나의 후광 없이 자신의 힘으로 빛나기로 결심하고 테라카도 예능에서 고군분투 중. 2021년 1st 앨범 발매.",
    details: { birthday: "4월 24일", age: "16세 (고1)", height: "160cm", blood: "AB형", cv: "나츠카와 시이나", identity: "테라카도 소속 아이돌" },
    relSena: "나루미 세나", relSenaDesc: "최고의 아군 / 라이벌", relLIP: "LIP×LIP", relLIPDesc: "동료 / 목표", relMinami: "미나미 (Minami)", relMinamiDesc: "절친 / 유튜버",
    historyTitle: "활동 히스토리",
    historyItems: ["2018.03 '나, 아이돌 선언'으로 본격 데뷔", "언니의 이름에 기대지 않고 자신의 힘으로 활동", "2021.02 1st 앨범 '#No.1' 발매", "단독 라이브 개최 등 팬들과 계속해서 걸어가는 중"],
    role: "최고의 아이돌", name: "나루미 모나", love: "사랑해!", shaping: "성장 중", clickOpen: "클릭하여 열기",
    producerLabel: "To: 프로듀서", loveText: "러브!", relSister: "언니", relSisterStatus: "동경/열등감", relFans: "서로 사랑함", relFansStatus: "가장 소중한 존재",
    quotes: [
      { text: "항상 전력을 다하고 팬을 최우선으로 생각하는 모습이 너무 좋아요!", Author: "팬클럽 A군" },
      { text: "가끔 덜렁대지만 무대 위에서는 누구보다 빛나요✨", Author: "영원한 단오시 B양" },
      { text: "매번 팬서비스에 심장이 멎는 것 같아요! 계속 응원할게요!", Author: "팬서비스에 구원받은 C양" },
      { text: "모나가 정점을 향해 가는 모습을 보면 정말 감동적이에요. 이것이 아이돌의 매력!", Author: "어느 고인물 팬" },
    ],
    songs: [
      { title: '나, 아이돌 선언', desc: '최강 아이돌의 첫 선언! 하트를 느껴봐.', tag: '데뷔곡' },
      { title: '팬서비스', desc: '실력으로 쟁취한다! 최고의 팬서비스를 당신에게.', tag: '밀리언 히트' },
      { title: 'No.1', desc: '꿈을 향해 빛나는 궤적.', tag: '앨범 타이틀' },
      { title: '긍지 높은 아이돌', desc: '긍지 높은 아이돌, 땀과 눈물의 무대.', tag: '라이브 인기곡' },
      { title: '인생은 최고의 시간 낭비', desc: '나답게, 절대적인 자신감의 스위트 어택.', tag: '바이럴 히트' },
    ]
  }
};

const SONGS = [
  {
    id: 1,
    title: '私、アイドル宣言',
    date: '2018.02.10',
    duration: 236,
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/98/60/91/986091d1-e98a-8c8b-4de2-2191a8e1a33d/4580074475448.jpg/1000x1000bb.jpg',
    color: 'from-[#ff9a9e] to-[#ffc8dd]',
    description: '最初的偶像宣言！一起享受舞台吧。',
    tag: '经典·出道',
  },
  {
    id: 2,
    title: 'ファンサ',
    date: '2019.06.20',
    duration: 249,
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/11/0d/96/110d962f-5d25-c552-ebd8-dd750e48af36/4582729912438_art.png/1000x1000bb.jpg',
    color: 'from-[#ff9a9e] to-[#ffc8dd]',
    description: '用实力赢得你的心！',
    tag: '百万热门',
  },
  {
    id: 3,
    title: 'No.1',
    date: '2020.02.14',
    duration: 251,
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b5/81/0c/b5810ce8-de3d-e8c0-12ae-c00549afb26b/jacket_SMXX00494B00Z_550.jpg/1000x1000bb.jpg',
    color: 'from-[#ffafcc] to-[#ffc8dd]',
    description: '向着梦想闪耀的轨迹。',
    tag: '专辑主打',
  },
  {
    id: 4,
    title: '誇り高きアイドル',
    date: '2020.10.23',
    duration: 253,
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/12/28/2c/12282c51-34a4-df2b-87d4-ece995f87e7d/4580074479675.jpg/1000x1000bb.jpg',
    color: 'from-[#ffc8dd] to-[#fecfef]',
    description: '骄傲的偶像，挥洒汗水与泪水的舞台。',
    tag: 'Live人气',
  },
  {
    id: 5,
    title: '人生は最高の暇つぶし',
    date: '2021.08.25',
    duration: 230,
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b3/1b/50/b31b50d3-c70b-3272-bfea-e370638593b3/4550752693389_cover.png/1000x1000bb.jpg',
    color: 'from-[#fed6e3] to-[#ffafcc]',
    description: '坚持做自己，绝对自信。',
    tag: '病毒式走红',
  }
];


type ReplyType = { id: number; author: string; text: string; time: string };

type CommentType = {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  liked: boolean;
  replies: ReplyType[];
};

const INITIAL_COMMENTS: CommentType[] = [
  { id: 1, author: 'Hina_Chan', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Hina&backgroundColor=ffdfbf', text: 'Mona酱世界第一可爱！💕', time: '2小时前', likes: 256, liked: false, replies: [{ id: 101, author: 'MonaFan', text: '绝对是！', time: '1小时前' }] },
  { id: 2, author: 'IdolFan99', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Ken&backgroundColor=ffc8dd', text: '作为超级偶像的决心感受到了！', time: '5小时前', likes: 128, liked: false, replies: [] },
  { id: 3, author: 'K-PopLover', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Jimin&backgroundColor=bbf7d0', text: '모나짱 너무 귀여워요! 항상 응원할게요 🌟', time: '6小时前', likes: 95, liked: false, replies: [] },
  { id: 4, author: 'Alex_US', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Alex&backgroundColor=bfdbfe', text: 'Your performance was absolutely stunning! Love from the US! 🇺🇸', time: '8小时前', likes: 512, liked: false, replies: [{ id: 102, author: 'PopLover', text: 'Right? It was amazing!', time: '2小时前' }] },
  { id: 5, author: 'Maria_Esp', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Maria&backgroundColor=fef08a', text: '¡Eres la mejor ídolo del mundo! Sigue brillando ✨', time: '10小时前', likes: 89, liked: false, replies: [] },
  { id: 6, author: 'Yuki_JP', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Yuki&backgroundColor=fbcfe8', text: 'モナちゃんの笑顔にいつも救われています！これからも頑張って！', time: '12小时前', likes: 345, liked: false, replies: [] },
  { id: 7, author: 'Pierre_FR', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Pierre&backgroundColor=ddd6fe', text: 'Incroyable performance! Tu es mon idole préférée.', time: '14小时前', likes: 76, liked: false, replies: [] },
  { id: 8, author: 'Anna_RU', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Anna&backgroundColor=fda4af', text: 'Мона, ты просто супер! Мы тебя любим! 💖', time: '15小时前', likes: 112, liked: false, replies: [] },
  { id: 9, author: 'Chen_CN', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Chen&backgroundColor=a7f3d0', text: '这次的新歌太好听了，无限循环中！', time: '18小时前', likes: 231, liked: true, replies: [{ id: 103, author: 'Hua', text: '同感同感！', time: '4小时前' }] },
  { id: 10, author: 'Thiago_BR', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Thiago&backgroundColor=fed7aa', text: 'Muito talento e fofura! Fã número 1 do Brasil 🇧🇷', time: '20小时前', likes: 88, liked: false, replies: [] },
  { id: 11, author: 'Sari_ID', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Sari&backgroundColor=d9f99d', text: 'Mona-chan semangat terus ya! Suaramu sangat indah.', time: '22小时前', likes: 67, liked: false, replies: [] },
  { id: 12, author: 'Emma_UK', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Emma&backgroundColor=fbcfe8', text: 'Can\'t wait for your next concert! You are a star! 🌟', time: '1天前', likes: 204, liked: false, replies: [] },
];


function FallingStars() {
  const [stars, setStars] = useState<{ id: number; left: number; delay: number; scale: number; speed: number; popped: boolean }[]>(() => {
    return Array.from({length: 10}).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      scale: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 4 + 3,
      popped: false
    }));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((current) => {
        const now = Date.now();
        const active = current.filter(s => !s.popped && (now - s.id) < 10000);
        if (active.length > 25) {
          return active;
        }
        return [...active, { 
          id: now, 
          left: Math.random() * 100, 
          delay: 0, 
          scale: Math.random() * 1.5 + 0.3,
          speed: Math.random() * 4 + 3,
          popped: false
        }];
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handlePop = (id: number) => {
    setStars(current => current.map(h => h.id === id ? { ...h, popped: true } : h));
    setTimeout(() => {
      setStars(current => current.filter(h => h.id !== id));
    }, 600);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute flex justify-center items-center"
          style={{ 
            left: `${star.left}%`, 
            top: star.popped ? 'auto' : '-10%',
            animation: star.popped ? 'none' : `fall ${star.speed}s linear forwards`,
            transform: star.popped ? 'scale(0)' : `scale(${star.scale})`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {!star.popped && (
            <button 
              onMouseEnter={() => handlePop(star.id)}
              onClick={() => handlePop(star.id)}
              className="pointer-events-auto transition-transform flex items-center justify-center cursor-crosshair opacity-60 hover:opacity-100"
            >
              <Star className="text-white fill-white" style={{ width: `${30 * star.scale}px`, height: `${30 * star.scale}px` }} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function Bow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 60" fill="none">
      <path d="M50 30C40 30 10 10 10 30C10 50 40 30 50 30Z" fill="#ffb6c1" opacity="0.9"/>
      <path d="M50 30C60 30 90 10 90 30C90 50 60 30 50 30Z" fill="#ffb6c1" opacity="0.9"/>
      <circle cx="50" cy="30" r="8" fill="#ff9ff3"/>
    </svg>
  );
}

function AngelWing({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg className={className} style={{ transform: flip ? 'scaleX(-1)' : 'none' }} viewBox="0 0 100 100" fill="none">
      <path d="M80 20C70 10 40 20 30 40C20 60 40 80 40 80C35 70 35 55 45 45C55 35 75 30 80 20Z" fill="white" opacity="0.9"/>
      <path d="M70 30C60 25 45 35 40 50C35 60 50 75 50 75C45 65 48 55 55 50C65 45 75 40 70 30Z" fill="rgba(255,192,203,0.4)"/>
    </svg>
  );
}

// --- Helper Components ---\n
function FanSiteBadge({ text }: { text: string }) {
  const [starRotation, setStarRotation] = useState(0);

  return (
    <div className="relative group hidden sm:block">
      {/* Decorative Rotating Background Border Effect */}
      <div className="absolute -inset-[3px] bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-[2rem] opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-[pulse_2s_infinite]"></div>
      
      {/* Main Badge */}
      <div className="relative flex items-center gap-3 bg-white/90 backdrop-blur-sm border-2 border-pink-300 shadow-[0_0_15px_rgba(255,182,193,0.5)] px-6 py-2 rounded-[2rem] transform transition-all hover:scale-105">
        
        {/* Bow Decoration Left */}
        <Bow className="w-8 h-8 transform -rotate-[15deg] absolute -left-4 -top-3 drop-shadow-md z-20" />
        
        <span className="font-display font-black text-xl tracking-widest text-pink-500 uppercase z-10 select-none">
          {text}
        </span>

        {/* Interactive Star Right */}
        <motion.div 
          onClick={() => setStarRotation(prev => prev + 360)}
          animate={{ rotate: starRotation }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="cursor-pointer z-20 ml-2"
        >
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-md" />
        </motion.div>
        
        {/* Sparkle Decorations */}
        <Sparkles className="w-4 h-4 text-pink-300 absolute -bottom-2 right-4 animate-bounce" />
        <Sparkles className="w-3 h-3 text-purple-300 absolute -top-1 right-10 animate-pulse" />
      </div>
    </div>
  );
}


function MicCartoon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      <rect x="40" y="20" width="20" height="35" rx="10" fill="#fbc531" />
      <path d="M30 40V45C30 55 38 63 48 64V80H40V85H60V80H52V64C62 63 70 55 70 45V40" stroke="#ffb6c1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="50" cy="30" r="10" fill="#ff9ff3" opacity="0.9"/>
      <path d="M45 25 L55 25 M45 30 L55 30 M45 35 L55 35" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}


function MonaLive2D({ mousePos }: { mousePos: { x: number, y: number } }) {
  const [isLaughing, setIsLaughing] = useState(false);

  // Rotation angles based on mouse position
  const rotateY = mousePos.x * 20; // Max 20 deg left/right
  const rotateX = -mousePos.y * 20; // Max 20 deg up/down
  
  // Subtle sway effect
  const sway = {
    animate: {
      y: [0, -5, 0],
      rotate: [0, 0.5, -0.5, 0]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const handleHeadClick = () => {
    setIsLaughing(true);
    setTimeout(() => setIsLaughing(false), 2000);
  };

  return (
    <motion.div 
      {...sway}
      className="relative w-[280px] h-[400px] cursor-pointer group"
      style={{ perspective: 1000 }}
    >
      {/* Body Layer */}
      <motion.div 
        className="absolute inset-0 flex items-end justify-center"
        style={{ rotateY: rotateY * 0.3, rotateX: rotateX * 0.3 }}
      >
        <svg width="240" height="300" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Simple School Uniform / Idol Outfit */}
          <path d="M30 120 L70 120 L75 40 L25 40 Z" fill="#2d3436" />
          <path d="M25 40 L50 30 L75 40 L50 60 Z" fill="white" />
          <path d="M45 40 L50 50 L55 40 Z" fill="#ff7675" /> {/* Bow */}
          <rect x="35" y="20" width="30" height="20" rx="10" fill="#fbc531" opacity="0.3" /> {/* Neck area */}
        </svg>
      </motion.div>

      {/* Head Layer (Main Interactive Part) */}
      <motion.div 
        onClick={handleHeadClick}
        className="absolute bottom-[200px] left-1/2 -translate-x-1/2 w-[180px] h-[220px]"
        style={{ 
          rotateY: rotateY, 
          rotateX: rotateX,
          x: mousePos.x * 15,
          y: mousePos.y * 15,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Hair - Back */}
        <div className="absolute inset-0 z-0">
          <svg viewBox="0 0 100 100" fill="#e67e22">
            <path d="M10 50 C10 10 90 10 90 50 L85 90 C85 95 15 95 15 90 Z" />
          </svg>
        </div>

        {/* Face Base */}
        <div className="absolute inset-[15%] bg-[#ffeaa7] rounded-[40%] border-2 border-pink-100 z-10" />

        {/* Eyes */}
        <motion.div 
          className="absolute top-[40%] left-[25%] flex justify-between w-[50%] z-20"
          animate={isLaughing ? { scaleY: 0.1 } : { scaleY: 1 }}
        >
          <div className="w-6 h-6 bg-white rounded-full border-2 border-pink-100 relative overflow-hidden">
            <motion.div 
              style={{ x: mousePos.x * 6, y: mousePos.y * 6 }}
              className="absolute inset-1.5 bg-[#2ecc71] rounded-full"
            >
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
            </motion.div>
          </div>
          <div className="w-6 h-6 bg-white rounded-full border-2 border-pink-100 relative overflow-hidden">
            <motion.div 
              style={{ x: mousePos.x * 6, y: mousePos.y * 6 }}
              className="absolute inset-1.5 bg-[#2ecc71] rounded-full"
            >
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
            </motion.div>
          </div>
        </motion.div>

        {/* Mouth */}
        <motion.div 
          className="absolute top-[65%] left-1/2 -translate-x-1/2 z-20"
          animate={isLaughing ? { scale: 1.5, y: -2 } : { scale: 1, y: 0 }}
        >
          {isLaughing ? (
            <div className="w-10 h-5 bg-[#ff7675] rounded-full border-2 border-pink-100" />
          ) : (
            <div className="w-8 h-2 bg-[#ff7675] rounded-full border-2 border-pink-100 opacity-60" />
          )}
        </motion.div>

        {/* Hair - Front (Bangs & Twintails) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="none">
             {/* Bangs */}
             <path d="M15 20 Q50 -10 85 20 Q50 45 15 20" fill="#e67e22" stroke="#2d3436" strokeWidth="1" />
             {/* Pink Bows */}
             <path d="M10 40 L0 30 L20 30 Z" fill="#fd79a8" stroke="#2d3436" strokeWidth="1" />
             <path d="M90 40 L100 30 L80 30 Z" fill="#fd79a8" stroke="#2d3436" strokeWidth="1" />
          </svg>
        </div>
      </motion.div>

      {/* Laugh Text Bubble */}
      <AnimatePresence>
        {isLaughing && (
          <motion.div 
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: -40 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full border-2 border-pink-100 shadow-xl shadow-pink-100 font-black z-50 text-pink-500 whitespace-nowrap uppercase italic tracking-widest text-lg"
          >
            Ahahaha! ☆
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


const FINALE_LYRICS = [
  "いつも応援してくれてありがとう✨",
  "みんなの笑顔が、私のNo.1の宝物！",
  "これからも、もっともっと輝くから",
  "ずっとそばで見ててね！",
  "ラブ！💕"
];

function InteractiveFinale() {
  const [clicks, setClicks] = useState(0);
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 z-10 text-center">
      <AnimatePresence>
        {FINALE_LYRICS.slice(0, clicks).map((line, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ type: 'spring', bounce: 0.5 }}
             className="text-2xl md:text-3xl font-black text-pink-600 mb-6 drop-shadow-sm tracking-widest bg-white/80 px-6 py-3 rounded-full border-2 border-white"
           >
              {line}
           </motion.div>
        ))}
      </AnimatePresence>

      {clicks < FINALE_LYRICS.length && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.button 
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: [0, -20, 0], opacity: 1 }}
            transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" }, opacity: { duration: 1 } }}
            onClick={() => setClicks(c => c + 1)}
            className="pointer-events-auto mt-[40vh] bg-gradient-to-br from-white to-pink-50 p-6 rounded-full border border-pink-100 shadow-2xl shadow-pink-200 hover:scale-110 active:scale-90 transition-transform relative"
          >
            <AngelWing className="absolute -left-12 -top-6 w-24 h-24 opacity-80" />
            <AngelWing className="absolute -right-12 -top-6 w-24 h-24 opacity-80" flip />
            <Heart className="w-16 h-16 text-pink-400 fill-pink-400 relative z-10" />
          </motion.button>
        </div>
      )}
      
      {clicks === 0 && (
        <p className="absolute bottom-32 text-pink-400 font-bold animate-pulse text-sm tracking-widest uppercase">Click the falling heart</p>
      )}
      
      {clicks >= FINALE_LYRICS.length && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mt-8 flex flex-col items-center z-20"
        >
          <div className="border-[12px] border-white shadow-2xl shadow-pink-200 transform rotate-[-2deg] hover:rotate-[2deg] transition-transform duration-500 max-w-sm w-full bg-white pb-12 relative flex flex-col items-center">
            <img 
              src="https://github.com/van822853-code/mona/issues/1#issuecomment-4386724364"
              alt="Mona Live"
              className="w-full object-cover"
            />
            <div className="absolute bottom-3 font-display font-black text-xl text-pink-400">
               Thank you!
            </div>
            <Bow className="absolute -top-6 -left-6 w-16 h-16 transform -rotate-12" />
          </div>
        </motion.div>
      )}

    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<'zh' | 'ja' | 'en' | 'ko'>('zh');
  const [menuOpen, setMenuOpen] = useState(false);

  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const switchLanguage = (newLang: 'zh' | 'ja' | 'en' | 'ko') => {
    setLang(newLang);
    setLangMenuOpen(false);
  };

  const t = TRANSLATIONS[lang];

  const [started, setStarted] = useState(false);
  const [currentSong, setCurrentSong] = useState(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [bgmPlaying, setBgmPlaying] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (scrollContainerRef.current) {
        const rect = scrollContainerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const playSong = (song: typeof SONGS[0]) => {
    if (currentSong.id === song.id) {
      togglePlay();
    } else {
      setCurrentSong(song);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  
  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now(),
        author: 'ゲストファン',
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${Date.now()}&backgroundColor=ffdfbf`,
        text: newComment,
        time: '刚刚',
        likes: 0,
        liked: false,
        replies: []
      },
      ...comments
    ]);
    setNewComment('');
  };

  const handleLike = (id: number) => {
    setComments(comments.map(c => {
      if (c.id === id) {
        return {
          ...c,
          liked: !c.liked,
          likes: c.liked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddReply = (id: number, text: string) => {
    if (!text.trim()) return;
    setComments(comments.map(c => {
      if (c.id === id) {
        return {
          ...c,
          replies: [
            ...c.replies,
            { id: Date.now(), author: 'ゲストファン', text, time: '刚刚' }
          ]
        };
      }
      return c;
    }));
    setReplyingTo(null);
    setReplyText('');
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Background Audio Control
  const toggleBgm = () => {
    setBgmPlaying(!bgmPlaying);
  };

  return (
    <div 
      className="h-[100dvh] w-full overflow-y-auto bg-white font-sans text-pink-900 scroll-smooth"
      ref={scrollContainerRef}
    >
      <AnimatePresence>
        {!started && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] z-[200] flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm"
            onClick={() => {
              setStarted(true);
              setBgmPlaying(true);
            }}
          >
            <FallingStars />
            <div className="relative mb-12 z-10 flex items-center justify-center">
              <div className="relative">
                {/* Microphone SVG */}
                <svg width="180" height="180" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Mic Grille */}
                  <rect x="17" y="4" width="14" height="22" rx="7" fill="white" />
                  <rect x="17" y="10" width="14" height="1" fill="#ff9ff3" opacity="0.3" />
                  <rect x="17" y="15" width="14" height="1" fill="#ff9ff3" opacity="0.3" />
                  <rect x="17" y="20" width="14" height="1" fill="#ff9ff3" opacity="0.3" />
                  
                  {/* Mic Cradle */}
                  <path d="M10 18V20C10 27.732 16.268 34 24 34C31.732 34 38 27.732 38 20V18" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Mic Stand/Stem */}
                  <path d="M24 34V44" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M16 44H32" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Bow tie */}
                  <g transform="translate(24, 38)">
                    {/* Loops */}
                    <path d="M0 0C-4 -4 -12 -4 -12 2C-12 8 -4 8 0 0Z" fill="white" />
                    <path d="M0 0C4 -4 12 -4 12 2C12 8 4 8 0 0Z" fill="white" />
                    {/* Knot */}
                    <circle cx="0" cy="0" r="3" fill="white" stroke="#ff9ff3" strokeWidth="1" />
                    {/* Tails */}
                    <path d="M-2 2L-6 8M2 2L6 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </svg>

                {/* Pulsing Star Next to Mic */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 20, -20, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.2, 
                    ease: "easeInOut" 
                  }}
                  className="absolute -top-6 -right-6"
                >
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </motion.div>
                
                {/* Secondary static star for balance */}
                <div className="absolute -bottom-2 -left-8 opacity-60">
                   <Star className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-black text-white mb-4 drop-shadow-md font-display tracking-widest text-center px-4 relative z-10 uppercase italic">Narumi Mona - #No.1 Idol</h1>
            <p className="text-white/80 font-bold tracking-[0.4em] uppercase text-sm relative z-10">{t.clickOpen}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <BackgroundMusic forcePlay={started} />

      {/* Top Ticker Banner */}
      <div className="fixed top-0 w-full z-50 bg-pink-300 text-white text-xs md:text-sm font-bold py-2 px-4 shadow-xl shadow-pink-100 border-b-4 border-pink-200 pointer-events-none">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {t.ticker}
        </div>
      </div>

      {/* PAGE 1: Neo-Brutalist POP Poster */}
      <section className="min-h-[100dvh] w-full relative flex flex-col justify-center items-center bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] overflow-hidden pt-12 border-b-[8px] border-pink-200">
        
        {/* Abstract Polka Grid Background */}
        <div className="absolute inset-0 bg-polka opacity-30 mix-blend-multiply pointer-events-none"></div>
        <FallingStars />

        {/* Big Text Background */}
        <div className="absolute top-[15%] left-[-5%] font-display font-black text-[15rem] leading-none text-yellow-300 opacity-60 mix-blend-multiply pointer-events-none whitespace-nowrap tracking-tighter transform rotate-0 select-none">MONA MONA</div>

        {/* Global Navigation within Poster */}
        <div className="absolute top-[4.5rem] w-full px-6 md:px-12 flex justify-between items-center text-pink-950 z-50">
          <div className="flex gap-4 pointer-events-auto">
            <FanSiteBadge text={t.fanSite} />
          </div>
          <div className="flex gap-4 pointer-events-auto relative">
             <div className="relative">
               <button 
                 onClick={() => setLangMenuOpen(!langMenuOpen)}
                 className="bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] border-2 border-pink-100 px-4 py-2 rounded-full font-black text-sm tracking-widest uppercase transition-all hover:-translate-y-1 hover:shadow-xl shadow-pink-100 flex items-center gap-2"
               >
                 <Languages className="w-5 h-5" />
                 语种切换
               </button>
               <AnimatePresence>
                 {langMenuOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute left-0 top-14 bg-white/90 backdrop-blur-md border-2 border-pink-200 p-4 rounded-3xl shadow-2xl flex flex-col gap-2 min-w-[140px] z-[100]"
                   >
                     <button onClick={() => switchLanguage('zh')} className={`px-4 py-2 hover:bg-pink-50 rounded-xl font-bold transition-colors text-left ${lang === 'zh' ? 'text-pink-500 bg-pink-50' : 'text-pink-900'}`}>中文</button>
                     <button onClick={() => switchLanguage('ja')} className={`px-4 py-2 hover:bg-pink-50 rounded-xl font-bold transition-colors text-left ${lang === 'ja' ? 'text-pink-500 bg-pink-50' : 'text-pink-900'}`}>日本語</button>
                     <button onClick={() => switchLanguage('en')} className={`px-4 py-2 hover:bg-pink-50 rounded-xl font-bold transition-colors text-left ${lang === 'en' ? 'text-pink-500 bg-pink-50' : 'text-pink-900'}`}>English</button>
                     <button onClick={() => switchLanguage('ko')} className={`px-4 py-2 hover:bg-pink-50 rounded-xl font-bold transition-colors text-left ${lang === 'ko' ? 'text-pink-500 bg-pink-50' : 'text-pink-900'}`}>한국어</button>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
             <div className="relative">
               <button onClick={() => setMenuOpen(!menuOpen)} className="bg-white border-2 border-pink-100 w-12 h-12 rounded-full flex items-center justify-center font-bold transition-transform hover:-translate-y-1 hover:shadow-xl shadow-pink-100 shadow-xl shadow-pink-100">
                 <Menu className="w-6 h-6"/>
               </button>
               <AnimatePresence>
                 {menuOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute right-0 top-14 bg-white/90 backdrop-blur-md border-2 border-pink-200 p-4 rounded-3xl shadow-2xl flex flex-col gap-2 min-w-[160px] z-[100]"
                   >
                     <a href="#profile" onClick={() => setMenuOpen(false)} className="px-4 py-2 hover:bg-pink-50 rounded-xl font-bold text-pink-900 transition-colors">{t.profile}</a>
                     <a href="#music" onClick={() => setMenuOpen(false)} className="px-4 py-2 hover:bg-pink-50 rounded-xl font-bold text-pink-900 transition-colors">{t.latest}</a>
                     <a href="#mv" onClick={() => setMenuOpen(false)} className="px-4 py-2 hover:bg-pink-50 rounded-xl font-bold text-pink-900 transition-colors">{t.mvPreview}</a>
                     <a href="#board" onClick={() => setMenuOpen(false)} className="px-4 py-2 hover:bg-pink-50 rounded-xl font-bold text-pink-900 transition-colors">{t.boardTitle}</a>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
        </div>

        {/* Central Graphic Composition */}
        <div className="relative w-full max-w-7xl px-4 flex flex-col md:flex-row items-center justify-center gap-12 z-10 scale-90 md:scale-100 mt-8">
          
          {/* Mona Live2D Interactive Character */}
          <div className="w-full md:w-[60%] flex items-center justify-center pointer-events-auto z-20">
             <MonaLive2D mousePos={mousePos} />
          </div>

          {/* Interactive Phone / Player Element (Center) */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-[40%] flex justify-center mt-8 md:mt-0 z-20"
          >
            <div className="relative w-[340px] md:w-[380px] group transform rotate-0">
               {/* Metal Frame & Shadow */}
               <div className="absolute inset-0 bg-slate-900 rounded-[3.5rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_4px_rgba(0,0,0,0.5),0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none"></div>
               {/* Outer Bezel (Black) */}
               <div className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] bg-black rounded-[3.3rem] pointer-events-none"></div>
               
               {/* Side Buttons */}
               <div className="absolute top-[8rem] -left-[2px] w-[2px] h-8 bg-slate-700 rounded-l-md"></div>
               <div className="absolute top-[11rem] -left-[2px] w-[2px] h-14 bg-slate-700 rounded-l-md"></div>
               <div className="absolute top-[15.5rem] -left-[2px] w-[2px] h-14 bg-slate-700 rounded-l-md"></div>
               <div className="absolute top-[13rem] -right-[2px] w-[3px] h-20 bg-slate-700 rounded-r-md"></div>
               
               {/* Screen Context */}
               <div className="relative mt-[12px] mx-[12px] mb-[12px] bg-white rounded-[2.8rem] overflow-hidden flex flex-col pt-12 pb-8 px-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-auto z-10 transition-transform h-[680px]">
                 
                 {/* Internal iPhone 14 Notch */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[1.2rem] z-50 flex justify-center items-center pb-1">
                   {/* Speaker cutout */}
                   <div className="w-16 h-1.5 bg-[#1a1a1a] rounded-full"></div>
                   {/* Camera lens */}
                   <div className="absolute right-4 w-3 h-3 bg-[#0a0f1e] rounded-full border border-[#1e293b] flex items-center justify-center">
                     <div className="w-1 h-1 bg-blue-900/50 rounded-full"></div>
                   </div>
                 </div>
               
               <div className="mt-8 flex justify-between items-center mb-6 px-2">
                 <div>
                   <h3 className="font-black text-2xl font-display tracking-tight leading-none text-pink-500">Mona For You！</h3>
                   <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-1">{t.producer}</p>
                 </div>
                 <div className="bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] p-2 rounded-full border-2 border-pink-100 shadow-xl shadow-pink-100 animate-pulse">
                   <Heart className="w-5 h-5 text-pink-950 fill-slate-900" />
                 </div>
               </div>
               
               <div className="w-full aspect-square bg-slate-100 rounded-2xl border-2 border-pink-100 overflow-hidden relative shadow-inner group-hover:shadow-xl shadow-pink-100 transition-all">
                  <img src={currentSong.cover} className="w-full h-full object-cover" alt="Playing" />
                  
                  <div className="absolute inset-0 bg-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <button 
                      onClick={togglePlay} 
                      className="w-20 h-20 bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] text-pink-950 rounded-full border-2 border-pink-100 flex items-center justify-center shadow-xl shadow-pink-100 transform hover:scale-110 active:translate-y-1 active:shadow-xl shadow-pink-100 transition-all"
                    >
                      {isPlaying ? <Pause className="w-8 h-8 fill-slate-900" /> : <Play className="w-8 h-8 ml-1 fill-slate-900" />}
                    </button>
                  </div>
               </div>
               
               <div className="mt-6 px-2 text-center h-20">
                 <p className="font-bold text-lg text-pink-950 line-clamp-1">{t.songs[SONGS.findIndex(s => s.id === currentSong.id)].title}</p>
                 <p className="text-sm text-pink-500 font-bold mt-1 line-clamp-1">{t.songs[SONGS.findIndex(s => s.id === currentSong.id)].tag}</p>
               </div>

               <div className="w-full bg-slate-200 h-3 rounded-full border-2 border-pink-100 overflow-hidden mt-4 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] transition-all duration-1000 ease-linear border-r-2 border-pink-200"
                    style={{ width: `${(progress / currentSong.duration) * 100}%` }}
                  />
               </div>
               
               {/* iPhone Home Indicator line */}
               <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300 rounded-full"></div>
               
               </div> {/* Screen Context End */}
            </div>
          </motion.div>

          </div>
      </section>

      {/* PAGE 2: Profile & Relationship Map */}
      <section id="profile" className="min-h-[100dvh] w-full bg-white pt-24 pb-12 flex flex-col md:flex-row relative overflow-x-hidden border-b-[8px] border-pink-200 px-8 lg:px-16 items-center custom-scrollbar">
        {/* Album Liner Notes Style Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none overflow-hidden flex flex-wrap gap-4 p-4">
           {Array.from({length: 20}).map((_, i) => (
             <span key={i} className="text-pink-950 font-display font-black text-4xl transform rotate-6">MONA 1ST ALBUM NO.1</span>
           ))}
        </div>
        
        <div className="absolute -left-10 -bottom-10 opacity-10 pointer-events-none">
           <Heart className="w-96 h-96 text-slate-400 fill-slate-400 transform -rotate-6" />
        </div>

        {/* Profile Details (Liner Notes Page 2) */}
        <div className="w-full md:w-1/2 flex flex-col z-10 space-y-8 h-full justify-center">
           <div className="relative">
             <div className="bg-pink-900 text-white w-fit px-4 py-1 text-sm font-black tracking-widest uppercase mb-4 shadow-xl shadow-pink-100 transform rotate-0">PAGE 02 // AUDITION RESUME</div>
             <h2 className="text-5xl lg:text-7xl font-display font-black text-pink-950 tracking-tighter leading-none mb-2 drop-shadow-xl shadow-pink-100">{t.name.split(' ')[0]}<br/>{t.name.split(' ')[1]}</h2>
             <p className="text-xl font-bold bg-white text-pink-950 px-3 py-1 w-fit border-2 border-pink-100 transform rotate-0 shadow-xl shadow-pink-100">OFFICIAL RESUME // {t.profile}</p>
           </div>

           {/* Quick Stats Grid */}
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(t.details).map(([key, value]) => (
                <div key={key} className="bg-white border-2 border-pink-100 p-3 shadow-xl shadow-pink-100 rounded-xl flex flex-col hover:-translate-y-1 transition-transform">
                  <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest mb-1">{key}</span>
                  <span className="text-xs font-black text-pink-950 leading-none">{value as string}</span>
                </div>
              ))}
           </div>
           
           <motion.div 
             style={{ 
               rotateY: mousePos.x * 20, 
               rotateX: -mousePos.y * 20,
               transformStyle: "preserve-3d"
             }}
             className="bg-white rounded-[1rem] border-2 border-pink-100 p-8 shadow-xl shadow-pink-100 transform rotate-0 max-w-lg mb-4 relative"
           >
             <div className="absolute top-4 right-4 text-slate-200">
               <Music className="w-12 h-12" />
             </div>
             <h3 className="font-black text-xl mb-4 flex items-center gap-2 border-b-4 border-pink-200 pb-2"><Sparkles className="w-5 h-5 text-pink-500"/> {t.personality}</h3>
             <p className="font-bold text-stone-600 leading-relaxed mb-8 text-md border-l-4 border-pink-200 pl-4 italic">
                {t.monaBio}
             </p>
             <h3 className="font-black text-xl mb-4 flex items-center gap-2 border-b-4 border-pink-200 pb-2"><History className="w-5 h-5 text-pink-500"/> {t.historyTitle}</h3>
             <div className="space-y-2 mb-6 border-l-4 border-pink-100 pl-4">
                {t.historyItems.map((item: string, i: number) => (
                  <div key={i} className="flex gap-2 text-[11px] font-bold text-stone-500">
                    <span className="text-pink-400 shrink-0 select-none">•</span>
                    <span>{item}</span>
                  </div>
                ))}
             </div>
             <h3 className="font-black text-xl mb-4 flex items-center gap-2 border-b-4 border-pink-200 pb-2"><Heart className="w-5 h-5 text-pink-500 fill-pink-500"/> {t.background}</h3>
             <p className="font-bold text-stone-600 leading-relaxed text-sm mb-0 border-l-4 border-pink-200 pl-4">
                {t.monaStory}
             </p>
           </motion.div>
           
           {/* Relationship Diagram */}
           <div className="bg-white border-2 border-pink-100 rounded-[2rem] p-4 shadow-xl shadow-pink-100 transform rotate-0 max-w-lg w-full">
             <h3 className="font-black text-lg mb-4 border-b-2 border-dashed border-pink-200 pb-2 flex justify-between items-center">
                {t.relMap}
                <span className="text-[10px] text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">OFFICIAL RELATIONS</span>
              </h3>
             <div className="grid grid-cols-3 gap-2 items-center">
               <div className="flex flex-col items-center">
                 <div className="w-12 h-12 bg-blue-100 rounded-full border-2 border-pink-100 flex items-center justify-center mb-1 overflow-hidden shrink-0">
                   <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=Sena&backgroundColor=b6e3f4" alt="Sena" className="w-full h-full object-cover"/>
                 </div>
                 <p className="text-[10px] font-black text-stone-600">{t.relSister}</p>
                 <p className="text-[9px] bg-pink-900 text-white px-1 rounded uppercase">{t.relSisterStatus}</p>
               </div>
               <div className="flex-1 border-t-2 border-pink-200 border-dashed relative mx-1">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-stone-600 bg-white px-2 whitespace-nowrap border-2 border-pink-100 rounded-full shadow-xl shadow-pink-100">{t.relSisterStatus}</div>
               </div>
               <div className="flex flex-col items-center mx-1">
                 <div className="w-16 h-16 bg-pink-100 rounded-full border-4 border-pink-400 flex items-center justify-center mb-1 overflow-hidden shadow-sm shrink-0 shadow-xl shadow-pink-100">
                   <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=Mona&backgroundColor=ffc8dd" alt="Mona" className="w-full h-full object-cover"/>
                 </div>
                 <p className="text-sm font-black text-pink-500 uppercase">Mona</p>
               </div>
               <div className="flex-1 border-t-2 border-pink-200 border-dashed relative mx-1">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-stone-600 bg-white px-2 whitespace-nowrap border-2 border-pink-100 rounded-full shadow-xl shadow-pink-100">{t.relFansStatus}</div>
               </div>
               <div className="flex flex-col items-center">
                 <div className="w-12 h-12 bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] rounded-full border-2 border-pink-100 flex items-center justify-center mb-1 overflow-hidden relative shrink-0">
                    <Heart className="w-6 h-6 text-white fill-white" />
                 </div>
                 <p className="text-[10px] font-black text-stone-600">{t.relFans}</p>
                 <p className="text-[9px] bg-pink-900 text-white px-1 rounded uppercase text-center leading-none tracking-tighter">{t.relFansStatus}</p>
               </div>
             </div>
           </div>
        </div>

        {/* Fan's Voice Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative mt-16 md:mt-0 z-10 min-h-[400px]">
           <h3 className="text-2xl md:text-3xl font-display font-black text-pink-950 mb-8 bg-white px-6 py-2 border-2 border-pink-100 shadow-xl shadow-pink-100 transform rotate-0">{t.reasons}</h3>
           
           <div className="bg-white rounded-[2rem] border-2 border-pink-100 shadow-xl shadow-pink-100 p-8 pb-12 transform rotate-0 relative max-w-lg w-full">
             <div className="absolute -top-4 -left-4 bg-[#ffe492] px-4 py-2 border-4 border-[#0a0505] rounded-full font-black text-pink-950 rotate-[-3deg]">{t.fansVoice}</div>
             
             <div className="space-y-4">
               {t.quotes.map((quote, index) => (
                 <div key={index} className={index > 0 ? "border-t-2 border-slate-100 pt-4" : ""}>
                   <p className="font-bold text-stone-600 leading-relaxed text-md mb-1">
                      {quote.text}
                   </p>
                   <p className="text-sm font-bold text-pink-500 text-right">— {quote.Author}</p>
                 </div>
               ))}
             </div>
             
             <div className="absolute -bottom-6 -right-6 text-[#ffb2b2]">
                <Heart className="w-12 h-12 fill-[#ffb2b2]" />
             </div>
           </div>
        </div>
      </section>

      {/* PAGE 3: Horizons / Hit Songs Carousel */}
      <section id="music" className="min-h-[100dvh] w-full bg-white pt-24 pb-12 flex flex-col border-b-[8px] border-pink-200">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end px-8 md:px-16 mb-12">
          <div className="relative">
            <div className="bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] text-white w-fit px-4 py-1 text-sm font-black tracking-widest uppercase mb-4 shadow-xl shadow-pink-100">{t.discography}</div>
            <h2 className="text-6xl md:text-8xl font-display font-black text-pink-950 tracking-tighter leading-none transform rotate-0 relative z-10">{t.latest}</h2>
            <div className="absolute -bottom-4 -right-8 -z-10 bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] w-24 h-24 rounded-full border-2 border-pink-100 hidden md:block"></div>
          </div>
          
          <div className="hidden md:flex gap-4 mt-8 md:mt-0">
            <button onClick={scrollLeft} className="w-16 h-16 bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] rounded-full border-2 border-pink-100 shadow-xl shadow-pink-100 flex items-center justify-center text-pink-950 hover:translate-y-1 hover:shadow-none transition-all">
               <ArrowLeft className="w-8 h-8" />
            </button>
            <button onClick={scrollRight} className="w-16 h-16 bg-[#ff9a9e] rounded-full border-2 border-pink-100 shadow-xl shadow-pink-100 flex items-center justify-center text-white hover:translate-y-1 hover:shadow-none transition-all">
               <ArrowRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Scrolling Carousel */}
        <div className="w-full relative px-4 md:px-16 flex-1 flex flex-col justify-center overflow-hidden">
          <div 
            ref={carouselRef}
            className="w-full h-full flex overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar items-center"
            style={{ scrollPaddingLeft: '4rem' }}
          >
            {SONGS.map((song, index) => (
              <div 
                key={song.id} 
                className="snap-start shrink-0 w-[85vw] sm:w-[360px] md:w-[420px] flex flex-col group cursor-pointer h-full max-h-[600px]"
                onClick={() => playSong(song)}
              >
                <div className="flex gap-6 mb-6 items-end flex-1">
                   {/* Vertical Date */}
                   <p className="text-xl font-display font-black text-slate-300 writing-vertical-rl pb-2 select-none tracking-widest leading-[1]">
                     {song.date}
                   </p>
                   
                   {/* Album Art Container (Vinyl Record Style without hole) */}
                   <div className={`relative aspect-square w-full rounded-full overflow-hidden transition-all duration-500 ${isPlaying && currentSong.id === song.id ? 'animate-[spin_4s_linear_infinite]' : 'group-hover:-translate-y-2 group-hover:animate-[spin_8s_linear_infinite]'} shadow-xl group-hover:shadow-2xl`}>
                      <img src={song.cover} alt={song.title} className="w-full h-full object-cover rounded-full" />
                      
                      {/* Interactive overlays */}
                      {currentSong.id === song.id ? (
                        <div className="absolute inset-0 bg-pink-900/40 rounded-full flex flex-col items-center justify-center pointer-events-none">
                           <div className="bg-[#ff9a9e] text-pink-950 border-2 border-pink-100 px-3 py-1 font-black shadow-xl shadow-pink-100 animate-pulse mb-8 z-10">{t.playing}</div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-white/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" style={{ background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.4) 225deg, transparent 270deg)' }}></div>
                      )}
                   </div>
                </div>

                {/* Metadata */}
                <div className="pl-14 border-t-4 border-pink-200 pt-6 relative group-hover:border-[#ff6b81] transition-colors">
                   <h3 className="font-display font-black text-3xl text-pink-950 leading-tight group-hover:text-[#ff6b81] transition-colors mb-4">{t.songs[index].title}</h3>
                   <p className="text-stone-500 font-bold text-lg leading-relaxed">{t.songs[index].desc}</p>
                </div>
              </div>
            ))}
            
            {/* End spacer */}
            <div className="snap-start shrink-0 w-8 h-full"></div>
          </div>
        </div>
      </section>

      
      {/* PAGE 4: MV Preview */}
      <section id="mv" className="w-full relative py-24 bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] overflow-hidden border-b-8 border-pink-200">
        <div className="absolute inset-0 bg-polka opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-10 left-10 font-display font-black text-[10rem] text-pink-300 opacity-20 pointer-events-none select-none tracking-tighter leading-none mix-blend-multiply">MOVIES</div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b-4 border-pink-900 pb-6 relative">
            <div>
              <div className="bg-pink-900 text-white w-fit px-4 py-1 text-sm font-black tracking-widest uppercase mb-4 shadow-xl shadow-pink-100 transform -rotate-1">OFFICIAL VIDEO</div>
              <h2 className="font-display font-black text-6xl md:text-8xl tracking-tighter text-pink-950 uppercase">{t.mvPreview}</h2>
            </div>
          </div>

          {/* Horizontal Scrolling MV Container */}
          <div className="flex overflow-x-auto gap-8 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar">
            {[
              { id: 'Fz036w08RDE', title: '私、アイドル宣言', date: '2018.02.10', tag: 'OFFICIAL MV' },
              { id: '1bWYBxa2R1s', title: 'ファンサ', date: '2019.06.21', tag: 'OFFICIAL MV' },
              { id: 'yY7Gg7F4Xl0', title: '誇り高きアイドル', date: '2021.05.28', tag: 'OFFICIAL MV' },
              { id: '6aF9BfLDBrY', title: '人生は最高の暇つぶし', date: '2020.12.26', tag: 'OFFICIAL MV' },
            ].map((mv, index) => (
              <div key={index} className="flex-none w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center">
                <div className="bg-white border-4 border-pink-900 rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_#831843] group relative hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#831843] transition-all duration-300">
                  <div className="relative aspect-video w-full bg-slate-900">
                    <Player
                      url={`https://www.youtube.com/watch?v=${mv.id}`}
                      width="100%"
                      height="100%"
                      controls={true}
                      light={true}
                    />
                  </div>
                  <div className="p-6 bg-yellow-50 border-t-4 border-pink-900 flex justify-between items-center gap-4">
                    <div>
                       <div className="text-xs font-black tracking-widest text-pink-600 mb-1">{mv.tag}</div>
                       <h3 className="font-display font-black text-2xl text-pink-950 line-clamp-1">{mv.title}</h3>
                    </div>
                    <div className="bg-pink-100 px-3 py-1 rounded-full border-2 border-pink-300 font-bold text-pink-800 text-sm whitespace-nowrap">
                       {mv.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 5: Fan Board - Cute & Interactive */}
      <section id="board" className="min-h-[100dvh] w-full bg-gradient-to-tl from-[#fff0f5] to-[#fde2e4] pt-24 pb-32 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 opacity-20"><MicCartoon className="w-64 h-64 transform rotate-12 opacity-80" /></div>
        <div className="absolute bottom-10 left-10 opacity-20"><Star className="w-80 h-80 text-pink-950 fill-[#ffc8dd] transform -rotate-6" /></div>

        <div className="w-full max-w-5xl px-8 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           
           {/* Left: Input Form */}
           <div className="flex flex-col">
             <h2 className="text-6xl md:text-8xl font-display font-black text-pink-950 tracking-tighter leading-none mb-4 transform rotate-0">{t.boardTitle}</h2>
             <p className="text-2xl font-bold text-pink-950 mb-8 px-2 bg-white w-fit border-2 border-pink-100 shadow-xl shadow-pink-100 transform rotate-0">{t.boardSubtitle}</p>
             
             <div className="bg-white rounded-[2rem] border-2 border-pink-100 shadow-xl shadow-pink-100 p-8 mt-4 transform rotate-0">
               <form onSubmit={handleAddComment} className="flex flex-col space-y-6">
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t.placeholder} 
                    className="w-full min-h-[160px] bg-[#fff] border-2 border-pink-100 focus:border-[#ff9ff3] rounded-2xl p-6 text-pink-900 text-xl font-bold outline-none transition-all resize-none shadow-xl shadow-pink-100"
                    maxLength={150}
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-400 font-mono text-sm">{newComment.length}/150 文字</span>
                    <button 
                      type="submit"
                      disabled={!newComment.trim()}
                      className="bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1] border-2 border-pink-100 text-pink-950 px-8 py-4 rounded-full font-black text-xl hover:-translate-y-1 hover:shadow-xl shadow-pink-100 shadow-xl shadow-pink-100 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-xl shadow-pink-100 transition-all flex items-center gap-3"
                    >
                      {t.post} <Send className="w-5 h-5 fill-slate-900" />
                    </button>
                  </div>
               </form>
             </div>
           </div>

           {/* Right: Comments List */}
           <div className="h-[600px] bg-white/40 backdrop-blur-md rounded-[3rem] border-2 border-pink-100 shadow-xl shadow-pink-100 p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
              <AnimatePresence>
                
                {comments.map((comment, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 50, rotate: 2 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={comment.id} 
                    className="bg-white p-6 rounded-[2rem] rounded-bl-none border-2 border-pink-100 shadow-xl shadow-pink-100 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl shadow-pink-100 transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-8 h-8 bg-polka opacity-20 pointer-events-none"></div>
                    <div className="flex gap-4">
                      <div className={`w-16 h-16 rounded-full border-2 border-pink-100 overflow-hidden shrink-0 ${i % 2 === 0 ? 'bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1]' : 'bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1]'}`}>
                        <img src={comment.avatar} alt="avatar" className="w-full h-full object-cover p-1" />
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start mb-2">
                            <span className="font-display font-black text-xl text-pink-950">{comment.author}</span>
                            <span className="text-xs font-bold bg-slate-100 px-2 py-1 border-2 border-pink-100 rounded-lg">{comment.time}</span>
                         </div>
                         <p className="text-stone-600 font-bold text-lg leading-snug">{comment.text}</p>
                         <div className="flex gap-6 mt-4 items-center">
                            <button onClick={() => handleLike(comment.id)} className={`flex items-center gap-1.5 text-sm font-bold ${comment.liked ? 'text-pink-500' : 'text-stone-400 hover:text-pink-400'} transition-colors`}>
                              <Heart className={`w-5 h-5 ${comment.liked ? 'fill-pink-500' : ''}`} />
                              {comment.likes > 0 && comment.likes}
                            </button>
                            <button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} className="flex items-center gap-1.5 text-stone-400 hover:text-pink-400 text-sm font-bold transition-colors">
                              <MessageCircle className="w-5 h-5" />
                              {comment.replies.length > 0 ? comment.replies.length : 'Reply'}
                            </button>
                         </div>
                      </div>
                    </div>
                    {/* Replies Section */}
                    {comment.replies.length > 0 && (
                      <div className="ml-20 flex flex-col gap-3 border-l-2 border-pink-100 pl-4">
                         {comment.replies.map(reply => (
                           <div key={reply.id} className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                             <div className="flex justify-between items-center mb-1">
                               <span className="font-bold text-pink-900">{reply.author}</span>
                               <span className="text-xs text-stone-400 font-medium">{reply.time}</span>
                             </div>
                             <p className="text-stone-600 text-sm font-bold">{reply.text}</p>
                           </div>
                         ))}
                      </div>
                    )}
                    {/* Reply Input */}
                    {replyingTo === comment.id && (
                      <div className="ml-20 flex items-center justify-between gap-3 mt-2">
                        <input 
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="flex-1 bg-stone-50 border-2 border-pink-100 focus:border-pink-300 rounded-full px-4 py-2 text-sm font-bold outline-none"
                        />
                        <button 
                          onClick={() => handleAddReply(comment.id, replyText)}
                          disabled={!replyText.trim()}
                          className="bg-pink-100 hover:bg-pink-200 text-pink-900 border-2 border-pink-200 p-2 rounded-full disabled:opacity-50 transition-colors"
                        >
                          <Reply className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}

              </AnimatePresence>
           </div>
        </div>
      </section>

      {/* PAGE 5: Thank You Section */}
      <section className="min-h-[100dvh] w-full bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] relative flex flex-col justify-center items-center overflow-hidden border-b-4 border-pink-100 px-4">
        <div className="absolute inset-0 bg-polka opacity-10 pointer-events-none mix-blend-multiply"></div>
        <FallingStars />
        <InteractiveFinale />
        
        {/* Background Decorative Text Layer */}
        <div className="absolute top-[15%] left-[5%] font-display font-black text-[12rem] text-pink-100 opacity-50 pointer-events-none select-none tracking-tighter leading-none">THANKS</div>
        <div className="absolute bottom-[10%] right-[5%] font-display font-black text-[12rem] text-pink-100 opacity-50 pointer-events-none select-none tracking-tighter leading-none">HONEY</div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40">
          <p className="text-pink-900 font-black tracking-[0.3em] text-[12px] uppercase">Narumi Mona Official Archive • 2026</p>
          <div className="w-24 h-1 bg-pink-900 rounded-full"></div>
        </div>
      </section>

      {/* Global Fixed Bottom Player Timeline */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full z-[100] bg-white border-t-8 border-pink-200 px-6 py-4 flex items-center gap-6 shadow-xl shadow-pink-100"
          >
             <div className="w-16 h-16 rounded-xl border-2 border-pink-100 overflow-hidden shrink-0 shadow-xl shadow-pink-100">
               <img src={currentSong.cover} className="w-full h-full object-cover" alt="Playing icon" />
             </div>
             
             <div className="flex-1 max-w-4xl max-hidden sm:block">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <Disc className="w-5 h-5 text-[#ff6b81] animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="font-display font-black text-xl text-pink-950">{currentSong.title}</span>
                  </div>
                  <span className="text-sm border-2 border-pink-100 px-2 rounded font-bold font-mono text-pink-950">
                    {formatTime(progress)} / {formatTime(currentSong.duration)}
                  </span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full border-2 border-pink-100 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full bg-gradient-to-r ${currentSong.color} transition-all duration-1000 ease-linear border-r-2 border-pink-200`}
                    style={{ width: `${(progress / currentSong.duration) * 100}%` }}
                  />
                </div>
             </div>

             <div className="flex-1 sm:hidden flex flex-col justify-center">
               <span className="font-display font-black text-lg text-pink-950 truncate">{currentSong.title}</span>
               <span className="text-xs font-bold text-slate-500">{formatTime(progress)} / {formatTime(currentSong.duration)}</span>
             </div>
             
             <button onClick={togglePlay} className="w-14 h-14 shrink-0 bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] rounded-full border-2 border-pink-100 flex items-center justify-center text-pink-950 shadow-xl shadow-pink-100 hover:bg-pink-900 hover:text-white transition-colors transform active:translate-y-1 active:shadow-none">
                <Pause className="w-6 h-6 fill-current" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
