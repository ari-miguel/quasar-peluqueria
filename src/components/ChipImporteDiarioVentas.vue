<template>
  <q-card class="my-card bg-primary" style="width: 150px;">
    <div class="q-pa-sm">
      <div class="text-caption text-grey-8">{{props.encabezado}}</div>
      <div class="text-h5 q-mt-sm text-dark">{{ props.importe }}€</div>
      <div class="row items-center q-mt-xs">
        <q-icon :name="props.icon"  :color="props.color" size="xs" />
        <span :class="props.clasePorcentaje">
          {{ calculatePercentage(ticketMedio, importe) }}%
        </span>
        <span :class="importe > ticketMedio ? 'text-caption text-orange q-ml-sm' : 'text-caption text-green q-ml-sm'" >{{ props.pie }} {{ props.ticketMedio }}€</span>
      </div>
    </div>
  </q-card>
</template>

<script setup>
const calculatePercentage = (actual, target) => {
  if (!target) return 0
  return Number((((actual - target) / target) * 100).toFixed(2))
}
const props = defineProps({
  encabezado: {
    type: String,
    required: false,
  },
  importe: {
    type: Number,
    required: false,
  },
  porcentaje: {
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
  pie: {
    type: String,
    required: false,
  },
  clasePorcentaje: {
    type: String,
    required: false,
    default: 'text-caption text-grey-8'
  },
  ticketMedio: {
    type: Number,
    required: false,
  },
  claseTicketMedio: {
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

