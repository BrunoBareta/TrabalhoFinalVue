<template>
  <div class="funcionario-container">
    <div class="form-container">
      <!-- Lado esquerdo -->
      <div class="form-left">
        <q-form @submit.prevent="salvarFuncionario" class="form-content">
          <div class="form-field">
            <label>Nome:</label>
            <q-input v-model="funcionario.nome" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Cargo:</label>
            <q-input v-model="funcionario.cargo" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Email:</label>
            <q-input v-model="funcionario.email" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Telefone:</label>
            <q-input v-model="funcionario.telefone" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="btn-group">
            <q-btn label="SALVAR" color="green" class="q-mr-sm" @click="salvarFuncionario" />
            <q-btn label="CANCELAR" color="red" class="q-mr-sm" @click="cancelar" />
            <q-btn
              :label="mostrarLista ? 'OCULTAR LISTA' : 'LISTAR FUNCIONÁRIOS'"
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
        <h2 class="titulo">Gerenciamento de Funcionários</h2>

        <!-- Campo de busca -->
        <div v-if="mostrarLista" class="search-container">
          <q-input
            v-model="busca"
            outlined
            color="red"
            bg-color="dark"
            placeholder="Pesquisar funcionário..."
            input-class="text-white"
            dense
          />
          <div class="search-buttons">
            <q-btn label="Pesquisar" color="red" glossy @click="filtrarFuncionarios" />
            <q-btn label="Limpar" color="grey-8" glossy @click="limparBusca" />
          </div>
        </div>

        <!-- Lista -->
        <transition name="fade">
          <div v-if="mostrarLista" class="lista-funcionarios">
            <div v-if="funcionariosFiltrados.length === 0" class="nenhum-funcionario">
              Nenhum funcionário encontrado.
            </div>
            <div v-for="(f, i) in funcionariosFiltrados" :key="i" class="funcionario-item">
              <span>{{ f.nome }} - {{ f.cargo }}</span>
              <div class="botoes-acoes">
                <q-btn label="EDITAR" size="sm" color="red" flat dense @click="editarFuncionario(f)" />
                <q-btn label="EXCLUIR" size="sm" color="grey" flat dense @click="excluirFuncionario(i)" />
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

const funcionario = ref({
  nome: '',
  cargo: '',
  email: '',
  telefone: ''
})

const mostrarLista = ref(false)

const listaFuncionarios = ref([
  { nome: 'Juliano Mendes', cargo: 'Mecânico', email: 'juliano@oesteauto.com', telefone: '(49) 9999-1001' },
  { nome: 'Carlos Santos', cargo: 'Atendente', email: 'carlos@oesteauto.com', telefone: '(49) 9888-2222' },
  { nome: 'Felipe Dano', cargo: 'Supervisor', email: 'felipe@oesteauto.com', telefone: '(49) 9777-4444' },
  { nome: 'Ana Souza', cargo: 'Gerente', email: 'ana@oesteauto.com', telefone: '(49) 9666-8888' },
  { nome: 'Marcos Silva', cargo: 'Mecânico', email: 'marcos@oesteauto.com', telefone: '(49) 9555-3333' },
  { nome: 'Patrícia Torres', cargo: 'Recepcionista', email: 'patricia@oesteauto.com', telefone: '(49) 9444-5555' },
  { nome: 'Rafael Lima', cargo: 'Mecânico', email: 'rafael@oesteauto.com', telefone: '(49) 9333-7777' },
  { nome: 'Camila Alves', cargo: 'Administrativo', email: 'camila@oesteauto.com', telefone: '(49) 9222-6666' },
  { nome: 'Igor Haas', cargo: 'Auxiliar Técnico', email: 'igor@oesteauto.com', telefone: '(49) 9111-9999' },
  { nome: 'Bruno Bareta', cargo: 'Chefe de Oficina', email: 'bruno@oesteauto.com', telefone: '(49) 9000-1234' }
])

const busca = ref('')
const funcionariosFiltrados = ref([...listaFuncionarios.value])

function salvarFuncionario() {
  if (funcionario.value.nome && funcionario.value.cargo && funcionario.value.email) {
    listaFuncionarios.value.push({ ...funcionario.value })
    funcionariosFiltrados.value = [...listaFuncionarios.value]
    funcionario.value = { nome: '', cargo: '', email: '', telefone: '' }
    alert('Funcionário salvo com sucesso!')
  } else {
    alert('Preencha todos os campos obrigatórios!')
  }
}

function editarFuncionario(f) {
  funcionario.value = { ...f }
}

function excluirFuncionario(index) {
  if (confirm('Deseja realmente excluir este funcionário?')) {
    listaFuncionarios.value.splice(index, 1)
    funcionariosFiltrados.value = [...listaFuncionarios.value]
    alert('Funcionário excluído com sucesso!')
  }
}

function cancelar() {
  funcionario.value = { nome: '', cargo: '', email: '', telefone: '' }
}

function filtrarFuncionarios() {
  if (busca.value.trim() === '') {
    funcionariosFiltrados.value = [...listaFuncionarios.value]
    return
  }
  const termo = busca.value.toLowerCase()
  funcionariosFiltrados.value = listaFuncionarios.value.filter(f =>
    `${f.nome} ${f.cargo}`.toLowerCase().includes(termo)
  )
}

function limparBusca() {
  busca.value = ''
  funcionariosFiltrados.value = [...listaFuncionarios.value]
}
</script>

<style scoped>
.funcionario-container {
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

.lista-funcionarios {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.funcionario-item {
  display: flex;
  justify-content: space-between;
  background: rgba(70, 70, 70, 0.85);
  padding: 12px 15px;
  border-radius: 8px;
  transition: 0.3s;
}

.funcionario-item:hover {
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
