import { audioGenerator } from './audioGenerator'

// 音效管理工具
class SoundManager {
  private isMuted: boolean = false
  private volume: number = 0.7
  private audioContextInitialized: boolean = false

  constructor() {
    this.initializeAudioContext()
  }

  private initializeAudioContext() {
    // 在用户第一次交互时初始化音频上下文
    if (typeof window !== 'undefined') {
      const initAudio = () => {
        if (!this.audioContextInitialized) {
          this.audioContextInitialized = true
          // 移除事件监听器
          document.removeEventListener('click', initAudio)
          document.removeEventListener('keydown', initAudio)
          document.removeEventListener('touchstart', initAudio)
        }
      }
      
      document.addEventListener('click', initAudio)
      document.addEventListener('keydown', initAudio)
      document.addEventListener('touchstart', initAudio)
    }
  }

  // 播放枪声
  playGunshot() {
    if (this.isMuted) return
    audioGenerator.generateGunshot(this.volume)
  }

  // 播放击中音效
  playHit() {
    if (this.isMuted) return
    audioGenerator.generateHit(this.volume * 0.7)
  }

  // 播放换弹音效
  playReload() {
    if (this.isMuted) return
    audioGenerator.generateReload(this.volume * 0.6)
  }

  // 播放目标摧毁音效
  playTargetDestroyed() {
    if (this.isMuted) return
    audioGenerator.generateTargetDestroyed(this.volume * 0.8)
  }

  // 播放环境音效
  playAmbient() {
    if (this.isMuted) return
    audioGenerator.generateAmbient(this.volume * 0.1)
  }

  // 设置音量
  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))
  }

  // 静音/取消静音
  toggleMute() {
    this.isMuted = !this.isMuted
    return this.isMuted
  }

  // 获取静音状态
  getMuted() {
    return this.isMuted
  }

  // 获取音量
  getVolume() {
    return this.volume
  }
}

// 创建全局音效管理器实例
export const soundManager = new SoundManager()

// 音效 Hook
export const useSoundEffects = () => {
  return {
    playGunshot: () => soundManager.playGunshot(),
    playHit: () => soundManager.playHit(),
    playReload: () => soundManager.playReload(),
    playTargetDestroyed: () => soundManager.playTargetDestroyed(),
    playAmbient: () => soundManager.playAmbient(),
    setVolume: (volume: number) => soundManager.setVolume(volume),
    toggleMute: () => soundManager.toggleMute(),
    getMuted: () => soundManager.getMuted(),
    getVolume: () => soundManager.getVolume(),
  }
} 