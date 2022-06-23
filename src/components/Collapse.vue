<template>
 <v-expansion-panels  
  class="primary"
  tile
  v-model="panel"
  :readonly="readonly"
  multiple>
  <v-expansion-panel>
   <v-expansion-panel-header class="elevation-0">Panel 1</v-expansion-panel-header>
   <v-expansion-panel-content>
    Some content
   </v-expansion-panel-content>
  </v-expansion-panel>
  <!-- <v-expansion-panel>
   <v-expansion-panel-header class="elevation-0">Panel 1</v-expansion-panel-header>
   <v-expansion-panel-content>
    Some content
   </v-expansion-panel-content>
  </v-expansion-panel> -->
 </v-expansion-panels>
</template>

<script>
export default {
 data: () => ({
  panel: [0, 1],
  readonly: false,
 }),
}
</script>
