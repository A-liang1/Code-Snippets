import { useStore } from '@renderer/store/useStore'
import { Alert } from 'antd'
import { useEffect } from 'react'

function Error() {
  const error = useStore((state) => state.error)
  const setError = useStore((state) => state.setError)
  useEffect(() => {
    const id = setTimeout(() => setError(''), 2000)
    return () => clearTimeout(id)
  }, [error])

  if (!error) return <></>

  return (
    // <main className="absolute top-0 w-full">
    <Alert message={error} type="info" showIcon></Alert>
    // </main>
  )
}
export default Error
