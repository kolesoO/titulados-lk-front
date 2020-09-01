import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource';
import TokenRepository from '../repositories/TokenRepository'
import Headers from "../services/Headers";
import Endpoint from "../services/Endpoint";

Vue.use(Vuex);
Vue.use(VueResource);

export default new Vuex.Store({
    state: {
        user : null
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                Vue.http.post(Endpoint.getBySuffix('/login'), user)
                    .then(response => {
                        TokenRepository.setToken(response.body.api_token);
                        Headers.setAuthHeader();
                        commit('update_user_data', response.body.data);
                        resolve(response);
                    })
                    .catch(err => {
                        commit('update_user_data', null);
                        TokenRepository.delete();
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit('update_user_data', null);
                TokenRepository.delete();
                Headers.unsetAuthHeader();
                resolve()
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                Vue.http.post(Endpoint.getBySuffix('/register'), user)
                    .then(response => {
                        TokenRepository.setToken(response.body.api_token);
                        Headers.setAuthHeader();
                        commit('update_user_data', response.body.data);
                        resolve(response);
                    })
                    .catch(err => {
                        commit('update_user_data', null);
                        TokenRepository.delete();
                        reject(err)
                    })
            })
        },
        me({commit}) {
            return new Promise((resolve, reject) => {
                Vue.http.get(Endpoint.getBySuffix('/me'))
                    .then(response => {
                        commit('update_user_data', response.data.data);
                        resolve(response);
                    })
                    .catch(err => {
                        commit('update_user_data', null);
                        TokenRepository.delete();
                        reject(err)
                    })
            })
        },
        updateMe({commit}, user) {
            return new Promise((resolve, reject) => {
                Vue.http.post(
                    Endpoint.getBySuffix('/me'),
                    user
                )
                    .then(response => {
                        commit('update_user_data', response.data.data);
                        resolve(response);
                    })
                    .catch(err => {
                        commit('update_user_data', null);
                        TokenRepository.delete();
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        update_user_data(state, user) {
            state.user = user
        }
    },
    getters: {
        isLoggedIn: state => !!state.user,
        user: state => state.user
    }
})
