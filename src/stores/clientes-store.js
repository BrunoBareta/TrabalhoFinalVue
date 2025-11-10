import { defineStore } from 'pinia'
import * as ClientesService from 'src/services/clientes'

export const useClienteStore = defineStore('cliente', {
  state: () => ({
    clientes: [],
    loading: false
  }),

  actions: {
    async getClientes() {
      this.loading = true
      const response = await ClientesService.getClientes()
      this.clientes = response.data
      this.loading = false
    },

    async getCliente(id) {
      const response = await ClientesService.getClienteById(id)
      return response.data
    },

    async postCliente(dados) {
      await ClientesService.createCliente(dados)
      await this.getClientes()
    },

    async putCliente(id, dados) {
      await ClientesService.updateCliente(id, dados)
      await this.getClientes()
    },

    async deleteCliente(id) {
      await ClientesService.deleteCliente(id)
      await this.getClientes()
    }
  }
})
