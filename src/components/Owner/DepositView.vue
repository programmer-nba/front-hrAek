<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const deposits = ref([]);
const isLoading = ref(true);
const searchTerm = ref('');
const currentFilter = ref('all');

const fetchDeposit = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/deposit`);
        deposits.value = response.data.data;

        for (let deposit of deposits.value) {
            fetchProjectName(deposit);
            fetchEmployeeID(deposit); // เรียกใช้เพื่อโหลดชื่อพนักงาน
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

const fetchEmployeeID = async (deposit) => {
    if (!deposit.employeeID) return;

    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getid/${deposit.employeeID}`);
        deposit.employeeName = response.data.data.first_name;
        deposit.employeeLastname = response.data.data.last_name;
    } catch (error) {
        console.error("Error fetching employee name:", error);
        deposit.employeeName = "ไม่พบข้อมูล";
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

const approve = async (depositId) => {
    try {
        await Swal.fire({
            title: 'ยืนยันการอนุมัติ',
            text: 'คุณต้องการอนุมัติรายการนี้ใช่หรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/deposit/complete/${depositId}`);

                Swal.fire({
                    icon: 'success',
                    title: 'อนุมัติสำเร็จ',
                    text: 'สถานะได้ถูกเปลี่ยนเป็น "อนุมัติสำเร็จ"',
                    confirmButtonColor: '#10B981'
                });

                await fetchDeposit();
            }
        });
    } catch (error) {
        console.error("Error approving expense:", error);
        Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถอนุมัติได้',
            text: error.message || 'โปรดลองอีกครั้ง',
        });
    }
};

const disapprove = async (expenseId) => {
    try {
        await Swal.fire({
            title: 'ยืนยันการไม่อนุมัติ',
            text: 'คุณต้องการไม่อนุมัติรายการนี้ใช่หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/deposit/cancle/${expenseId}`);

                Swal.fire({
                    icon: 'success',
                    title: 'ยกเลิกการอนุมัติ',
                    text: 'สถานะได้ถูกเปลี่ยนเป็น "ไม่อนุมัติ"',
                    confirmButtonColor: '#10B981'
                });

                await fetchDeposit();
            }
        });
    } catch (error) {
        console.error("Error disapproving expense:", error);
        Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถยกเลิกการอนุมัติได้',
            text: error.message || 'โปรดลองอีกครั้ง',
        });
    }
};

const filterByStatus = (status) => {
    currentFilter.value = status;
};

const filteredDeposits = computed(() => {
    let result = deposits.value;

    if (currentFilter.value !== 'all') {
        result = result.filter(deposit => deposit.status === currentFilter.value);
    }

    if (searchTerm.value) {
        const search = searchTerm.value.toLowerCase();
        result = result.filter(deposit =>
            (deposit.depositID && deposit.depositID.toLowerCase().includes(search)) ||
            (deposit.projectName && deposit.projectName.toLowerCase().includes(search)) ||
            (deposit.employeeID && deposit.employeeID.toLowerCase().includes(search)) ||
            (deposit.bank && deposit.bank.toLowerCase().includes(search))
        );
    }

    return result;
});

const totalAmount = computed(() => {
    return deposits.value
        .filter(deposit => deposit.status === "อนุมัติแล้ว")
        .reduce((sum, deposit) => sum + parseFloat(deposit.amount || 0), 0)
        .toLocaleString();
});


const formatCurrency = (amount) => {
    return parseFloat(amount).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatDate = (date, time) => {
    if (!date) return '';
    const dateParts = date.split('-');
    if (dateParts.length < 3) return date;
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${time || ''}`;
};

onMounted(async () => {
    await fetchDeposit();
    console.log('deposit : ', deposits.value);
});
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div class="container mx-auto px-4 py-8">
            <!-- หัวข้อหน้า -->
            <div class="mb-8 bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-800 mb-2">รายการฝากเงิน</h1>
                        <p class="text-gray-600">ระบบจัดการรายการฝากเงินโครงการ</p>
                    </div>
                    <div class="flex items-center space-x-2 mt-4 md:mt-0">
                        <div class="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="font-medium">รวม: {{ totalAmount }} บาท</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ตัวกรองและค้นหา -->
            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <div class="flex flex-col md:flex-row justify-between gap-4">
                    <!-- ค้นหา -->
                    <div class="relative flex-grow">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input v-model="searchTerm" type="text"
                            class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="ค้นหารายการฝากเงิน..." />
                    </div>

                    <div class="flex gap-2">
                        <button @click="filterByStatus('all')"
                            :class="`px-4 py-2 rounded-lg transition-colors ${currentFilter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`">
                            ทั้งหมด
                        </button>
                        <button @click="filterByStatus('รอการอนุมัติ')"
                            :class="`px-4 py-2 rounded-lg transition-colors ${currentFilter === 'รอการอนุมัติ' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'}`">
                            รอการอนุมัติ
                        </button>
                        <button @click="filterByStatus('อนุมัติสำเร็จ')"
                            :class="`px-4 py-2 rounded-lg transition-colors ${currentFilter === 'อนุมัติสำเร็จ' ? 'bg-green-500 text-white' : 'bg-green-100 hover:bg-green-200 text-green-800'}`">
                            อนุมัติแล้ว
                        </button>
                        <button @click="filterByStatus('ไม่อนุมัติ')"
                            :class="`px-4 py-2 rounded-lg transition-colors ${currentFilter === 'ไม่อนุมัติ' ? 'bg-red-500 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800'}`">
                            ไม่อนุมัติ
                        </button>
                    </div>
                </div>
            </div>

            <!-- แสดง Loading -->
            <div v-if="isLoading" class="bg-white rounded-xl shadow-md p-10 text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
                <p class="text-gray-600 mt-4 text-lg">กำลังโหลดข้อมูล...</p>
            </div>

            <!-- ตารางข้อมูล -->
            <div v-else class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="overflow-x-auto" v-if="filteredDeposits.length > 0">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="bg-gradient-to-r from-green-600 to-green-500 text-white">
                                <th class="px-4 py-4 text-left font-semibold text-sm tracking-wider">#</th>
                                <th class="px-4 py-4 text-left font-semibold text-sm tracking-wider">รหัสฝาก</th>
                                <th class="px-4 py-4 text-left font-semibold text-sm tracking-wider">โปรเจกต์</th>
                                <th class="px-4 py-4 text-left font-semibold text-sm tracking-wider">วันที่</th>
                                <th class="px-4 py-4 text-left font-semibold text-sm tracking-wider">พนักงาน</th>
                                <th class="px-4 py-4 text-left font-semibold text-sm tracking-wider">ธนาคาร</th>
                                <th class="px-4 py-4 text-left font-semibold text-sm tracking-wider">จำนวนเงิน</th>
                                <th class="px-4 py-4 text-left font-semibold text-sm tracking-wider">สถานะ</th>
                                <th class="px-4 py-4 text-left font-semibold text-sm tracking-wider">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(deposit, index) in filteredDeposits" :key="deposit.depositID"
                                class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td class="px-4 py-4 text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                                <td class="px-4 py-4">
                                    <div class="font-medium text-gray-900">{{ deposit.depositID }}</div>
                                </td>
                                <td class="px-4 py-4">
                                    <span v-if="deposit.projectName"
                                        class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                        {{ deposit.projectName }}
                                    </span>
                                    <span v-else
                                        class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs animate-pulse">
                                        กำลังโหลด...
                                    </span>
                                </td>
                                <td class="px-4 py-4 text-sm text-gray-700">
                                    {{ formatDate(deposit.date, deposit.time) }}
                                </td>
                                <td class="px-4 py-3">
                                    <span v-if="deposit.employeeName">{{ deposit.employeeName }} {{ deposit.employeeLastname }}</span>
                                    <span v-else class="text-gray-500">กำลังโหลด...</span>
                                </td>
                                <td class="px-4 py-4 text-sm text-gray-700">{{ deposit.bank }}</td>
                                <td class="px-4 py-4 text-right">
                                    <div class="text-sm font-semibold text-gray-900">{{ formatCurrency(deposit.amount)
                                    }} บาท</div>
                                </td>
                                <td class="px-4 py-4">
                                    <span :class="{
                                        'bg-yellow-100 text-yellow-800 border border-yellow-300 px-3 py-1 rounded-full text-xs font-medium': deposit.status === 'รอการอนุมัติ',
                                        'bg-green-100 text-green-800 border border-green-300 px-3 py-1 rounded-full text-xs font-medium': deposit.status === 'อนุมัติสำเร็จ',
                                        'bg-red-100 text-red-800 border border-red-300 px-3 py-1 rounded-full text-xs font-medium': deposit.status === 'ไม่อนุมัติ'
                                    }">
                                        {{ deposit.status }}
                                    </span>
                                </td>
                                <td class="px-4 py-4">
                                    <div v-if="deposit.status === 'รอการอนุมัติ'" class="flex space-x-2">
                                        <button @click="approve(deposit._id)"
                                            class="px-3 py-1.5 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-all shadow-sm">
                                            <span class="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                อนุมัติ
                                            </span>
                                        </button>

                                        <button @click="disapprove(deposit._id)"
                                            class="px-3 py-1.5 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all shadow-sm">
                                            <span class="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                ไม่อนุมัติ
                                            </span>
                                        </button>
                                    </div>
                                    <div v-else class="text-sm text-gray-500">
                                        &mdash;
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="p-10 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mx-auto" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p class="text-gray-500 mt-4 text-lg">ไม่พบรายการฝากเงินที่ตรงกับเงื่อนไข</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');

* {
    font-family: 'Prompt', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* เพิ่ม animation */
@keyframes pulse {

    0%,
    100% {
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