import { SettingOne } from '@icon-park/react'
import useSearch from '@renderer/hooks/useSearch'
import { useThemeStore } from '@renderer/store/themeStore'
import { Input, Dropdown, Button } from 'antd'
import type { MenuProps } from 'antd'

export default function Search() {
  const { search, handleSearch } = useSearch()
  const { toggleTheme } = useThemeStore()

  const openConfigWindow = () => {
    window.api.openConfigWindow()
    // window.api
    //   .sql(`insert into categories (name,created_at) values('react19',datetime())`, 'insert')
    //   .then((rows) => {
    //     console.log(rows)
    //   })
    //   .catch((error) => {
    //     console.warn(error)
    //   })
  }

  const items: MenuProps['items'] = [
    {
      key: 'toggle',
      label: '切换主题',
      onClick: toggleTheme
    },
    {
      key: 'config',
      label: '设置',
      onClick: openConfigWindow
    }
  ]

  return (
    <main className="p-2 rounded-lg drag" style={{ backgroundColor: 'var(--background)' }}>
      <section className="p-2 rounded-lg flex items-center gap-1 nodrag">
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          trigger={['click']}
          getPopupContainer={(trigger) => trigger.parentElement || document.body}
        >
          <Button
            type="text"
            className="p-0 flex items-center justify-center"
            style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
          >
            <SettingOne
              theme="outline"
              size="24"
              fill="#34495e"
              strokeWidth={4}
              className="cursor-pointer"
            />
          </Button>
        </Dropdown>
        <Input
          value={search}
          onChange={handleSearch}
          autoFocus
          className="w-full outline-none text-base rounded-md p-1"
          style={{
            color: 'var(--inputText)',
            backgroundColor: 'var(--inputBackground)'
          }}
        />
      </section>
      {/* <section className="text-center text-red-500 text-sm">代码片段</section> */}
    </main>
  )
}
