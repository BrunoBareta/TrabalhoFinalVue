import { defineStore } from 'pinia'
import service from '../services/funcionarios'

export const useFuncionariosStore = defineStore('funcionariosStore', {
  state: () => ({
    lista: [],
    funcionarioEdicao: null
  }),

  actions: {
    async carregar() {
      this.lista = await service.listar()
    },

    async salvar(func) {
      if (this.funcionarioEdicao) {
        await service.atualizar(this.funcionarioEdicao.id, func)
      } else {
        await service.criar(func)
      }

      this.funcionarioEdicao = null
      await this.carregar()
    },

    editar(func) {
      this.funcionarioEdicao = { ...func }
    },

    async excluir(id) {
      await service.excluir(id)
      await this.carregar()
    }
  }
})
