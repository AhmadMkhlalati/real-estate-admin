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
                label="الأسم الأول"
                type="text"
                :model="form.first_name"
                :errorMessages="firstNameErrors"
                @changeValue="
                  (val) => {
                    form.first_name = val;
                    $v.form.first_name.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <Input
                label="الأسم الأخير"
                type="text"
                :model="form.last_name"
                :errorMessages="lastNameErrors"
                @changeValue="
                  (val) => {
                    form.last_name = val;
                    $v.form.last_name.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <Input
                label="الإميل أو الهاتف"
                type="text"
                :model="form.authentication"
                :errorMessages="authenticationErrors"
                @changeValue="
                  (val) => {
                    form.authentication = val;
                    $v.form.authentication.$touch();
                  }
                "
              ></Input>
            </v-col>
            <!--  <v-col cols="12" sm="6" md="6">
                    <Switcher
                      attr="is_activated"
                      label="تغيير كلمة المرور"
                      @switcher="pass"
                    ></Switcher
                  ></v-col>
                  <v-col cols="12" sm="6" md="6"></v-col>-->
            <v-col v-if="passwordChange" cols="12" sm="6" md="6">
              <Input
                label="كلمة المرور"
                type="password"
                :model="form.password"
                :errorMessages="passwordErrors"
                @changeValue="
                  (val) => {
                    form.password = val;
                    $v.form.password.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col v-if="passwordChange" cols="12" sm="6" md="6">
              <Input
                label="تأكيد كلمة المرور"
                type="password"
                :model="form.repeatPassword"
                :errorMessages="repeatPasswordErrors"
                @changeValue="
                  (val) => {
                    form.repeatPassword = val;
                    $v.form.repeatPassword.$touch();
                  }
                "
              ></Input>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <FormSelect
                :items="roles"
                :model="form.role_id"
                :errorMessages="roleErrors"
                attr="role_id"
                label="صلاحية المستخدم"
                @select="
                  (val) => {
                    form.role_id = val.value;
                    $v.form.role_id.$touch();
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
      first_name: {
        required,
        maxLength: maxLength(20),
      },
      last_name: {
        required,
        maxLength: maxLength(20),
      },
      authentication: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      role_id: {
        required,
      },
    },
  },
  data() {
    return {
      // repeatPassword: "",
      passwordChange: true,
      roles: [
        {
          text: "مدير النظام",
          value: "1",
        },
        {
          text: "سكرتيرة",
          value: "2",
        },
        {
          text: "مدير التطوير",
          value: "3",
        },
        {
          text: "مدير التسويق",
          value: "4",
        },
        {
          text: "محلل البيانات",
          value: "5",
        },
      ],
      firstname_error_msgs: {
        maxlength: "يجب أن يتألف الأسم من 20 حرف كحد أقصى.",
        required: "هذا الحقل مطلوب.",
      },
      lastname_error_msgs: {
        maxlength: "يجب أن يتألف الأسم من 20 حرف كحد أقصى.",
        required: "هذا الحقل مطلوب.",
      },
      authentication_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
      password_error_msgs: {
        minLength: "يجب أن تتألف كلمة المرور من 8 محارف على الأقل.",
        required: "هذا الحقل مطلوب.",
      },
      repeatPassword_error_msgs: {
        sameAs: "كلمة المرور غير متطابقة.",
        required: "هذا الحقل مطلوب.",
      },
      role_error_msgs: {
        required: "هذا الحقل مطلوب.",
      },
    };
  },
  computed: {
    ...mapGetters(["getForm"]),
    firstNameErrors() {
      const errors = [];
      if (!this.$v.form.first_name.$dirty) return errors;
      !this.$v.form.first_name.maxLength &&
        errors.push(this.firstname_error_msgs.maxlength);
      !this.$v.form.first_name.required &&
        errors.push(this.firstname_error_msgs.required);
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.form.last_name.$dirty) return errors;
      !this.$v.form.last_name.maxLength &&
        errors.push(this.lastname_error_msgs.maxlength);
      !this.$v.form.last_name.required &&
        errors.push(this.lastname_error_msgs.required);
      return errors;
    },
    authenticationErrors() {
      const errors = [];
      if (!this.$v.form.authentication.$dirty) return errors;
      !this.$v.form.authentication.required &&
        errors.push(this.authentication_error_msgs.required);
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.minLength &&
        errors.push(this.password_error_msgs.minLength);
      !this.$v.form.password.required &&
        errors.push(this.password_error_msgs.required);
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.form.repeatPassword.$dirty) return errors;
      !this.$v.form.repeatPassword.sameAsPassword &&
        errors.push(this.repeatPassword_error_msgs.sameAs);
      !this.$v.form.repeatPassword.required &&
        errors.push(this.repeatPassword_error_msgs.required);
      return errors;
    },
    roleErrors() {
      const errors = [];
      if (!this.$v.form.role_id.$dirty) return errors;
      !this.$v.form.role_id.required &&
        errors.push(this.role_error_msgs.required);
      return errors;
    },
    form() {
      return this.getForm;
    },
    formTitle() {
      return (this.isNew ? " إنشاء " : " تعديل ") + this.newItemLabel;
    },
  },
  watch: {
    model() {},
  },
  methods: {
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
      } else {
        this.$toast.error("أكمل الحقول المطلوبة");
      }
    },
    pass(val) {
      this.passwordChange = val.value;
    },
  },
};
</script>
