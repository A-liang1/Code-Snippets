import { codes } from '@renderer/data'
import useCode from '@renderer/hooks/useCode'
import { ChangeEvent, useState } from 'react'

export default function Search() {
  const { setData } = useCode()
  const [search, setSearch] = useState('')
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value

    setSearch(e.target.value)
    setData(
      codes.filter((code) => code.content.toLowerCase().includes(content.toLowerCase() || '@@@@@'))
    )
  }
  return (
    <main className="bg-slate-50 p-2 rounded-lg drag">
      <section className="bg-slate-100 p-2 rounded-lg">
        <input
          value={search}
          onChange={handleSearch}
          className="w-full outline-none text-2xl text-slate-600 bg-slate-200"
        />
      </section>
      <section className="text-center text-slate-600 text-xs mt-1">代码片段</section>
    </main>
  )
}
