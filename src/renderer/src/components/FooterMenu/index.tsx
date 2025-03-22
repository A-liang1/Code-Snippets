import { AddFour, DatabaseSetting } from '@icon-park/react'
import { useSubmit } from 'react-router-dom'

export const FooterMenu = () => {
  const submit = useSubmit()
  return (
    <>
      <div className="nav">
        <AddFour
          theme="outline"
          size="20"
          fill="#34495e"
          strokeWidth={2}
          onClick={() => submit(null, { method: 'POST' })}
        />
        <DatabaseSetting theme="outline" size="20" fill="#34495e" strokeWidth={2} />
      </div>
    </>
  )
}
