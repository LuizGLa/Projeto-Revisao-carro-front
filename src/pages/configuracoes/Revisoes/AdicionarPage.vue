<template>
  <q-page>
    <card-header titulo="Adicionar Revisoes" icone="assignment_add">
      <formulario-revisao />
    </card-header>
  </q-page>
</template>

<script>
import CardHeader from "../../../components/configuracoes/globais/CardHeader.vue";
import FormularioRevisao from "../../../components/configuracoes/Revisoes/FormularioRevisao.vue";

export default {
  components: {
    FormularioRevisao,
    CardHeader,
  },
};
</script>
