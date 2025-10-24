<template>
  <div class="veiculo-container">
    <div class="form-container">
      <!-- Lado esquerdo -->
      <div class="form-left">
        <q-form @submit.prevent="salvarVeiculo" class="form-content">
          <div class="form-field">
            <label>Cliente:</label>
            <q-input v-model="veiculo.cliente" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Modelo:</label>
            <q-input v-model="veiculo.modelo" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Placa:</label>
            <q-input v-model="veiculo.placa" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Ano:</label>
            <q-input v-model="veiculo.ano" outlined color="red" bg-color="dark" input-class="text-white" />
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

      <!-- Lado direito -->
      <div class="form-right">
        <div class="logo-wrapper">
          <img src="../assets/logo-oeste.png" alt="Oeste Auto Center" class="logo-img" />
        </div>
        <h2 class="titulo">Gerenciamento de Veículos</h2>

        <!-- Campo de busca -->
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
            <q-btn label="Pesquisar" color="red" glossy @click="filtrarVeiculos" />
            <q-btn label="Limpar" color="grey-8" glossy @click="limparBusca" />
          </div>
        </div>

        <!-- Lista -->
        <transition name="fade">
          <div v-if="mostrarLista" class="lista-veiculos">
            <div v-if="veiculosFiltrados.length === 0" class="nenhum-veiculo">Nenhum veículo encontrado.</div>
            <div v-for="(v, i) in veiculosFiltrados" :key="i" class="veiculo-item">
              <span>{{ v.modelo }} - {{ v.placa }} ({{ v.ano }})</span>
              <div class="botoes-acoes">
                <q-btn label="EDITAR" size="sm" color="red" flat dense @click="editarVeiculo(v)" />
                <q-btn label="EXCLUIR" size="sm" color="grey" flat dense @click="excluirVeiculo(i)" />
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

const veiculo = ref({
  cliente: '',
  modelo: '',
  placa: '',
  ano: ''
})

const mostrarLista = ref(false)

const listaVeiculos = ref([
  { cliente: 'Bruno Bareta', modelo: 'Volkswagen Golf GTI', placa: 'ABC-1234', ano: '2020' },
  { cliente: 'Igor Haas', modelo: 'BMW 320i', placa: 'XYZ-4321', ano: '2021' },
  { cliente: 'Felipe Dano', modelo: 'Chevrolet Onix LTZ', placa: 'JKL-8899', ano: '2019' },
  { cliente: 'Lucas Martins', modelo: 'Fiat Argo', placa: 'QWE-5566', ano: '2020' },
  { cliente: 'Camila Souza', modelo: 'Toyota Corolla', placa: 'TYU-7788', ano: '2022' },
  { cliente: 'Juliana Ramos', modelo: 'Honda Civic', placa: 'CVX-2211', ano: '2021' },
  { cliente: 'Carlos Andrade', modelo: 'Ford Focus', placa: 'FOR-8899', ano: '2018' },
  { cliente: 'Ana Paula', modelo: 'Nissan Kicks', placa: 'NIS-1010', ano: '2023' },
  { cliente: 'Rafael Lima', modelo: 'Hyundai HB20', placa: 'HYU-9090', ano: '2022' },
  { cliente: 'Patrícia Torres', modelo: 'Jeep Renegade', placa: 'JPP-3030', ano: '2021' }
])

const busca = ref('')
const veiculosFiltrados = ref([...listaVeiculos.value])

function salvarVeiculo() {
  if (veiculo.value.modelo && veiculo.value.placa && veiculo.value.cliente) {
    listaVeiculos.value.push({ ...veiculo.value })
    veiculosFiltrados.value = [...listaVeiculos.value]
    veiculo.value = { cliente: '', modelo: '', placa: '', ano: '' }
    alert('Veículo salvo com sucesso!')
  } else {
    alert('Preencha os campos obrigatórios!')
  }
}

function editarVeiculo(v) {
  veiculo.value = { ...v }
}

function excluirVeiculo(index) {
  if (confirm('Deseja realmente excluir este veículo?')) {
    listaVeiculos.value.splice(index, 1)
    veiculosFiltrados.value = [...listaVeiculos.value]
    alert('Veículo excluído com sucesso!')
  }
}

function cancelar() {
  veiculo.value = { cliente: '', modelo: '', placa: '', ano: '' }
}

function filtrarVeiculos() {
  if (busca.value.trim() === '') {
    veiculosFiltrados.value = [...listaVeiculos.value]
    return
  }
  const termo = busca.value.toLowerCase()
  veiculosFiltrados.value = listaVeiculos.value.filter(v =>
    `${v.modelo} ${v.placa}`.toLowerCase().includes(termo)
  )
}

function limparBusca() {
  busca.value = ''
  veiculosFiltrados.value = [...listaVeiculos.value]
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
