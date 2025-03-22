import { Form, NavLink, Outlet, useLoaderData, useSubmit } from 'react-router-dom'
import './contentList.scss'
import dayjs from 'dayjs'
import { Newlybuild } from '@icon-park/react'

export function ContentList() {
  const contents = useLoaderData() as ContentType[]
  const submit = useSubmit()

  return (
    <main className="contentList-page">
      <div className="list">
        <Form>
          <div className="border-b px-3 flex justify-between items-center">
            <input
              type="text"
              name="searchWord"
              placeholder="搜索..."
              className="outline-none text-sm font-bold py-2  w-full"
              onChange={(e) => {
                submit(e.target.form)
              }}
            />

            <Newlybuild
              theme="outline"
              size="20"
              strokeWidth={3}
              fill="#34495e"
              onClick={() => {
                submit({ action: 'add' }, { method: 'POST' })
              }}
            />
          </div>
        </Form>

        {contents.map((content) => (
          <NavLink
            to={`/config/category/contentList/${content.category_id}/content/${content.id}`}
            key={content.id}
            className="flex justify-between items-center"
          >
            <div className="truncate">{content.title}</div>
            <div className="text-xs placeholder-opacity-80">
              {dayjs(content.created_at).format('YYYY/MM/DD')}
            </div>
          </NavLink>
        ))}
      </div>

      <div className="content">
        <Outlet />
      </div>
    </main>
  )
}
