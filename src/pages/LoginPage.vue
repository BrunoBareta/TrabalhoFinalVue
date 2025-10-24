<template>
  <div class="login-container">
    <q-card class="login-card">
      <div class="logo-container">
        <img src="../assets/logo-oeste.png" alt="Oeste Auto Center" class="logo" />
      </div>

      <h2 class="titulo">Acesso ao Sistema</h2>

      <q-input
        v-model="email"
        label="Email"
        type="email"
        filled
        class="q-mt-md input-login"
        dark
      />

      <q-input
        v-model="senha"
        label="Senha"
        type="password"
        filled
        class="q-mt-md input-login"
        dark
      />

      <div class="q-mt-lg">
        <q-btn
          label="ENTRAR"
          color="red"
          class="botao-login"
          @click="login"
          :loading="carregando"
        >
          <template v-slot:loading>
            <q-spinner-dots color="white" size="2em" />
          </template>
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const senha = ref('')
const carregando = ref(false)

const login = async () => {
  if (email.value === 'admin@teste.com' && senha.value === '1234') {
    carregando.value = true
    alert('Login realizado com sucesso!')

    await nextTick()

    // Simula tempo de carregamento real
    setTimeout(() => {
      carregando.value = false
      router.push('/dashboard')
    }, 1200)
  } else {
    alert('Usuário ou senha incorretos!')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1b1b1b 40%, #a60000);
}

.login-card {
  width: 350px;
  background: rgba(20, 20, 20, 0.9);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  color: white;
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.3);
  transition: 0.3s;
}

.login-card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 40px rgba(255, 0, 0, 0.6);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 150px;
  border-radius: 12px;
  filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
}

.titulo {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #fff;
}

.input-login {
  color: white;
}

.botao-login {
  width: 100%;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 10px;
  transition: 0.3s;
}

.botao-login:hover {
  background-color: #ff0000;
  color: white;
}
</style>
