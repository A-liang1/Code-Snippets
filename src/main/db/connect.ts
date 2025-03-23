// npm install --save-dev electron-rebuild
// npx electron-rebuild
import Database, * as BetterSqlite3 from 'better-sqlite3'
import { app } from 'electron'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import config from './config'
const db = (): BetterSqlite3.Database => {
  let dir = resolve(app.getPath('home'), 'Desktop')
  if (config.databaseDirectory && existsSync(config.databaseDirectory)) {
    dir = config.databaseDirectory
  }
  console.log(dir)
  const db: BetterSqlite3.Database = new Database(dir + '/hd.db', {})
  db.pragma('journal_mode = WAL')
  return db
}
export { db }
