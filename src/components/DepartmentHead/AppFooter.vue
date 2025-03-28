<template>
      <div 
    class="sticky bottom-0  w-full  p-3 px-8 z-50   lg:hidden  items-center justify-between   bg-[#124076] shadow-3xl text-white cursor-pointer hidden">
    <div class="flex flex-col items-center transition ease-in duration-200 hover:text-[#96EFFF] ">

      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
        <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
      </svg>
    </div>

    <div class="flex flex-col items-center transition ease-in duration-200 hover:text-[#96EFFF] ">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
    <div class="flex flex-col items-center  hover:text-[#96EFFF] ">
      <div
        class="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-[#5FBDFF] w-20 h-20 p-2 text-white transition ease-in duration-200 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 14 14">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M12.101 13.5v-2.833a2.573 2.573 0 0 0-2.573-2.573H7.294V3.918c0-.664-.539-1.202-1.202-1.202v0c-.664 0-1.203.538-1.203 1.202v5.474l-.4.075a1.715 1.715 0 0 0-1.096 2.659l.161.234l.784 1.14" />
            <path d="M2.597 4.932a3.611 3.611 0 1 1 7.034 0" />
          </g>
        </svg>

      </div>
    </div>

    <button class="flex flex-col items-center transition ease-in duration-200 hover:text-[#96EFFF] ">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
    
    <button @click="$store.commit('toggleSidebar')"
      class="flex flex-col items-center transition ease-in duration-200 hover:text-[#96EFFF] ">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z">
        </path>
      </svg>
    </button>
  </div>


</template>

<script>

export default {
  name: 'AppFooter',

  components: {
  },

  data() {
    return {
      isMobile: false,
    };
  },

  mounted() {
    // ตรวจสอบหน้าจอ mobile หรือไม่
    this.isMobile = window.innerWidth <= 912;
    // เพิ่ม event listener เพื่อตรวจสอบการปรับขนาดหน้าจอ
    window.addEventListener("resize", this.handleResize);
  },
  async created() { },
  methods: {

    handleResize() {
      this.isMobile = window.innerWidth <= 912;
    },





  },
};
</script>
