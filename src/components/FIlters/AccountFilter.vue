<template>
 <v-expansion-panels
  accordion
  flat
  focusable
  class="primary"
  tile
  v-model="panel"
  :readonly="readonly">
  <v-expansion-panel>
   <v-expansion-panel-header
    class="white--text font-weight-bold"
    color="primary">
    <v-icon
     small
     color="white"
     aria-hidden="false"
     class="me-2 flex-grow-0">
     mdi-filter
    </v-icon>
    فلتر
   </v-expansion-panel-header>
   <v-expansion-panel-content>
   </v-expansion-panel-content>
  </v-expansion-panel>
 </v-expansion-panels>
</template>

<script>
import { mapActions } from 'vuex'
export default {
 props: {
  api: Object,
  search: {}
 },
 data() {
  return {
   panel: [0],
   //for callapse
   readonly: false,
   // 
   filter_init_value: {
   }
  };
 },
 watch: {
  search(val) {
   this.updateFilter(val)
  }
 },
 methods: {
  ...mapActions(["createFilter", "initFilter", "fetchTableData"]),
  updateFilter(val) {
   this.createFilter(val).then(() => {
    this.fetchTableData(this.api);
   });
  },
 },
 mounted() {
  this.initFilter(this.filter_init_value);
 },
}
</script>
