export default async ({ params }) => {
  return await window.api.sql(`select * from contents where category_id=${params.cid}`, 'findAll')
}
