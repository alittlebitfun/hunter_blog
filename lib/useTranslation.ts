"use client"

import { usePathname } from "next/navigation"
import translations from "./translations.json"

export function useTranslation() {
  const pathname = usePathname()

  // 从路径中提取语言代码
  const locale = pathname.startsWith("/zh") ? "zh" : "en"

  const t = (key: string): string => {
    const translation = translations[locale as keyof typeof translations]
    return translation?.[key as keyof typeof translation] || key
  }

  return { t, locale }
}
