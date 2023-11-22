<template>
  <q-page>
    <card-header titulo="Revisões" icone="assignment_add">
      <formulario-revisao />
    </card-header>
  </q-page>
</template>

<script>
import CardHeader from "../../../components/configuracoes/globais/CardHeader.vue";
import FormularioRevisao from "../../../components/configuracoes/Revisoes/ListaRevisao.vue";
export default {
  components: {
    FormularioRevisao,
    CardHeader,
  },
};
</script>
