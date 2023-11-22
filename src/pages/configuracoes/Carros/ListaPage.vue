<template>
  <q-page>
    <card-header titulo="Carros" icone="no_crash">
      <formulario-carro />
    </card-header>
  </q-page>
</template>

<script>
import CardHeader from "../../../components/configuracoes/globais/CardHeader.vue";
import FormularioCarro from "../../../components/configuracoes/Carros/ListaCarro.vue";
export default {
  components: {
    FormularioCarro,
    CardHeader,
  },
};
</script>
