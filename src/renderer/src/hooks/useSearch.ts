import { ChangeEvent, useState } from 'react'
import useCode from './useCode'
import { codes } from '@renderer/data'

export default () => {
  const { setData } = useCode()
  const [search, setSearch] = useState('')
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value

    setSearch(e.target.value)
    setData(
      codes.filter((code) => code.content.toLowerCase().includes(content.toLowerCase() || '@@@@@'))
    )
  }
  return { search, handleSearch }
}
