<template>
 <v-dialog 
  class="rounded-0 bg-white darken-2"
  v-model="notify"
  max-width="400">
  <v-card>
   <v-card-title class="text--h6">{{title}}</v-card-title>
   <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
     color="blue darken-1"
     text
     @click="confirmDialog(true)">نعم</v-btn>
    <v-btn
     color="blue darken-1"
     text
     @click="confirmDialog(false)">تراجع</v-btn>

    <v-spacer></v-spacer>
   </v-card-actions>
  </v-card>
 </v-dialog>
</template>

<script>
export default {
 props: {
  isPopup: {
   default: false
  },
  title: {
   default: ''
  },
  description: {
   default: ''
  },

 },
 data() {
  return {
   notify: false
  }
 },
 watch: {
  isPopup() {
   this.notify = true
  }
 },
 methods: {
  confirmDialog(val) {
   if (val) {
    this.$emit('confirmDialog')
   }
   this.notify = false
  }
 }
}
</script>
