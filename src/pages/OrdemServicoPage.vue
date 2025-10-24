<template>
  <div class="ordem-servico-container">
    <div class="form-container">
      <!-- Coluna esquerda: campos -->
      <div class="form-left">
        <q-form @submit.prevent="salvarOrdem" class="form-content">
          <div class="form-field">
            <label>Data de Abertura:</label>
            <q-input
              v-model="ordem.dataAbertura"
              outlined
              color="red"
              bg-color="dark"
              input-class="text-white"
              placeholder="dd/mm/aaaa"
              @blur="validarData('abertura')"
            />
          </div>

          <div class="form-field">
            <label>Data de Fechamento:</label>
            <q-input
              v-model="ordem.dataFechamento"
              outlined
              color="red"
              bg-color="dark"
              input-class="text-white"
              placeholder="dd/mm/aaaa"
              @blur="validarData('fechamento')"
            />
          </div>

          <div class="form-field">
            <label>Cliente:</label>
            <q-input v-model="ordem.cliente" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Veículo:</label>
            <q-input v-model="ordem.veiculo" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Funcionário:</label>
            <q-input v-model="ordem.funcionario" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="form-field">
            <label>Serviço:</label>
            <q-input v-model="ordem.servico" outlined color="red" bg-color="dark" input-class="text-white" />
          </div>

          <div class="btn-group">
            <q-btn label="Salvar" color="green" glossy @click="salvarOrdem" />
            <q-btn label="Cancelar" color="red" glossy class="q-ml-sm" @click="cancelar" />
          </div>
        </q-form>
      </div>

      <!-- Coluna direita: logo e busca -->
      <div class="form-right">
        <div class="logo-wrapper">
          <h2 class="titulo">Ordem de Serviço</h2>
          <img src="../assets/logo-oeste.png" alt="Oeste Auto Center" class="logo-img" />
        </div>

        <div class="busca-servico">
          <h3 class="subtitulo">Buscar Serviço</h3>
          <q-input
            v-model="buscaServico"
            outlined
            color="red"
            bg-color="dark"
            placeholder="Digite o nome do serviço..."
            input-class="text-white"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ordem = ref({
  dataAbertura: '',
  dataFechamento: '',
  cliente: '',
  veiculo: '',
  funcionario: '',
  servico: ''
})

const buscaServico = ref('')

function salvarOrdem() {
  if (
    ordem.value.dataAbertura &&
    ordem.value.cliente &&
    ordem.value.veiculo &&
    ordem.value.funcionario &&
    ordem.value.servico
  ) {
    alert('Ordem de Serviço salva com sucesso!')
    cancelar()
  } else {
    alert('Preencha todos os campos obrigatórios!')
  }
}

function cancelar() {
  ordem.value = {
    dataAbertura: '',
    dataFechamento: '',
    cliente: '',
    veiculo: '',
    funcionario: '',
    servico: ''
  }
  buscaServico.value = ''
}

function validarData(campo) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/
  const valor = campo === 'abertura' ? ordem.value.dataAbertura : ordem.value.dataFechamento

  if (valor && !regex.test(valor)) {
    alert('Data inválida! Use o formato dd/mm/aaaa.')
    if (campo === 'abertura') ordem.value.dataAbertura = ''
    else ordem.value.dataFechamento = ''
  }
}
</script>

<style scoped>
.ordem-servico-container {
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
  background: rgba(40, 40, 40, 0.95);
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
  font-weight: 500;
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
}

.logo-img {
  width: 100%;
  max-width: 320px;
  border-radius: 12px;
  margin-top: 10px;
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.4);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.logo-img:hover {
  transform: scale(1.05);
  box-shadow: 0 0 45px rgba(255, 0, 0, 0.6);
}

.titulo {
  font-family: 'Brush Script MT', cursive;
  font-size: 2.4rem;
  color: #fff;
  margin-bottom: 10px;
}

.subtitulo {
  font-family: 'Brush Script MT', cursive;
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-bottom: 15px;
}

.busca-servico {
  margin-top: 20px;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  gap: 15px;
}
</style>
