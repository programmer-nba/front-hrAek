<template>
  <!-- เมนูจอคอม -->
  <div>
    <div
      style="height: 100vh"
      class="w-72 lg:w-72 sticky top-0 overflow-y-auto bg-[#001B79] border-[#B4D4FF] border-r-2 shadow-lg rounded-br-3xl rounded-tr-3xl flex-col justify-between hidden xl:flex"
    >
      <div v-if="isSidebarDesktopOpen == true" class="">
        <div class="">
          <div class="h-10 w-full flex items-center"></div>

          <h1
            class="text-2xl text-center font-bold mb-4 cursor-pointer text-[#EEF5FF] duration-150"
          >
            DDSC
          </h1>

          <div class="flex items-center justify-center flex-shrink-0 pb-6">
            <img class="w-24 h-auto" src="../../assets/logo.png" />
          </div>

          <div
            class="hidden border-b border-dashed lg:block border-[#EFD99B]"
          ></div>

          <div class="flex items-center justify-between px-4 py-3 bg-[#B4D4FF]">
            <div class="flex items-center mr-5">
              <div class="mr-5">
                <div
                  class="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]"
                >
                  <svg
                    @click="edituser()"
                    class="shrink-0 text-[#102C57] inline-block"
                    width="32"
                    height="32"
                    viewBox="0 0 496 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M248 104c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96m0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48m0-240C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8m0 448c-49.7 0-95.1-18.3-130.1-48.4c14.9-23 40.4-38.6 69.6-39.5c20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5c-35 30.1-80.4 48.4-130.1 48.4m162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9c-10.2 0-26 9.6-57.6 9.6c-31.5 0-47.4-9.6-57.6-9.6c-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9"
                    />
                  </svg>
                </div>
              </div>
              <div class="mr-2">
                <div
                  class="text-[#102C57] transition-colors duration-200 ease-in-out text-sm font-medium text-secondary-inverse"
                >
                  {{ $store.getters.position }}
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

          <div
            class="hidden border-b border-dashed lg:block border-[#EFD99B]"
          ></div>

          <div
            class="flex-1 mt-2 px-4 space-y-3 overflow-hidden hover:overflow-auto"
          >
            <div v-for="menuItem in menuItems" :key="menuItem.text">
              <button
                @click="handleMenuItemClick(menuItem)"
                :class="{
                  'bg-[#F4E869] text-[#001B79]':
                    menuItem.showSubmenu || menuItem.isActive,
                  'hover:bg-[#F8DE22] hover:text-[#001B79]':
                    !menuItem.showSubmenu,
                  'bg-[#F4E869] text-[#001B79]': menuItem.isActive,
                  ' text-white ': !menuItem.isActive && !menuItem.showSubmenu,
                }"
                class="flex items-center w-full space-x-2 group hover:bg-[#F7FD04] hover:text-[#001B79] rounded-lg"
              >
                <span
                  :style="{
                    background: menuItem.showSubmenu ? '#F8DE22' : '',
                    color: menuItem.showSubmenu ? '#001B79' : '',
                  }"
                  class="p-3 group-hover:bg-[#FFF78A] items-center group-hover:text-[#001B79] rounded-lg"
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
              </button>

              <!--  submenu -->
              <div
                v-if="menuItem.submenu && menuItem.showSubmenu"
                class="mt-2 origin-top-right rounded-md shadow-lg"
              >
                <div class="px-2 py-2 bg-white rounded-md shadow">
                  <button
                    v-for="subItem in menuItem.submenu"
                    :key="subItem.text"
                    @click="handleSubmenuItemCick(subItem)"
                    class="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  >
                    {{ subItem.text }}
                  </button>
                </div>
              </div>
            </div>
            <br />
            <button
              @click="logout"
              class="w-full mt-10 bg-[#F8DE22] rounded-full py-2.5 text-[#001B79]"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isSidebarDesktopOpen || (isMobile && !isSidebarOpen)"
      class="fixed bottom-0 w-full p-5 px-8 z-50 xl:hidden flex items-center justify-between bg-[#124076] shadow-3xl text-white cursor-pointer"
    >
      <div
        class="flex flex-col items-center transition ease-in duration-200 hover:text-[#96EFFF]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
          <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
        </svg>
      </div>
      <div
        class="flex flex-col items-center transition ease-in duration-200 hover:text-[#96EFFF]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <div class="flex flex-col items-center hover:text-[#96EFFF]">
        <div
          class="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-[#5FBDFF] w-20 h-20 p-2 text-white transition ease-in duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 14 14"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12.101 13.5v-2.833a2.573 2.573 0 0 0-2.573-2.573H7.294V3.918c0-.664-.539-1.202-1.202-1.202v0c-.664 0-1.203.538-1.203 1.202v5.474l-.4.075a1.715 1.715 0 0 0-1.096 2.659l.161.234l.784 1.14"
              />
              <path d="M2.597 4.932a3.611 3.611 0 1 1 7.034 0" />
            </g>
          </svg>
        </div>
      </div>

      <button
        class="flex flex-col items-center transition ease-in duration-200 hover:text-[#96EFFF]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          ></path>
        </svg>
      </button>
      <button
        @click="toggleMenu"
        class="flex flex-col items-center transition ease-in duration-200 hover:text-[#96EFFF]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
          ></path>
        </svg>
      </button>
    </div>

    <!-- <nav v-if="isSidebarDesktopOpen || (isMobile && !isSidebarOpen)"
            class="fixed inset-x-0 z-20 bottom-0 xl:hidden flex flex-row-reverse items-center justify-between px-4 py-2 bg-[#0D1282] border-t border-indigo-100  shadow-t rounded-t-3xl">

            <button @click="toggleMenu" class="p-2 transition-colors rounded-lg shadow-md bg-[#ECF8F9] hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring focus:ring-indigo-600
   focus:ring-offset-white focus:ring-offset-2">
                <span class="sr-only">Toggle sidebar</span>
                <svg aria-hidden="true" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </button>

            <div class="relative flex items-center flex-shrink-0 p-2" x-data="{ isOpen: false }">
                <img class="w-16 h-auto" src="../../assets/logo.png" />
            </div>
        </nav> -->

    <!-- mobile -->
    <transition>
      <div
        v-if="isMobile"
        :class="{ hidden: !isSidebarOpen }"
        style="height: 100vh"
        class="w-64 fixed inset-y-0 z-10 bg-[#0A1D56] border-[#40679E] flex-shrink-0 border-r-2 shadow-lg left-0 flex-col rounded-br-3xl rounded-tr-3xl overflow-y-auto"
      >
        <button
          v-if="isSidebarOpen && isMobile"
          aria-label="Close sidebar"
          class="h-10 w-10 z-10 bg-[#EEF5FF] absolute items-center rounded-tr rounded-br justify-center cursor-pointer font-bold"
          style="top: 0; right: 0"
          @click="closeMenu"
        >
          <span class="flex justify-end pr-3 text-[#11009E]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 42 42"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="m21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0l10.358-10.604z"
              />
            </svg>
          </span>
        </button>

        <div class="">
          <div class="flex items-center justify-center flex-shrink-0 py-10">
            <img class="w-24 h-auto" src="../../assets/logo.png" />
          </div>
          <!---->
          <div class="flex items-center justify-between px-4 py-3 bg-[#B4D4FF]">
            <div class="flex items-center">
              <div class="mr-5">
                <div
                  class="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]"
                >
                  <svg
                    @click="edituser()"
                    class="shrink-0 text-[#102C57] inline-block"
                    width="32"
                    height="32"
                    viewBox="0 0 496 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M248 104c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96m0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48m0-240C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8m0 448c-49.7 0-95.1-18.3-130.1-48.4c14.9-23 40.4-38.6 69.6-39.5c20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5c-35 30.1-80.4 48.4-130.1 48.4m162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9c-10.2 0-26 9.6-57.6 9.6c-31.5 0-47.4-9.6-57.6-9.6c-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9"
                    />
                  </svg>
                </div>
              </div>
              <div class="mr-2">
                <div
                  class="hover:text-[#102C57] text-[#102C57] transition-colors duration-200 ease-in-out text-sm font-medium text-secondary-inverse"
                >
                  {{ $store.getters.position }}
                </div>

                <span class="text-[#102C57] font-medium block text-[0.85rem]"
                  >{{
                    $store.getters.role === "head_department"
                      ? "หัวหน้าแผนก"
                      : $store.getters.role
                  }}
                </span>
              </div>
            </div>
            <button
              @click="edituser()"
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
          <!---->
          <div v-for="menuItem in menuItems" :key="menuItem.text">
            <button
              @click="handleMenuItemClick(menuItem)"
              :class="{
                'bg-[#F4E869] text-[#001B79]': menuItem.showSubmenu,
                'hover:bg-[#F8DE22] hover:text-[#001B79]':
                  !menuItem.showSubmenu,
              }"
              class="flex items-center w-full space-x-2 group hover:bg-[#F7FD04] hover:text-[#001B79] text-[#EEF5FF] rounded-lg"
            >
              <span
                :style="{
                  background: menuItem.showSubmenu ? '#F8DE22' : '',
                  color: menuItem.showSubmenu ? '#001B79' : '',
                }"
                class="p-3 group-hover:bg-[#FFF78A] items-center group-hover:text-[#001B79] rounded-lg"
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
            </button>

            <!-- Additional submenu for specific items -->
            <div
              v-if="menuItem.submenu && menuItem.showSubmenu"
              class="mt-2 origin-top-right rounded-md shadow-lg"
            >
              <div class="px-2 py-2 bg-white rounded-md shadow">
                <button
                  v-for="subItem in menuItem.submenu"
                  :key="subItem.text"
                  @click="handleSubmenuItemCick(subItem)"
                  class="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                >
                  {{ subItem.text }}
                </button>
              </div>
            </div>
          </div>

          <br />
          <div>
            <button
              @click="logout"
              class="w-full mt-10 bg-[#F8DE22] rounded-full py-2.5 text-[#001B79]"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Swal from "sweetalert2";
// import Icon from "../Amin_Icon.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    // Icon,
  },

  data() {
    return {
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
          text: "เวลาเข้างาน",
          action: "/TimeToWork",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
        },
        {
          text: "พนักงาน",
          submenu: [{ text: "พนักงานทั้งหมด", path: "/Employee" }],
          icon: "<i class='pi pi-users' style='font-size: 1.4rem'></i>",
        },
        {
          text: "ยื่นเอกสาร",
          action: "/SubmitDocuments",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="m18.18 8.04l.463-.464a1.966 1.966 0 1 1 2.781 2.78l-.463.464M18.18 8.04s.058.984.927 1.853s1.854.927 1.854.927M18.18 8.04l-4.26 4.26c-.29.288-.434.433-.558.592c-.146.188-.271.39-.374.606c-.087.182-.151.375-.28.762l-.413 1.24l-.134.401m8.8-5.081l-4.26 4.26c-.29.29-.434.434-.593.558c-.188.146-.39.271-.606.374c-.182.087-.375.151-.762.28l-1.24.413l-.401.134m0 0l-.401.134a.53.53 0 0 1-.67-.67l.133-.402m.938.938l-.938-.938"/>
        <path stroke-linecap="round" d="M8 13h2.5M8 9h6.5M8 17h1.5M19.828 3.172C18.657 2 16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172c.944-.943 1.127-2.348 1.163-4.828"/>
    </g>
</svg>`,
        },
        {
          text: "บันทึกข้อความ",
          submenu: [
            { text: "เพิ่มบันทึกข้อความ", path: "/Record/AddRecord" },
            { text: "บันทึกข้อความทั้งหมด", path: "/Record" },
          ],
          icon: "<i class='pi pi-users' style='font-size: 1.4rem'></i>",
        },

        {
          text: "คำขอบันทึกข้อความ",
          action: "/Request/Record",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>`,
        },

        {
          text: "สัญญา",
          action: "/Contract",
          icon: "<i class='pi pi-home' style='font-size: 1.4rem'></i>",
        },

        {
          text: "โปรไฟล์",
          action: "/Profile",
          icon: "<i class='pi pi-home' style='font-size: 1.4rem'></i>",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["isSidebarOpen"]),
  },
  mounted() {
    // ตรวจสอบหน้าจอ mobile หรือไม่
    this.isMobile = window.innerWidth <= 1150;
    // เพิ่ม event listener เพื่อตรวจสอบการปรับขนาดหน้าจอ
    window.addEventListener("resize", this.handleResize);
  },
  async created() {},
  methods: {
    ...mapActions(["toggleSidebar"]),
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
