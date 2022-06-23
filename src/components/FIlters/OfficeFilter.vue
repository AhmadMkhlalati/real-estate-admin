<template>
  <v-expansion-panels
    accordion
    flat
    class="primary"
    tile
    v-model="panel"
    :readonly="readonly"
  >
    <v-expansion-panel>
      <v-expansion-panel-header
        class="white--text font-weight-bold"
        color="primary"
      >
        <v-icon
          small
          color="white"
          aria-hidden="false"
          class="me-2 flex-grow-0"
        >
          mdi-filter
        </v-icon>
        فلتر
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card class="" color="white">
          <v-card-text class="d-flex justify-space-between align-center">
            <FormSelect
              style="max-width: 150px"
              :items="estateStatus"
              attr="estate_status"
              label="حالة العقار"
              @select="updateFilter"
            >
            </FormSelect>
            <CountFilter label="عدد العقارات" @countChange="updateFilter">
            </CountFilter>
            <div class="d-flex justify-space-between align-center">
              <Switcher
                attr="rent"
                label="أجار"
                @switcher="updateFilter"
              ></Switcher>
              <Switcher
                attr="sale"
                label="بيع"
                @switcher="updateFilter"
              ></Switcher>
            </div>
            <!-- <RadioButtonsGroup
       label="نوع العقار"
       attr="estate_type"
       :radioGroup="radioGroup"
       @radioButton="updateFilter"></RadioButtonsGroup> -->
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    api: Object,
    search: {},
  },
  data() {
    return {
      panel: [0],
      //for callapse
      readonly: false,
      //
      estateStatus: [
        {
          text: "محكمة",
          value: 0,
        },
        {
          text: "طابو أخضر",
          value: 1,
        },
      ],
      radioGroup: [
        {
          label: "أجار",
          color: "blue",
          value: "rent",
        },
        {
          label: "بيع",
          color: "green",
          value: "sale",
        },
        {
          label: "الكل",
          color: "black",
          value: null,
        },
      ],
      filter_init_value: {
        search: null,
        estate_status: null,
        estate_type: null,
        sale: false,
        rent: false,
        count: {
          key: null,
          value: null,
        },
      },
    };
  },
  watch: {
    search(val) {
      this.updateFilter(val);
    },
  },
  computed: {
    ...mapGetters(["getFilter"]),
  },
  methods: {
    ...mapActions(["createFilter", "initFilter", "fetchTableDataFilter"]),
    updateFilter(val) {
      this.createFilter(val).then(() => {
        this.fetchTableDataFilter({
          api: this.api,
          per_page: 5,
          filter: this.getFilter,
        });
      });
    },
  },
  mounted() {
    this.initFilter(this.filter_init_value);
  },
};
</script>
