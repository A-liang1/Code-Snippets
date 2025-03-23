import { create } from 'zustand'

// 创建一个接口来模拟 Store
interface StoreInterface {
  get: (key: string) => unknown
  set: (key: string, value: unknown) => void
}

// 主题类型，只保留三种主题
export type ThemeType = 'light' | 'dark' | 'pink'

// 创建一个本地临时缓存，用于在渲染进程缓存主题设置
// 这样可以避免频繁的 IPC 通信
let cachedThemeType: ThemeType = 'pink'

// 设置初始值 - 只使用localStorage
const storedThemeType = localStorage.getItem('themeType')
if (storedThemeType) {
  try {
    const parsedThemeType = JSON.parse(storedThemeType) as ThemeType
    // 确保读取的主题类型是有效的
    if (parsedThemeType === 'light' || parsedThemeType === 'dark' || parsedThemeType === 'pink') {
      cachedThemeType = parsedThemeType
    }
  } catch {
    cachedThemeType = 'pink'
  }
}

// 创建本地存储接口
const store: StoreInterface = {
  get: (key: string) => {
    if (key === 'themeType') return cachedThemeType
    return null
  },
  set: (key: string, value: unknown) => {
    if (key === 'themeType') cachedThemeType = value as ThemeType

    // 只保存到localStorage
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// 定义状态的类型
interface ThemeStore {
  themeType: ThemeType
  setTheme: (themeType: ThemeType) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  // 初始化时从本地存储获取主题类型
  themeType: store.get('themeType') as ThemeType,

  setTheme: (themeType: ThemeType) => {
    // 更新本地存储
    store.set('themeType', themeType)

    // 更新状态
    set({ themeType })
    applyThemeToCSS(themeType)
  },

  toggleTheme: () => {
    const { themeType } = get()
    const themeTypes: ThemeType[] = ['light', 'dark', 'pink']
    const currentIndex = themeTypes.indexOf(themeType)
    const nextIndex = (currentIndex + 1) % themeTypes.length
    get().setTheme(themeTypes[nextIndex])
  }
}))

export const applyThemeToCSS = (themeType: ThemeType) => {
  const root = document.documentElement
  root.style.transition = 'all 0.5s ease' // 添加过渡效果，缩短过渡时间

  // 使用data-theme属性来切换主题
  root.setAttribute('data-theme', themeType)

  setTimeout(() => (root.style.transition = ''), 500) // 清除过渡，缩短时间
}

// 在导入模块时立即应用存储的主题
// 这样可以确保在组件挂载前就应用了正确的主题
const initialTheme = store.get('themeType') as ThemeType
applyThemeToCSS(initialTheme)
