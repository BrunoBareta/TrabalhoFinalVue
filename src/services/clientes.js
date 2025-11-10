import { api } from 'boot/axios'

//Buscar todos os clientes
export const getClientes = () => api.get('/clientes')

//Buscar cliente por ID
export const getClienteById = (id) => api.get(`/clientes/${id}`)

//Criar novo cliente
export const createCliente = (cliente) => api.post('/clientes', cliente)

//Atualizar cliente
export const updateCliente = (id, cliente) => api.put(`/clientes/${id}`, cliente)

//Excluir cliente
export const deleteCliente = (id) => api.delete(`/clientes/${id}`)
