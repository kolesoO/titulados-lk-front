import Vue from 'vue'
import TokenRepository from "../repositories/TokenRepository";

export default {
    setAuthHeader: function () {
        let token = TokenRepository.getToken();

        if (token) {
            Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
        }
    },
    unsetAuthHeader: function () {
        delete Vue.http.headers.common['Authorization'];
    }
}
