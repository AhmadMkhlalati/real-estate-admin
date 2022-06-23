import axios from "axios";

const state = () => ({
    contractTypes: [],
});

const actions = {
    async fetchContractTypes({ commit }, api_info) {
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
                commit('SET_CONTRACT_TYPES', result)
            })
            .catch(err => {})
    },
}

const getters = {
    getContractTypes: state => {
        return state.contractTypes
    },
}

const mutations = {
    SET_CONTRACT_TYPES(state, payload) {
        state.contractTypes = payload
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}