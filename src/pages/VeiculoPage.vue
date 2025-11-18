<template>
  <div class="veiculo-container">
    <div class="form-container">

      <!-- FORMULÁRIO (lado esquerdo) -->
      <div class="form-left">
        <q-form @submit.prevent="salvarVeiculo" class="form-content">

          <div class="form-field">
            <label>Cliente:</label>
            <q-input
              v-model="veiculo.cliente"
              outlined
              color="red"
              bg-color="dark"
              input-class="text-white"
            />
          </div>

          <div class="form-field">
            <label>Modelo:</label>
            <q-input
              v-model="veiculo.modelo"
              outlined
              color="red"
              bg-color="dark"
              input-class="text-white"
            />
          </div>

          <div class="form-field">
            <label>Placa:</label>
            <q-input
              v-model="veiculo.placa"
              outlined
              color="red"
              bg-color="dark"
              input-class="text-white"
            />
          </div>

          <div class="form-field">
            <label>Ano:</label>
            <q-input
              v-model="veiculo.ano"
              outlined
              color="red"
              bg-color="dark"
              input-class="text-white"
            />
          </div>

          <div class="btn-group">
            <q-btn label="SALVAR" color="green" class="q-mr-sm" @click="salvarVeiculo" />
            <q-btn label="CANCELAR" color="red" class="q-mr-sm" @click="cancelar" />
            <q-btn
              :label="mostrarLista ? 'OCULTAR LISTA' : 'LISTAR VEÍCULOS'"
              color="primary"
              glossy
              @click="mostrarLista = !mostrarLista"
            />
          </div>
        </q-form>
      </div>

      <!-- LADO DIREITO -->
      <div class="form-right">
        <div class="logo-wrapper">
          <img src="../assets/logo-oeste.png" class="logo-img" />
        </div>

        <!-- TÍTULO IGUAL AO DA TELA DE CLIENTE -->
        <h2 class="titulo">Gerenciamento de Veículos</h2>

        <!-- BUSCA -->
        <div v-if="mostrarLista" class="search-container">
          <q-input
            v-model="busca"
            outlined
            color="red"
            bg-color="dark"
            placeholder="Pesquisar veículo..."
            input-class="text-white"
            dense
          />
          <div class="search-buttons">
            <q-btn label="Pesquisar" color="red" glossy />
            <q-btn label="Limpar" color="grey-8" glossy @click="limparBusca" />
          </div>
        </div>

        <!-- LISTAGEM -->
        <transition name="fade">
          <div v-if="mostrarLista" class="lista-veiculos">
            <div v-if="veiculosFiltrados.length === 0" class="nenhum-veiculo">
              Nenhum veículo encontrado.
            </div>

            <div v-for="v in veiculosFiltrados" :key="v.id" class="veiculo-item">
              <span>{{ v.modelo }} - {{ v.placa }} ({{ v.ano }})</span>

              <div class="botoes-acoes">
                <q-btn
                  label="EDITAR"
                  size="sm"
                  color="red"
                  flat
                  dense
                  @click="editarVeiculo(v)"
                />
                <q-btn
                  label="EXCLUIR"
                  size="sm"
                  color="grey"
                  flat
                  dense
                  @click="excluirVeiculo(v.id)"
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
import { useVeiculoStore } from '../stores/veiculo'

const veiculoStore = useVeiculoStore()

onMounted(() => {
  veiculoStore.getVeiculos()
})

const veiculo = ref({
  id: null,
  cliente: '',
  modelo: '',
  placa: '',
  ano: ''
})

const mostrarLista = ref(false)
const busca = ref('')

const veiculosFiltrados = computed(() => {
  if (!busca.value.trim()) {
    return veiculoStore.veiculos
  }

  const termo = busca.value.toLowerCase()

  return veiculoStore.veiculos.filter(v =>
    `${v.modelo} ${v.placa} ${v.cliente} ${v.ano}`.toLowerCase().includes(termo)
  )
})

async function salvarVeiculo () {
  if (!veiculo.value.cliente || !veiculo.value.modelo || !veiculo.value.placa) {
    alert('Preencha os campos obrigatórios!')
    return
  }

  if (veiculo.value.id) {
    await veiculoStore.putVeiculo(veiculo.value.id, veiculo.value)
  } else {
    await veiculoStore.postVeiculo(veiculo.value)
  }

  limparFormulario()
}

function editarVeiculo (v) {
  veiculo.value = { ...v }
}

async function excluirVeiculo (id) {
  if (confirm('Deseja realmente excluir este veículo?')) {
    await veiculoStore.deleteVeiculo(id)
  }
}

function cancelar () {
  limparFormulario()
}

function limparFormulario () {
  veiculo.value = {
    id: null,
    cliente: '',
    modelo: '',
    placa: '',
    ano: ''
  }
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
