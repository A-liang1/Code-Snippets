import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import './content.scss'
import { Button } from 'antd'

export function Content() {
  const { content, title, id } = useLoaderData() as ContentType
  const submit = useSubmit()
  return (
    <Form method="PUT">
      <main className="content-page" key={id}>
        <input name="title" defaultValue={title} onChange={(e) => submit(e.target.form)} />
        <textarea name="content" defaultValue={content} onChange={(e) => submit(e.target.form)} />
        <div className="border-t flex items-center justify-center">
          {/* <Button type="default">保存</Button> */}
          {/* <button>保存</button> */}
        </div>
      </main>
    </Form>
  )
}
