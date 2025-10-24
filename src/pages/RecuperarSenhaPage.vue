<template>
  <div class="recuperar-container flex flex-center">
    <div class="recuperar-box row shadow-10">
      <div class="col-12 col-md-6 form-side flex flex-center column">
        <div class="text-center q-mb-lg">
          <h2 class="text-white text-bold">Recupere sua senha</h2>
        </div>

        <q-form @submit.prevent="handleSubmit" class="q-gutter-md form-content">
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

          <q-input
            v-model="novaSenha"
            label="Senha Nova"
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

          <q-input
            v-model="confirmarSenha"
            label="Confirmação de Senha"
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

          <q-btn
            label="Confirmar"
            type="submit"
            color="red"
            class="full-width recuperar-btn q-mt-md"
            unelevated
          />

          <router-link to="/login" class="forgot-link q-mt-md text-center">
            Voltar ao Login
          </router-link>
        </q-form>
      </div>

      <div class="col-12 col-md-6 image-side flex flex-center">
        <img src="../assets/velocimetro.png" alt="Velocímetro" class="speed-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const novaSenha = ref("");
const confirmarSenha = ref("");
const router = useRouter();

function handleSubmit() {
  if (!email.value || !novaSenha.value || !confirmarSenha.value) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  if (novaSenha.value !== confirmarSenha.value) {
    alert("As senhas não coincidem!");
    return;
  }

  alert("Senha alterada com sucesso!");
  router.push("/login");
}
</script>

<style scoped>
.recuperar-container {
  background: linear-gradient(135deg, #0f0f0f 20%, #1a1a1a 60%, #e50914 120%);
  min-height: 100vh;
}

.recuperar-box {
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

.recuperar-btn {
  font-weight: bold;
  border-radius: 10px;
  background: linear-gradient(90deg, #e50914, #b0060f);
  transition: 0.3s;
}

.recuperar-btn:hover {
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
