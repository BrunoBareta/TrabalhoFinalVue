<template>
  <div class="dashboard-container q-pa-md">
    <h1 class="titulo">Painel de Controle</h1>

    <!-- Cards principais -->
    <div class="grid-dashboard">
      <q-card class="card-info">
        <div class="card-title">Total de Clientes</div>
        <div class="card-value">8.498</div>
      </q-card>

      <q-card class="card-info">
        <div class="card-title">Total de Veículos</div>
        <div class="card-value">10.568</div>
      </q-card>

      <q-card class="card-info">
        <div class="card-title">Serviços Realizados</div>
        <div class="card-value">14.895</div>
      </q-card>

      <q-card class="card-info card-clickable" @click="abrirGrafico('faturamento')">
        <div class="card-title">Faturamento Anual</div>
        <div class="card-value">R$ 1.250.000</div>
      </q-card>
    </div>

    <!-- Linha de gráficos -->
    <div class="charts-row q-mt-lg">
      <q-card class="chart-card" @click="abrirGrafico('mensal')">
        <div class="chart-header">📊 Faturamento Mensal</div>
        <canvas id="chartMensal"></canvas>
      </q-card>

      <q-card class="chart-card" @click="abrirGrafico('pagamentos')">
        <div class="chart-header">💳 Pagamentos / Mês</div>
        <canvas id="chartPagamentos"></canvas>
      </q-card>
    </div>

    <!-- Linha de rankings -->
    <div class="charts-row q-mt-lg">
      <q-card class="chart-card ranking-card">
        <div class="chart-header">🏆 Ranking de Funcionários</div>
        <ul class="ranking-list">
          <li v-for="(item, i) in rankingFuncionarios" :key="i">
            <span>{{ i + 1 }}. {{ item.nome }}</span>
            <span class="valor">{{ item.servicos }} serviços</span>
          </li>
        </ul>
      </q-card>

      <q-card class="chart-card ranking-card">
        <div class="chart-header">👥 Ranking de Clientes</div>
        <ul class="ranking-list">
          <li v-for="(item, i) in rankingClientes" :key="i">
            <span>{{ i + 1 }}. {{ item.nome }}</span>
            <span class="valor">R$ {{ item.valor.toLocaleString() }}</span>
          </li>
        </ul>
      </q-card>
    </div>

    <!-- Contas a pagar/receber -->
    <div class="charts-row q-mt-lg">
      <q-card class="chart-card contas-card">
        <div class="chart-header">💰 Contas a Pagar / Receber</div>

        <div class="barra-progresso q-mt-md">
          <span>Receber</span>
          <q-linear-progress
            size="20px"
            :value="0.62"
            color="green"
            class="q-mt-sm"
          />
          <span class="percent">62%</span>
        </div>

        <div class="barra-progresso q-mt-md">
          <span>Pagar</span>
          <q-linear-progress
            size="20px"
            :value="0.38"
            color="red"
            class="q-mt-sm"
          />
          <span class="percent">38%</span>
        </div>
      </q-card>

      <q-card class="chart-card resumo-card">
        <div class="chart-header">📈 Resumo Financeiro</div>
        <div class="resumo-item">
          <span>Lucro Bruto:</span>
          <span class="valor">R$ 580.000</span>
        </div>
        <div class="resumo-item">
          <span>Despesas Totais:</span>
          <span class="valor vermelho">R$ 230.000</span>
        </div>
        <div class="resumo-item">
          <span>Lucro Líquido:</span>
          <span class="valor verde">R$ 350.000</span>
        </div>
      </q-card>
    </div>

    <!-- Modal de gráfico em tela cheia -->
    <q-dialog v-model="mostrarGrafico" maximized>
      <q-card class="bg-dark text-white">
        <div class="q-pa-md">
          <div class="row justify-between items-center">
            <h3>{{ tituloGrafico }}</h3>
            <q-btn label="Fechar" color="red" @click="mostrarGrafico = false" />
          </div>

          <div v-if="graficoAtual">
            <canvas id="graficoTelaCheia" style="height: 400px;"></canvas>
          </div>

          <div v-else class="text-center q-mt-md text-grey">
            <q-spinner color="red" size="40px" />
            <div>Carregando dados...</div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const mostrarGrafico = ref(false)
const graficoAtual = ref(null)
const tituloGrafico = ref('')

// eslint-disable-next-line no-unused-vars
let chartMensal = null
// eslint-disable-next-line no-unused-vars
let chartPagamentos = null
let chartTelaCheia = null

// Dados simulados
const dadosMensais = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  datasets: [{
    label: 'Faturamento (R$)',
    data: [12000, 13500, 11000, 14500, 13200, 15000, 12500, 11900, 14000, 15500, 16000, 17500],
    backgroundColor: '#ff0000'
  }]
}

const dadosPagamentos = {
  labels: ['Crédito', 'PIX', 'Débito', 'Cheque'],
  datasets: [{
    label: 'Pagamentos (R$)',
    data: [45523.20, 40612.03, 38849.59, 23459.14],
    backgroundColor: ['#ff4444', '#ff8800', '#33b5e5', '#aaa']
  }]
}

const rankingFuncionarios = ref([
  { nome: 'Jorge', servicos: 45 },
  { nome: 'Marcos', servicos: 39 },
  { nome: 'Adriano', servicos: 33 },
  { nome: 'Bruno', servicos: 31 },
  { nome: 'Ana', servicos: 28 },
  { nome: 'Letícia', servicos: 27 }
])

const rankingClientes = ref([
  { nome: 'Bruno Bareta', valor: 15500 },
  { nome: 'Igor Haas', valor: 14200 },
  { nome: 'Felipe Damo', valor: 12800 },
  { nome: 'João Vitor', valor: 11800 },
  { nome: 'Mariano', valor: 11300 },
  { nome: 'Gustavo', valor: 10800 }
])

// Abre gráfico em tela cheia
const abrirGrafico = async (tipo) => {
  mostrarGrafico.value = true
  graficoAtual.value = null
  tituloGrafico.value = tipo === 'pagamentos' ? 'Pagamentos Recebidos' : 'Faturamento ao Longo do Tempo'

  await nextTick()
  const ctx = document.getElementById('graficoTelaCheia')

  if (chartTelaCheia) chartTelaCheia.destroy()

  const data = tipo === 'pagamentos' ? dadosPagamentos : dadosMensais

  chartTelaCheia = new Chart(ctx, {
    type: tipo === 'pagamentos' ? 'doughnut' : 'bar',
    data,
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#fff' } }
      },
      scales: {
        x: { ticks: { color: '#fff' } },
        y: { ticks: { color: '#fff' } }
      }
    }
  })

  graficoAtual.value = tipo
}

// Renderiza gráficos principais
onMounted(() => {
  const ctx1 = document.getElementById('chartMensal')
  const ctx2 = document.getElementById('chartPagamentos')

  chartMensal = new Chart(ctx1, { type: 'bar', data: dadosMensais })
  chartPagamentos = new Chart(ctx2, { type: 'doughnut', data: dadosPagamentos })
})
</script>

<style scoped>
.dashboard-container {
  background: linear-gradient(135deg, #1b1b1b 40%, #a60000);
  min-height: 100vh;
  color: white;
  font-family: 'Poppins', sans-serif;
}

.titulo {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
}

.grid-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card-info {
  background: rgba(20, 20, 20, 0.9);
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  transition: 0.3s;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
}

.card-info:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.6);
}

.chart-card {
  flex: 1;
  background: rgba(30, 30, 30, 0.95);
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.3s;
}

.chart-card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 25px rgba(255, 0, 0, 0.6);
}

.chart-header {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
}

.charts-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.ranking-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ranking-list li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.valor {
  color: #ff4d4d;
}

.verde {
  color: #00ff88;
}

.vermelho {
  color: #ff4d4d;
}

.resumo-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.percent {
  font-size: 0.9rem;
  margin-left: 10px;
}
</style>
