import { useContextMenu } from 'mantine-contextmenu'
import { DeleteOne } from '@icon-park/react'
import { useSubmit } from 'react-router-dom'
import styles from './styles.module.scss'
import useContent from '../useContent'
import { DragEvent } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export default (category: CategoryType) => {
  const submit = useSubmit()
  const { showContextMenu } = useContextMenu()
  const { updateContentCategory } = useContent()

  const onContextMenu = () => {
    return showContextMenu(
      [
        {
          key: 'remove',
          title: '删除分类',
          icon: <DeleteOne theme="outline" size="18" strokeWidth={3} />,
          onClick: () => submit({ id: category.id }, { method: 'DELETE' })
        }
      ],
      { className: 'contextMenu' }
    )
  }

  const dragHandle = {
    onDragOver: (e: DragEvent) => {
      // const categoryId = e.currentTarget.getAttribute('data-category-id')
      e.preventDefault()
      e!.dataTransfer!.dropEffect = 'move'
      const el = e.currentTarget as HTMLDivElement
      el.classList.add(styles.draging)
    },
    onDragLeave: (e: DragEvent) => {
      const el = e.currentTarget as HTMLDivElement
      el.classList.remove(styles.draging)
    },
    onDrop: (e: DragEvent) => {
      const el = e.currentTarget as HTMLDivElement
      el.classList.remove(styles.draging)
      const id = e!.dataTransfer!.getData('id')
      updateContentCategory(Number(id), category.id)
    }
  }
  return { onContextMenu, dragHandle }
}
