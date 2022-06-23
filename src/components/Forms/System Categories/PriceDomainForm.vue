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
              <Switcher
                label="اختيار الحد الأدنى"
                :model="minCheck"
                @switcher="ChangeMin"
              ></Switcher>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <Switcher
                label="اختيار الحد الأعلى"
                :model="maxCheck"
                @switcher="ChangeMax"
              ></Switcher>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <Input
                :disabled="minCheck"
                label="الحد الأدنى"
                type="number"
                :v-bind="form.min"
                :errorMessages="minErrors"
                @changeValue="
                  (val) => {
                    form.min = val;
                    $v.form.min.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <Input
                :disabled="maxCheck"
                label="الحد الأعلى "
                type="number"
                :v-bind="form.max"
                :errorMessages="maxErrors"
                @changeValue="
                  (val) => {
                    form.max = val;
                    $v.form.max.$touch();
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
      min: {
        required,
      },
      max: {
        required,
      },
    },
  },
  data() {
    return {
      maxCheck: true,
      minCheck: true,
      requried_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
    };
  },
  computed: {
    ...mapGetters(["getForm"]),
    minErrors() {
      const errors = [];
      if (!this.$v.form.min.$dirty) return errors;
      !this.$v.form.min.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    maxErrors() {
      const errors = [];
      if (!this.$v.form.max.$dirty) return errors;
      !this.$v.form.max.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
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
    maxCheck() {
      this.maxCheck != true ? (this.form.max = "999999999999999999") : "";
    },
    minCheck() {
      this.minCheck != true ? (this.form.min = 0) : "";
    },
  },
  methods: {
    ChangeMax(val) {
      this.maxCheck = val.value;
      this.minCheck ? "" : (this.minCheck = !val.value);
    },
    ChangeMin(val) {
      this.minCheck = val.value;
      this.maxCheck ? "" : (this.maxCheck = !val.value);
    },
    save() {
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
      } else {
        this.$toast.error("أكمل الحقول المطلوبة");
      }
    },
  },
};
</script>
