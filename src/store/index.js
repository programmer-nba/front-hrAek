import { createStore } from "vuex";
export default createStore({
  state: {
    isLoading: false,
    logedIn: false,
    token: localStorage.getItem("token"),

    role: localStorage.getItem("role"),
    position: "",
    department: "",
    job_position: "",
    id: "",
    // firstname: "",
    user_id: "",
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },

  getters: {
    isLoading: (state) => state.isLoading,
    logedIn: (state) => state.logedIn,
    token: (state) => state.token,
    role: (state) => state.role,
    id: (state) => state.id,
    position: (state) => state.position,
  },
  mutations: {

    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setLoading(state, item) {
      state.isLoading = item;
    },
    setLogin(state, item) {
      state.logedIn = item.logedIn;
      state.token = item.token;
      state.role = item.role;
      state.position = item.position;
      state.user_id = item.user_id;
      state.id = item.id;
    },

    setToken(state, item) {
      state.token = item;
    },
    setLoginDefault(state) {
      state.logedIn = false;
      state.token = "";
      state.role = "";
      state.position = "";
      state.department = "";
      state.id = "";
      state.user_id = "";
      state.state = false;
      localStorage.clear();
    },
    setTokenExpired(state) {
      state.loggedIn = false;
      state.token = "";
      state.role = "";
      state.position = "";
      state.department = "";
      state.id = "";
      state.user_id = "";
      localStorage.clear();
    }
  },

  actions: {
    toggleSidebar(context) {
      context.commit('toggleSidebar');
    },
    closeSidebar(context) {
      context.commit('closeSidebar');
    },
    setTokenExpired(context) {
      context.commit('setTokenExpired');
    }
  },
  modules: {},
});
