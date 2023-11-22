<template>
  <q-page>
    <card-header titulo="Editar Cliente" icone="groups">
      <formulario-cliente acao="editar" />
    </card-header>
  </q-page>
</template>

<script>
import CardHeader from "../../../components/configuracoes/globais/CardHeader.vue";
import FormularioCliente from "../../../components/configuracoes/Clientes/FormularioCliente.vue";
export default {
  components: {
    FormularioCliente,
    CardHeader,
  },
};
</script>
