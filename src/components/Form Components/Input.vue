<template>
 <v-text-field
  dense
  :disabled="disabled"
  :placeholder="placeholder"
  :error-messages="errorMessages"
  :type="type"
  v-model="value"
  :label="label"
  :min="min"
  :max="max">
 </v-text-field>
</template>

<script>
export default {
 props: {
  label: {
   default: ''
  },
  model: {
   default: ''
  },
  type: {
   default: 'text'
  },
  disabled: {
   default: false
  },
  placeholder:{
     default:""
  },
  min: {
   default: 0
  },
  max: {
   default: 999999999999
  },
  errorMessages: {
   type: Array
  },
 },
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
