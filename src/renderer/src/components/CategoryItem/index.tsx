import { DeleteOne, FolderCode } from '@icon-park/react'
import { NavLink, useFetcher, useSubmit } from 'react-router-dom'
import styles from './styles.module.scss'
import { useContextMenu } from 'mantine-contextmenu'
import { useStore } from '@renderer/store/useStore'

interface Props {
  category: CategoryType
}

export const CategoryItem = ({ category }: Props) => {
  const editCategoryId = useStore((state) => state.editCategoryId)
  const setEditCategoryId = useStore((state) => state.setEditCategoryId)

  // const submit = useSubmit()
  const fether = useFetcher()
  const { showContextMenu } = useContextMenu()

  const linkStyle = (isActive: boolean) => (isActive ? styles.active : styles.link)

  return (
    <>
      {editCategoryId == category.id ? (
        <div className={styles.input}>
          <input
            autoFocus
            defaultValue={category.name}
            name="name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fether.submit({ id: category.id, name: e.currentTarget.value }, { method: 'PUT' })
                setEditCategoryId(0)
              }
            }}
          />
        </div>
      ) : (
        <NavLink
          onDoubleClick={() => setEditCategoryId(category.id)}
          to={`/config/category/contentList/${category.id}`}
          key={category.id}
          className={({ isActive }) => linkStyle(isActive)}
          onContextMenu={showContextMenu(
            [
              {
                key: 'remove',
                title: '删除分类',
                icon: <DeleteOne theme="outline" size="18" strokeWidth={3} />,
                onClick: () => {
                  submit({ id: category.id }, { method: 'DELETE' })
                }
              }
            ],
            { className: 'contextMenu' }
          )}
        >
          <div className="flex items-center gap-1">
            <FolderCode theme="outline" size="14" strokeWidth={3} />
            <div className="truncate">{category.name}</div>
          </div>
        </NavLink>
      )}
    </>
  )
}
