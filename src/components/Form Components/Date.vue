<template>
 <v-date-picker
  full-width
  v-model="value"
  class="mt-4"></v-date-picker>
</template>

<script>
export default {
 data() {
  return {
   value: ''
  }
 },
 computed: {

 },
 watch: {
  model(val) {
   this.value = val
  },
  value(val) {

   this.$emit('changeValue',
    val,
   )
  }
 },
 mounted() {
  this.value = this.model
 }
}
</script>
