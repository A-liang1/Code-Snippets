import { AddFour, DatabaseSetting } from '@icon-park/react'

export const FooterMenu = () => {
  return (
    <>
      {' '}
      <div className="nav">
        <AddFour theme="outline" size="20" fill="#34495e" strokeWidth={2} />
        <DatabaseSetting theme="outline" size="20" fill="#34495e" strokeWidth={2} />
      </div>
    </>
  )
}
