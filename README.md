# 🎯 赏金猎人 (Bounty Hunter) - 互动射击博客

一个基于 Next.js 和 React 构建的现代化互动射击博客，具有沉浸式的视觉效果、真实的音效系统和多语言支持。开屏页面提供射击体验，后续可查看悬赏看板。

![游戏截图](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ 博客特色
在线体验地址：https://hunter-blog-eight.vercel.app/

### 🎮 开屏射击体验
- **精准射击** - 使用鼠标瞄准并点击射击机器人目标
- **实时反馈** - 每次射击都有视觉和音效反馈
- **计分系统** - 追踪射击次数和命中率
- **倒计时机制** - 击中第一个目标后开始5秒倒计时

### 🎨 视觉效果
- **赛博朋克风格** - 黑色背景配合红色主题
- **动态背景** - 机械网格、六角形图案和扫描线效果
- **枪口闪光** - 射击时的视觉反馈
- **弹孔效果** - 真实的弹孔和裂纹动画
- **目标动画** - 机器人目标的旋转和摧毁效果
- **准星系统** - 动态跟随鼠标的高级准星

### 🔊 音效系统
- **Web Audio API** - 实时生成高质量音效
- **枪声音效** - 使用锯齿波和方波模拟真实枪声
- **击中反馈** - 清脆的击中音效
- **目标摧毁** - 爆炸般的摧毁音效
- **音量控制** - 可调节音量和静音功能

### 🌍 多语言支持
- **中英文切换** - 完整的界面翻译
- **动态语言** - 实时切换语言
- **本地化** - 支持不同地区的用户

## 🛠️ 技术栈

### 前端框架
- **Next.js 14** - React 全栈框架
- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript

### 样式和动画
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Framer Motion** - 流畅的动画库
- **CSS Grid & Flexbox** - 现代布局技术

### 音效和媒体
- **Web Audio API** - 浏览器原生音频处理
- **AudioContext** - 实时音效生成
- **Oscillator Nodes** - 音频波形生成

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS 后处理器
- **Autoprefixer** - CSS 前缀自动添加

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn 或 pnpm

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 访问游戏
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🎯 博客操作

### 基本操作
1. **瞄准** - 移动鼠标瞄准机器人目标
2. **射击** - 点击鼠标左键射击
3. **语言切换** - 点击左上角语言切换器
4. **音效控制** - 点击右下角音效控制器

### 射击目标
- 击中所有3个机器人目标
- 在5秒倒计时内尽可能多地击中目标
- 提高射击精度和反应速度

### 音效控制
- **音量调节** - 悬停音效按钮显示音量滑块
- **静音切换** - 点击音效按钮切换静音状态
- **实时调节** - 支持0-100%音量调节

### 博客功能
- **悬赏看板** - 射击完成后跳转到悬赏看板页面
- **多语言支持** - 中英文界面切换
- **响应式设计** - 适配不同设备屏幕

## 📁 项目结构

```
hunter_blog/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 英文主页
│   ├── zh/                # 中文页面
│   │   └── page.tsx       # 中文主页
│   ├── bounty/            # 悬赏页面
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── LanguageSwitcher.tsx  # 语言切换器
│   └── SoundController.tsx   # 音效控制器
├── lib/                   # 工具库
│   ├── audioGenerator.ts  # 音效生成器
│   ├── soundEffects.ts    # 音效管理器
│   ├── translations.json  # 翻译文件
│   └── useTranslation.ts  # 翻译 Hook
├── public/                # 静态资源
└── package.json           # 项目配置
```

## 🎨 设计特色

### 视觉设计
- **赛博朋克美学** - 未来科技感的设计风格
- **红色主题** - 突出危险和紧张感
- **机械元素** - 齿轮、网格、扫描线等工业元素
- **动态效果** - 丰富的动画和过渡效果

### 用户体验
- **响应式设计** - 适配不同屏幕尺寸
- **流畅动画** - 60fps 的流畅动画
- **即时反馈** - 所有操作都有即时反馈
- **直观控制** - 简单易懂的操作方式

### 音效设计
- **沉浸式体验** - 3D 音效空间感
- **真实感** - 基于物理的音效生成
- **层次丰富** - 多种音效层次叠加
- **性能优化** - 高效的音频处理

## 🌟 核心功能

### 射击引擎
- **状态管理** - React Hooks 状态管理
- **事件处理** - 鼠标事件和键盘事件
- **动画系统** - Framer Motion 动画引擎
- **音效引擎** - Web Audio API 音效系统

### 国际化
- **多语言支持** - 中英文完整翻译
- **动态切换** - 实时语言切换
- **本地化** - 文化适应性设计

### 性能优化
- **代码分割** - 按需加载组件
- **图片优化** - Next.js 图片优化
- **字体优化** - 中文字体优化
- **音效优化** - 音频资源优化

## 🔧 开发指南

### 添加新音效
1. 在 `lib/audioGenerator.ts` 中添加新的音效生成方法
2. 在 `lib/soundEffects.ts` 中添加播放方法
3. 在组件中调用相应的音效方法

### 添加新博客页面
1. 在 `app/` 目录下创建新的页面文件
2. 在 `lib/translations.json` 中添加对应的翻译
3. 更新导航和路由配置

### 添加新语言
1. 在 `lib/translations.json` 中添加新的语言对象
2. 在 `components/LanguageSwitcher.tsx` 中添加语言选项
3. 创建对应的页面路由

### 自定义样式
1. 修改 `app/globals.css` 中的全局样式
2. 使用 Tailwind CSS 类名进行样式定制
3. 在组件中使用 CSS Modules 或 styled-components

## 🚀 部署

### Vercel 部署（推荐）
```bash
npm run build
# 然后部署到 Vercel
```

### 其他平台
- **Netlify** - 支持 Next.js 部署
- **AWS Amplify** - 云平台部署
- **Docker** - 容器化部署

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

### 代码规范
- 使用 TypeScript
- 遵循 ESLint 规则
- 添加适当的注释
- 编写测试用例

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- **Next.js** - 优秀的 React 框架
- **Framer Motion** - 流畅的动画库
- **Tailwind CSS** - 实用的 CSS 框架
- **Web Audio API** - 强大的音频处理能力

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues]
- 💬 Discussions: [GitHub Discussions]

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
