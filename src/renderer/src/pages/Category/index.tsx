import './category.scss'
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { AddFour, AllApplication, DatabaseSetting, FolderCode } from '@icon-park/react'
import { useEffect } from 'react'

export function Category() {
  const categories = useLoaderData() as CategoryType[]
  const navigate = useNavigate()
  // useEffect(() => {
  //   if (categories.length) {
  //     navigate(`/config/category/contentList/${categories[0].id}`)
  //   }
  // }, [categories])
  return (
    <main className="category-page">
      <div className="categories">
        <div className="px-2 mt-2 opacity-90 mb-1">快捷操作</div>
        <NavLink to={`/config/category/contentList`} end className="font-bold">
          <div className="flex items-center gap-1">
            <AllApplication theme="outline" size="14" strokeWidth={3} />
            <div className="truncate">所有片段</div>
          </div>
        </NavLink>

        {categories.map((category) => (
          <NavLink
            to={`/config/category/contentList/${category.id}`}
            key={category.id}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <div className="flex items-center gap-1">
              <FolderCode theme="outline" size="14" strokeWidth={3} />
              <div className="truncate">{category.name}</div>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="nav">
        <AddFour theme="outline" size="20" fill="#34495e" strokeWidth={2} />
        <DatabaseSetting theme="outline" size="20" fill="#34495e" strokeWidth={2} />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  )
}
