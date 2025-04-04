import { supabase } from "src/lib/supabaseClient"
import { computed, ref} from 'vue'


export default function useService() {
  const servicios = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const serviciosTipo = ref([]);
  const serviciosDiarios = ref([]);
  const serviciosMensuales = ref([]);
  const numeroServiciosMensuales = ref(0);
  const total = ref(0)


  const fetchServices = async (tipo) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('tipo_servicio') // Nombre de la tabla
        .select('*'); // Selecciona todos los campos, ajusta según tus necesidades

      if (fetchError) throw fetchError;
      serviciosTipo.value = []
      servicios.value = data;
      servicios.value.map((servicio) => {
        if(servicio.tipo === tipo){
          serviciosTipo.value.push({servicio:servicio.servicio,precio:servicio.precio_iva})

        }

      })

      console.log(serviciosTipo.value)

    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const insertarServicio= async  (servicio,created_at,precio,suplemento,total,num_suple,tipo)=>{
    const { data, error } = await supabase
    .from('servicios')
    .insert([
    { servicio,created_at, precio, suplemento, total,num_suple,tipo },
  ])
  .select()
  fetchServiciosDiarios()
  return {data,error}
  }



// Add this function after other functions
const fetchServiciosDiarios = async () => {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('servicios')
    .select('*')
    .eq('created_at', today);

  if (data) serviciosDiarios.value = data;
  console.log(error)
};

const eliminarServicio = async (id) => {
  const { data, error } = await supabase
   .from('servicios')
   .delete()
   .eq('id', id);
  if (data) {
    // Remove the deleted item from the list
    serviciosDiarios.value = serviciosDiarios.value.filter(servicio => servicio.id !== id);

  }
  fetchServiciosDiarios()
  console.log(error)
}

const ticketMedio = computed(() => {
  total.value = serviciosMensuales.value.reduce((acc, servicio) => acc + servicio.total, 0);
  console.log(total)
  return Number(( total.value / serviciosMensuales.value.length || 0)/1.21).toFixed(2);
});


const fetchServiciosMensuales = async () => {
  //const today = new Date();
  //const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
  //const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('servicios')
    .select('*')
    .gte('created_at', "2025-04-1")
    .lte('created_at', "2025-04-30");
  console.log(data)
  if (data) serviciosMensuales.value = data;
  numeroServiciosMensuales.value = serviciosMensuales.value.length;

  console.log(error);
};

const fetchTotalesPorTipo = async (tipo) => {
  const { data, error } = await supabase
    .from('servicios')
    .select('*')
    .eq('tipo', tipo)
    .gte('created_at', "2025-04-1")
    .lte('created_at', "2025-04-30");

  if (data) {
    const totales = {
      servicios: data.reduce((acc, item) => acc + item.precio, 0),
      suplementos: data.reduce((acc, item) => acc + item.suplemento, 0)
    };
    return totales;
  }
  console.log(error);
  return { servicios: 0, suplementos: 0 };
};



  return {

    loading,
    error,
    fetchServices,
    serviciosTipo,
    insertarServicio,
    fetchServiciosDiarios,
    serviciosDiarios,
    eliminarServicio,
    ticketMedio,
    fetchServiciosMensuales,
    numeroServiciosMensuales,
    serviciosMensuales,
    total,
    fetchTotalesPorTipo
  }
}
