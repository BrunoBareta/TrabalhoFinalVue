import { defineStore } from 'pinia'
import * as ServicoService from 'src/services/servico'

export const useServicoStore = defineStore('servico', {
  state: () => ({
    servicos: [],
    loading: false
  }),

  actions: {
    async getServicos () {
      this.loading = true
      const response = await ServicoService.getServicos()
      this.servicos = response.data
      this.loading = false
    },

    async getServico (id) {
      const response = await ServicoService.getServicoById(id)
      return response.data
    },

    async postServico (dados) {
      await ServicoService.createServico(dados)
      await this.getServicos()
    },

    async putServico (id, dados) {
      await ServicoService.updateServico(id, dados)
      await this.getServicos()
    },

    async deleteServico (id) {
      await ServicoService.deleteServico(id)
      await this.getServicos()
    }
  }
})
