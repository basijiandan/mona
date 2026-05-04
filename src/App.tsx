import type { FormEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Heart, Send, Sparkles, Star, Music, ArrowRight, ArrowLeft, Menu, Disc, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SONGS = [
  {
    id: 1,
    title: 'Fansa (粉丝撒娇)',
    date: '2024.04.05',
    duration: 245,
    cover: 'https://images.unsplash.com/photo-1613336026275-d6d473084e85?q=80&w=600&auto=format&fit=crop',
    color: 'from-[#ff9a9e] to-[#fecfef]',
    description: '最强偶像的撒娇宣言！感受舞台上的心跳。',
    tag: 'NEW EXCLUSIVE',
  },
  {
    id: 2,
    title: 'Watashi, Idol Sengen',
    date: '2024.03.26',
    duration: 210,
    cover: 'https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?q=80&w=600&auto=format&fit=crop',
    color: 'from-[#8fd3f4] to-[#84fab0]',
    description: '我的偶像宣言，绝不认输的元气单曲！',
    tag: 'MILLION HITS',
  },
  {
    id: 3,
    title: 'No.1',
    date: '2024.04.09',
    duration: 260,
    cover: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&auto=format&fit=crop',
    color: 'from-[#cd9cf2] to-[#f6f3ff]',
    description: '永远的第一名，向着梦想闪耀的轨迹。',
    tag: 'ALBUM TITLE TRACK',
  },
  {
    id: 4,
    title: 'Hokori Takaki Idol',
    date: '2024.03.18',
    duration: 255,
    cover: 'https://images.unsplash.com/photo-1578305086574-8b6401dc22db?q=80&w=600&auto=format&fit=crop',
    color: 'from-[#fbc2eb] to-[#a6c1ee]',
    description: '骄傲的偶像，挥洒汗水与泪水的舞台。',
    tag: 'LIVE FAN FAVORITE',
  },
  {
    id: 5,
    title: 'Kawaikute Gomen',
    date: '2024.05.01',
    duration: 220,
    cover: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=600&auto=format&fit=crop',
    color: 'from-[#fed6e3] to-[#a8edea]',
    description: '可爱到抱歉，绝对自信的甜蜜暴击。',
    tag: 'VIRAL HIT',
  }
];

const INITIAL_COMMENTS = [
  { id: 1, author: 'Hina_Chan', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Hina&backgroundColor=ffdfbf', text: 'Mona酱世界第一可爱！💕', time: '2小时前' },
  { id: 2, author: 'IdolFan99', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Ken&backgroundColor=b6e3f4', text: '作为超级偶像的决心感受到了！', time: '5小时前' },
];

export default function App() {
  const [currentSong, setCurrentSong] = useState(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        author: 'Guest_Fan',
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

  return (
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory bg-white font-sans text-slate-800">
      
      {/* Top Ticker Banner */}
      <div className="fixed top-0 w-full z-50 bg-[#ff6b81] text-white text-xs md:text-sm font-bold py-2 px-4 shadow-[0_4px_0_1px_rgba(15,23,42,1)] border-b-4 border-slate-900 pointer-events-none">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          ✨ Mona 1st Album "No.1" POPUP STORE 举办中！周边贩售及握手会详情请点击CHECK · 🎀 全新单曲 MV 视听解禁！ · ✨ Mona 1st Album "No.1" POPUP STORE 举办中！周边贩售及握手会详情请点击CHECK
        </div>
      </div>

      {/* PAGE 1: Neo-Brutalist POP Poster */}
      <section className="h-screen w-full snap-start relative flex flex-col justify-center items-center bg-[#fef08a] overflow-hidden pt-12 border-b-[8px] border-slate-900">
        
        {/* Abstract Polka Grid Background */}
        <div className="absolute inset-0 bg-polka opacity-30 mix-blend-multiply pointer-events-none"></div>

        {/* Big Text Background */}
        <div className="absolute top-[15%] left-[-5%] font-display font-black text-[15rem] leading-none text-yellow-300 opacity-60 mix-blend-multiply pointer-events-none whitespace-nowrap tracking-tighter transform -rotate-2 select-none">MONA MONA</div>

        {/* Global Navigation within Poster */}
        <div className="absolute top-[4.5rem] w-full px-6 md:px-12 flex justify-between items-center text-slate-900 z-50">
          <div className="flex gap-4 pointer-events-auto">
            <span className="font-display font-black text-xl tracking-widest uppercase bg-white px-5 py-2 border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] transform -rotate-1 hidden sm:block">Mona.Official</span>
          </div>
          <div className="flex gap-4 pointer-events-auto">
             <button className="bg-[#ff9ff3] border-4 border-slate-900 px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase transition-transform hover:-translate-y-1 hover:shadow-[4px_6px_0_#0f172a] shadow-[4px_4px_0_#0f172a]">LOGIN</button>
             <button className="bg-white border-4 border-slate-900 w-12 h-12 rounded-full flex items-center justify-center font-bold transition-transform hover:-translate-y-1 hover:shadow-[4px_6px_0_#0f172a] shadow-[4px_4px_0_#0f172a]"><Menu className="w-6 h-6"/></button>
          </div>
        </div>

        {/* Central Graphic Composition */}
        <div className="relative w-full max-w-7xl px-4 flex flex-col md:flex-row items-center justify-center gap-12 z-10 scale-90 md:scale-100">
          
          {/* Character / Concept Block (Left) */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full md:w-5/12 bg-white rounded-[2.5rem] border-4 border-slate-900 p-6 shadow-[12px_12px_0px_#0f172a] group rotate-[-2deg]"
          >
            <div className="aspect-[4/5] rounded-[1.5rem] border-4 border-slate-900 overflow-hidden relative bg-[#ff9ff3]">
               <img src="https://images.unsplash.com/photo-1549298240-0d8e60513026?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-luminosity opacity-80" alt="Mona Theme" />
               <div className="absolute inset-0 bg-gradient-to-t from-pink-600/90 via-pink-400/20 to-transparent flex flex-col justify-end p-8">
                 <span className="bg-[#fef08a] text-slate-900 px-4 py-1.5 text-sm font-black uppercase tracking-widest border-2 border-slate-900 transform -rotate-3 inline-block shadow-[4px_4px_0_#0f172a] w-fit mb-4">Debut Album</span>
                 <h2 className="text-4xl md:text-5xl font-display font-black text-white drop-shadow-[0_4px_4px_#ec4899] leading-none mb-2">#No.1<br/>IDOL</h2>
                 <p className="font-bold text-pink-100 text-lg tracking-wide">成海萌奈 Narumi Mona</p>
               </div>
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute top-10 -right-8">
               <div className="bg-[#1dd1a1] w-20 h-20 rounded-full border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] flex items-center justify-center text-slate-900 animate-bounce">
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
                   <h3 className="font-black text-2xl font-display tracking-tight leading-none text-slate-900">Mona for you!</h3>
                   <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-1">To: Producers</p>
                 </div>
                 <div className="bg-[#ff9ff3] p-2 rounded-full border-2 border-slate-900 shadow-[2px_2px_0_#0f172a]">
                   <Sparkles className="w-4 h-4 text-slate-900 fill-slate-900" />
                 </div>
               </div>
               
               <div className="w-full aspect-square bg-slate-100 rounded-2xl border-4 border-slate-900 overflow-hidden relative shadow-inner group-hover:shadow-[inset_0_4px_20px_rgba(0,0,0,0.1)] transition-all">
                  <img src={currentSong.cover} className="w-full h-full object-cover" alt="Playing" />
                  
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <button 
                      onClick={togglePlay} 
                      className="w-20 h-20 bg-[#fef08a] text-slate-900 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-[6px_6px_0_#0f172a] transform hover:scale-110 active:translate-y-1 active:shadow-[2px_2px_0_#0f172a] transition-all"
                    >
                      {isPlaying ? <Pause className="w-8 h-8 fill-slate-900" /> : <Play className="w-8 h-8 ml-1 fill-slate-900" />}
                    </button>
                  </div>
               </div>
               
               <div className="mt-6 px-2 text-center h-20">
                 <p className="font-bold text-lg text-slate-900 line-clamp-1">{currentSong.title}</p>
                 <p className="text-sm text-pink-500 font-bold mt-1 line-clamp-1">{currentSong.tag}</p>
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
               className="bg-[#54a0ff] border-4 border-slate-900 px-8 py-6 rounded-[2rem] rounded-bl-none shadow-[8px_8px_0_#0f172a] transform rotate-[-10deg]"
             >
                <p className="font-display font-black text-3xl text-white uppercase text-center leading-none tracking-tight">Super<br/>Idol</p>
             </motion.div>
             <motion.div 
               whileHover={{ scale: 1.1, rotate: 15 }}
               className="bg-[#ff9ff3] border-4 border-slate-900 p-8 rounded-full shadow-[8px_8px_0_#0f172a] transform rotate-12 flex items-center justify-center"
             >
                <Star className="w-12 h-12 text-slate-900 fill-slate-900" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* PAGE 2: Horizons / Hit Songs Carousel */}
      <section className="h-screen w-full snap-start bg-white pt-24 pb-12 flex flex-col border-b-[8px] border-slate-900">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end px-8 md:px-16 mb-12">
          <div>
            <div className="bg-slate-900 text-white w-fit px-4 py-1 text-sm font-black tracking-widest uppercase mb-4 shadow-[4px_4px_0_rgba(15,23,42,0.2)]">Discography</div>
            <h2 className="text-6xl md:text-8xl font-display font-black text-slate-900 tracking-tighter leading-none transform -rotate-1">What's<br/>New?</h2>
          </div>
          
          <div className="hidden md:flex gap-4 mt-8 md:mt-0">
            <button onClick={scrollLeft} className="w-16 h-16 bg-[#fef08a] rounded-full border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] flex items-center justify-center text-slate-900 hover:translate-y-1 hover:shadow-none transition-all">
               <ArrowLeft className="w-8 h-8" />
            </button>
            <button onClick={scrollRight} className="w-16 h-16 bg-[#5f27cd] rounded-full border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] flex items-center justify-center text-white hover:translate-y-1 hover:shadow-none transition-all">
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
                   <p className="text-xl font-display font-black text-slate-300 transform -rotate-180 origin-center writing-vertical-rl pb-2 select-none tracking-widest leading-none">
                     {song.date}
                   </p>
                   
                   {/* Album Art Container */}
                   <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden border-4 border-slate-900 transition-all duration-500 shadow-[12px_12px_0_#0f172a] group-hover:-translate-y-2 group-hover:shadow-[16px_16px_0_#0f172a]">
                      <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                      
                      {/* Interactive overlays */}
                      {currentSong.id === song.id ? (
                        <div className="absolute inset-0 bg-slate-900/40 p-4 flex flex-col justify-between">
                           <div className="self-end bg-[#10ac84] text-slate-900 border-2 border-slate-900 px-3 py-1 font-black shadow-[4px_4px_0_#0f172a] animate-pulse">PLAYING</div>
                           
                           {isPlaying && (
                             <div className="flex gap-2 items-end h-16 self-center justify-center w-full">
                                {[1, 2, 3, 4].map((i) => (
                                  <motion.div 
                                    key={i}
                                    animate={{ height: ['30%', '100%', '30%'] }}
                                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                    className="w-4 bg-white border-2 border-slate-900 rounded-full shadow-[2px_2px_0_#0f172a]"
                                  />
                                ))}
                             </div>
                           )}
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-[#ff9ff3] mix-blend-color opacity-0 group-hover:opacity-40 transition-opacity"></div>
                      )}
                   </div>
                </div>

                {/* Metadata */}
                <div className="pl-14 border-t-4 border-slate-900 pt-6 relative group-hover:border-[#ff6b81] transition-colors">
                   <div className="absolute -top-3 left-16 bg-white px-2">
                     <span className="bg-slate-100 text-slate-900 font-bold px-3 py-1 text-xs border-2 border-slate-900">{song.tag}</span>
                   </div>
                   <h3 className="font-display font-black text-3xl text-slate-900 leading-tight group-hover:text-[#ff6b81] transition-colors mb-4">{song.title}</h3>
                   <p className="text-slate-600 font-bold text-lg leading-relaxed">{song.description}</p>
                </div>
              </div>
            ))}
            
            {/* End spacer */}
            <div className="snap-start shrink-0 w-8 h-full"></div>
          </div>
        </div>
      </section>

      {/* PAGE 3: Fan Board - Cute & Interactive */}
      <section className="h-screen w-full snap-start bg-[#48dbfb] pt-24 pb-32 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 opacity-20"><Heart className="w-64 h-64 text-white fill-white transform rotate-12" /></div>
        <div className="absolute bottom-10 left-10 opacity-20"><MessageSquare className="w-80 h-80 text-white fill-white transform -rotate-12" /></div>

        <div className="w-full max-w-5xl px-8 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           
           {/* Left: Input Form */}
           <div className="flex flex-col">
             <h2 className="text-6xl md:text-8xl font-display font-black text-slate-900 tracking-tighter leading-none mb-4 transform -rotate-2">Fan<br/>Board</h2>
             <p className="text-2xl font-bold text-slate-900 mb-8 px-2 bg-white w-fit border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] transform rotate-1">支持与热爱，送给最闪耀的偶像！</p>
             
             <div className="bg-white rounded-[2rem] border-4 border-slate-900 shadow-[12px_12px_0px_#0f172a] p-8 mt-4 transform -rotate-1">
               <form onSubmit={handleAddComment} className="flex flex-col space-y-6">
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="写下你对 Mona 酱的热爱吧！✨" 
                    className="w-full min-h-[160px] bg-[#f8f9fa] border-4 border-slate-200 focus:border-[#48dbfb] rounded-2xl p-6 text-slate-800 text-xl font-bold outline-none transition-all resize-none shadow-inner"
                    maxLength={150}
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-400 font-mono text-sm">{newComment.length}/150 words</span>
                    <button 
                      type="submit"
                      disabled={!newComment.trim()}
                      className="bg-[#ff9ff3] border-4 border-slate-900 text-slate-900 px-8 py-4 rounded-full font-black text-xl hover:-translate-y-1 hover:shadow-[6px_6px_0_#0f172a] shadow-[4px_4px_0_#0f172a] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#0f172a] transition-all flex items-center gap-3"
                    >
                      Post Message <Send className="w-5 h-5 fill-slate-900" />
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
                    className="bg-white p-6 rounded-[2rem] rounded-bl-none border-4 border-slate-900 shadow-[6px_6px_0_#0f172a] flex gap-4 hover:-translate-y-1 hover:shadow-[8px_8px_0_#0f172a] transition-all"
                  >
                    <div className="w-16 h-16 rounded-full border-4 border-slate-900 overflow-hidden shrink-0 bg-[#fef08a]">
                      <img src={comment.avatar} alt="avatar" className="w-full h-full" />
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
             
             <button onClick={togglePlay} className="w-14 h-14 shrink-0 bg-[#fef08a] rounded-full border-4 border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0_#0f172a] hover:bg-slate-900 hover:text-white transition-colors transform active:translate-y-1 active:shadow-none">
                <Pause className="w-6 h-6 fill-current" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
