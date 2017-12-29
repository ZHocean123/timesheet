import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,
  },
  getters,
});

export default store;
