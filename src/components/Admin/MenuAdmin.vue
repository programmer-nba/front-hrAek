<template>

  <CSidebar class="border-end bg-gray-950 border-[#B4D4FF] border-r-2 shadow-lg " position="fixed"
    :unfoldable="sidebarUnfoldable" :visible="sidebarVisible" @visible-change="(event) =>
      $store.commit({
        type: 'updateSidebarVisible',
        value: event,
      })
      ">
    <CSidebarHeader class="border-bottom  flex items-center justify-center">
      <div class="flex items-center justify-center flex-shrink-0 pb-6">
        <img class="w-24 h-auto" src="../../assets/logo.png" />
      </div>
      <CCloseButton class="d-lg-none" dark @click="$store.commit('toggleSidebar')" />
    </CSidebarHeader>

    <div class="flex items-center justify-between px-4 py-3 bg-[#B4D4FF]">
      <div class="flex items-center mr-5">
        <div class="mr-5">
          <div class="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
            <svg @click="edituser()" class="shrink-0 text-[#102C57] inline-block" width="32" height="32"
              viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor"
                d="M248 104c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96m0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48m0-240C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8m0 448c-49.7 0-95.1-18.3-130.1-48.4c14.9-23 40.4-38.6 69.6-39.5c20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5c-35 30.1-80.4 48.4-130.1 48.4m162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9c-10.2 0-26 9.6-57.6 9.6c-31.5 0-47.4-9.6-57.6-9.6c-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9" />
            </svg>
          </div>
        </div>
        <div class="mr-2">
          <div
            class=" text-[#102C57] transition-colors duration-200 ease-in-out text-sm font-medium text-secondary-inverse">
            {{ $store.getters.position }}
          </div>

          <span class="text-[#102C57] font-medium block text-[0.85rem]"> {{ $store.getters.role
            === 'head_department' ? 'หัวหน้าแผนก' : $store.getters.role }}

          </span>
        </div>
      </div>
      <button
        class="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0"
        title="ตั้งค่าโปรไฟล์">
        <span
          class="leading-none transition-colors duration-200 ease-in-out peer group-hover:text-primary text-secondary-dark">
          <svg class="text-[#102C57]" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z">
            </path>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
            </path>
          </svg>
        </span>
      </button>
    </div>
    <!-- <AppSidebarNav /> -->

    <div class="flex-1 mt-2 px-2 space-y-2 overflow-hidden hover:overflow-auto">
      <div v-for="menuItem in menuItems" :key="menuItem.text">

        <button @click="handleMenuItemClick(menuItem)" :class="{
          'bg-[#F4E869] text-[#001B79]': menuItem.showSubmenu || menuItem.isActive,
          'hover:bg-[#F8DE22] hover:text-[#001B79]': !menuItem.showSubmenu,
          'bg-[#F4E869] text-[#001B79]': menuItem.isActive,
          ' text-white ': !menuItem.isActive && !menuItem.showSubmenu

        }" class="flex items-center w-full space-x-2 group hover:bg-[#F7FD04] hover:text-[#001B79]  rounded-lg">

          <span
            :style="{ background: menuItem.showSubmenu ? '#F8DE22' : '', color: menuItem.showSubmenu ? '#001B79' : '' }"
            class="py-2.5 px-2 group-hover:bg-[#FFF78A] items-center group-hover:text-[#001B79] rounded-lg">
            <!-- svg -->
            <div v-html="menuItem.icon"></div>
          </span>
          <span :class="{ 'text-[#001B79]': menuItem.showSubmenu }" class="font-medium  text-base">{{
            menuItem.text }}</span>

          <span class="ml-10">
            <svg v-if="menuItem.submenu" width="24" height="24" fill="currentColor" viewBox="0 0 20 20" :class="{
              'rotate-180': menuItem.showSubmenu,
              'rotate-0': !menuItem.showSubmenu,
            }" class="inline mt-1 ml-1 transition-transform duration-200 transform md:-mt-1">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </span>
        </button>

        <!--  submenu -->
        <div v-if="menuItem.submenu && menuItem.showSubmenu" class="mt-2 origin-top-right rounded-md shadow-lg">
          <div class="px-2 py-2 bg-white rounded-md shadow">
            <button v-for="subItem in menuItem.submenu" :key="subItem.text" @click="handleSubmenuItemCick(subItem)"
              class="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              {{ subItem.text }}
            </button>
          </div>
        </div>

      </div>
      <br>
      <button @click="logout" class="w-full mt-10 bg-[#F8DE22] rounded-full py-2.5 text-[#001B79]">
        ออกจากระบบ
      </button>
    </div>


    <CSidebarFooter class="border-top d-none d-lg-flex">
      <CSidebarToggler @click="$store.commit('toggleUnfoldable')" />
    </CSidebarFooter>
  </CSidebar>


</template>

<script>
import Swal from "sweetalert2";
// import Icon from "../Amin_Icon.vue";
import { computed } from 'vue'

import { useStore } from 'vuex'

export default {
  components: {
    // Icon,
  },
  // props: ['toggleMenuProp'],

  data() {
    return {
      isSidebarDesktopOpen: true,
      isMobile: false,
      isSubmenuOpen: false,
      selectedMenuItem: null,
      sidebarUnfoldable: null,
      sidebarVisible: null,
      menuItems: [
        {
          text: "หน้าแรก",
          action: "/",
          icon: "<i class='pi pi-home' style='font-size: 1.4rem'></i>",
        },
        {
          text: 'พาร์ทเนอร์ใหม่', action: '/ParthnerView',
          icon: "<i class='pi pi-home' style='font-size: 1.4rem'></i>",
        },
        {
          text: "พนักงาน",
          submenu: [
            { text: "พนักงานทั้งหมด", path: "/employee/all" },

          ],
          icon: "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path><circle cx='9' cy='7' r='4'></circle><path d='M23 21v-2a4 4 0 0 0-3-3.87'></path><path d='M16 3.13a4 4 0 0 1 0 7.75'></path></svg>",
        },
        {
          text: 'บันทึกข้อความ', action: '/RecordView',
          icon: "<i class='pi pi-home' style='font-size: 1.4rem'></i>",
        },
        {
          text: "E-Market",
          submenu: [
            { text: "คำร้องฝากขายสินค้า", path: "/ConsignmentRequest" },
            { text: "คำร้องขอเปิดร้านค้า", path: "/RequestOpenStore" },

          ],
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 650 800"><path fill="currentColor" d="M648 256q0 2 1 3t0 3v20q0 10-7 17t-17 7h-46v324q0 10-6 16t-17 7H93q-10 0-17-7t-7-16V306H23q-10 0-16-7t-7-17v-20q0-4 1-6L60 39q5-16 17-25t28-9h439q16 0 28 9t16 25zm-138 50H139v127q0 5 4 8t8 4h347q5 0 9-4t3-8V306z"></path></svg>`
        },

        {
          text: 'สัญญา', action: '/Contract',
          icon: "<i class='pi pi-home' style='font-size: 1.4rem'></i>",
        },

        {
          text: 'โปรไฟล์', action: '/Profile',
          icon: "<i class='pi pi-home' style='font-size: 1.4rem'></i>",
        },
        // {
        //   text: "จัดการแผนกงาน",
        //   action: "/AddEmp",
        //   icon: "Form",
        // },

        // {
        //   text: "ลูกค้าทั้งหมด",
        //   action: "/Custumers",
        //   icon: "Customer",
        // },
      ],
    };
  },

  mounted() {
    this.initializeSidebar()

    // ตรวจสอบหน้าจอ mobile หรือไม่

    this.isMobile = window.innerWidth <= 1025;

    // เพิ่ม event listener เพื่อตรวจสอบการปรับขนาดหน้าจอ
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    initializeSidebar() {
      const store = useStore()
      this.sidebarUnfoldable = computed(() => store.state.sidebarUnfoldable)
      this.sidebarVisible = computed(() => store.state.sidebarVisible)
    },

    toggleMenu() {
      this.toggleSidebar();
    },

    closeMenu() {
      this.toggleSidebar();
    },

    toggleSubmenu(menuItem) {
      menuItem.showSubmenu = !menuItem.showSubmenu;
    },



    handleResize() {
      this.isMobile = window.innerWidth <= 1150;
    },
    async edituser() {
      this.$router.push(`/profile/`);
    },


    handleMenuItemClick(menuItem) {
      if (menuItem.action) {
        // If the menu item has an action, navigate to the specified action
        this.$router.push(menuItem.action);

        // Close all submenu dropdown menus
        this.menuItems.forEach((item) => {
          if (item.submenu && item.showSubmenu) {
            item.showSubmenu = false;
          }
        });
      } else if (menuItem.submenu) {
        // If the menu item has a submenu, handle submenu behavior
        this.menuItems.forEach((item) => {
          // Close submenu dropdown menus of other menu items
          if (item !== menuItem && item.showSubmenu) {
            item.isActive = false; // Potentially causing the issue
            item.showSubmenu = false;
          }
        });
        // Toggle the submenu dropdown menu for the clicked menu item
        menuItem.showSubmenu = !menuItem.showSubmenu;
      }

      // Set the 'isActive' property to true for the clicked menu item
      this.menuItems.forEach((item) => {
        item.isActive = (item === menuItem);
      });
    },



    handleSubmenuItemCick(subItem) {
      if (subItem.path) {
        this.$router.push(subItem.path);
      }
      // ปิดเมนูดรอปดาวย่อยทุกเมนู
      this.menuItems.forEach((item) => {
        if (item.submenu && item.showSubmenu) {
          item.showSubmenu = false;
        }
      });
    },

    async logout() {
      const result = await Swal.fire({
        text: "คุณต้องการที่จะออกจากระบบหรือไม่?",
        icon: "warning",
        iconColor: "#8B2FC9",
        showCancelButton: true,
        confirmButtonColor: "#8B2FC9",
        cancelButtonColor: "#E85D40",
        confirmButtonText: "ยืนยันออกจากระบบ",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        // ทำการลบ Token ออกจาก localStorage
        localStorage.clear();
        this.$store.commit("setLoginDefault");

        // ทำการล็อกเอาท์ใน Store
        // window.location.reload();
        window.location.assign("/");


      }
    },

  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.menu-btn {
  position: absolute;
  left: 280px;
  top: 50px;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: #12372a;
  background-color: #f5cca0;
  border-radius: 0.5rem;
  z-index: 10;
}
</style>