<template>
  <div class="row q-col-gutter-sm q-px-md justify-center items-center" style="max-width: 900px; margin: 0 auto;">
    <div class="col-auto col-md-3" v-for="type in petTypes" :key="type.name">
      <q-card class="pet-card cursor-pointer" style="width: 190px;" @click="selectPet({ name: type.name })">
        <q-card-section horizontal class="items-center q-pa-sm">
          <q-avatar size="30px" class="q-mr-sm">
            <img :src="type.img">
          </q-avatar>
          <div>
            <div class="text-caption">{{ type.name }}</div>
            <div class="row q-gutter-x-xs q-mt-xs">
              <q-chip class="pet-chip" dense size="xs" color="primary" text-color="#ff6ce3">
                <q-icon name="content_cut" size="xs" class="q-mr-xs"/>
                {{ type.price }}€
              </q-chip>
              <q-chip class="pet-chip" dense size="xs" color="primary" text-color="#fffba7">
                <q-icon name="sanitizer" size="xs" class="q-mr-xs"/>
                {{ type.supplement }}€
              </q-chip>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { watch,ref,onMounted } from 'vue';
import {useDisplayStore} from 'src/stores/display-store.js';
import useServices from 'src/composables/servicios.js';
import { useRouter } from 'vue-router'
const { fetchTotalesPorTipo } = useServices();

const router = useRouter()
const storeDisplay = useDisplayStore()

const petTypes = ref([]);

watch(
    () => storeDisplay.tipoMascota,
    (nuevoTipoMascota) => {
      if (nuevoTipoMascota) {
        storeDisplay.tipoMascota= nuevoTipoMascota

      }
    },
    { immediate: true } // Para ejecutarlo al inicio
  );

  petTypes.value = [
  {
    name: 'Toy',
    icon: 'pets',
    description: 'Perro tamaño Toy',
    img: 'https://goizametz.com/wp-content/uploads/2024/03/8594478-e1737656931863.png',
    price: 0,
    supplement: 0
  },
  {
    name: 'Pequeño',
    icon: 'pets',
    description: 'Perro tamaño Pequeño',
    img: 'https://static.vecteezy.com/system/resources/thumbnails/057/905/022/small/small-fluffy-brown-black-puppy-sitting-curious-eyes-free-png.png',
    price: 0,
    supplement: 0
  },
  { name: 'Mediano', icon: 'pets', description: 'Perro tamaño Mediano',
    img: 'https://www.perrosderaza.co/wp-content/uploads/2023/01/Razas-Medianas-Perros-de-Raza.png',
    price: 0,
    supplement: 0 },
  { name: 'Grande', icon: 'pets', description: 'Perro tamaño Grande',
    img: 'https://png.pngtree.com/png-clipart/20240915/original/pngtree-big-fluffy-great-pyrenees-dog-isolated-on-transparent-background-png-image_16014077.png' },
  { name: 'Gigante', icon: 'pets', description: 'Perro tamaño Gigante',
    img: 'https://vitalcan.com/wp-content/uploads/2021/04/balanced-animal-perro-adulto-raza-gigante-@2x-vitalcan.png' },
  { name: 'Senior', icon: 'elderly', description: 'Perro Senior',
    img: 'https://www.veteralia.com/wp-content/uploads/2017/04/GosSenior_Eliminacio.png' },
  { name: 'Conejo', icon: 'cruelty_free', description: 'Servicios Conejo',
    img: 'https://png.pngtree.com/png-clipart/20231019/original/pngtree-graceful-rabbit-beauty-png-image_13370532.png' },
  { name: 'Gato', icon: 'content_cut', description: 'Servicios Gato',
    img: 'https://www.anicura.es/cdn-cgi/image/f=auto,fit=cover,w=285,h=380,g=auto,sharpen=1/AdaptiveImages/powerinit/26294/Brittish%20Short%20Hair%201.jpg?stamp=5200dd5b9f5352d2af8cfa40904aaff46db0fb48' }
];


const selectPet = (petTypes) => {

  storeDisplay.tipoMascota = petTypes.name.toLowerCase()
  router.push({ name: 'formulario' })
  storeDisplay.activarListaServicios = true
  storeDisplay.activarDisplayInicio = false


};

onMounted(async () => {
  for (let type of petTypes.value) {

    const totales = await fetchTotalesPorTipo(type.name.toLowerCase());
    type.price = (totales.servicios /1.21).toFixed(2)
    type.supplement = (totales.suplementos/1.21).toFixed(2)

  }
});


</script>

<style scoped>
.pet-card {
  width: 170px;
  background: #1976D2;
  border-radius: 12px;
  transition: all 0.2s ease;
  border: 1px solid rgba(0,0,0,0.08);
  color: #0e2447
}

.pet-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

}

.pet-card:hover .pet-chip {
  background: #f8f9fa;
  color: white;

}

.pet-chip:hover {
  color: white;
}
.q-avatar img {
  object-fit: cover;
}
</style>


