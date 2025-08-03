"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Zap, Crosshair, Target, Gauge } from "lucide-react"
import { useTranslation } from "@/lib/useTranslation"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import SoundController from "@/components/SoundController"
import { useSoundEffects } from "@/lib/soundEffects"

interface BulletHole {
  x: number
  y: number
  id: number
}

interface TargetInterface {
  id: number
  x: number
  y: number
  hit: boolean
}

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [bulletHoles, setBulletHoles] = useState<BulletHole[]>([])
  const [targets, setTargets] = useState<TargetInterface[]>([])
  const [showMuzzleFlash, setShowMuzzleFlash] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const countdownStarted = useRef(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shotsFired, setShotsFired] = useState(0)
  const { t, locale } = useTranslation()
  const { playGunshot, playHit, playTargetDestroyed } = useSoundEffects()

  useEffect(() => {
    setIsClient(true)
    // 初始化靶子位置
    setTargets([
      { id: 1, x: 25, y: 30, hit: false },
      { id: 2, x: 50, y: 20, hit: false },
      { id: 3, x: 75, y: 35, hit: false },
    ])
  }, [])

  // 监听击杀数变化，第一次击中时开始倒计时
  useEffect(() => {
    const currentKills = targets.filter((t) => t.hit).length

    if (currentKills > 0 && !countdownStarted.current) {
      countdownStarted.current = true

      setTimeout(() => {
        // 5秒后获取最终击杀数并跳转
        setTargets((currentTargets) => {
          const finalKills = currentTargets.filter((t) => t.hit).length
          setShotsFired((currentShots) => {
            const bountyPath = locale === "zh" ? "/zh/bounty" : "/bounty"
            router.push(`${bountyPath}?kills=${finalKills}&shots=${currentShots}`)
            return currentShots
          })
          return currentTargets
        })
      }, 5000)
    }
  }, [targets, router, locale])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    if (isClient) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove, isClient])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // 增加射击次数
      setShotsFired((prev) => prev + 1)

      const clickX = e.clientX
      const clickY = e.clientY

      // 播放枪声
      playGunshot()

      // 枪口闪光效果
      setShowMuzzleFlash(true)
      setTimeout(() => setShowMuzzleFlash(false), 150)

      // 添加弹孔
      setBulletHoles((prev) => [...prev, { x: clickX, y: clickY, id: Date.now() }])

      // 检查是否击中靶子
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      let hitAny = false
      const newTargets = targets.map((target) => {
        if (target.hit) return target

        // 调整命中判定区域，向右下方偏移
        const targetX = (target.x / 100) * windowWidth + 50  // 向右偏移20px
        const targetY = (target.y / 100) * windowHeight + 50 // 向下偏移30px
        const distance = Math.sqrt(Math.pow(clickX - targetX, 2) + Math.pow(clickY - targetY, 2))

        if (distance < 70) {
          hitAny = true
          // 播放击中音效
          playHit()
          return { ...target, hit: true }
        }
        return target
      })

      if (hitAny) {
        setTargets(newTargets)
        // 播放目标摧毁音效
        setTimeout(() => playTargetDestroyed(), 100)
      }
    },
    [targets, playGunshot, playHit, playTargetDestroyed],
  )

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-red-500 overflow-hidden cursor-none relative" onClick={handleClick}>
      {/* 语言切换器 */}
      <LanguageSwitcher />
      
      {/* 音效控制器 */}
      <SoundController />

      {/* 复杂背景纹理 */}
      <div className="absolute inset-0">
        {/* 基础渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-950/20"></div>

        {/* 机械网格 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* 六角形图案 */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ff0000' fillOpacity='0.3'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }}
        ></div>

        {/* 扫描线效果 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-2"
          animate={{ y: [0, window.innerHeight || 800] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        ></motion.div>
      </div>

      {/* 装饰性齿轮 */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-red-600">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>
      </motion.div>

      {/* 标题区域 */}
      <motion.div
        className="absolute top-12 left-8 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="relative">
          {/* 标题背景装饰 */}
          <div className="absolute -inset-4 bg-gradient-to-r from-red-900/20 via-red-600/10 to-red-900/20 blur-xl"></div>

          {/* 主标题 */}
          <div className="relative">
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-left tracking-wider font-mono">
              {t("title").split(" ")[0]}
            </h1>
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-red-700 text-left tracking-wider font-mono -mt-4">
              {t("title").split(" ")[1] || ""}
            </h1>
          </div>

          {/* 装饰线条 */}
          <div className="flex items-center justify-center mt-4 gap-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-red-500"></div>
            <Crosshair className="text-red-500" size={24} />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-red-500"></div>
          </div>

          <p className="text-xl text-red-400 text-center mt-6 font-mono tracking-widest chinese-text">{t("subtitle")}</p>
        </div>
      </motion.div>

      {/* 左侧控制面板 */}
      <div className="absolute left-8 top-2/3 transform -translate-y-1/2 bg-gradient-to-b from-gray-900/90 to-black/90 border-2 border-red-600/50 p-6 font-mono text-sm backdrop-blur-sm">
        <div className="relative">
          {/* 面板装饰 */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-red-500"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-red-500"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-red-500"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-red-500"></div>

          <div className="flex items-center gap-2 text-red-400 mb-4 text-lg font-bold chinese-text">
            <Gauge size={20} />
            {t("systemStatus")}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 chinese-text">{t("weapons")}:</span>
              <span className="text-green-400 font-bold chinese-text">{t("online")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 chinese-text">{t("targeting")}:</span>
              <span className="text-green-400 font-bold chinese-text">{t("active")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 chinese-text">{t("ammo")}:</span>
              <span className="text-yellow-400 font-bold">∞</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 chinese-text">{t("range")}:</span>
              <span className="text-blue-400 font-bold chinese-text">{t("optimal")}</span>
            </div>
          </div>

          {/* 状态指示灯 */}
          <div className="flex gap-2 mt-4">
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <motion.div
              className="w-3 h-3 bg-yellow-500 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
          </div>
        </div>
      </div>

      {/* 右上角计分板 */}
      <div className="absolute top-32 right-8 bg-gradient-to-b from-gray-900/90 to-black/90 border-2 border-red-600/50 p-4 font-mono backdrop-blur-sm">
        <div className="relative">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <Target size={20} />
            <span className="text-lg font-bold chinese-text">{t("targets")}</span>
          </div>
          <div className="text-3xl font-black text-center">
            <span className="text-green-400">{targets.filter((t) => t.hit).length}</span>
            <span className="text-red-400 mx-2">/</span>
            <span className="text-red-400">{targets.length}</span>
          </div>
          <div className="text-xs text-gray-400 text-center mt-1 chinese-text">{t("eliminated")}</div>
        </div>
      </div>

      {/* 雷达扫描 */}
      <div className="absolute bottom-20 right-20 w-40 h-40 opacity-40">
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 w-0.5 h-20 bg-gradient-to-b from-green-500 to-transparent transform -translate-x-0.5"></div>
          </motion.div>
          <div className="absolute inset-4 rounded-full border border-green-400 opacity-60"></div>
          <div className="absolute inset-8 rounded-full border border-green-300 opacity-40"></div>
          <div className="absolute inset-16 rounded-full border border-green-200 opacity-20"></div>

          {/* 雷达标签 */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-400 font-mono text-xs chinese-text">
            {t("radar")}
          </div>
        </div>
      </div>

      {/* 靶子 - 机器人头部 */}
      <AnimatePresence>
        {targets.map((target) => (
          <motion.div
            key={target.id}
            className="absolute"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: target.hit ? 0 : 1,
              rotate: target.hit ? 360 : 0,
            }}
            exit={{ scale: 0, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-28 h-32">
              {/* 敌人标识文字 */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-600/90 text-white px-2 py-1 text-xs font-bold font-mono border border-red-500 rounded chinese-text">
                  {t("enemy")}
                </div>
                {/* 指向箭头 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-red-600"></div>
              </div>

              {/* 贝雷帽 */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-12">
                {/* 帽子主体 */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-700 to-green-800 rounded-full border-2 border-green-600 shadow-lg"></div>
                {/* 帽子装饰 */}
                <div className="absolute top-1 right-2 w-3 h-3 bg-red-600 rounded-full border border-red-500"></div>
                {/* 帽檐 */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gradient-to-b from-green-600 to-green-700 rounded-full"></div>
              </div>

              {/* 机器人头部 */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20">
                {/* 头部外壳 */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-lg border-2 border-gray-300 shadow-lg">
                  {/* 金属纹理 */}
                  <div className="absolute inset-1 bg-gradient-to-br from-gray-300 to-gray-500 rounded-md opacity-50"></div>

                  {/* 螺丝装饰 */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-400"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-400"></div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-400"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-600 rounded-full border border-gray-400"></div>
                </div>

                {/* 眼部区域 */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {/* 左眼 */}
                  <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full border border-red-300 shadow-inner">
                    <div className="absolute inset-0.5 bg-red-500 rounded-full opacity-80"></div>
                    <motion.div
                      className="absolute inset-1 bg-red-300 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.div>
                  </div>
                  {/* 右眼 */}
                  <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full border border-red-300 shadow-inner">
                    <div className="absolute inset-0.5 bg-red-500 rounded-full opacity-80"></div>
                    <motion.div
                      className="absolute inset-1 bg-red-300 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
                    ></motion.div>
                  </div>
                </div>

                {/* 鼻子/传感器 */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm border border-blue-300">
                  <motion.div
                    className="absolute inset-0 bg-blue-300 rounded-sm opacity-60"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  ></motion.div>
                </div>

                {/* 嘴部/扬声器 */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full border border-gray-500">
                  {/* 扬声器网格 */}
                  <div className="absolute inset-0 flex justify-center items-center gap-0.5">
                    <div className="w-0.5 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-0.5 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-0.5 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-0.5 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </div>

                {/* 天线 */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gray-400">
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full border border-yellow-300">
                    <motion.div
                      className="absolute inset-0 bg-yellow-300 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.div>
                  </div>
                </div>

                {/* 击中效果 */}
                {target.hit && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-6xl drop-shadow-lg">💀</div>
                  </motion.div>
                )}
              </div>

              {/* 机器人颈部 */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gradient-to-b from-gray-500 to-gray-600 border border-gray-400">
                {/* 颈部连接线 */}
                <div className="absolute inset-1 flex justify-center">
                  <div className="w-0.5 h-full bg-red-400"></div>
                  <div className="w-0.5 h-full bg-blue-400 ml-0.5"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
{/* 弹孔效果 */}
<AnimatePresence>
  {bulletHoles.map((hole) => (
    <motion.div
      key={hole.id}
      className="absolute"
      style={{
        left: hole.x - 8,
        top: hole.y - 8,
      }}
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-4 h-4 bg-gradient-to-br from-red-800 to-black rounded-full border border-red-600 shadow-inner"></div>
      {/* 裂纹效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-red-700 transform -translate-x-1/2 -translate-y-1"></div>
        <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-red-700 transform -translate-x-1/2 translate-y-1"></div>
        <div className="absolute left-0 top-1/2 w-2 h-0.5 bg-red-700 transform -translate-y-1/2 -translate-x-1"></div>
        <div className="absolute right-0 top-1/2 w-2 h-0.5 bg-red-700 transform -translate-y-1/2 translate-x-1"></div>
      </div>
    </motion.div>
  ))}
</AnimatePresence>

{/* 高级准星 */}
<motion.div
  className="fixed pointer-events-none z-50"
  style={{
    left: mousePosition.x - 40, // 80px / 2
    top: mousePosition.y - 40,
  }}
  animate={{
    scale: showMuzzleFlash ? 1.3 : 1,
  }}
  transition={{ duration: 0.15 }}
>
  <div className="relative w-20 h-20">
    {/* 外圈 - 旋转 */}
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-red-500 opacity-60"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 w-1 h-1 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-red-500 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute left-0 top-1/2 w-1 h-1 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute right-0 top-1/2 w-1 h-1 bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
    </motion.div>

    {/* 中圈 */}
    <div className="absolute inset-3 rounded-full border border-red-400 opacity-80"></div>

    {/* 十字准星 */}
    <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-red-500 transform -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-red-500 transform -translate-x-1/2 -translate-y-1/2"></div>

    {/* 四角标记 */}
    <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-red-500"></div>
    <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-red-500"></div>
    <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-red-500"></div>
    <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-red-500"></div>

    {/* 中心瞄准点 */}
    <div className="absolute top-1/2 left-1/2 w-2 h-2 border border-red-500 rounded-full transform -translate-x-1 -translate-y-1">
      <div className="absolute inset-0.5 bg-red-500 rounded-full"></div>
    </div>

    {/* 枪口闪光 */}
    {showMuzzleFlash && (
      <>
        <motion.div
          className="absolute inset-0 bg-yellow-400 rounded-full opacity-60"
          initial={{ scale: 0 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
        <motion.div
          className="absolute inset-0 bg-orange-500 rounded-full opacity-40"
          initial={{ scale: 0 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </>
    )}
  </div>
</motion.div>


      {/* 底部状态栏 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-8 font-mono text-sm">
        <div className="flex items-center gap-2 text-red-400">
          <Zap size={16} />
          <span className="chinese-text">{t("soundBang")}</span>
        </div>
        <div className="text-gray-400">|</div>
        <div className="text-yellow-400 chinese-text">{t("readyToFire")}</div>
      </div>
    </div>
  )
}
