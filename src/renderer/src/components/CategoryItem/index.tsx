import { FolderCode } from '@icon-park/react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

interface Props {
  category: CategoryType
}

export const CategoryItem = ({ category }: Props) => {
  const linkStyle = (isActive: boolean) => (isActive ? styles.active : styles.link)

  return (
    <NavLink
      to={`/config/category/contentList/${category.id}`}
      key={category.id}
      className={({ isActive }) => linkStyle(isActive)}
    >
      <div className="flex items-center gap-1">
        <FolderCode theme="outline" size="14" strokeWidth={3} />
        <div className="truncate">{category.name}</div>
      </div>
    </NavLink>
  )
}
