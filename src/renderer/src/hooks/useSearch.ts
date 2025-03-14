// import useCode from './useCode'
import { ChangeEvent } from 'react'
import { codes } from '@renderer/data'
import { useStore } from '@renderer/store/useStore'

export default () => {
  // const { setData } = useCode() Provider
  // 全局状态
  const setData = useStore((state) => state.setData)
  const search = useStore((state) => state.search)
  const setSearch = useStore((state) => state.setSearch)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value

    setSearch(e.target.value)
    setData(
      codes.filter((code) => code.content.toLowerCase().includes(content.toLowerCase() || '@@@@@'))
    )
  }
  return { search, handleSearch }
}
