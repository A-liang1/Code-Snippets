// import useCode from './useCode'
import { ChangeEvent } from 'react'
import { useStore } from '@renderer/store/useStore'

export default () => {
  // const { setData } = useCode() Provider
  // 全局状态
  const setData = useStore((state) => state.setData)
  const search = useStore((state) => state.search)
  const setSearch = useStore((state) => state.setSearch)

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    const data: ContentType[] = await window.api.sql(
      `select * from contents where title like @content limit 6`,
      'findAll',
      { content: `%${e.target.value}%` }
    )
    if (e.target.value === '') setData([])
    else setData(data)
  }
  return { search, handleSearch }
}
