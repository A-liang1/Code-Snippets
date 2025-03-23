import Search from '@renderer/components/Search'
import Result from '@renderer/components/Result'
// import { CodeProvider } from '@renderer/context/codeContext'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import Error from '@renderer/components/Error'
import { MutableRefObject, useEffect, useRef } from 'react'
import useignoreMouseEvents from '@renderer/hooks/useignoreMouseEvents'
import { applyThemeToCSS, useThemeStore } from '@renderer/store/themeStore'
import { useStore } from '@renderer/store/useStore'

// <StyleSheetManager shouldForwardProp={...}>
function Home(): JSX.Element {
  const { themeType } = useThemeStore()
  const config = useStore((state) => state.config)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const { setIgnoreMouseEvents } = useignoreMouseEvents()

  window.api.shortCut('search', config.shortCut)
  window.api.setDatabaseDirectory(config.databaseDirectory)
  window.api.initTable()
  useEffect(() => {
    applyThemeToCSS(themeType)
    setIgnoreMouseEvents(mainRef as MutableRefObject<HTMLDivElement>)
  }, [themeType])

  return (
    <>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <main className="relative p-3 " ref={mainRef}>
          <Error />
          {/* <CodeProvider> */}
          <Search></Search>
          <Result></Result>
          {/* </CodeProvider> */}
        </main>
      </StyleSheetManager>
    </>
  )
}

export default Home
