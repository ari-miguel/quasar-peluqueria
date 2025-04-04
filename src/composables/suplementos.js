import { supabase } from "src/lib/supabaseClient"
import { ref } from 'vue'

export default function useSupabase() {
  const suplementos = ref([]);
  const loading = ref(false);
  const error = ref(null);


  const fetchSuplementos = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('suplementos') // Nombre de la tabla
        .select('*'); // Selecciona todos los campos, ajusta según tus necesidades

      if (fetchError) throw fetchError;

      suplementos.value = data;

    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const insertarSuplementos = async(servicio_id,suplemento_id)=>{

    const { data, error } = await supabase
  .from('servicio_suplementos')
  .insert([
    {servicio_id, suplemento_id},
  ])
  .select()
  console.log(data)
  console.log(error)

  }
  // Array of Objects returned in response body

  return {
    suplementos,
    loading,
    error,

    fetchSuplementos,
    insertarSuplementos
  };
}


