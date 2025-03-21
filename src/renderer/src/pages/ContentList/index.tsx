import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import './contentList.scss'
import { useEffect } from 'react'

export function ContentList() {
  const contents = useLoaderData() as ContentType[]
  const navigate = useNavigate()
  useEffect(() => {
    if (contents.length) {
      const content = contents[0]
      navigate(`/config/category/contentList/${content.category_id}/content/${content.id}`)
    }
  }, [])
  return (
    <main className="contentList-page">
      <div className="list">
        {contents.map((content) => (
          <NavLink
            to={`/config/category/contentList/${content.category_id}/content/${content.id}`}
            key={content.id}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {content.title}
          </NavLink>
        ))}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  )
}
