import {
    createStore
} from "vuex";
import axios from "axios";

const state = createStore({
    state: {
        user: null,
        repositories: null,
        error: null,
        url: 'https://api.github.com/users/',
        currentSort: 'name'
    },
    mutations: {
        sort(state, payload) {
            state.currentSort = payload
        },
        userInfo(state, payload) {
            state.user = payload
            state.error = null
        },
        resetUser(state) {
            state.repositories = state.error = state.user = null
        },
        getError(state, error) {
            if (error.response.status == 403) {
                state.error = 'Вас забанили на данном сайте на определенное время'
            } else {
                state.error = 'Что то пошло не так'
            }
        },
        reposInfo(state, payload) {
            state.repositories = payload
        }
    },
    actions: {
        async userInfo({
            commit,
            state
        }, search) {
            try {
                const res = await axios.get(`${state.url}${search}`)
                const repos = await axios.get(`${state.url}${search}/repos`)
                commit('userInfo', res.data)
                commit('reposInfo', repos.data)
            } catch (error) {
                commit('getError', error)
                console.log('Произошла ошибка при получении данных');
            }
        }
    },
    getters: {
        getReposSort(state) {
          if (state.repositories != null) {
            return state.repositories.sort((prev, next) => {
                let mod = 1
                if (prev[state.currentSort] < next[state.currentSort]) {
                    return -1 * mod
                }
            })
          }
        }
    }
})
export default state