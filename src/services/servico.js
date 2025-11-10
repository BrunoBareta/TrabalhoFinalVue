import { api } from 'boot/axios'

export const getServicos = () => api.get('/servicos')
export const getServicoById = (id) => api.get(`/servicos/${id}`)
export const createServico = (servico) => api.post('/servicos', servico)
export const updateServico = (id, servico) => api.put(`/servicos/${id}`, servico)
export const deleteServico = (id) => api.delete(`/servicos/${id}`)
