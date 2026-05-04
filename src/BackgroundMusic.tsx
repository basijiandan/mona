import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 尝试在组件挂载时播放
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      // 浏览器通常会阻止自动播放，直到有用户交互
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Playback failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="https://cdn1.suno.ai/ac6a5ea5-e7fd-4939-aff8-770cc2a45029.mp3"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* 悬浮控制按钮 */}
      <div className="fixed bottom-24 right-6 z-[1000]">
        <button
          onClick={togglePlay}
          className="bg-[#ffc8dd] w-14 h-14 rounded-full border-4 border-slate-900 flex items-center justify-center text-slate-900 cursor-pointer shadow-[4px_4px_0px_#0f172a] hover:-translate-y-1 transition-all active:shadow-none active:translate-y-0"
        >
          {isPlaying ? <Volume2 size={28} /> : <VolumeX size={28} />}
          {!isPlaying && (
            <div className="absolute -top-12 right-0 bg-white border-2 border-slate-900 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-[2px_2px_0_#0f172a] animate-bounce">
              点击开启音乐 ✨
            </div>
          )}
        </button>
      </div>
    </>
  );
}
