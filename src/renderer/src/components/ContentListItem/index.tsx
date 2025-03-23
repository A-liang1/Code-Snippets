import { DeleteOne } from '@icon-park/react'
import dayjs from 'dayjs'
import { NavLink, useSubmit } from 'react-router-dom'
import { useContextMenu } from 'mantine-contextmenu'
import styles from './styles.module.scss'

interface Props {
  content: ContentType
}

export const ContentListItem = ({ content }: Props) => {
  const submit = useSubmit()
  const { showContextMenu } = useContextMenu()

  const linkStyle = (isActive: boolean) => (isActive ? styles.active : styles.link)

  return (
    <NavLink
      to={`/config/category/contentList/${content.category_id}/content/${content.id}`}
      key={content.id}
      className={({ isActive }) => linkStyle(isActive)}
      onDragStart={(e) => {
        e.dataTransfer.setData('id', String(content.id))
        console.log(content.id)
      }}
      onContextMenu={showContextMenu(
        [
          {
            key: 'remove',
            title: '删除片段',
            icon: <DeleteOne theme="outline" size="18" strokeWidth={3} />,
            onClick: () => {
              submit({ id: content.id }, { method: 'DELETE' })
            }
          }
        ],
        { className: 'contextMenu' }
      )}
    >
      <div className="truncate">{content.title}</div>
      <div className="text-xs placeholder-opacity-80">
        {dayjs(content.created_at).format('YY/MM/DD')}
      </div>
    </NavLink>
  )
}
