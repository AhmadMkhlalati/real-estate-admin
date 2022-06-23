<template>
  <v-container fluid class="icons-page">
    <v-row no-gutters class="d-flex justify-space-between mt-2 mb-2">
      <v-col>
        <!-- List -->
        <Table
          newItemLabel="أنشاء مقال "
          :filter="filter"
          :title="title"
          :api="api"
          :create="create"
          :del="del"
          :edit="edit"
          :headers="headers"
          @openForm="setForm"
        ></Table>
        <!-- Form -->
        <v-dialog v-model="dialog_form" max-width="500px">
          <ArtcalsForm
            v-if="dialog_form"
            newItemLabel="مقال"
            :isNew="isNew"
            :api="api"
            @dialogForm="dialog_form = false"
            :id="item_id"
          ></ArtcalsForm>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isNew: true,
      dialog_form: false,
      api: {
        getAll: "article/adminGetAll",
        create: "article/import",
        edit: "article/edit",
        delete: "article/delete?article_id",
      },
      create: true,
      del: true,
      edit: true,
      filter: "articals",
      title: " المقالات",
      headers: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "العنوان",
          value: "title",
        },
        {
          text: "مميز",
          value: "featured",
        },
        {
          text: "النص",
          value: "body",
        },
        {
          text: "النشر",
          value: "created_at",
        },
        {
          text: "",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    setForm(val) {
      let form = {
        title: null,
        body: null,
        featured: null,
        id:null,
        images: [],
      };
      this.$store.dispatch("initForm", form);
      if (val != null) {
        this.isNew = false;
        if (val.hasOwnProperty("id")) {
            this.item_id = val.id;
          }
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
