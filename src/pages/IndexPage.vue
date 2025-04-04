<template>
  <q-layout>
    <q-header>
      <!-- Contenido del encabezado -->
    </q-header>

    <q-page-container>
      <q-page>
        <div>
          <ComponenteInicial/>
        </div>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="row items-center justify-evenly">
          <div class="column items-center">
            <q-icon name="location_on" size="sm" />
            <div class="text-caption">Torrevieja, Spain</div>
          </div>

          <div class="column items-center">
            <q-icon name="phone" size="sm" />
            <div class="text-caption">+34 666 666 666</div>
          </div>

          <div class="column items-center">
            <q-icon name="mail" size="sm" />
            <div class="text-caption">info@peluqueriacanina.com</div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import ComponenteInicial from'src/components/ComponenteInicial.vue';
</script>

<style scoped>
.text-caption {
  font-size: 0.8rem;
}
</style>