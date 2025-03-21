type SqlActionType = 'findAll' | 'findOne' | 'insert' | 'update' | 'del'

type CategoryType = {
  id: number
  name: string
  created_at: string
}

type ContentType = {
  id: number
  title: string
  content: string
  category_id: string
  created_at: string
}
