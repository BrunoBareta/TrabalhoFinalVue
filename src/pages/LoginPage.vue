<template>
  <div class="login-container flex flex-center">
    <div class="login-box row shadow-10">
      <!-- Lado esquerdo - Formulário -->
      <div class="col-12 col-md-6 form-side flex flex-center column">
        <div class="text-center q-mb-lg">
          <h2 class="text-white text-bold">Faça Seu Login</h2>
        </div>

        <q-form @submit.prevent="handleLogin" class="q-gutter-md form-content">
          <!-- Campo Email -->
          <q-input
            v-model="email"
            label="Email"
            filled
            dense
            color="red"
            bg-color="grey-9"
            input-class="text-white"
            label-color="grey-4"
            class="custom-input"
          >
            <template v-slot:prepend>
              <q-icon name="mail" color="white" />
            </template>
          </q-input>

          <!-- Campo Senha -->
          <q-input
            v-model="senha"
            label="Senha"
            type="password"
            filled
            dense
            color="red"
            bg-color="grey-9"
            input-class="text-white"
            label-color="grey-4"
            class="custom-input"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="white" />
            </template>
          </q-input>

          <!-- Link Esqueci minha senha -->
          <div class="text-right q-mt-xs">
            <router-link to="/recuperar-senha" class="forgot-link">
              Esqueci minha senha
            </router-link>
          </div>

          <!-- Botão Entrar -->
          <q-btn
            label="Entrar"
            type="submit"
            color="red"
            class="full-width login-btn q-mt-md"
            unelevated
          />
        </q-form>
      </div>

      <!-- Lado direito - Imagem -->
      <div class="col-12 col-md-6 image-side flex flex-center">
        <img
          src="../assets/velocimetro.png"
          alt="Velocímetro"
          class="speed-img"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const senha = ref("");
const router = useRouter();

function handleLogin() {
  if (email.value === "admin@teste.com" && senha.value === "1234") {
    router.push("/home");
  } else {
    alert("Email ou senha incorretos!");
  }
}
</script>

<style scoped>
.login-container {
  background: linear-gradient(135deg, #0f0f0f 20%, #1a1a1a 60%, #e50914 120%);
  min-height: 100vh;
}

.login-box {
  background: rgba(18, 18, 18, 0.9);
  border-radius: 20px;
  overflow: hidden;
  width: 90%;
  max-width: 950px;
  backdrop-filter: blur(8px);
  box-shadow: 0 0 35px rgba(229, 9, 20, 0.25);
}

.form-side {
  padding: 40px;
}

.form-content {
  width: 100%;
  max-width: 320px;
}

.custom-input input {
  color: white !important;
}

.custom-input .q-field__native,
.custom-input .q-field__label {
  color: white !important;
}

.login-btn {
  font-weight: bold;
  border-radius: 10px;
  background: linear-gradient(90deg, #e50914, #b0060f);
  transition: 0.3s;
}

.login-btn:hover {
  background: linear-gradient(90deg, #ff1b1b, #e50914);
  box-shadow: 0 0 20px rgba(229, 9, 20, 0.7);
  transform: scale(1.03);
}

.forgot-link {
  color: #ccc;
  font-size: 0.8rem;
  text-decoration: none;
  transition: 0.3s;
}

.forgot-link:hover {
  color: #fff;
}

.image-side {
  background-color: transparent;
}

.speed-img {
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(229, 9, 20, 0.5);
  animation: fadeIn 1.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
