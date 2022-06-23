<template>
  <div>
    <v-card elevation="24" class="ma-auto" width="500px">
      <v-row justify="space-around" class="mx-auto">
        <v-icon @click="model--"> mdi-minus </v-icon>
        {{ model }}
        <v-icon @click="model++"> mdi-plus </v-icon>
      </v-row>
      <v-carousel v-model="model">
        <v-carousel-item v-for="(image, i) in images" :key="i">
          <v-sheet tile height="100%">
            <v-row align="center" justify="center">
              <div class="text-h2">
                <v-img
                  aspect-ratio="5:5"
                  height="600px"
                  lazy-src="@/assets/logo.jpeg"
                  contain
                  :src="`${img_baseUrl}${image.url}`"
                ></v-img>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
            <v-list-item-subtitle v-if="images[0].type == 'street_image'"
              >صور الشارع</v-list-item-subtitle
            >
            <v-list-item-subtitle v-else-if="images[0].type == 'estate_image'"
              >صور العقار</v-list-item-subtitle
            >
            <v-list-item-subtitle v-else>صور الطابق</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="blue" dark @click="close"> الغاء </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { img_baseUrl } from "@/plugins/axios";

export default {
  props: {
    images: Array,
    model: Number,
  },
  data() {
    return {
      img_baseUrl,
    };
  },
  methods: {
    close() {
      this.$emit("closeDialog");
    },
  },
};
</script>
