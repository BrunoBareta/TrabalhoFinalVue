<template>
  <div class="servico-container q-pa-md">
    <h1 class="titulo">Tabela de Serviços</h1>

    <!-- Pesquisa + botão adicionar -->
    <div class="acoes-topo q-mb-md flex justify-between items-center">
      <q-input
        v-model="filtro"
        placeholder="Pesquisar serviço..."
        dense
        filled
        standout="bg-red-10 text-white"
        class="campo-pesquisa"
        :debounce="300"
        clearable
        color="red"
      >
        <template v-slot:append>
          <q-icon name="search" color="white" />
        </template>
      </q-input>

      <q-btn
        color="red"
        glossy
        icon="add_circle"
        label="Adicionar Serviço"
        class="botao-add"
        @click="abrirModalAdicionar"
      />
    </div>

    <!-- Tabela -->
    <q-table
      :rows="servicosFiltrados"
      :columns="colunas"
      row-key="id"
      dark
      flat
      bordered
      class="tabela-servico"
    >

      <template v-slot:body-cell-acoes="props">
        <q-td align="center">
          <q-btn
            dense
            round
            icon="edit"
            color="orange"
            glossy
            size="sm"
            class="q-mr-sm"
            @click="abrirModalEditar(props.row)"
          />

          <q-btn
            dense
            round
            icon="delete"
            color="red"
            glossy
            size="sm"
            @click="excluirServico(props.row.id)"
          />
        </q-td>
      </template>

    </q-table>

    
    <q-dialog v-model="modalAdicionar">
      <q-card class="bg-dark text-white q-pa-md" style="min-width: 400px;">
        <h6 class="text-center text-red text-bold q-mb-md">Novo Serviço</h6>

        <q-input
          v-model="form.nome"
          label="Nome do Serviço"
          filled dense color="red"
          input-class="text-white"
        />

        <q-input
          v-model="form.preco"
          type="number"
          label="Preço (R$)"
          filled dense color="red"
          input-class="text-white"
        />

        <q-select
          v-model="form.categoria"
          :options="categorias"
          label="Categoria"
          filled dense color="red"
          popup-content-class="popup-tempo"
        />

        <q-input
          v-model="form.descricao"
          label="Descrição"
          type="textarea"
          autogrow
          filled dense color="red"
          input-class="text-white"
        />

        <div class="q-mt-md flex justify-end">
          <q-btn label="Salvar" color="green" glossy @click="salvarNovo" />
          <q-btn flat label="Cancelar" color="grey" class="q-ml-sm" v-close-popup />
        </div>
      </q-card>
    </q-dialog>

    
    <q-dialog v-model="modalEditar">
      <q-card class="bg-dark text-white q-pa-md" style="min-width: 400px;">
        <h6 class="text-center text-orange-7 text-bold q-mb-md">Editar Serviço</h6>

        <q-input
          v-model="form.nome"
          label="Nome do Serviço"
          filled dense color="orange"
          input-class="text-white"
        />

        <q-input
          v-model="form.preco"
          type="number"
          label="Preço (R$)"
          filled dense color="orange"
          input-class="text-white"
        />

        <q-select
          v-model="form.categoria"
          :options="categorias"
          label="Categoria"
          filled dense color="orange"
          popup-content-class="popup-tempo"
        />

        <q-input
          v-model="form.descricao"
          label="Descrição"
          type="textarea"
          autogrow
          filled dense color="orange"
          input-class="text-white"
        />

        <div class="q-mt-md flex justify-end">
          <q-btn label="Salvar Alterações" color="green" glossy @click="salvarEdicao" />
          <q-btn flat label="Cancelar" color="grey" class="q-ml-sm" v-close-popup />
        </div>

      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useServicoStore } from "src/stores/servico"

const store = useServicoStore()

const filtro = ref("")
const modalAdicionar = ref(false)
const modalEditar = ref(false)
const servicos = computed(() => store.servicos)

onMounted(() => {
  store.getServicos()
})

const categorias = [
  "Troca de Óleo",
  "Elétrica",
  "Mecânica Geral",
  "Revisão",
  "Suspensão",
  "Freios",
  "Outros",
]

const colunas = [
  { name: "nome", label: "Nome do Serviço", field: "nome", align: "left" },
  { name: "preco", label: "Preço (R$)", field: "preco", align: "center" },
  { name: "categoria", label: "Categoria", field: "categoria", align: "center" },
  { name: "acoes", label: "Ações", align: "center" },
]

const form = ref({
  
  nome: "",
  preco: "",
  categoria: "",
  descricao: "",
})

// FILTRO
const servicosFiltrados = computed(() => {
  return servicos.value.filter(s =>
    s.nome.toLowerCase().includes(filtro.value.toLowerCase())
  )
})

// NOVO
const abrirModalAdicionar = () => {
  form.value = { id: null, nome: "", preco: "", categoria: "", descricao: "" }
  modalAdicionar.value = true
}

const salvarNovo = async () => {
  await store.postServico(form.value)
  modalAdicionar.value = false
}

// EDITAR
const abrirModalEditar = (servico) => {
  form.value = { ...servico }
  modalEditar.value = true
}

const salvarEdicao = async () => {
  await store.putServico(form.value.id, form.value)
  modalEditar.value = false
}

// EXCLUIR
const excluirServico = async (id) => {
  if (confirm("Deseja realmente excluir este serviço?")) {
    await store.deleteServico(id)
  }
}
</script>

<style scoped>
.servico-container {
  background: linear-gradient(135deg, #1b1b1b 40%, #a60000);
  min-height: 100vh;
  color: white;
}

.titulo {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px red;
}

.campo-pesquisa { width: 300px; }

.botao-add { box-shadow: 0 0 15px rgba(255, 0, 0, 0.6); }

.popup-tempo {
  background-color: #1b1b1b !important;
  border: 1px solid red !important;
}
</style>
