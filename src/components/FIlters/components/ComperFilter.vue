<template>
  <!-- Count Filter -->
  <v-card-text class="d-flex align-center price">
    <FormSelect
      :items="countTypes"
      :attr="attr"
      :label="label"
      @select="updateType"
    >
    </FormSelect>
    <Input
      style="max-width: 100px"
      label=""
      type="number"
      :model="count_value"
      @changeValue="updateValue"
    ></Input>
  </v-card-text>
  <!-- End Count Filter -->
</template>

<script scoped>
export default {
  props: {
    label: {
      default: "",
    },
    attr: {
      default: "count",
    },
  },
  data() {
    return {
      // for count filter
      count_filter: {
        key: this.count_type,
        value: this.count_value,
      },
      count_value: null,
      count_type: null,

      countTypes: [
        {
          text: "أكبر من",
          value: "bigger",
        },
        {
          text: "أصغر من",
          value: "smaller",
        },
        {
          text: "يساوي",
          value: "equal",
        },
      ],
    };
  },
  methods: {
    updateType(val) {
      this.count_filter.key = val.value;

      this.updateFilter();
    },
    updateValue(val) {
      this.count_filter.value = val;
      this.updateFilter();
    },
    updateFilter() {
      if (this.count_filter.value && this.count_filter.key) {
        this.$emit("countChange", {
          [`${this.attr}`]: this.count_filter,
        });
      }
    },
  },
};
</script>
