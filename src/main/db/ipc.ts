import * as query from './query'
import { IpcMainInvokeEvent } from 'electron/main'
import { ipcMain } from 'electron'

ipcMain.handle(
  'sql',
  (_event: IpcMainInvokeEvent, sql: string, type: SqlActionType, params = {}) => {
    return query[type](sql, params)
  }
)
