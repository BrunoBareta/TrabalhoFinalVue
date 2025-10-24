<template>
  <div class="senha-container">
    <div class="senha-box">
      <h1 class="titulo">Recupere sua senha</h1>
      <img src="../assets/logo-oeste.png" alt="logo" class="logo" />
      <q-form @submit.prevent="recuperarSenha">
        <q-input v-model="email" label="Email" outlined color="red" bg-color="black" input-class="text-white" class="q-mb-md">
          <template v-slot:prepend><q-icon name="email" color="red" /></template>
        </q-input>

        <q-input v-model="novaSenha" label="Nova Senha" outlined type="password" color="red" bg-color="black" input-class="text-white" class="q-mb-md" />
        <q-input v-model="confirmarSenha" label="Confirme a Senha" outlined type="password" color="red" bg-color="black" input-class="text-white" class="q-mb-md" />

        <q-btn label="Redefinir Senha" color="red" glossy push class="full-width q-mt-md" />
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const novaSenha = ref('')
const confirmarSenha = ref('')

function recuperarSenha() {
  if (!email.value || !novaSenha.value || !confirmarSenha.value) {
    alert('Preencha todos os campos!')
    return
  }
  if (novaSenha.value !== confirmarSenha.value) {
    alert('As senhas não coincidem!')
    return
  }
  alert('Senha redefinida com sucesso!')
}
</script>

<style scoped>
.senha-container {
  background: linear-gradient(135deg, #0a0a0a 30%, #8b0000);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.senha-box {
  background: rgba(15, 15, 15, 0.95);
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 0 25px rgba(255, 0, 0, 0.4);
}
.logo {
  width: 200px;
  margin: 10px auto;
  filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
}
.titulo {
  color: white;
  margin-bottom: 15px;
}
.full-width {
  width: 100%;
}
</style>
