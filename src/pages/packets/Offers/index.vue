<template>
  <v-container fluid class="icons-page">
    <v-row no-gutters class="d-flex justify-space-between mt-2 mb-2">
      <v-col>
        <!-- Tabs -->
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab>{{ pending_packets }} </v-tab>

          <v-tab>{{ accepted_packets }} </v-tab>

          <v-tab>{{ rejected_packets }} </v-tab>
        </v-tabs>
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
          <v-tab-item>
            <!-- List -->
            <Table
              v-if="tab == 1"
              :newItemLabel="newItemLabel"
              :filter="filter"
              :route_name="route_name"
              :title="accepted_packets"
              :api="accepted_api_packets"
              :create="create"
              :edit="edit"
              :del="del"
              :show="show"
              :headers="headers"
              @openForm="setForm"
            ></Table>
          </v-tab-item>
          <v-tab-item>
            <!-- List -->
            <Table
              v-if="tab == 2"
              :newItemLabel="newItemLabel"
              :filter="filter"
              :route_name="route_name"
              :title="rejected_packets"
              :api="rejected_api_packets"
              :create="create"
              :edit="edit"
              :del="del"
              :show="show"
              :headers="headers"
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
            :items="items"
            attr="system_status_id"
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
      show: false,
      state: true,
                    items: [
        { text: "صور غير واضحة", value: "صور غير واضحة" },
        { text: "السعر غير منطقي", value: "السعر غير منطقي" },
        { text: "لايوجد منطقة بهذا الاسم", value: "لايوجد منطقة بهذا الاسم" },
      ],
      route_name: "transactions-offers",
      newItemLabel: "تغيير حالة عملية الشراء",
      filter: "",
      accepted_packets: "عمليات الشراء المقبولة",
      rejected_packets: "عمليات الشراء المرفوضة",
      pending_packets: "عمليات الشراء قيد الإنتظار",

      dialog_form: false,
      dialog_state: false,
      pending_api_packets: {
        getAll: "admin/TransactionsByStatus?type=offers&status=3",
        edit_state: "admin/acceptOrRejectPendingTransactions",
      },
      accepted_api_packets: {
        getAll: "admin/TransactionsByStatus?type=offers&status=1",
        edit_state: "admin/acceptOrRejectPendingTransactions",
      },
      rejected_api_packets: {
        getAll: "admin/TransactionsByStatus?type=offers&status=2",
        edit_state: "admin/acceptOrRejectPendingTransactions",
      },
      title: "عمليات الشراء",
      headers_panding: [
        {
          text: "المكتب",
          align: "start",
          sortable: true,
          value: "office.name",
        },
        {
          text: "رقم الموبايل",
          value: "office.mobile",
        },
        {
          text: "سعر الباقة",
          value: "packet.price",
        },
        {
          text: "حجم الباقة",
          value: "packet.size",
        },
        {
          text: "العقد",
          value: "office.contract.name_ar",
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
      headers: [
        {
          text: "المكتب",
          align: "start",
          sortable: true,
          value: "office.name",
        },
        {
          text: "رقم الموبايل",
          value: "office.mobile",
        },
        {
          text: "سعر الباقة",
          value: "packet.price",
        },
        {
          text: "حجم الباقة",
          value: "packet.size",
        },
        {
          text: "العقد",
          value: "office.contract.name_ar",
        },
        // {
        //  text: "عدد الغرف",
        //  value: "rooms"
        // },
      ],
    };
  },
  components: {
    StatusForm,
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    getApiForForm() {
      switch (this.tab) {
        case 0:
          return this.pending_api_packets;
        case 1:
          return this.accepted_api_packets;
        case 2:
          return this.rejected_api_packets;
        default:
          break;
      }
    },
  },
  methods: {
    setForm(val) {
      let form = {
        transaction_id: "",
        system_status_id:"" //
      };
      // initialize form
      this.$store.dispatch("initForm", form);

      // edit
      if (val != null) {
        this.isNew = false;
        // edit state
        if (val.hasOwnProperty("hasState")) {
          form = {
            system_status_id:null,
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
