<script setup>
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2';
import axios from 'axios';

const expenses = ref([]);
const isLoading = ref(true);
const searchTerm = ref('');
const sortBy = ref('createdAt');
const sortOrder = ref('desc');

const fetchExpenses = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/invoice`);
        expenses.value = response.data.data;
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

const filteredExpenses = computed(() => {
    if (!searchTerm.value) return expenses.value;

    const search = searchTerm.value.toLowerCase();
    return expenses.value.filter(expense =>
        expense.expensesID?.toLowerCase().includes(search) ||
        expense.title?.toLowerCase().includes(search) ||
        expense.firstname?.toLowerCase().includes(search) ||
        expense.lastname?.toLowerCase().includes(search) ||
        expense.status?.toLowerCase().includes(search)
    );
});

const sortedExpenses = computed(() => {
    return [...filteredExpenses.value].sort((a, b) => {
        let valA = a[sortBy.value];
        let valB = b[sortBy.value];

        // Handle numeric values
        if (sortBy.value === 'totalAmount') {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        }

        // Handle date values
        if (sortBy.value === 'createdAt') {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
    });
});

const changeSort = (column) => {
    if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = column;
        sortOrder.value = 'asc';
    }
};

const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

const approve = async (expenseId) => {
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
                await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/invoice/complete/${expenseId}`);

                Swal.fire({
                    icon: 'success',
                    title: 'อนุมัติสำเร็จ',
                    text: 'สถานะได้ถูกเปลี่ยนเป็น "อนุมัติสำเร็จ"',
                    confirmButtonColor: '#10B981'
                });

                await fetchExpenses();
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
                await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/invoice/cancle/${expenseId}`);

                Swal.fire({
                    icon: 'success',
                    title: 'ยกเลิกการอนุมัติ',
                    text: 'สถานะได้ถูกเปลี่ยนเป็น "ไม่อนุมัติ"',
                    confirmButtonColor: '#10B981'
                });

                await fetchExpenses();
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

onMounted(async () => {
    await fetchExpenses();
});
</script>

<template>
    <div class="container mx-auto px-4 py-6 max-w-7xl bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800 text-center">รายการเบิกค่าใช้จ่าย</h1>
            <div class="h-1.5 w-40 bg-blue-600 mx-auto mt-3 rounded-full"></div>
            <p class="text-center text-gray-600 mt-3">จัดการรายการเบิกค่าใช้จ่ายได้ที่นี่</p>
        </div>

        <div v-if="expenses.length > 0" class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="flex items-center">
                    <div class="rounded-full bg-blue-100 p-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500">จำนวนรายการทั้งหมด</div>
                        <div class="text-xl font-bold">{{ expenses.length }} รายการ</div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="flex items-center">
                    <div class="rounded-full bg-yellow-100 p-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500">รอการอนุมัติ</div>
                        <div class="text-xl font-bold">{{expenses.filter(e => e.status === 'รอการอนุมัติ').length}}
                            รายการ</div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="flex items-center">
                    <div class="rounded-full bg-green-100 p-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500">อนุมัติแล้ว</div>
                        <div class="text-xl font-bold">{{expenses.filter(e => e.status === 'อนุมัติสำเร็จ').length}}
                            รายการ</div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="flex items-center">
                    <div class="rounded-full bg-red-100 p-3 mr-4">
                        <svg class="w-6 h-6" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <title>error</title>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="add" fill="#fc5050" transform="translate(42.666667, 42.666667)">
                                        <path
                                            d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M262.250667,134.250667 L292.416,164.416 L243.498667,213.333333 L292.416,262.250667 L262.250667,292.416 L213.333333,243.498667 L164.416,292.416 L134.250667,262.250667 L183.168,213.333333 L134.250667,164.416 L164.416,134.250667 L213.333333,183.168 L262.250667,134.250667 Z"
                                            id="error"> </path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <div class="text-sm text-gray-500">ไม่อนุมัติ</div>
                        <div class="text-xl font-bold">{{expenses.filter(e => e.status === 'ไม่อนุมัติ').length}}
                            รายการ</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Search & Filter Section -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div class="relative w-full sm:w-64">
                    <input v-model="searchTerm" type="text" placeholder="ค้นหารายการ..."
                        class="w-full px-5 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div class="flex gap-2 text-sm text-gray-500">
                    <p class="hidden sm:inline mt-[13px]">เรียงตาม:</p>
                    <button @click="changeSort('createdAt')" class="px-2 py-1 rounded hover:bg-gray-100">
                        วันที่
                        <span v-if="sortBy === 'createdAt'" class="text-blue-600">
                            {{ sortOrder === 'asc' ? '↑' : '↓' }}
                        </span>
                    </button>
                    <button @click="changeSort('totalAmount')" class="px-2 py-1 rounded hover:bg-gray-100">
                        จำนวนเงิน
                        <span v-if="sortBy === 'totalAmount'" class="text-blue-600">
                            {{ sortOrder === 'asc' ? '↑' : '↓' }}
                        </span>
                    </button>
                    <button @click="changeSort('status')" class="px-2 py-1 rounded hover:bg-gray-100">
                        สถานะ
                        <span v-if="sortBy === 'status'" class="text-blue-600">
                            {{ sortOrder === 'asc' ? '↑' : '↓' }}
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span class="ml-3 text-lg text-gray-600">กำลังโหลดข้อมูล...</span>
        </div>

        <!-- No Results -->
        <div v-else-if="sortedExpenses.length === 0" class="bg-white rounded-lg shadow p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="mt-4 text-lg text-gray-600">ไม่พบรายการค่าใช้จ่ายที่ต้องการ</p>
            <button @click="searchTerm = ''" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                แสดงทั้งหมด
            </button>
        </div>

        <!-- Table Section -->
        <div v-else class="overflow-hidden bg-white rounded-lg shadow">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                รหัส
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                หัวข้อ
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ชื่อผู้เบิก
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                จำนวนเงิน
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                หมายเหตุ
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                สถานะ
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                วันที่
                            </th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                การจัดการ
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="expense in sortedExpenses" :key="expense._id"
                            class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ expense.expensesID }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="font-medium text-gray-800">{{ expense.title }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="flex items-center">
                                    <div
                                        class="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-medium mr-2">
                                        {{ expense.firstname?.[0] || "" }}{{ expense.lastname?.[0] || "" }}
                                    </div>
                                    <div>{{ expense.firstname }} {{ expense.lastname }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="font-bold text-gray-800">{{ formatCurrency(expense.totalAmount) }} บาท</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ expense.remark || "-" }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="{
                                    'bg-yellow-100 text-yellow-800': expense.status === 'รอการอนุมัติ',
                                    'bg-green-100 text-green-800': expense.status === 'อนุมัติสำเร็จ',
                                    'bg-red-100 text-red-800': expense.status === 'ไม่อนุมัติ'
                                }">
                                    {{ expense.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>{{ new Date(expense.createdAt).toLocaleDateString('th-TH') }}</div>
                                <div class="text-xs text-gray-400">{{ new
                                    Date(expense.createdAt).toLocaleTimeString('th-TH') }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div v-if="expense.status !== 'อนุมัติสำเร็จ' && expense.status !== 'ไม่อนุมัติ'"
                                    class="flex space-x-2">
                                    <button @click="approve(expense._id)"
                                        class="px-3 py-1.5 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors">
                                        <span class="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 13l4 4L19 7" />
                                            </svg>
                                            อนุมัติ
                                        </span>
                                    </button>

                                    <button @click="disapprove(expense._id)"
                                        class="px-3 py-1.5 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors">
                                        <span class="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            ไม่อนุมัติ
                                        </span>
                                    </button>
                                </div>
                                <div v-else>
                                    <span class="text-gray-400">- จัดการแล้ว -</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<style scoped>
.container {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>