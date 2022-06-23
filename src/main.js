import Vue from 'vue'
import App from './App.vue'
import router from './Routes'
import store from './store/index'
import vuetify from './plugins/vuetify'
import "vue-toastification/dist/index.css";
import axios from "./plugins/axios";
import components from "./components";
import toastnotification from "@/plugins/toastification"
//import dropZone from "@/plugins/drop-zone"

Vue.config.productionTip = false

export default new Vue({
    vuetify,
    router,
    components,
    axios,
    store,
    toastnotification,
    //dropZone,
    render: h => h(App),
}).$mount('#app')