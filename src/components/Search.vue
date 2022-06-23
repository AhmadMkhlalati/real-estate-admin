<template>
 <v-text-field
  v-model="value"
  append-icon="mdi-magnify"
  label="Search"
  single-line
  hide-details></v-text-field>
</template>

<script>
export default {
 data() {
  return {
   value: ''
  }
 },
 watch: {
  value(val) {
   this.$emit('search', {
    key: 'search',
    value: val
   })
  }
 }
}
</script>
