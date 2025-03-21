import { NavLink, Outlet, useLoaderData } from 'react-router-dom'
import './contentList.scss'

export function ContentList() {
  const contents = useLoaderData() as ContentType[]
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
