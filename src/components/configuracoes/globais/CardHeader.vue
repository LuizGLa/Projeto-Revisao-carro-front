<template>
  <q-card :style="`min-height: ${$q.screen.height - 120}px`">
    <q-card-section class="row bg-blue-8 q-py-sm">
      <q-icon size="md" :name="icone" color="white" />
      <div class="text-h6 q-ml-sm">
        <label style="color: rgb(255, 255, 255)">{{ titulo }}</label>
      </div>
    </q-card-section>

    <q-separator />
    <div class="q-pa-md">
      <slot />
    </div>
  </q-card>
</template>
<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  props: ["titulo", "icone"],
  setup() {
    const $q = useQuasar();
  },
});
</script>
