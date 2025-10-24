<template>
  <div class="servico-container q-pa-md">
    <h1 class="titulo">Tabela de Serviços</h1>

    <!-- 🔍 Pesquisa + botão adicionar -->
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

    <!-- 🧾 Tabela -->
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
            @click="editarServico(props.row)"
            title="Editar serviço"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Botões inferiores -->
    <div class="botoes-rodape q-mt-lg">
      <q-btn color="green" glossy icon="check" label="Salvar" />
      <q-btn color="red" glossy icon="close" label="Cancelar" class="q-ml-sm" />
    </div>

    <!-- 🧩 Modal Novo Serviço -->
    <q-dialog v-model="modalAdicionar">
      <q-card class="bg-dark text-white q-pa-md" style="min-width: 400px;">
        <h6 class="text-center text-red text-bold q-mb-md">Novo Serviço</h6>

        <q-input
          v-model="novo.nome"
          label="Nome do Serviço"
          filled
          dense
          class="campo-branco q-mt-sm"
          label-color="white"
          input-class="text-white"
          color="red"
        />

        <q-input
          v-model="novo.preco"
          label="Preço (R$)"
          type="number"
          filled
          dense
          class="campo-branco q-mt-sm"
          label-color="white"
          input-class="text-white"
          color="red"
        />

        <!-- 🧭 Substituto do Tempo Estimado -->
        <q-select
          v-model="novo.categoria"
          :options="categorias"
          label="Categoria do Serviço"
          filled
          dense
          class="campo-branco q-mt-sm"
          label-color="white"
          color="red"
          dropdown-icon="build"
          popup-content-class="popup-tempo"
          emit-value
          map-options
        />

        <q-input
          v-model="novo.descricao"
          label="Descrição (opcional)"
          type="textarea"
          autogrow
          filled
          dense
          class="campo-branco q-mt-sm"
          label-color="white"
          input-class="text-white"
          color="red"
        />

        <div class="q-mt-md flex justify-end">
          <q-btn label="Salvar" color="green" glossy @click="salvarNovoServico" />
          <q-btn flat label="Cancelar" color="grey" class="q-ml-sm" v-close-popup />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filtro = ref('')
const modalAdicionar = ref(false)

const servicos = ref([
  { id: 1, nome: 'Troca de Óleo', preco: '200,00', categoria: 'Troca de Óleo' },
  { id: 2, nome: 'Alinhamento', preco: '130,00', categoria: 'Suspensão' },
  { id: 3, nome: 'Troca de Bateria', preco: '90,00', categoria: 'Elétrica' },
  { id: 4, nome: 'Revisão Geral', preco: '300,00', categoria: 'Revisão' },
  { id: 5, nome: 'Troca de Correia', preco: '500,00', categoria: 'Mecânica Geral' }
])

const colunas = [
  { name: 'id', label: 'ID', field: 'id', align: 'center', style: 'width: 60px' },
  { name: 'nome', label: 'Nome do Serviço', field: 'nome', align: 'left' },
  { name: 'preco', label: 'Preço (R$)', field: 'preco', align: 'center' },
  { name: 'categoria', label: 'Categoria', field: 'categoria', align: 'center' },
  { name: 'acoes', label: 'Ações', align: 'center', style: 'width: 100px' }
]

const categorias = [
  'Mecânica Geral',
  'Troca de Óleo',
  'Elétrica',
  'Revisão',
  'Suspensão',
  'Freios',
  'Outros'
]

const novo = ref({
  nome: '',
  preco: '',
  categoria: '',
  descricao: ''
})

const servicosFiltrados = computed(() =>
  servicos.value.filter(s =>
    s.nome.toLowerCase().includes(filtro.value.toLowerCase())
  )
)

const abrirModalAdicionar = () => {
  modalAdicionar.value = true
}

const salvarNovoServico = () => {
  if (!novo.value.nome || !novo.value.preco || !novo.value.categoria) {
    alert('Preencha todos os campos obrigatórios!')
    return
  }

  const novoId = servicos.value.length + 1
  servicos.value.push({
    id: novoId,
    nome: novo.value.nome,
    preco: novo.value.preco,
    categoria: novo.value.categoria,
    descricao: novo.value.descricao
  })

  modalAdicionar.value = false
  novo.value = { nome: '', preco: '', categoria: '', descricao: '' }
  alert('Serviço cadastrado com sucesso!')
}

const editarServico = (row) => {
  alert(`Editar serviço: ${row.nome}`)
}
</script>

<style scoped>
.servico-container {
  background: linear-gradient(135deg, #1b1b1b 40%, #a60000);
  min-height: 100vh;
  color: white;
  font-family: 'Poppins', sans-serif;
}

.titulo {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  color: #fff;
  text-shadow: 0 0 10px red;
}

.campo-pesquisa {
  width: 300px;
}

.botao-add {
  font-weight: 500;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
}

.tabela-servico {
  border-radius: 10px;
  overflow: hidden;
}

.q-table thead tr {
  background: #a60000;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.q-table tbody tr:hover {
  background: rgba(255, 0, 0, 0.15);
  transform: scale(1.01);
  transition: 0.3s;
}

.botoes-rodape {
  display: flex;
  justify-content: flex-end;
}

.q-btn.glossy {
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}

/* Campos e labels brancos */
.campo-branco .q-field__label,
.campo-branco .q-field__native {
  color: white !important;
}

/* Dropdown escuro */
.popup-tempo {
  background-color: #1b1b1b !important;
  color: white !important;
  border: 1px solid red !important;
}

.popup-tempo .q-item {
  color: white !important;
}

.popup-tempo .q-item:hover {
  background-color: rgba(255, 0, 0, 0.2) !important;
  transition: 0.2s;
}

/* Modal */
.q-card.bg-dark {
  background: rgba(20, 20, 20, 0.95);
  box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
  border-radius: 10px;
}
</style>
