import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, DollarSign, Clock, User, MapPin } from "lucide-react"
import LanguageSwitcher from "@/components/LanguageSwitcher"

// 中文版悬赏详情数据
const bountyPostsZh = {
  1: {
    title: "神秘算法失踪案",
    reward: "¥35,000",
    difficulty: "高",
    location: "硅谷",
    timeLimit: "7天",
    author: "特工史密斯",
    date: "2024-01-15",
    content: `
      **机密简报**
      
      目标：一个革命性的AI算法从我们的安全服务器中消失了。情报显示它被一个只知道代号为"幽灵编码者"的流氓开发者偷走了。
      
      **任务目标：**
      - 找到丢失的算法
      - 识别犯罪者
      - 恢复被盗代码
      
      **背景：**
      这个算法是机器学习领域的突破性成果，可能会彻底改变科技行业。它由我们的顶级研究人员历时三年开发，代表着数百万美元的研发投资。
      
      **最后已知位置：**
      该算法最后一次被访问是在1月14日23:47，从A楼的7号终端。安全录像显示一个穿黑色连帽衫的身影，但面部识别未能识别身份。
      
      **奖励详情：**
      - 基础奖励：¥35,000
      - 活捉奖金：+¥14,000
      - 代码恢复奖金：+¥10,500
      
      **警告：**
      目标被认为极其危险且技术精湛。请极度谨慎接近。
    `,
    tags: ["人工智能", "盗窃", "高科技", "紧急"],
  },
  2: {
    title: "数据库破坏者追捕令",
    reward: "¥24,500",
    difficulty: "中等",
    location: "纽约",
    timeLimit: "5天",
    author: "代码侦探",
    date: "2024-01-12",
    content: `
      **事件报告**
      
      包含客户信息的关键数据库已被损坏。初步调查指向内部破坏。
      
      **任务简报：**
      有内部访问权限的人一直在系统性地破坏我们的客户数据库。我们需要识别犯罪者并恢复丢失的数据。
      
      **证据：**
      - 破坏行为始于3天前
      - 只影响高级客户记录
      - 访问日志显示非工作时间的异常活动
      - 备份系统也被破坏
      
      **嫌疑人画像：**
      - 拥有数据库管理员权限
      - 熟悉我们的备份程序
      - 可能对公司怀有怨恨
      
      **你的任务：**
      在客户信任永久受损之前，追踪破坏者并恢复数据库完整性。
    `,
    tags: ["数据库", "破坏", "内部", "恢复"],
  },
  3: {
    title: "加密钱包大劫案",
    reward: "¥56,000",
    difficulty: "极高",
    location: "全球",
    timeLimit: "3天",
    author: "加密猎手",
    date: "2024-01-10",
    content: `
      **紧急悬赏**
      
      一名老练的黑客攻破了多个加密货币钱包，盗取了超过200万美元的数字资产。
      
      **劫案详情：**
      犯罪者使用社会工程学和高级密码学攻击的组合来获取高价值钱包的访问权限。他们一直在通过多个交易所转移资金以掩盖踪迹。
      
      **技术细节：**
      - 使用钱包软件的零日漏洞
      - 采用高级混币服务
      - 留下最少的数字足迹
      - 只针对高净值个人
      
      **挑战：**
      这不是你平常遇到的脚本小子。我们面对的是一个既懂技术又懂金融的专业人士。
      
      **时间紧迫：**
      等待的时间越长，追踪被盗资金就越困难。每一小时都很重要。
    `,
    tags: ["加密货币", "黑客", "金融", "时间紧迫"],
  },
  4: {
    title: "企业间谍调查",
    reward: "¥29,400",
    difficulty: "高",
    location: "伦敦",
    timeLimit: "10天",
    author: "军情代码",
    date: "2024-01-08",
    content: `
      **机密调查**
      
      商业机密正在泄露给竞争对手。我们怀疑组织内部有内鬼。
      
      **情况：**
      关于我们即将推出产品的专有信息出现在竞争对手的演示中。泄露使我们在竞争优势方面损失了数百万。
      
      **调查参数：**
      - 监控内部通信
      - 分析敏感文档的访问模式
      - 识别潜在嫌疑人
      - 收集法律程序的证据
      
      **挑战：**
      - 内鬼可能是拥有高级访问权限的人
      - 他们非常小心地掩盖踪迹
      - 可能涉及多个部门
      
      **成功标准：**
      识别泄露源并提供能在法庭上站得住脚的具体证据。
    `,
    tags: ["间谍", "调查", "企业", "法律"],
  },
  5: {
    title: "勒索软件恢复任务",
    reward: "¥45,500",
    difficulty: "高",
    location: "远程",
    timeLimit: "2天",
    author: "网络防御",
    date: "2024-01-05",
    content: `
      **紧急响应**
      
      一个大型医院网络遭到勒索软件攻击。患者数据被加密，系统瘫痪。
      
      **危急情况：**
      生命岌岌可危。医院的患者管理系统、医疗记录和诊断设备都被攻破。我们需要立即恢复运营。
      
      **技术挑战：**
      - 定制勒索软件变种
      - 高级加密方法
      - 使用多种攻击载体
      - 备份系统也被攻破
      
      **任务要求：**
      - 在不支付赎金的情况下解密患者数据
      - 恢复关键系统
      - 识别攻击载体以防止再次发生
      - 为执法部门记录一切
      
      **紧急程度：最高**
      每一分钟的停机都会让患者面临风险。这是一场与时间的赛跑。
    `,
    tags: ["勒索软件", "医疗", "紧急", "解密"],
  },
}

export default function BountyPage({ params }: { params: { id: string } }) {
  const post = bountyPostsZh[params.id as unknown as keyof typeof bountyPostsZh]

  if (!post) {
    notFound()
  }

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
        {/* 返回按钮 */}
        <Link
          href="/zh/bounty"
          className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors mb-8 font-mono"
        >
          <ArrowLeft size={20} />
          返回狩猎
        </Link>

        {/* 悬赏单头部 */}
        <div className="bg-red-950/30 border-2 border-red-600 p-8 mb-8 relative">
          <div className="absolute top-4 right-4 bg-red-600 text-black px-3 py-1 font-bold text-sm">悬赏</div>

          <h1 className="text-4xl font-bold text-red-400 mb-6 font-mono">{post.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <DollarSign className="text-green-400" size={20} />
              <span className="font-mono">
                <span className="text-red-400">奖励:</span>
                <span className="text-green-400 font-bold ml-2">{post.reward}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="text-yellow-400" size={20} />
              <span className="font-mono">
                <span className="text-red-400">时限:</span>
                <span className="text-yellow-400 font-bold ml-2">{post.timeLimit}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="text-blue-400" size={20} />
              <span className="font-mono">
                <span className="text-red-400">地点:</span>
                <span className="text-blue-400 font-bold ml-2">{post.location}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User className="text-purple-400" size={20} />
              <span className="font-mono">
                <span className="text-red-400">特工:</span>
                <span className="text-purple-400 font-bold ml-2">{post.author}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`px-3 py-1 font-bold text-sm ${
                post.difficulty === "极高"
                  ? "bg-red-600 text-white"
                  : post.difficulty === "高"
                    ? "bg-orange-600 text-white"
                    : "bg-yellow-600 text-black"
              }`}
            >
              难度: {post.difficulty}
            </div>
            <div className="text-red-400 font-mono text-sm">发布时间: {post.date}</div>
          </div>
        </div>

        {/* 任务内容 */}
        <div className="bg-black/50 border border-red-600 p-8 mb-8">
          <div className="prose prose-red max-w-none">
            <div className="whitespace-pre-line text-red-300 font-mono leading-relaxed">{post.content}</div>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-red-600/20 border border-red-600 px-3 py-1 text-red-400 font-mono text-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* 行动按钮 */}
        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold font-mono transition-colors">
            接受悬赏
          </button>
          <button className="border border-red-600 text-red-400 hover:bg-red-600/10 px-8 py-3 font-bold font-mono transition-colors">
            稍后处理
          </button>
        </div>
      </div>
    </div>
  )
}
