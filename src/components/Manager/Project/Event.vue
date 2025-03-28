<template>
<Sidebar v-model:visible="Detailsvisible" header="ข้อมูลเพิ่มเติม" position="left" class="w-full md:w-4/12">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">รหัสโปรเจค</label>
      <p>{{ detailEmployee.type }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">ชื่ออีเว้นท์</label>
      <p>{{ detailEmployee.content }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">เวลาเริ่มต้น</label>
      <p>{{ detailEmployee.time_start }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">เวลาสิ้นสุด</label>
      <p>{{ detailEmployee.time_out }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">สถานะ</label>
      <p>{{ detailEmployee.status }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">วันเวลานัดหมาย</label>
      <p>{{ new Date(detailEmployee.due_date).toLocaleDateString() }}</p>
    </div>
    <div class="col-span-2">
      <label class="block text-sm font-bold mb-2">รายละเอียดอีเว้นท์</label>
      <p>{{ detailEmployee.detail }}</p>
    </div>
  </div>
</Sidebar>


<Dialog v-model:visible="showEditDialog" :modal="true" class="w-full max-w-xl" header="แก้ไขข้อมูลอีเว้นท์">
  <form class="px-4 sm:px-10 mt-2 sm:mt-5" @submit.prevent="submitEdit">
    <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-2">
      <div>
        <label for="eventType" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภท</label>
          <div class="relative">
            <select v-model="editEmployee.type" id="editEventType" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" required>
              <option value="" disabled selected>โปรดเลือกประเภท</option>  
              <option value="warning">นัดหมาย (สีเหลือง)</option>
              <option value="success">ประชุม (สีเขียว)</option>
              <option value="error">งาน (สีแดง)</option>
            </select>
          </div>
      </div>
      
      <div>
    <label for="status" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">สถานะ</label>
    <select v-model="editEmployee.status" id="editStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" required>
      <option value="" disabled selected>โปรดเลือกสถานะ</option>
      <option value="ยกเลิก">ยกเลิก</option>
      <option value="สำเร็จลุล่วง">สำเร็จลุล่วง</option>
      <option value="รอวันนัดหมาย">รอวันนัดหมาย</option>
      <option value="เลื่อนกำหนด">เลื่อนกำหนด</option>
    </select>
  </div>

    <div>
    <label for="projectTitle" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่ออีเว้นท์</label>
    <input v-model="editEmployee.content" type="text" id="editEventContent" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" placeholder="" required />
  </div>

  
  <div>
        <label for="editProjectDueDate" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันเวลานัดหมาย</label>
        <Calendar1 v-model="editEmployee.due_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 sm:p-2.5" required />
      </div>
      
  <div>
    <label for="timeStart" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เวลาเริ่มต้น</label>
    <input v-model="editEmployee.time_start" type="time" id="editTimeStart" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 sm:p-2.5" required />
  </div>

  <div>
    <label for="timeOut" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เวลาสิ้นสุด</label>
    <input v-model="editEmployee.time_out" type="time" id="editTimeOut" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 sm:p-2.5" required />
  </div>
    

  <div class="col-span-2">
        <label for="detail" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รายละเอียดเพิ่มเติม</label>
        <textarea v-model="editEmployee.detail" id="editEventDetail" rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" placeholder=""></textarea>
      </div>

  
    <div class="flex items-center justify-between mt-4">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        บันทึก
      </button>
    </div>
  </div>
  </form>
</Dialog>

<Dialog v-model:visible="showDialog" :modal="true" class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2" header="เพิ่มอีเว้นท์ใหม่" >
  <form class="px-4 sm:px-10 mt-2 sm:mt-5" @submit.prevent="submit">
    <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-2">
      <div>
        <label for="eventType" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภท</label>
        <select v-model="newEvent.type" id="eventType" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" required>
          <option value="" disabled selected>โปรดเลือกประเภท</option>  
          <option value="warning">นัดหมาย (สีเหลือง)</option>
          <option value="success">ประชุม (สีเขียว)</option>
          <option value="error">งาน (สีแดง)</option>
        </select>
      </div>

      <div>
        <label for="status" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">สถานะ</label>
        <select v-model="newEvent.status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" required>
          <option value="" disabled selected>โปรดเลือกสถานะ</option>
          <option value="รอวันนัดหมาย">รอวันนัดหมาย</option>
        </select>
      </div>

      <div>
        <label for="projectTitle" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่ออีเว้นท์</label>
        <input v-model="newEvent.content" type="text" id="projectTitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" placeholder="" required />
      </div>

      <div>
        <label for="projectTitle" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันเวลานัดหมาย</label>
        <Calendar1 v-model="newEvent.due_date" id="projectTitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 sm:p-2.5" placeholder="" required />
      </div>

      <div>
        <label for="timeStart" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เวลาเริ่มต้น</label>
        <input v-model="newEvent.time_start" type="time" id="timeStart" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 sm:p-2.5" required />
      </div>

      <div>
        <label for="timeOut" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เวลาสิ้นสุด</label>
        <input v-model="newEvent.time_out"  type="time" id="timeOut" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 sm:p-2.5" required />
      </div>

      <div class="col-span-2">
        <label for="detail" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รายละเอียดเพิ่มเติม</label>
        <textarea v-model="newEvent.detail" id="detail" rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" placeholder=""></textarea>
      </div>

      
    </div>
    <div class="mb-6">
      <button type="submit" class="bg-blue-500 text-white px-2 text-base sm:px-4 py-1 sm:py-1 rounded-xl transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none">เพิ่มโปรเจค</button>
    </div>
  </form>
</Dialog>

<Sidebar v-model:visible="showEventDialog" header="ข้อมูลอีเว้นท์" position="right" class="w-full md:w-3/12">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">ชื่ออีเว้นท์</label>
      <p>{{ selectedEvent.content }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">เวลาเริ่มต้น</label>
      <p>{{ selectedEvent.time_start }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">เวลาสิ้นสุด</label>
      <p>{{ selectedEvent.time_out }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">สถานะ</label>
      <p>{{ selectedEvent.status }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-sm font-bold mb-2">วันเวลานัดหมาย</label>
      <p>{{ new Date(selectedEvent.due_date).toLocaleDateString() }}</p>
    </div>
    <div class="col-span-2">
      <label class="block text-sm font-bold mb-2">รายละเอียดอีเว้นท์</label>
      <p>{{ selectedEvent.detail }}</p>
    </div>
  </div>
</Sidebar>


 
<div class="grid grid-cols-1 gap-0 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full">
    <!-- Left Column -->
    <div class="">
      <body class="antialiased font-sans bg-cyan-200 ">
        <div class="container mx-auto px-4 sm:px-8">
          <div class="py-8">
              <div>
                <h2 class="text-4xl font-semibold leading-tight text-blue-950">รายการอีเว้นท์</h2>
              </div>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <button @click="showDialog = true" class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                    เพิ่มอีเว้นท์ใหม่
                  </button>
                </div>
                <div class="my-2 flex sm:flex-row flex-col">
                  <div class="flex flex-row mb-1 sm:mb-0"> <a class="flex items-center mr-2 font-medium text-lg">ประเภท: </a>
                    <div class="relative">
                      <select v-model="filterType" class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                          <option value="All">ทั้งหมด</option>
                          <option value="warning">นัดหมาย</option>
                          <option value="error">งาน</option>
                          <option value="success">ประชุม</option>
                        </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="block relative">
                    <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                      <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                        <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                      </svg>
                    </span>
                    <input v-model="searchQuery" placeholder="ค้นหาชื่อ" class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                  </div>
                </div>
              </div>
            
            

            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ชื่ออีเว้นท์
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ประเภท
                      </th>
                      <th class="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                        วันเวลานัดหมาย
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ตัวเลือก
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Iterate over events in eventData -->
                    <tr v-for="(event, index) in paginatedData" :key="event._id">
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div class="flex items-center">
                          <div class="ml-3">
                            <!-- Access event properties -->
                            <p class="text-gray-900 whitespace-no-wrap">{{ event.content }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div :class="{
                        'bg-yellow-200': event.type === 'warning',
                        'bg-green-200': event.type === 'success',
                        'bg-red-200': event.type === 'error'
                      }" class="flex items-center justify-center px-3 py-1 rounded-lg ">
                        <p :class="{
                          'text-yellow-900': event.type === 'warning',
                          'text-green-900': event.type === 'success',
                          'text-red-900': event.type === 'error'
                        }" class="whitespace-no-wrap font-semibold flex justify-center mt-3"> <!-- Add 'flex justify-center' here -->
                          <span v-if="event.type === 'warning'">นัดหมาย</span>
                          <span v-if="event.type === 'success'">ประชุม</span>
                          <span v-if="event.type === 'error'">งาน</span>
                        </p>
                      </div>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <!-- Access event properties and format date -->
                        <p class="text-gray-900 whitespace-no-wrap flex justify-center">{{ new Date(event.due_date).toLocaleDateString() }}</p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button class="text-blue-500 " @click="viewDetails(event)">
                          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </button>
                        <button class="text-yellow-500 ml-2"@click="editEvent(event)">
                          <svg class="h-8 w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button @click="confirmDelete(event._id)" class="text-red-500 ml-2">
                          <svg class="h-8 w-8" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"></path>
                            <line x1="4" y1="7" x2="20" y2="7"></line>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Pagination -->
                <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                  <div class="inline-flex mt-2 xs:mt-0">
                    <button @click="currentPage > 1 ? currentPage-- : null" class="mr-2 text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                      ก่อนหน้า
                    </button>
                    <button @click="currentPage < Math.ceil(eventData.length / perPage) ? currentPage++ : null" class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                      ถัดไป
                    </button>
                  </div>
                  <span class="text-gray-700 text-base mt-2">หน้า {{ currentPage }} จาก {{ Math.ceil(eventData.length / perPage) }}</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </body>
    </div>


  

<!-- Right Column -->
<div class="md:w-s h-screen">
  <div class="flex items-center justify-center mt-3">
    <h2 class="text-xl md:text-xl lg:text-3xl font-semibold text-blue-950">วันที่ปัจจุบัน: {{ currentDateThai }}</h2>
  </div>

  <!-- Calendar component -->
  <a-calendar v-model:value="value" class=" ">
    <template #dateCellRender="{ current }">
      <ul class="events">
        <!-- Render events from getListData -->
        <li v-for="item in getListData(current)" :key="item.content" @click="showEventDetails(item)">
          <a-badge :status="item.type" :text="item.content" class="text-black text-base md:text-lg lg:text-xl font-medium rounded-md px-2 mt-2" :class="{
            'bg-amber-200': item.type === 'warning',
            'bg-lime-300': item.type === 'success',
            'bg-red-200': item.type === 'error'
          }" />
        </li>

      </ul>
    </template>
  </a-calendar>
</div>

  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { Calendar } from 'ant-design-vue';
import Dialog from 'primevue/dialog';
import Swal from 'sweetalert2';
import Sidebar from 'primevue/sidebar';
import Calendar1 from 'primevue/calendar';

export default {
  components: {
    aCalendar: Calendar,
    Dialog,
    Sidebar,
    Calendar1,
  },

  data() {
  return {
    showEventDialog: false,
      showProjectDialog: false,
      selectedEvent: {},
      selectedProject: {},
    searchQuery: '', // เพิ่ม searchQuery
    filterType: 'All', // เพิ่ม filterType
    currentDateThai: '',
    currentPage: 1,
    perPage: 3, // จำนวนรายการต่อหน้า
    showEditDialog: false,
    Detailsvisible: false,
    eventData:[],
    newEvent: {
      type: '',
      content: '',
      detail: '',
      time_start: '',
      time_out: '',
      due_date: '',
      status:'',
    },
      showDialog: false,
      detailEmployee: {}, 
      editEmployee:{},
  };
},
computed: {
  paginatedData() {
    // กรองข้อมูลก่อนแบ่งหน้า
    const filteredData = this.eventData.filter(event => {
      // กรองตามชื่อ content โดยให้ตัวอักษรในชื่อ content มีส่วนที่ตรงกับคำค้นหา
      const contentMatch = event.content.toLowerCase().includes(this.searchQuery.toLowerCase());
      // กรองตามประเภท type
      const typeMatch = event.type === this.filterType || this.filterType === 'All';
      // คืนค่า true เมื่อข้อมูลสอดคล้องกับทั้งเงื่อนไขการค้นหาทั้งสอง
      return contentMatch && typeMatch;
    });

    // นับจำนวนหน้า
    const totalPages = Math.ceil(filteredData.length / this.perPage);

    // คำนวณหน้าปัจจุบันโดยใช้ตัวแปร currentPage
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;

    // คืนค่าข้อมูลที่ถูกกรองและแบ่งหน้า
    return filteredData.slice(start, end);
  }
},
mounted() {
  this.getCurrentDateThai();
    this.fetchEventData();
    this.fetchProjects(); // เพิ่มเรียกใช้ฟังก์ชั่นนี้
    setInterval(this.getCurrentDateThai, 1000); // อัพเดทเวลาทุกๆ 1 วินาที

  },

  methods: {
    showEventDetails(event) {
      this.selectedEvent = event;
      this.showEventDialog = true;
    },
    showProjectDetails(project) {
      this.selectedProject = project;
      this.showProjectDialog = true;
    },
    getCurrentDateThai() {
  // ใช้ dayjs เพื่อดึงวันที่ปัจจุบันและเวลาเรียลทาม
  const thaiDate = dayjs().locale('th').format('DD MMMM YYYY');
  this.currentDateThai = thaiDate; // เอาเฉพาะวันที่และเดือนภาษาไทย
},

    editEvent(event) {
  this.editEmployee = event;
  this.showEditDialog = true; // เปิดโมดัลของการแก้ไขข้อมูล
},
    async submitEdit() {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/event/update/${this.editEmployee._id}`,
      this.editEmployee,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    // Assuming successful response handling here
    console.log('Event updated successfully');
    // Show success message using Swal
    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Event updated successfully',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        container: 'aa',
      }
    });
    // Close dialog and refresh data
    this.showEditDialog = false;
    this.fetchEventData();
  } catch (error) {
    console.error("Error updating event:", error);
    // Show error message using Swal
    await Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Failed to update event. Please try again later.',
      customClass: {
        container: 'aa',
      }
    });
  }
},
    viewDetails(event) {
    this.detailEmployee = event; // กำหนดค่าให้กับ detailEmployee
    this.Detailsvisible = true;
  },
    async confirmDelete(id) {
  const result = await Swal.fire({
    title: 'ยืนยันการลบ',
    text: 'คุณต้องการที่จะลบโปรเจคนี้หรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก'
  });

  if (result.isConfirmed) {
    // ถ้าผู้ใช้กดปุ่ม "ลบ"
    try {
      const response = await axios.delete(`${import.meta.env.VITE_VUE_APP_DECCAN}/event/delete/${id}`, {
        headers: { "auth-token": `${localStorage.getItem("token")}` },
      });
      // Notify that the deletion was successful
      await Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'ลบอีเว้นท์สำเร็จ',
        showConfirmButton: false,
        timer: 2000
      });
      // Reload the project data
      this.fetchEventData();
    } catch (error) {
      // Notify if there's an error deleting
      console.error('Error deleting project:', error);
      await Swal.fire({
        icon: 'error',
        title: 'ไม่สำเร็จ',
        text: 'ไม่สามารถลบอีเว้นท์ได้'
      });
    }
  }
},
    async submit() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/event/add/event`,
      this.newEvent,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    this.newEvent = {
        type: '',
        content: '',
        due_date: '',
        };
    // Assuming successful response handling here
    console.log('Event added successfully');
    // Show success message using Swal
    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Event added successfully',
      showConfirmButton: false,
          timer: 1500,
      customClass: {
        container: 'aa',
      }
    });
    // Close dialog and refresh data
    this.showDialog = false;
    this.fetchEventData();
  } catch (error) {
    console.error("Error adding event:", error);
    // Show error message using Swal
    await Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Failed to add event. Please try again later.',
      customClass: {
        container: 'aa',
      }
    });
  }
},

async fetchEventData() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/event/getevent`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    // Populate eventData with the fetched data
    this.eventData = response.data.events;
    this.eventData.forEach(event => {
          event.due_date = dayjs(event.due_date).locale('th').format('YYYY-MM-DD');
        });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
},
async fetchProjects() {
      try {
        this.isLoading = true;
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/requset/getall`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        this.projects = response.data.data;

        // แปลงเวลาในโซน UTC เป็นเวลาในโซนไทย
        this.projects.forEach(project => {
          project.due_date = dayjs(project.due_date).locale('th').format('YYYY-MM-DD');
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  setup() {
  const value = ref(); // ตัวแปรสำหรับเก็บค่าวันที่ปัจจุบัน
  const eventData = ref([]); // ตัวแปรสำหรับเก็บข้อมูลอีเว้นท์

  // ฟังก์ชั่นสำหรับการแสดงรายการอีเว้นท์ตามวันที่
  const getListData = (value) => {
    const dateString = dayjs(value).format('YYYY-MM-DD');
    const eventsOnDate = eventData.value.filter(event => dayjs(event.due_date).format('YYYY-MM-DD') === dateString);
    const listData = eventsOnDate.map(event => ({
      type: event.type,
      content: event.content, 
      time_start: event.time_start,
      time_out: event.time_out,
      due_date: event.due_date,
      status: event.status,
      detail: event.detail,
    }));
    return listData || [];
  };

  return { value, eventData, getListData};
},

};
</script>



<style >
.aa {
    z-index: 9999;
    /* กำหนดค่า Z-Index ที่ต้องการ */
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
