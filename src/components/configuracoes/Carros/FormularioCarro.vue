<template>
  <div>
    <q-form @submit="submit" greedy>
      <div class="row q-col-gutter-md">
        <div class="col-6 col-sm-4 col-sm-4">
          <q-input
            ref="marcaRef"
            dense
            outlined
            v-model="form.marca"
            label="Marca"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-6 col-sm-4 col-md-4 q-mb-lg">
          <q-input
            ref="modeloRef"
            dense
            outlined
            v-model="form.modelo"
            label="Modelo"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-4 col-sm-3 col-md-6 q-mb-lg">
          <q-input
            ref="corRef"
            dense
            outlined
            v-model="form.cor"
            label="Cor"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-4 col-sm-3 col-md-4 q-mb-lg">
          <q-input
            ref="anoRef"
            dense
            outlined
            v-model="form.ano"
            label="Ano"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-4 col-sm-3 col-md-3 q-mb-lg">
          <q-input
            ref="placaRef"
            dense
            outlined
            v-model="form.placa"
            label="Placa"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
        </div>
        <div class="col-2 col-sm-3 col-md-3">
          <q-select
            ref="icone_id"
            v-model="form.cliente_id"
            dense
            style="width: 15em"
            outlined
            label="Cliente"
            :options="clientes"
            option-label="nome"
            behavior="menu"
            option-value="value"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
            emit-value
            map-options
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
    const clientes = ref([]);

    const form = ref({
      marca: "",
      modelo: "",
      cor: "",
      ano: "",
      placa: "",
      cliente_id: "",
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

    async function carregaClientes() {
      try {
        const { status, data } = await api.get(`api/clientes`);
        if (status == 200) {
          data.map((value) => {
            clientes.value.push({
              value: value.id,
              nome: value.nome,
            });
          });
          console.log(clientes.value);
        }
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "bottom",
          message: "Ocorreu um erro!",
          icon: "report_problem",
        });
      }
    }

    onMounted(async () => {
      carregaClientes();
      if (props.acao === "editar") {
        const response = await api.get(`api/carros/${$route.params.id}`);
        const carro = response.data;

        form.value.marca = carro.nome;
        form.value.modelo = carro.modelo;
        form.value.cor = carro.cor;
        form.value.ano = carro.ano;
        form.value.placa = carro.placa;
      }
    });

    function submit() {
      console.log("form", form.value);
      if (props.acao === "editar") {
        atualiza();
      } else {
        cadastra();
      }
    }

    async function cadastra() {
      try {
        const request = await api.post(`api/carros`, form.value);
        if (request.status == 201) {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Carro cadastrado com sucesso!",
            icon: "check",
          });
          $router.push("/configuracoes/carros");
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
          `api/carros/${$route.params.id}`,
          form.value
        );
        if (request.status == 200) {
          console.log("teste", request);
          $q.notify({
            color: "positive",
            position: "top",
            message: "Carro atualizado com sucesso!",
            icon: "check",
          });
          $router.push("/configuracoes/Carros");
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
      clientes,
      carregaClientes,
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
