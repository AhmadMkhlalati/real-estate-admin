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
              <Input
                label="الأسم بالعربي "
                type="text"
                :errorMessages="name_ar_single_Errors"
                :model="field.name_ar_single"
                @changeValue="
                  (val) => {
                    field.name_ar_single = val;
                    $v.field.name_ar_single.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <Input
                label="الأسم بالاجنبي "
                type="text"
                :errorMessages="name_en_single_Errors"
                :model="field.name_en_single"
                @changeValue="
                  (val) => {
                    field.name_en_single = val;
                    /*$v.form.name_en.$touch()*/
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
  nameLength,
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
    field: {
      name_ar_single: {
        required,
      },
      name_en_single: {
        required,
      },
    },
  },
  data() {
    return {
      requried_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
      field: {
        name_ar_single: "",
        name_en_single: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getForm"]),

    name_ar_single_Errors() {
      const errors = [];
      if (!this.$v.field.name_ar_single.$dirty) return errors;
      !this.$v.field.name_ar_single.required &&
        errors.push(this.requried_error_msgs.required);
      return errors;
    },
    name_en_single_Errors() {
      const errors = [];
      if (!this.$v.field.name_en_single.$dirty) return errors;
      !this.$v.field.name_en_single.required &&
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
  },
  methods: {
    save() {
      this.$v.field.$touch();
      if (!this.$v.field.$invalid) {
        this.form.name_ar = this.field.name_ar_single;
        this.form.name_en = this.field.name_en_single;

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
