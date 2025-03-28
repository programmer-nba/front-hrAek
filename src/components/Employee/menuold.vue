<template>
    <section class="bg-[#001B79] ">
      <nav class=" items-center justify-between flex-wrap  border-t-2
    border-[#AEDEFC]   p-6 lg:flex lg:items-center lg:justify-between">
  
        <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid  
     pb-5 lg:pb-0">
          <div class="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <img src="../../assets/GPlusS-logo4.png" :width="50" alt="" />
          </div>
  
          <!-- Mobile menu button -->
          <div class="block lg:hidden">
            <button @click="isOpen = !isOpen" type="button" class="flex items-center px-3 py-2 border-2 rounded border-[#D23369] 
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
        <div :class="[isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full']"
          @click="closeSubMenuOnClickOutside" class="absolute inset-x-0 z-20 w-full  bg-white px-6 py-4 shadow-md transition-all 
         duration-300 ease-in-out  lg:relative lg:top-0
          lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 
          lg:opacity-100 lg:shadow-none">
  
          <div class="lg:-px-8 flex  flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
            <div v-for="menuItem in menuItems" :key="menuItem.id" class="relative lg:inline-block text-center"
              ref="submenuButton">
              <button @click="toggleSubMenu(menuItem)"
                :class="{ 'text-[#004225] hover:text-[#1C7947]': isMobile, 'text-white hover:bg-[#F7FD04]  hover:text-[#001B79]': !isMobile }"
                class="transform transition-colors duration-300 px-4 py-2 rounded lg:mx-4">{{ menuItem.label }}
              </button>
  
              <div v-if="isSubMenuOpen && activeMenuItem === menuItem && menuItem.subItems" ref="submenuContent"
                class="-translate-x-1/2 absolute left-1/2  mt-2 w-48 bg-white border border-gray-300 py-2 rounded-lg shadow-lg z-10">
                <button v-for="subItem in menuItem.subItems" :key="subItem.id" @click="navigateAndCloseMenu(subItem.route)"
                  class="block text-start w-full px-4 py-2 hover:text-white hover:bg-[#41644A]">
                  {{ subItem.label }}
                </button>
              </div>
            </div>
  
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
  
  import { mapGetters } from 'vuex'; // Import mapGetters from Vuex
  
  export default {
    components: {
  
    },
    data() {
      return {
        isOpen: false,
        isMobile: false,
        isSubMenuOpen: false,
        activeMenuItem: null,
        menuItems: [
        { id: 1, label: 'หน้าแรก', route: '/' },
        {
            id: 2, label: 'บันทึกข้อความ',  subItems: [
              { id: 1, label: 'เพิ่มบันทึกข้อความ', route: '/Record/AddRecord'},
              { id: 2, label: 'บันทึกข้อความทั้งหมด', route: '/Record'  }
            ]
          },
     
          { id: 6, label: 'สัญญา', route: '/Contract'  },
  
          { id: 6, label: 'โปรไฟล์', route: '/Profile'  },
  
  
        ],
  
      };
    },
  
    mounted() {
      this.isMobile = window.innerWidth < 913;
      window.addEventListener('resize', this.handleResize);
      document.addEventListener('click', this.closeDropdownOnClickOutside);
  
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
      document.removeEventListener('click', this.closeDropdownOnClickOutside);
  
    },
    methods: {
   
      toggleSubMenu(menuItem) {
        if (menuItem.route) {
          this.navigateAndCloseMenu(menuItem.route);
        } else {
          this.isSubMenuOpen = !this.isSubMenuOpen;
          this.activeMenuItem = menuItem;
        }
      },
  
      navigateAndCloseMenu(route) {
        this.$router.push(route);
        this.isSubMenuOpen = false;
      },
      handleResize() {
        this.isMobile = window.innerWidth < 821;
      },
  
      closeDropdownOnClickOutside(event) {
        const dropdownButtons = this.$refs.submenuButton;
        const dropdownContents = this.$refs.submenuContent;
  
        // Check if dropdownButtons is an array and not empty
        const isButtonsArray = Array.isArray(dropdownButtons) && dropdownButtons.length > 0;
  
        // Check if dropdownContents is an array and not empty
        const isContentsArray = Array.isArray(dropdownContents) && dropdownContents.length > 0;
  
        // Check if the event target is outside all dropdown buttons and contents
        const isOutsideDropdown = isButtonsArray && isContentsArray &&
          !dropdownButtons.some(button => button.contains(event.target)) &&
          !dropdownContents.some(content => content.contains(event.target));
  
        if (isOutsideDropdown) {
          this.isSubMenuOpen = false;
        }
      },
  
  
      async confirmLogout() {
        const confirmResult = await Swal.fire({
          text: 'คุณต้องการออกจากระบบหรือไม่?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ใช่, ออกจากระบบ',
          confirmButtonColor: '#E0144C',
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
  
    },
  
  };
  </script>
  
  <style></style>