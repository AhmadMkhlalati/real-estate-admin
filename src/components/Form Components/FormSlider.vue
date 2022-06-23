<template>
 <v-slider 
  @change="$emit('value', value)"
  step="1"
  tick-size="3"
  track-color="primary"
  thumb-label="always"
  thumb-size="20"
  track-fill-color="secondary"
  v-model="value"
  :max="max"
  :min="min"
  height="50"
  class="form-slider"
  thumb-color="white black--text">
  <template v-slot:label>
   <span class="font-weight-light color-1 text-capitalize text-subtitle-2 d-flex align-center" color="primary">{{label}}</span>
  </template>
  <!-- <template v-slot:append>
     <div color="">{{min_price}}</div>
     <v-text-field
      dense
      filled
      flat
      solo-inverted
      v-model="min_price"
      class="mt-0 pt-0 text-subtitle-2"
      type="number"
      style="width: 60px"></v-text-field>
    </template> -->
 </v-slider>

</template>

<script>
export default {
 props: {
  label: {
   default: ''
  },
  min: {
   default: 0
  },
  max: {
   default: 10
  },
  model: {
   default: 0
  },
 },
 data() {
  return {
   value: 0
  }
 },
 watch: {
  model(val) {
   this.value = val
  }
 },
}
</script>
