<template>
 <v-autocomplete 
  v-model="model"
  :items="items"
  :loading="isLoading"
  :search-input.sync="search"
  hide-no-data
  hide-selected
  item-text="Description"
  item-value="API"
  :label="label"
  placeholder="Start typing to Search"
  prepend-icon="mdi-database-search"
  return-object></v-autocomplete>
</template>

<script>
export default {
  props:{
    label:{
      default:''
    },
    api:{
      default:''
    },

  },
 data: () => ({
  descriptionLimit: 60,
  entries: [],
  isLoading: false,
  model: null,
  search: null,
 }),

 computed: {
  fields() {
   if (!this.model) return []

   return Object.keys(this.model).map(key => {
    return {
     key,
     value: this.model[key] || 'n/a',
    }
   })
  },
  items() {
   return this.entries.map(entry => {
    const Description = entry.Description.length > this.descriptionLimit ?
     entry.Description.slice(0, this.descriptionLimit) + '...' :
     entry.Description

    return Object.assign({}, entry, { Description })
   })
  },
 },

 watch: {
  search() {
   // Items have already been loaded
   if (this.items.length > 0) return

   // Items have already been requested
   if (this.isLoading) return

   this.isLoading = true

   // Lazily load input items
   fetch(this.api)
    .then(res => res.json())
    .then(res => {
     const { count, entries } = res
     this.count = count
     this.entries = entries
    })
    .catch(err => {
    })
    .finally(() => (this.isLoading = false))
  },
 },
}
</script>
