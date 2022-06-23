import Vue from 'vue';
import Vuex from 'vuex';

import table from './modules/table'
import filter from './modules/filter'
import form from './modules/form'
import auth from './modules/auth'
import ownershipTypes from './modules/lists/ownershipTypes'
import estateTypes from './modules/lists/estateTypes'
import contractTypes from './modules/lists/contractTypes'
import interiorStatuses from './modules/lists/interiorStatuses'
import estateOfferTypes from './modules/lists/estateOfferTypes'
import periodTypes from './modules/lists/periodTypes'
import locations from './modules/lists/locations'
import offices from './modules/lists/offices'
import areaUnits from './modules/lists/areaUnits'
import Dashboard from './modules/lists/dashboard'
import reportsEstate from './modules/lists/reportsEstate'

Vue.use(Vuex);

export default new Vuex.Store({

    namespace: true,
    state: {
        drawer: true
    },
    mutations: {
        toggleDrawer(state) {
            state.drawer = !state.drawer;
        }
    },
    actions: {
        TOGGLE_DRAWER({ commit }) {
            commit('toggleDrawer');
        }
    },
    getters: {
        DRAWER_STATE(state) {
            return state.drawer;
        }
    },
    modules: {
        table,
        filter,
        form,
        auth,
        ownershipTypes,
        reportsEstate,
        estateTypes,
        interiorStatuses,
        estateOfferTypes,
        periodTypes,
        locations,
        contractTypes,
        offices,
        areaUnits,
        Dashboard
    }
});