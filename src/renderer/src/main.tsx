import React from 'react'
import ReactDOM from 'react-dom/client'
import '@renderer/assets/tailwind.css'
import '@renderer/assets/global.scss'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { applyThemeToCSS } from './store/themeStore'

// 确保在应用加载时应用正确的主题
const storedThemeType = localStorage.getItem('themeType')
if (storedThemeType) {
  try {
    const themeType = JSON.parse(storedThemeType)
    applyThemeToCSS(themeType)
  } catch {
    applyThemeToCSS('pink') // 默认主题
  }
} else {
  applyThemeToCSS('pink') // 默认主题
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
