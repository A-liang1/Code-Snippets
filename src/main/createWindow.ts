import { BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import url from 'node:url'

export interface OptionsType extends Partial<BrowserWindowConstructorOptions> {
  openDevTools?: boolean
  hash?: string
  initShow?: boolean
}

export function createWindow(options: OptionsType): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow(
    Object.assign(
      {
        width: 400,
        height: 400,
        x: 500,
        y: 350,
        show: false,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      },
      options
    )
  )

  // 忽略鼠标事件
  // mainWindow.setIgnoreMouseEvents(true, { forward: true })
  // 打开调试窗口
  if (is.dev && options.openDevTools) mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    options.initShow && mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + options.hash)
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
        hash: 'config/category/contentList'
      })
    )
  }

  return mainWindow
}
