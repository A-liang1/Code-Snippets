import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

ipcMain.on('hideWindow', (event: IpcMainEvent) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) win.hide()
})
