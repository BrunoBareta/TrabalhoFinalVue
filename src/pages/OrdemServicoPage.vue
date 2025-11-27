<template>
  <div class="os-container">
    <div class="form-container">

      <div class="form-left">
        <q-form @submit.prevent="salvarOrdem" class="form-content">

          <h2 class="titulo">Cadastro de Ordem de Serviço</h2>

          <div class="form-field">
            <label>Data de Abertura:</label>
            <q-input v-model="ordem.dataAbertura" outlined color="red" bg-color="dark"
              input-class="text-white" placeholder="dd/mm/aaaa" />
          </div>

          <div class="form-field">
            <label>Data de Fechamento:</label>
            <q-input v-model="ordem.dataFechamento" outlined color="red" bg-color="dark"
              input-class="text-white" placeholder="dd/mm/aaaa" />
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
            <q-btn label="SALVAR" color="green" class="q-mr-sm" @click="salvarOrdem" />
            <q-btn label="CANCELAR" color="red" class="q-mr-sm" @click="cancelar" />
          </div>

        </q-form>
      </div>

      <!-- LADO DIREITO -->
      <div class="form-right">

        <div class="logo-wrapper">
          <img src="../assets/logo-oeste.png" class="logo-img" />
        </div>

        <h2 class="titulo">Buscar Ordem de Serviço</h2>

        <!-- BUSCA -->
        <div class="search-container">
          <q-input
            v-model="buscaServico"
            outlined
            color="red"
            bg-color="dark"
            placeholder="Pesquisar serviço..."
            input-class="text-white"
            dense
          />
        </div>

        <!-- LISTA -->
        <div class="lista-os" v-if="ordensFiltradas.length > 0">
          <q-table
            flat bordered
            :rows="ordensFiltradas"
            :columns="colunas"
            row-key="id"
            class="bg-dark text-white"
          >
            <template #body-cell-acoes="props">
              <q-td align="center">
                <q-btn flat color="orange" icon="edit" @click="abrirEdicao(props.row)" />
                <q-btn flat color="red" icon="delete" @click="excluirOrdem(props.row.id)" />
                <q-btn flat color="green" icon="attach_money" @click="abrirPagamento(props.row)" />
              </q-td>
            </template>
          </q-table>
        </div>

        <div v-else class="nenhum">
          Nenhuma ordem encontrada.
        </div>

      </div>
    </div>

    <!-- ---------------- MODAL DE EDIÇÃO ---------------- -->
    <q-dialog v-model="modalEdicao">
      <q-card class="bg-dark text-white q-pa-lg" style="width: 600px">
        <div class="text-h6 q-mb-md">Editar Ordem de Serviço</div>

        <q-form @submit.prevent="salvarOrdem">
          <q-input v-model="ordem.dataAbertura" label="Data de Abertura" filled class="q-mb-sm" />
          <q-input v-model="ordem.dataFechamento" label="Data de Fechamento" filled class="q-mb-sm" />
          <q-input v-model="ordem.cliente" label="Cliente" filled class="q-mb-sm" />
          <q-input v-model="ordem.veiculo" label="Veículo" filled class="q-mb-sm" />
          <q-input v-model="ordem.funcionario" label="Funcionário" filled class="q-mb-sm" />
          <q-input v-model="ordem.servico" label="Serviço" filled class="q-mb-sm" />

          <div class="row justify-end q-gutter-md q-mt-lg">
            <q-btn type="submit" color="green" glossy label="Salvar" />
            <q-btn color="red" glossy label="Cancelar" @click="modalEdicao = false" />
          </div>
        </q-form>
      </q-card>
    </q-dialog>

    <!-- ---------------- MODAL DE PAGAMENTO ---------------- -->
    <q-dialog v-model="modalPagamento">
      <q-card class="bg-dark text-white q-pa-lg" style="width: 450px">

        <q-card-section>
          <div class="text-h6 text-bold">Pagamento</div>

          <div class="text-grey-4">
          
            Cliente: {{ ordemSelecionada?.cliente }}<br>
            Veículo: {{ ordemSelecionada?.veiculo }}<br>
            Serviço: {{ ordemSelecionada?.servico }}<br>
            Funcionário: {{ ordemSelecionada?.funcionario }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="valorServico"
            outlined
            color="green"
            type="number"
            label="Valor do Serviço (R$)"
            class="q-mb-md"
          />

          <q-select
            v-model="formaPagamento"
            outlined
            label="Forma de Pagamento"
            :options="['PIX', 'Dinheiro', 'Crédito', 'Débito']"
            color="green"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="red" v-close-popup />
          <q-btn flat label="Confirmar Pagamento" color="green" @click="confirmarPagamento" />
        </q-card-actions>

      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import OrdemServicoService from "src/services/OrdemServico.js";
import PagamentoService from "src/services/PagamentoService.js";

/* FORM DATA */
const ordem = ref({
  dataAbertura: "",
  dataFechamento: "",
  cliente: "",
  veiculo: "",
  funcionario: "",
  servico: ""
});

const buscaServico = ref("");
const modalEdicao = ref(false);
const modalPagamento = ref(false);
const formaPagamento = ref("");
const valorServico = ref("");
const ordemSelecionada = ref(null);

const ordens = ref([]);

/* TABELA */
const colunas = [
  
  { name: "cliente", label: "Cliente", field: "cliente" },
  { name: "veiculo", label: "Veículo", field: "veiculo" },
  { name: "funcionario", label: "Funcionário", field: "funcionario" },
  { name: "servico", label: "Serviço", field: "servico" },
  { name: "acoes", label: "Ações", align: "center" }
];

const ordensFiltradas = computed(() => {
  return ordens.value.filter(os =>
    (os.servico || "").toLowerCase().includes(buscaServico.value.toLowerCase())
  );
});

/* CARREGAR */
onMounted(() => {
  carregarOrdens();
});

async function carregarOrdens() {
  try {
    const r = await OrdemServicoService.listar();
    ordens.value = r.data;
  } catch (e) {
    console.error("Erro ao carregar:", e);
  }
}

/* SALVAR */
async function salvarOrdem() {
  const os = { ...ordem.value };

  if (!os.dataAbertura || !os.cliente || !os.veiculo || !os.funcionario || !os.servico) {
    alert("Preencha todos os campos!");
    return;
  }

  if (os.id) await OrdemServicoService.atualizar(os.id, os);
  else await OrdemServicoService.criar(os);

  cancelar();
  modalEdicao.value = false;
  carregarOrdens();
}

/* EDITAR */
function abrirEdicao(o) {
  ordem.value = { ...o };
  modalEdicao.value = true;
}

/* EXCLUIR */
async function excluirOrdem(id) {
  if (!confirm("Deseja excluir esta OS?")) return;
  await OrdemServicoService.excluir(id);
  carregarOrdens();
}

/* CANCELAR */
function cancelar() {
  ordem.value = {
    dataAbertura: "",
    dataFechamento: "",
    cliente: "",
    veiculo: "",
    funcionario: "",
    servico: ""
  };
}

/* PAGAMENTO */
function abrirPagamento(o) {
  ordemSelecionada.value = { ...o };
  valorServico.value = "";
  formaPagamento.value = "";
  modalPagamento.value = true;
}

async function confirmarPagamento() {
  if (!valorServico.value || Number(valorServico.value) <= 0) {
    alert("Informe um valor válido!");
    return;
  }

  if (!formaPagamento.value) {
    alert("Selecione a forma de pagamento!");
    return;
  }

  const registro = {
    ordemId: ordemSelecionada.value.id,
    cliente: ordemSelecionada.value.cliente,
    veiculo: ordemSelecionada.value.veiculo,
    servico: ordemSelecionada.value.servico,
    funcionario: ordemSelecionada.value.funcionario,
    valor: Number(valorServico.value),
    formaPagamento: formaPagamento.value,
    dataPagamento: new Date().toLocaleString("pt-BR")
  };

  await PagamentoService.registrar(registro);
  modalPagamento.value = false;
  alert("Pagamento registrado com sucesso!");
}
</script>

<style scoped>


.os-container {
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
  margin-bottom: 20px;
}

.lista-os {
  margin-top: 10px;
}

.nenhum {
  margin-top: 20px;
  text-align: center;
  opacity: 0.8;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
