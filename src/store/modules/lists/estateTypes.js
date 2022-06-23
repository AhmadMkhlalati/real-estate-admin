import axios from "axios";

const state = () => ({
    estateTypes: [],
});

const actions = {
    async fetchEstateTypes({ commit }, api_info) {
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
                commit('SET_ESTATE_TYPES', result)
            })
            .catch(err => {})
    },
}

const getters = {
    getEstateTypes: state => {
        return state.estateTypes
    },
}

const mutations = {
    SET_ESTATE_TYPES(state, payload) {
        state.estateTypes = payload
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}