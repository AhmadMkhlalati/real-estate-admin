<template>
 <v-container>
  <v-card style="overflow-x: auto">
   <v-card-title>إعادة ترتيب الصور:</v-card-title>
   <v-card-text>
    <Container
     @drop="onDrop"
     behaviour="contain"
     class="">
     <Draggable
      class="d-flex"
      v-for="image in propertyImages"
      :key="image.id">
      <v-card
       outlined
       class="my-2 pa-1 w-100">
       <span>{{image.index}}- </span>
       <v-avatar
        class="mx-2"
        :rounded="false">
        <v-img
         v-if="image.id != 0"
         max-width="100%"
         :src="img_baseUrl + image.url">
        </v-img>
        <v-img
         v-else
         max-width="100%"
         :src="image.url">
        </v-img>
       </v-avatar>
      </v-card>
     </Draggable>
    </Container>
    <v-card-actions class="d-flex justify-end">
     <div @click="applyOrder()">
      <Button label="تطبيق"></Button>
     </div>
    </v-card-actions>
   </v-card-text>
  </v-card>

 </v-container>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, generateItems } from "../plugins/utils/helpers";
import { img_baseUrl } from "../plugins/axios";
export default {
 name: "SimpleHorizontal",
 props: {
  images: {
   default: null
  }
 },
 components: { Container, Draggable },

 data() {
  return {
   img_baseUrl,
   //  sortedImages: this.images.sort((a, b) => {
   //   return a.id - b.id
   //  }),
   propertyImages: this.images
   // items: generateItems(3, (i) => ({ id: i, data: "Draggable " + i })),
  };
 },

 methods: {
  applyOrder() {
   this.$emit('reOrderImages', this.propertyImages)
  },
  onDrop(dropResult) {
   // let images = new Array();
   this.propertyImages = applyDrag(this.propertyImages, dropResult);
   //  this.sortedImages.forEach((x, index) => {
   //   images.push({
   //    id: x.id,
   //    path: this.propertyImages[index].path
   //   })
   //  });
   //this.$emit('reOrderImages', this.propertyImages)
   //  this.$http.put(`images/reorder/${this.$route.params.id}`, {
   //    images: images
   //   })
   //   .then(res => {
   //    this.$notify({
   //     text: 'تمت إعادة ترتيب الصور بنجاح',
   //     color: 'green'
   //    });
   //   })
   //   .catch(err => {
   //    this.$notify({
   //     text: 'فشلت عملية ترتيب الصور',
   //     color: 'red'
   //    });

   //   })
  },
 },
};
</script>
