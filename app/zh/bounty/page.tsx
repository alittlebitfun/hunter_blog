"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, MapPin, User, ArrowRight, Target } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useTranslation } from "@/lib/useTranslation"
import LanguageSwitcher from "@/components/LanguageSwitcher"

// 中文悬赏文章数据
const bountyPostsZh = [
  {
    id: 1,
    title: "神秘算法失踪案",
    reward: "¥35,000",
    difficulty: "HIGH",
    location: "硅谷",
    timeLimit: "7天",
    author: "特工史密斯",
    date: "2024-01-15",
    excerpt:
      "一个革命性的AI算法从我们的安全服务器中消失了。情报显示它被一个只知道代号为'幽灵编码者'的流氓开发者偷走了。",
    tags: ["人工智能", "盗窃", "高科技", "紧急"],
    status: "ACTIVE",
  },
  {
    id: 2,
    title: "数据库破坏者追捕令",
    reward: "¥24,500",
    difficulty: "MEDIUM",
    location: "纽约",
    timeLimit: "5天",
    author: "代码侦探",
    date: "2024-01-12",
    excerpt: "包含客户信息的关键数据库已被损坏。初步调查指向内部破坏。",
    tags: ["数据库", "破坏", "内部", "恢复"],
    status: "ACTIVE",
  },
  {
    id: 3,
    title: "加密钱包大劫案",
    reward: "¥56,000",
    difficulty: "EXTREME",
    location: "全球",
    timeLimit: "3天",
    author: "加密猎手",
    date: "2024-01-10",
    excerpt: "一名老练的黑客攻破了多个加密货币钱包，盗取了超过200万美元的数字资产。",
    tags: ["加密货币", "黑客", "金融", "时间紧迫"],
    status: "URGENT",
  },
  {
    id: 4,
    title: "企业间谍调查",
    reward: "¥29,400",
    difficulty: "HIGH",
    location: "伦敦",
    timeLimit: "10天",
    author: "军情代码",
    date: "2024-01-08",
    excerpt: "商业机密正在泄露给竞争对手。我们怀疑组织内部有内鬼。",
    tags: ["间谍", "调查", "企业", "法律"],
    status: "ACTIVE",
  },
  {
    id: 5,
    title: "勒索软件恢复任务",
    reward: "¥45,500",
    difficulty: "HIGH",
    location: "远程",
    timeLimit: "2天",
    author: "网络防御",
    date: "2024-01-05",
    excerpt: "一个大型医院网络遭到勒索软件攻击。患者数据被加密，系统瘫痪。",
    tags: ["勒索软件", "医疗", "紧急", "解密"],
    status: "CRITICAL",
  },
  {
    id: 6,
    title: "社会工程学攻击分析",
    reward: "¥19,600",
    difficulty: "MEDIUM",
    location: "芝加哥",
    timeLimit: "8天",
    author: "心理作战",
    date: "2024-01-03",
    excerpt: "员工正在成为复杂钓鱼活动的受害者。我们需要识别攻击载体。",
    tags: ["社会工程学", "钓鱼", "培训", "分析"],
    status: "ACTIVE",
  },
]

function BountyContent() {
  const searchParams = useSearchParams()
  const kills = Number.parseInt(searchParams.get("kills") || "0")
  const shots = Number.parseInt(searchParams.get("shots") || "1") // 默认为1避免除零
  const { t } = useTranslation()

  // 计算准确率
  const accuracy = shots > 0 ? Math.round((kills / shots) * 100) : 0

  // 根据击杀数量确定称呼
  const getRankTitle = (killCount: number) => {
    switch (killCount) {
      case 1:
        return { title: t("rookie"), subtitle: t("rookieSubtitle"), color: "text-yellow-400" }
      case 2:
        return { title: t("gunslinger"), subtitle: t("gunslingerSubtitle"), color: "text-orange-400" }
      case 3:
        return { title: t("eliteHunter"), subtitle: t("eliteHunterSubtitle"), color: "text-red-400" }
      default:
        return { title: "猎人", subtitle: "猎人", color: "text-gray-400" }
    }
  }

  const rank = getRankTitle(kills)

  return (
    <div className="min-h-screen bg-black text-red-500">
      {/* 语言切换器 */}
      <LanguageSwitcher />

      {/* 背景纹理 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ff0000' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 欢迎标语 */}
        {kills > 0 && (
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-gray-900/90 via-black/90 to-gray-900/90 border-2 border-red-600/50 p-8 backdrop-blur-sm">
              <div className="relative">
                {/* 装饰边框 */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-red-500"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-red-500"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-red-500"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-red-500"></div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 className="text-2xl text-red-400 font-mono mb-2">{t("missionComplete")}</h2>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-red-500"></div>
                    <Target className="text-red-500" size={24} />
                    <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-red-500"></div>
                  </div>

                  <div className={`text-5xl font-black ${rank.color} mb-2 font-mono tracking-wider`}>{rank.title}</div>
                  <div className="text-xl text-gray-300 mb-4 font-mono">{rank.subtitle}</div>

                  <div className="flex items-center justify-center gap-8 text-sm font-mono">
                    <div className="text-green-400">
                      <span className="text-gray-400">{t("targetsEliminated")}:</span>
                      <span className="ml-2 text-2xl font-bold">{kills}</span>
                    </div>
                    <div className="text-yellow-400">
                      <span className="text-gray-400">{t("shotsFired")}:</span>
                      <span className="ml-2 text-2xl font-bold">{shots}</span>
                    </div>
                    <div className="text-blue-400">
                      <span className="text-gray-400">{t("accuracy")}:</span>
                      <span className="ml-2 text-2xl font-bold">{accuracy}%</span>
                    </div>
                  </div>

                  {/* 等级徽章 */}
                  <motion.div
                    className="mt-6 flex justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <div
                      className={`w-16 h-16 rounded-full border-4 ${rank.color.replace("text-", "border-")} flex items-center justify-center bg-black/50`}
                    >
                      <span className={`text-2xl font-bold ${rank.color}`}>{kills}</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 头部 */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link
              href="/zh"
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors mb-4 font-mono"
            >
              <Target size={20} />
              {t("backToHunt")}
            </Link>
            <h1 className="text-5xl font-bold text-red-400 font-mono">{t("activeBounties")}</h1>
            <p className="text-red-300 font-mono mt-2">{t("selectTarget")}</p>
          </div>

          <div className="text-right font-mono">
            <div className="text-2xl text-green-400">{t("totalRewards")}</div>
            <div className="text-4xl font-bold text-green-500">
              ¥
              {bountyPostsZh
                .reduce((sum, post) => sum + Number.parseInt(post.reward.replace(/[¥,]/g, "")), 0)
                .toLocaleString()}
            </div>
          </div>
        </div>

        {/* 过滤器 */}
        <div className="flex gap-4 mb-8 font-mono">
          <button className="bg-red-600 text-white px-4 py-2 text-sm">{t("all")}</button>
          <button className="border border-red-600 text-red-400 hover:bg-red-600/10 px-4 py-2 text-sm">
            {t("urgent")}
          </button>
          <button className="border border-red-600 text-red-400 hover:bg-red-600/10 px-4 py-2 text-sm">
            {t("highReward")}
          </button>
          <button className="border border-red-600 text-red-400 hover:bg-red-600/10 px-4 py-2 text-sm">
            {t("expiringSoon")}
          </button>
        </div>

        {/* 悬赏列表 */}
        <div className="grid gap-6">
          {bountyPostsZh.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (kills > 0 ? 1.2 : 0) + index * 0.1 }}
            >
              <Link href={`/zh/bounty/${post.id}`}>
                <div className="bg-red-950/20 border-2 border-red-600 p-6 hover:bg-red-950/30 transition-all duration-300 hover:border-red-500 group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h2 className="text-2xl font-bold text-red-400 group-hover:text-red-300 font-mono">
                          {post.title}
                        </h2>
                        <div
                          className={`px-2 py-1 text-xs font-bold ${
                            post.status === "CRITICAL"
                              ? "bg-red-600 text-white"
                              : post.status === "URGENT"
                                ? "bg-orange-600 text-white"
                                : "bg-green-600 text-white"
                          }`}
                        >
                          {post.status === "CRITICAL" ? "危急" : post.status === "URGENT" ? "紧急" : "激活"}
                        </div>
                      </div>

                      <p className="text-red-300 mb-4 font-mono text-sm leading-relaxed">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-red-600/20 border border-red-600 px-2 py-1 text-red-400 font-mono text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className="text-3xl font-bold text-green-400 mb-2">{post.reward}</div>
                      <div
                        className={`px-3 py-1 text-xs font-bold ${
                          post.difficulty === "EXTREME"
                            ? "bg-red-600 text-white"
                            : post.difficulty === "HIGH"
                              ? "bg-orange-600 text-white"
                              : "bg-yellow-600 text-black"
                        }`}
                      >
                        {post.difficulty === "EXTREME" ? "极高" : post.difficulty === "HIGH" ? "高" : "中等"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm font-mono">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1 text-red-400">
                        <Clock size={16} />
                        {post.timeLimit}
                      </div>
                      <div className="flex items-center gap-1 text-blue-400">
                        <MapPin size={16} />
                        {post.location}
                      </div>
                      <div className="flex items-center gap-1 text-purple-400">
                        <User size={16} />
                        {post.author}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-red-400 group-hover:text-red-300">
                      <span>{t("viewDetails")}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 底部统计 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
          <div className="bg-black/50 border border-red-600 p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{bountyPostsZh.length}</div>
            <div className="text-red-300 text-sm">{t("activeBountiesCount")}</div>
          </div>
          <div className="bg-black/50 border border-orange-600 p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {bountyPostsZh.filter((p) => p.status === "URGENT" || p.status === "CRITICAL").length}
            </div>
            <div className="text-orange-300 text-sm">{t("urgentCases")}</div>
          </div>
          <div className="bg-black/50 border border-green-600 p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              ¥{Math.max(...bountyPostsZh.map((p) => Number.parseInt(p.reward.replace(/[¥,]/g, "")))).toLocaleString()}
            </div>
            <div className="text-green-300 text-sm">{t("highestReward")}</div>
          </div>
          <div className="bg-black/50 border border-blue-600 p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">24/7</div>
            <div className="text-blue-300 text-sm">{t("supportAvailable")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BountyListPage() {
  const { t } = useTranslation()

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-red-500 font-mono">
          {t("loading")}
        </div>
      }
    >
      <BountyContent />
    </Suspense>
  )
}
