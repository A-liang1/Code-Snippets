import { Newlybuild } from '@icon-park/react'
import { Form, useSubmit } from 'react-router-dom'

export const ContentSearch = () => {
  const submit = useSubmit()

  return (
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
            submit(null, { method: 'POST' })
          }}
        />
      </div>
    </Form>
  )
}
