import ReactDOM from 'react-dom/client'
import '@renderer/assets/tailwind.css'
import '@renderer/assets/global.scss'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { applyThemeToCSS } from './store/themeStore'

// 初始化主题
const storedThemeType = localStorage.getItem('themeType')
if (storedThemeType) {
  try {
    const themeType = JSON.parse(storedThemeType)
    applyThemeToCSS(themeType)
  } catch {
    applyThemeToCSS('pink')
  }
} else {
  applyThemeToCSS('pink')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
