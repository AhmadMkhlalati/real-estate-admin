<template>

    <v-autocomplete  
      :label="label"
      v-model="ids"
      :disabled="disabled"
      :attr="attr"
      :error-messages="errorMessages"
      :items="items"
      multiple
      @change="changeSelect"
    >
      <template v-slot:prepend-item>
        <v-list-item
          ripple
          @mousedown.prevent
          @click="toggle"
        >
          <v-list-item-action>
            <v-icon :color="ids.length > 0 ? 'indigo darken-4' : ''">
              {{ icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              تحديد الكل
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2"></v-divider>
      </template>
      
    </v-autocomplete>

</template>


<script>

export default {
  props:{
      items: {
   default: []
  },
   attr_key: {
   default: ''
  },
  attr: {
   default: {}
  },
  label: {
   default: ''
  },
  errorMessages: {
   default: ''
  },
  model: {
   default: ''
  },
  disabled: {
   default: false
  },
  },
  data: () => ({
      ids: [],
    }),

    computed: {
      likesAllFruit () {
        return this.ids.length === this.items.length
      },
      likesSomeFruit () {
        return this.ids.length > 0 && !this.likesAllFruit
      },
      icon () {
        if (this.likesAllFruit) return 'mdi-close-box'
        if (this.likesSomeFruit) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
    },

    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.selectAll) {
            this.ids = []
          } else {
            this.ids = this.items.slice()
          }
        })
      },
  changeSelect(val) {
    this.$emit('select', {
     key: this.attr,
     value: this.ids
    })
  },
    },
  }
</script>
