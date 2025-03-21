import { BrowserWindow, shell, screen } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import url from 'node:url'

export function createWindow(): BrowserWindow {
  const { width: winWidth } = screen.getPrimaryDisplay().workAreaSize
  const width = 800
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width,
    height: 700,
    x: -800,
    y: 50,
    show: false,
    frame: true,
    transparent: false,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // 打开调试窗口
  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#config/category')
  } else {
    mainWindow.loadURL(
      url.format({
        // 编译后的文件
        pathname: join(__dirname, '../renderer/index.html'),
        // 协议
        protocol: 'file',
        // protocol 后面需要两个 /
        slashes: true,
        // hash 的值
        hash: 'config/category'
      })
    )
  }

  return mainWindow
}
