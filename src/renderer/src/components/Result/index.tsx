import useCode from '@renderer/hooks/useCode'
import { useEffect, useState } from 'react'

export default function Result() {
  const { data } = useCode()
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleKeyEvent = (e: KeyboardEvent) => {
    if (data.length === 0) return
    console.log(e.code)
    switch (e.code) {
      case 'ArrowUp':
        setCurrentIndex((pre) => (pre - 1 < 0 ? data.length - 1 : pre - 1))
        break
      case 'ArrowDown':
        setCurrentIndex((pre) => (pre + 1 > data.length ? 0 : pre + 1))
        break
    }
  }
  // 为什么放到useEffect中？因为每次触发这个事件，意味着data数据发生了改变，
  // 则会引起组件重新渲染，组件中的内容重新执行一次，然后有定义了一个keydown事件
  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent)

    return () => {
      document.removeEventListener('keydown', handleKeyEvent)
    }
  }, [data])
  // 闭包，这个函数一直不回发生改变，都是那唯一的一个函数，
  // 那么函数中用到外层的数据就会形成一个作用域，数据会保留
  return (
    <main className="bg-slate-50 px-3 rounded-bl-lg rounded-br-lg -mt-[7px] pb-2">
      {currentIndex}
      {data.map((item) => (
        <div key={item.id} className="text-slate-700 truncate mb-2">
          {item.content}
        </div>
      ))}
    </main>
  )
}
