import { Outlet } from 'react-router-dom'
import './category.scss'
import { AddFour, DatabaseSetting } from '@icon-park/react'

export function Category() {
  return (
    <main className="category-page">
      <div className="categories">categories</div>
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
