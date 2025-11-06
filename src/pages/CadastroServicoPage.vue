<template>
  <!-- Container geral da página, com fundo e centralização -->
  <div class="cadastro-servico-container q-pa-md flex flex-center">

    <!-- Card onde fica o formulário -->
    <q-card class="form-card">

      <!-- Cabeçalho do formulário -->
      <div class="cabecalho text-center">
        <h2 class="titulo">Cadastro de Serviço</h2>
        <!-- Linha separadora vermelha para efeito visual -->
        <q-separator color="red" inset />
      </div>

      <!-- Área dos campos -->
      <div class="q-pa-md">
        
        <!-- Campo para nome do serviço -->
        <q-input
          v-model="servico.nome"
          label="Nome do Serviço"
          filled
          dense
          standout="bg-red-10 text-white"
          class="q-mb-md"
        />

        <!-- Campo para preço -->
        <q-input
          v-model="servico.preco"
          label="Preço (R$)"
          type="number"
          filled
          dense
          standout="bg-red-10 text-white"
          class="q-mb-md"
        />

        <!-- Campo para tempo estimado do serviço -->
        <q-input
          v-model="servico.tempo"
          label="Tempo Estimado"
          placeholder="Ex: 45 min, 1 hora..."
          filled
          dense
          standout="bg-red-10 text-white"
          class="q-mb-md"
        />

        <!-- Campo opcional para descrição -->
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

      <!-- Botões: salvar e cancelar -->
      <div class="botoes text-center q-mt-lg">
        <!-- Botão Salvar -->
        <q-btn
          color="green"
          icon="check_circle"
          glossy
          label="Salvar"
          @click="salvarServico"
          class="q-mr-md"
        />

        <!-- Botão Cancelar -->
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
/*
  Importações necessárias:
  ref = cria variáveis reativas
  useRouter = permite navegar entre páginas
*/
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Usando roteador para voltar ou ir para outra tela
const router = useRouter()

/*
  Objeto reativo que representa os dados do serviço
  v-model preenche esses valores conforme o usuário digita
*/
const servico = ref({
  nome: '',
  preco: '',
  tempo: '',
  descricao: ''
})

/*
  Função para salvar o serviço
  - valida se os campos obrigatórios estão preenchidos
  - exibe mensagem de sucesso
  - retorna para a listagem de serviços
*/
const salvarServico = () => {
  if (!servico.value.nome || !servico.value.preco || !servico.value.tempo) {
    alert('Por favor, preencha todos os campos obrigatórios.')
    return
  }

  console.log('Serviço cadastrado:', servico.value) // Apenas para simulação
  alert('Serviço cadastrado com sucesso!')
  router.push('/servico')
}

/*
  Função chamada ao clicar em CANCELAR
  - simplesmente volta para tela anterior
*/
const voltar = () => {
  router.push('/servico')
}
</script>

<style scoped>
/* Fundo e centralização do formulário */
.cadastro-servico-container {
  background: linear-gradient(135deg, #1b1b1b 40%, #a60000);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Card do formulário */
.form-card {
  width: 450px;
  background: rgba(25, 25, 25, 0.95);
  box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
  border-radius: 15px;
  padding: 20px;
  transition: 0.3s;
}

/* Efeito hover para dar modernidade */
.form-card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 35px rgba(255, 0, 0, 0.6);
}

/* Título do card */
.titulo {
  color: white;
  text-shadow: 0 0 10px red;
  font-weight: 600;
}

/* Garantindo que os textos dos inputs fiquem brancos */
.q-field__native,
.q-field__label {
  color: #fff !important;
}

/* Define largura dos botões */
.botoes q-btn {
  width: 120px;
}
</style>
