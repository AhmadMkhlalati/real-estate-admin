import axios from "axios";

const state = () => ({
    ownershipTypes: [],
});

const actions = {
    async fetchOwnershipTypes({ commit }, api_info) {
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
                commit('SET_OWNERSHIP_TYPES', result)
            })
            .catch(err => {})
    },
}

const getters = {
    getOwnershipTypes: state => {
        return state.ownershipTypes
    },
}

const mutations = {
    SET_OWNERSHIP_TYPES(state, payload) {
        state.ownershipTypes = payload
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}