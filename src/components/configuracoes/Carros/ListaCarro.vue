<template>
  <div>
    <q-toolbar class="q-pa-none flex justify-between items-center">
      <q-btn
        icon="add_circle"
        color="primary"
        label="Adicionar"
        size="md"
        to="/configuracoes/carros/adicionar"
      />
    </q-toolbar>
    <q-table
      separator="cell"
      bordered
      :rows="carros"
      :columns="campos"
      row-key="nome"
      class="q-mt-sm"
      hide-bottom
      :pagination="pagination"
    >
      <template v-slot:body-cell-acao="scope">
        <td>
          <div class="q-pa-sm text-center q-gutter-sm items-center">
            <q-btn
              title="Editar"
              dense
              size="sm"
              unelevated
              color="warning"
              icon="edit"
              @click="
                $router.push(`/configuracoes/carros/editar/${scope.row.id}`)
              "
            />
            <q-btn
              dense
              size="sm"
              unelevated
              color="negative"
              icon="close"
              @click="exclui(scope.row.id)"
              title="Excluir"
            />
          </div>
        </td>
      </template>
    </q-table>
    <div v-if="totalPaginas > 1" class="row justify-center q-pt-md">
      <q-pagination
        @update:model-value="buscaDadosTabela"
        v-model="paginaAtual"
        :max="totalPaginas"
        :max-pages="5"
        direction-links
        unelevated
        color="grey-10"
        active-color="primary"
        active-text-color="white"
      />
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { onMounted, ref } from "vue";

const campos = [
  {
    name: "marca",
    required: true,
    label: "Marca",
    align: "left",
    field: "marca",
    sortable: true,
    style: "width: 45%",
  },
  {
    name: "modelo",
    required: true,
    label: "Modelo",
    align: "left",
    field: "modelo",
    sortable: true,
    style: "width: 45%",
  },
  {
    name: "cor",
    required: true,
    label: "Cor",
    align: "center",
    field: "cor",
    sortable: true,
    style: "width: 5%",
  },
  {
    name: "ano",
    required: true,
    label: "Ano",
    align: "center",
    field: "ano",
    sortable: true,
    style: "width: 5%",
  },
  {
    name: "placa",
    required: true,
    label: "Placa",
    align: "center",
    field: "placa",
    sortable: true,
    style: "width: 5%",
  },
  {
    name: "acao",
    field: "acao",
    align: "center",
    label: "Ações",
    style: "width: 5%",
  },
];

export default {
  setup() {
    const $q = useQuasar();
    const carros = ref([]);
    const totalPaginas = ref(0);

    onMounted(() => {
      buscaDadosTabela();
    });

    async function buscaDadosTabela() {
      try {
        const request = await api.get("api/carros");
        carros.value = request.data;
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Ocorreu um erro!",
          icon: "report_problem",
        });
      }
    }

    async function exclui(item) {
      try {
        const request = await api.delete(`api/carros/${item}`);
        if (request.status == 200) {
          $q.notify({
            type: "positive",
            message: "Cliente removido com sucesso!",
            position: "top",
            timeout: 350,
          });
        }
        buscaDadosTabela();
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
      campos,
      carros,
      totalPaginas,
      exclui,
      buscaDadosTabela,
    };
  },
};
</script>

<style scoped>
.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35em;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: em;
  margin: 1em;
}
</style>
