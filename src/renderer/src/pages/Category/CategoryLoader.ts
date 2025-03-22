export default () => {
  return window.api.sql('select * from categories order by id desc', 'findAll')
}
