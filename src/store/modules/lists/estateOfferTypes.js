import axios from "axios";

const state = () => ({
    estateOfferTypes: [],
});

const actions = {
    async fetchEstateOfferTypes({ commit }, api_info) {
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
                commit('SET_ESTATE_OFFER_TYPES', result)
            })
            .catch(err => {})
    },
}

const getters = {
    getEstateOfferTypes: state => {
        return state.estateOfferTypes
    },
}

const mutations = {
    SET_ESTATE_OFFER_TYPES(state, payload) {
        state.estateOfferTypes = payload
    },
}


export default {
    state,
    getters,
    mutations,
    actions
}