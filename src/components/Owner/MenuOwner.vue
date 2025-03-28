<template>
  <CSidebar
    class="bg-gradient-to-b from-green-300 to-green-800 p-6"
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarHeader class="flex items-center justify-center">
      <div class="flex items-center justify-center flex-shrink-0 pb-0 pt-0">
        <img class="w-[15%] h-auto" src="../../assets/GPlusS-logo4.png" />
      </div>
      <CCloseButton
        class="d-lg-none"
        dark
        @click="$store.commit('toggleSidebar')"/>
    </CSidebarHeader>

    <div class="flex items-center justify-between px-4 py-3 green-800">
      <div class="flex items-center mr-5">
        <div class="mr-5">
          <div
            class="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]"
          >
            <img
              :src="
                ME.image
                  ? 'https://drive.google.com/thumbnail?id=' + ME.image
                  : ''
              "
              v-if="ME.image"
              class="w-16 h-16 object-cover rounded-full"
            />
            <span
              v-else
              class="w-16 h-16 flex items-center text-sm justify-center text-gray-400 bg-gray-200 rounded-full"
              >ไม่มีรูปภาพ</span
            >
          </div>
        </div>
        <div class="mr-2">
          <!-- {{ console.log('fff',$store.getters.role) }} -->
          <div
            class="text-[#102C57] transition-colors duration-200 ease-in-out text-sm font-medium text-secondary-inverse"
          >
            ผู้บริหาร {{ ME.first_name }}
          </div>

          <span class="text-[#102C57] font-medium block text-[0.85rem]">
            {{
              $store.getters.role === "head_department"
                ? "หัวหน้าแผนก"
                : $store.getters.role
            }}
          </span>
        </div>
      </div>
      <button
        class="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0"
        title="ตั้งค่าโปรไฟล์"
      >
        <span
          class="leading-none transition-colors duration-200 ease-in-out peer group-hover:text-primary text-secondary-dark"
        >
          <svg
            class="text-[#102C57]"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </span>
      </button>
    </div>
    <!-- <AppSidebarNav /> -->

    <div class="flex-1 mt-2 px-2 space-y-2 overflow-y hover:overflow-auto">
      <div v-for="menuItem in menuItems" :key="menuItem.text">
        <button
          @click="handleMenuItemClick(menuItem)"
          :class="{
            'bg-[#F4E869] text-[#001B79]':
              menuItem.showSubmenu || menuItem.isActive,
            'hover:bg-[#F8DE22] hover:text-[#001B79]': !menuItem.showSubmenu,
            'bg-[#F4E869] text-[#001B79]': menuItem.isActive,
            ' text-white ': !menuItem.isActive && !menuItem.showSubmenu,
          }"
          class="flex items-center w-full space-x-2 group hover:bg-[#F7FD04] hover:text-[#001B79] rounded-lg relative"
        >
          <span
            :style="{
              background: menuItem.showSubmenu ? '#F8DE22' : '',
              color: menuItem.showSubmenu ? '#001B79' : '',
            }"
            class="py-2.5 px-2 group-hover:bg-[#FFF78A] items-center group-hover:text-[#001B79] rounded-lg"
          >
            <!-- svg -->
            <div v-html="menuItem.icon"></div>
          </span>

          <span
            :class="{ 'text-[#001B79]': menuItem.showSubmenu }"
            class="font-medium text-base"
            >{{ menuItem.text }}</span
          >

          <span class="ml-10">
            <svg
              v-if="menuItem.submenu"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 20 20"
              :class="{
                'rotate-180': menuItem.showSubmenu,
                'rotate-0': !menuItem.showSubmenu,
              }"
              class="inline mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <div>
            <div
              v-if="
                Apporvedocuments.length > 0 && menuItem.text === 'บันทึกทั้งหมด'
              "
              class="relative inline-flex items-center justify-center"
            >
              <span class="relative flex h-6 w-6 left-6">
                <!-- สร้างเอฟเฟกต์ Ping -->
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-7"
                ></span>

                <!-- วงกลมแสดงจำนวนพร้อมพื้นหลังสีแดง -->
                <span
                  class="relative inline-flex items-center justify-center rounded-full h-6 w-6 bg-red-500 text-white font-semibold text-xs"
                >
                  {{ Apporvedocuments.length }}
                </span>
              </span>
            </div>
          </div>
        </button>

        <!--  submenu -->
        <div
          v-if="menuItem.submenu && menuItem.showSubmenu"
          class="mt-2 origin-top-right rounded-md shadow-lg"
        >
          <div class="px-2 py-2 bg-white rounded-md shadow rela">
            <button
              v-for="subItem in menuItem.submenu"
              :key="subItem.text"
              @click="handleSubmenuItemCick(subItem)"
              class="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline relative"
            >
              {{ subItem.text }}
              <div
                v-if="
                  Apporvedocuments.length > 0 &&
                  subItem.text === 'การอนุมัติเอกสาร'
                "
                class="absolute top-0 right-0 bottom-0 flex items-center"
              >
                <div
                  class="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
                >
                  <!-- Displaying the text "การอนุมัติเอกสาร" -->
                  {{ Apporvedocuments.length }}
                </div>
              </div>
              <div
                v-if="
                  documents.length > 0 &&
                  subItem.text === 'บันทึกข้อความทั้งหมด'
                "
                class="absolute top-0 right-0 bottom-0 flex items-center"
              >
                <div
                  class="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
                >
                  <!-- Displaying the text "การอนุมัติเอกสาร" -->
                  {{ documents.length }}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <br />
      <button
        @click="logout"
        class="w-full mt-10 bg-green-500 rounded-full py-2.5 text-[#010101]"
      >
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
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
// import Icon from "../Amin_Icon.vue";

export default {
  components: {
    // Icon,
  },

  data() {
    return {
      ME: {}, // Initialize ME as an empty object
      isSidebarDesktopOpen: true,
      isMobile: false,
      isSubmenuOpen: false,
      selectedMenuItem: null,
      menuItems: [
        {
          text: "หน้าแรก",
          action: "/",
          icon: "<i class='pi pi-home' style='font-size: 1.4rem'></i>",
        },
        {
          text: "พนักงาน",
          submenu: [
            { text: "เพิ่มข้อมูลพนักงาน", path: "/addemployee" },
            // { text: "ตั้งค่าพนักงาน", path: "/setting-employee" },
            { text: "ประวัติลงเวลาพนักงาน", path: "/Employee_Time" },
          ],
          icon: "<i class='pi pi-users' style='font-size: 1.4rem'></i>",
        },
        
        // {
        //   text: "บันทึกทั้งหมด",
        //   submenu: [
        //     { text: "การอนุมัติเอกสาร", path: "/Record/ApproveRecord" },
        //   ],
        //   icon: "<i class='pi pi-book' style='font-size: 1.4rem'></i>",
        // },
        // {
        //   text: "โปรไฟล์",
        //   action: "/Profile/Profile",
        //   icon: "<i class='pi pi-user' style='font-size: 1.4rem'></i>",
        // },
        // {
        //   text: "ปฏิทินนัดหมาย",
        //   action: "/CalendarHome",
        //   icon: "<i class='pi pi-calendar' style='font-size: 1.4rem'></i>",
        // },
        // {
        //   text: "รายการอีเว้นท์",
        //   action: "/Event",
        //   icon: "<i class='pi pi-calendar-plus' style='font-size: 1.4rem'></i>",
        // },
        {
          text: "รับงาน",
          action:"/Project",
          // submenu: [
          //   { text: "โปรเจคทั้งหมด", path: "/Project" },
          //    { text: "ประเภทโปรเจค", path: "/ProjectType" }, 
          // ],
          icon: "<i class='pi pi-box' style='font-size: 1.4rem'></i>",
        },
        {
           text: "ออกบิล",
           action: "/SendBill",
          icon: "<i class='pi pi-book' style='font-size: 1.4rem'></i>",
         },
        // {
        //   text: "สัญญา (ทนาย)",
        //   action: "/home/lawyer",
        //   icon: "<i class='pi pi-file' style='font-size: 1.4rem'></i>",
        // },
        // {
        //   text: "อนุมัติ",
        //   submenu: [
        //     { text: "อนุมัติ partner", path: "/partner" },
        //     { text: "อนุมัติ ฝากขายสินค้า", path: "/emarket/approve" },
        //     { text: "อนุมัติ ร้านค้าpartner", path: "/shoppartner/approve" },
        //     {
        //       text: "อนุมัติ one stop service",
        //       path: "/onestopservice/approve",
        //     },
        //     {
        //       text: "อนุมัติ one stop shop",
        //       path: "/onestopshop/approve",
        //     },
        //     // { text: "ประเภทโปรเจค", path: "/ProjectType" },
        //   ],
        //   icon: "<i class='pi pi-book' style='font-size: 1.4rem'></i>",
        // },
        // {
        //   text: "ข้อมูล",
        //   submenu: [
        //     { text: "ข้อมูลฝากขายสินค้า", path: "/emarket/product/" },
        //     { text: "ข้อมูลร้านค้า partner", path: "/shoppartner/shop/" },

        //     { text: "ข้อมูล one stop service", path: "/onestopservice/data/" },
        //   ],
        //   icon: "<i class='pi pi-book' style='font-size: 1.4rem'></i>",
        // },
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
      sidebarUnfoldable: null,
      sidebarVisible: null,
      documents: [],
      Apporvedocuments: [],
    };
  },

  mounted() {
    this.initializeSidebar();
    this.fetchDocument();
    this.fetchDataApporveDocumemt();
    // this.fetchME();

    // ตรวจสอบหน้าจอ mobile หรือไม่
    this.isMobile = window.innerWidth <= 1150;
    // เพิ่ม event listener เพื่อตรวจสอบการปรับขนาดหน้าจอ
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    async fetchME() {
      try {
        // console.log(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        
        this.ME = response.data.data;
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
    initializeSidebar() {
      const store = useStore();
      this.sidebarUnfoldable = computed(() => store.state.sidebarUnfoldable);
      this.sidebarVisible = computed(() => store.state.sidebarVisible);
    },
    async fetchDocument() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/byMe`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.documents = response.data.data.filter((document) => document._id);
        this.documents.reverse();

        console.log("จำนวนเอกสาร:", this.documents.length); // การตรวจสอบใน console
      } catch (error) {
        console.error("Error fetching documents:", error); // แจ้งข้อผิดพลาดถ้ามี
      }
    },
    async fetchDataApporveDocumemt() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/document/getAll/`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.Apporvedocuments = response.data.data.filter(
          (document) => document.status_document === "รอผู้บริหารอนุมัติ"
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
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
        item.isActive = item === menuItem;
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
