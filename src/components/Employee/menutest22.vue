<template>



    <section class="bg-[#001B79] ">
      <nav class=" items-center justify-between flex-wrap  border-t-2
  border-[#AEDEFC]   p-6 lg:flex lg:items-center lg:justify-between">
  
        <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid  
   pb-5 lg:pb-0">
          <div class="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <img src="../../assets/logo.png" :width="80" alt="" />
          </div>
  
          <!-- Mobile menu button -->
          <div class="block lg:hidden">
            <button @click="isOpen = !isOpen" type="button" class="flex items-center px-3 py-2 border-2 rounded border-[#F7FD04] 
           hover:border-[#F7FD04] text-[#F7FD04]">
              <svg v-show="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
              </svg>
  
              <svg v-show="isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
  
            </button>
          </div>
  
  
  
        </div>
  
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div :class="[isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full']" class="absolute inset-x-0 z-20 w-full  bg-white px-6 py-4 shadow-md transition-all 
       duration-300 ease-in-out  lg:relative lg:top-0
        lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 
        lg:opacity-100 lg:shadow-none ">
          <div class="lg:-px-8 flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
            <button
              :class="{ 'text-[#004225] hover:text-[#1C7947]': isMobile, 'text-white hover:bg-[#EEEEEE]  hover:text-[#E0144C]': !isMobile }"
              class="transform transition-colors duration-300 px-4 py-2 rounded lg:mx-4">หน้าหลัก</button>
            <button
              :class="{ 'text-[#004225] hover:text-[#1C7947]': isMobile, 'text-white hover:bg-[#EEEEEE]  hover:text-[#E0144C]': !isMobile }"
              class="transform transition-colors duration-300 px-4 py-2 rounded lg:mx-4">โปรไฟล์</button>
  
          </div>
  
  
        </div>
        <button @click="confirmLogout"
          :class="{ 'bg-[#F8DE22] text-[#15133C]': isMobile, 'bg-[#F8DE22] text-[#001B79]': !isMobile }"
          class="mt-4 block rounded-lg  px-6 py-2.5 text-center font-medium capitalize leading-5  hover:bg-[#F7FD04] lg:mt-0 lg:w-auto">
          ออกจากระบบ</button>
      </nav>
  
      
    
  
    </section>
    
  </template>
  
  <script>
  
  import Swal from 'sweetalert2';
  
  
  export default {
    components: {
  
    },
    data() {
      return {
        isOpen: false,
        isMobile: false,
      };
    },
    mounted() {
      this.isMobile = window.innerWidth < 768;
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      async confirmLogout() {
        const confirmResult = await Swal.fire({
          text: 'คุณต้องการออกจากระบบหรือไม่?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ใช่, ออกจากระบบ',
          confirmButtonColor: '#E0144C',  // Set the color here
          cancelButtonText: 'ยกเลิก',
        });
  
        if (confirmResult.isConfirmed) {
          this.logout();
        }
      },
      logout() {
        localStorage.clear();
        this.$store.commit("setLoginDefault");
        this.$router.push("/");
  
  
      },
  
      toggleMenu() {
        this.isOpen = !this.isOpen;
      },
      handleResize() {
        this.isMobile = window.innerWidth < 821;
      },
    },
  
  };
  </script>