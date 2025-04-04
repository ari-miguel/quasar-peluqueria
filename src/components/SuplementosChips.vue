<template>
  <div class="row q-gutter-x-sm">
    <q-chip
      v-for="(item, index) in storeDisplay.listaSuplementos "
      :key="index"
      outline
      square
      size="xs"
      clickable
      @click="storeDisplay.eliminarSuplemento(index)"
      color="primary"
      text-color="white"
      icon="delete"
    >
      {{ item.descripcion }} {{ item.precio }}€
    </q-chip>
  </div>
</template>



<script setup>

import {useDisplayStore} from 'src/stores/display-store.js';
const storeDisplay = useDisplayStore()

</script>