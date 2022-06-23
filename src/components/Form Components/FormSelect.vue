<template>
  <v-autocomplete
    :disabled="disabled"
    open-on-clear
    clearable
    item-color="primary"
    dense
    v-model="value"
    :items="items"
    item-text="text"
    item-value="value"
    persistent-hint
    return-object
    single-line
    :label="label"
    class="text-subtitle-2"
    :error-messages="errorMessages"
    @change="changeSelect"
  >
    <!-- @click:clear="changeSelect('clear')" -->
    <template v-slot:label>
      <!--  <p class="ma-0 font-weight-bold body-1">
    {{label}}
   </p> -->
    </template>
    <template v-slot:append>
      <v-icon color="primary" aria-hidden="false" class="mt-0">
        {{ icon }}
      </v-icon>
    </template>

    <template v-slot:item="{ item, attrs, on }">
      <v-list-item v-on="on" v-bind="attrs">
        <v-list-item-content style="mt-3" light>
          {{ item.text.includes("|") ? item.text.split("|")[1] : item.text }}
        </v-list-item-content>
      </v-list-item></template
    >
  </v-autocomplete>
</template>

<script>
export default {
  props: {
    items: {
      default: [],
    },
    icon: {
      default: "mdi-chevron-down",
    },
    attr_key: {
      default: "",
    },
    attr: {
      default: {},
    },
    label: {
      default: "",
    },
    errorMessages: {
      default: "",
    },
    model: {
      default: "",
    },
    disabled: {
      default: false,
    },
  },
  data() {
    return {
      value: "0", //{ text: 'Any', value: '0' }
    };
  },
  watch: {
    value(val) {},
    model(val) {
      this.value = val;
    },
  },
  methods: {
    changeSelect(val) {
      if (val != null)
        this.$emit("select", {
          key: this.attr,
          value: this.value.value,
        });
      if (val == null) {
        this.$emit("select", {
          key: this.attr,
          value: null,
        });
      }
    },
  },
  mounted() {
    this.value = this.model;
  },
};
</script>
