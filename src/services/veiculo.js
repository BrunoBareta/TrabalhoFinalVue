import { api } from 'boot/axios'

// Buscar todos os veículos
export const getVeiculos = () => api.get('/veiculos')

// Buscar veículo pelo ID
export const getVeiculoById = (id) => api.get(`/veiculos/${id}`)

// Criar novo veículo
export const createVeiculo = (veiculo) => api.post('/veiculos', veiculo)

// Atualizar veículo existente
export const updateVeiculo = (id, veiculo) => api.put(`/veiculos/${id}`, veiculo)

// Excluir veículo
export const deleteVeiculo = (id) => api.delete(`/veiculos/${id}`)
