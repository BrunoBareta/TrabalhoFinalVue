import axios from 'axios'

const API = "http://localhost:3000/funcionarios"

export default {
  async listar() {
    const res = await axios.get(API)
    return res.data
  },

  async criar(func) {
    const res = await axios.post(API, func)
    return res.data
  },

  async atualizar(id, func) {
    const res = await axios.put(`${API}/${id}`, func)
    return res.data
  },

  async excluir(id) {
    const res = await axios.delete(`${API}/${id}`)
    return res.data
  }
}
