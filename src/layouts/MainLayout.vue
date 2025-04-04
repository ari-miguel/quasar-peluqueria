<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar style="background-color: #ffffff">
        <q-btn
          flat
          dense
          class="text-black"
          icon="menu"
          size="xs"
          @click="toggleDrawer"
        />
        <q-toolbar-title class="text-black text-subtitle2"> Peluquería </q-toolbar-title>

        <q-btn
          label="Servicio"
          flat
          dense
          class="text-caption"
          icon="content_cut"
          size="xs"
          style="color: #00E676; font-size: 9px"
        >
          <q-badge color="green" floating style="font-size: 8px">{{ storeDisplay.precioServicio }}€</q-badge>
        </q-btn>


      </q-toolbar>
    </q-header>

    <q-drawer
      width="250"
      v-model="drawer"
      style="background-color: #ffffff"
      show-if-above
      bordered
      class="drawer"
    >

    <q-list style="width: 300px; background-color: #ffffff;" class="q-mx-auto q-pa-xs q-my-md rounded-borders text-caption">

      </q-list>
      <q-separator />

      <q-list style="width: 300px; background-color: #ffffff;" class="q-mx-0 q-pa-xs q-my-md rounded-borders">
        <q-item>
          <q-item-section avatar>
            <q-icon name="sunny" color="yellow" size="xs"/>
          </q-item-section>

          <q-item-section>
            <q-item-label style="font-size: small;" class="text-caption" lines="1"
              >{{ temp }}°C</q-item-label
            >
            <q-item-label style="font-size: xx-small;" class="text-caption">{{
              direccion
            }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="eva-thermometer" size="xs" color="blue" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator class="q-mx-0" />
      <q-list style="width: 300px; background-color: #ffffff;" class="q-mx-0 q-pa-xs q-my-md rounded-borders text-caption">
        <q-item>


          <q-item-section>
            <q-linear-progress class="text-caption q-mx-md" size="20px" :value="progress" color="primary">
            <div class="absolute-full flex flex-center">
              <q-badge color="white" text-color="primary" :label="progress" style="font-size: 8px;" />
            </div>
          </q-linear-progress>
          </q-item-section>

        </q-item>
        <q-separator />
        <q-item>

          <q-item-section>

            <q-item>
              <q-item-section>
                <div style="height: 200px;">
                  <Bar :data="data" :options="options" />
                </div>
              </q-item-section>
            </q-item>
          </q-item-section>

        </q-item>
        <q-separator />
        <q-item clickable v-ripple @click="navigateTo('eventos')">
          <q-item-section avatar>
            <q-icon name="contact_mail" size="xs"/>
          </q-item-section>
          <q-item-section> Contacto </q-item-section>
        </q-item>
        <q-separator />

        <q-item clickable v-ripple @click="navigateTo('files')">
          <q-item-section avatar>
            <q-icon name="contact_mail" size="xs"/>
          </q-item-section>
          <q-item-section> Archivos </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-footer class="text-black" elevated style="background-color: #ffffff;">
      <div class="row items-center justify-center q-py-xs">

        <span style="font-size: 10px;">Servicios de Peluqueria Zenia © 2025</span>
        <q-icon name="pets" size="14px" color="primary" class="q-ml-xs" style="transform: scaleX(-1);" />
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

import { useWeather } from "src/stores/weather-store";
import {useDisplayStore} from 'src/stores/display-store.js';
const storeDisplay = useDisplayStore()
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const weatherStore = useWeather();

const progress = 0.7; // Valor de progreso entre 0 y 1
const drawer = ref(false);
const router = useRouter();
const temp = ref(0);
const conditions = ref("");
const direccion = ref("");
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const navigateTo = (route) => {
  router.push({ name: route });
  drawer.value = false;
};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    data: [40, 20, 12, 29, 90, 87, 45, 23, 45, 90, 12, 34],
    backgroundColor: '#1976D2' // Primary color
  }]
}

  const options = {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'Ventas/Mes',
                  font: {
                    size: 8
                  },
                  padding: {
                    top: 2,
                    bottom: 2
                  }
                }
              },
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: 6
                    }
                  }
                },
                y: {
                  ticks: {
                    font: {
                      size: 6
                    }
                  }
                }
              },
              layout: {
                padding: {
                  top: 2,
                  bottom: 2,
                  left: 2,
                  right: 2
                }
              }
            }

            // Update the Bar component wrapper


onMounted(async () => {
  const weather = await weatherStore.obtenerTiempo();
  temp.value = weather.temp;
  conditions.value = weather.condition;
  direccion.value = weather.direccion;
});
</script>

<style scoped>
.drawer {
  background-color: #f5f5f5;
}

.q-item {
  transition: background-color 0.3s ease;
}

.q-item:hover {
  background-color: #e0f7fa;
}

.grisColor {
  background-color: #466c91;
}

.azul1 {
  background-color: #84a7d2;
}

.azul2 {
  background-color: #aec6e8;
}
.azul3 {
  background-color: #d8e4ee;
}

.text-azul3 {
  color: #d8e4ee;
}

.bg-transparent {
  background-color: transparent;
}
</style>
