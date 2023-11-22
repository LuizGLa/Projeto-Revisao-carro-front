<template>
  <div>
    <q-form @submit="submit" greedy>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            ref="nomeRef"
            dense
            outlined
            v-model="form.nome"
            label="Nome"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6 q-mb-lg">
          <q-input
            ref="idadeRef"
            dense
            outlined
            v-model="form.idade"
            label="Idade"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-12 col-sm-6 col-md-6 q-mb-lg">
          <q-select
            ref="generoRef"
            dense
            outlined
            v-model="form.sexo"
            behavior="menu"
            :options="generos"
            label="Gênero"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
      </div>

      <div class="q-mt-md">
        <q-btn
          size="md"
          icon="save"
          :label="`${acao === 'editar' ? 'Atualizar' : 'Cadastrar'}`"
          type="submit"
          color="primary"
        />
        <q-btn
          icon="close"
          label="Cancelar"
          color="grey-2"
          class="q-ml-sm"
          text-color="grey-10"
          @click="$router.go(-1)"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import { ref, onMounted, nextTick } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default {
  props: {
    acao: {
      default: "adicionar",
    },
  },
  setup(props) {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();
    const generos = ["Masculino", "Feminino"];

    const form = ref({
      nome: "",
      sexo: "",
      idade: "",
    });

    const editor = {
      toolbar: [
        [
          {
            label: "Alinhamento",
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: "only-icons",
            options: ["left", "center", "right", "justify"],
          },
        ],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: "icons",
            options: ["p", "h5"],
          },
        ],
        ["bold"],
        ["link", "custom_btn"],
        ["unordered", "ordered"],

        ["undo", "redo"],
      ],
    };

    onMounted(async () => {
      if (props.acao === "editar") {
        const response = await api.get(`api/clientes/${$route.params.id}`);
        const cliente = response.data;
        console.log(cliente);

        form.value.nome = cliente.nome;
        form.value.sexo = cliente.sexo;
        form.value.idade = cliente.idade;
      }
    });

    function submit() {
      if (props.acao === "editar") {
        atualiza();
      } else {
        cadastra();
      }
    }

    async function cadastra() {
      try {
        const request = await api.post(`api/clientes`, form.value);
        if (request.status == 201) {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Cliente cadastrado com sucesso!",
            icon: "check",
          });
          $router.push("/configuracoes/clientes");
        }
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Ocorreu um erro!",
          icon: "report_problem",
        });
      }
    }

    async function atualiza() {
      console.log("atualiza");
      try {
        const request = await api.put(
          `api/clientes/${$route.params.id}`,
          form.value
        );
        if (request.status == 200) {
          console.log("teste", request);
          $q.notify({
            color: "positive",
            position: "top",
            message: "Cliente atualizado com sucesso!",
            icon: "check",
          });
          $router.push("/configuracoes/Clientes");
        }
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Ocorreu um erro!",
          icon: "report_problem",
        });
      }
    }

    return {
      form,
      editor,
      generos,
      submit,
    };
  },
};
</script>
<style scoped>
label {
  color: #777;
}
</style>
