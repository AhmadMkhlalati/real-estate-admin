<template>
  <v-container fluid class="icons-page">
    <v-row no-gutters class="d-flex justify-space-between mt-2 mb-2">
      <v-col>
        <!-- Tabs -->
        <v-tabs-items class="mt-5" v-model="tab">
          <v-tab-item>
            <!-- List -->
            <Table
              v-if="tab == 0"
              :newItemLabel="newItemLabel"
              :filter="filter"
              :route_name="route_name"
              :title="pending_packets"
              :api="pending_api_packets"
              :create="create"
              :edit="edit"
              :del="del"
              :state="state"
              :show="show"
              :headers="headers_panding"
              @openForm="setForm"
            ></Table>
          </v-tab-item>
        </v-tabs-items>
        <!-- Form -->
        <v-dialog v-model="dialog_state" max-width="500px">
          <StatusForm
            v-if="dialog_state"
            :newItemLabel="newItemLabel"
            :isNew="isNew"
            :attr="transaction_id"
            :api="getApiForForm"
            :id="item_id"
            @dialogForm="dialog_state = false"
          ></StatusForm>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StatusForm from "@/components/Forms/StatusForm";
export default {
  data() {
    return {
      item_id: null,
      tab: 0,
      isNew: true,
      create: false,
      edit: false,
      del: false,
      show: true,
      state: false,
      route_name: "transactions-candidate",
      newItemLabel: "تغيير حالة عملية الشراء للترشيحات",
      filter: "",
      pending_packets: "تقارير المستخدمين",

      dialog_form: false,
      dialog_state: false,
      pending_api_packets: {
        getAll: "reports",
        edit_state: "admin/acceptOrRejectPendingTransactions",
      },

      title: "تقارير المستخدمين",
      headers_panding: [
        {
          text: "المكتب",
          align: "start",
          sortable: true,
          value: "estate.office.name",
        },
        {
          text: "أسم المستخدم",
          value: "user.first_name",
        },
        {
          text: "التواصل مع المستخدم",
          value: "user.authentication",
        },
        {
          text: "نوع عرض العقار",
          value: "estate.estate_offer_type.name_ar",
        },
        {
          text: "المشكلة ",
          value: "report_type.name_ar",
        },

        // {
        //  text: "عدد الغرف",
        //  value: "rooms"
        // },
        {
          text: "العمليات",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  components: {
    StatusForm,
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    getApiForForm() {
      return this.pending_api_packets;
    },
  },
  methods: {
    setForm(val) {
      let form = {
        transaction_id: "", //
      };
      // initialize form
      this.$store.dispatch("initForm", form);

      // edit
      if (val != null) {
        this.isNew = false;
        // edit state
        if (val.hasOwnProperty("hasState")) {
          form = {
            transaction_id: null,
          };
          this.$store.dispatch("initForm", form);
          if (val.item.hasOwnProperty("id")) {
            this.item_id = val.item.id;
          }
          this.$store.dispatch("setForm", {
            transaction_id: val.item.id,
          });
          this.dialog_state = true;
        }
      }
    },
  },
  //  mounted() {
  //   this.$store.dispatch('initForm', this.form)
  //  }
};
</script>
