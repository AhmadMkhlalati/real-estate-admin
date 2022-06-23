<template>
  <v-container fluid class="icons-page">
    <v-row no-gutters class="d-flex justify-space-between mt-2 mb-2">
      <v-col>
        <!-- List -->
        <Table
          newItemLabel="التقييمات"
          :filter="filter"
          :title="title"
          :api="api"
          :rating="rating"
          :create="create"
          :edit="edit"
          :del="del"
          :headers="headers"
          @openForm="setForm"
        ></Table>

        <!-- Form -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isNew: true,
      rating: true,
      dialog_form: false,
      edit: false,
      del: false,
      create: false,

      api: {
        getAll: "applicationRating/getAll",
        //delete: "deletePriceDomain?price_domain_id"
      },
      //queryParam:"user_id",
      filter: "rates",
      title: "تقييمات المستخدمين ",
      headers: [
        {
          text: "التقيم",
          align: "start",
          sortable: false,
          value: "rating",
        },
        {
          text: "الملاحظة",
          align: "start",
          sortable: false,
          value: "notes",
        },
      ],
    };
  },
  methods: {
    setForm(val) {
      let form = {
        name: "",
      };
      this.$store.dispatch("initForm", form);
      if (val != null) {
        this.isNew = false;
        this.$store.dispatch("setForm", val);
      } else {
        this.isNew = true;
      }
      this.dialog_form = true;
    },
  },
  //  mounted() {
  //   this.$store.dispatch('initForm', this.form)
  //  }
};
</script>
