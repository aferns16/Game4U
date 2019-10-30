import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    getVideogames: state => state.videogames
  },

  state: {
    videogames: []
  },
  mutations: {
    update_videogames(state, videogames) {
      state.videogames = videogames;
    }
  },
  actions: {
    sendParams({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/getGames",
          data: params,
          method: "POST"
        })
          .then(resp => {
            const videogames = resp.data.videogames;
            commit("update_videogames", videogames);
            alert(videogames);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {}
});
