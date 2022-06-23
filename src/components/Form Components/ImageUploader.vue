<template>
 <div>
  <v-row>
   <v-col>
    <v-btn
     color="primary"
     @click="dialog=true">
     إعادة ترتيب الصور
     <v-icon class="ms-2">
      mdi-format-float-left
     </v-icon>
    </v-btn>
   </v-col>
  </v-row>
  <v-row>
   <v-col
    v-for="(image) in value"
    :key="image.id"
    md="4"
    class="d-flex flex-column align-center align-end">
    <div style="width: 100px; height: 100px; display: flex;margin: auto;">
     <v-img
      v-if="image.id != 0"
      max-width="100%"
      min-height="50px"
      :src="img_baseUrl + image.url">
     </v-img>
     <v-img
      v-else
      max-width="100%"
      min-height="50px"
      :src="image.url">
     </v-img>
    </div>
    <span @click="removeImage(image.index)">
     <Button label="إزالة الصورة"></Button>
    </span>
   </v-col>
  </v-row>
  <v-file-input
   dense
   accept="images/*"
   :label="label"
   class="mt-5"
   @change="selectImages">
  </v-file-input>
  <v-dialog
   v-model="dialog"
   max-width="500px">
   <DragDropImages
    v-if="dialog"
    :images="value"
    @reOrderImages="applyNewOrder"></DragDropImages>
  </v-dialog>
 </div>
</template>

<script>
import { img_baseUrl } from "@/plugins/axios"
export default {
 props: {
  label: {
   default: ''
  },
  images: {
   default: []
  }
 },
 data() {
  return {
   dialog: false,
   img_baseUrl,
   value: this.images,
   imagesData: [],
  }
 },
 watch: {
  value(val) {
   let images_ids = val.map(x => {
    return x.id
   })
   this.$emit('updateImages', {
    ids: images_ids,
    files: this.imagesData.map(x => {
     return x.data
    })
   })
  }
 },
 methods: {
  applyNewOrder(val) {
   this.value = val
   this.dialog = false
  },
  selectImages(val) {
   let newIndex = this.value.length + 1
   if (this.value.length > 0)
    newIndex = this.value[this.value.length - 1].index + 1
   this.value.push({
    url: URL.createObjectURL(val),
    index: newIndex,
    id: 0
   })
   this.imagesData.push({
    data: val
   })
  },
  removeImage(index) {
   this.value = this.value.filter(x => x.index != index)
   this.imagesData = this.imagesData.filter(x => x.index != index)
  },

 }
}
</script>
