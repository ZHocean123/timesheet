const app = {
  state: {
    showSideMenu: true,
  },
  mutations: {
    SET_SHOW_SIDE_MENU: (state, showSideMenu) => {
      state.showSideMenu = showSideMenu;
    },
  },
  actions: {
    setShowSideMenu({ commit }, showSideMenu) {
      commit('SET_SHOW_SIDE_MENU', showSideMenu);
    },
    toggleShowSideMenu({ commit, state }) {
      commit('SET_SHOW_SIDE_MENU', !state.showSideMenu);
    },
  },
};

export default app;
