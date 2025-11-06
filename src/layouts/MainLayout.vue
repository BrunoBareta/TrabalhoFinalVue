<template>
  <q-layout view="lHh Lpr lFf">

    <!-- ========================= CABEÇALHO ========================= -->
    <q-header elevated class="header-custom">
      <q-toolbar>

        <!-- Botão do menu lateral -->
        <q-btn
          flat dense round
          icon="menu"
          @click="drawer = !drawer"
          color="white"
        />

        <!-- Nome do sistema -->
        <q-toolbar-title class="titulo-sistema">
          Oeste Auto Center
        </q-toolbar-title>

        <!-- Informações do usuário -->
        <div class="usuario-info">
          <q-icon name="account_circle" size="32px" color="red" class="q-mr-sm" />
          <span class="texto-usuario">
            Bem-vindo, <strong>{{ usuarioNome }}</strong>
          </span>
        </div>

      </q-toolbar>
    </q-header>

    <!-- ========================= MENU LATERAL ========================= -->
    <q-drawer
      v-model="drawer"
      show-if-above
      side="left"
      class="bg-dark text-white drawer-custom"
      behavior="push"
      :width="240"
    >
      <q-list>

        <!-- Logo -->
        <q-item class="q-mb-lg justify-center">
          <img src="../assets/logo-oeste.png" alt="Logo" class="menu-logo" />
        </q-item>

        <!-- ITENS DO MENU -->
        <q-item clickable v-ripple to="/cliente" class="menu-item">
          <q-icon name="person" color="red" />
          <q-item-section>Cliente</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/veiculo" class="menu-item">
          <q-icon name="directions_car" color="red" />
          <q-item-section>Veículo</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/funcionario" class="menu-item">
          <q-icon name="groups" color="red" />
          <q-item-section>Funcionário</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/servico" class="menu-item">
          <q-icon name="build" color="red" />
          <q-item-section>Serviço</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/ordem-servico" class="menu-item">
          <q-icon name="description" color="red" />
          <q-item-section>Ordem de Serviço</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/dashboard" class="menu-item">
          <q-icon name="bar_chart" color="red" />
          <q-item-section>Dashboard</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <!-- ========================= CONTEÚDO ========================= -->
    <q-page-container class="conteudo-container">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
const usuarioNome = localStorage.getItem("usuarioNome") || "Usuário"
</script>

<style scoped>
/* HEADER */
.header-custom {
  background: linear-gradient(90deg, #111, #2d2d2d);
  border-bottom: 2px solid #ff0000;
  box-shadow: 0 0 12px rgba(255, 0, 0, 0.6);
}

/* Nome do sistema */
.titulo-sistema {
  font-size: 1.6rem;
  font-weight: 700;
  color: #ff4c4c;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
  font-family: 'Poppins', sans-serif;
  letter-spacing: 1px;
}

/* Infos do usuário */
.usuario-info {
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
}

.texto-usuario strong {
  color: #ff4444;
  text-shadow: 0 0 8px rgba(255, 0, 0, 0.9);
}

/* Drawer */
.drawer-custom {
  border-right: 2px solid red;
  box-shadow: 4px 0 12px rgba(255, 0, 0, 0.3);
}

/* Logo */
.menu-logo {
  width: 140px;
  filter: drop-shadow(0 0 10px red);
}

/* Efeito de hover nos itens */
.menu-item {
  transition: 0.25s;
}

.menu-item:hover {
  background: rgba(255, 0, 0, 0.15);
  transform: translateX(5px);
}

/* animação conteúdo */
.conteudo-container {
  transition: padding-left 0.25s ease;
}
</style>
