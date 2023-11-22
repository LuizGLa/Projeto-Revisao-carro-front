<template>
  <q-page>
    <card-header titulo="Editar Carro" icone="no_crash">
      <formulario-carro acao="editar" />
    </card-header>
  </q-page>
</template>

<script>
import CardHeader from "../../../components/configuracoes/globais/CardHeader.vue";
import FormularioCarro from "../../../components/configuracoes/Carros/FormularioCarro.vue";
export default {
  components: {
    FormularioCarro,
    CardHeader,
  },
};
</script>
