<template>
  <div class="recuperar-container">
    <q-card class="recuperar-card">

      <div class="logo-container">
        <img src="../assets/logo-oeste.png" class="logo" />
      </div>

      <h2 class="titulo">Recuperar Senha</h2>
      <p class="descricao">Informe seu e-mail para receber instruções</p>

      <q-input
        v-model="email"
        filled
        dark
        label="Email"
        class="input-email"
      >
        <template v-slot:prepend>
          <q-icon name="email" color="red" />
        </template>
      </q-input>

      <q-btn
        label="ENVIAR LINK"
        color="red"
        class="botao-enviar q-mt-md"
        @click="enviarLink"
      />

      <q-btn
        flat
        label="VOLTAR AO LOGIN"
        class="voltar-login q-mt-sm"
        color="white"
        @click="voltarLogin"
      />

    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const email = ref("")

const enviarLink = () => {
  if (!email.value) {
    alert("Digite um e-mail válido.")
    return
  }

  alert(`Link de recuperação enviado para: ${email.value}`)
  router.push("/login")
}

const voltarLogin = () => {
  router.push("/login")
}
</script>

<style scoped>

.recuperar-container {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1b1b1b 40%, #a60000);
}


.recuperar-card {
  width: 380px;
  padding: 35px;
  background: rgba(20, 20, 20, 0.95);
  border-radius: 18px;
  text-align: center;
  color: white;
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.2);
}


.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.logo {
  width: 150px;
  border-radius: 10px;
  filter: drop-shadow(0 0 8px red);
}


.titulo {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.descricao {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 12px;
}


.input-email {
  color: white;
}


.botao-enviar {
  width: 100%;
  font-weight: bold;
}


.voltar-login {
  font-size: 0.85rem;
  text-decoration: underline;
  text-transform: none;
}
</style>
