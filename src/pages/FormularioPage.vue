<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="q-pa-md" style="max-width: 95%;">
          <FacturaComponent/>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import FacturaComponent from 'src/components/FacturaComponent.vue';
</script>