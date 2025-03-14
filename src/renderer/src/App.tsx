import Search from './components/Search'
import Result from './components/Result'
import { CodeProvider } from './context/codeContext'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

// <StyleSheetManager shouldForwardProp={...}>
function App(): JSX.Element {
  return (
    <>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <CodeProvider>
          <Search></Search>
          <Result></Result>
        </CodeProvider>
      </StyleSheetManager>
    </>
  )
}

export default App
