<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-combobox
          :items="items"
          :label="label"
          :disabled="disabled"
          outlined
          dense
          @change="changeSelect"
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    items: [],
    label: {
      default: "أختر عنصر من القائمة",
    },
    artr: {
      default: "عنصر",
    },
    disabled: {
      default: false,
    },
  },
  methods: {
    changeSelect(val) {
      this.$emit("ReasonSelected", {
        key: this.attr,
        value: val,
      });
    },
  },
};
</script>
