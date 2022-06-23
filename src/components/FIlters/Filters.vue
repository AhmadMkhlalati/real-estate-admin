<template>
  <div>
    <OfficeFilter
      :search="search"
      :api="api"
      :per_page="per_page"
      v-if="filter == 'offices'"
    ></OfficeFilter>
    <estate-filter
      v-if="filter == 'estates'"
      :search="search"
      :api="api"
      :per_page="per_page"
    ></estate-filter>

    <allOfficeFilter
      :search="search"
      :api="api"
      :per_page="per_page"
      :headers="headers"
      v-if="filter == 'alloffices'"
    ></allOfficeFilter>
    <EstateOrderFilter
      :search="search"
      :api="api"
      :per_page="per_page"
      :headers="headers"
      v-if="filter == 'estate_orders'"
    ></EstateOrderFilter>

    <!-- <AccountFilter
   :search="search"
   :api="api"
   v-if="filter == 'accounts'"></AccountFilter> -->
  </div>
</template>

<script>
import OfficeFilter from "./OfficeFilter";
import allOfficeFilter from "./allOfficeFilter";
import EstateFilter from "./EstateFilter.vue";
import EstateOrderFilter from "./EstateOrderFilter.vue";
import AccountFilter from "./AccountFilter";
export default {
  components: {
    OfficeFilter,
    allOfficeFilter,
    EstateFilter,
    EstateOrderFilter,
    //AccountFilter
  },
  props: {
    per_page: Number,
    headers: Array,
    search: {
      default: "",
    },
    api: {
      default: "",
    },
    filter: {
      default: "",
    },
  },
};
</script>
