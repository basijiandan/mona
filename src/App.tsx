import type { FormEvent } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Languages, Play, Pause, Heart, Send, Sparkles, Star, Music, ArrowRight, ArrowLeft, Menu, Disc, MessageSquare, Volume2, VolumeX, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';
import BackgroundMusic from './BackgroundMusic';

const Player = ReactPlayer as any;

const TRANSLATIONS = {
  zh: {
    ticker: "✨ Mona 首张专辑 'No.1' POPUP STORE 举办中！周边贩售及握手会详情请点击查看 · 🎀 全新单曲 MV 视听解禁！ · ✨ Mona 首张专辑 'No.1' POPUP STORE 举办中！",
    fanSite: "官方粉丝站",
    recommended: "推荐单曲",
    producer: "致：制作人",
    profile: "个人档案",
    personality: "性格特点",
    background: "背景故事",
    relMap: "人物关系图",
    sister: "成海圣奈 (姐姐)",
    fans: "粉丝们",
    mostImportant: "最重要的人",
    reasons: "被吸引的理由",
    fansVoice: "粉丝心声",
    discography: "作品集",
    latest: "最新情报",
    playing: "播放中",
    boardTitle: "粉丝留言板",
    boardSubtitle: "支持与热爱，送给最闪耀的偶像！",
    post: "发布留言",
    placeholder: "写下你对 Mona 酱的热爱吧！✨",
    thanks: "来自 Mona 的谢意",
    loveYou: "最喜欢你了！",
    monaBio: "性格元气努力、不服输、要强又可爱。怀揣着“我也要在属于我的舞台上闪耀”的决心，Mona 踏上了残酷又绚丽的偶像之路。为了梦想，她目前全心投入事业，暂时没有恋爱计划。",
    monaStory: "2018年3月以《我的偶像宣言》正式出道。拒绝靠着姐姐成海圣奈的名气，坚持凭自己的努力在寺门艺能事务所作为新人偶像奋斗。2021年发行首张个人专辑，如今已是一线新人偶像。",
    details: {
      birthday: "4月24日",
      age: "16岁（高一）",
      height: "160cm",
      blood: "AB型",
      cv: "夏川椎菜",
      identity: "寺门艺能所属偶像",
    },
    relSena: "成海圣奈",
    relSenaDesc: "最强后盾 / 竞争对手",
    relLIP: "LIP×LIP",
    relLIPDesc: "同事 / 目标",
    relMinami: "南 (Minami)",
    relMinamiDesc: "好友 / YouTuber",
    historyTitle: "星光历程",
    historyItems: [
      "2018.03 以《我的偶像宣言》正式出道",
      "拒绝靠姐姐名气，坚持凭自己努力在寺门艺能奋斗",
      "2021.02 发布首张个人专辑《#No.1》",
      "举办多场个人演唱会，与粉丝建立了最深厚的羁绊"
    ],
    role: "超级偶像",
    name: "成海 萌奈",
    love: "爱心！",
    shaping: "塑造成长中",
    clickOpen: "点击开始了解",
    producerLabel: "致：制作人",
    loveText: "ラブ！",
    relSister: "姐姐",
    relSisterStatus: "憧憬/自卑",
    relFans: "双向奔赴",
    relFansStatus: "最重要的人",
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
    fanSite: "ファンサイト",
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
    latest: "最新情報",
    playing: "再生中",
    boardTitle: "ファン掲示板",
    boardSubtitle: "輝くアイドルへ、愛と応援を届けよう！",
    post: "投稿する",
    placeholder: "Monaちゃんへの愛を叫ぼう！✨",
    thanks: "Monaからのメッセージ",
    loveYou: "大好きだよ！",
    monaBio: "負けず嫌いで、情熱と活力に満ちた努力家！時折不器用な面も見せますが、ファンの前では常に120%の完璧な笑顔を絶やしません。夢のために、現在は恋愛禁止で活動中。",
    monaStory: "2018年3月『私、アイドル宣言』でデビュー。姉・成海聖奈に頼らず、自らの力で輝くことを決意。寺門芸能所属の新人アイドルとして奮闘し、2021年には1stアルバムをリリースしました。",
    details: {
      birthday: "4月24日",
      age: "16歳（高一）",
      height: "160cm",
      blood: "AB型",
      cv: "夏川椎菜",
      identity: "寺門芸能所属アイドル",
    },
    relSena: "成海聖奈",
    relSenaDesc: "最強の味方 / ライバル",
    relLIP: "LIP×LIP",
    relLIPDesc: "同僚 / 目標",
    relMinami: "南 (Minami)",
    relMinamiDesc: "親友 / YouTuber",
    historyTitle: "活動ヒストリー",
    historyItems: [
      "2018.03 『私、アイドル宣言』で本格デビュー",
      "姉・聖奈の力に頼らず、寺門芸能にて自らの力で活動",
      "2021.02 1stアルバム『#No.1』をリリース",
      "ワンマンライブ開催など、ファンと共に歩み続けています"
    ],
    role: "#No.1 アイドル",
    name: "成海 萌奈",
    love: "大好き！",
    shaping: "成長中",
    clickOpen: "アーカイブを開く",
    producerLabel: "To: プロデューサー",
    loveText: "ラブ！",
    relSister: "姉",
    relSisterStatus: "憧れ/劣等感",
    relFans: "相愛",
    relFansStatus: "大事な人",
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

const INITIAL_COMMENTS = [
  { id: 1, author: 'Hina_Chan', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Hina&backgroundColor=ffdfbf', text: 'Mona酱世界第一可爱！💕', time: '2小时前' },
  { id: 2, author: 'IdolFan99', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Ken&backgroundColor=ffc8dd', text: '作为超级偶像的决心感受到了！', time: '5小时前' },
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

// --- Helper Components ---

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
        <div className="absolute inset-[15%] bg-[#ffeaa7] rounded-[40%] border-4 border-slate-900 z-10" />

        {/* Eyes */}
        <motion.div 
          className="absolute top-[40%] left-[25%] flex justify-between w-[50%] z-20"
          animate={isLaughing ? { scaleY: 0.1 } : { scaleY: 1 }}
        >
          <div className="w-6 h-6 bg-white rounded-full border-2 border-slate-900 relative overflow-hidden">
            <motion.div 
              style={{ x: mousePos.x * 6, y: mousePos.y * 6 }}
              className="absolute inset-1.5 bg-[#2ecc71] rounded-full"
            >
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
            </motion.div>
          </div>
          <div className="w-6 h-6 bg-white rounded-full border-2 border-slate-900 relative overflow-hidden">
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
            <div className="w-10 h-5 bg-[#ff7675] rounded-full border-2 border-slate-900" />
          ) : (
            <div className="w-8 h-2 bg-[#ff7675] rounded-full border-2 border-slate-900 opacity-60" />
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
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full border-4 border-slate-900 shadow-[8px_8px_0_#0f172a] font-black z-50 text-pink-500 whitespace-nowrap uppercase italic tracking-widest text-lg"
          >
            Ahahaha! ☆
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  const [lang, setLang] = useState<'zh' | 'ja'>('zh');
  const t = TRANSLATIONS[lang];

  const [started, setStarted] = useState(false);
  const [currentSong, setCurrentSong] = useState(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
        time: '刚刚'
      },
      ...comments
    ]);
    setNewComment('');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Background Audio Control
  const toggleBgm = () => {
    setBgmPlaying(!bgmPlaying);
  };

  return (
    <div 
      className="h-screen w-full overflow-y-auto snap-y snap-mandatory bg-white font-sans text-slate-800"
      ref={scrollContainerRef}
    >
      <AnimatePresence>
        {!started && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#ff9ff3] z-[200] flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm"
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
      <div className="fixed top-0 w-full z-50 bg-[#ff6b81] text-white text-xs md:text-sm font-bold py-2 px-4 shadow-[0_4px_0_1px_rgba(15,23,42,1)] border-b-4 border-slate-900 pointer-events-none">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {t.ticker}
        </div>
      </div>

      {/* PAGE 1: Neo-Brutalist POP Poster */}
      <section className="h-screen w-full snap-start relative flex flex-col justify-center items-center bg-[#ffc8dd] overflow-hidden pt-12 border-b-[8px] border-slate-900">
        
        {/* Abstract Polka Grid Background */}
        <div className="absolute inset-0 bg-polka opacity-30 mix-blend-multiply pointer-events-none"></div>
        <FallingStars />

        {/* Big Text Background */}
        <div className="absolute top-[15%] left-[-5%] font-display font-black text-[15rem] leading-none text-yellow-300 opacity-60 mix-blend-multiply pointer-events-none whitespace-nowrap tracking-tighter transform -rotate-2 select-none">MONA MONA</div>

        {/* Global Navigation within Poster */}
        <div className="absolute top-[4.5rem] w-full px-6 md:px-12 flex justify-between items-center text-slate-900 z-50">
          <div className="flex gap-4 pointer-events-auto">
            <span className="font-display font-black text-xl tracking-widest uppercase bg-white px-5 py-2 border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] transform -rotate-1 hidden sm:block">{t.fanSite}</span>
          </div>
          <div className="flex gap-4 pointer-events-auto">
             <button 
               onClick={() => setLang(lang === 'zh' ? 'ja' : 'zh')}
               className="bg-[#ff9ff3] border-4 border-slate-900 px-4 py-2 rounded-full font-black text-sm tracking-widest uppercase transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_#0f172a] flex items-center gap-2"
             >
               <Languages className="w-5 h-5" />
               {lang === 'zh' ? '日本語' : '中文'}
             </button>
             <button className="bg-white border-4 border-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold transition-transform hover:-translate-y-1 hover:shadow-[4px_6px_0_#0f172a] shadow-[4px_4px_0_#0f172a]"><Menu className="w-6 h-6"/></button>
          </div>
        </div>

        {/* Central Graphic Composition */}
        <div className="relative w-full max-w-7xl px-4 flex flex-col md:flex-row items-center justify-center gap-12 z-10 scale-90 md:scale-100 mt-8">
          
          {/* Cute Floating Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-0 right-[20%] z-0 hidden md:block"
          >
             <div className="w-24 h-24 bg-[#ff6b81] rounded-full border-4 border-slate-900 flex items-center justify-center shadow-[4px_4px_0_#0f172a] transform rotate-12">
               <span className="text-4xl text-white font-black tracking-widest">ラブ！</span>
             </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute bottom-10 left-[10%] z-0 hidden md:block"
          >
             <div className="p-4 bg-[#ffc8dd] rounded-[2rem] border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] transform -rotate-12">
               <Music className="w-12 h-12 text-white" />
             </div>
          </motion.div>

          {/* Mona Live2D Interactive Character */}
          <div className="w-full md:w-5/12 flex items-center justify-center pointer-events-auto z-20">
             <MonaLive2D mousePos={mousePos} />
          </div>

          {/* Album Cover Display Card */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full md:w-4/12 bg-white rounded-[2.5rem] border-4 border-slate-900 p-6 shadow-[12px_12px_0px_#0f172a] group rotate-[-2deg] relative z-10"
          >
            <div className="absolute -top-6 -left-6 bg-[#ffc8dd] p-3 rounded-full border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] transform -rotate-12 z-20">
               <Star className="w-8 h-8 fill-slate-900 text-slate-900" />
            </div>

            <div className="aspect-[4/5] rounded-[1.5rem] border-4 border-slate-900 overflow-hidden relative bg-[#ff9ff3]">
               <img src="https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b5/81/0c/b5810ce8-de3d-e8c0-12ae-c00549afb26b/jacket_SMXX00494B00Z_550.jpg/600x600bb.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Number One Idol" />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-600/60 via-pink-400/20 to-transparent flex flex-col justify-end p-8">
                  <span className="bg-[#ff9ff3] text-white px-4 py-1.5 text-sm font-black uppercase tracking-widest border-2 border-slate-900 transform -rotate-3 inline-block shadow-[4px_4px_0_#0f172a] w-fit mb-4">{t.recommended}</span>
                  <h2 className="text-4xl md:text-5xl font-display font-black text-white drop-shadow-[0_4px_4px_#ec4899] leading-none mb-2">#No.1<br/>アイドル</h2>
                 <p className="font-bold text-pink-100 text-lg tracking-wide">{t.name}</p>
               </div>
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute top-10 -right-8">
               <div className="bg-[#ffc8dd] w-20 h-20 rounded-full border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] flex items-center justify-center text-slate-900 animate-bounce">
                  <Heart className="w-8 h-8 fill-slate-900" />
               </div>
            </div>
          </motion.div>

          {/* Interactive Phone / Player Element (Center) */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-4/12 flex justify-center mt-8 md:mt-0 z-20"
          >
            <div className="w-[320px] bg-white rounded-[3rem] border-[8px] border-slate-900 shadow-[16px_16px_0px_#0f172a] p-6 pb-8 flex flex-col relative group transform rotate-[1deg]">
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-8 bg-slate-900 rounded-b-2xl"></div>
               
               <div className="mt-8 flex justify-between items-center mb-6 px-2">
                 <div>
                   <h3 className="font-black text-2xl font-display tracking-tight leading-none text-pink-500">Mona For You！</h3>
                   <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-1">{t.producer}</p>
                 </div>
                 <div className="bg-[#ff9ff3] p-2 rounded-full border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] animate-pulse">
                   <Heart className="w-5 h-5 text-slate-900 fill-slate-900" />
                 </div>
               </div>
               
               <div className="w-full aspect-square bg-slate-100 rounded-2xl border-4 border-slate-900 overflow-hidden relative shadow-inner group-hover:shadow-[inset_0_4px_20px_rgba(0,0,0,0.1)] transition-all">
                  <img src={currentSong.cover} className="w-full h-full object-cover" alt="Playing" />
                  
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <button 
                      onClick={togglePlay} 
                      className="w-20 h-20 bg-[#ffc8dd] text-slate-900 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-[6px_6px_0_#0f172a] transform hover:scale-110 active:translate-y-1 active:shadow-[2px_2px_0_#0f172a] transition-all"
                    >
                      {isPlaying ? <Pause className="w-8 h-8 fill-slate-900" /> : <Play className="w-8 h-8 ml-1 fill-slate-900" />}
                    </button>
                  </div>
               </div>
               
               <div className="mt-6 px-2 text-center h-20">
                 <p className="font-bold text-lg text-slate-900 line-clamp-1">{t.songs[SONGS.findIndex(s => s.id === currentSong.id)].title}</p>
                 <p className="text-sm text-pink-500 font-bold mt-1 line-clamp-1">{t.songs[SONGS.findIndex(s => s.id === currentSong.id)].tag}</p>
               </div>

               <div className="w-full bg-slate-200 h-3 rounded-full border-2 border-slate-900 overflow-hidden mt-4 shadow-inner">
                  <div 
                    className="h-full bg-[#ff9ff3] transition-all duration-1000 ease-linear border-r-2 border-slate-900"
                    style={{ width: `${(progress / currentSong.duration) * 100}%` }}
                  />
               </div>
            </div>
          </motion.div>

          {/* Decorative Stickers (Right) - Hidden on small screens */}
          <div className="hidden lg:flex w-3/12 flex-col gap-10 items-center justify-center pl-8">
             <motion.div 
               whileHover={{ scale: 1.1, rotate: -15 }}
               className="bg-[#ffc8dd] border-4 border-slate-900 px-8 py-6 rounded-[2rem] rounded-bl-none shadow-[8px_8px_0_#0f172a] transform rotate-[-10deg] relative"
             >
                <div className="absolute -top-4 -right-4 bg-[#ffc8dd] w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center -z-10"></div>
                <p className="font-display font-black text-[1.2rem] text-white uppercase text-center leading-none tracking-tight">#No.1<br/>アイドル</p>
             </motion.div>
             <motion.div 
               whileHover={{ scale: 1.1, rotate: 15 }}
               className="bg-[#ff9ff3] border-4 border-slate-900 p-8 rounded-full shadow-[8px_8px_0_#0f172a] transform rotate-12 flex items-center justify-center relative"
             >
                <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full"></div>
                <Star className="w-12 h-12 text-slate-900 fill-slate-900" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* PAGE 2: Profile & Relationship Map */}
      <section className="min-h-screen w-full snap-start bg-[#f0f0f0] pt-24 pb-12 flex flex-col md:flex-row relative overflow-x-hidden border-b-[8px] border-slate-900 px-8 lg:px-16 items-center custom-scrollbar overflow-y-auto">
        {/* Album Liner Notes Style Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none overflow-hidden flex flex-wrap gap-4 p-4">
           {Array.from({length: 20}).map((_, i) => (
             <span key={i} className="text-slate-900 font-display font-black text-4xl transform rotate-12">MONA 1ST ALBUM NO.1</span>
           ))}
        </div>
        
        <div className="absolute -left-10 -bottom-10 opacity-10 pointer-events-none">
           <Heart className="w-96 h-96 text-slate-400 fill-slate-400 transform -rotate-12" />
        </div>

        {/* Profile Details (Liner Notes Page 2) */}
        <div className="w-full md:w-1/2 flex flex-col z-10 space-y-8 h-full justify-center">
           <div className="relative">
             <div className="bg-slate-900 text-white w-fit px-4 py-1 text-sm font-black tracking-widest uppercase mb-4 shadow-[4px_4px_0_rgba(255,159,243,1)] transform -rotate-2">PAGE 02 // AUDITION RESUME</div>
             <h2 className="text-5xl lg:text-7xl font-display font-black text-slate-900 tracking-tighter leading-none mb-2 drop-shadow-[4px_4px_0_#ff9ff3]">{t.name.split(' ')[0]}<br/>{t.name.split(' ')[1]}</h2>
             <p className="text-xl font-bold bg-white text-slate-900 px-3 py-1 w-fit border-2 border-slate-900 transform rotate-1 shadow-[4px_4px_0_#ffc8dd]">OFFICIAL RESUME // {t.profile}</p>
           </div>

           {/* Quick Stats Grid */}
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(t.details).map(([key, value]) => (
                <div key={key} className="bg-white border-2 border-slate-900 p-3 shadow-[4px_4px_0_#0f172a] rounded-xl flex flex-col hover:-translate-y-1 transition-transform">
                  <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest mb-1">{key}</span>
                  <span className="text-xs font-black text-slate-900 leading-none">{value as string}</span>
                </div>
              ))}
           </div>
           
           <motion.div 
             style={{ 
               rotateY: mousePos.x * 20, 
               rotateX: -mousePos.y * 20,
               transformStyle: "preserve-3d"
             }}
             className="bg-white rounded-[1rem] border-4 border-slate-900 p-8 shadow-[12px_12px_0_#0f172a] transform -rotate-1 max-w-lg mb-4 relative"
           >
             <div className="absolute top-4 right-4 text-slate-200">
               <Music className="w-12 h-12" />
             </div>
             <h3 className="font-black text-xl mb-4 flex items-center gap-2 border-b-4 border-slate-900 pb-2"><Sparkles className="w-5 h-5 text-pink-500"/> {t.personality}</h3>
             <p className="font-bold text-slate-700 leading-relaxed mb-8 text-md border-l-4 border-pink-200 pl-4 italic">
                {t.monaBio}
             </p>
             <h3 className="font-black text-xl mb-4 flex items-center gap-2 border-b-4 border-slate-900 pb-2"><History className="w-5 h-5 text-pink-500"/> {t.historyTitle}</h3>
             <div className="space-y-2 mb-6 border-l-4 border-pink-100 pl-4">
                {t.historyItems.map((item: string, i: number) => (
                  <div key={i} className="flex gap-2 text-[11px] font-bold text-slate-600">
                    <span className="text-pink-400 shrink-0 select-none">•</span>
                    <span>{item}</span>
                  </div>
                ))}
             </div>
             <h3 className="font-black text-xl mb-4 flex items-center gap-2 border-b-4 border-slate-900 pb-2"><Heart className="w-5 h-5 text-pink-500 fill-pink-500"/> {t.background}</h3>
             <p className="font-bold text-slate-700 leading-relaxed text-sm mb-0 border-l-4 border-pink-200 pl-4">
                {t.monaStory}
             </p>
           </motion.div>
           
           {/* Relationship Diagram */}
           <div className="bg-white border-4 border-slate-900 rounded-[2rem] p-4 shadow-[8px_8px_0_#0f172a] transform rotate-1 max-w-lg w-full">
             <h3 className="font-black text-lg mb-4 border-b-2 border-dashed border-slate-900 pb-2 flex justify-between items-center">
                {t.relMap}
                <span className="text-[10px] text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">OFFICIAL RELATIONS</span>
              </h3>
             <div className="grid grid-cols-3 gap-2 items-center">
               <div className="flex flex-col items-center">
                 <div className="w-12 h-12 bg-blue-100 rounded-full border-2 border-slate-900 flex items-center justify-center mb-1 overflow-hidden shrink-0">
                   <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=Sena&backgroundColor=b6e3f4" alt="Sena" className="w-full h-full object-cover"/>
                 </div>
                 <p className="text-[10px] font-black text-slate-700">{t.relSister}</p>
                 <p className="text-[9px] bg-slate-900 text-white px-1 rounded uppercase">{t.relSisterStatus}</p>
               </div>
               <div className="flex-1 border-t-2 border-slate-900 border-dashed relative mx-1">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-slate-700 bg-white px-2 whitespace-nowrap border-2 border-slate-900 rounded-full shadow-[2px_2px_0_#ff9ff3]">{t.relSisterStatus}</div>
               </div>
               <div className="flex flex-col items-center mx-1">
                 <div className="w-16 h-16 bg-pink-100 rounded-full border-4 border-pink-400 flex items-center justify-center mb-1 overflow-hidden shadow-sm shrink-0 shadow-[2px_2px_0_#0f172a]">
                   <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=Mona&backgroundColor=ffc8dd" alt="Mona" className="w-full h-full object-cover"/>
                 </div>
                 <p className="text-sm font-black text-pink-500 uppercase">Mona</p>
               </div>
               <div className="flex-1 border-t-2 border-slate-900 border-dashed relative mx-1">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-slate-700 bg-white px-2 whitespace-nowrap border-2 border-slate-900 rounded-full shadow-[2px_2px_0_#ff9ff3]">{t.relFansStatus}</div>
               </div>
               <div className="flex flex-col items-center">
                 <div className="w-12 h-12 bg-[#ffc8dd] rounded-full border-2 border-slate-900 flex items-center justify-center mb-1 overflow-hidden relative shrink-0">
                    <Heart className="w-6 h-6 text-white fill-white" />
                 </div>
                 <p className="text-[10px] font-black text-slate-700">{t.relFans}</p>
                 <p className="text-[9px] bg-slate-900 text-white px-1 rounded uppercase text-center leading-none tracking-tighter">{t.relFansStatus}</p>
               </div>
             </div>
           </div>
        </div>

        {/* Fan's Voice Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative mt-16 md:mt-0 z-10 min-h-[400px]">
           <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-8 bg-white px-6 py-2 border-4 border-slate-900 shadow-[6px_6px_0_#0f172a] transform rotate-2">{t.reasons}</h3>
           
           <div className="bg-white rounded-[2rem] border-4 border-slate-900 shadow-[8px_8px_0_#0f172a] p-8 pb-12 transform -rotate-1 relative max-w-lg w-full">
             <div className="absolute -top-4 -left-4 bg-[#ffe492] px-4 py-2 border-4 border-[#0a0505] rounded-full font-black text-slate-900 rotate-[-10deg]">{t.fansVoice}</div>
             
             <div className="space-y-4">
               {t.quotes.map((quote, index) => (
                 <div key={index} className={index > 0 ? "border-t-2 border-slate-100 pt-4" : ""}>
                   <p className="font-bold text-slate-700 leading-relaxed text-md mb-1">
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
      <section className="h-screen w-full snap-start bg-white pt-24 pb-12 flex flex-col border-b-[8px] border-slate-900">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end px-8 md:px-16 mb-12">
          <div className="relative">
            <div className="bg-[#ff9ff3] text-white w-fit px-4 py-1 text-sm font-black tracking-widest uppercase mb-4 shadow-[4px_4px_0_rgba(15,23,42,0.2)]">{t.discography}</div>
            <h2 className="text-6xl md:text-8xl font-display font-black text-slate-900 tracking-tighter leading-none transform -rotate-1 relative z-10">{t.latest}</h2>
            <div className="absolute -bottom-4 -right-8 -z-10 bg-[#ff9ff3] w-24 h-24 rounded-full border-4 border-slate-900 hidden md:block"></div>
          </div>
          
          <div className="hidden md:flex gap-4 mt-8 md:mt-0">
            <button onClick={scrollLeft} className="w-16 h-16 bg-[#ffc8dd] rounded-full border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] flex items-center justify-center text-slate-900 hover:translate-y-1 hover:shadow-none transition-all">
               <ArrowLeft className="w-8 h-8" />
            </button>
            <button onClick={scrollRight} className="w-16 h-16 bg-[#ff9a9e] rounded-full border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] flex items-center justify-center text-white hover:translate-y-1 hover:shadow-none transition-all">
               <ArrowRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Scrolling Carousel */}
        <div className="w-full relative px-4 md:px-16 flex-1 flex flex-col justify-center">
          <div 
            ref={scrollContainerRef}
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
                        <div className="absolute inset-0 bg-slate-900/40 rounded-full flex flex-col items-center justify-center pointer-events-none">
                           <div className="bg-[#ff9a9e] text-slate-900 border-2 border-slate-900 px-3 py-1 font-black shadow-[4px_4px_0_#0f172a] animate-pulse mb-8 z-10">{t.playing}</div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-white/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" style={{ background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.4) 225deg, transparent 270deg)' }}></div>
                      )}
                   </div>
                </div>

                {/* Metadata */}
                <div className="pl-14 border-t-4 border-slate-900 pt-6 relative group-hover:border-[#ff6b81] transition-colors">
                   <h3 className="font-display font-black text-3xl text-slate-900 leading-tight group-hover:text-[#ff6b81] transition-colors mb-4">{t.songs[index].title}</h3>
                   <p className="text-slate-600 font-bold text-lg leading-relaxed">{t.songs[index].desc}</p>
                </div>
              </div>
            ))}
            
            {/* End spacer */}
            <div className="snap-start shrink-0 w-8 h-full"></div>
          </div>
        </div>
      </section>

      {/* PAGE 4: Fan Board - Cute & Interactive */}
      <section className="min-h-screen w-full snap-start bg-[#ffafcc] pt-24 pb-32 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 opacity-20"><Heart className="w-64 h-64 text-slate-900 fill-[#ff9ff3] transform rotate-12" /></div>
        <div className="absolute bottom-10 left-10 opacity-20"><Star className="w-80 h-80 text-slate-900 fill-[#ffc8dd] transform -rotate-12" /></div>

        <div className="w-full max-w-5xl px-8 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           
           {/* Left: Input Form */}
           <div className="flex flex-col">
             <h2 className="text-6xl md:text-8xl font-display font-black text-slate-900 tracking-tighter leading-none mb-4 transform -rotate-2">{t.boardTitle}</h2>
             <p className="text-2xl font-bold text-slate-900 mb-8 px-2 bg-white w-fit border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] transform rotate-1">{t.boardSubtitle}</p>
             
             <div className="bg-white rounded-[2rem] border-4 border-slate-900 shadow-[12px_12px_0px_#0f172a] p-8 mt-4 transform -rotate-1">
               <form onSubmit={handleAddComment} className="flex flex-col space-y-6">
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t.placeholder} 
                    className="w-full min-h-[160px] bg-[#fff] border-4 border-slate-900 focus:border-[#ff9ff3] rounded-2xl p-6 text-slate-800 text-xl font-bold outline-none transition-all resize-none shadow-[inset_4px_4px_0_rgba(15,23,42,0.1)]"
                    maxLength={150}
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-400 font-mono text-sm">{newComment.length}/150 文字</span>
                    <button 
                      type="submit"
                      disabled={!newComment.trim()}
                      className="bg-[#ff9ff3] border-4 border-slate-900 text-slate-900 px-8 py-4 rounded-full font-black text-xl hover:-translate-y-1 hover:shadow-[6px_6px_0_#0f172a] shadow-[4px_4px_0_#0f172a] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#0f172a] transition-all flex items-center gap-3"
                    >
                      {t.post} <Send className="w-5 h-5 fill-slate-900" />
                    </button>
                  </div>
               </form>
             </div>
           </div>

           {/* Right: Comments List */}
           <div className="h-[600px] bg-white/40 backdrop-blur-md rounded-[3rem] border-4 border-slate-900 shadow-[16px_16px_0_rgba(15,23,42,0.1)] p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
              <AnimatePresence>
                {comments.map((comment, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 50, rotate: 2 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={comment.id} 
                    className="bg-white p-6 rounded-[2rem] rounded-bl-none border-4 border-slate-900 shadow-[6px_6px_0_#0f172a] flex gap-4 hover:-translate-y-1 hover:shadow-[8px_8px_0_#0f172a] transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-8 h-8 bg-polka opacity-20 pointer-events-none"></div>
                    <div className={`w-16 h-16 rounded-full border-4 border-slate-900 overflow-hidden shrink-0 ${i % 2 === 0 ? 'bg-[#ff9ff3]' : 'bg-[#ffc8dd]'}`}>
                      <img src={comment.avatar} alt="avatar" className="w-full h-full object-cover p-1" />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-start mb-2">
                          <span className="font-display font-black text-xl text-slate-900">{comment.author}</span>
                          <span className="text-xs font-bold bg-slate-100 px-2 py-1 border-2 border-slate-900 rounded-lg">{comment.time}</span>
                       </div>
                       <p className="text-slate-700 font-bold text-lg leading-snug">{comment.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>
      </section>

      {/* PAGE 5: Thank You Section */}
      <section className="h-screen w-full snap-start bg-[#ffc8dd] relative flex flex-col justify-center items-center overflow-hidden border-b-[8px] border-slate-900 px-4">
        <div className="absolute inset-0 bg-polka opacity-20 pointer-events-none"></div>
        <FallingStars />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative z-10 w-full max-w-lg mb-12"
        >
          {/* Polaroid Style Frame */}
          <div className="bg-white p-5 pb-28 shadow-[24px_24px_0px_#0f172a] border-4 border-slate-900 transform rotate-1 transition-all hover:rotate-0 hover:scale-[1.02] duration-500 group">
            {/* The Image Container */}
            <div className="aspect-[3/4] bg-pink-100 border-4 border-slate-900 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1514525253361-bee8d40d9990?q=80&w=1000&auto=format&fit=crop" 
                alt="Narumi Mona Thank You" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Note: User can replace the src above with their local file path if needed */}
              
              {/* Overlay elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#ff9ff3]/30 to-transparent pointer-events-none"></div>
              <div className="absolute top-4 right-4">
                <Heart className="w-12 h-12 text-white fill-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] animate-pulse" />
              </div>
            </div>
            
            {/* Handwritten style signature area */}
            <div className="absolute bottom-8 left-0 w-full px-6 flex flex-col items-center">
               <div className="w-full h-1 bg-slate-100 mb-4 rounded-full"></div>
               <p className="font-display font-black text-5xl text-slate-900 tracking-tighter transform -rotate-1 italic drop-shadow-sm">
                 {t.thanks}
               </p>
               <div className="flex gap-3 mt-3">
                 <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                 <Music className="w-6 h-6 text-pink-400" />
                 <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
               </div>
            </div>
          </div>
          
          {/* Decorative Elements around the frame */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [12, 18, 12] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-14 -right-14 bg-[#ff9ff3] p-6 rounded-full border-4 border-slate-900 shadow-[8px_8px_0_#0f172a] z-20"
          >
             <Star className="w-12 h-12 text-white fill-white" />
          </motion.div>
          
          <motion.div 
            animate={{ scale: [1, 1.15, 1], rotate: [-6, -4, -6] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-16 bg-[#ff6b81] px-10 py-4 border-4 border-slate-900 shadow-[10px_10px_0_#0f172a] z-20"
          >
             <span className="font-display font-black text-white text-3xl tracking-widest uppercase">{t.loveYou}</span>
          </motion.div>
        </motion.div>
        
        {/* Background Decorative Text Layer */}
        <div className="absolute top-[15%] left-[5%] font-display font-black text-[12rem] text-slate-900 opacity-[0.03] pointer-events-none select-none tracking-tighter leading-none">THANKS</div>
        <div className="absolute bottom-[10%] right-[5%] font-display font-black text-[12rem] text-slate-900 opacity-[0.03] pointer-events-none select-none tracking-tighter leading-none transform rotate-180">HONEY</div>

        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-40">
          <p className="text-slate-900 font-black tracking-[0.3em] text-[12px] uppercase">Narumi Mona Official Archive • 2026</p>
          <div className="w-24 h-1 bg-slate-900 rounded-full"></div>
        </div>
      </section>

      {/* Global Fixed Bottom Player Timeline */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full z-[100] bg-white border-t-8 border-slate-900 px-6 py-4 flex items-center gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
             <div className="w-16 h-16 rounded-xl border-4 border-slate-900 overflow-hidden shrink-0 shadow-[4px_4px_0_#0f172a]">
               <img src={currentSong.cover} className="w-full h-full object-cover" alt="Playing icon" />
             </div>
             
             <div className="flex-1 max-w-4xl max-hidden sm:block">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <Disc className="w-5 h-5 text-[#ff6b81] animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="font-display font-black text-xl text-slate-900">{currentSong.title}</span>
                  </div>
                  <span className="text-sm border-2 border-slate-900 px-2 rounded font-bold font-mono text-slate-900">
                    {formatTime(progress)} / {formatTime(currentSong.duration)}
                  </span>
                </div>
                <div className="h-4 bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full bg-gradient-to-r ${currentSong.color} transition-all duration-1000 ease-linear border-r-2 border-slate-900`}
                    style={{ width: `${(progress / currentSong.duration) * 100}%` }}
                  />
                </div>
             </div>

             <div className="flex-1 sm:hidden flex flex-col justify-center">
               <span className="font-display font-black text-lg text-slate-900 truncate">{currentSong.title}</span>
               <span className="text-xs font-bold text-slate-500">{formatTime(progress)} / {formatTime(currentSong.duration)}</span>
             </div>
             
             <button onClick={togglePlay} className="w-14 h-14 shrink-0 bg-[#ffc8dd] rounded-full border-4 border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0_#0f172a] hover:bg-slate-900 hover:text-white transition-colors transform active:translate-y-1 active:shadow-none">
                <Pause className="w-6 h-6 fill-current" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
