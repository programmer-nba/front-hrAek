

<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-b from-[#00337C] to-blue-200">
    <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
      px-6 py-10 sm:px-10 sm:py-6
      bg-white rounded-lg shadow-md lg:shadow-lg">
      <div class="text-center mb-4">
        <h6 class="font-semibold text-[#063970] text-xl">Login</h6>
      </div>

      <div>
        <input v-model="userid" class="block w-full py-3 px-3 mt-2
          text-gray-800 appearance-none
          border-2 border-gray-100
          focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md" />
      </div>

      <div class="relative w-full">
        <input v-model="password" class="block w-full py-3 px-3 mt-2 mb-4
          text-gray-800 appearance-none
          border-2 border-gray-100
          focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md" />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          <p class="font-semibold">Show</p>
        </div>
      </div>

      <button @click="login" class="w-full py-3 mt-10 bg-[#063970] rounded-md
        font-medium text-white uppercase
        focus:outline-none hover:shadow-none">
        Login
      </button>
    </div>
  </div>
</template>
  
  
  
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Login",

  data() {
    return {
      loading: false,
      userid: "",
      password: "",
    };
  },

  methods: {
    async login() {
      try {

        this.loading = true;
        const response = await axios.post(
          `http://ds7dd5.nbadigitalservice.com/ddsc-office/login`,
          {
            userid: this.userid,
            password: this.password,
          }
        );

        localStorage.setItem('token', response.data.token);

        Swal.fire({
          icon: 'success',
          text: 'เข้าสู่ระบบสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log('Login response:', response.data);
        console.log('Login response:', response.data.employee_iden);

        setTimeout(() => {
          window.location.assign("/");
        }, 1500);



      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        this.loading = false;
      }
    },

  },
};
</script>
  
  
  
  
  
  
  
<style scoped></style>
  