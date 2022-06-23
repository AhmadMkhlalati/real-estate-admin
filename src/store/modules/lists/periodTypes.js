import axios from "axios";

const state = () => ({
    periodTypes: [],
});

const actions = {
    async fetchPeriodTypes({ commit }, api_info) {
        await axios
            .get(`${api_info}`)
            .then(res => {
                let resultData = res.data.data;
                let result = resultData.map(x => {
                    return {
                        text: x.name_ar,
                        value: x.id
                    }
                })
                commit('SET_PERIOD_TYPES', result)
            })
            .catch(err => {})
    },
}

const getters = {
    getPeriodTypes: state => {
        return state.periodTypes
    },
}

const mutations = {
    SET_PERIOD_TYPES(state, payload) {
        state.periodTypes = payload
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}