import { defineStore } from 'pinia'
import * as VeiculoService from 'src/services/veiculo'

export const useVeiculoStore = defineStore('veiculo', {
  state: () => ({
    veiculos: [],
    loading: false,
  }),

  actions: {
    // Listar todos os veículos
    async getVeiculos() {
      try {
        this.loading = true
        const response = await VeiculoService.getVeiculos()
        this.veiculos = response.data
      } catch (error) {
        console.error('Erro ao buscar veículos:', error)
      } finally {
        this.loading = false
      }
    },

    // Criar veículo
    async postVeiculo(dados) {
      try {
        await VeiculoService.createVeiculo(dados)
        await this.getVeiculos()
      } catch (error) {
        console.error('Erro ao adicionar veículo:', error)
      }
    },

    // Atualizar veículo
    async putVeiculo(id, dados) {
      try {
        await VeiculoService.updateVeiculo(id, dados)
        await this.getVeiculos()
      } catch (error) {
        console.error('Erro ao atualizar veículo:', error)
      }
    },

    // Excluir veículo
    async deleteVeiculo(id) {
      try {
        await VeiculoService.deleteVeiculo(id)
        await this.getVeiculos()
      } catch (error) {
        console.error('Erro ao deletar veículo:', error)
      }
    },
  },
})
