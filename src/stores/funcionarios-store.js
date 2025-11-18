import { defineStore } from 'pinia'
import * as FuncionariosService from 'src/services/funcionarios'

export const useFuncionarioStore = defineStore('funcionarios', {
  state: () => ({
    funcionarios: [],
    loading: false
  }),

  actions: {
    async getFuncionarios() {
      this.loading = true
      const response = await FuncionariosService.getFuncionarios()
      this.funcionarios = response.data
      this.loading = false
    },

    async postFuncionario(dados) {
      await FuncionariosService.createFuncionario(dados)
      await this.getFuncionarios()
    },

    async putFuncionario(id, dados) {
      await FuncionariosService.updateFuncionario(id, dados)
      await this.getFuncionarios()
    },

    async deleteFuncionario(id) {
      await FuncionariosService.deleteFuncionario(id)
      await this.getFuncionarios()
    }
  }
})
