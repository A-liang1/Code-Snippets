import { DataType } from '@renderer/data'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface StateProps {
  config: ConfigDataType
  setConfig: (config: ConfigDataType) => void
  data: DataType[]
  setData: (data: DataType[]) => void
  search: string
  setSearch: (search: string) => void
  error: string
  setError: (message: string) => void
  id: number
  setId: (id: number) => void
  editCategoryId: number | undefined
  setEditCategoryId: (id: number) => void
}

export const useStore = create(
  persist<StateProps>(
    (set) => ({
      config: { databaseDirectory: '', shortCut: '' },
      setConfig: (config) => set({ config }),
      data: [],
      setData: (data) => set({ data }),
      search: '',
      setSearch: (content) => set({ search: content }),
      error: '',
      setError: (message) => set({ error: message }),
      id: 0,
      setId: (id) => set({ id }),
      editCategoryId: 0,
      setEditCategoryId: (editCategoryId) => set({ editCategoryId })
    }),
    {
      name: 'aliang-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
