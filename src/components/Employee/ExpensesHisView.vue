<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const expenses = ref([]);
const isLoading = ref(true);
const searchTerm = ref('');
const statusFilter = ref('ทั้งหมด');
const startDate = ref('');
const endDate = ref('');
const sortBy = ref('createdAt');
const sortDirection = ref('desc');
const emID = localStorage.getItem('id');

const fetchExpenses = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/invoice/${emID}`);
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

const statusOptions = computed(() => {
    const statuses = ['ทั้งหมด', ...new Set(expenses.value.map(expense => expense.status))];
    return statuses;
});

const resetFilters = () => {
    searchTerm.value = '';
    statusFilter.value = 'ทั้งหมด';
    startDate.value = '';
    endDate.value = '';
};

const filteredExpenses = computed(() => {
    return expenses.value
        .filter(expense => {
            // Text search
            const searchLower = searchTerm.value.toLowerCase();
            const textMatch = expense.expensesID.toString().includes(searchLower) ||
                   `${expense.firstname} ${expense.lastname}`.toLowerCase().includes(searchLower) ||
                   expense.title.toLowerCase().includes(searchLower);
            
            // Status filter
            const statusMatch = statusFilter.value === 'ทั้งหมด' || expense.status === statusFilter.value;
            
            // Date filter
            let dateMatch = true;
            if (startDate.value) {
                const expenseDate = new Date(expense.createdAt);
                const filterStartDate = new Date(startDate.value);
                filterStartDate.setHours(0, 0, 0, 0);
                
                if (expenseDate < filterStartDate) {
                    dateMatch = false;
                }
            }
            
            if (endDate.value && dateMatch) {
                const expenseDate = new Date(expense.createdAt);
                const filterEndDate = new Date(endDate.value);
                filterEndDate.setHours(23, 59, 59, 999);
                
                if (expenseDate > filterEndDate) {
                    dateMatch = false;
                }
            }
            
            return textMatch && statusMatch && dateMatch;
        })
        .sort((a, b) => {
            let aValue = a[sortBy.value];
            let bValue = b[sortBy.value];
            
            if (sortBy.value === 'createdAt') {
                aValue = new Date(a.createdAt).getTime();
                bValue = new Date(b.createdAt).getTime();
            } else if (sortBy.value === 'totalAmount') {
                aValue = parseFloat(a.totalAmount);
                bValue = parseFloat(b.totalAmount);
            }
            
            if (sortDirection.value === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
});

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

const formatInputDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const toggleSort = (column) => {
    if (sortBy.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = column;
        sortDirection.value = 'asc';
    }
};

const getSortIcon = (column) => {
    if (sortBy.value !== column) return 'fas fa-sort';
    return sortDirection.value === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
};

const getStatusClass = (status) => {
    switch (status) {
        case 'รอการอนุมัติ':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
        case 'อนุมัติสำเร็จ':
            return 'bg-green-100 text-green-800 border border-green-200';
        case 'ไม่อนุมัติ':
            return 'bg-red-100 text-red-800 border border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
};

onMounted(async () => {
    await fetchExpenses();
    console.log('expenses : ', expenses.value);
});
</script>

<template>
    <div class="container mx-auto px-4 py-6 max-w-6xl">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800 text-center">ประวัติการเบิก</h1>
            <div class="h-1 w-24 bg-blue-500 mx-auto mt-2 rounded-full"></div>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
            <!-- General search -->
            <!-- <div class="relative mb-4">
                <input
                    type="text"
                    v-model="searchTerm"
                    placeholder="ค้นหารายการ, ชื่อผู้เบิก..."
                    class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span class="absolute left-3 top-2.5 text-gray-400">
                    <i class="fas fa-search"></i>
                </span>
            </div> -->
            
            <!-- Advanced filters -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <!-- Status filter -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                    <select 
                        v-model="statusFilter" 
                        class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option v-for="status in statusOptions" :key="status" :value="status">
                            {{ status }}
                        </option>
                    </select>
                </div>
                
                <!-- Date range -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">วันที่เริ่มต้น</label>
                    <input 
                        type="date" 
                        v-model="startDate"
                        class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">วันที่สิ้นสุด</label>
                    <input 
                        type="date" 
                        v-model="endDate"
                        class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            
            <!-- Filter actions -->
            <div class="flex flex-col sm:flex-row sm:justify-end gap-2">
                <button 
                    @click="resetFilters" 
                    class="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    <i class="fas fa-times mr-2"></i> ล้างตัวกรอง
                </button>
                <button 
                    @click="fetchExpenses" 
                    class="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <i class="fas fa-sync-alt mr-2"></i> รีเฟรช
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div v-if="isLoading" class="p-8 flex justify-center">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>

            <div v-else-if="filteredExpenses.length === 0" class="p-8 text-center text-gray-500">
                <i class="fas fa-receipt text-4xl mb-4"></i>
                <p>ไม่พบรายการเบิกที่ตรงกับเงื่อนไขการค้นหา</p>
            </div>

            <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th 
                                @click="toggleSort('expensesID')" 
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                                <div class="flex items-center">
                                    เลขรายการเบิก
                                    <i :class="getSortIcon('expensesID')" class="ml-1"></i>
                                </div>
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                รายชื่อผู้ขอเบิก
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                รายการ
                            </th>
                            <th 
                                @click="toggleSort('totalAmount')" 
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                                <div class="flex items-center">
                                    จำนวน
                                    <i :class="getSortIcon('totalAmount')" class="ml-1"></i>
                                </div>
                            </th>
                            <th 
                                @click="toggleSort('status')" 
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                                <div class="flex items-center">
                                    สถานะ
                                    <i :class="getSortIcon('status')" class="ml-1"></i>
                                </div>
                            </th>
                            <th 
                                @click="toggleSort('createdAt')" 
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                                <div class="flex items-center">
                                    วันที่
                                    <i :class="getSortIcon('createdAt')" class="ml-1"></i>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="expense in filteredExpenses" :key="expense.expensesID" class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">#{{ expense.expensesID }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ expense.firstname }} {{ expense.lastname }}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900 line-clamp-2" :title="expense.title">{{ expense.title }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ formatNumber(expense.totalAmount) }} บาท</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 text-sm rounded-full" :class="getStatusClass(expense.status)">
                                    {{ expense.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500">{{ formatDate(expense.createdAt) }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <div class="text-sm text-gray-500">
                    แสดง {{ filteredExpenses.length }} จาก {{ expenses.length }} รายการ
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>