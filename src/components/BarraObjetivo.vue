co<template>
<q-card class="progress-card q-pa-sm bg-primary" flat bordered>
  <q-card-section class="q-pa-sm">
    <div class="row items-center">
      <div class="text-caption" style="color:#0e2447">Objetivo mensual</div>
      <q-space />

    </div>

    <div class="row justify-center">

      <q-circular-progress
        show-value
        font-size="10px"
        style="color: #ea8744"
        class="q-mt-sm"
        :value="progress*100"
        size="40px"
        :thickness="0.07"
        color="#ea8744"
        track-color="grey-3"
      >
        {{Math.round(progress * 100)}}%
      </q-circular-progress>
    </div>
  </q-card-section>
</q-card>
</template>

<script setup>
import { ref } from 'vue'
const progress = ref(0.8)

</script>

<style scoped>
.progress-card {
  max-width: 200px;
  border: 1.5px solid #ea8744;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.progress-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.progress-bar {
  border-radius: 10px;
}
</style>