"use client"

import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    if (locale === "en") {
      // 切换到英文版本
      if (pathname.startsWith("/zh")) {
        const newPath = pathname.replace("/zh", "") || "/"
        router.push(newPath)
      } else {
        router.push("/")
      }
    } else {
      // 切换到中文版本
      if (pathname.startsWith("/zh")) {
        // 已经在中文版本
        return
      } else {
        const newPath = `/zh${pathname}`
        router.push(newPath)
      }
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-black/80 border border-red-600 p-2 rounded font-mono">
      <Globe className="text-red-400" size={16} />
      <button
        onClick={() => switchLanguage("en")}
        className={`px-2 py-1 text-sm border border-red-600 transition-colors ${
          !pathname.startsWith("/zh") ? "bg-red-600 text-white" : "text-red-400 hover:text-red-300 hover:bg-red-600/10"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage("zh")}
        className={`px-2 py-1 text-sm border border-red-600 transition-colors ${
          pathname.startsWith("/zh") ? "bg-red-600 text-white" : "text-red-400 hover:text-red-300 hover:bg-red-600/10"
        }`}
      >
        中文
      </button>
    </div>
  )
}
