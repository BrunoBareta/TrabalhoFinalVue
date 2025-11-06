<template>
  <div class="dashboard-container q-pa-md">

    <!-- Cabeçalho -->
    <div class="header-dashboard q-mb-md">
      <h3 class="titulo-bemvindo">
        Bem-vindo, <span class="destaque">{{ usuarioNome }}</span> 👋
      </h3>
      <p class="sub-bemvindo">Resumo geral do sistema</p>
    </div>

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

      <q-card class="card-info">
        <div class="card-title">Faturamento Anual</div>
        <div class="card-value">R$ 1.250.000</div>
      </q-card>
    </div>

    <!-- Gráficos linha 01 -->
    <div class="charts-row q-mt-lg">
      <q-card class="chart-card">
        <div class="chart-header">📊 Faturamento Mensal</div>
        <canvas id="chartMensal"></canvas>
      </q-card>

      <q-card class="chart-card">
        <div class="chart-header">💳 Pagamentos / Mês</div>
        <canvas id="chartPagamentos"></canvas>
      </q-card>
    </div>

    <!-- Rankings -->
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

    <!-- Contas / Resumo financeiro -->
    <div class="charts-row q-mt-lg">
      <q-card class="chart-card contas-card">
        <div class="chart-header">💰 Contas a Pagar / Receber</div>

        <div class="barra-progresso q-mt-md">
          <span>Receber</span>
          <q-linear-progress size="20px" :value="0.62" color="green" class="q-mt-sm" />
          <span class="percent">62%</span>
        </div>

        <div class="barra-progresso q-mt-md">
          <span>Pagar</span>
          <q-linear-progress size="20px" :value="0.38" color="red" class="q-mt-sm" />
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

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const usuarioNome = ref(localStorage.getItem("usuarioNome") || "Usuário");

const dadosMensais = {
  labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  datasets: [{
    label: 'Faturamento (R$)',
    data: [12000,13500,11000,14500,13200,15000,12500,11900,14000,15500,16000,17500],
    backgroundColor: '#ff0000'
  }]
};

const dadosPagamentos = {
  labels: ['Crédito','PIX','Débito','Cheque'],
  datasets: [{
    label: 'Pagamentos (R$)',
    data: [45523,40612,38849,23459],
    backgroundColor: ['#ff4444','#ff8800','#33b5e5','#aaa']
  }]
};

const rankingFuncionarios = ref([
  { nome: 'Jorge', servicos: 45 },
  { nome: 'Marcos', servicos: 39 },
  { nome: 'Bruno', servicos: 37 },
  { nome: 'Ana', servicos: 33 },
]);

const rankingClientes = ref([
  { nome: 'Bruno Bareta', valor: 15500 },
  { nome: 'Igor Haas', valor: 14200 },
  { nome: 'Felipe Damo', valor: 12800 },
]);

onMounted(() => {
  new Chart(document.getElementById("chartMensal"), { type: "bar", data: dadosMensais });
  new Chart(document.getElementById("chartPagamentos"), { type: "doughnut", data: dadosPagamentos });
});
</script>

<style scoped>
.dashboard-container {
  background: linear-gradient(135deg,#1b1b1b 40%,#a60000);
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
  font-size: .9rem;
  color: #ccc;
  margin-top: -4px;
}

.grid-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
  gap: 15px;
}

.card-info {
  background: rgba(20,20,20,.9);
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255,0,0,.4);
}

/* Cards da dashboard */
.charts-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.chart-card {
  flex: 1;
  background: rgba(30,30,30,.95);
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255,0,0,.4);
  min-width: 350px;
}

.chart-header {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 8px;
}

/* Rankings */
.ranking-list {
  list-style: none;
  padding: 0;
}

.ranking-list li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
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
  margin-bottom: 6px;
}
</style>
