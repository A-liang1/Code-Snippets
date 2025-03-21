import './category.scss'
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { AddFour, DatabaseSetting } from '@icon-park/react'
import { useEffect } from 'react'

export function Category() {
  const categories = useLoaderData() as CategoryType[]
  const navigate = useNavigate()
  useEffect(() => {
    if (categories.length) {
      navigate(`/config/category/contentList/${categories[0].id}`)
    }
  }, [])
  return (
    <main className="category-page">
      <div className="categories">
        {categories.map((category) => (
          <NavLink
            to={`/config/category/contentList/${category.id}`}
            key={category.id}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {category.name}
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
