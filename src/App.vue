<template>
  <div v-if="$store.getters.logedIn" class="">
    <Menu
      v-if="
        $store.getters.role === 'employee' ||
        $store.getters.role === 'head_department'
      "
    />
    <MenuAdmin v-if="$store.getters.role === 'admin'" />
    <MenuManager v-if="$store.getters.role === 'manager'" />
    <!-- <MenuHead v-if="$store.getters.role === 'head_department'" /> -->
    <MenuOwner v-if="$store.getters.role === 'owner'" />
    <MenuHR v-if="$store.getters.role === 'hr'" />
    <div class="wrapper d-flex flex-column min-vh-100">
      <AppHeader />
      <div class="body flex-grow-1">
        <div class="">
          <router-view />
        </div>
      </div>
      <AppFooter />
    </div>
    <Toast />
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import MenuAdmin from "./components/Admin/MenuAdmin.vue";
import MenuHead from "./components/DepartmentHead/MenutestCoreui.vue";
import Menu from "./components/Employee/MenuView.vue";
import MenuHR from "./components/Hr/MenuHR.vue";
import Login from "./components/Login.vue";
import MenuManager from "./components/Manager/MenuManager.vue";
import MenuOwner from "./components/Owner/MenuOwner.vue";
import { mapActions } from "vuex";
import { CContainer } from "@coreui/vue";
import AppHeader from "./components/DepartmentHead/AppHeader.vue";
import AppFooter from "./components/DepartmentHead/AppFooter.vue";

export default {
  name: "App",
  components: {
    Login,
    Menu,
    MenuAdmin,
    MenuManager,
    MenuHead,
    MenuOwner,
    MenuHR,
    CContainer,
    AppHeader,
    AppFooter,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.logedIn;
    },
    showLogin() {
      return this.$route.path === "/login" || this.$route.path === "/";
    },

    userRole() {
      return this.$store.getters.role;
    },
  },

  created() {
    this.$store.commit("setLoading", true);
    // console.log("ccc", this.$store.getters.role);
    if (localStorage.getItem("token")) {
      const decode = jwtDecode(localStorage.getItem("token"));

      console.log("Decoded token:", decode);

      if (decode && decode.role) {
        // console.log('Token Role:', decode.role);
        // console.log('Token Role main:', decode.role.main);
        // console.log('Token:', localStorage.getItem("token"));
        console.log("Token user_id:", decode.user_id);
        localStorage.setItem("srole", decode.role);
        const data_login = {
          logedIn: true,
          role: decode.role,
          position: decode.position,
          user_id: decode.user_id,
          job_position: decode.job_position,
          department: decode.department,
          id: decode.id,
          token: localStorage.getItem("token"),
        };
        this.$store.commit("setLogin", data_login);
        this.$store.commit("setLoading", false);
      } else {
        localStorage.clear();
        this.$router.push("/login");
      }
    } else {
      localStorage.clear();
      this.$router.push("/login");
    }
  },
  methods: {
    ...mapActions(["closeSidebar"]),

    closeMenu() {
      this.closeSidebar();
    },
  },
};
</script>

<style lang="scss">
@import "styles/style";
@import "styles/examples";
@import "./assets/Loader/loader.css";

.text-red-500 {
  color: red;
}
div.swal2-container {
  z-index: 9000;
}
</style>
