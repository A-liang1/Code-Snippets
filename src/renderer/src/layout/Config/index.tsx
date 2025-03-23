import { Outlet } from 'react-router-dom'
// import styles from './styles.module.scss'

// 右键菜单
import { MantineProvider } from '@mantine/core'
import { ContextMenuProvider } from 'mantine-contextmenu'

import '@mantine/core/styles.layer.css'
import 'mantine-contextmenu/styles.layer.css'

export default function Config() {
  return (
    <main>
      <MantineProvider defaultColorScheme="auto">
        <ContextMenuProvider>
          <Outlet />{' '}
        </ContextMenuProvider>
      </MantineProvider>
    </main>
  )
}
