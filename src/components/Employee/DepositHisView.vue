<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const deposits = ref([]);
const isLoading = ref(true);
const emID = localStorage.getItem('id');

// เพิ่มตัวแปรสำหรับการกรองตามวันที่
const startDate = ref('');
const endDate = ref('');

const fetchDeposit = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/deposit/${emID}`);
        deposits.value = response.data.data;
        
        // ดึงชื่อโปรเจกต์สำหรับแต่ละ deposit
        for (let deposit of deposits.value) {
            fetchProjectName(deposit);
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

const fetchProjectName = async (deposit) => {
    if (!deposit.projectId) return;

    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/${deposit.projectId}`);
        deposit.projectName = response.data.data.title;
    } catch (error) {
        console.error("Error fetching project name:", error);
        deposit.projectName = "ไม่พบข้อมูล";
    }
};

// เพิ่มฟังก์ชันสำหรับรีเซ็ตการกรอง
const resetFilters = () => {
    startDate.value = '';
    endDate.value = '';
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const dateToCompare = (dateString) => {
    return new Date(dateString).setHours(0, 0, 0, 0);
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// เพิ่ม computed property สำหรับการกรองข้อมูล
const filteredDeposits = computed(() => {
    let result = [...deposits.value];
    
    if (startDate.value) {
        const start = dateToCompare(startDate.value);
        result = result.filter(deposit => {
            return dateToCompare(deposit.date) >= start;
        });
    }
    
    if (endDate.value) {
        const end = dateToCompare(endDate.value);
        result = result.filter(deposit => {
            return dateToCompare(deposit.date) <= end;
        });
    }
    
    return result;
});

// เพิ่ม computed property สำหรับคำนวณยอดรวม
const totalAmount = computed(() => {
    const a = filteredDeposits.value.reduce((sum, deposit) => sum + Number(deposit.amount), 0);
    return a;
});


onMounted(async () => {
    await fetchDeposit()
});
</script>

<template>
    <div class="container mx-auto px-4 py-6 max-w-6xl">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800 text-center">ประวัติการฝากเงิน</h1>
            <div class="h-1 w-24 bg-blue-500 mx-auto mt-2 rounded-full"></div>
        </div>

        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-4 mb-6 text-white">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-medium">จำนวนรายการ</h3>
                    <p class="text-2xl font-bold">{{ filteredDeposits.length }} รายการ</p>
                </div>
                <div>
                    <h3 class="text-lg font-medium">ยอดรวมทั้งหมด</h3>
                    <p class="text-2xl font-bold">{{ formatNumber(totalAmount) }} ฿</p>
                </div>
            </div>
        </div>
        
        <!-- Filter Controls -->
        <div class="bg-white p-4 mb-6 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold mb-3 text-gray-700">กรองข้อมูล</h2>
            <div class="flex flex-wrap gap-4">
                <div class="flex flex-col">
                    <label for="startDate" class="text-sm font-medium text-gray-600 mb-1">จากวันที่</label>
                    <input
                        id="startDate"
                        v-model="startDate"
                        type="date"
                        class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="endDate" class="text-sm font-medium text-gray-600 mb-1">ถึงวันที่</label>
                    <input
                        id="endDate"
                        v-model="endDate"
                        type="date"
                        class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>
                <div class="flex items-end">
                    <button 
                        @click="resetFilters"
                        class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
                    >
                        ล้างตัวกรอง
                    </button>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead>
                        <tr class="bg-gray-100 border-b">
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">รหัสฝาก</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">วันที่</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">ธนาคาร</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">ชื่อบัญชี</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">เลขบัญชี</th>
                            <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">จำนวนเงิน</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">หมายเหตุ</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">ชื่อโปรเจกต์</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="isLoading">
                            <td colspan="8" class="text-center py-6">
                                <div class="flex justify-center items-center">
                                    <div class="w-6 h-6 border-4 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                                    กำลังโหลดข้อมูล...
                                </div>
                            </td>
                        </tr>
                        <tr v-else-if="filteredDeposits.length === 0">
                            <td colspan="8" class="text-center py-6 text-gray-500">ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา</td>
                        </tr>
                        <tr 
                            v-else 
                            v-for="deposit in filteredDeposits" 
                            :key="deposit.depositID" 
                            class="border-b hover:bg-blue-50 transition-colors"
                        >
                            <td class="px-4 py-3 text-gray-800">{{ deposit.depositID }}</td>
                            <td class="px-4 py-3 text-gray-800">{{ formatDate(deposit.date) }}</td>
                            <td class="px-4 py-3 text-gray-800">{{ deposit.bank }}</td>
                            <td class="px-4 py-3 text-gray-800">{{ deposit.accountName }}</td>
                            <td class="px-4 py-3 text-gray-800">{{ deposit.accountNumber }}</td>
                            <td class="px-4 py-3 text-right font-medium" :class="{'text-green-600': deposit.amount > 0}">
                                {{ formatNumber(deposit.amount) }} ฿
                            </td>
                            <td class="px-4 py-3 text-gray-800">{{ deposit.remark }}</td>
                            <td class="px-4 py-3">
                                <span v-if="deposit.projectName" class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {{ deposit.projectName }}
                                </span>
                                <span v-else class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                    กำลังโหลด...
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>