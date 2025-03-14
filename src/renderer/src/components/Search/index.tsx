import useSearch from '@renderer/hooks/useSearch'

export default function Search() {
  const { search, handleSearch } = useSearch()
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
