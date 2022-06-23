<template>
  <!-- Count Filter -->
  <v-card-text class="d-flex align-center">
    <FormSelect
      style="max-width: 150px"
      :items="dateTypes"
      attr="date_type"
      label="منذ"
      @select="updateType"
    >
    </FormSelect>
    <FormSelect
      style="max-width: 150px"
      :items="date_period"
      attr="date_period"
      label="المدة الزمنية"
      @select="updateAttr"
    >
    </FormSelect>
    <Input
      style="max-width: 50px"
      label="العدد"
      type="number"
      :model="date_value"
      @changeValue="updateValue"
    ></Input>
  </v-card-text>
  <!-- End date Filter -->
</template>

<script>
export default {
  props: {
    label: {
      default: "",
    },
  },
  data() {
    return {
      // for date filter
      date_filter: {
        attr: this.date_period,
        key: this.date_type,
        value: this.date_value,
      },
      date_value: null,
      date_attr: null,
      date_type: null,

      dateTypes: [
        {
          text: "أكثر من",
          value: "bigger",
        },
        {
          text: "أقل من",
          value: "smaller",
        },
      ],
      date_period: [
        {
          text: "يوم",
          value: "day",
        },
        {
          text: "شهر",
          value: "month",
        },
        {
          text: "سنة",
          value: "year",
        },
      ],
    };
  },
  methods: {
    updateType(val) {
      this.date_filter.key = val.value;
      this.updateFilter();
    },

    updateAttr(val) {
      this.date_filter.attr = val.value;
      this.updateFilter();
    },
    updateValue(val) {
      this.date_filter.value = val;
      this.updateFilter();
    },
    updateFilter() {
      if (
        this.date_filter.value &&
        this.date_filter.attr &&
        this.date_filter.key
      ) {
        this.$emit("dateChange",{date : this.date_filter});
      }
    },
  },
};
</script>
