import { DataType } from '@renderer/data'
import { createContext, SetStateAction, Dispatch, useState } from 'react'

interface ContextProps {
  data: DataType[]
  setData: Dispatch<SetStateAction<DataType[]>>
}

export const codeContext = createContext<ContextProps | undefined>(undefined)

export const CodeProvider = ({ children }) => {
  const [data, setData] = useState<DataType[]>([])

  return <codeContext.Provider value={{ data, setData }}>{children}</codeContext.Provider>
}
