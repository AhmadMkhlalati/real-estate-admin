import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework';
import config from '@/config'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
//import colors from 'vuetify/lib/util/colors'
import 'font-awesome/css/font-awesome.css'

Vue.use(Vuetify);
library.add(fas) // Include needed icons

Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally

export default new Vuetify({
    rtl: true,
    theme: {
        themes: {
            light: config.light,

        }
    },
    icons: {
        iconfont: 'faSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
        menu: {
            component: FontAwesomeIcon,
            props: {
                icon: ['fal', 'bars'],
            },
        },
        // reusable custom icon
        vuejs: {
            component: FontAwesomeIcon,
            props: {
                icon: ['fab', 'vuejs'],
            },
        },
    },

});