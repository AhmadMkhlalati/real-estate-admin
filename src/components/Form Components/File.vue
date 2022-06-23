<template>
 <v-file-input 
  clearable
  dense
  :accept="accept"
  :error-messages="errorMessages"
  v-model="value"
  :label="label">
 </v-file-input>
</template>

<script>
export default {
 props: {
  label: {
   default: ''
  },
  model: {
   default: null
  },
  accept: {
   default: ''
  },
  errorMessages: {
   type: Array
  },
 },
 data() {
  return {
   value: null
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
