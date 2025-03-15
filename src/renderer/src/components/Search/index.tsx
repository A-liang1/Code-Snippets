import { SettingOne } from '@icon-park/react'
import useSearch from '@renderer/hooks/useSearch'
import { Input } from 'antd'

export default function Search() {
  const { search, handleSearch } = useSearch()

  return (
    <main className="bg-slate-50 p-2 rounded-lg drag">
      <section className="bg-slate-200 p-2 rounded-lg flex items-center gap-1 nodrag">
        <SettingOne
          theme="outline"
          size="24"
          fill="#34495e"
          strokeWidth={4}
          className="cursor-pointer"
          onClick={() => alert('显示配置页')}
        />
        <Input
          value={search}
          onChange={handleSearch}
          autoFocus
          className="w-full outline-none text-base text-slate-600 bg-slate-300 rounded-md p-1"
        />
      </section>
      <section className="text-center text-red-500 text-sm">代码片段</section>
    </main>
  )
}
