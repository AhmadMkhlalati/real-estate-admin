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
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <FormSelect
                    :items="estate_type"
                    attr="estate_type"
                    label="نوع العقار"
                    @select="updateFilter"
                  >
                  </FormSelect>
                </v-col>

                <v-col md="1"> </v-col>
                <v-col cols="12" sm="6" md="2">
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
                </v-col> </v-row
            ></v-container>
            <!-- <RadioButtonsGroup
       label="نوع العقار"
       attr="estate_type"
       :radioGroup="radioGroup"
       @radioButton="updateFilter"></RadioButtonsGroup> -->
          </v-card-text>
          <v-btn class="ma-2" outlined color="indigo" @click="ResetFilter()">
            ألغاء تطبيق الفلتر
          </v-btn>
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
    per_page: Number,
    search: {},
  },
  data() {
    return {
      panel: [0],
      //for callapse
      readonly: false,
      //
      is_furnished: [
        {
          text: "غير مفروش",
          value: 0,
        },
        {
          text: "مفروش",
          value: 1,
        },
      ],
      count_filter: [],
      estate_type: [],
      interior_status: [],
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
      filter_init_value: {},
    };
  },
  watch: {
    search(val) {
      this.updateFilter(val);
    },
  },
  computed: {
    ...mapGetters(["getFilter", "getEstateTypes", "getInteriorStatuses"]),
  },
  methods: {
    ...mapActions([
      "createFilter",
      "deleteFilter",
      "initFilter",
      "fetchTableDataFilter",
      "fetchTableData",
      "fetchEstateTypes",
      "fetchInteriorStatuses",
    ]),
    updateFilter(val) {
      this.createFilter(val).then(() => {
        this.fetchTableDataFilter({
          api: this.api,
          per_page: this.per_page,
          filter: this.getFilter,
        });
      });
    },
    ResetFilter() {
      this.deleteFilter();
      this.createFilter({}).then(() => {
        this.fetchTableData({
          api: this.api,
          per_page: this.per_page,
        });
      });
    },
  },
  mounted() {
    this.initFilter(this.filter_init_value);
    this.fetchEstateTypes("estateTypes");
    this.estate_type = this.getEstateTypes;
    this.fetchInteriorStatuses("interiorStatuses");
    this.interior_status = this.getInteriorStatuses;
  },
};
</script>
