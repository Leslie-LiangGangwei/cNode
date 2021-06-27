import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

// 创建状态仓库，注意 Store, state不能改
export default new Vuex.Store({
    state:{
      num: 8,
    },
    mutations: {
      // 定义我们的状态改变函数
      increase(state){
        state.num--
      }
    },
    // actions 之中只能对 mutations 进行操作
    actions: {
        // context 为上下文对象
        increaseAction(context) {
            context.commit('increase')
        }
    },
    getters: {
        getNum(state){
            return state.num >0?state.num:0
        }
    }
  })