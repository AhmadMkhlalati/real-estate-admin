import axios from "axios";

const state = () => ({
    interiorStatuses: [],
});

const actions = {
    async fetchInteriorStatuses({ commit }, api_info) {
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
                commit('SET_INTERIOR_STATUSES', result)
            })
            .catch(err => {})
    },
}

const getters = {
    getInteriorStatuses: state => {
        return state.interiorStatuses
    },
}

const mutations = {
    SET_INTERIOR_STATUSES(state, payload) {
        state.interiorStatuses = payload
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}