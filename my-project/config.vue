<script>
	module.exports = {
  API_LOCATION: 'http://localhost:8082',
  rules: [(v) => !!v || 'Campo vacío', v => (v && v.length <= 20) || 'Máximo de caracteres']
}
</script>
