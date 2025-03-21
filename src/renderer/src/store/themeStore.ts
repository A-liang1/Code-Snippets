import { create } from 'zustand'

// 创建一个接口来模拟 Store
interface StoreInterface {
  get: (key: string) => unknown
  set: (key: string, value: unknown) => void
}

// 定义主题的类型
interface Theme {
  background: string
  inputText: string
  inputBackground: string
  searchBackground: string
  searchText: string
  searchSelectionBg: string
  searchSelectionText: string
}

// 主题类型，只保留三种主题
export type ThemeType = 'light' | 'dark' | 'pink'

const defaultTheme: Theme = {
  background: '#1a1b1e',
  inputText: '#e6e6e6',
  inputBackground: '#242424',
  searchBackground: '#2d2d2d',
  searchText: '#adb5bd',
  searchSelectionBg: '#3d4d6b',
  searchSelectionText: '#ffffff'
}

const themes: Record<ThemeType, Theme> = {
  light: {
    background: '#f8f9fa',
    inputText: '#2d3436',
    inputBackground: '#ffffff',
    searchBackground: '#e9ecef',
    searchText: '#495057',
    searchSelectionBg: '#4dabf7',
    searchSelectionText: '#ffffff'
  },
  dark: defaultTheme,
  pink: {
    background: '#ffebf2',
    inputText: '#333333',
    inputBackground: '#fff0f5',
    searchBackground: '#fff0f5',
    searchText: '#4b0022',
    searchSelectionBg: '#ff80ab',
    searchSelectionText: '#ffffff'
  }
}

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
    cachedThemeType = 'light'
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
  theme: Theme
  themeType: ThemeType
  setTheme: (themeType: ThemeType) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  // 初始化时从本地存储获取主题类型
  themeType: store.get('themeType') as ThemeType,
  // 使用预定义主题
  theme: themes[store.get('themeType') as ThemeType] || themes.light,

  setTheme: (themeType: ThemeType) => {
    const theme = themes[themeType]

    // 更新本地存储
    store.set('themeType', themeType)

    // 更新状态
    set({ themeType, theme })
    applyThemeToCSS(theme)
  },

  toggleTheme: () => {
    const { themeType } = get()
    const themeTypes: ThemeType[] = ['light', 'dark', 'pink']
    const currentIndex = themeTypes.indexOf(themeType)
    const nextIndex = (currentIndex + 1) % themeTypes.length
    get().setTheme(themeTypes[nextIndex])
  }
}))

export const applyThemeToCSS = (theme: Theme) => {
  const root = document.documentElement
  root.style.transition = 'all 0.5s ease' // 添加过渡效果，缩短过渡时间
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value)
  })
  setTimeout(() => (root.style.transition = ''), 500) // 清除过渡，缩短时间
}
