<template>
  <q-card class="my-card bg-primary" style="width: 150px;">
    <div class="q-pa-sm">
      <div class="text-caption text-grey-8">Objetivo 3700€</div>
      <q-circular-progress

      show-value
        font-size="10px"
        style="color: #ea8744"
        class="q-mt-sm q-mx-auto"
        :value="calculateProgress"
        size="52px"
        :thickness="0.07"
        color="#ea8744"
        track-color="grey-3"
      >
        {{Math.round(calculateProgress)}}%
      </q-circular-progress>
      <div class="row items-center q-mt-xs">


        <span :class="3700 > total ? 'text-caption text-orange q-ml-sm' : 'text-caption text-green q-ml-sm'" >Objetivo actual: {{(total/1.21).toFixed(2)}}€</span>

      </div>
    </div>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const calculateProgress = computed(() => {
  return (props.total / 3700) * 100
})


const props = defineProps({

  total: {
    type: Number,
    required: false,
  },
  progress: {
    type: Number,
    required: false,

  },
  color: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },

  clasePorcentaje: {
    type: String,
    required: false,
    default: 'text-caption text-grey-8'
  },
  numServiciosActual: {
    type: Number,
    required: false,
  },
  claseNumServiciosActual: {
    type: String,
    required: false,
    default: 'text-caption text-grey-8'
  },

})
</script>

<style scoped>
.my-card {
  border-radius: 12px;
}

.text-h5 {
  font-weight: 600;
  font-size: 1.0rem;
}

.text-caption {
  font-size: 0.65rem;
}
</style>
