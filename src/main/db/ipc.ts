import * as query from './query'
import { IpcMainInvokeEvent } from 'electron/main'
import { dialog, ipcMain, IpcMainEvent } from 'electron'
import config from './config'
import { initTable } from './tables'

ipcMain.handle(
  'sql',
  (_event: IpcMainInvokeEvent, sql: string, type: SqlActionType, params = {}) => {
    return query[type](sql, params)
  }
)

ipcMain.handle('selectDatabaseDirectory', async () => {
  const res = await dialog.showOpenDialog({
    title: '选择目录',
    properties: ['openDirectory', 'createDirectory']
  })
  return res.canceled ? '' : res.filePaths[0]
})

ipcMain.on('setDatabaseDirectory', (_event: IpcMainEvent, path: string) => {
  config.databaseDirectory = path
})

ipcMain.on('initTable', () => {
  initTable()
})
