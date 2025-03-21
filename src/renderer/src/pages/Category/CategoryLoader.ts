export default () => {
  return window.api.sql('select * from categories', 'findAll')
}
