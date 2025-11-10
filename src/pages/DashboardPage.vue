<template>
  <div class="dashboard-container q-pa-md">

    <!-- Cabeçalho -->
    <div class="header-dashboard q-mb-md">
      <h3 class="titulo-bemvindo">
        Bem-vindo, <span class="destaque">{{ usuarioNome }}</span>
      </h3>
      <p class="sub-bemvindo">Resumo geral do sistema</p>
    </div>

    <!-- Cards principais -->
    <div class="grid-dashboard">
      <q-card class="card-info">
        <div class="card-title">Total de Clientes</div>
        <div class="card-value">{{ totalClientes }}</div>
      </q-card>

      <q-card class="card-info">
        <div class="card-title">Total de Veículos</div>
        <div class="card-value">{{ totalVeiculos }}</div>
      </q-card>

      <q-card class="card-info">
        <div class="card-title">Serviços Realizados</div>
        <div class="card-value">{{ totalServicos }}</div>
      </q-card>

      <q-card class="card-info">
        <div class="card-title">Faturamento Anual</div>
        <div class="card-value">R$ {{ faturamentoAnual.toLocaleString() }}</div>
      </q-card>
    </div>

    <!-- Gráficos -->
    <div class="charts-row q-mt-lg">
      <q-card class="chart-card">
        <div class="chart-header">Faturamento Mensal</div>
        <canvas id="chartMensal"></canvas>
      </q-card>

      <q-card class="chart-card">
        <div class="chart-header">Pagamentos / Mês</div>
        <canvas id="chartPagamentos"></canvas>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useClienteStore } from 'src/stores/clientes-store'
import { useVeiculoStore } from 'src/stores/veiculo'
import { useServicoStore } from 'src/stores/servico'
import Chart from 'chart.js/auto'

// Nome do usuário
const usuarioNome = ref(localStorage.getItem('usuarioNome') || 'Usuário')

// Conecta aos stores
const clienteStore = useClienteStore()
const veiculoStore = useVeiculoStore()
const servicoStore = useServicoStore()

// Totais automáticos
const totalClientes = computed(() => clienteStore.clientes.length)
const totalVeiculos = computed(() => veiculoStore.veiculos.length)
const totalServicos = computed(() => servicoStore.servicos.length)
const faturamentoAnual = ref(0)

// Atualiza dados ao montar a página
async function carregarDados() {
  await clienteStore.getClientes()
  await veiculoStore.getVeiculos()
  await servicoStore.getServicos()

  // Exemplo: somar valores de serviços (caso tenha "valor" no JSON)
  faturamentoAnual.value = servicoStore.servicos.reduce(
    (soma, item) => soma + (item.valor || 0),
    0
  )
}

// Gráficos
const dadosMensais = {
  labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  datasets: [{
    label: 'Faturamento (R$)',
    data: [12000,13500,11000,14500,13200,15000,12500,11900,14000,15500,16000,17500],
    backgroundColor: '#ff0000'
  }]
}

const dadosPagamentos = {
  labels: ['Crédito','PIX','Débito','Cheque'],
  datasets: [{
    label: 'Pagamentos (R$)',
    data: [45523,40612,38849,23459],
    backgroundColor: ['#ff4444','#ff8800','#33b5e5','#aaa']
  }]
}

onMounted(() => {
  carregarDados()

  // Renderiza os gráficos
  new Chart(document.getElementById('chartMensal'), { type: 'bar', data: dadosMensais })
  new Chart(document.getElementById('chartPagamentos'), { type: 'doughnut', data: dadosPagamentos })
})
</script>

<style scoped>
.dashboard-container {
  background: linear-gradient(135deg, #1b1b1b 40%, #a60000);
  min-height: 100vh;
  color: white;
  font-family: Poppins, sans-serif;
}

.header-dashboard {
  text-align: left;
}

.titulo-bemvindo {
  font-size: 1.5rem;
  font-weight: 600;
}

.destaque {
  color: #ff3b3b;
}

.sub-bemvindo {
  font-size: 0.9rem;
  color: #ccc;
  margin-top: -4px;
}

.grid-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
}

.card-info {
  background: rgba(20, 20, 20, 0.9);
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
}

.charts-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.chart-card {
  flex: 1;
  background: rgba(30, 30, 30, 0.95);
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
  min-width: 350px;
}

.chart-header {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 8px;
}
</style>
