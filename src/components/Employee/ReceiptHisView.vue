<template>
    <div class="container mx-auto px-4 py-8 max-w-6xl">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800 text-center">รับใบเสร็จของฉัน</h1>
            <div class="h-1 w-32 bg-green-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">

            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                <span class="ml-3 text-gray-600 font-medium">กำลังโหลดข้อมูล...</span>
            </div>
            
            <div v-else-if="receipts.length === 0" class="text-center py-12">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-gray-600 text-lg font-medium">ไม่พบใบเสร็จในระบบ</p>
                <p class="text-gray-500 mt-2">กรุณาตรวจสอบอีกครั้งในภายหลัง</p>
            </div>
            
            <div v-else>
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold text-gray-700">รายการใบเสร็จทั้งหมด</h2>
                    <span class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        จำนวน {{ receipts.length }} รายการ
                    </span>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-700 border-b-2 border-gray-200">
                                <th class="px-6 py-3 text-left text-sm font-semibold">วันที่สร้าง</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold">พนักงาน</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold">โครงการ</th>
                                <th class="px-6 py-3 text-left text-sm font-semibold">สถานะ</th>
                                <th class="px-6 py-3 text-center text-sm font-semibold">ใบเสร็จ</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="receipt in receipts" :key="receipt._id" class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ formatDate(receipt.createdAt) }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900">{{ receipt.employeeName }} {{ receipt.employeeLastname }}</div>
                                    
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900">
                                        {{ receipt.projectName || receipt.projectID }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span 
                                        :class="[
                                            'px-3 py-1 text-xs font-medium rounded-full', 
                                            receipt.status === 'รอส่งไฟล์' 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : 'bg-green-100 text-green-800'
                                        ]"
                                    >
                                        {{ receipt.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div class="flex justify-center">
                                        <div class="relative group">
                                            <img 
                                                :src="receipt.receipt" 
                                                alt="Receipt Image" 
                                                class="w-16 h-16 object-cover border rounded-lg shadow-sm cursor-pointer transition transform group-hover:scale-105" 
                                                @click="openReceiptModal(receipt)"
                                            />
                                            
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center p-4" @click="closeModal">
        <div class="relative bg-white rounded-lg max-w-3xl w-full" @click.stop>
            <div class="absolute top-0 right-0 m-4">
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">ใบเสร็จ</h3>
                <p class="text-sm text-gray-600 mb-4">โครงการ: {{ selectedReceipt?.projectName || selectedReceipt?.projectID }}</p>
                <div class="flex justify-center">
                    <img :src="selectedReceipt?.receipt" alt="Receipt Full Image" class="max-h-96 object-contain" />
                </div>
                <div class="mt-4 text-center">
                    <a 
                        :href="selectedReceipt?.receipt" 
                        target="_blank" 
                        class="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        ดาวน์โหลดใบเสร็จ
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const receipts = ref([]);
const isLoading = ref(true);
const emID = localStorage.getItem('id');
const showModal = ref(false);
const selectedReceipt = ref(null);

const fetchReceipt = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/receipt/${emID}`);
        receipts.value = response.data.data;

        await Promise.all(receipts.value.map(async (receipt) => {
            await Promise.all([
                fetchProjectName(receipt),
                fetchEmployeeID(receipt)
            ]);
        }));
    } catch (error) {
        console.error("Error fetching employee invoices:", error);
        Swal.fire({
            icon: "error",
            title: "โหลดข้อมูลไม่สำเร็จ",
            text: error.message || "โปรดลองอีกครั้งในภายหลัง",
            confirmButtonColor: "#10B981"
        });
    } finally {
        isLoading.value = false;
    }
};

const fetchEmployeeID = async (receipt) => {
    if (!receipt.employeeID) return;

    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getid/${receipt.employeeID}`);
        receipt.employeeName = response.data.data.first_name;
        receipt.employeeLastname = response.data.data.last_name;
        receipt.employeePosition = response.data.data.position;
    } catch (error) {
        console.error("Error fetching employee name:", error);
        receipt.employeeName = "ไม่พบข้อมูล";
    }
};

const fetchProjectName = async (receipt) => {
    if (!receipt.projectID) return;

    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/${receipt.projectID}`);
        receipt.projectName = response.data.data.title;
    } catch (error) {
        console.error("Error fetching project name:", error);
        receipt.projectName = "ไม่พบข้อมูล";
    }
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const openReceiptModal = (receipt) => {
    selectedReceipt.value = receipt;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    selectedReceipt.value = null;
};

onMounted(async () => {
    await fetchReceipt();
});
</script>