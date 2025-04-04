<template>
<div style="max-width: 400px">
  <q-card class="q-pa-md" style="border-radius: 12px; background: #f5f5f5;">
    <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md text-caption"
      >
        <q-input
          style="width: 200px;"
          filled
          label="Servicio"
          hint="Precio servicio"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          :input-style="{ fontSize: '10px' }"
          :label-style="{ fontSize: '10px' }"
          :hint-style="{ fontSize: '6px', color: 'grey' }"
          dense
        />

        <q-input
          style="width: 200px;"
          filled
          label="Suplementos"
          hint="Precio suplementos"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          :input-style="{ fontSize: '10px' }"
          :label-style="{ fontSize: '10px' }"
          :hint-style="{ fontSize: '6px', color: 'grey' }"
          dense
        />

        <q-input
          filled
          style="width: 300px;"
          label="Total"
          hint="Total servicio + suplementos"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          :input-style="{ fontSize: '10px' }"
          :label-style="{ fontSize: '10px' }"
          :hint-style="{ fontSize: '6px', color: 'grey' }"
          dense
        />

        <div>
          <q-btn style="font-size: 10px" class="text-caption" label="Submit" type="submit" color="primary"/>
          <q-btn style="font-size: 10px" class="text-caption q-ml-sm" label="Reset" type="reset" color="primary"/>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</div>
</template>

<script setup>


</script>
