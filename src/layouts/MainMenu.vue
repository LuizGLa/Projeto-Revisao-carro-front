<template>
  <q-item v-if="!linksListSubMenu" clickable tag="router-link" :to="link" exact>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-expansion-item v-else :icon="icon" :label="title">
    <q-list class="q-pl-lg">
      <q-item
        v-for="linkSubmenu in linksListSubMenu"
        :key="linkSubmenu.link"
        clickable
        tag="router-link"
        :to="linkSubmenu.link"
        exact
      >
        <q-item-section avatar>
          <q-icon :name="linkSubmenu.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ linkSubmenu.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
    linksListSubMenu: {
      type: Array,
      required: false,
    },
  },
});
</script>
