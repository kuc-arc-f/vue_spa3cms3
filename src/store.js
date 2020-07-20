//
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//
export default new Vuex.Store({
    state: {
       count: 5,
       tasks:[],
       chat_join_items: [],
       mdat_items : [],
    },
    getters: {
        getTasks: state => {
            return state.tasks
        },
        chat_join_items: state => {
            return state.chat_join_items
        },
        mdat_items: state => {
            return state.mdat_items
        },
    }, 
    mutations: {
        increment(state) {
            state.count++
        },
        setTasks(state, payload) {
            state.tasks = payload.tasks
        },
        set_chatJoinItems(state, payload) {
            state.chat_join_items = payload.chat_join_items
        },
        set_mdat_items(state, payload) {
            state.mdat_items = payload.mdat_items
        },
    },
})

