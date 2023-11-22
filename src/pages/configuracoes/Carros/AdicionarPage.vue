<template>
  <q-page>
    <card-header titulo="Adicionar Carros" icone="no_crash">
      <formulario-carro />
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
