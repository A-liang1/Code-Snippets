import { FolderCode } from '@icon-park/react'
import { NavLink, useFetcher } from 'react-router-dom'
import styles from './styles.module.scss'
import { useStore } from '@renderer/store/useStore'
import useCategory from '@renderer/hooks/useCategory'

interface Props {
  category: CategoryType
}

export const CategoryItem = ({ category }: Props) => {
  const editCategoryId = useStore((state) => state.editCategoryId)
  const setEditCategoryId = useStore((state) => state.setEditCategoryId)

  const { onContextMenu, dragHandle } = useCategory(category)
  const fether = useFetcher()

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
          to={`/config/category/contentList/${category.id}`}
          key={category.id}
          data-category-id={category.id}
          className={({ isActive }) => linkStyle(isActive)}
          onDoubleClick={() => setEditCategoryId(category.id)}
          onContextMenu={onContextMenu()}
          {...dragHandle}
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
