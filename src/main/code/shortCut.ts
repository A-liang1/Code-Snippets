import { app, BrowserWindow, dialog, globalShortcut } from 'electron'

export const registerShortCut = (win: BrowserWindow) => {
  app.whenReady().then(() => {
    // 注册一个快捷键监听器
    const ret = globalShortcut.register('CommandOrControl+Shift+;', () => {
      win.show()
      // console.log('CommandOrControl+X is pressed')
    })

    if (!ret) {
      dialog.showErrorBox('温馨提示', '快捷键注册失败')
      console.log('registration failed')
    }

    console.log(globalShortcut.isRegistered('CommandOrControl+Shift+;'))
  })

  app.on('will-quit', () => {
    // globalShortcut.unregister('CommandOrControl+Shift+;')
    globalShortcut.unregisterAll()
  })
}
