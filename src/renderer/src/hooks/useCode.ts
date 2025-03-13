import { codeContext } from '@renderer/context/codeContext'
import { useContext } from 'react'

export default () => {
  const context = useContext(codeContext)
  if (!context?.data) {
    throw new Error('CodeContext.provider 定义错误')
  }
  return { ...context }
}
