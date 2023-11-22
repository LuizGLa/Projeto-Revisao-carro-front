<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-blue-10 text-white">
      <q-toolbar style="background-color: rgb(255, 255, 255)">
        <div class="group-all">
          <q-btn
            dense
            size="lg"
            style="color: rgb(5, 46, 94); margin-left: 1.5em"
            flat
            round
            icon="menu"
            @click="toggleLeftDrawer"
          />
          <img class="logo" src="../assets/imgs/Logo.png" />
          <div class>
            <q-btn
              color="white"
              rounded
              no-caps
              text-color="primary"
              @click="handleLogout()"
              class="row items-center"
            >
              <q-item-section> Sair</q-item-section>
              <q-icon name="logout" style="width: 0.3em; margin-left: 0.4em" />
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-grey-2"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="250"
    >
      <q-list>
        <main-menu v-for="link in links" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="q-pa-md" />
    </q-page-container>

    <q-footer elevated class="bg-grey-10 q-pa-xs text-white text-center">
      <span>Desenvolvido por Luiz Gustavo</span>
    </q-footer>
  </q-layout>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import MainMenu from "./MainMenu.vue";
import { useStore } from "vuex";

export default {
  components: {
    MainMenu,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const version = process.env.VERSION;
    const router = useRouter();
    const links = ref([]);
    const store = useStore();

    onMounted(() => {
      configurarMenu();
    });

    const handleLogout = () => {
      store.dispatch("logout");
      router.push({ path: "/login" });
    };

    function configurarMenu() {
      links.value.push(
        {
          title: "Clientes",
          icon: "groups",
          link: "/configuracoes/clientes",
        },
        {
          title: "Carros",
          icon: "no_crash",
          link: "/configuracoes/carros",
        }
      );
    }

    return {
      leftDrawerOpen,
      links,
      handleLogout,
      version,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
<style scoped>
.logo {
  width: auto;
  height: 7em;
}

.group-all {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
