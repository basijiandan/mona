const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

const NEW_INITIAL_COMMENTS = `
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
  { id: 12, author: 'Emma_UK', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Emma&backgroundColor=fbcfe8', text: 'Can\\'t wait for your next concert! You are a star! 🌟', time: '1天前', likes: 204, liked: false, replies: [] },
];
`;

const oldInitialCommentsRegex = /const INITIAL_COMMENTS = \[\s*\{\s*id:\s*1[^\]]+\];/sm;
code = code.replace(oldInitialCommentsRegex, NEW_INITIAL_COMMENTS);

code = code.replace(
  "import { Languages, Play, Pause, Heart, Send, Sparkles, Star, Music, ArrowRight, ArrowLeft, Menu, Disc, MessageSquare, Volume2, VolumeX, History, Mic2 } from 'lucide-react';",
  "import { Languages, Play, Pause, Heart, Send, Sparkles, Star, Music, ArrowRight, ArrowLeft, Menu, Disc, MessageSquare, Volume2, VolumeX, History, Mic2, MessageCircle, Reply } from 'lucide-react';"
);

const handleRegex = /const handleAddComment = \(e: FormEvent\) => \{[\s\S]*?\}\s*\};\n/sm;

const NEW_HANDLE = `
  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: Date.now(),
        author: 'ゲストファン',
        avatar: \`https://api.dicebear.com/7.x/miniavs/svg?seed=\${Date.now()}&backgroundColor=ffdfbf\`,
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
`;
code = code.replace(handleRegex, NEW_HANDLE);

const renderRegex = /\{comments\.map\(\(comment,\s*i\)\s*=>\s*\([\s\S]*?\n\s*\)\)}/sm;

const NEW_RENDER = `
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
                      <div className={\`w-16 h-16 rounded-full border-2 border-pink-100 overflow-hidden shrink-0 \${i % 2 === 0 ? 'bg-gradient-to-br from-[#ffe4e1] to-[#ffb6c1]' : 'bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1]'}\`}>
                        <img src={comment.avatar} alt="avatar" className="w-full h-full object-cover p-1" />
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start mb-2">
                            <span className="font-display font-black text-xl text-pink-950">{comment.author}</span>
                            <span className="text-xs font-bold bg-slate-100 px-2 py-1 border-2 border-pink-100 rounded-lg">{comment.time}</span>
                         </div>
                         <p className="text-stone-600 font-bold text-lg leading-snug">{comment.text}</p>
                         <div className="flex gap-6 mt-4 items-center">
                            <button onClick={() => handleLike(comment.id)} className={\`flex items-center gap-1.5 text-sm font-bold \${comment.liked ? 'text-pink-500' : 'text-stone-400 hover:text-pink-400'} transition-colors\`}>
                              <Heart className={\`w-5 h-5 \${comment.liked ? 'fill-pink-500' : ''}\`} />
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
`;
code = code.replace(renderRegex, NEW_RENDER);

fs.writeFileSync('src/App.tsx', code);
