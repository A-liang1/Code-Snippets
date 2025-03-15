// import useCode from './useCode'
import { useCallback, useEffect } from 'react'
import { useStore } from '@renderer/store/useStore'

export default () => {
  // const { data, setData } = useCode()
  // 全局状态
  const data = useStore((state) => state.data)
  const setData = useStore((state) => state.setData)
  const setSearch = useStore((state) => state.setSearch)
  const id = useStore((state) => state.id)
  const setId = useStore((state) => state.setId)
  // 这种情况如果只用页面只用了a，但是b改变了，则组件也要重新渲染，性能不好
  // const { data, setData } = useStore((state) => state)
  // const [id, setId] = useState(0)
  const handleKeyEvent = useCallback(
    (e: KeyboardEvent) => {
      if (data.length === 0) return
      switch (e.code) {
        case 'ArrowUp':
          {
            e.preventDefault()
            const index = data.findIndex((item) => item.id === id)
            setId(data[index - 1]?.id || data[data.length - 1].id)
          }
          // setCurrentIndex((pre) => (pre - 1 < 0 ? data.length - 1 : pre - 1))
          break
        case 'ArrowDown':
          {
            e.preventDefault()
            const index = data.findIndex((item) => item.id === id)
            setId(data[index + 1]?.id || data[0].id)
          }
          // setCurrentIndex((pre) => (pre + 1 > data.length - 1 ? 0 : pre + 1))
          break
        case 'Enter': {
          selectItem(id)
        }
      }
    },
    [data, id]
  )
  // 选择某一项的操作
  async function selectItem(id: number) {
    const content = data.find((item) => item.id === id)?.content
    if (content) await navigator.clipboard.writeText(content)
    setData([])
    setSearch('')
    window.api.hideWindow()
  }

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
  useEffect(() => setId(data[0]?.id || 0), [data])

  return { data, id, selectItem }
}
