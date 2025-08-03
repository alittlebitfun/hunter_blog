// 使用 Web Audio API 生成音效
export class AudioGenerator {
  private audioContext: AudioContext | null = null

  constructor() {
    // 延迟初始化 AudioContext，因为需要用户交互才能创建
    if (typeof window !== 'undefined') {
      this.initAudioContext()
    }
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API 不支持:', error)
    }
  }

  // 确保 AudioContext 已初始化
  private ensureAudioContext() {
    if (!this.audioContext) {
      this.initAudioContext()
    }
    return this.audioContext
  }

  // 生成枪声音效
  generateGunshot(volume: number = 0.7): void {
    const audioContext = this.ensureAudioContext()
    if (!audioContext) return

    // 创建主音量控制
    const masterGain = audioContext.createGain()
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.connect(audioContext.destination)

    // 创建枪声的主要频率
    const oscillator = audioContext.createOscillator()
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1)
    oscillator.type = 'sawtooth'
    oscillator.connect(masterGain)

    // 创建枪声的冲击波
    const impactOscillator = audioContext.createOscillator()
    impactOscillator.frequency.setValueAtTime(2000, audioContext.currentTime)
    impactOscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.05)
    impactOscillator.type = 'square'
    impactOscillator.connect(masterGain)

    // 创建滤波器来模拟枪声的衰减
    const filter = audioContext.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(8000, audioContext.currentTime)
    filter.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2)
    filter.Q.setValueAtTime(1, audioContext.currentTime)
    filter.connect(masterGain)

    // 创建压缩器来模拟枪声的动态范围
    const compressor = audioContext.createDynamicsCompressor()
    compressor.threshold.setValueAtTime(-50, audioContext.currentTime)
    compressor.knee.setValueAtTime(40, audioContext.currentTime)
    compressor.ratio.setValueAtTime(12, audioContext.currentTime)
    compressor.attack.setValueAtTime(0, audioContext.currentTime)
    compressor.release.setValueAtTime(0.25, audioContext.currentTime)
    compressor.connect(masterGain)

    // 设置音量包络
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    // 播放音效
    oscillator.start(audioContext.currentTime)
    impactOscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
    impactOscillator.stop(audioContext.currentTime + 0.3)
  }

  // 生成击中音效
  generateHit(volume: number = 0.5): void {
    const audioContext = this.ensureAudioContext()
    if (!audioContext) return

    const masterGain = audioContext.createGain()
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.connect(audioContext.destination)

    // 创建击中音效
    const oscillator = audioContext.createOscillator()
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1)
    oscillator.type = 'sine'
    oscillator.connect(masterGain)

    // 设置音量包络
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  // 生成目标摧毁音效
  generateTargetDestroyed(volume: number = 0.6): void {
    const audioContext = this.ensureAudioContext()
    if (!audioContext) return

    const masterGain = audioContext.createGain()
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.connect(audioContext.destination)

    // 创建爆炸音效
    const oscillator1 = audioContext.createOscillator()
    oscillator1.frequency.setValueAtTime(100, audioContext.currentTime)
    oscillator1.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3)
    oscillator1.type = 'sawtooth'
    oscillator1.connect(masterGain)

    const oscillator2 = audioContext.createOscillator()
    oscillator2.frequency.setValueAtTime(150, audioContext.currentTime)
    oscillator2.frequency.exponentialRampToValueAtTime(75, audioContext.currentTime + 0.3)
    oscillator2.type = 'square'
    oscillator2.connect(masterGain)

    // 设置音量包络
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)

    oscillator1.start(audioContext.currentTime)
    oscillator2.start(audioContext.currentTime)
    oscillator1.stop(audioContext.currentTime + 0.4)
    oscillator2.stop(audioContext.currentTime + 0.4)
  }

  // 生成换弹音效
  generateReload(volume: number = 0.4): void {
    const audioContext = this.ensureAudioContext()
    if (!audioContext) return

    const masterGain = audioContext.createGain()
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.connect(audioContext.destination)

    // 创建换弹音效
    const oscillator = audioContext.createOscillator()
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1)
    oscillator.type = 'triangle'
    oscillator.connect(masterGain)

    // 设置音量包络
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  }

  // 生成环境音效
  generateAmbient(volume: number = 0.1): void {
    const audioContext = this.ensureAudioContext()
    if (!audioContext) return

    const masterGain = audioContext.createGain()
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.connect(audioContext.destination)

    // 创建环境音效
    const oscillator = audioContext.createOscillator()
    oscillator.frequency.setValueAtTime(60, audioContext.currentTime)
    oscillator.type = 'sine'
    oscillator.connect(masterGain)

    // 设置音量包络
    masterGain.gain.setValueAtTime(volume, audioContext.currentTime)
    masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.0)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 2.0)
  }
}

// 创建全局音频生成器实例
export const audioGenerator = new AudioGenerator() 