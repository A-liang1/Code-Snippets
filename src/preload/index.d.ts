import { ElectronAPI } from '@electron-toolkit/preload'
import { initTable } from '../main/db/tables'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      hideWindow: () => void
      shortCut: (type: 'search', shortCut?: string) => Promise<boolean>
      setIgnoreMouseEvents: (ignore: boolean, options?: { forward: boolean }) => void
      openConfigWindow: () => void
      sql: <T>(sql: string, type: SqlActionType, params?: Record<string, any>) => Promise<T>
      openWindow: (name: WindowNameType) => void
      closeWindow: (name: WindowNameType) => void
      selectDatabaseDirectory: () => Promise<string>
      setDatabaseDirectory: (path: string) => void
      initTable: () => void
    }
  }
}
