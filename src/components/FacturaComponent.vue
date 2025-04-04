<template>
  <div class="q-pa-md">
    <q-list class="shadow-4 mx-auto" style="width: 70vw; border-radius: 16px; background: #ffffff; min-width: 250px; max-width: 600px">
      <div class="row items-center q-pb-md q-px-md bg-primary text-white" style="border-radius: 16px 16px 0 0">
        <div class="col">
          <q-btn flat round dense icon="close" @click="cancelar" />
        </div>
        <div class="col text-center text-subtitle1 text-weight-medium">
          Factura
        </div>
        <div class="col text-right">
          <q-btn flat round dense icon="check" @click="confirmDialog = true;" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-pa-md">
        <div class="col-12 col-md-6">
          <q-select
            v-model="selectedService"
            :options="serviciosTipo"
            :option-label="item => `${item.servicio} - ${item.precio}€`"
            @update:model-value="sumarServicio"
            label="Servicio"
            class="q-mb-md"
            dense
            outlined
            style="font-size: 11px"
            input-class="text-caption"
            label-class="text-caption"
          >
            <template v-slot:prepend>
              <q-icon name="content_cut" color="primary" size="xs" />
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-6">
          <q-select
            v-model="selectedSupplement"
            :options="suplementos"
            :option-label="item => `${item.descripcion} - ${item.precio}€`"
            label="Suplemento"
            class="q-mb-md"
            dense
            outlined
            style="font-size: 11px"
            input-class="text-caption"
            label-class="text-caption"
          >
            <template v-slot:prepend>
              <q-icon name="sanitizer" color="primary" size="xs" />
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="fecha"
            type="date"
            label="Fecha"
            dense
            outlined
            class="text-caption"
            input-class="text-caption"
            label-class="text-caption"
          >

          </q-input>
        </div>
      </div>

      <q-separator class="q-mx-md" color="grey-3" />

      <div class="q-pa-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12">
            <SuplementosChips/>
          </div>

          <div class="col-12">
            <q-table
              flat
              dense
              :rows="serviciosDiarios"
              :columns="[
                { name: 'id', label: 'ID', field: 'id', align: 'left' },
                { name: 'created_at', label: 'Fecha', field: 'created_at', align: 'left' },
                { name: 'servicio', label: 'Servicio', field: 'servicio', align: 'left' },
                { name: 'precio', label: 'Precio Servicio', field: 'precio', align: 'right' },
                { name: 'suplemento', label: 'Suplementos', field: 'suplemento', align: 'right' },
                { name: 'total', label: 'Total', field: 'total', align: 'right' },
                { name: 'actions', label: '', field: 'actions', align: 'center' }
              ]"
              hide-pagination
              hide-bottom
              style="font-size: 10px; height: 150px;"
              virtual-scroll
              :virtual-scroll-sticky-size="48"
              :rows-per-page-options="[0]"
              class="rounded-borders"
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="bg-primary text-white"
                    style="font-size: 10px; padding: 8px"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props" class="cursor-pointer">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    style="font-size: 8px; padding: 4px"
                    :class="col.name === 'total' ? 'text-primary text-weight-medium' : ''"
                  >
                    <template v-if="col.name === 'actions'">
                      <q-btn
                        flat
                        round
                        dense
                        color="negative"
                        icon="delete"
                        size="xs"
                        @click="eliminarServicio(props.row.id)"
                      />
                    </template>
                    <template v-else>
                      {{ props.row[col.field] }}
                    </template>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12">
            <div class="bg-grey-4" style="border-radius: 8px; padding: 12px;">
              <div class="row justify-end items-center q-gutter-x-lg q-px-md">
                <div class="column items-end">
                  <div class="text-grey-8" style="font-size: 10px;">Servicio</div>
                  <div style="font-size: 11px;">{{ storeDisplay.importeServicio }}€</div>
                </div>
                <div class="column items-end">
                  <div class="text-grey-8" style="font-size: 10px;">Suplementos</div>
                  <div style="font-size: 11px;">{{ storeDisplay.importeSuplementos }}€</div>
                </div>
                <q-separator vertical inset color="primary" style="opacity: 0.2" />
                <div class="column items-end">
                  <div class="text-grey-8" style="font-size: 10px;">Total</div>
                  <div class="text-weight-bold text-primary" style="font-size: 12px;">{{ storeDisplay.total }}€</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-list>

    <div v-show="activarBanner" class="banner-container q-mt-xs q-mx-auto">
      <q-banner dense class="bg-primary text-white custom-banner text-caption">
        <template v-slot:avatar>
          <q-icon name="info" color="white" size="xs" />
        </template>
        Servicio añadido correctamente
      </q-banner>
    </div>
  </div>



  <!-- Add this at the end of template, before closing div -->
  <q-dialog v-model="confirmDialog">
    <q-card class="text-caption">
      <q-card-section class="row items-center">
        <span class="text-weight-bold">Confirmar Servicio</span>
      </q-card-section>

      <q-card-section>
        <div>Fecha: {{ fecha }}</div>
        <div>Servicio: {{ selectedService?.servicio }}</div>
        <div>Número de suplementos: {{ storeDisplay.listaSuplementos.length }}</div>
        <div>Total: {{ storeDisplay.total }}€</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="grey" v-close-popup @click="cancelarDialog"/>
        <q-btn flat label="Confirmar" color="green" @click="confirmarServicio" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch,onMounted,watchEffect} from 'vue';
import SuplementosChips from 'src/components/SuplementosChips.vue';
import { useDisplayStore } from 'src/stores/display-store.js';
import useServices from 'src/composables/servicios.js';
import useSuplementos from 'src/composables/suplementos.js';

const storeDisplay = useDisplayStore();
const { serviciosTipo,fetchServices,insertarServicio,fetchServiciosDiarios,serviciosDiarios,eliminarServicio } = useServices();
const { suplementos,fetchSuplementos,insertarSuplementos } = useSuplementos();
import { useRouter } from 'vue-router'
const router = useRouter()

const fecha = ref('');
fecha.value = new Date().toISOString().split('T')[0];
const selectedService = ref(null);
const selectedSupplement = ref(null);
const activarBanner = ref(false); // Add this line to define the activarBanner ref

const confirmDialog = ref(false);

const sumarServicio = ()=>{
  if (selectedService.value) {
    storeDisplay.sumarServicios(selectedService.value.precio)


  }
}

const mostrarBanner = () => {
  activarBanner.value = true;
  setTimeout(() => {
    activarBanner.value = false;
    resetForm()
    router.push({ name: 'home' })
  }, 2000);

};



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


watchEffect(() => {
  if (selectedSupplement.value) {
    storeDisplay.listaSuplementos.push(selectedSupplement.value);
    storeDisplay.sumarSuplementos()
    selectedSupplement.value = null;
}

});

const cancelar = () => {
  resetForm()
  router.push({ name: 'home' })
  storeDisplay.activarListaServicios = false;
  storeDisplay.activarDisplayInicio = true;


};

const cancelarDialog = () => {
  confirmDialog.value = false;

};

const confirmarServicio =async () => {


  const {data,error} = await insertarServicio(selectedService.value.servicio,fecha.value,storeDisplay.importeServicio,storeDisplay.importeSuplementos,storeDisplay.total,storeDisplay.listaSuplementos.length,storeDisplay.tipoMascota)
  console.log(data)
  if(storeDisplay.listaSuplementos.length>0){
    for(let item of storeDisplay.listaSuplementos){
    await insertarSuplementos(data[0].id,item.id)

  }

  }
  console.log(error)
  mostrarBanner()


}

  const resetForm =()=>{
    selectedService.value = null
    storeDisplay.importeServicio = 0
    storeDisplay.importeSuplementos = 0

    storeDisplay.listaSuplementos = []

    fetchServiciosDiarios()

  }


 /*  watch(() => serviciosDiarios.value.length,(newValue) => {
    serviciosDiarios.value = newValue;
  }); */



onMounted(() => {
  fetchSuplementos();
  fetchServiciosDiarios();
  
})
</script>

<style scoped>
.banner-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  font-size: 10px;
}

.custom-banner {
  padding: 8px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
</style>