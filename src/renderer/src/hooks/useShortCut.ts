/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useStore } from '@renderer/store/useStore'

export default () => {
  const setError = useStore((state) => state.setError)
  const register = async (type: 'search') => {
    const config = (await window.api.sql('', 'config')) as Record<string, string>
    const isBind = await window.api.shortCut(type, config.shortCut)

    isBind || setError('快捷键注册失败')
  }
  return { register }
}
