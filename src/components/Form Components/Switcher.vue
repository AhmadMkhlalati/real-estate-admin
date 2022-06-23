<template>
 <v-switch
  flat
  inset
  v-model="value"
  :label="label"
  class="mx-2 mt-3 d-flex">
 </v-switch>
</template>

<script>
export default {
 props: {
  label: String,
  attr: String,
  model: {
   default: 0
  }
 },
 data() {
  return {
   value: false
  }

 },
 watch: {
  value(val) {
      
   this.$emit('switcher', {
    key: this.attr,
    value: val == true ? 1 : 0
   })
  },
  model(val) {
   this.value = val == 1 ? true : false

  }
 },
 mounted() {
  this.value = this.model == 1 ? true : false
 }

}
</script>
