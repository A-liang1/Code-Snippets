import { app, BrowserWindow, globalShortcut, ipcMain, IpcMainInvokeEvent } from 'electron'
import { getWindowByName } from './windows'

const config = {
  search: ''
}

// export const registerShortCut = (win: BrowserWindow) => {
// 注册一个快捷键监听器
ipcMain.handle('shortCut', (_event: IpcMainInvokeEvent, type: 'search', shortCut: string) => {
  if (config.search) globalShortcut.unregister(config.search)
  config.search = shortCut

  switch (type) {
    case 'search':
      return registerSearchShortCut(getWindowByName('search'), shortCut)
  }
})
// }
// 注册搜索的快捷键
function registerSearchShortCut(win: BrowserWindow, shortCut: string) {
  return globalShortcut.register(shortCut, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    win.isVisible() ? win.hide() : win.show()
  })

  // if (!ret) dialog.showErrorBox('温馨提示', '快捷键注册失败')
}

app.on('will-quit', () => {
  // globalShortcut.unregister('CommandOrControl+Shift+;')
  globalShortcut.unregisterAll()
})
