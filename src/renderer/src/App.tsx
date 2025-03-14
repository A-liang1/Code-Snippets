import Search from './components/Search'
import Result from './components/Result'
import { codeContext } from './context/codeContext'
import { useState } from 'react'
import { DataType } from './data'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

// <StyleSheetManager shouldForwardProp={...}>
function App(): JSX.Element {
  const [data, setData] = useState<DataType[]>([])
  return (
    <>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <codeContext.Provider value={{ data, setData }}>
          <Search></Search>
          <Result></Result>
        </codeContext.Provider>
      </StyleSheetManager>
    </>
  )
}

export default App
