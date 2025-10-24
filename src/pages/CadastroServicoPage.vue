<template>
  <div class="cadastro-servico-container q-pa-md flex flex-center">
    <q-card class="form-card">
      <div class="cabecalho text-center">
        <h2 class="titulo">Cadastro de Serviço</h2>
        <q-separator color="red" inset />
      </div>

      <div class="q-pa-md">
        <q-input
          v-model="servico.nome"
          label="Nome do Serviço"
          filled
          dense
          standout="bg-red-10 text-white"
          class="q-mb-md"
        />

        <q-input
          v-model="servico.preco"
          label="Preço (R$)"
          type="number"
          filled
          dense
          standout="bg-red-10 text-white"
          class="q-mb-md"
        />

        <q-input
          v-model="servico.tempo"
          label="Tempo Estimado"
          placeholder="Ex: 45 min, 1 hora..."
          filled
          dense
          standout="bg-red-10 text-white"
          class="q-mb-md"
        />

        <q-input
          v-model="servico.descricao"
          label="Descrição (opcional)"
          type="textarea"
          autogrow
          filled
          dense
          standout="bg-red-10 text-white"
        />
      </div>

      <div class="botoes text-center q-mt-lg">
        <q-btn
          color="green"
          icon="check_circle"
          glossy
          label="Salvar"
          @click="salvarServico"
          class="q-mr-md"
        />
        <q-btn
          color="red"
          icon="close"
          glossy
          label="Cancelar"
          @click="voltar"
        />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const servico = ref({
  nome: '',
  preco: '',
  tempo: '',
  descricao: ''
})

const salvarServico = () => {
  if (!servico.value.nome || !servico.value.preco || !servico.value.tempo) {
    alert('Por favor, preencha todos os campos obrigatórios.')
    return
  }
  console.log('Serviço cadastrado:', servico.value)
  alert('Serviço cadastrado com sucesso!')
  router.push('/servico')
}

const voltar = () => {
  router.push('/servico')
}
</script>

<style scoped>
.cadastro-servico-container {
  background: linear-gradient(135deg, #1b1b1b 40%, #a60000);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-card {
  width: 450px;
  background: rgba(25, 25, 25, 0.95);
  box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
  border-radius: 15px;
  padding: 20px;
  transition: 0.3s;
}

.form-card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 35px rgba(255, 0, 0, 0.6);
}

.titulo {
  color: white;
  text-shadow: 0 0 10px red;
  font-weight: 600;
}

.q-input {
  color: white;
}

.q-field__native,
.q-field__label {
  color: #fff !important;
}

.botoes q-btn {
  width: 120px;
}
</style>
