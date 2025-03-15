import Search from './components/Search'
import Result from './components/Result'
// import { CodeProvider } from './context/codeContext'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import useShortCut from './hooks/useShortCut'
import Error from './components/Error'
import { MutableRefObject, useEffect, useRef } from 'react'
import useignoreMouseEvents from './hooks/useignoreMouseEvents'

// <StyleSheetManager shouldForwardProp={...}>
function App(): JSX.Element {
  const mainRef = useRef<HTMLDivElement | null>(null)

  const { setIgnoreMouseEvents } = useignoreMouseEvents()

  useEffect(() => {
    setIgnoreMouseEvents(mainRef as MutableRefObject<HTMLDivElement>)
  }, [])

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

export default App
