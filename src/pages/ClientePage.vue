<template>
  <div class="cliente-container">
    <div class="form-container">

      <!-- FORMULÁRIO (lado esquerdo) -->
      <div class="form-left">
        <q-form @submit.prevent="salvarCliente" class="form-content">

          <div class="form-field">
            <label>Nome:</label>
            <q-input v-model="cliente.nome" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>CPF:</label>
            <q-input v-model="cliente.cpf" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Email:</label>
            <q-input v-model="cliente.email" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Telefone:</label>
            <q-input v-model="cliente.telefone" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="btn-group">
            <!-- agora o submit é feito pelo form -->
            <q-btn label="SALVAR" color="green" class="q-mr-sm" type="submit" />
            <q-btn label="CANCELAR" color="red" class="q-mr-sm" @click="cancelar" />
            <q-btn
              :label="mostrarLista ? 'OCULTAR LISTA' : 'LISTAR CLIENTES'"
              color="primary"
              glossy
              @click="listarClientes"
            />
          </div>

        </q-form>
      </div>

      <!-- LADO DIREITO -->
      <div class="form-right">

        <div class="logo-wrapper">
          <img src="../assets/logo-oeste.png" class="logo-img" />
        </div>

        <h2 class="titulo">Gerenciamento de Clientes</h2>

        <!-- BUSCA -->
        <div v-if="mostrarLista" class="search-container">
          <q-input
            v-model="busca"
            outlined
            color="red"
            bg-color="dark"
            placeholder="Pesquisar cliente..."
            input-class="text-white"
            dense
          />
          <div class="search-buttons">
            <q-btn label="Pesquisar" color="red" glossy @click="filtrarClientes" />
            <q-btn label="Limpar" color="grey-8" glossy @click="limparBusca" />
          </div>
        </div>

        <!-- LISTA DE CLIENTES -->
        <transition name="fade">
          <div v-if="mostrarLista" class="lista-clientes">

            <div v-if="clientesFiltrados.length === 0" class="nenhum-cliente">
              Nenhum cliente encontrado.
            </div>

            <div v-for="c in clientesFiltrados" :key="c.id" class="cliente-item">
              <span>{{ c.nome }} - {{ c.email }}</span>

              <div class="botoes-acoes">
                <q-btn label="EDITAR" size="sm" color="red" flat dense @click="editarCliente(c)" />
                <q-btn label="EXCLUIR" size="sm" color="grey" flat dense @click="excluirCliente(c.id)" />
              </div>
            </div>

          </div>
        </transition>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useClienteStore } from 'src/stores/clientes-store'

const clienteStore = useClienteStore()

// carrega a lista ao abrir a página
onMounted(async () => {
  await clienteStore.getClientes()
  clientesFiltrados.value = [...clienteStore.clientes]
})

const cliente = ref({ id: null, nome: '', cpf: '', email: '', telefone: '' })
const mostrarLista = ref(false)
const busca = ref('')
const clientesFiltrados = ref([])

// Atualiza lista sempre que vier do store
watch(
  () => clienteStore.clientes,
  () => {
    clientesFiltrados.value = [...clienteStore.clientes]
  },
  { immediate: true }
)

async function listarClientes() {
  // só alterna a visibilidade
  mostrarLista.value = !mostrarLista.value

  if (mostrarLista.value) {
    await clienteStore.getClientes()
    clientesFiltrados.value = [...clienteStore.clientes]
  }
}

async function salvarCliente() {
  if (!cliente.value.nome || !cliente.value.cpf || !cliente.value.email) {
    alert('Preencha todos os campos obrigatórios!')
    return
  }

  try {
    if (cliente.value.id) {
      // EDIÇÃO
      await clienteStore.putCliente(cliente.value.id, cliente.value)
    } else {
      // CRIAÇÃO → NÃO mandar o id pro servidor
      const dadosSemId = { ...cliente.value }
      delete dadosSemId.id

      await clienteStore.postCliente(dadosSemId)
    }

    cancelar()

    // atualiza a lista no store
    await clienteStore.getClientes()
    clientesFiltrados.value = [...clienteStore.clientes]

    // garante que a lista esteja visível
    if (!mostrarLista.value) {
      mostrarLista.value = true
    }
  } catch (err) {
    console.error('Erro ao salvar cliente:', err)
    alert('Erro ao salvar cliente.')
  }
}

function editarCliente(c) {
  cliente.value = { ...c }
}

async function excluirCliente(id) {
  if (confirm('Deseja realmente excluir este cliente?')) {
    await clienteStore.deleteCliente(id)
    await clienteStore.getClientes()
    clientesFiltrados.value = [...clienteStore.clientes]
  }
}

function cancelar() {
  cliente.value = { id: null, nome: '', cpf: '', email: '', telefone: '' }
}

function filtrarClientes() {
  const termo = busca.value.toLowerCase()
  clientesFiltrados.value = clienteStore.clientes.filter(c =>
    `${c.nome} ${c.email}`.toLowerCase().includes(termo)
  )
}

function limparBusca() {
  busca.value = ''
  clientesFiltrados.value = [...clienteStore.clientes]
}
</script>

<style scoped>
.cliente-container {
  background: linear-gradient(135deg, #1b1b1b 40%, #a60000);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  max-width: 1100px;
  background: rgba(50, 50, 50, 0.9);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 0 25px rgba(255, 0, 0, 0.3);
}

.form-left,
.form-right {
  flex: 1;
  min-width: 350px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  color: #ddd;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  margin-bottom: 10px;
}

.logo-img {
  width: 100%;
  max-width: 340px;
  border-radius: 12px;
  box-shadow: 0 0 35px rgba(255, 0, 0, 0.4);
}

.titulo {
  text-align: center;
  color: #ffffff;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 2.2rem;
  font-family: "Brush Script MT", "Lucida Handwriting", cursive;
  font-weight: 400;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.search-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.lista-clientes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cliente-item {
  display: flex;
  justify-content: space-between;
  background: rgba(70, 70, 70, 0.85);
  padding: 12px 15px;
  border-radius: 8px;
  transition: 0.3s;
}

.cliente-item:hover {
  background: rgba(100, 0, 0, 0.9);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
