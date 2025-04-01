<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const timeinouts = ref([]);
const isLoading = ref(true);
const emID = localStorage.getItem('id');
const searchTerm = ref('');
const selectedMonth = ref('');
const selectedType = ref('all');

const fetchTimeinout = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/timeinout/employee/${emID}`);
    timeinouts.value = response.data.data;
    for (let timeinout of timeinouts.value) {
      fetchProjectID(timeinout);
    }
  } catch (error) {
    console.error("Error fetching logs:", error);
    Swal.fire({
      icon: "error",
      title: "ไม่สามารถโหลดข้อมูลได้",
      text: error.message || "โปรดลองอีกครั้ง",
    });
  } finally {
    isLoading.value = false;
  }
};

const fetchProjectID = async (timeinout) => {
  if (!timeinout.projectId) return;
  try {
    const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/${timeinout.projectId}`);
    timeinout.projectName = response.data.data.title;
  } catch (error) {
    console.error("Error fetching employee name:", error);
    timeinout.projectName = "ไม่พบข้อมูล";
  }
};

// คำนวณเดือนที่มีข้อมูล
const availableMonths = computed(() => {
  const months = new Set();
  timeinouts.value.forEach(item => {
    const date = new Date(item.createdAt);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    months.add(monthYear);
  });
  return Array.from(months).sort().reverse();
});

// จัดรูปแบบเดือนสำหรับแสดงผล
const formatMonthDisplay = (monthStr) => {
  if (!monthStr) return '';
  const [year, month] = monthStr.split('-');
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  return `${thaiMonths[parseInt(month) - 1]} ${parseInt(year) + 543}`;
};

// กรองข้อมูลตามเงื่อนไข
const filteredTimeinouts = computed(() => {
  let result = timeinouts.value;
  
  // กรองตามประเภท
  if (selectedType.value !== 'all') {
    result = result.filter(item => item.type === selectedType.value);
  }
  
  // กรองตามเดือน
  if (selectedMonth.value) {
    result = result.filter(item => {
      const date = new Date(item.createdAt);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return monthYear === selectedMonth.value;
    });
  }
  
  // กรองตามคำค้นหา
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase();
    result = result.filter(item => 
      (item.projectName && item.projectName.toLowerCase().includes(search)) ||
      (item.location && item.location.toLowerCase().includes(search))
    );
  }
  
  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

// จัดรูปแบบวันที่
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('th-TH', options);
};

// สถิติการเข้างาน
const attendanceStats = computed(() => {
  const stats = {
    totalDays: 0,
    checkIn: 0,
    checkOut: 0
  };
  
  // กรองเฉพาะข้อมูลตามเดือนที่เลือก
  let data = timeinouts.value;
  if (selectedMonth.value) {
    data = data.filter(item => {
      const date = new Date(item.createdAt);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return monthYear === selectedMonth.value;
    });
  }
  
  // นับจำนวนวันที่ไม่ซ้ำกัน
  const uniqueDays = new Set();
  data.forEach(item => {
    const date = new Date(item.createdAt).toLocaleDateString();
    uniqueDays.add(date);
    if (item.type === 'เข้างาน') stats.checkIn++;
    if (item.type === 'ออกงาน') stats.checkOut++;
  });
  
  stats.totalDays = uniqueDays.size;
  return stats;
});

onMounted(async () => {
  await fetchTimeinout();
  console.log('timeinout : ', timeinouts.value);
  // เลือกเดือนปัจจุบันเป็นค่าเริ่มต้น
  if (availableMonths.value.length > 0) {
    selectedMonth.value = availableMonths.value[0];
  }
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
    <div class="container mx-auto px-4">
      <!-- หัวข้อ -->
      <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 mb-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">บันทึกเวลาเข้า-ออกงาน</h1>
            <p class="text-gray-600">รายงานเวลาการเข้าทำงานของคุณ</p>
          </div>
          
          <!-- สถิติการเข้างาน -->
          <div class="mt-4 md:mt-0 flex flex-wrap gap-3">
            <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ attendanceStats.totalDays }} วัน</span>
            </div>
            
            <div class="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>เข้างาน {{ attendanceStats.checkIn }} ครั้ง</span>
            </div>
            
            <div class="bg-red-100 text-red-800 px-4 py-2 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>ออกงาน {{ attendanceStats.checkOut }} ครั้ง</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- ตัวกรองและค้นหา -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- ค้นหา -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="searchTerm"
              type="text"
              class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="ค้นหาโปรเจกต์หรือสถานที่..."
            />
          </div>
          
          <!-- เลือกเดือน -->
          <div>
            <select 
              v-model="selectedMonth" 
              class="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">ทุกเดือน</option>
              <option v-for="month in availableMonths" :key="month" :value="month">
                {{ formatMonthDisplay(month) }}
              </option>
            </select>
          </div>
          
          <!-- เลือกประเภท -->
          <div>
            <div class="flex space-x-2">
              <button 
                @click="selectedType = 'all'" 
                :class="`flex-1 py-2 px-3 rounded-lg transition-colors ${selectedType === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`"
              >
                ทั้งหมด
              </button>
              <button 
                @click="selectedType = 'เข้างาน'" 
                :class="`flex-1 py-2 px-3 rounded-lg transition-colors ${selectedType === 'เข้างาน' ? 'bg-green-600 text-white' : 'bg-green-100 hover:bg-green-200 text-green-800'}`"
              >
                เข้างาน
              </button>
              <button 
                @click="selectedType = 'ออกงาน'" 
                :class="`flex-1 py-2 px-3 rounded-lg transition-colors ${selectedType === 'ออกงาน' ? 'bg-red-600 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800'}`"
              >
                ออกงาน
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- ตารางข้อมูล -->
      <div v-if="isLoading" class="bg-white rounded-xl shadow-md p-10 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
        <p class="text-gray-600 mt-4 text-lg">กำลังโหลดข้อมูล...</p>
      </div>
      
      <div v-else-if="filteredTimeinouts.length > 0" class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gradient-to-r from-green-600 to-green-500 text-white">
                <th class="px-6 py-4 text-left font-semibold text-sm tracking-wider">วันที่</th>
                <th class="px-6 py-4 text-left font-semibold text-sm tracking-wider">โปรเจกต์</th>
                <th class="px-6 py-4 text-left font-semibold text-sm tracking-wider">สถานที่</th>
                <th class="px-6 py-4 text-left font-semibold text-sm tracking-wider">เวลา</th>
                <th class="px-6 py-4 text-left font-semibold text-sm tracking-wider">ประเภท</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(timeinout, index) in filteredTimeinouts" :key="index" 
                  class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 font-medium">{{ formatDate(timeinout.createdAt) }}</div>
                </td>
                <td class="px-6 py-4">
                  <span v-if="timeinout.projectName" 
                        class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {{ timeinout.projectName }}
                  </span>
                  <span v-else class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs animate-pulse">
                    กำลังโหลด...
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm text-gray-700">{{ timeinout.location }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 font-medium">{{ timeinout.time }}</div>
                </td>
                <td class="px-6 py-4">
                  <span 
                    :class="{
                      'bg-green-100 text-green-800 border border-green-300 px-3 py-1 rounded-full text-xs font-medium': timeinout.type === 'เข้างาน',
                      'bg-red-100 text-red-800 border border-red-300 px-3 py-1 rounded-full text-xs font-medium': timeinout.type === 'ออกงาน'
                    }">
                    {{ timeinout.type }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div v-else class="bg-white rounded-xl shadow-md p-10 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-gray-500 mt-4 text-lg">ไม่พบข้อมูลการเข้า-ออกงาน</p>
        <p class="text-gray-400 mt-2">ลองเปลี่ยนตัวกรองหรือค้นหาด้วยคำอื่น</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Prompt', sans-serif;
}

/* Animation styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>