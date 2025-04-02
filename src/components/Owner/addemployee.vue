<template>
  <div>
    <Sidebar v-model:visible="Detailsvisible" header="ข้อมูลเพิ่มเติม" class="p-sidebar-lg" position="right"
      style="width: 850px">
      <div class="mb-6">
        <!-- Code block starts -->
        <div class="container flex justify-center mx-auto pt-2">
          <div>
            <h1 class="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold sm:w-6/6 w-6/6 mx-auto">
              รายละเอียดพนักงาน
            </h1>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-pink-300 to-indigo-300 rounded">
        <div class="grid grid-cols-12 gap-0">

          <div class="col-span-12 p-6">
            <div class="grid grid-cols-2 ">
              <div class="col-span-12 ">
                <div class="bg-pink-600  p-3 text-white rounded-xl shadow-xl flex items-center">
                  {{ detailEmployee.employee_number }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 p-6">
            <div class="grid grid-cols-2 space-y-4">
              <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xxl:col-span-6">
                <div class="p-4 space-y-3 border-2 bg-white border-blue-400 rounded-xl">
                  <div class="flex flex-col justify-center items-center">
                    <div class="w-32 h-32 rounded-full bg-gray-300 border-2 border-white mt-2">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxhAxJ4D7MOeTTj6kR9PBeZonW5HM7giKjTbEmR-HMBwf3G1VqGnlwpO1kWrdyIZu8_U&usqp=CAU"
                        class="rounded-full w-auto" />
                    </div>
                    <p class="font-semibold text-black text-xl mt-1">
                      {{ detailEmployee.name_title }}
                      {{ detailEmployee.first_name }}
                      {{ detailEmployee.last_name }}
                    </p>
                    <p class="font-semibold text-base text-black">
                      ชื่อเล่น: {{ detailEmployee.nick_name }}
                    </p>

                    <div class="px-6 mt-2">
                      <div class="flex items-center flex-wrap">
                        <div class="flex items-center justify-center text-white w-16 h-16 mb-4 bg-[#5356FF] rounded">
                          ตำแหน่ง
                        </div>
                        <span class="flex flex-col flex-grow pl-4">
                          <span class="font-bold text-lg text-black -mt-4">{{ detailEmployee.position }}
                          </span>
                          <span class="text-sm text-black uppercase font-bold">{{ detailEmployee.role }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xxl:col-span-5">
                <div class="p-4 space-y-3 border-2 bg-white border-blue-400 rounded-xl ">
                  <span class="inline-block text-blue-500 ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                  </span>

                  <h1 class="text-black font-bold tracking-wider">
                    สิทธิ์การลา
                  </h1>
                  <div class="mt-6">
                    <div class="flex justify-between items-center">
                      <div class="flex justify-items-start gap-3 items-stretch">
                        <div>
                          <h1 class="font-bold text-black">ลาป่วย</h1>
                          <p class="text-sm text-black">
                            คงเหลือ {{ detailEmployee.leave?.sick_leave }} วัน
                          </p>
                        </div>
                      </div>
                      <div>
                        <button type="text" placeholder="cvc"
                          class="py-2 border-2 border-[#000446] text-[#0C359E] outline-none rounded-sm px-4 focus:border-blue-600">
                          5
                        </button>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <div class="flex justify-items-start gap-3 items-stretch">
                        <div>
                          <h1 class="font-bold text-black">ลากิจ</h1>
                          <p class="text-sm text-black">
                            คงเหลือ
                            {{ detailEmployee.leave?.business_leave }} วัน
                          </p>
                        </div>
                      </div>
                      <div>
                        <button type="text" placeholder="cvc"
                          class="py-2 border-2 border-[#000446] text-[#0C359E] outline-none rounded-sm px-4 focus:border-blue-600">
                          5
                        </button>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <div class="flex justify-items-start gap-3 items-stretch">
                        <div>
                          <h1 class="font-bold text-black">ลาบวช</h1>
                          <p class="text-sm text-black">
                            คงเหลือ
                            {{ detailEmployee.leave?.ordination_leave }} วัน
                          </p>
                        </div>
                      </div>
                      <div>
                        <button type="text" placeholder="cvc"
                          class="py-2 border-2 border-[#000446] text-[#0C359E] outline-none rounded-sm px-4 focus:border-blue-600">
                          5
                        </button>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <div class="flex justify-items-start gap-3 items-stretch">
                        <div>
                          <h1 class="font-bold text-black">ลาคลอด</h1>
                          <p class="text-sm text-black">
                            คงเหลือ
                            {{ detailEmployee.leave?.maternity_leave }} วัน
                          </p>
                        </div>
                      </div>
                      <div>
                        <button type="text" placeholder="cvc"
                          class="py-2 border-2 border-[#000446] text-[#0C359E] outline-none rounded-sm px-4 focus:border-blue-600">
                          5
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div class="grid grid-cols-1 space-y-4 mt-4">
              <div
                class="p-8 space-y-3 border-2 bg-white border-blue-400 rounded-xl hover:shadow-2xl transition duration-500">
                <div class="bg-white rounded-2xl py-2">
                  <div
                    class="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
                    LOGO
                  </div>
                  <div class="mt-4">
                    <h1 class="text-lg text-black font-semibold hover:underline cursor-pointer">
                      ข้อมูลติดต่อ
                    </h1>
                    <p class="mt-4 text-md text-black">
                      <template v-if="
                        detailEmployee.address ||
                        detailEmployee.subdistrict ||
                        detailEmployee.district ||
                        detailEmployee.province ||
                        detailEmployee.postcode
                      ">
                        {{ detailEmployee.address || "-" }} ตำบล
                        {{ detailEmployee.subdistrict || "-" }} อำเภอ
                        {{ detailEmployee.district || "-" }} จังหวัด
                        {{ detailEmployee.province || "-" }}
                        {{ detailEmployee.postcode || "-" }}
                      </template>
                      <template v-else> - </template>
                    </p>

                    <div class="flex flex-wrap justify-between items-center mobileL:flex-nowrap">
                      <div class="flex space-x-2 text-black text-sm">
                        <!-- svg  -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                          stroke="#453F78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                          </path>
                        </svg>
                        <p>
                          {{ detailEmployee.tel ? detailEmployee.tel : "-" }}
                        </p>
                      </div>
                      <div class="flex space-x-2 text-black text-sm mobileL:my-3">
                        <!-- svg  -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                          stroke="#453F78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <p>
                          {{
                            detailEmployee.email ? detailEmployee.email : "-"
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-8 space-y-3 border-2 bg-white border-blue-400 rounded-xl">
                <span class="inline-block text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </span>
                <div class="mt-8">
                  <p class="text-xl font-semibold my-2">ข้อมูลส่วนตัว</p>
                  <div class="flex space-x-2 text-black text-sm">
                    <!-- svg  -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="#453F78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                      <circle cx="12" cy="10" r="3" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <p>
                      {{ detailEmployee.name_title }}
                      {{ detailEmployee.first_name }}
                      {{ detailEmployee.last_name }}
                    </p>
                  </div>
                  <div class="flex space-x-2 text-black text-sm">
                    <!-- svg  -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="#453F78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M7 15h0M2 9.5h20" />
                    </svg>
                    <p>{{ detailEmployee.iden_number }}</p>
                  </div>
                  <div class="flex space-x-2 text-black text-sm">
                    <!-- svg  -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <g>
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M8 6v3.999h3V6h2v3.999h3V6h2v3.999L19 10a3 3 0 0 1 2.995 2.824L22 13v1c0 1.014-.377 1.94-.999 2.645L21 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.36a4.025 4.025 0 0 1-.972-2.182l-.022-.253L2 14v-1a3 3 0 0 1 2.824-2.995L5 10l1-.001V6h2zm11 6H5a1 1 0 0 0-.993.883L4 13v.971l.003.147A2 2 0 0 0 6 16a1.999 1.999 0 0 0 1.98-1.7l.015-.153.005-.176c.036-1.248 1.827-1.293 1.989-.134l.01.134.004.147a2 2 0 0 0 3.992.031l.012-.282c.124-1.156 1.862-1.156 1.986 0l.012.282a2 2 0 0 0 3.99 0L20 14v-1a1 1 0 0 0-.883-.993L19 12zM7 1c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 0 1-2.898-.776C5.85 2.002 7 2.5 7 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 1 1-2.898-.776C10.85 2.002 12 2.5 12 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 1 1-2.898-.776C15.85 2.002 17 2.5 17 1z" />
                      </g>
                    </svg>
                    <p>{{ detailEmployee.birthday }}</p>
                  </div>
                  <div class="border-t-2"></div>

                  <div class="flex justify-between text-black">
                    <div class="my-2">
                      <p class="font-semibold text-base mb-2">อายุ</p>
                      <div class="flex space-x-2">
                        <p>{{ detailEmployee.age }} ปี</p>
                      </div>
                    </div>
                    <div class="my-2">
                      <p class="font-semibold text-base mb-2">เข้าร่วม</p>
                      <p>{{ formatThaiDateTime(detailEmployee.createdAt) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
    <Dialog v-model:visible="showAddEmployeeForm" :modal="true" header="เพิ่มข้อมูลพนักงาน">
      <div class="grid grid-cols-1">
        <div class="grid grid-cols-1 gap-1 mobileL:grid-cols-3">
          <div class="mb-4">
            <label for="role" class="block text-sm font-bold mb-2">คำนำหน้า</label>
            <Dropdown v-model="name_title" :options="titleOptions" optionLabel="label" optionValue="value"
              placeholder="คำนำหน้า"
              class="text-xs w-full text-gray-700 bg-gray-200 focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
          </div>
          <div class="mb-4">
            <label for="first_name" class="block text-sm font-bold mb-2">ชื่อจริง</label>
            <input v-model="first_name" type="text" id="first_name" placeholder="กรุณากรอกชื่อจริง"
              class="form-input w-full h-10 border-2 pl-3 rounded-xl border-gray-700" />
          </div>
          <div class="mb-4">
            <label for="last_name" class="block text-sm font-bold mb-2">นามสกุล</label>
            <input v-model="last_name" type="text" id="last_name" placeholder="กรุณากรอกนามสกุล"
              class="form-input w-full pl-3 h-10 border-2 rounded-xl border-gray-700 " />
          </div>
        </div>

        <div class="mb-4">
          <label for="iden_number" class="block text-sm font-bold mb-2">เลขประจำตัวประชาชน</label>
          <input v-model="iden_number" type="text" id="iden_number"
            class="form-input h-10 border-2 rounded-xl border-gray-700 pl-3 w-full"
            oninput="javascript: if (this.value.length > 13) this.value = this.value.slice(0, 13);"
            placeholder="13 หลัก" />
        </div>
        <div class="flex flex-wrap items-center justify-start gap-3">

          <div class="mb-2 w-full">
            <label for="role" class="block text-sm font-bold">เลือกตำแหน่ง</label>
            <Dropdown v-model="selectedSubPosition" :options="subForPosition" filter placeholder="เลือกตำแหน่ง"
              class="no-rounded w-full mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner">
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div ref="inputField" placeholder="Focus on me">
                    {{ slotProps.value.value }}
                  </div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex gap-2 items-center">
                  <div>{{ slotProps.option.value }}</div>
                </div>
              </template>
            </Dropdown>
          </div>

        </div>
      </div>
      <div class="flex justify-center mt-6">
        <button @click="saveData"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 w-full mobileL:w-auto">
          เพิ่มข้อมูลพนักงาน
        </button>
      </div>
    </Dialog>

    <Dialog v-model:visible="showEditEmployeePopup" :modal="true" class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2"
      header="แก้ไขข้อมูลพนักงาน">
      <form @submit.prevent="updateEmployee">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="name_title" class="block text-sm font-bold mb-2">คำนำหน้า</label>
            <select v-model="editedEmployee.name_title" id="name_title"
              class="form-select w-full h-10 border-2 rounded-xl border-gray-700">
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="first_name" class="block text-sm font-bold mb-2">
              ชื่อ
            </label>
            <input v-model="editedEmployee.first_name" type="text" id="first_name"
              class="form-input w-full h-10 border-2 rounded-xl border-gray-700" />
          </div>
          <div class="mb-4">
            <label for="last_name" class="block text-sm font-bold mb-2">นามสกุล</label>
            <input v-model="editedEmployee.last_name" type="text" id="last_name"
              class="form-input w-full h-10 border-2 rounded-xl border-gray-700" />
          </div>

          <div class="mb-4">
            <label for="iden_number" class="block text-sm font-bold mb-2">เลขประจำตัวประชาชน</label>
            <input v-model="editedEmployee.iden_number" type="text" id="iden_number"
              class="form-input w-full h-10 border-2 rounded-xl border-gray-700" />
          </div>

          <!-- 
          <div class="mb-4">
            <label for="role" class="block text-sm font-bold mb-2">Role</label>
            <select
              v-model="editedEmployee.role"
              id="role"
              class="form-select w-full h-10 border-2 rounded-xl border-gray-700"
            >
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
              <option value="head_department">Head Department</option>
            </select>
          </div> -->

          <div class="mb-4" v-if="
            editedEmployee.role === 'head_department' ||
            editedEmployee.role === 'employee'
          ">

            <label for="position" class="block text-sm font-bold mb-2">Position</label>
            <select v-model="editedEmployee.position" id="position"
              class="form-select w-full h-10 border-2 rounded-xl border-gray-700">
              <option value="programmer">Programmer</option>
              <option value="graphic">Graphic Designer</option>
              <option value="accounting">Accountant</option>
              <option value="lawyer">lawyer</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            อัปเดต
          </button>
        </div>
      </form>
    </Dialog>

    <div class="bg-cyan-200 h-full">
      <div class="">
        <h1 class="text-5xl font-bold mb-4 px-14">ข้อมูลพนักงาน</h1>
        <div class="grid grid-cols-1 gap-2 px-14 ">
          <div class="flex items-center">
            <button @click="showAddEmployeeForm = true"
              class="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-2 rounded mb-6">
              เพิ่มข้อมูลพนักงาน
            </button>
          </div>

          <div class="">
            <div
              class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div class="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input v-model="searchKeyword" class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text" id="search" placeholder="ค้นหาตามชื่อ" />
            </div>
          </div>



          <form class=" items-center">
            <label for="roleFilter" class="text-gray-700 font-semibold mr-2">ตำแหน่ง</label>
            <select v-model="selectedRole" @change="filterByRole" id="roleFilter"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="">ทั้งหมด</option>
              <option value="programmer">Programmer</option>
              <option value="graphic">Graphic Designer</option>
              <option value="accounting">Accountant</option>
              <option value="lawyer">Lawyer</option>
              <option value="manager">Manager</option>
              <option value="owner">Owner</option>
              <option value="hr">HR</option>
            </select>
          </form>

          <div class="flex md:justify-start justify-center">
            <div
              class="inline-flex overflow-hidden bg-white border border-[#7BD3EA] divide-x rounded-lg rtl:flex-row-reverse">
              <button @click="showItemsByPosition('grid')" :class="{
                'bg-[#1D24CA] text-white hover:bg-[#0F2167]':
                  activeStatus === 'grid',
              }"
                class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200 sm:text-sm hover:bg-[#B4D4FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M3 6.75c0-1.768 0-2.652.55-3.2C4.097 3 4.981 3 6.75 3c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55C3 9.403 3 8.519 3 6.75Zm0 10.507c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55C3 19.91 3 19.026 3 17.258ZM13.5 6.75c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55c-.55-.548-.55-1.432-.55-3.2Zm0 10.507c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55c-.55-.548-.55-1.432-.55-3.2Z" />
                </svg>
              </button>

              <button @click="showItemsByPosition('stack')" :class="{
                'bg-[#1D24CA] text-white hover:bg-[#0F2167]':
                  activeStatus === 'stack',
              }"
                class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200 sm:text-sm hover:bg-[#B4D4FF] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm2 1v14h16V5zm2 2h2v2H6zm2 4H6v2h2zm-2 4h2v2H6zm12-8h-8v2h8zm-8 8h8v2h-8zm8-4h-8v2h8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center rounded  w-auto min-h-screen mt-4 " v-if="activeStatus === 'grid'">
          <div
            class=" flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-full sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl ">
            <!-- Content -->
            <div class="flex-1 px-2 sm:px-0">
              <div class="mb-10 sm:mb-0 mt-10 grid gap-10 xxl:grid-cols-3 grid-cols-1 xl:grid-cols-2">
                <div v-for="(employee, index) in mergedEmployees" :key="index"
                  class="bg-white py-10 sm:py-4 px-4 space-y-2 mobileL:w-96 rounded-md hover:bg-[#CAEDFF] hover:smooth-hover">
                  <div class="flex flex-col items-center">
                    <img :src="employee.image
                        ? 'https://drive.google.com/thumbnail?id=' +
                        employee.image
                        : ''
                      " v-if="employee.image" class="w-28 h-28 object-cover rounded-full" />
                    <span v-else
                      class="w-28 h-28 flex items-center justify-center text-gray-400 bg-gray-200 rounded-full">ไม่มีรูปภาพ</span>
                    <h4 class="text-[#0802A3] text-lg font-bold capitalize text-center">
                      {{ employee.name_title }} {{ employee.first_name }}
                      {{ employee.last_name }}
                    </h4>
                    <p class="text-[#0802A3] text-sm">
                      {{ employee.employee_number }}
                    </p>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="mr-auto space-y-1">
                      <p class="font-medium text-sm text-gray-900 leading-none">
                        {{ employee.role }}
                      </p>
                      <p class="font-normal text-sm text-gray-500 leading-none">
                        {{ employee.position }}
                      </p>
                    </div>
                    <div
                      class="inline-flex px-6 leading-6 py-2 rounded-md bg-indigo-50 hover:bg-indigo-50/80 transition-colors duration-200 text-indigo-500 font-medium text-sm">
                      {{ employee.nick_name }}
                    </div>
                  </div>

                  <div class="grid mobileL:flex justify-between font-semibold text-sm pt-2">
                    <p class="text-[#0802A3] flex  items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M15.6 14.521c-2.395 2.521-8.504-3.533-6.1-6.063c1.468-1.545-.19-3.31-1.108-4.609c-1.723-2.435-5.504.927-5.39 3.066c.363 6.746 7.66 14.74 14.726 14.042c2.21-.218 4.75-4.21 2.214-5.669c-1.267-.73-3.008-2.17-4.342-.767ZM14 3a7 7 0 0 1 7 7m-7-3a3 3 0 0 1 3 3" />
                      </svg>
                      {{ employee.tel }}
                    </p>
                    <p class="text-[#0802A3] flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="20" height="20" viewBox="0 0 14 14">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                          <path
                            d="M1.358 2.266h11.284s.858 0 .858.858v7.752s0 .858-.858.858H1.358s-.858 0-.858-.858V3.124s0-.858.858-.858M9.36 5.88h1.986M9.36 7.849h1.986" />
                          <path d="M3.507 6.208a1.64 1.64 0 1 0 3.282 0a1.64 1.64 0 0 0-3.282 0" />
                          <path
                            d="M2.654 9.473a3.17 3.17 0 0 1 1.064-1.19a2.62 2.62 0 0 1 1.43-.434c.502 0 .994.15 1.431.434a3.17 3.17 0 0 1 1.064 1.19" />
                        </g>
                      </svg>
                      {{ employee.iden_number }}
                    </p>
                  </div>

                  <button @click.prevent="viewDetails(employee)"
                    class="text-green-500 hover:text-green-700 transition-all flex items-center">
                    <svg class="h-8 w-8 text-green-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx="10" cy="10" r="7" />
                      <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto  rounded-xl mt-4" v-if="activeStatus === 'stack'">
          <table class="table-auto w-full border-collapse border border-gray-300 container">
            <thead>
              <tr class="bg-[#0F2167] text-white h-16 text-xl text-center">
                <th class="px-4 py-2">รูป</th>
                <th class="px-4 py-2">วันที่เพิ่ม</th>
                <th class="px-4 py-2">รหัสผู้ใช้งาน</th>
                <th class="px-10 py-2">ชื่อจริง - นามสกุล</th>
                <th class="px-4 py-2">ตำแหน่งงาน</th>
                <th class="px-4 py-2">เพิ่มเติม</th>
                <th class="px-4 py-2">แก้ไข</th>
                <th v-if=" this.position === 'owner'"  class="px-4 py-2">ลบ</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="mergedEmployees.length === 0">
                <tr>
                  <td colspan="9" class="px-5 py-5 border-1 border-gray-200 bg-white text-center text-lg font-semibold">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(employee, index) in mergedEmployees" :key="index"
                  class="transition-all hover:bg-blue-100 bg-slate-50">
                  <td class="border flex items-center justify-center border-solid border-gray-700 px-2 py-2">
                    <img :src="employee.image
                        ? 'https://drive.google.com/thumbnail?id=' +
                        employee.image
                        : ''
                      " v-if="employee.image" class="w-20 h-20 object-cover rounded-full" />
                    <span v-else
                      class="w-20 h-20 flex items-center justify-center text-gray-400 bg-gray-200 rounded-full">ไม่มีรูปภาพ</span>
                  </td>

                  <td class="border border-solid border-gray-700 px-2 py-2">
                    {{ formatThaiDateTime(employee.createdAt) }}
                  </td>
                  <td class="border border-solid border-gray-700 px-2 py-2">
                    {{ employee.userid }}
                  </td>
                  <td class="border border-solid border-gray-700 px-2 py-2">
                    {{ employee.name_title }}{{ employee.first_name }}
                    {{ employee.last_name }}
                  </td>
                  <td class="border border-solid border-gray-700 px-2 py-2">
                    {{ employee.position }}
                  </td>
                  <td class="border border-solid border-gray-700 px-2 py-2">
                    <button @click.prevent="viewDetails(employee)"
                      class="text-green-500 hover:text-green-700 transition-all flex items-center w-32">
                      <svg class="h-8 w-8 text-green-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="10" cy="10" r="7" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                      </svg>
                      ดูรายละเอียด
                    </button>
                  </td>
                  <td class="border border-solid border-gray-500 px-4 py-2">
                    <button @click.prevent="editEmployee(employee)"
                      class="text-yellow-500 hover:text-yellow-700 transition-all">
                      <svg class="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                        <line x1="16" y1="5" x2="19" y2="8" />
                      </svg>
                      แก้ไข
                    </button>
                  </td>
                  <td v-if=" this.position === 'owner'" class="border border-solid border-gray-500 px-4 py-2">
                    <button @click.prevent="confirmDelete(employee._id)"
                      class="text-red-500 hover:text-red-700 transition-all">
                      <svg class="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1="4" y1="7" x2="20" y2="7" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                      ลบ
                    </button>
                  </td>
                  
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center my-4">
          <button @click="previousPage" :disabled="currentPage === 1"
            class="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
            ก่อนหน้านั้น
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
            หน้าถัดไป
          </button>
        </div>
        <span class="px-4 py-2 flex justify-center">
          หน้า {{ currentPage }} จาก {{ totalPages }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Sidebar from "primevue/sidebar";
import Dialog from "primevue/dialog";

export default {

  components: {
    Sidebar,
  },

  computed: {
    subPositionOptions() {
      return this.originalRoles.filter(
        (role) => role.thai_role === this.selectedPosition && role.thai_position
      );
    },

    formattedBirthday() {
      return dayjs(this.detailEmployee.birthday).format("DD-MM-YYYY");
    },


    mergedEmployees() {
      // Filter employees by selected role
      const filteredEmployees = this.selectedRole
        ? this.employees.filter(
          (employee) => employee.position === this.selectedRole
        )
        : this.employees;

      // Paginate filtered employees
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const paginatedEmployees = filteredEmployees.slice(
        startIndex,
        startIndex + this.pageSize
      );

      return paginatedEmployees;
    },
    totalPages() {
      const totalEmployees = this.selectedRole
        ? this.employees.filter(
          (employee) => employee.position === this.selectedRole
        ).length
        : this.employees.length;
      return Math.ceil(totalEmployees / this.pageSize);
    },
  },

  data() {
    return {
      activeStatus: "stack",
      selectedRole: "", // Selected role for filtering
      currentPage: 1,
      pageSize: 8, // number of items per page
      Detailsvisible: false,
      detailEmployee: {}, // เก็บข้อมูลพนักงานที่เลือกเพื่อดูเพิ่มเติม
      showDetailPopup: false,
      employees: [],
      showAddEmployeeForm: false,
      showEditEmployeePopup: false,
      editedEmployee: {},
      name_title: null,
      titleOptions: [
        { label: "นาย", value: "นาย" },
        { label: "นาง", value: "นาง" },
        { label: "นางสาว", value: "นางสาว" },
      ],
      first_name: "",
      last_name: "",
      iden_number: "",
      selectedPosition: "",
      selectedSubPosition: "",
      originalRoles: [],
      positionOptions: [],
      //subPositionOptions: ['programmer', 'graphic', 'accounting', 'lawyer'],
      subPosition: "",
      subForPosition: [
        { label: "พนักงานภาคสนาม", value: "พนักงานภาคสนาม" },
        { label: "	ช่างเทคนิค", value: "	ช่างเทคนิค" },
      ],
      searchKeyword: "",
      editableDiv: "",
      position: localStorage.getItem('position')
    };
  },

  mounted() {
    this.getdata();
    this.fetchRoles();
  },
  methods: {


    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },


    async fetchRoles() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/role/getall`
        );
        if (data.status) {
          console.log(data.data);
          this.originalRoles = data.data;
          this.positionOptions = [
            ...new Set(data.data.map((role) => role.thai_role)),
          ];
        }
        console.log("originalRoles", this.originalRoles);
      } catch (err) {
        console.log(err);
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    showItemsByPosition(position) {
      // ตั้งค่า activeStatus ตามตำแหน่งที่รับมา
      this.activeStatus = position;
    },
    filterByRole() {
      // Reset pagination to first page when filtering
      this.currentPage = 1;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    viewDetails(employee) {
      this.detailEmployee = employee;
      this.Detailsvisible = true;
    },
    formatThaiDateTime(dateTime) {
      dayjs.locale("th"); // ตั้งค่า locale เป็นไทย
      return dayjs(dateTime).format("DD/MM/YYYY HH:mm:ss"); // รูปแบบวันที่และเวลาท้องถิ่นของไทย
    },
    searchEmployees() {
      // ถ้าคำค้นหาไม่ว่าง
      if (this.searchKeyword.trim() !== "") {
        // ใช้ Array.filter() เพื่อกรองข้อมูลพนักงานที่ตรงกับคำค้นหา
        this.employees = this.employees.filter((employee) => {
          // ให้ตรวจสอบว่าชื่อ นามสกุล หรือชื่อเล่นของพนักงานมีคำค้นหาอยู่หรือไม่
          return (
            employee.first_name
              .toLowerCase()
              .includes(this.searchKeyword.toLowerCase()) ||
            employee.last_name
              .toLowerCase()
              .includes(this.searchKeyword.toLowerCase()) ||
            employee.nick_name
              .toLowerCase()
              .includes(this.searchKeyword.toLowerCase())
          );
        });
      } else {
        // ถ้าคำค้นหาเป็นค่าว่าง ให้โหลดข้อมูลพนักงานทั้งหมด
        this.getdata();
      }
    },

    async getdata() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        this.employees = response.data.data.reverse();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async saveData() {
      try {
        let data = {
          name_title: this.name_title,
          first_name: this.first_name,
          last_name: this.last_name,
          iden_number: this.iden_number,
          role: "employee",
          //role_id: this.selectedSubPosition._id,
          userid: this.iden_number,
          password: this.iden_number,
          position: this.$refs.inputField.innerText
        };
        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/post`,
          data,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        Swal.fire({
          icon: "success",
          text: "เพิ่มสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Data saved successfully:", response.data);
        this.showAddEmployeeForm = false;
        this.getdata();
        // this.$router.push('/employee/all');
      } catch (error) {
        console.error("Error saving data:", error);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },


    // async addEmployee() {
    //   if (this.checkRequiredFields()) {
    //     try {
    //       this.newEmployee.userid = this.newEmployee.iden_number;
    //       this.newEmployee.password = this.newEmployee.iden_number;
    //       const response = await axios.post(`${import.meta.env.VITE_VUE_APP_DECCAN}/post`,
    //         this.newEmployee, {
    //         headers: { "auth-token": `${localStorage.getItem("token")}` },
    //       });
    //       if (response.data.message === 'มีผู้ใช้บัตรประชาชนนี้ในระบบแล้ว' || response.data.message === 'มีผู้ใช้ยูสเซอร์ไอดีนี้ในระบบแล้ว') {
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'error',
    //           text: response.data.message,
    //           showCancelButton: false,
    //           timer: 2000
    //         });
    //       } else {
    //         Swal.fire({
    //           icon: 'success',
    //           title: 'Success',
    //           text: 'เพิ่มข้อมูลสำเร็จ',
    //           showCancelButton: false,
    //           timer: 2000
    //         });
    //         this.getdata();
    //         this.showAddEmployeeForm = false;
    //         this.clearInputFields();
    //       }
    //       console.log(response.data);
    //     } catch (error) {
    //       console.error('Error adding employee:', error);
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'Failed to add employee. Please try again later.'
    //       });
    //     }
    //   } else {
    //     Swal.fire({
    //       icon: 'warning',
    //       title: 'Incomplete Data',
    //       text: 'กรอกข้อมูลไม่ครบ'
    //     });
    //   }
    // },

    checkRequiredFields() {
      return (
        this.newEmployee.name_title &&
        this.newEmployee.first_name &&
        this.newEmployee.last_name &&
        this.newEmployee.iden_number &&
        this.newEmployee.role
      );
    },
    formatDate(date) {
      dayjs.locale("th");
      // Format date in Thai
      return dayjs(date).locale("th").format("D MMMM YYYY");
    },
    editEmployee(employee) {
      // Set the data of the employee to be edited in the editedEmployee variable
      this.editedEmployee = { ...employee };
      // Convert the date format before displaying it
      this.showEditEmployeePopup = true;
      console.log(employee._id);
    },
    async updateEmployee() {
      try {
        this.editedEmployee.userid = this.editedEmployee.iden_number;

        const response = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/update/${this.editedEmployee._id
          }`,
          this.editedEmployee,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "อัปเดตข้อมูลพนักงานสำเร็จ",
          showCancelButton: false,
          timer: 2000,
        });
        // Close the Edit Employee Popup
        this.showEditEmployeePopup = false;
        // Load the new employee data
        this.getdata();
      } catch (error) {
        // Notify if there's an error updating
        console.error("Error updating employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "อัพเดทข้อมูลพนักงานไม่สำเร็จ",
        });
      }
    },
    confirmDelete(id) {
      Swal.fire({
        title: "คุณแน่ใจหรือไม่",
        text: "คุณต้องการลบพนักงานคนนี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ใช่",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEmployee(id);
        }
      });
    },
    async deleteEmployee(id) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/del/${id}`,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        // Notify that the deletion was successful
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ลบข้อมูลพนักงานสำเร็จ",
          showCancelButton: false,
          timer: 2000,
        });
        // Reload the employee data
        this.getdata();
      } catch (error) {
        // Notify if there's an error deleting
        console.error("Error deleting employee:", error);
        Swal.fire({
          icon: "error",
          title: "ไม่สำเร็จ",
          text: "ลบข้อมูลไม่สำเร็จ",
        });
      }
    },
  },
};

</script>

<style>
/* You can add Tailwind CSS classes here if needed */
</style>
