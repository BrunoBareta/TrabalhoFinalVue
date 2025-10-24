<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-black text-red">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          Oeste Auto Center
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawer" side="left" class="bg-dark text-white">
      <q-list>
        <q-item class="q-mb-md justify-center">
          <img src="../assets/logo-oeste.png" alt="Logo" class="menu-logo" />
        </q-item>

        <q-item clickable v-ripple to="/cliente">
          <q-icon name="person" color="red" />
          <q-item-section>Cliente</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/veiculo">
          <q-icon name="directions_car" color="red" />
          <q-item-section>Veículo</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/funcionario">
          <q-icon name="groups" color="red" />
          <q-item-section>Funcionário</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/servico">
          <q-icon name="build" color="red" />
          <q-item-section>Serviço</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/ordem-servico">
          <q-icon name="description" color="red" />
          <q-item-section>Ordem de Serviço</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/dashboard">
          <q-icon name="bar_chart" color="red" />
          <q-item-section>Dashboard</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(true)
</script>

<style scoped>
.menu-logo {
  width: 130px;
  margin: 20px auto;
  display: block;
  filter: drop-shadow(0 0 8px red);
}
</style>
