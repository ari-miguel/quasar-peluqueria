<template>
  <q-card class="my-card" style="background: #1e2a3d; width: 200px;">
    <div class="row q-pa-sm items-center">
      <div class="col-8 text-left">
        <div class="text-white time-text">
          17:42
        </div>
        <div class="text-white text-caption">
          Mar, 22/08/2023
        </div>
        <div class="text-white text-caption">
          Torrevieja
        </div>

      </div>
      <div class="col-4">
        <q-icon
          name="wb_sunny"
          color="amber"
          size="35px"
        />
        <div class="text-white weather-text">
          Soleado, 38°C
        </div>
      </div>

    </div>
  </q-card>
</template>

<style scoped>
.my-card {
  border-radius: 8px;
}

.time-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.weather-text {
  font-size: 0.7rem;
}

.text-caption {
  font-size: 0.5rem;
}
</style>