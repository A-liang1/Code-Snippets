import { DataType } from '@renderer/data'
import { createContext, SetStateAction, Dispatch } from 'react'

interface ContextProps {
  data: DataType[]
  setData: Dispatch<SetStateAction<DataType[]>>
}

export const codeContext = createContext<ContextProps | undefined>(undefined)
