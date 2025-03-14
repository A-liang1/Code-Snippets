import { useCallback, useEffect, useState } from 'react'
import useCode from './useCode'

export default () => {
  const { data } = useCode()
  // const [currentIndex, setCurrentIndex] = useState(0)
  const [id, setId] = useState(0)
  const handleKeyEvent = useCallback(
    (e: KeyboardEvent) => {
      if (data.length === 0) return
      console.log(e.code)
      switch (e.code) {
        case 'ArrowUp':
          setId((id) => {
            const index = data.findIndex((item) => item.id === id)
            return data[index - 1]?.id || data[data.length - 1].id
          })
          // setCurrentIndex((pre) => (pre - 1 < 0 ? data.length - 1 : pre - 1))
          break
        case 'ArrowDown':
          setId((id) => {
            const index = data.findIndex((item) => item.id === id)
            return data[index + 1]?.id || data[0].id
          })
          // setCurrentIndex((pre) => (pre + 1 > data.length - 1 ? 0 : pre + 1))
          break
        case 'Enter': {
          const content = data.find((item) => item.id === id)?.content
          console.log(content)
          if (content) navigator.clipboard.writeText(content)
        }
      }
    },
    [data, id]
  )
  // 为什么放到useEffect中？因为每次触发这个事件，意味着data数据发生了改变，
  // 则会引起组件重新渲染，组件中的内容重新执行一次，然后有定义了一个keydown事件
  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent)

    return () => {
      document.removeEventListener('keydown', handleKeyEvent)
    }
    // 闭包，这个函数一直不回发生改变，都是那唯一的一个函数，
    // 那么函数中用到外层的数据就会形成一个作用域，数据会保留
  }, [handleKeyEvent])
  useEffect(() => setId(0), [data])

  return { data, id }
}
