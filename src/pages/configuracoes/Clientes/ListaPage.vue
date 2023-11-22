<template>
  <q-page>
    <card-header titulo="Clientes" icone="groups">
      <formulario-cliente />
    </card-header>
  </q-page>
</template>

<script>
import CardHeader from "../../../components/configuracoes/globais/CardHeader.vue";
import FormularioCliente from "../../../components/configuracoes/Clientes/ListaCliente.vue";
export default {
  components: {
    FormularioCliente,
    CardHeader,
  },
};
</script>
