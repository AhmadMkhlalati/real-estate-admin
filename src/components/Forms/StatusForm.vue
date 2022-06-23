<template>
  <v-form @submit.prevent="save">
    <v-card>
      <v-card-title>
        <span>{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <RadioButtonsGroup
                :radioGroup="statuses"
                attr="`${attr}`"
                :model="form[`${attr}`]"
                @radioButton="
                  (val) => {
                    form[`${attr}`] = val.value;
                  }
                "
              ></RadioButtonsGroup>
            </v-col>
            <v-col cols="6">
              <ReasonReject
                :disabled="this.form[`${attr}`] != 2"
                :items="items"
                label="يرجى أدخال سبب الرفض"
                @ReasonSelected="Reason"
              ></ReasonReject>
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
          <Button color="blue darken-1" type="submit" label="حفظ"> </Button>
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
    api: Object,
    isNew: Boolean,
    id: {
      default: null,
    },
    attr: {
      default: "order",
    },
    newItemLabel: {
      default: "عنصر",
    },
    items: [],
  },
  data() {
    return {
      statuses: [
        {
          label: "موافقة عالطلب",
          value: 1,
        },
        {
          label: "رفض الطلب",
          value: 2,
        },
        // {
        //  label: 'تعليق الطلب',
        //  value: 3
        // },
      ],
    };
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
    Reason(val) {
      this.form.reason = val.value;
    },
    save() {
      //  this.$v.form.$touch()
      //  if (!this.$v.form.$invalid) {
      let formdata = new FormData();
      if (this.form.reason) {
        this.form.reason = this.form.reason.value
          ? this.form.reason.value
          : this.form.reason;
      }
      for (let f in this.form) {
        formdata.append(f, this.form[f]);
      }
      if (!this.isNew) {
        formdata.append("_method", "put");
        // formdata.append(`${this.attr}`, this.id);
      }
      if (this.api.edit_state) {
        this.api.edit = this.api.edit_state;
      }

      this.$store.dispatch("sendForm", {
        api: this.api,
        form: formdata,
        isNew: this.isNew,
      });
      this.$emit("dialogForm", false);
      //  } else {
      //   this.$toast.error("أكمل الحقول المطلوبة");
      //  }
    },
  },
};
</script>
