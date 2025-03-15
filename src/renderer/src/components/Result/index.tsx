import './styles.scss'
// import { Div } from './styled'
import classNames from 'classnames'
import useSelect from '@renderer/hooks/useSelect'
// classnames包，写样式
// import styles from './styles.module.scss'
// css模块化 styles.main

export default function Result() {
  const { data, id, selectItem } = useSelect()
  return (
    <main className="result">
      {data.map((item) => (
        // <Div isActive={currentIndex === index} key={item.id}>
        //   {item.content}
        // </Div>
        <div
          key={item.id}
          className={classNames({ active: id === item.id })}
          onClick={() => selectItem(item.id)}
        >
          {item.content}
        </div>
      ))}
    </main>
  )
}
