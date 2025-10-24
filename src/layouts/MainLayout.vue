<template>
  <q-layout view="lHh Lpr lFf">

    <!-- Barra superior -->
    <q-header elevated class="bg-dark text-white flex items-center justify-between q-px-md">
      <div class="text-h6 text-bold">Oeste Auto Center</div>
      <q-btn flat round dense icon="logout" color="red" @click="sair" title="Sair" />
    </q-header>

    <!-- Menu lateral -->
    <q-drawer
      v-model="drawer"
      show-if-above
      side="left"
      class="menu-lateral bg-dark"
    >
      <div class="q-pa-md text-center">
        <q-avatar size="80px" class="q-mb-md">
          <img src="https://cdn-icons-png.flaticon.com/512/679/679720.png" alt="logo" />
        </q-avatar>
        <div class="text-h6 text-white q-mb-lg">Menu Mestre</div>
      </div>

      <q-list>
        <q-item
          clickable
          v-for="item in menuItems"
          :key="item.label"
          @click="navegar(item.path)"
          class="menu-item q-mb-sm"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" color="white" size="28px" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Conteúdo principal -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(true)
const router = useRouter()

const menuItems = [
  { label: 'Cliente', icon: 'person', path: '/cliente' },
  { label: 'Veículo', icon: 'directions_car', path: '/veiculo' },
  { label: 'Funcionário', icon: 'engineering', path: '/funcionario' },
  { label: 'Serviço', icon: 'build', path: '/servico' },
  { label: 'Ordem de Serviço', icon: 'assignment', path: '/ordem-servico' },
  { label: 'Dashboard', icon: 'bar_chart', path: '/dashboard' }
]

function navegar(path) {
  router.push(path)
}

function sair() {
  router.push('/login')
}
</script>

<style scoped>
.bg-dark {
  background: linear-gradient(180deg, #0f0f0f 30%, #1a1a1a 80%, #e50914);
}

.menu-lateral {
  width: 230px;
  background-color: #0d0d0d;
  box-shadow: 0 0 15px rgba(229, 9, 20, 0.4);
}

.menu-item {
  border-radius: 10px;
  transition: 0.3s;
}

.menu-item:hover {
  background-color: rgba(229, 9, 20, 0.8);
  transform: scale(1.03);
}

.q-header {
  background-color: #0d0d0d;
  box-shadow: 0 0 10px rgba(229, 9, 20, 0.6);
}
</style>
