<template>
  <div class="cliente-container">
    <div class="form-container">
      <!-- Lado esquerdo -->
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
            <q-btn label="SALVAR" color="green" class="q-mr-sm" @click="salvarCliente" />
            <q-btn label="CANCELAR" color="red" class="q-mr-sm" @click="cancelar" />
            <q-btn
              :label="mostrarLista ? 'OCULTAR LISTA' : 'LISTAR CLIENTES'"
              color="primary"
              glossy
              @click="mostrarLista = !mostrarLista"
            />
          </div>
        </q-form>
      </div>

      <!-- Lado direito -->
      <div class="form-right">
        <div class="logo-wrapper">
          <img src="../assets/logo-oeste.png" alt="Oeste Auto Center" class="logo-img" />
        </div>
        <h2 class="titulo">Gerenciamento de Clientes</h2>

        <!-- Campo de busca -->
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

        <!-- Lista -->
        <transition name="fade">
          <div v-if="mostrarLista" class="lista-clientes">
            <div v-if="clientesFiltrados.length === 0" class="nenhum-cliente">Nenhum cliente encontrado.</div>
            <div v-for="(c, i) in clientesFiltrados" :key="i" class="cliente-item">
              <span>{{ c.nome }} - {{ c.email }}</span>
              <div class="botoes-acoes">
                <q-btn label="EDITAR" size="sm" color="red" flat dense @click="editarCliente(c)" />
                <q-btn label="EXCLUIR" size="sm" color="grey" flat dense @click="excluirCliente(i)" />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cliente = ref({ nome: '', cpf: '', email: '', telefone: '' })
const mostrarLista = ref(false)

const listaClientes = ref([
  { nome: 'Bruno Bareta', cpf: '123.456.789-00', email: 'bruno@gmail.com', telefone: '33662548' },
  { nome: 'Igor Haas', cpf: '987.654.321-00', email: 'igor@gmail.com', telefone: '999999999' },
  { nome: 'Felipe Dano', cpf: '654.321.987-00', email: 'felipe@gmail.com', telefone: '988888888' },
  { nome: 'Lucas Martins', cpf: '555.444.333-22', email: 'lucas@gmail.com', telefone: '977777777' },
  { nome: 'Camila Souza', cpf: '222.333.444-55', email: 'camila@gmail.com', telefone: '966666666' },
  { nome: 'Juliana Ramos', cpf: '111.222.333-44', email: 'juliana@gmail.com', telefone: '955555555' },
  { nome: 'Carlos Andrade', cpf: '333.444.555-66', email: 'carlos@gmail.com', telefone: '944444444' },
  { nome: 'Ana Paula', cpf: '999.888.777-66', email: 'ana@gmail.com', telefone: '933333333' },
  { nome: 'Rafael Lima', cpf: '777.666.555-44', email: 'rafael@gmail.com', telefone: '922222222' },
  { nome: 'Patrícia Torres', cpf: '888.999.000-11', email: 'patricia@gmail.com', telefone: '911111111' }
])

const busca = ref('')
const clientesFiltrados = ref([...listaClientes.value])

function salvarCliente() {
  if (cliente.value.nome && cliente.value.cpf && cliente.value.email) {
    listaClientes.value.push({ ...cliente.value })
    clientesFiltrados.value = [...listaClientes.value]
    cliente.value = { nome: '', cpf: '', email: '', telefone: '' }
    alert('Cliente salvo com sucesso!')
  } else {
    alert('Preencha todos os campos obrigatórios!')
  }
}

function editarCliente(c) {
  cliente.value = { ...c }
}

function excluirCliente(index) {
  if (confirm('Deseja realmente excluir este cliente?')) {
    listaClientes.value.splice(index, 1)
    clientesFiltrados.value = [...listaClientes.value]
    alert('Cliente excluído com sucesso!')
  }
}

function cancelar() {
  cliente.value = { nome: '', cpf: '', email: '', telefone: '' }
}

function filtrarClientes() {
  if (busca.value.trim() === '') {
    clientesFiltrados.value = [...listaClientes.value]
    return
  }
  const termo = busca.value.toLowerCase()
  clientesFiltrados.value = listaClientes.value.filter(c =>
    `${c.nome} ${c.email}`.toLowerCase().includes(termo)
  )
}

function limparBusca() {
  busca.value = ''
  clientesFiltrados.value = [...listaClientes.value]
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
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.logo-img:hover {
  transform: scale(1.05);
  box-shadow: 0 0 45px rgba(255, 0, 0, 0.6);
}

.titulo {
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
  font-family: 'Brush Script MT', cursive;
  font-size: 2rem;
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
