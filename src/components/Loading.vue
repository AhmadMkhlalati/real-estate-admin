<template>
 <div class="d-flex justify-center" :class="containerClasses">
  <v-expand-x-transition>
   <v-progress-circular
    :width="width"
    :size="size"
    indeterminate
    :color="color"></v-progress-circular>
  </v-expand-x-transition>
 </div>
</template>

<script>
export default {
 props: {
  color: {
   default: "primary"
  },
  size:{
    default:30
  },
  width:{
    default:3
  },
  containerClasses:{
    default:'mt-10'
  }

 }
}
</script>
