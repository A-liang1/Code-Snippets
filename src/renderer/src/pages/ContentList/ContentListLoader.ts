export default async ({ params }) => {
  const { cid } = params
  let sql = `select * from contents `
  if (cid) {
    sql += `where category_id=${cid}`
  }
  sql += ` order by id desc`
  return await window.api.sql(sql, 'findAll')
}
