import { Outlet, useLoaderData } from 'react-router-dom'
import './contentList.scss'

import { ContentSearch } from '@renderer/components/ContentSearch'
import { ContentListItem } from '@renderer/components/ContentListItem'

export function ContentList() {
  const contents = useLoaderData() as ContentType[]

  return (
    <main className="contentList-page">
      <div className="list">
        <ContentSearch />

        {contents.map((content) => (
          <ContentListItem content={content} key={content.id} />
        ))}
      </div>

      <div className="content">
        <Outlet />
      </div>
    </main>
  )
}
