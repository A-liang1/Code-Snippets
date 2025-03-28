import { app, dialog, globalShortcut, ipcMain, IpcMainInvokeEvent } from 'electron'
import { getWindowByName } from './windows'

// 注册一个快捷键监听器
ipcMain.handle('shortCut', (_event: IpcMainInvokeEvent, type: 'search', shortCut?: string) => {
  switch (type) {
    case 'search':
      return registerSearchShortCut(shortCut)
  }
})

function registerSearchShortCut(shortCut) {
  // 注册搜索的快捷键
  globalShortcut.unregisterAll()
  if (shortCut && globalShortcut.isRegistered(shortCut)) {
    dialog.showErrorBox('温馨提示', '快捷键注册失败，请检查快捷键是否已被占用!')
    return false
  }

  const win = getWindowByName('search')
  return globalShortcut.register(shortCut, () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    win.isVisible() ? win.hide() : win.show()
  })
}

app.on('will-quit', () => {
  // globalShortcut.unregister('CommandOrControl+Shift+;')
  globalShortcut.unregisterAll()
})
