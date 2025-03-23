import { Form } from 'react-router-dom'
import './styles.scss'
import { useState } from 'react'
import { useStore } from '@renderer/store/useStore'

export const Setting = () => {
  // config.content
  // const config = useLoaderData() as ConfigDataType
  const config = useStore((state) => state.config)
  const setConfig = useStore((state) => state.setConfig)
  const [keys, setKeys] = useState<string[]>([])
  return (
    <Form method="POST">
      <main className="setting-page">
        <h1>软件配置</h1>

        <section>
          <h5>快捷键定义</h5>
          <input
            type="text"
            name="shortCut"
            readOnly
            defaultValue={config.shortCut}
            onKeyDown={(e) => {
              if (e.metaKey || e.ctrlKey || e.altKey) {
                const code = e.code.replace(/Left|Right|Key|Digit/, '')
                if (keys.includes(code)) return
                keys.push(code)
                setKeys(keys)
                if (code.match(/^(\w|Space)$/gi)) {
                  e.currentTarget.value = keys.join('+')
                  setKeys([])
                  // submit(e.currentTarget.form, { method: 'POST' })
                  setConfig({ ...config, shortCut: e.currentTarget.value })
                  window.api.shortCut('search', e.currentTarget.value)
                }
              }
            }}
          />
        </section>

        <section>
          <h5>数据库</h5>
          <input
            type="text"
            name="databaseDirectory"
            readOnly
            defaultValue={config.databaseDirectory}
            onClick={async (e: any) => {
              const path = await window.api.selectDatabaseDirectory()
              setConfig({ ...config, databaseDirectory: path })
              e.target.value = path
              window.api.setDatabaseDirectory(config.databaseDirectory)
              window.api.initTable()
            }}
          />
        </section>
      </main>
    </Form>
  )
}
