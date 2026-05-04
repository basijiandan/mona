import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Volume2, VolumeX } from 'lucide-react'; // 假设你使用 lucide-react 图标库

// 解决 TypeScript 对 react-player 的类型定义问题
const Player = ReactPlayer as any;

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(true); // 默认开启背景音乐

  return (
    <>
      {/* 隐藏的播放器：放在屏幕视野外但保持运行 */}
      <div style={{ position: 'fixed', top: '-1000px', left: 0, pointerEvents: 'none' }}>
        <Player
          url="https://www.youtube.com/watch?v=7hR-fW9H_yU" // 《おまちかねランチタイム》
          playing={isPlaying}
          loop={true}      // 循环播放
          volume={0.2}    // 音量大小 (0 到 1)
          width="0px"
          height="0px"
        />
      </div>

      {/* 悬浮控制按钮：放在页面右下角或右上角 */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            backgroundColor: '#ffc8dd',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: '4px solid #0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '4px 4px 0px #0f172a'
          }}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>
    </>
  );
}
