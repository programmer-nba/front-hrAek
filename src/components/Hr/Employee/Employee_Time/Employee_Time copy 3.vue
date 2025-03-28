<template>
  <div>
    <div class="bg-gray-50 p-8 rounded w-full h-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <h2 class="text-[#201e58] text-3xl md:text-5xl font-semibold">
            ประวัติลงเวลาพนักงาน
          </h2>
        </div>
        <div class="flex justify-center">
          <h2 class="text-[#0802A3] text-2xl md:text-3xl font-semibold">
            วันที่ปัจจุบัน: {{ currentDateThai }}
          </h2>
        </div>
      </div>

      <div class="mb-3 flex justify-center">
        <div class="max-w-md mx-auto">
          <div
            class="relative flex items-center border w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"
          >
            <div class="grid place-items-center h-full w-12 text-gray-300">
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
                />
              </svg>
            </div>
            <input
              v-model="searchKeyword"
              class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="ค้นหาตามชื่อ"
            />
          </div>
        </div>
      </div>
      <div v-if="selectedDate" class="mt-1 text-xl md:text-2xl">
        <p>วันที่ดู: {{ formatDateThai(selectedDate) }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-wrap justify-start items-center gap-2">
          <div class="space-y-2 space-x-2">
            <label class="text-xl font-semibold"
              >เลือกวันที่ที่ต้องการดู
            </label>
            <CalendarP
              v-model="selectedDate"
              @date-select="handleDateSelect"
              dateFormat="dd/mm/yy"
              inputId="birth_date"
              class="h-10 border rounded"
            />
          </div>
          <div class="space-y-2 space-x-2">
            <label for="positionFilter" class="text-lg font-semibold"
              >ตำแหน่ง:</label
            >
            <select
              v-model="selectedPosition"
              id="positionFilter"
              class="p-2 border border-gray-300 rounded-md"
            >
              <option value="">ทั้งหมด</option>
              <option value="programmer">Programmer</option>
              <option value="graphic">Graphic Designer</option>
              <option value="accounting">Accountant</option>
              <option value="lawyer">Lawyer</option>
              <option value="manager">Manager</option>
              <option value="hr">HR</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            @click="showPDFAll = true"
            class="text-white bg-gradient-to-r from-red-500 via-red-500 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="button"
          >
            ประวัติลงเวลาทั้งหมด
          </button>
        </div>

        <!-- <div class="flex justify-center">
                <div
                    class="inline-flex overflow-hidden bg-white border border-[#7BD3EA] divide-x rounded-lg  rtl:flex-row-reverse   ">
                    <button @click="showItemsByPosition('grid')"
                        :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'grid' }"
                        class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200  sm:text-sm hover:bg-[#B4D4FF]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M3 6.75c0-1.768 0-2.652.55-3.2C4.097 3 4.981 3 6.75 3c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55C3 9.403 3 8.519 3 6.75Zm0 10.507c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55C3 19.91 3 19.026 3 17.258ZM13.5 6.75c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55c-.55-.548-.55-1.432-.55-3.2Zm0 10.507c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55c-.55-.548-.55-1.432-.55-3.2Z" />
                        </svg>
                    </button>

                    <button @click="showItemsByPosition('stack')"
                        :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'stack' }"
                        class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200 sm:text-sm hover:bg-[#B4D4FF]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm2 1v14h16V5zm2 2h2v2H6zm2 4H6v2h2zm-2 4h2v2H6zm12-8h-8v2h8zm-8 8h8v2h-8zm8-4h-8v2h8z" />
                        </svg>
                    </button>
                </div>
            </div> -->
      </div>

      <!-- ตารางข้อมูลพนักงาน -->
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="p-3 border-b-2 border-gray-200 bg-[#0F2167] text-center text-base font-semibold text-white uppercase tracking-wider"
                >
                  ชื่อ
                </th>
                <th
                  class="p-3 border-b-2 border-gray-200 bg-[#0F2167] text-center text-base font-semibold text-white uppercase tracking-wider"
                >
                  เข้างานช่วงเช้า
                </th>
                <th
                  class="p-3 border-b-2 border-gray-200 bg-[#0F2167] text-center text-base font-semibold text-white uppercase tracking-wider"
                >
                  พักเที่ยง
                </th>
                <th
                  class="p-3 border-b-2 border-gray-200 bg-[#0F2167] text-center text-base font-semibold text-white uppercase tracking-wider"
                >
                  เข้างานช่วงบ่าย
                </th>
                <th
                  class="p-3 border-b-2 border-gray-200 bg-[#0F2167] text-center text-base font-semibold text-white uppercase tracking-wider"
                >
                  ลงเวลาออกงาน
                </th>
                <th
                  class="p-3 border-b-2 border-gray-200 bg-[#0F2167] text-center text-base font-semibold text-white uppercase tracking-wider"
                >
                  เริ่มต้นทำ OT
                </th>
                <th
                  class="p-3 border-b-2 border-gray-200 bg-[#0F2167] text-center text-base font-semibold text-white uppercase tracking-wider"
                >
                  สิ้นสุดทำ OT
                </th>
                <th
                  class="p-3 border-b-2 border-gray-200 bg-[#0F2167] text-center text-base font-semibold text-white uppercase tracking-wider"
                >
                  เวลาที่ใช้ทำ OT
                </th>
                <th
                  class="p-3 border-b-2 border-gray-200 bg-[#0F2167] text-center text-lg font-semibold text-white uppercase tracking-wider"
                >
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="filteredEmployees.length === 0">
                <tr>
                  <td
                    colspan="8"
                    class="px-4 py-2 border-1 border-gray-200 bg-white text-center text-lg font-semibold"
                  >
                    ไม่พบข้อมูล
                  </td>
                </tr>
              </template>
              <!-- ถ้ามีข้อมูลให้แสดง -->
              <template v-else>
                <!-- {{ console.log(filteredEmployees) }} -->
                <tr v-for="employee in filteredEmployees" :key="employee._id">
                  <td
                    class="px-4 py-2 border-1 border-gray-200 bg-white text-sm"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-16 h-16">
                        <img
                          :src="
                            employee.image
                              ? 'https://drive.google.com/thumbnail?id=' +
                                employee.image
                              : ''
                          "
                          v-if="employee.image"
                          class="w-full h-full object-cover rounded-full"
                          alt="Employee Image"
                        />
                        <span
                          v-else
                          class="w-full text-sm h-full flex items-center justify-center text-gray-400 bg-gray-200 rounded-full"
                          >ไม่มีรูปภาพ</span
                        >
                      </div>
                      <div class="ml-4">
                        <p class="text-gray-900 text-lg font-medium">
                          {{ employee.name_title }} {{ employee.first_name }}
                          {{ employee.last_name }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-14 py-5 border-1 border-gray-200 bg-white text-lg text-center"
                  >
                    <!-- {{ console.log("employee", employee) }} -->
                    <div
                      :class="{
                        'bg-red-200 rounded-xl px-2':
                          getAttendanceClass(
                            employee._id,
                            'เข้างานช่วงเช้า'
                          ) === 'text-red-700',
                        'bg-green-200 rounded-xl':
                          getAttendanceClass(
                            employee._id,
                            'เข้างานช่วงเช้า'
                          ) === 'text-green-700',
                      }"
                    >
                      <div
                        :class="
                          getAttendanceClass(employee._id, 'เข้างานช่วงเช้า')
                        "
                      >
                        <div
                          v-if="
                            getWorkTime(employee._id, 'เข้างานช่วงเช้า') === '-'
                          "
                        >
                          <button @click="editEmp(employee, 'เข้างานช่วงเช้า')">
                            <i
                              class="pi pi-file-edit text-violet-400 hover:text-violet-700"
                              style="font-size: 30px"
                            ></i>
                          </button>
                        </div>
                        <div v-else>
                          {{ getWorkTime(employee._id, "เข้างานช่วงเช้า") }}
                        </div>
                        <div
                          v-if="
                            getAttendanceClass(
                              employee._id,
                              'เข้างานช่วงเช้า'
                            ) === 'text-red-700'
                          "
                        >
                          (สาย)
                        </div>
                        <div
                          v-else-if="
                            getAttendanceClass(
                              employee._id,
                              'เข้างานช่วงเช้า'
                            ) === 'text-green-700'
                          "
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-14 py-5 border-1 border-gray-200 bg-white text-lg text-center"
                  >
                    <!-- {{ console.log("employee", employee) }} -->
                    <div
                      :class="{
                        'bg-red-200 rounded-xl px-2':
                          getAttendanceClass(employee._id, 'พักเที่ยง') ===
                          'text-red-700',
                        'bg-green-200 rounded-xl':
                          getAttendanceClass(employee._id, 'พักเที่ยง') ===
                          'text-green-700',
                      }"
                    >
                      <div
                        :class="getAttendanceClass(employee._id, 'พักเที่ยง')"
                      >
                        <div
                          v-if="getWorkTime(employee._id, 'พักเที่ยง') === '-'"
                        >
                          <button @click="editEmp(employee, 'พักเที่ยง')">
                            <i
                              class="pi pi-file-edit text-violet-400 hover:text-violet-700"
                              style="font-size: 30px"
                            ></i>
                          </button>
                        </div>
                        <div v-else>
                          {{ getWorkTime(employee._id, "พักเที่ยง") }}
                        </div>
                        <div
                          v-if="
                            getAttendanceClass(employee._id, 'พักเที่ยง') ===
                            'text-red-700'
                          "
                        >
                          (สาย)
                        </div>
                        <div
                          v-else-if="
                            getAttendanceClass(employee._id, 'พักเที่ยง') ===
                            'text-green-700'
                          "
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-14 py-5 border-1 border-gray-200 bg-white text-lg text-center"
                  >
                    <div
                      :class="{
                        'bg-red-200 rounded-xl px-2':
                          getAttendanceClass(
                            employee._id,
                            'เข้างานช่วงบ่าย'
                          ) === 'text-red-700',
                        'bg-green-200 rounded-xl':
                          getAttendanceClass(
                            employee._id,
                            'เข้างานช่วงบ่าย'
                          ) === 'text-green-700',
                      }"
                    >
                      <div
                        :class="
                          getAttendanceClass(employee._id, 'เข้างานช่วงบ่าย')
                        "
                      >
                        <div
                          v-if="
                            getWorkTime(employee._id, 'เข้างานช่วงบ่าย') === '-'
                          "
                        >
                          <button @click="editEmp(employee, 'เข้างานช่วงบ่าย')">
                            <i
                              class="pi pi-file-edit text-violet-400 hover:text-violet-700"
                              style="font-size: 30px"
                            ></i>
                          </button>
                        </div>
                        <div v-else>
                          {{ getWorkTime(employee._id, "เข้างานช่วงบ่าย") }}
                        </div>

                        <div
                          v-if="
                            getAttendanceClass(
                              employee._id,
                              'เข้างานช่วงบ่าย'
                            ) === 'text-red-700'
                          "
                        >
                          (สาย)
                        </div>
                        <div
                          v-else-if="
                            getAttendanceClass(
                              employee._id,
                              'เข้างานช่วงบ่าย'
                            ) === 'text-green-700'
                          "
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-4 py-2 border-1 border-gray-200 bg-white text-lg text-center"
                  >
                    <div
                      :class="{
                        'bg-yellow-200 rounded-xl px-2':
                          getAttendanceClass(employee._id, 'ลงเวลาออกงาน') ===
                          'text-yellow-700',
                      }"
                    >
                      <div
                        :class="
                          getAttendanceClass(employee._id, 'ลงเวลาออกงาน')
                        "
                      >
                        <div
                          v-if="
                            getWorkTime(employee._id, 'ลงเวลาออกงาน') === '-'
                          "
                        >
                          <button @click="editEmp(employee, 'ลงเวลาออกงาน')">
                            <i
                              class="pi pi-file-edit text-violet-400 hover:text-violet-700"
                              style="font-size: 30px"
                            ></i>
                          </button>
                        </div>
                        <div v-else>
                          {{ getWorkTime(employee._id, "ลงเวลาออกงาน") }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-2 bg-white border-1 text-lg text-center">
                    <p
                      :class="{
                        'bg-blue-100 rounded-xl p-2':
                          getWorkOTStart(employee._id) !== '-',
                      }"
                    >
                      {{ getWorkOTStart(employee._id) }}
                    </p>
                  </td>
                  <td class="px-4 py-2 bg-white border-1 text-lg text-center">
                    <p
                      :class="{
                        'bg-blue-100 rounded-xl p-2':
                          getWorkOTFinish(employee._id) !== '-',
                      }"
                    >
                      {{ getWorkOTFinish(employee._id) }}
                    </p>
                  </td>
                  <td class="px-1 py-5 bg-white border-1 text-lg text-center">
                    <p
                      :class="{
                        'bg-blue-100 rounded-xl p-2':
                          getWorkOTDuration(employee._id) !== '-',
                      }"
                    >
                      {{ getWorkOTDuration(employee._id) }}
                    </p>
                  </td>

                  <td class="px-4 py-2 bg-white border-1 text-lg font-semibold">
                    <button
                      @click="showDetails(employee)"
                      class="flex items-center"
                    >
                      <i
                        class="pi pi-search mb-3 text-blue-500 hover:text-blue-700"
                        style="font-size: 30px"
                      ></i>
                    </button>
                    <button
                      @click="showPDF1(employee)"
                      class="flex items-center"
                    >
                      <i
                        class="pi pi-calendar-minus mb-3 text-orange-400 hover:text-orange-700"
                        style="font-size: 30px"
                      ></i>
                    </button>
                    <!-- <button
                      @click="editEmp(employee)"
                      class="flex items-center"
                    >
                      <i
                        class="pi pi-file-edit text-violet-400 hover:text-violet-700"
                        style="font-size: 30px"
                      ></i>
                    </button> -->
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Sidebar
      v-model:visible="showEmployeeDetails"
      header="ข้อมูลเพิ่มเติม"
      position="right"
      class="w-full md:w-4/12"
    >
      <div class="bg-white px-10 rounded-lg flex flex-col items-center">
        <div class="">
          <img
            :src="
              selectedEmployee.image
                ? 'https://drive.google.com/thumbnail?id=' +
                  selectedEmployee.image
                : ''
            "
            v-if="selectedEmployee.image"
            class="w-32 h-32 object-cover rounded-full mb-4"
            alt="Employee Image"
          />
          <span
            v-else
            class="w-32 h-32 flex items-center justify-center text-gray-400 bg-gray-200 rounded-full"
            >ไม่มีรูปภาพ</span
          >
        </div>
        <h3 class="text-xl font-semibold">
          {{ selectedEmployee.name_title }} {{ selectedEmployee.first_name }}
          {{ selectedEmployee.last_name }}
        </h3>
      </div>
      <div class="text-lg">
        <div class="flex items-center mb-2">
          <i class="pi pi-clock mr-2"></i>
          <p class="mb-0">
            เข้างานช่วงเช้า:
            {{ getWorkTime(selectedEmployee._id, "เข้างานช่วงเช้า") }}
          </p>
        </div>
        <div class="flex items-center mb-2">
          <i class="pi pi-clock mr-2"></i>
          <p class="mb-0">
            เข้างานช่วงบ่าย:
            {{ getWorkTime(selectedEmployee._id, "เข้างานช่วงบ่าย") }}
          </p>
        </div>
        <div class="flex items-center mb-2">
          <i class="pi pi-clock mr-2"></i>
          <p class="mb-0">
            ลงเวลาออกงาน:
            {{ getWorkTime(selectedEmployee._id, "ลงเวลาออกงาน") }}
          </p>
        </div>
        <div class="flex items-center mb-2">
          <i class="pi pi-clock mr-2"></i>
          <p class="mb-0">
            เริ่มต้นทำ OT: {{ getWorkOTStart(selectedEmployee._id) }}
          </p>
        </div>
        <div class="flex items-center mb-2">
          <i class="pi pi-clock mr-2"></i>
          <p class="mb-0">
            สิ้นสุดทำ OT: {{ getWorkOTFinish(selectedEmployee._id) }}
          </p>
        </div>
        <div class="flex items-center mb-4">
          <i class="pi pi-clock mr-2"></i>
          <p class="mb-0">
            เวลาที่ใช้ทำ OT: {{ getWorkOTDuration(selectedEmployee._id) }}
          </p>
        </div>
      </div>
    </Sidebar>
    <Dialog
      v-model:visible="showPDF"
      :modal="true"
      class="w-full md:w-8/12 lg:w-5/12 xl:w-5/12"
      header="ดูประวัติลงเวลาของพนักงาน"
    >
      <div class="flex justify-center items-center">
        {{ console.log(showPDFdata) }}
        <div class="">
          <img
            :src="
              showPDFdata.image
                ? 'https://drive.google.com/thumbnail?id=' + showPDFdata.image
                : ''
            "
            v-if="showPDFdata.image"
            class="w-32 h-32 object-cover rounded-full mb-4"
            alt="Employee Image"
          />
          <span
            v-else
            class="w-32 h-32 flex items-center justify-center text-gray-400 bg-gray-200 rounded-full"
            >ไม่มีรูปภาพ</span
          >
        </div>
      </div>
      <div class="flex justify-center items-center">
        <h3 class="text-xl font-semibold text-black">
          {{ showPDFdata.name_title }} {{ showPDFdata.first_name }}
          {{ showPDFdata.last_name }}
        </h3>
      </div>
      <div
        class="text-xl mt-2 py-3 font-semibold flex justify-content-center items-center"
      >
        <h1 class="mr-3 text-black mt-3">เลือกดูลงเวลาเข้างานรายเดือน</h1>
        <CalendarP
          class=""
          v-model="selectedDate"
          view="month"
          dateFormat="mm/yy"
        />
        <button
          v-if="selectedDate"
          @click="generatePDF(showPDFdata, selectedDate)"
          class="text-white bg-gradient-to-r from-red-300 via-red-300 to-red-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 items-center text-center ml-2 mb-2"
          type="button"
        >
          <i
            class="pi pi-file-pdf mr-1 text-red-800 hover:text-red-900"
            style="font-size: 30px"
          ></i>
          <span class="text-xl">ลงเวลา</span>
        </button>
        <button
          v-if="selectedDate"
          @click="showOT(showPDFdata, selectedDate)"
          class="text-white bg-gradient-to-r from-red-300 via-red-300 to-red-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 items-center text-center ml-2 mb-2"
          type="button"
        >
          <i
            class="pi pi-file-pdf mr-1 text-red-800 hover:text-red-900"
            style="font-size: 30px"
          ></i>
          <span class="text-xl">OT</span>
        </button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="showPDFAll"
      :modal="true"
      class="w-full md:w-8/12 lg:w-5/12 xl:w-5/12"
      header="ดูประวัติลงเวลาของพนักงานทั้งหมด"
    >
      <div
        class="text-xl mt-2 py-3 font-semibold flex justify-content-center items-center"
      >
        <h1 class="mr-3 text-black mt-3">เลือกดูลงเวลาเข้างานรายเดือน</h1>
        <CalendarP
          class="border-2 border-green-300 rounded"
          v-model="selectedDate"
          dateFormat="dd/mm/yy"
        />
        <button
          @click="generatePDFAll(showPDFdata, selectedDate, 1)"
          class="text-white bg-gradient-to-r from-red-300 via-red-300 to-red-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 items-center text-center ml-2 mb-2"
          type="button"
        >
          <i
            class="pi pi-file-pdf mr-1 text-red-800 hover:text-red-900"
            style="font-size: 30px"
          ></i>
          <span class="text-xl">ลงเวลาวันนี้</span>
        </button>
        <button
          v-if="selectedDate"
          @click="generatePDFAll(showPDFdata, selectedDate, 0)"
          class="text-white bg-gradient-to-r from-red-300 via-red-300 to-red-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 items-center text-center ml-2 mb-2"
          type="button"
        >
          <i
            class="pi pi-file-pdf mr-1 text-red-800 hover:text-red-900"
            style="font-size: 30px"
          ></i>
          <span class="text-xl">ลงเวลาทั้งเดือน</span>
        </button>
        <button
          v-if="selectedDate"
          @click="generateOtAll(showPDFdata, selectedDate)"
          class="text-white bg-gradient-to-r from-red-300 via-red-300 to-red-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 items-center text-center ml-2 mb-2"
          type="button"
        >
          <i
            class="pi pi-file-pdf mr-1 text-red-800 hover:text-red-900"
            style="font-size: 30px"
          ></i>
          <span class="text-xl">OT</span>
        </button>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="showEdit"
      modal
      header="แก้ไขข้อมูลเวลาลงงาน"
      style="min-width: 300px"
    >
      <div class="w-full">
        <div class="flex flex-col justify-start items-start gap-2">
          <div>
            <a class="text-lg font-semibold">ตำแหน่ง : </a
            >{{ selectedEmployee.items.position }}
          </div>
          <div>
            <a class="text-lg font-semibold"
              >{{ selectedEmployee.items.name_title }} :</a
            >
            {{ selectedEmployee.items.first_name }}
            {{ selectedEmployee.items.last_name }}
          </div>
          <div>
            <a class="font-semibold">ลงเวลาในวันที่ :</a>
            {{ formatDateThai(selectedDate) }}
          </div>
          <div class="space-x-2">
            <a class="font-semibold">ลงเวลา :</a>
            <CalendarP
              v-model="selectedEmployee.time_new"
              showTime
              timeOnly
              placeholder="ลงเวลา"
              class="h-10 w-16 border-2 rounded"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="w-full flex justify-center gap-2">
          <ButtonP
            label="บันทึก"
            @click="editEmp(selectedEmployee)"
            class="px-2 py-1 rounded border-2 text-green-700 border-green-300 hover:bg-green-300"
          />
          <ButtonP
            label="ยกเลิก"
            @click="showEdit = false"
            class="px-2 py-1 rounded border-2 hover:bg-gray-200"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import locale for Thai
import html2pdf from "html2pdf.js";
import Logo from "../../../../assets/Logo+name.png";
// import Swal from "sweetalert2";
export default {
  components: {},
  data() {
    return {
      showEdit: false,
      searchKeyword: "",
      showPDF: false,
      showPDFAll: false,
      selectedPosition: "",
      currentDateThai: "",
      employees: [],
      timeData: [],
      selectedDate: null,
      showEmployeeDetails: false,
      selectedEmployee: {},
      showPDFdata: {},
      date: null,
      ot: [],
    };
  },
  computed: {
    // Filtered employees based on selected position
    filteredEmployees() {
      let filtered = this.employees;

      // กรองตามตำแหน่ง
      if (this.selectedPosition) {
        filtered = filtered.filter(
          (employee) => employee.position === this.selectedPosition
        );
      }

      // กรองตามชื่อพนักงาน
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        filtered = filtered.filter(
          (employee) =>
            employee.name_title.toLowerCase().includes(keyword) ||
            employee.first_name.toLowerCase().includes(keyword) ||
            employee.last_name.toLowerCase().includes(keyword)
        );
      }

      return filtered;
    },
  },
  mounted() {
    // this.employeeAlltime();
    this.getOT();
    this.getdata();
    this.getCurrentDateThai();
    setInterval(this.getCurrentDateThai, 1000); // อัพเดทเวลาทุกๆ 1 วินาที
    this.selectedDate = new Date();
  },
  methods: {
    async employeeAlltime() {
      try {
        console.log(import.meta.env.VITE_VUE_APP_DECCAN); //http://49.49.12.183:9996/ddsc-office
        const data = {
          // day: '02',
          // mount: '04',
          // year: '2024',
        };
        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getall/employee`,
          data
        );
        console.log("employeeAlltime", response.data.data);
      } catch (error) {
        console.error("Error employeeAlltime:", error);
      }
    },
    async generateOtAll(employee, date) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/admin/getall`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        console.log("responseresponse", response);

        // Filter time data for the selected month and year from the calendar
        const timeData = response.data.data.filter(
          (item) =>
            parseInt(item.mount) === date.getMonth() + 1 && // เดือนเริ่มที่ 1
            parseInt(item.year) === date.getFullYear() &&
            (item.time_line === "เข้างานช่วงเช้า" ||
              item.time_line === "เข้างานช่วงบ่าย" ||
              item.time_line === "ลงเวลาออกงาน")
        );

        console.log(timeData);
        const response_ot = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getall/ot`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );

        const response_employees = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );

        const me = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );

        const getWorkOTStart = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.date === date && item.employee_id === employeeId
          );
          return otData ? otData.time_in : "-";
        };

        const getWorkOTFinish = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.date === date && item.employee_id === employeeId
          );
          return otData ? otData.time_out : "-";
        };

        const getWorkOTDuration = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.employee_id === employeeId && item.date === date
          );
          return otData ? otData.total_ot : "-";
        };

        if (timeData.length === 0) {
          Swal.fire({
            icon: "error",
            title: "ไม่พบข้อมูล",
            text: "ไม่พบข้อมูลการลงเวลาของพนักงานคนนี้ในเดือนและปีที่เลือก",
            customClass: {
              container: "null",
            },
          });
          return; // ไม่สร้าง PDF ถ้าไม่มีข้อมูล
        }

        function getPrintedTime() {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, "0");
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const formattedTime = `${hours}:${minutes}`;
          return formattedTime;
        }

        const mount = dayjs(date)
          .add(543, "year")
          .locale("th")
          .format("MMMM YYYY");

        const employeeList = response_employees.data.data;

        const opt = {
          html2canvas: { scale: 3 },
          margin: 0.1,
          filename: `${employee.first_name}_${
            date.getMonth() + 1
          }-${date.getFullYear()}_report.pdf`,
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "landscape",
            quality: "1",
          },
        };

        const content = `
                    <style>
                    @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+Thai:wght@100..900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

                        body {
                font-family: "Sarabun", sans-serif;
                font-weight: 300;
                font-style: normal;
                font-size: 14px;
                line-height: 1.5;}
                </style>
                <body>
                    <div class="px-5">
                        <div class="flex flex-row">
                            <div class="flex ">
                                <img src="${Logo}" class="w-full max-w-26 h-26">
                            </div>
                            <div class="flex flex-col items-center ">
                                <div class="flex ml-72">
                                    <p>ลงเวลาปฏิบัติงานนอกเวลาทำการ(OVER TIME)</p>
                                </div>
                                <div class="flex ml-72">
                                    <p class="indent-5">บริษัท ดิจิตอลดิเวลล็อปเปอร์เซอร์วิสเซ็นเตอร์จำกัด</p>
                                </div>
                                <div class="flex ml-72">
                                    <p class="indent-5">ประจำเดือน ${mount}</p>
                                </div>
                                <div class="flex ml-72">
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                        <table class="w-full mt-1 border-2 border-solid border-black text-center">
                            <tr>
                                <th class="border border-solid border-black w-10" rowspan="2">ลำดับ</th>
                                <th class="border border-solid border-black" colspan="2">วันที่</th>
                                <th class="border border-solid border-black w-32" rowspan="2">รหัสพนักงาน</th>
                                <th class="border border-solid border-black w-32" rowspan="2">ชื่อพนักงาน</th>
                                <th class="border border-solid border-black py-1" colspan="3">OT</th>
                                <th class="border border-solid border-black" rowspan="2">หมายเหตุ</th>
                            </tr>
                            <tr>
                                <th class="border border-solid border-black py-1">วัน</th>
                                <th class="border border-solid border-black py-1">วันที่</th>
                                <th class="border border-solid border-black py-1">เวลาเริ่ม</th>
                                <th class="border border-solid border-black py-1">เวลาสิ้นสุด</th>
                                <th class="border border-solid border-black py-1">เวลาที่ใช้</th>
                            </tr>
                            <tbody>
                                ${
                                  timeData.length === 0
                                    ? '<tr><td colspan="9" class="text-center py-5 text-xl">ไม่พบข้อมูล</td></tr>'
                                    : timeData
                                        .filter((data) => {
                                          const date = dayjs(
                                            `${data.day}/${data.mount}/${data.year}`,
                                            "DD/MM/YYYY"
                                          ).format("DD/MM/YYYY");
                                          const hasOT =
                                            getWorkOTStart(
                                              data.employee_id,
                                              date
                                            ) !== "-" ||
                                            getWorkOTFinish(
                                              data.employee_id,
                                              date
                                            ) !== "-";
                                          return hasOT;
                                        })
                                        .map((data, index) => {
                                          const date = dayjs(
                                            `${data.day}/${data.mount}/${data.year}`,
                                            "DD/MM/YYYY"
                                          ).locale("th");
                                          const employeeDetails =
                                            employeeList.find(
                                              (emp) =>
                                                emp._id === data.employee_id
                                            );
                                          return `
                                        <tr>
                                            <td class="border border-solid border-black py-1">${
                                              index + 1
                                            }</td>
                                            <td class="border border-solid border-black text-left">${date.format(
                                              "วันdddd"
                                            )}</td>
                                            <td class="border border-solid border-black text-left">${date.format(
                                              "ที่ DD"
                                            )}</td>
                                            <td class="text-left border border-solid border-black">${
                                              employeeDetails
                                                ? employeeDetails.employee_number
                                                : "-"
                                            }</td>
                                            <td class="text-left border border-solid border-black">${
                                              employeeDetails
                                                ? employeeDetails.name_title +
                                                  employeeDetails.first_name +
                                                  " " +
                                                  employeeDetails.last_name
                                                : "-"
                                            }</td>
                                            <td class="text-center border border-solid border-black">${getWorkOTStart(
                                              data.employee_id,
                                              date.format("DD/MM/YYYY")
                                            )}</td>
                                            <td class="text-center border border-solid border-black">${getWorkOTFinish(
                                              data.employee_id,
                                              date.format("DD/MM/YYYY")
                                            )}</td>
                                            <td class="text-center border border-solid border-black">${getWorkOTDuration(
                                              data.employee_id,
                                              date.format("DD/MM/YYYY")
                                            )}</td>
                                            <td class="text-center border border-solid border-black"></td>
                                        </tr>
                                    `;
                                        })
                                        .join("")
                                }
                            </tbody>
                        </table>

                        </div>
                        <div class="footer flex justify-end bg-white px-5">
                            <p>ผู้พิมพ์: ${me.data.data.name_title}${
          me.data.data.first_name
        } ${me.data.data.last_name} เวลาพิมพ์: ${getPrintedTime()}</p>  
                        </div>
                    </body>
                    `;
        const pdf = html2pdf().set(opt).from(content).toPdf().get("pdf");
        pdf.output("dataurlnewwindow");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    },
    async generatePDFAll(employee, date, mode) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/admin/getall`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        console.log("responsessss", response);

        const currentDate = date ? date : new Date(); // ใช้ค่า date ถ้ามีค่า ไม่งั้นใช้ค่าวันที่ปัจจุบัน
        date = currentDate;
        console.log("date", date);

        // Filter time data for the selected month and year from the calendar
        const timeData = response.data.data.filter(
          (item) =>
            parseInt(item.mount) === date.getMonth() + 1 && // เดือนเริ่มที่ 1
            parseInt(item.year) === date.getFullYear() &&
            (item.time_line === "เข้างานช่วงเช้า" ||
              item.time_line === "พักเที่ยง" ||
              item.time_line === "เข้างานช่วงบ่าย" ||
              item.time_line === "ลงเวลาออกงาน")
        );
        console.log("timeData", timeData);

        const response_ot = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getall/ot`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        console.log("response_ot", response_ot.data.data);

        const response_employees = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        console.log("response_employees", response_employees.data.data);

        const me = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        console.log("me", me.data.data);

        const getWorkOTStart = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.date === date && item.employee_id === employeeId
          );
          return otData ? otData.time_in : "-";
        };

        const getWorkOTFinish = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.date === date && item.employee_id === employeeId
          );
          return otData ? otData.time_out : "-";
        };

        if (timeData.length === 0) {
          Swal.fire({
            icon: "error",
            title: "ไม่พบข้อมูล",
            text: "ไม่พบข้อมูลการลงเวลาของพนักงานคนนี้ในเดือนและปีที่เลือก",
            customClass: {
              container: "null",
            },
          });
          return; // ไม่สร้าง PDF ถ้าไม่มีข้อมูล
        }

        function getPrintedTime() {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, "0");
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const formattedTime = `${hours}:${minutes}`;
          return formattedTime;
        }

        // const mount = dayjs(date)
        //   .add(543, "year")
        //   .locale("th")
        //   .format("MMMM YYYY");

        const employeeList = response_employees.data.data;

        // Aggregate time data by employee and date
        const aggregatedData = timeData.reduce((acc, curr) => {
          const dateKey = `${curr.employee_id}_${curr.day}/${curr.mount}/${curr.year}`;
          if (!acc[dateKey]) {
            acc[dateKey] = {
              employee_id: curr.employee_id,
              day: curr.day,
              mount: curr.mount,
              year: curr.year,
              time_in_morning: "-",
              time_out_morning: "-",
              time_in_afternoon: "-",
              time_out_afternoon: "-",
            };
          }
          if (curr.time_line === "เข้างานช่วงเช้า") {
            acc[dateKey].time_in_morning = curr.time;
          } else if (curr.time_line === "พักเที่ยง") {
            acc[dateKey].time_out_morning = curr.time;
          } else if (curr.time_line === "เข้างานช่วงบ่าย") {
            acc[dateKey].time_in_afternoon = curr.time;
          } else if (curr.time_line === "ลงเวลาออกงาน") {
            acc[dateKey].time_out_afternoon = curr.time;
          }
          return acc;
        }, {});
        console.log("Aggregated Data:", aggregatedData);

        // กำหนดวันที่เริ่มต้นและสิ้นสุดของ loop
        let startDay = 1;
        let endDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();

        // ถ้ามี date แสดงว่าเลือกวันเดียว
        if (mode === 1) {
          startDay = date.getDate();
          endDay = date.getDate();
        }

        for (let day = startDay; day <= endDay; day++) {
          // คำนวณวันที่แบบเต็ม
          const formattedDate = dayjs(
            new Date(date.getFullYear(), date.getMonth(), day)
          )
            .locale("th")
            .format("วันที่ D MMMM YYYY");
          const content = await `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+Thai:wght@100..900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800&display=swap');

          body {
            font-family: "Sarabun", sans-serif;
            font-weight: 300;
            font-style: normal;
            font-size: 13px;
          }
        </style>
        <body>
          <div class="px-5">
            <div class="flex flex-row">
              <div class="flex ">
                <img src="${Logo}" class="w-full max-w-26 h-26">
              </div>
              <div class="flex flex-col items-center ">
                <div class="flex ml-72">
                  <p>แบบรายงานเวลาปฏิบัติงานพนักงาน</p>
                </div>
                <div class="flex ml-72">
                  <p class="indent-5">บริษัท ดิจิตอลดิเวลล็อปเปอร์เซอร์วิสเซ็นเตอร์จำกัด</p>
                </div>
                <div class="flex ml-72">
                  <p class="indent-5">${formattedDate}</p>
                </div>
                <div class="flex ml-52">
                </div>
              </div>
            </div>
            <div>
            </div>
            <table class="w-full mt-1 border-2 border-solid border-black text-center">
              <thead>
                <tr>
                  <th class="border border-solid border-black w-10" rowspan="2">ลำดับ</th>
                  <th class="border border-solid border-black w-32" rowspan="2">รหัสพนักงาน</th>
                  <th class="border border-solid border-black w-32" rowspan="2">ชื่อพนักงาน</th>
                  <th class="border border-solid border-black py-1" colspan="2">เช้า</th>
                  <th class="border border-solid border-black py-1" colspan="2">บ่าย</th>
                  <th class="border border-solid border-black py-1" colspan="2">OT</th>
                  <th class="border border-solid border-black" rowspan="2">หมายเหตุ</th>
                </tr>
                <tr>
                  <th class="border border-solid border-black py-1">เวลาเข้า</th>
                  <th class="border border-solid border-black py-1">เวลาออก</th>
                  <th class="border border-solid border-black py-1">เวลาเข้า</th>
                  <th class="border border-solid border-black py-1">เวลาออก</th>
                  <th class="border border-solid border-black py-1">เวลาเริ่ม</th>
                  <th class="border border-solid border-black py-1">เวลาสิ้นสุด</th>
                </tr>
              </thead>
              <tbody>
                ${Object.values(aggregatedData)
                  .filter(
                    (data) =>
                      parseInt(data.day) === day &&
                      parseInt(data.mount) === date.getMonth() + 1 &&
                      parseInt(data.year) === date.getFullYear()
                  )
                  .map((data, index) => {
                    const date = dayjs(
                      `${data.day}/${data.mount}/${data.year}`,
                      "DD/MM/YYYY"
                    ).locale("th");
                    const employeeDetails = employeeList.find(
                      (emp) => emp._id === data.employee_id
                    );
                    return `
                      <tr class="">
                        <td class="border border-solid border-black py-1">${
                          index + 1
                        }</td>
                        <td class="text-left border border-solid border-black">
                          ${employeeDetails?.employee_number || "-"}
                        </td>
                        <td class="text-left border border-solid border-black">
                          ${employeeDetails?.name_title || ""}
                          ${employeeDetails?.first_name || ""}
                          ${
                            employeeDetails?.last_name || ""
                          }                              
                        </td>
                        <td class="text-center border border-solid border-black">${
                          data.time_in_morning || "-"
                        }</td>
                        <td class="text-center border border-solid border-black">${
                          data.time_out_morning || "-"
                        }</td>
                        <td class="text-center border border-solid border-black">${
                          data.time_in_afternoon || "-"
                        }</td>
                        <td class="text-center border border-solid border-black">${
                          data.time_out_afternoon || "-"
                        }</td>
                        <td class="text-center border border-solid border-black">${
                          getWorkOTStart(
                            data.employee_id,
                            date.format("DD/MM/YYYY")
                          ) || "-"
                        }</td>
                        <td class="text-center border border-solid border-black">${
                          getWorkOTFinish(
                            data.employee_id,
                            date.format("DD/MM/YYYY")
                          ) || "-"
                        }</td>
                        <td class="text-center border border-solid border-black"></td>
                      </tr>
                    `;
                  })
                  .join("")}
              </tbody>
            </table>

            <div class="footer flex justify-end bg-white px-5">
              <p>ผู้พิมพ์: ${me.data.data.name_title || "-"}${
            me.data.data.first_name || "-"
          } ${me.data.data.last_name || "-"} เวลาพิมพ์: ${getPrintedTime()}</p>
            </div>
          </div>
        </body>
      `;

          const opt = {
            html2canvas: { scale: 3 },
            margin: 0.1,
            filename: `${employee.first_name}_${
              date.getMonth() + 1
            }-${date.getFullYear()}_report_${day}.pdf`, // เพิ่มหมายเลขหน้าลงในชื่อไฟล์
            jsPDF: {
              unit: "in",
              format: "a4",
              orientation: "landscape",
              quality: "1",
            },
          };

          const pdf = await html2pdf()
            .set(opt)
            .from(content)
            .toPdf()
            .get("pdf");
          pdf.output("dataurlnewwindow");
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    },
    async generatePDF(employee, date) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/admin/getall`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );

        // Filter time data for the selected employee and the selected month and year from the calendar
        const timeData = response.data.data.filter(
          (item) =>
            item.employee_id === employee._id &&
            parseInt(item.mount) === date.getMonth() + 1 && // เดือนเริ่มที่ 1
            parseInt(item.year) === date.getFullYear() &&
            (item.time_line === "เข้างานช่วงเช้า" ||
              item.time_line === "เข้างานช่วงบ่าย" ||
              item.time_line === "ลงเวลาออกงาน")
        );

        const response_ot = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getall/ot`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        const me = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        const getWorkOTStart = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.employee_id === employeeId && item.date === date
          );
          return otData ? otData.time_in : "-";
        };

        const getWorkOTFinish = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.employee_id === employeeId && item.date === date
          );
          return otData ? otData.time_out : "-";
        };

        if (timeData.length === 0) {
          Swal.fire({
            icon: "error",
            title: "ไม่พบข้อมูล",
            text: "ไม่พบข้อมูลการลงเวลาของพนักงานคนนี้ในเดือนและปีที่เลือก",
            customClass: {
              container: "null",
            },
          });
          return; // ไม่สร้าง PDF ถ้าไม่มีข้อมูล
        }

        function getPrintedTime() {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, "0");
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const formattedTime = `${hours}:${minutes}`;
          return formattedTime;
        }

        const mount = dayjs(date)
          .add(543, "year")
          .locale("th")
          .format("MMMM YYYY");

        const opt = {
          html2canvas: { scale: 3 },
          margin: 0.1,
          filename: `${employee.first_name}_${
            date.getMonth() + 1
          }-${date.getFullYear()}_report.pdf`,
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "landscape",
            quality: "1",
          },
        };
        const content = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+Thai:wght@100..900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

                body {
                    font-family: "Sarabun", sans-serif;
                    font-weight: 300;
                    font-style: normal;
                    font-size: 16px;
                }
            </style>
            <body>
                <div class="px-5">
                    <div class="flex flex-row">
                        <div class="flex ">
                            <img src="${Logo}" class="w-full max-w-32 h-32">
                        </div>
                        <div class="flex flex-col items-center ">
                            <div class="flex ml-52">
                                <p>แบบรายงานเวลาปฏิบัติงานพนักงาน</p>
                            </div>
                            <div class="flex ml-52">
                                <p class="indent-5">บริษัท ดิจิตอลดิเวลล็อปเปอร์เซอร์วิสเซ็นเตอร์จำกัด</p>
                            </div>
                            <div class="flex ml-52">
                                <p class="indent-5">ประจำเดือน ${mount}</p>
                            </div>
                            <div class="flex ml-52">
                            </div>
                        </div>
                    </div>
                    <div>
                    <p> 
                        <span class=" ml-2"> รหัสพนักงาน <span> ${
                          employee.employee_number
                        } </span> </span>
                        <span class=" ml-2"> ชื่อ <span> ${
                          employee.name_title
                        }${employee.first_name} ${
          employee.last_name
        }  </span> </span>
                        <span class="ml-2"> ชื่อเล่น <span> ${
                          employee.nick_name
                        } </span> </span>
                        <span class=" ml-2"> ตำแหน่ง <span> ${
                          employee.position
                        } </span> </span>
                    </p>
                    </div>
                    <table class="w-full mt-1 border-2 border-solid border-black text-center">
                      <thead>
                        <tr>
                            <th class="border border-solid border-black w-10" rowspan="2">ลำดับ</th>
                            <th class="border border-solid border-black" colspan="2">วันที่</th>
                            <th class="border border-solid border-black py-1" colspan="2">เช้า</th>
                            <th class="border border-solid border-black py-1" colspan="2">บ่าย</th>
                            <th class="border border-solid border-black py-1" colspan="2">OT</th>
                            <th class="border border-solid border-black" rowspan="2">ลงเวลาออก</th>
                            <th class="border border-solid border-black" rowspan="2">หมายเหตุ</th>
                        </tr>
                        <tr>
                            <th class="border border-solid border-black py-1">วัน</th>
                            <th class="border border-solid border-black py-1">วันที่</th>
                            <th class="border border-solid border-black py-1">เวลาเข้า</th>
                            <th class="border border-solid border-black py-1">เวลาออก</th>
                            <th class="border border-solid border-black py-1">เวลาเข้า</th>
                            <th class="border border-solid border-black py-1">เวลาออก</th>
                            <th class="border border-solid border-black py-1">เวลาเริ่ม</th>
                            <th class="border border-solid border-black py-1">เวลาสิ้นสุด</th>
                        </tr>
                      </thead>
                        <tbody>
                            ${
                              timeData.length === 0
                                ? '<tr><td colspan="11" class="text-center py-5 text-xl">ไม่พบข้อมูล</td></tr>'
                                : timeData
                                    .map((data, index) => {
                                      const date = dayjs(
                                        `${data.day}/${data.mount}/${data.year}`,
                                        "DD/MM/YYYY"
                                      ).locale("th");
                                      return `
                                        <tr class="">
                                            <td class="border border-solid border-black py-1">${
                                              index + 1
                                            }</td>
                                            <td class="border border-solid border-black text-left">${date.format(
                                              "วันdddd"
                                            )}</td>
                                            <td class="border border-solid border-black text-left">${date.format(
                                              "ที่ DD"
                                            )}</td>
                                            <td class="text-center border border-solid border-black">${
                                              data.time_line ===
                                              "เข้างานช่วงเช้า"
                                                ? data.time
                                                : "-"
                                            }</td>
                                            <td class="text-center border border-solid border-black">${
                                              data.time_line ===
                                              "ออกงานช่วงเช้า"
                                                ? data.time
                                                : "-"
                                            }</td>
                                            <td class="text-center border border-solid border-black">${
                                              data.time_line ===
                                              "เข้างานช่วงบ่าย"
                                                ? data.time
                                                : "-"
                                            }</td>
                                            <td class="text-center border border-solid border-black">${
                                              data.time_line ===
                                              "ออกงานช่วงบ่าย"
                                                ? data.time
                                                : "-"
                                            }</td>
                                            <td class="text-center border border-solid border-black">${getWorkOTStart(
                                              employee._id,
                                              date.format("DD/MM/YYYY")
                                            )}</td>
                                            <td class="text-center border border-solid border-black">${getWorkOTFinish(
                                              employee._id,
                                              date.format("DD/MM/YYYY")
                                            )}</td>
                                            <td class="text-center border border-solid border-black">${
                                              data.time_line === "ลงเวลาออกงาน"
                                                ? data.time
                                                : "-"
                                            }</td>
                                            <td class="text-center border border-solid border-black"></td>
                                        </tr>
                                    `;
                                    })
                                    .join("")
                            }
                        </tbody>
                    </table>

                    </table>
                </div>
                
                <div class="footer flex justify-end bg-white px-5">
                    <p>ผู้พิมพ์: ${me.data.data.name_title}${
          me.data.data.first_name
        } ${me.data.data.last_name} เวลาพิมพ์: ${getPrintedTime()}</p>  
                </div>
            </body>
                `;
        const pdf = html2pdf().set(opt).from(content).toPdf().get("pdf");
        pdf.output("dataurlnewwindow");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    },
    async showOT(employee, date) {
      try {
        const response_ot = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getall/ot`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );

        const me = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );

        const getWorkOTStart = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.employee_id === employeeId && item.date === date
          );
          return otData ? otData.time_in : "-";
        };

        const getWorkOTFinish = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.employee_id === employeeId && item.date === date
          );
          return otData ? otData.time_out : "-";
        };

        const getWorkOTDuration = (employeeId, date) => {
          const otData = response_ot.data.data.find(
            (item) => item.employee_id === employeeId && item.date === date
          );
          return otData ? otData.total_ot : "-";
        };

        const otData = response_ot.data.data.filter(
          (item) =>
            item.employee_id === employee._id &&
            dayjs(item.date, "DD/MM/YYYY").isSame(date, "month") &&
            dayjs(item.date, "DD/MM/YYYY").isSame(date, "year")
        );

        if (otData.length === 0) {
          Swal.fire({
            icon: "error",
            title: "ไม่พบข้อมูล",
            text: "ไม่พบข้อมูลการลงเวลาของพนักงานคนนี้ในเดือนและปีที่เลือก",
            customClass: {
              container: "null",
            },
          });
          return; // ไม่สร้าง PDF ถ้าไม่มีข้อมูล
        }

        function getPrintedTime() {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, "0");
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const formattedTime = `${hours}:${minutes}`;
          return formattedTime;
        }

        const mount = dayjs(date)
          .add(543, "year")
          .locale("th")
          .format("MMMM YYYY");

        const opt = {
          html2canvas: { scale: 3 },
          margin: 0.1,
          filename: `${employee.first_name}_${
            date.getMonth() + 1
          }-${date.getFullYear()}_report.pdf`,
          jsPDF: {
            unit: "in",
            format: "letter",
            orientation: "landscape",
            quality: "1",
          },
        };

        const content = `
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+Thai:wght@100..900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

                        body {
                            font-family: "Sarabun", sans-serif;
                            font-weight: 300;
                            font-style: normal;
                            font-size: 16px;
                        }
                    </style>
            <body>
                <div class="px-5">
                    <div class="flex flex-row">
                        <div class="flex ">
                            <img src="${Logo}" class="w-full max-w-32 h-32">
                        </div>
                        <div class="flex flex-col items-center ">
                            <div class="flex ml-52">
                                <p>ลงเวลาปฏฺิบัติงานนอกเวลาทำการ</p>
                            </div>
                            <div class="flex ml-52">
                                <p class="indent-5">บริษัท ดิจิตอลดิเวลล็อปเปอร์เซอร์วิสเซ็นเตอร์จำกัด</p>
                            </div>
                            <div class="flex ml-52">
                                <p class="indent-5">ประจำเดือน ${mount}</p>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                    <p> 
                        <span class=" ml-2"> รหัสพนักงาน <span> ${
                          employee.employee_number
                        } </span> </span>
                        <span class=" ml-2"> ชื่อ <span> ${
                          employee.name_title
                        }${employee.first_name} ${
          employee.last_name
        }  </span> </span>
                        <span class="ml-2"> ชื่อเล่น <span> ${
                          employee.nick_name
                        } </span> </span>
                        <span class=" ml-2"> ตำแหน่ง <span> ${
                          employee.position
                        } </span> </span>
                    </p>
                    </div>
                    <table class="w-full mt-1 border-2 border-solid border-black text-center">
                    <tr>
                        <th class="border border-solid border-black w-10" rowspan="2">ลำดับ</th>
                        <th class="border border-solid border-black" colspan="2">วันที่</th>
                        <th class="border border-solid border-black py-1" colspan="3">OT</th>
                        <th class="border border-solid border-black" rowspan="2">หมายเหตุ</th>
                    </tr>
                    <tr>
                        <th class="border border-solid border-black py-1">วัน</th>
                        <th class="border border-solid border-black py-1">วันที่</th>
                        <th class="border border-solid border-black py-1">เวลาเริ่ม</th>
                        <th class="border border-solid border-black py-1">เวลาเริ่ม</th>
                        <th class="border border-solid border-black py-1">เวลาสิ้นสุด</th>
                    </tr>
                    <tbody>
                        ${
                          otData.length === 0
                            ? '<tr><td colspan="9" class="text-center py-5 text-xl">ไม่พบข้อมูล</td></tr>'
                            : otData
                                .map((data, index) => {
                                  const date = dayjs(
                                    data.date,
                                    "DD/MM/YYYY"
                                  ).locale("th");
                                  return `
                                    <tr>
                                        <td class="border border-solid border-black py-1">${
                                          index + 1
                                        }</td>
                                        <td class="border border-solid border-black text-left">${date.format(
                                          "วันdddd"
                                        )}</td>
                                        <td class="border border-solid border-black text-left">${date.format(
                                          "ที่ DD"
                                        )}</td>
                                        <td class="text-center border border-solid border-black">${getWorkOTStart(
                                          employee._id,
                                          data.date
                                        )}</td>
                                        <td class="text-center border border-solid border-black">${getWorkOTFinish(
                                          employee._id,
                                          data.date
                                        )}</td>
                                        <td class="text-center border border-solid border-black">${getWorkOTDuration(
                                          employee._id,
                                          data.date
                                        )}</td>
                                        <td class="text-center border border-solid border-black"></td>
                                    </tr>
                                `;
                                })
                                .join("")
                        }
                    </tbody>
                </table>

                </div>
                
                <div class="footer flex justify-end bg-white px-5">
                    <p>ผู้พิมพ์: ${me.data.data.name_title}${
          me.data.data.first_name
        } ${me.data.data.last_name} เวลาพิมพ์: ${getPrintedTime()}</p>  
                </div>
                    </body>
                `;
        const pdf = html2pdf().set(opt).from(content).toPdf().get("pdf");
        pdf.output("dataurlnewwindow");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    },
    getWorkOTStart(employeeId) {
      const otData = this.ot.find(
        (item) =>
          item.employee_id === employeeId &&
          item.date === this.formatSelectedDate()
      );
      // console.log('formatSelectedDate',this.formatSelectedDate());
      return otData?.time_in || "-";
    },
    getWorkOTFinish(employeeId) {
      const otData = this.ot.find(
        (item) =>
          item.employee_id === employeeId &&
          item.date === this.formatSelectedDate()
      );
      return otData?.time_out || "-";
    },
    getWorkOTDuration(employeeId) {
      const otData = this.ot.find(
        (item) =>
          item.employee_id === employeeId &&
          item.date === this.formatSelectedDate()
      );
      return otData?.total_ot || "-";
    },
    formatSelectedDate() {
      const selectedDate = this.selectedDate;
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async getOT() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getall/ot`,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        this.ot = response.data.data;
        console.log("123", response.data.data);
        this.fetchTimeInOut();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    formatDateThai(date) {
      // แปลงเป็นวันที่ไทย
      dayjs.locale("th");
      return dayjs(date).format("วันที่ D เดือน MMMM พ.ศ. YYYY");
    },
    getCurrentDateThai() {
      // ใช้ dayjs เพื่อดึงวันที่ปัจจุบันและเวลาเรียลทาม
      const thaiDate = dayjs().locale("th").format("DD MMMM YYYY");
      this.currentDateThai = thaiDate; // เอาเฉพาะวันที่และเดือนภาษาไทย
    },
    async getdata() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        this.employees = response.data.data;
        this.fetchTimeInOut();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async fetchTimeInOut() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/time/admin/getall`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        const currentDate = this.selectedDate || new Date();
        // กรองข้อมูลเฉพาะเวลาที่ตรงกับวันที่ที่เลือกหรือวันปัจจุบัน
        this.timeData = response.data.data.filter(
          (item) =>
            parseInt(item.day) === currentDate.getDate() &&
            parseInt(item.mount) === currentDate.getMonth() + 1 && // เดือนเริ่มที่ 1
            parseInt(item.year) === currentDate.getFullYear()
        );
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },
    getWorkTime(employeeId, timeLine) {
      const workTime = this.timeData.find(
        (item) => item.employee_id === employeeId && item.time_line === timeLine
      );
      return workTime ? workTime.time : "-";
    },
    handleDateSelect() {
      this.fetchTimeInOut();
    },
    showDetails(employee) {
      this.selectedEmployee = employee;
      this.showEmployeeDetails = true;
    },
    showPDF1(employee) {
      this.showPDFdata = employee;
      this.showPDF = true;
    },
    getAttendanceClass(employeeId, timeLine) {
      const workTime = this.timeData.find(
        (item) => item.employee_id === employeeId && item.time_line === timeLine
      );
      // console.log("workTime", workTime);
      if (!workTime) return "";

      const timeParts = workTime.time.split(":");
      const hour = parseInt(timeParts[0]);
      const minute = parseInt(timeParts[1]);

      if (timeLine === "เข้างานช่วงเช้า") {
        if (hour === 7 || hour === 8 || (hour === 9 && minute <= 10)) {
          return "text-green-700"; // ไม่สาย
        } else if ((hour === 9 && minute > 10) || (hour >= 10 && hour < 12)) {
          return "text-red-700"; // สาย
        } else {
          return "text-yellow-700"; // เวลาออกงาน or not applicable
        }
      } else if (timeLine === "พักเที่ยง") {
        if (hour === 12 && minute <= 20) {
          return "text-green-700";
        } else {
          return "text-yellow-700";
        }
      } else if (timeLine === "เข้างานช่วงบ่าย") {
        if ((hour === 12 && minute >= 20) || (hour === 13 && minute <= 10)) {
          return "text-green-700"; // ไม่สาย
        } else if (hour > 13 || (hour === 13 && minute > 10)) {
          return "text-red-700"; // สาย
        } else {
          return "text-yellow-700"; // เวลาออกงาน or not applicable
        }
      } else {
        return "text-yellow-700"; // เวลาออกงาน or not applicable
      }
    },

    async editEmp(items, time) {
      // this.selectedEmployee = items;
      try {
        if ((items, time)) {
          this.selectedEmployee = { items, time };
          console.log(this.selectedEmployee);
          this.showEdit = true;
        } else {
          const time = new Date(items.time_new);
          const formattedTime = time.toLocaleTimeString("th-TH"); // หรือแยกชั่วโมง นาที วินาที ตามที่คุณต้องการ

          const selectedDate = new Date(this.selectedDate);
          const day = selectedDate.getDate().toString().padStart(2, "0");
          const month = (selectedDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const year = selectedDate.getFullYear().toString();

          const data = {
            employee_id: items.items._id,
            time: formattedTime,
            day: day,
            mount: month,
            year: year,
            time_line: items.time, //เข้างานช่วงเช้า, พักเที่ยง, เข้างานช่วงบ่าย, ลงเวลาออกงาน
            remark: "",
          };

          // console.log(data);
          if (data.time === "Invalid Date") {
            Swal.fire({
              title: "โปรดลงเวลาก่อน",
              icon: "error",
              confirmButtonText: "ตกลง",
              timer: 2500,
            });
            return;
          }
          const response = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/time/update/time`,
            data,
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          );

          console.log("แก้ไขเวลาเรียบร้อย", response);
          Swal.fire({
            title: "แก้ไขเวลาเรียบร้อย",
            icon: "success",
            confirmButtonText: "ตกลง",
            timer: 2500,
          });
          this.getOT();
          this.getdata();
          this.getCurrentDateThai();
          this.showEdit = false;
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "error",
          icon: "error",
          confirmButtonText: "ตกลง",
          timer: 2500,
        });
      }
    },
  },
};
</script>
<style>
.null {
  z-index: 9999;
  /* กำหนดค่า Z-Index ที่ต้องการ */
}
</style>
