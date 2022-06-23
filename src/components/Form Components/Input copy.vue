<template>
 <v-text-field
  :error-messages="valueErrors"
  :type="type"
  v-model="value"
  @input="$v.value.$touch()"
  @blur="$v.value.$touch()"
  :label="label">
  </v-text-field>
</template>

<script>
import { validationMixin } from 'vuelidate'

export default {
 mixins: [validationMixin],
 validations(){
   return this.validations_prop
 },
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
  errorMessages:{
    type:Object
  },
  validations_prop:{
    value:{
    }
  }
 },
 data() {
  return {
   value: ''
  }
 },
 computed:{
  valueErrors() {
   const errors = []
   if (!this.$v.value.$dirty) return errors;
   !this.$v.value.maxLength && errors.push(this.errorMessages.maxlength);
   !this.$v.value.required && errors.push(this.errorMessages.required);
   return errors
  },

 },
 watch: {
  model(val) {
   this.value = val
  },
  value(val) {
   this.$emit('changeValue', {
     value:val,
     isValid:this.$v.value.$touch()
   })
  }
 },
 mounted() {
  this.value = this.model
 }
}
</script>
