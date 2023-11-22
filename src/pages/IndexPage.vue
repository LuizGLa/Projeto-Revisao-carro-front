<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const username = ref("");
const store = useStore();
const token = sessionStorage.getItem("token");
const router = useRouter();
const buscaDadosUser = async () => {
  try {
    const response = await api.post("api/auth/me", {});
    console.log(response.data);
  } catch {
    console.log("Erro ao buscar dados do usuário");
  }
};

onMounted(() => {
  buscaDadosUser();
});
</script>
