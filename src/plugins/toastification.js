import Vue from 'vue'
import Toast from "vue-toastification";
Vue.use(Toast, {
    rtl: true,
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true
});
export default {}