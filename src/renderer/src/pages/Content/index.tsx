import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import './content.scss'

export function Content() {
  const { content, title, id } = useLoaderData() as ContentType
  const submit = useSubmit()
  return (
    <Form method="PUT">
      <main className="content-page" key={id}>
        <input
          autoFocus
          name="title"
          defaultValue={title}
          onChange={(e) => submit(e.target.form)}
        />
        <textarea
          name="content"
          placeholder="请输入内容..."
          defaultValue={content}
          onChange={(e) => submit(e.target.form)}
        />
        {/* <div className="border-t flex items-center justify-center"></div> */}
      </main>
    </Form>
  )
}
