import Search from './components/Search'
import Result from './components/Result'
import { codeContext } from './context/codeContext'
import { useState } from 'react'
import { DataType } from './data'

function App(): JSX.Element {
  const [data, setData] = useState<DataType[]>([])
  return (
    <>
      <codeContext.Provider value={{ data, setData }}>
        <Search></Search>
        <Result></Result>
      </codeContext.Provider>
    </>
  )
}

export default App
