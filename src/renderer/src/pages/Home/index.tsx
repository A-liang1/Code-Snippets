import Search from '@renderer/components/Search'
import Result from '@renderer/components/Result'
// import { CodeProvider } from '@renderer/context/codeContext'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import useShortCut from '@renderer/hooks/useShortCut'
import Error from '@renderer/components/Error'
import { MutableRefObject, useEffect, useRef } from 'react'
import useignoreMouseEvents from '@renderer/hooks/useignoreMouseEvents'
import { applyThemeToCSS, useThemeStore } from '@renderer/store/themeStore'

// <StyleSheetManager shouldForwardProp={...}>
function Home(): JSX.Element {
  const { themeType } = useThemeStore()

  const mainRef = useRef<HTMLDivElement | null>(null)

  const { setIgnoreMouseEvents } = useignoreMouseEvents()

  useEffect(() => {
    applyThemeToCSS(themeType)
    setIgnoreMouseEvents(mainRef as MutableRefObject<HTMLDivElement>)
    // window.api.openConfigWindow()
  }, [themeType])

  const { register } = useShortCut()
  register('search', 'CommandOrControl+Shift+;')

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
