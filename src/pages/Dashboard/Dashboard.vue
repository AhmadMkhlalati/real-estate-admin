<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <Title title="الصفحة الرئيسية"></Title>
      </v-row>

      <v-alert
        dir="rtl"
        v-if="`Error: Request failed with status code 403` == DashboardData"
        border="right"
        colored-border
        type="error"
        elevation="2"
      >
        عذرا ليس لديك صلاحيات لمشاهدة البيانات او التعديل عليها
      </v-alert>

      <v-row
        v-if="`Error: Request failed with status code 403` != DashboardData"
      >
        <v-col cols="12" md="6" sm="12" class="d-flex">
          <v-card class="" width="100%">
            <v-card-title class="flex-nowrap">
              <p class="text-decoration-underline">التقييمات :</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-chip class="ma-2" color="success" outlined>
                أنواع التقييم
              </v-chip>

              <v-row no-gutters>
                                    <v-col
                      lg="8"
                      md="10"
                      cols="12"
                      class="d-flex"
                      style="height: 300px"
                    >
                  <ApexChart
                    type="donut"
                    :options="mock.apexPieRating.options"
                    :series="generatePieSeries(6)"
                  ></ApexChart></v-col></v-row></v-card-text></v-card
        ></v-col>
                <v-col cols="12" md="6" sm="12" class="d-flex">
          <v-card class="" width="100%">
            <v-card-title class="flex-nowrap">
              <p class="text-decoration-underline">المكاتب :</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-chip class="ma-2" color="success" outlined>
                أنواع العقود
              </v-chip>

              <v-row no-gutters>
                                    <v-col
                      lg="8"
                      md="10"
                      cols="12"
                      class="d-flex"
                      style="height: 300px"
                    >
                  <ApexChart
                    type="donut"
                    :options="mock.apexPieContract.options"
                    :series="generatePieSeries(2)"
                  ></ApexChart></v-col></v-row></v-card-text></v-card
        ></v-col>
        <v-col cols="12" class="d-flex">
          <v-card class="" width="100%">
            <v-card-title class="flex-nowrap">
              <p class="text-decoration-underline">العقارات :</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  lg="6"
                  md="6"
                  cols="12"
                  class="d-flex"
                  style="height: 300px"
                >
                  <v-row>
                    <v-col lg="4" md="6" cols="12" class="d-flex">
                      <v-chip class="ma-2" color="success" outlined>
                        أنواع العقارات
                      </v-chip></v-col
                    >
                    <v-col
                      lg="8"
                      md="10"
                      cols="12"
                      class="d-flex"
                      style="height: 300px"
                    >
                      <ApexChart
                        type="donut"
                        :options="mock.apexPieEstates.options"
                        :series="generatePieSeries(0)"
                      ></ApexChart
                    ></v-col>
                  </v-row>
                </v-col>
                <v-col
                  lg="6"
                  md="6"
                  cols="12"
                  class="d-flex"
                  style="height: 300px"
                >
                  <v-row>
                    <v-col lg="4" md="6" cols="12" class="d-flex">
                      <v-chip class="ma-2" color="success" outlined>
                        أنواع العروض
                      </v-chip></v-col
                    >
                    <v-col
                      lg="8"
                      md="10"
                      cols="12"
                      class="d-flex"
                      style="height: 300px"
                    >
                      <ApexChart
                        type="donut"
                        :options="mock.apexPieSaleOrRent.options"
                        :series="generatePieSeries(1)"
                      ></ApexChart>
                    </v-col>
                  </v-row> </v-col
              ></v-row> </v-card-text></v-card
        ></v-col>
        <v-col cols="12" class="d-flex">
          <v-card class="" width="100%">
            <v-card-title class="flex-nowrap">
              <p class="text-decoration-underline">الطلبات :</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  lg="6"
                  md="6"
                  cols="12"
                  class="d-flex"
                  style="height: 300px"
                >
                  <v-row>
                    <v-col lg="4" md="6" cols="12" class="d-flex">
                      <v-chip class="ma-2 pa-1" color="success" outlined>
                        عدد طلبات العقارات
                      </v-chip></v-col
                    >
                    <v-col
                      lg="8"
                      md="10"
                      cols="12"
                      class="d-flex"
                      style="height: 300px"
                    >
                      <ApexChart
                        type="donut"
                        :options="mock.apexPieEstates.options"
                        :series="generatePieSeries(3)"
                      ></ApexChart
                    ></v-col>
                  </v-row>
                </v-col>
                <v-col
                  lg="6"
                  md="6"
                  cols="12"
                  class="d-flex"
                  style="height: 300px"
                >
                  <v-row>
                    <v-col lg="4" md="6" cols="12" class="d-flex">
                      <v-chip class="ma-2 pa-1" color="success" outlined>
                        عدد طلبات العروض
                      </v-chip></v-col
                    >
                    <v-col
                      lg="8"
                      md="12"
                      cols="12"
                      class="d-flex"
                      style="height: 300px"
                    >
                      <ApexChart
                        type="donut"
                        :options="mock.apexPieSaleOrRent.options"
                        :series="generatePieSeries(4)"
                      ></ApexChart>
                    </v-col> </v-row></v-col
              ></v-row> </v-card-text></v-card
        ></v-col>

        <v-col cols="12"> </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import mock from "./mock";
import { mapGetters, mapActions } from "vuex";
//import Trend from "vuetrend";
import ApexChart from "vue-apexcharts";

export default {
  name: "Dashboard",
  components: {
    //Trend,
    ApexChart,
  },
  data() {
    return {
      mock,
      apexLoading: false,
    };
  },
  computed: {
    ...mapGetters(["getDashboardData", "getDashboardOrder", "getDashboardRating"]),
    DashboardData() {
      return this.getDashboardData;
    },
    DashboardOrder() {
      return this.getDashboardOrder;
    },
    DashboardRating(){
       return this.getDashboardRating;
    }
  },
  methods: {
    ...mapActions(["fetchDashboard"]),

    generatePieSeries(val) {
      let series = [];
      let data = this.DashboardData;
      let order = this.DashboardOrder;
      let rate =  this.DashboardRating;
      if (val == 0) {
        series.push(data.houses);
        series.push(data.shops);
        series.push(data.lands);
        series.push(data.farms);
                if(data.summer_properties)
        series.push(data.summer_properties);
      } else if (val == 1) {
        series.push(data.sale);
        series.push(data.rent);
      } else if (val == 2) {
        series.push(data.free);
        series.push(data.bronze);
        series.push(data.silver);
        series.push(data.gold);
      } else if (val == 3) {
        series.push(order.houses);
        series.push(order.shops);
        series.push(order.lands);
        series.push(order.farms);
        if(order.summer_properties)
        series.push(order.summer_properties);
      } else if (val == 4) {
        series.push(order.sale);
        series.push(order.rent);
      }
       else if (val == 5) {
        series.push(order.sale);
        series.push(order.rent);
      }
      else if (val == 6) {
        series.push(data.bad_rates);
        series.push(data.normal_rates);
        series.push(data.good_rates);
      }
      return series;
    },
  },
  mounted() {
    this.fetchDashboard(mock.api);
    setTimeout(() => {
      this.apexLoading = true;
    });
  },
};
</script>
