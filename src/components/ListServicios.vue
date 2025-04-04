<template>

  <div v-if="loading">
    <q-circular-progress
      indeterminate
      size="50px"
      :thickness="0.22"
      rounded
      color="primary"
      track-color="grey-3"
      class="q-ma-md"
    />
  </div>
<div v-else>

  <q-list
    class="q-pa-md shadow-3 mx-auto"
    style="width: 50vw; border-radius: 12px; background: #f5f5f5; min-width: 250px; max-width: 600px"
    bordered
  >
    <div class="row items-center q-pb-md">
      <div class="col">
        <q-btn
          label="Cancelar"
          color="grey"
          @click="cancelar"
          flat
          size="sm"
          class="q-px-md"
        />
      </div>
      <div class="col text-center text-caption text-weight-bold">
        Servicios
      </div>
      <div class="col text-right">
        <q-btn
          label="Siguiente"
          color="grey"
          @click="siguiente"
          flat
          size="sm"
          class="q-px-md"
        />
      </div>
    </div>
    <q-virtual-scroll
      style="max-height: 400px;"
      :items="serviciosTipo"
      separator
    >
      <q-item
        v-for="servicio in serviciosTipo"
        :key="servicio.id"
        class="q-my-sm bg-white text-caption"
        style="border-radius: 8px; font-size: 10px;"
        clickable
        v-ripple
      >
        <q-item-section @click="storeDisplay.precioServicio = servicio.precio">
          <q-item-label style="font-size: 10px;" class="text-weight-medium">{{ servicio.servicio }}</q-item-label>
          <q-item-label style="font-size: 8px;" class="text-grey-8" caption>{{ servicio.precio }}€ {{ error }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label style="font-size: 8px;" caption>{{ loading }}</q-item-label>
          <q-icon name="shopping_cart" color="primary" size="xs" />
        </q-item-section>
      </q-item>
    </q-virtual-scroll>
  </q-list>
 
</div>
</template>

<script setup>
import { watch} from 'vue';
import useServices from 'src/composables/servicios.js';
import { useDisplayStore } from 'src/stores/display-store.js';
const storeDisplay = useDisplayStore()
const { serviciosTipo, loading, error,fetchServices } = useServices();
console.log(serviciosTipo.value)
const cancelar =()=>{
  storeDisplay.activarListaServicios = false
  storeDisplay.activarDisplayInicio = true
  storeDisplay.tipoMascota = ''
  storeDisplay.precioServicio = 0


}

const siguiente =()=>{
  storeDisplay.activarListaSuplementos = true
  storeDisplay.activarListaServicios = false
}

watch(
    () => storeDisplay.tipoMascota,
    (nuevoTipoMascota) => {
      if (nuevoTipoMascota) {
        storeDisplay.tipoMascota= nuevoTipoMascota
        fetchServices(nuevoTipoMascota)

      }
    },
    { immediate: true } // Para ejecutarlo al inicio
  );


</script>