import { defineBoot } from 'quasar/wrappers'
import axios from 'axios'

// Configuração da base da API (porta do JSON Server)
const api = axios.create({ baseURL: 'http://localhost:3001' })

export default defineBoot(({ app }) => {
  // Torna o axios acessível globalmente (this.$axios)
  app.config.globalProperties.$axios = axios

  // Torna o api (com baseURL) acessível globalmente (this.$api)
  app.config.globalProperties.$api = api
})

export { api }
