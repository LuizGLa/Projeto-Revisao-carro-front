<template>
  <q-page>
    <card-header titulo="Editar Revisão" icone="assignment_add">
      <formulario-revisao acao="editar" />
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
