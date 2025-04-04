<template>
  <div class="bg-primary full-height">
    <!-- Primera fila con tres columnas -->
    <div class="row items-start q-pa-md full-width">
      <!-- Primera columna -->
      <div class="col-3">
        <div class="column items-center">
          <q-avatar size="40px">
            <img src="../assets/olga1.jpg" draggable="false" style="object-fit: cover; width: 100%; height: 100%;" />
          </q-avatar>
          <p class="q-mt-xs q-mb-xs" style="color: #0e2447;">Olga Jiménez Domenech</p>
          <p class="q-ma-none" style="color: #2d5eae; font-size: 9px;">Estilista Canina</p>
          <div class="contact-buttons row q-gutter-sm q-mt-sm">

            <q-icon name="add_shopping_cart"  @click="navigateToForm" />
            <q-icon name="bar_chart" />
            <q-icon name="today" />
          </div>
        </div>
      </div>

      <!-- Segunda columna -->
      <div class="row justify-center q-gutter-md col-6">
        <ChipImporteDiarioVentas encabezado="Ticket Medio"
         :importe="ticketMedioInicial"
         :icon="ticketMedioInicial < ticketMedio ? 'arrow_upward' : 'arrow_downward'"
         :porcentaje="Number((((ticketMedio - ticketMedioInicial) / ticketMedio) * 100).toFixed(2))"
         :clasePorcentaje=" (ticketMedio - ticketMedioInicial) > 0 ? 'text-caption text-positive' : 'text-caption text-negative'"
        :color="(ticketMedio - ticketMedioInicial) < 0 ? 'negative' : 'positive'"

         pie="Ticket medio: "
         :ticketMedio="ticketMedio"

         :claseTicketMedio="ticketMedio > 0? 'text-caption text-positive' : 'text-caption text-negative'"

         />

        <CardNumeroServicios
        :numServicios="numeroServiciosPorHacer"
        :numServiciosActual="numeroServiciosActual"
        :icon=" 142 > numeroServiciosActual ? 'arrow_upward' : 'arrow_downward'"
        :claseNumServiciosActual=" numeroServiciosPorHacer < numeroServiciosActual ? 'text-caption text-positive' : 'text-caption text-negative'"
        :clasePorcentaje=" numeroServiciosPorHacer > numeroServiciosActual? 'text-caption text-positive' : 'text-caption text-negative'"
        :color="(numeroServiciosPorHacer < numeroServiciosActual) ? 'negative' : 'positive'"
        />

        <CardObjetivos :total="total"/>

      </div>

      <!-- Tercera columna -->
      <div class="col-3">
        <ChipInformacion/>
      </div>
    </div>

    <!-- Contenido vertical -->
    <div class="column full-height">
      <div class="display-container q-mt-xs q-mb-md full-width">
        <DisplayInicio/>
      </div>

      <div class="full-width">
        <q-separator color="#0e2447" inset />
        <GraficosComponente />
        <q-separator color="#0e2447" inset />
      </div>

      <div class="q-pa-md flex flex-center">
        <q-btn
          outline
          color="white"
          class="full-width"
          style="max-width: 300px"
        >
          CREAR TARJETA DE CONTACTO
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import GraficosComponente from './GraficosComponente.vue'
import ChipImporteDiarioVentas from './ChipImporteDiarioVentas.vue'
import ChipInformacion from './ChipInformacion.vue'
import CardNumeroServicios from './CardNumeroServicios.vue'
import CardObjetivos from './CardObjetivos.vue'
import DisplayInicio from './DisplayInicio.vue'
import { useRouter } from 'vue-router'
import { ref,onMounted,computed } from 'vue'
const router = useRouter()
import useServices from 'src/composables/servicios.js';
const {fetchServices, fetchServiciosMensuales,fetchServiciosDiarios, ticketMedio,numeroServiciosMensuales,total } = useServices();
const navigateToForm = () => {
  router.push({ name: 'servicios' })
}
const ticketMedioInicial = (26/1.21).toFixed(2)
const numServiciosMensuales = ref(0)
numServiciosMensuales.value = numeroServiciosMensuales.value
const objetivoMensual = 3700
const numeroServiciosPorHacer = (3700/ticketMedioInicial).toFixed(0)

const numeroServiciosActual = computed(() => {
  return Number((objetivoMensual / ticketMedio.value).toFixed(0))
})




onMounted(async() => {
  await fetchServices()
  await fetchServiciosDiarios()
  await fetchServiciosMensuales()
})




</script>

<style scoped>
.profile-header {
  text-align: center;
  padding: 20px;

}

.contact-buttons .q-btn {
  width: 22px;
  height: 22px;
}


/* Añadir estos estilos */
.full-height {
  min-height: 100vh;
}
</style>