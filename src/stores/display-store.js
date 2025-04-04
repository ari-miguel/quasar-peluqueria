import { defineStore } from "pinia";
import { ref,computed, watchEffect} from "vue";
export const useDisplayStore = defineStore("display", () => {
  const activarListaServicios = ref(false);
  const activarListaSuplementos = ref(false);
  const activarDisplayInicio = ref(false);
  const tipoMascota = ref("")
  const precioServicio = ref(0)
  const listaSuplementos = ref([])
  const ticketMedio = ref(26)


  const importeServicio = ref(0)
  const importeSuplementos = ref(0)

  const cambiarValorTipoMascota = (valor) => {
    tipoMascota.value = valor;
  };

  const total = computed(() => {
    return importeServicio.value + importeSuplementos.value;
  });

  const sumarServicios = ((importe) => {
    importeServicio.value =+ importe;
  });

  const sumarSuplementos = (() => {
    listaSuplementos.value.reduce((acumulador, item) => {
      acumulador += item.precio;
      return importeSuplementos.value =  acumulador;},0)
    })

    const eliminarSuplemento = ((indice) => {
      listaSuplementos.value.splice(indice, 1);
      sumarSuplementos();
    })

    watchEffect(() => {
      if(listaSuplementos.value.length <= 0){
        importeSuplementos.value = 0;
      }
    })






return {
  activarListaServicios,
  activarListaSuplementos,
  tipoMascota,
  cambiarValorTipoMascota,
  precioServicio,
  activarDisplayInicio,
  total,
  importeServicio,
  importeSuplementos,
  sumarServicios,
  sumarSuplementos,
  listaSuplementos,
  eliminarSuplemento,
  ticketMedio,
};
})