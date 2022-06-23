<template>
  <!-- Count Filter -->
  <v-card-text class="d-flex align-center price">
    <FormSelect
      style="max-width: 150px"
      :items="countTypes"
      :attr="attr"
      :label="label"
      @select="updateType"
    >
    </FormSelect>
    <Input
      style="max-width: 100px"
      label=""
      min="500000"
      max="1000000000000000000"
      step="500000"
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
          price: this.count_filter,
        });
      }
    },
  },
  mounted() {
    (function () {
      var numberFields = document.querySelectorAll(".price input[type=number]"),
        len = numberFields.length,
        numberField = null;

      for (var i = 0; i < len; i++) {
        numberField = numberFields[i];
        numberField.onclick = function () {
          this.setAttribute("step", "500000");
        };
        numberField.onkeyup = function (e) {
          if (e.keyCode === 38 || e.keyCode === 40) {
            this.setAttribute("step", ".01");
          }
        };
      }
    })();
  },
};
</script>
