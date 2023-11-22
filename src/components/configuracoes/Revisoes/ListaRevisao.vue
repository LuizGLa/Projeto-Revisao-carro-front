<template>
  <div>
    <q-toolbar class="q-pa-none flex justify-between items-center">
      <q-btn
        icon="add_circle"
        color="primary"
        label="Adicionar"
        size="md"
        to="/configuracoes/revisoes/adicionar"
      />
    </q-toolbar>
    <q-table
      separator="cell"
      bordered
      :rows="revisoes"
      :columns="campos"
      row-key="nome"
      class="q-mt-sm"
      hide-bottom
      :pagination="pagination"
    >
      <template v-slot:body-cell-Cliente="scope">
        <td>{{ scope.row.cliente.nome }}</td>
      </template>

      <template v-slot:body-cell-Carro="scope">
        <td>{{ scope.row.carro.modelo }}</td>
      </template>
      <template v-slot:body-cell-Cor="scope">
        <td>{{ scope.row.carro.cor }}</td>
      </template>
      <template v-slot:body-cell-Descricao="props">
        <q-td>
          <p>
            {{
              props.row.descricao.length > 10
                ? props.row.descricao.slice(0, 10) + "..."
                : props.row.descricao
            }}
          </p>
          <q-tooltip
            anchor="center middle"
            v-if="props.row.descricao.length > 50"
            class="bg-primary text-tooltip q-mt-xl"
            style="font-size: 0.9em"
            max-width="400px"
            :delay="500"
            >{{ props.row.descricao }}
          </q-tooltip>
        </q-td>
      </template>

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
                $router.push(`/configuracoes/revisoes/editar/${scope.row.id}`)
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
    name: "Cliente",
    required: true,
    label: "Cliente",
    align: "left",
    field: "cliente.nome",
    sortable: true,
    style: "width: 45%",
  },
  {
    name: "Carro",
    required: true,
    label: "Carro",
    align: "left",
    field: "carro.modelo",
    sortable: true,
    style: "width: 20%",
  },
  {
    name: "Cor",
    required: true,
    label: "Cor do carro",
    align: "left",
    field: "carro.cor",
    sortable: true,
    style: "width: 20%",
  },
  {
    name: "Descricao",
    required: true,
    label: "Descrição",
    align: "left",
    field: "descricao",
    sortable: true,
    style: "width: 5%",
  },
  {
    name: "valor",
    required: true,
    label: "Valor em BRL",
    align: "left",
    field: "valor",
    sortable: true,
    style: "width: 5%",
  },
  {
    name: "data",
    required: true,
    label: "Data agendada",
    align: "left",
    field: "data",
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
    const revisoes = ref([]);
    const totalPaginas = ref(0);

    onMounted(() => {
      buscaDadosTabela();
    });

    async function buscaDadosTabela() {
      try {
        const request = await api.get("api/revisoes");
        revisoes.value = request.data;

        revisoes.value.forEach((item) => {
          item.data = item.data.split("-").reverse().join("/");
        });

        console.log(revisoes.value);
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
        const request = await api.delete(`api/revisoes/${item}`);
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
      revisoes,
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
