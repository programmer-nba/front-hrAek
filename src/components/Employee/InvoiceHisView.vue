<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const invoicepj = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const userID = localStorage.getItem('id');
const selectedImage = ref(null);
const showImageModal = ref(false);

const fetchProject = async (invoice) => {
    if (!invoice.projectID) return;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/${invoice.projectID}`);
        const project = response.data.data;
        if (project.employees.includes(userID)) {
            invoice.projectName = project.title;
            invoice.show = true;
        } else {
            invoice.show = false;
        }
    } catch (error) {
        console.error("Error fetching logs:", error);
        Swal.fire({
            icon: "error",
            title: "ไม่สามารถโหลดข้อมูลได้",
            text: error.message || "โปรดลองอีกครั้ง",
        });
    }
};

const fetchInvoicePJ = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/invoicepj`);
        invoicepj.value = response.data.data;
        await Promise.all(invoicepj.value.map(fetchProject));
        invoicepj.value = invoicepj.value.filter(invoice => invoice.show);
    } catch (error) {
        console.error("Error fetching invoices:", error);
        Swal.fire({
            icon: "error",
            title: "ไม่สามารถโหลดข้อมูลใบแจ้งหนี้ได้",
            text: error.message || "โปรดลองอีกครั้ง",
        });
    } finally {
        isLoading.value = false;
    }
};

const filteredInvoices = computed(() => {
    if (!searchQuery.value) return invoicepj.value;
    const query = searchQuery.value.toLowerCase();
    return invoicepj.value.filter(invoice =>
        invoice.invoiceID.toLowerCase().includes(query) ||
        invoice.projectName.toLowerCase().includes(query)
    );
});

const openImageModal = (imageUrl, invoiceID) => {
    selectedImage.value = { url: imageUrl, id: invoiceID };
    showImageModal.value = true;
};

const closeImageModal = () => {
    showImageModal.value = false;
    setTimeout(() => {
        selectedImage.value = null;
    }, 300);
};

const downloadImage = () => {
    if (!selectedImage.value) return;

    const link = document.createElement('a');
    link.href = selectedImage.value.url;
    link.download = `Invoice-${selectedImage.value.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
        icon: "success",
        title: "ดาวน์โหลดสำเร็จ",
        text: "ดาวน์โหลดรูปภาพใบแจ้งหนี้เรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500
    });
};

onMounted(async () => {
    await fetchInvoicePJ();
    console.log('inpj : ', invoicepj.value);
});
</script>

<template>
    <div class="min-h-screen  py-8">
        <div class="container mx-auto px-4 max-w-6xl">
            <!-- Header Section -->
            <div class="mb-8 text-center">
                <h1 class="text-3xl font-bold">รับใบแจ้งหนี้ของฉัน</h1>
                <div class="h-1.5 w-32 bg-green-600 mx-auto mt-3 rounded-full"></div>
                <p class="mt-3 text-gray-600">รายการใบแจ้งหนี้ที่เกี่ยวข้องกับโปรเจคของคุณ</p>
            </div>

            <!-- Search and Filter -->
            <div class="mb-6 flex justify-between items-center">
                <div class="relative w-64">
                    <input v-model="searchQuery" type="text" placeholder="ค้นหาใบแจ้งหนี้หรือโปรเจค..."
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    <div class="absolute left-3 top-2.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <button @click="fetchInvoicePJ"
                    class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    รีเฟรช
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="bg-white rounded-xl shadow-lg p-8 text-center">
                <div class="flex justify-center mb-4">
                    <svg class="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </div>
                <p class="text-gray-600 text-lg">กำลังโหลดข้อมูลใบแจ้งหนี้...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="invoicepj.length === 0" class="bg-white rounded-xl shadow-lg p-8 text-center">
                <div class="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">ไม่พบใบแจ้งหนี้</h3>
                <p class="text-gray-500">ไม่มีใบแจ้งหนี้ที่เกี่ยวข้องกับโปรเจคของคุณในขณะนี้</p>
            </div>

            <!-- Invoice Table -->
            <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead>
                            <tr class="bg-gradient-to-r from-green-600 to-green-500 text-white">
                                <th class="py-4 px-6 text-left">#</th>
                                <th class="py-4 px-6 text-left">หมายเลขใบแจ้งหนี้</th>
                                <th class="py-4 px-6 text-left">ชื่อโปรเจค</th>
                                <th class="py-4 px-6 text-left">รูปใบแจ้งหนี้</th>
                                <th class="py-4 px-6 text-left">วันที่สร้าง</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(invoice, index) in filteredInvoices" :key="invoice.invoiceID"
                                class="border-b border-gray-200 hover:bg-green-50 transition duration-150">
                                <td class="py-4 px-6 text-gray-700">{{ index + 1 }}</td>
                                <td class="py-4 px-6">
                                    <span class="font-medium text-green-700">{{ invoice.invoiceID }}</span>
                                </td>
                                <td class="py-4 px-6">
                                    <div class="flex items-center">
                                        <div
                                            class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                            </svg>
                                        </div>
                                        <span class="text-green-700 font-medium">{{ invoice.projectName }}</span>
                                    </div>
                                </td>
                                <td class="py-4 px-6">
                                    <div v-if="invoice.img_invoice" class="relative group">
                                        <img :src="invoice.img_invoice" alt="Invoice"
                                            class="w-16 h-16 object-cover rounded shadow-sm border border-gray-200 group-hover:opacity-90 transition duration-300 cursor-pointer"
                                            @click="openImageModal(invoice.img_invoice, invoice.invoiceID)" />
                                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition duration-300 rounded opacity-0 group-hover:opacity-100 cursor-pointer"
                                            @click="openImageModal(invoice.img_invoice, invoice.invoiceID)">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span v-else class="text-gray-500 text-sm flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-gray-400"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        ไม่มีรูป
                                    </span>
                                </td>
                                <td class="py-4 px-6">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span class="text-gray-600">
                                            {{ new Date(invoice.createdAt).toLocaleDateString("th-TH", {
                                                year: 'numeric',
                                            month: 'long', day: 'numeric'}) }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination Placeholder (can be implemented later) -->
                <div class="flex justify-between items-center px-6 py-4 bg-gray-50">
                    <span class="text-sm text-gray-600">แสดง {{ filteredInvoices.length }} รายการ</span>
                    <div class="flex space-x-1">
                        <button
                            class="px-3 py-1 rounded border text-gray-600 hover:bg-gray-200 transition duration-300">
                            ก่อนหน้า
                        </button>
                        <button class="px-3 py-1 rounded bg-green-600 text-white">
                            1
                        </button>
                        <button
                            class="px-3 py-1 rounded border text-gray-600 hover:bg-gray-200 transition duration-300">
                            ถัดไป
                        </button>
                    </div>
                </div>
            </div>

            <!-- Image Modal -->
            <div v-if="showImageModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                @click="closeImageModal">
                <div class="relative max-w-4xl w-full mx-4 bg-white rounded-lg shadow-xl p-2" @click.stop>
                    <!-- Modal Header -->
                    <div class="flex justify-between items-center px-4 py-2 border-b">
                        <h3 class="text-lg font-medium text-gray-900">
                            ใบแจ้งหนี้ {{ selectedImage.id }}
                        </h3>
                        <div class="flex space-x-2">
                            <button @click="downloadImage"
                                class="p-2 rounded-full hover:bg-green-100 text-green-600 transition duration-150"
                                title="ดาวน์โหลด">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                            <button @click="closeImageModal"
                                class="p-2 rounded-full hover:bg-red-100 text-red-600 transition duration-150"
                                title="ปิด">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Modal Body -->
                    <div class="p-4 flex justify-center">
                        <img v-if="selectedImage" :src="selectedImage.url" alt="Invoice Image"
                            class="max-w-full h-[300px]" />
                    </div>

                    <!-- Modal Footer -->
                    <div class="px-4 py-3 bg-gray-50 rounded-b-lg flex justify-end">
                        <button @click="downloadImage"
                            class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            ดาวน์โหลดรูปภาพ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>