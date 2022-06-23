<template>
  <v-form @submit.prevent="save">
    <v-card>
      <v-card-title>
        <span>{{ newItemLabel }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <Input
                label="اسم المنطقة"
                type="text"
                :model="form.name"
                :errorMessages="nameErrors"
                @changeValue="
                  (val) => {
                    form.name = val;
                    $v.form.name.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <Input
                label="latitude"
                type="text"
                :placeholder="'33,3...'"
                :model="form.latitude"
                :errorMessages="latitudeErrors"
                @changeValue="
                  (val) => {
                    form.latitude = val;
                    $v.form.latitude.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <Input
                label="longitude"
                :placeholder="'36,3...'"
                type="text"
                :model="form.longitude"
                :errorMessages="longitudeErrors"
                @changeValue="
                  (val) => {
                    form.longitude = val;
                    $v.form.longitude.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <FormSelect
                :items="Locations"
                :model="form.parent_id"
                attr="parent_id"
                :errorMessages="parent_idErrors"
                label="ضمن المحافظة"
                @select="
                  (val) => {
                    form.parent_id = val.value;
                    $v.form.parent_id.$touch();
                  }
                "
              >
              </FormSelect>
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
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [validationMixin],
  props: {
    api: String,
    isNew: Boolean,
    newItemLabel: String,
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(20),
      },
      parent_id: {
        required,
      },
      longitude: {
        required,
      },
      latitude: {
        required,
      },
    },
  },
  data() {
    return {
      name_error_msgs: {
        maxlength: "يجب أن يتألف الأسم من 20 أحرف كحد أقصى.",
        required: "هذا الحقل مطلوب.",
      },
      required_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
    };
  },
  computed: {
    ...mapGetters(["getForm", "getLocations"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.maxLength &&
        errors.push(this.name_error_msgs.maxlength);
      !this.$v.form.name.required && errors.push(this.name_error_msgs.required);
      return errors;
    },
    parent_idErrors() {
      const errors = [];
      if (!this.$v.form.parent_id.$dirty) return errors;
      !this.$v.form.parent_id.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    latitudeErrors() {
      const errors = [];
      if (!this.$v.form.latitude.$dirty) return errors;
      !this.$v.form.latitude.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    longitudeErrors() {
      const errors = [];
      if (!this.$v.form.longitude.$dirty) return errors;
      !this.$v.form.longitude.required &&
        errors.push(this.required_error_msgs.required);
      return errors;
    },
    form() {
      return this.getForm;
    },
    formTitle() {
      return this.isNew ? "عنصر جديد" : "تعديل العنصر";
    },
    Locations() {
      return this.getLocations;
    },
  },
  watch: {
    model() {},
  },
  methods: {
    ...mapActions(["fetchGovernorate"]),
    save() {
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
      } else {
        this.$toast.error("أكمل الحقول المطلوبة");
      }
    },
    updateForm(val) {
      form.parent_id = val.value;
      $v.form.parent_id.$touch();
    },
  },
  mounted() {
    //this.fetchLocations("locations");
    this.fetchGovernorate("locations");
  },
};
</script>
