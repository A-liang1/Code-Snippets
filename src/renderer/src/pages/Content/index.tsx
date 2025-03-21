import { useLoaderData } from 'react-router-dom'
import './content.scss'

export function Content() {
  const { content, title } = useLoaderData() as ContentType
  return (
    <main className="content-page">
      <h1>{title}</h1>
      <div className="content">{content}</div>
    </main>
  )
}
