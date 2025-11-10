import { defineStore } from 'pinia'
import * as OrdemService from 'src/services/OrdemServico'

export const useOrdemServicoStore = defineStore('ordemServico', {
  state: () => ({
    ordens: [],
  }),

  actions: {
    async getOrdens() {
      const response = await OrdemService.getOrdens()
      this.ordens = response.data
    },

    async getOrdem(id) {
      const response = await OrdemService.getOrdemById(id)
      return response.data
    },

    async postOrdem(dados) {
      await OrdemService.createOrdem(dados)
      await this.getOrdens()
    },

    async putOrdem(id, dados) {
      await OrdemService.updateOrdem(id, dados)
      await this.getOrdens()
    },

    async deleteOrdem(id) {
      await OrdemService.deleteOrdem(id)
      await this.getOrdens()
    },
  },
})
