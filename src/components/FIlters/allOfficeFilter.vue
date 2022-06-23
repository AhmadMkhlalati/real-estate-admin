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
            <div class="d-flex justify-space-between align-center">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <Switcher
                      attr="is_activated"
                      label="عرض المكاتب المفعلة"
                      @switcher="updateFilter"
                    ></Switcher
                  ></v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-4">
                    <FormSelect
                      :items="contractTypes"
                      attr="contract"
                      label=" العقد"
                      @select="updateFilter"
                    >
                    </FormSelect>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <DateFilter
                      attr="date"
                      label="حسب المدة"
                      @dateChange="updateFilter"
                    >
                    </DateFilter>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <ComperFilter
                      attr="calls"
                      label="عدد الاتصالات العقارات"
                      @countChange="updateFilter"
                    >
                    </ComperFilter>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-4">
                    <FormSelect
                      :items="Locations"
                      attr="Location"
                      label="المنطقة"
                      @select="updateFilter"
                    >
                    </FormSelect>
                  </v-col>
                </v-row>
              </v-container>
            </div>

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
      tempData: "",
      DataAfterFiltring: [],
      //for callapse
      readonly: false,
      //

      filter_init_value: {},
    };
  },
  components:{
    
  },
  watch: {
    search(val) {
      this.updateFilter(val);
    },
  },
  computed: {
    ...mapGetters(["getFilter", "getContractTypes", "getLocations"]),
    contractTypes() {
      return this.getContractTypes;
    },
    Locations() {
      return this.getLocations;
    },
  },
  methods: {
    ...mapActions([
      "createFilter",
      "initFilter",
      "fetchTableDataFilter",
      "fetchLocations",
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
      window.location.reload();
    },
  },
  mounted() {
    this.initFilter(this.filter_init_value);
    this.fetchLocations("locations");
  },
};
</script>
