<template>
  <q-page>
    <div class="page flex flex-center">
      <div class="card-login flex flex-center">
        <div class="group-login">
          <div class="img-logo flex flex-center">
            <img src="../assets/imgs/Logo.png" class="logo" />
          </div>
          <div class="login row">
            <form @submit.prevent="handleLogin">
              <div class="email flex flex-center">
                <q-input
                  outlined
                  v-model="email"
                  type="email"
                  dense
                  id="email"
                  style="width: 19em"
                  label="Email"
                  :rules="[(val) => !!val]"
                  required
                >
                  <template v-slot:prepend>
                    <q-icon name="email" class="cursor-pointer" />
                  </template>
                </q-input>
              </div>
              <div class="password">
                <q-input
                  outlined
                  dense
                  label="Senha"
                  v-model="password"
                  type="password"
                  id="password"
                  :rules="[(val) => !!val]"
                  style="width: 19em"
                  required
                >
                  <template v-slot:prepend>
                    <q-icon
                      no-caps
                      name="key"
                      class="cursor-pointer"
                    /> </template
                ></q-input>
              </div>
              <div class="button flex flex-center">
                <q-btn
                  padding="xs xl"
                  class="q-mt-sm"
                  no-caps
                  rounded
                  outline
                  color="primary"
                  size="md"
                  type="submit"
                >
                  Logar
                </q-btn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const store = useStore();
const router = useRouter();
const $q = useQuasar();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const response = await api.post("api/auth/login", {
      email: email.value,
      password: password.value,
    });
    console.log("response:", response);
    const token = response.data.access_token;

    store.dispatch("login", token);
    router.push({ path: "/" });
  } catch (error) {
    $q.notify({
      type: "negative",
      position: "top",
      message: "Email ou senha invalidos",
    });
    console.error("Erro durante o login:", error);
  }
};
</script>
<style scoped>
.logo {
  width: auto;
  height: 15em;
  margin-bottom: 2.5em;
}

.card-login {
  background: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgba(252, 252, 252, 0.925) 100%
  );
  padding: 3em;
  border-radius: 2em;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.479);
}
.page {
  height: 100vh;
  background-color: rgb(21, 109, 180);
}
</style>
