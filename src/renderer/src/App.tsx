import Search from './components/Search'
import Result from './components/Result'
// import { CodeProvider } from './context/codeContext'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import useShortCut from './hooks/useShortCut'
import Error from './components/Error'

// <StyleSheetManager shouldForwardProp={...}>
function App(): JSX.Element {
  const { register } = useShortCut()
  register('search', 'CommandOrControl+Shift+;')

  return (
    <>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <main className="relative">
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
