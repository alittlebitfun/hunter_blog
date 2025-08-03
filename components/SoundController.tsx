"use client"

import { useState, useEffect } from 'react'
import { Volume2, VolumeX, Volume1 } from 'lucide-react'
import { useSoundEffects } from '@/lib/soundEffects'
import { useTranslation } from '@/lib/useTranslation'

export default function SoundController() {
  const { getMuted, getVolume, setVolume, toggleMute } = useSoundEffects()
  const { t } = useTranslation()
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setLocalVolume] = useState(0.7)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  useEffect(() => {
    setIsMuted(getMuted())
    setLocalVolume(getVolume())
  }, [getMuted, getVolume])

  const handleMuteToggle = () => {
    const newMutedState = toggleMute()
    setIsMuted(newMutedState)
  }

  const handleVolumeChange = (newVolume: number) => {
    setLocalVolume(newVolume)
    setVolume(newVolume)
  }

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={20} />
    } else if (volume < 0.5) {
      return <Volume1 size={20} />
    } else {
      return <Volume2 size={20} />
    }
  }

  return (
    <div className="absolute bottom-8 right-8 z-50">
      <div className="relative">
        {/* 音效控制按钮 */}
        <button
          onClick={handleMuteToggle}
          className="bg-gradient-to-b from-gray-900/90 to-black/90 border-2 border-red-600/50 p-3 font-mono backdrop-blur-sm hover:border-red-500/70 transition-all duration-200 group"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <div className="relative">
            {/* 按钮装饰 */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-red-500"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-red-500"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-red-500"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-red-500"></div>

            {/* 音量图标 */}
            <div className="text-red-400 group-hover:text-red-300 transition-colors duration-200">
              {getVolumeIcon()}
            </div>
          </div>
        </button>

                 {/* 音量滑块 */}
         {showVolumeSlider && (
           <div className="absolute bottom-full right-0 mb-2 bg-gradient-to-b from-gray-900/95 to-black/95 border-2 border-red-600/50 p-4 backdrop-blur-sm">
            <div className="relative">
              {/* 面板装饰 */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-red-500"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-red-500"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-red-500"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-red-500"></div>

              <div className="text-red-400 text-xs font-mono mb-2 text-center chinese-text">
                {isMuted ? t("soundOff") : `${t("volume")} ${Math.round(volume * 100)}%`}
              </div>

              {/* 音量滑块 */}
              <div className="w-32 h-2 bg-gray-700 rounded-full relative">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-200"
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* 音量标记 */}
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 