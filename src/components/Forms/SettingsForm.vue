<template>
  <div>
    <v-form v-if="!isLoad" @submit.prevent="save">
      <v-card>
        <v-card-title>
          <span>{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="الحد الأدنى من صور العقارات"
                  type="number"
                  :model="form.minimum_count_of_estate_images_to_publish"
                  :errorMessages="
                    minimum_count_of_estate_images_to_publishErrors
                  "
                  @changeValue="
                    (val) => {
                      form.minimum_count_of_estate_images_to_publish = val;
                      $v.form.minimum_count_of_estate_images_to_publish.$touch();
                    }
                  "
                ></Input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="الحد الأعلى من صور العقارات"
                  type="number"
                  :model="form.maximum_count_of_estate_images"
                  :errorMessages="maximum_count_of_estate_imagesErrors"
                  @changeValue="
                    (val) => {
                      form.maximum_count_of_estate_images = val;
                      $v.form.maximum_count_of_estate_images.$touch();
                    }
                  "
                ></Input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="الحد الأعلى من صور الطوابق"
                  type="number"
                  :model="form.maximum_count_of_floor_plan_images"
                  :errorMessages="maximum_count_of_floor_plan_imagesErrors"
                  @changeValue="
                    (val) => {
                      form.maximum_count_of_floor_plan_images = val;
                      $v.form.maximum_count_of_floor_plan_images.$touch();
                    }
                  "
                ></Input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="الحد الأعلى من صور مخطط العقار"
                  type="number"
                  :model="form.maximum_count_of_floor_plan_images"
                  :errorMessages="maximum_count_of_floor_plan_imagesErrors"
                  @changeValue="
                    (val) => {
                      form.maximum_count_of_floor_plan_images = val;
                      $v.form.maximum_count_of_floor_plan_images.$touch();
                    }
                  "
                ></Input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="الحد الاعلى من  المناطق المجاورة"
                  type="number"
                  :model="form.maximum_count_of_nearby_places"
                  :errorMessages="maximum_count_of_nearby_placesErrors"
                  @changeValue="
                    (val) => {
                      form.maximum_count_of_nearby_places = val;
                      $v.form.maximum_count_of_nearby_places.$touch();
                    }
                  "
                ></Input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="الحد الاعلى من  صور الشارع"
                  type="number"
                  :model="form.maximum_count_of_street_images"
                  :errorMessages="maximum_count_of_street_imagesErrors"
                  @changeValue="
                    (val) => {
                      form.maximum_count_of_street_images = val;
                      $v.form.maximum_count_of_street_images.$touch();
                    }
                  "
                ></Input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="هاتف الشركة العادي"
                  type="number"
                  :model="form.normal_company_phone_number"
                  :errorMessages="normal_company_phone_numberErrors"
                  @changeValue="
                    (val) => {
                      form.normal_company_phone_number = val;
                      $v.form.normal_company_phone_number.$touch();
                    }
                  "
                ></Input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="هاتف الشركة الدائم"
                  type="number"
                  :model="form.permanent_company_phone_number"
                  :errorMessages="permanent_company_phone_numberErrors"
                  @changeValue="
                    (val) => {
                      form.permanent_company_phone_number = val;
                      $v.form.permanent_company_phone_number.$touch();
                    }
                  "
                ></Input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="عدد أيام أنتهاء صلاحية الاشعارات"
                  type="number"
                  :model="form.days_of_contract_expiration_to_notify"
                  :errorMessages="days_of_contract_expiration_to_notifyErrors"
                  @changeValue="
                    (val) => {
                      form.days_of_contract_expiration_to_notify = val;
                      $v.form.days_of_contract_expiration_to_notify.$touch();
                    }
                  "
                ></Input>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <Input
                  label="عدد أيام حذف طلب العقار"
                  type="number"
                  :model="form.days_of_estate_order_to_delete"
                  :errorMessages="days_of_estate_order_to_deleteErrors"
                  @changeValue="
                    (val) => {
                      form.days_of_estate_order_to_delete = val;
                      $v.form.days_of_estate_order_to_delete.$touch();
                    }
                  "
                ></Input>
              </v-col>

              <Switcher
                label="هل تريد تغير كلمة سر النظام ؟"
                :model="checkbox"
                @switcher="checkbox = !checkbox"
              ></Switcher>
              <v-col cols="12" sm="6" md="6">
                <Input
                  :disabled="!checkbox"
                  label="كلمة سر النظام"
                  type="password"
                  :errorMessages="system_passwordErrors"
                  @changeValue="
                    (val) => {
                      form.system_password = val;
                      isChangePassword = true;
                      $v.form.system_password.$touch();
                    }
                  "
                ></Input>
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
    <Loading v-else></Loading>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
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
      maximum_count_of_estate_images: {
        required,
      },
      minimum_count_of_estate_images_to_publish: {
        required,
      },
      normal_company_phone_number: {
        required,
      },
      permanent_company_phone_number: {
        required,
      },
      days_of_estate_order_to_delete: {
        required,
      },
      days_of_contract_expiration_to_notify: {
        required,
      },
      maximum_count_of_floor_plan_images: {
        required,
      },
      maximum_count_of_nearby_places: {
        required,
      },
      system_password: {
        required,
      },
      maximum_count_of_street_images: {
        required,
      },
    },
  },
  data() {
    return {
      checkbox: false,
      requried_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
    };
  },
  computed: {
    ...mapGetters(["getForm"]),

    system_passwordErrors() {
      const errors = [];
      if (!this.$v.form.system_password.$dirty) return errors;
      !this.$v.form.system_password.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    normal_company_phone_numberErrors() {
      const errors = [];
      if (!this.$v.form.normal_company_phone_number.$dirty) return errors;
      !this.$v.form.normal_company_phone_number.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    maximum_count_of_floor_plan_imagesErrors() {
      const errors = [];
      if (!this.$v.form.maximum_count_of_floor_plan_images.$dirty)
        return errors;
      !this.$v.form.maximum_count_of_floor_plan_images.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    maximum_count_of_street_imagesErrors() {
      const errors = [];
      if (!this.$v.form.maximum_count_of_street_images.$dirty) return errors;
      !this.$v.form.maximum_count_of_street_images.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    maximum_count_of_nearby_placesErrors() {
      const errors = [];
      if (!this.$v.form.maximum_count_of_nearby_places.$dirty) return errors;
      !this.$v.form.maximum_count_of_nearby_places.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },

    minimum_count_of_estate_images_to_publishErrors() {
      const errors = [];
      if (!this.$v.form.minimum_count_of_estate_images_to_publish.$dirty)
        return errors;
      !this.$v.form.minimum_count_of_estate_images_to_publish.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    maximum_count_of_estate_imagesErrors() {
      const errors = [];
      if (!this.$v.form.maximum_count_of_estate_images.$dirty) return errors;
      !this.$v.form.maximum_count_of_estate_images.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    days_of_contract_expiration_to_notifyErrors() {
      const errors = [];
      if (!this.$v.form.days_of_contract_expiration_to_notify.$dirty)
        return errors;
      !this.$v.form.days_of_contract_expiration_to_notify.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    days_of_estate_order_to_deleteErrors() {
      const errors = [];
      if (!this.$v.form.days_of_estate_order_to_delete.$dirty) return errors;
      !this.$v.form.days_of_estate_order_to_delete.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    permanent_company_phone_numberErrors() {
      const errors = [];
      if (!this.$v.form.permanent_company_phone_number.$dirty) return errors;
      !this.$v.form.permanent_company_phone_number.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    rangeSimilarSpaceErrors() {
      const errors = [];
      if (!this.$v.form.range_similar_space.$dirty) return errors;
      !this.$v.form.range_similar_space.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    companyNumberErrors() {
      const errors = [];
      if (!this.$v.form.company_number.$dirty) return errors;
      !this.$v.form.company_number.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    isLoad() {
      return this.$store.getters.getLoadingForm;
    },
    form() {
      return this.getForm;
    },
    formTitle() {
      return this.newItemLabel;
    },
  },
  watch: {
    model() {},
    // form: {
    //  handler(after, before) {
    //   if (after.system_password == before.system_password) {
    //    delete this.form.system_password
    //   }else{

    //   }
    //  },
    //  deep: true
    // },
  },
  methods: {
    save() {
      this.$v.form.$touch();

      if (!this.$v.form.$invalid) {
        let formdata = new FormData();
        if (this.form.hasOwnProperty("system_password")) {
          if (!this.checkbox) {
            delete this.form["system_password"];
          }
        }
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
      } else {
        this.$toast.error("أكمل الحقول المطلوبة");
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchForm", this.api.getAll);
  },
};
</script>
