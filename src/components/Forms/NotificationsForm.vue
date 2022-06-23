<template>
  <v-form @submit.prevent="save">
    <v-card>
      <v-card-title>
        <span>{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <FormSelect
                style="max-width: 350px"
                :items="types"
                :model="form.type"
                :errorMessages="typeErrors"
                attr="type"
                label="وجهة الإشعار:"
                @select="
                  (val) => {
                    form.type = val.value;
                    val.value == 3
                      ? (this.displayOffices = true)
                      : (this.displayOffices = false);
                    $v.form.type.$touch();
                  }
                "
              >
              </FormSelect>
            </v-col>
            <v-col v-if="displayOffices" cols="12" sm="12" md="12">
              <FormSelectMultiValue
                style="max-width: 350px"
                :items="offices"
                :model="form['ids']"
                attr="ids"
                :errorMessages="typeErrors"
                label="اختر مكتب عقاري"
                @select="
                  (val) => {
                    form.ids = val.value;
                    $v.form.type.$touch();
                  }
                "
              ></FormSelectMultiValue
            ></v-col>
            <v-col v-if="false" cols="12" sm="12" md="12">
              <FormSelect
                attr="ids"
                label="اختر مكتب عقاري"
                @select="
                  (val) => {
                    form.ids = val.value;
                    $v.form.type.$touch();
                  }
                "
              >
              </FormSelect>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <Input
                style="max-width: 350px"
                label="عنوان الإشعار"
                type="text"
                :model="form.title"
                :errorMessages="titleErrors"
                @changeValue="
                  (val) => {
                    form.title = val;
                    $v.form.title.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <TextArea
                style="max-width: 350px"
                label="محتوى الإشعار"
                type="text"
                :model="form.body"
                :errorMessages="bodyErrors"
                @changeValue="
                  (val) => {
                    form.body = val;
                    $v.form.body.$touch();
                  }
                "
              ></TextArea>
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
          <Button
            color="blue darken-1"
            @click:clear="callItBack()"
            type="submit"
            label="أرسال الاشعار"
          >
          </Button>
        </div>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import FormSelectMultiValue from "../Form Components/FormSelectMultiValue.vue";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  reset,
} from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [validationMixin],
  props: {
    api: Object,
    isNew: Boolean,
    newItemLabel: {
      default: "عنصر",
    },
  },
  validations: {
    form: {
      type: {
        required,
      },
      ids: {},
      title: {
        required,
      },
      body: {
        required,
      },
    },
  },
  data() {
    return {
      displayOffices: false,
      types: [
        {
          text: "جميع الزبائن",
          value: "1",
        },
        {
          text: "جميع المكاتب",
          value: "2",
        },

        {
          text: "تحديد مكتب",
          value: "3",
        },
      ],

      requried_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
    };
  },
  components: { FormSelectMultiValue },
  computed: {
    ...mapGetters(["getForm", "getOffices"]),
    typeErrors() {
      const errors = [];
      if (!this.$v.form.type.$dirty) return errors;
      !this.$v.form.type.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.form.title.$dirty) return errors;
      !this.$v.form.title.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    bodyErrors() {
      const errors = [];
      if (!this.$v.form.body.$dirty) return errors;
      !this.$v.form.body.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    offices() {
      return this.getOffices;
    },
    form() {
      return this.getForm;
    },
    formTitle() {
      return this.newItemLabel;
    },
  },
  methods: {
    ...mapActions(["fetchOffices"]),
    callItBack() {
      this.form.type = "";
    },
    save() {
      delete this.form.repeatPassword;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let formdata = new FormData();
        for (let f in this.form) {
          formdata.append(f, this.form[f]);
        }
        if (!this.isNew) {
          formdata.append("_method", "PUT");
        }

        this.$store.dispatch("sendForm", {
          api: this.api,
          form: formdata,
          isNew: this.isNew,
        });
        this.$emit("dialogForm", false);
        let form = {};
        this.$store.dispatch("initForm", form);
      } else {
        this.$toast.error("أكمل الحقول المطلوبة");
      }
    },
  },
  mounted() {
    this.fetchOffices("admin/allOffices");
  },
};
</script>
