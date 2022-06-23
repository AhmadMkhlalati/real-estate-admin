<template>
  <v-form @submit.prevent="close">
    <v-card>
      <v-card-title>
        <span>{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" md="6">
              <strong> رقم المستخدم بالنظام</strong> : {{ item.user_id }}
            </v-col>
            <v-col cols="12" lg="6" md="6">
              <strong> اسم المستخدم</strong> : {{ item.user.first_name }} {{ item.user.last_name }}
            </v-col>
            <v-col cols="12" lg="6" md="6">
              <strong> هاتف المستخدم  </strong> : {{ item.user.authentication }}
            </v-col>
            <v-col cols="12" lg="6" md="6">
              <strong>نوع العرض</strong> : {{ item.estate_offer_type.name_ar }}
            </v-col>
            <v-col cols="12" lg="6" md="6">
              <strong>نوع العقار</strong> :
              {{ item.estate_type.name_ar.split("|")[1] }}
            </v-col>
            <v-col cols="12" lg="12" md="12">
              <strong>مجال السعر</strong> : من {{ item.price_domain == null ? 'غير محدد ':item.price_domain.max }} الى
              {{ item.price_domain == null ? 'غير محدد': item.price_domain.max}}
            </v-col>
            <v-col cols="12" lg="12" md="12">
              <strong>الملاحظة</strong> : {{ item.notes }}
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn
    color="blue darken-1"
    text>
    Cancel
   </v-btn> -->
        <div>
          <Button color="blue darken-1" type="submit" label="أغلاق"> </Button>
        </div>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  estate_ordersLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [validationMixin],
  props: {
    item: {
      default: "",
    },
    newItemLabel: {
      default: "عنصر",
    },
  },
  computed: {
    ...mapGetters(["getForm"]),
    form() {
      return this.getForm;
    },
    formTitle() {
      return this.newItemLabel;
    },
  },
  watch: {
    model() {},
  },
  methods: {
    close() {
      this.$emit("dialogForm", false);
    },
  },
};
</script>
