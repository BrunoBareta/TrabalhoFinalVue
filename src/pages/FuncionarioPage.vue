<template>
  <div class="veiculo-container">
    <div class="form-container">

      <!-- LADO ESQUERDO (FORMULÁRIO) -->
      <div class="form-left">
        <q-form @submit.prevent="salvarFuncionario" class="form-content">

          <div class="form-field">
            <label>Nome:</label>
            <q-input
              v-model="form.nome"
              outlined
              color="red"
              bg-color="dark"
              input-class="text-white"
            />
          </div>

          <div class="form-field">
            <label>Cargo:</label>
            <q-input
              v-model="form.cargo"
              outlined
              color="red"
              bg-color="dark"
              input-class="text-white"
            />
          </div>

          <div class="form-field">
            <label>Telefone:</label>
            <q-input
              v-model="form.telefone"
              outlined
              color="red"
              bg-color="dark"
              input-class="text-white"
            />
          </div>

          <div class="btn-group">
            <q-btn label="SALVAR" color="green" class="q-mr-sm" @click="salvarFuncionario" />
            <q-btn label="CANCELAR" color="red" class="q-mr-sm" @click="limparFormulario" />
            <q-btn
              :label="mostrarLista ? 'OCULTAR LISTA' : 'LISTAR FUNCIONÁRIOS'"
              color="primary"
              glossy
              @click="mostrarLista = !mostrarLista"
            />
          </div>
        </q-form>
      </div>

      <!-- LADO DIREITO (LOGO + TÍTULO + LISTA) -->
      <div class="form-right">
        <div class="logo-wrapper">
          <img src="../assets/logo-oeste.png" class="logo-img" />
        </div>

        <!-- TÍTULO COM MESMA FONTE DO CLIENTE -->
        <h2 class="titulo">Gerenciamento de Funcionários</h2>

        <!-- BUSCA -->
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
            <q-btn label="Pesquisar" color="red" glossy />
            <q-btn label="Limpar" color="grey-8" glossy @click="limparBusca" />
          </div>
        </div>

        <!-- LISTA DE FUNCIONÁRIOS -->
        <transition name="fade">
          <div v-if="mostrarLista" class="lista-veiculos">
            <div v-if="funcionariosFiltrados.length === 0" class="nenhum-veiculo">
              Nenhum funcionário encontrado.
            </div>

            <div
              v-for="f in funcionariosFiltrados"
              :key="f.id"
              class="veiculo-item"
            >
              <span>{{ f.nome }} - {{ f.cargo }}</span>

              <div class="botoes-acoes">
                <q-btn
                  label="EDITAR"
                  size="sm"
                  color="red"
                  flat
                  dense
                  @click="editar(f)"
                />
                <q-btn
                  label="EXCLUIR"
                  size="sm"
                  color="grey"
                  flat
                  dense
                  @click="excluir(f.id)"
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFuncionariosStore } from 'src/stores/funcionarios-store'

const store = useFuncionariosStore()

onMounted(() => {
  store.carregar()
})

const form = ref({
  id: null,
  nome: '',
  cargo: '',
  telefone: ''
})

const mostrarLista = ref(false)
const busca = ref('')

const funcionariosFiltrados = computed(() => {
  const lista = store.lista
  if (!busca.value.trim()) return lista

  const termo = busca.value.toLowerCase()
  return lista.filter(f =>
    `${f.nome} ${f.cargo} ${f.telefone}`.toLowerCase().includes(termo)
  )
})

async function salvarFuncionario () {
  if (!form.value.nome || !form.value.cargo) {
    alert('Preencha todos os campos obrigatórios!')
    return
  }

  await store.salvar(form.value)
  limparFormulario()
}

function editar (f) {
  form.value = { ...f }
}

async function excluir (id) {
  if (confirm('Deseja realmente excluir?')) {
    await store.excluir(id)
  }
}

function limparFormulario () {
  form.value = { id: null, nome: '', cargo: '', telefone: '' }
}

function limparBusca () {
  busca.value = ''
}
</script>

<style scoped>

.veiculo-container {
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

/* TÍTULO IGUAL AO CLIENTE */
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

.lista-veiculos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.veiculo-item {
  display: flex;
  justify-content: space-between;
  background: rgba(70, 70, 70, 0.85);
  padding: 12px 15px;
  border-radius: 8px;
  transition: 0.3s;
}

.veiculo-item:hover {
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
