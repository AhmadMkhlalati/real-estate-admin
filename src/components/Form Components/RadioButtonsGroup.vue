<template>
  <v-radio-group class="custom-radio" row label="" v-model="value">
    <template v-if="label" v-slot:label>
      <p class="ma-0 font-weight-bold body-1">
        {{ label }}
      </p>
    </template>
    <v-radio
      v-for="(r, index) in radio_group"
      :key="index"
      :label="r.label"
      :value="r.value"
    ></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  props: {
    radioGroup: {
      default: [],
    },
    label: {
      default: "",
    },
    attr: {
      default: "",
    },
    model: {
      default: "",
    },
  },
  data() {
    return {
      value: "all",
      radio_group: this.radioGroup,
    };
  },
  watch: {
    value(val) {
      this.$emit("radioButton", {
        key: this.attr,
        value: val,
      });
    },
    model(val) {
      this.value = val;
    },
  },
  mounted() {
    this.value = this.model;
  },
};
</script>
