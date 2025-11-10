import { api } from 'boot/axios'

export const getOrdens = () => api.get('/ordemServico')
export const getOrdemById = (id) => api.get(`/ordemServico/${id}`)
export const createOrdem = (ordem) => api.post('/ordemServico', ordem)
export const updateOrdem = (id, ordem) => api.put(`/ordemServico/${id}`, ordem)
export const deleteOrdem = (id) => api.delete(`/ordemServico/${id}`)
