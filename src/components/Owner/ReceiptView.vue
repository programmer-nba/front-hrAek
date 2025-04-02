<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const receipts = ref([])
const isLoading = ref(true);
const searchQuery = ref('');
const filteredReceipts = ref([]);

const position = localStorage.getItem('position')

const startDate = ref('');
const endDate = ref('');

const uploadDialog = ref(null);
const selectedFile = ref(null);
const selectedProject = ref(null);

const idReceiptEm = ref(null)
const selectedFileBase64 = ref(null);
const previewImage = ref(null);

const openUploadDialog = (receipt, id) => {
    selectedProject.value = receipt;
    idReceiptEm.value = id
    uploadDialog.value.showModal();
    selectedFile.value = null;
    selectedFileBase64.value = null;
    previewImage.value = null;
};

const closeUploadDialog = () => {
    uploadDialog.value.close();
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileType = file.type;
        if (!fileType.match('image.*')) {
            Swal.fire({
                icon: "error",
                title: "ประเภทไฟล์ไม่ถูกต้อง",
                text: "กรุณาเลือกไฟล์รูปภาพเท่านั้น",
            });
            return;
        }

        selectedFile.value = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            selectedFileBase64.value = reader.result;
            previewImage.value = reader.result;
        };
        reader.onerror = (error) => {
            console.error("Error converting file:", error);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "ไม่สามารถอ่านไฟล์ได้",
            });
        };
    }
};

const fetchReceipt = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/receipt`);
        receipts.value = response.data.data;

        const promises = receipts.value.map(receipt => {
            return Promise.all([
                fetchProjectName(receipt),
                fetchEmployeeID(receipt)
            ]);
        });

        await Promise.all(promises);
        applyFilters();
    } catch (error) {
        console.error("Error fetching employee invoices:", error);
        Swal.fire({
            icon: "error",
            title: "โหลดข้อมูลไม่สำเร็จ",
            text: error.message || "โปรดลองอีกครั้ง",
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

const applyFilters = () => {
    let filtered = [...receipts.value];

    if (startDate.value && endDate.value) {
        const start = new Date(startDate.value);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate.value);
        end.setHours(23, 59, 59, 999);

        filtered = filtered.filter(receipt => {
            const createdDate = new Date(receipt.createdAt);
            return createdDate >= start && createdDate <= end;
        });
    } else if (startDate.value) {
        const start = new Date(startDate.value);
        start.setHours(0, 0, 0, 0);

        filtered = filtered.filter(receipt => {
            const createdDate = new Date(receipt.createdAt);
            return createdDate >= start;
        });
    } else if (endDate.value) {
        const end = new Date(endDate.value);
        end.setHours(23, 59, 59, 999);

        filtered = filtered.filter(receipt => {
            const createdDate = new Date(receipt.createdAt);
            return createdDate <= end;
        });
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(receipt =>
            (receipt.employeeName && receipt.employeeName.toLowerCase().includes(query)) ||
            (receipt.employeeLastname && receipt.employeeLastname.toLowerCase().includes(query)) ||
            (receipt.projectName && receipt.projectName.toLowerCase().includes(query)) ||
            (receipt.employeePosition && receipt.employeePosition.toLowerCase().includes(query))
        );
    }

    filteredReceipts.value = filtered;
};

const resetFilters = () => {
    startDate.value = '';
    endDate.value = '';
    searchQuery.value = '';
    applyFilters();
};

const openImage = (imageUrl) => {
    if (imageUrl) {
        Swal.fire({
            imageUrl: imageUrl,
            imageAlt: "ใบเสร็จ",
            showCloseButton: true,
            showConfirmButton: false,
            width: "auto",
            customClass: {
                image: 'max-h-screen max-w-full'
            }
        });
    }
};

const uploadReceipt = async () => {
    if (!selectedProject.value || !selectedFileBase64.value) {
        Swal.fire({
            icon: "warning",
            title: "โปรดเลือกไฟล์",
            text: "กรุณาเลือกไฟล์ก่อนอัปโหลด"
        });
        return;
    }

    Swal.fire({
        title: 'กำลังอัปโหลด',
        text: 'กรุณารอสักครู่...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    closeUploadDialog();

    const emID = localStorage.getItem('id');

    try {
        const response = await axios.post(`${import.meta.env.VITE_VUE_APP_DECCAN}/receiptpj`, {
            projectID: selectedProject.value,
            employeeID: emID,
            receipt: selectedFileBase64.value,
            idReceiptEm: idReceiptEm.value
        });

        Swal.fire({
            icon: "success",
            title: "อัปโหลดสำเร็จ",
            text: "บันทึกข้อมูลใบเสร็จแล้ว"
        });
        await fetchReceipt();
    } catch (error) {
        console.error("Error uploading receipt:", error);
        Swal.fire({
            icon: "error",
            title: "อัปโหลดล้มเหลว",
            text: error.message || "โปรดลองอีกครั้ง"
        });
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
};

const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

onMounted(async () => {
    await fetchReceipt();
});
</script>

<template>
    <div class="bg-gradient-to-br from-green-50 to-gray-100 min-h-screen pb-12">
        <div class="bg-white shadow-md">
            <div class="container mx-auto px-4 py-6">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-800">ประวัติใบเสร็จ</h1>
                        <p class="text-gray-600 mt-1">จัดการและดูข้อมูลใบเสร็จโครงการทั้งหมด</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 pt-8">
            <!-- ส่วนการกรองตามช่วงวันที่ -->
            <div class="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-3">กรองข้อมูล</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label for="startDate"
                            class="block text-sm font-medium text-gray-700 mb-1">วันที่เริ่มต้น</label>
                        <input type="date" id="startDate" v-model="startDate"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            @change="applyFilters">
                    </div>
                    <div>
                        <label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">วันที่สิ้นสุด</label>
                        <input type="date" id="endDate" v-model="endDate"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            @change="applyFilters">
                    </div>
                    <div class="md:col-span-2 flex items-end">
                        <button @click="resetFilters"
                            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            รีเซ็ตการกรอง
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading state -->
            <div v-if="isLoading" class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
                <span class="ml-3 text-lg text-gray-700">กำลังโหลดข้อมูล...</span>
            </div>

            <div v-else-if="filteredReceipts.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-900">ไม่พบข้อมูลใบเสร็จ</h3>
                <p class="mt-1 text-gray-500">{{ searchQuery ? 'ไม่พบข้อมูลที่ตรงกับการค้นหา' :
                    (startDate || endDate) ? 'ไม่พบข้อมูลในช่วงวันที่ที่เลือก' : 'ยังไม่มีข้อมูลใบเสร็จในระบบ' }}</p>
            </div>

            <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-green-600">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    ลำดับ</th>
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    พนักงาน</th>
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    ตำแหน่ง</th>
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    โครงการ</th>
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    ใบเสร็จ</th>
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    วันที่สร้าง</th>
                                <th scope="col"
                                    class="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    สถานะ</th>
                                <th v-if="position === 'owner'" scope="col"
                                    class="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    จัดการ</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(receipt, index) in filteredReceipts" :key="receipt._id"
                                class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1
                                }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ receipt.employeeName || 'ไม่พบข้อมูล' }} {{ receipt.employeeLastname
                                                    || '' }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {{ receipt.employeePosition || 'ไม่พบข้อมูล' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ receipt.projectName ||
                                    'ไม่พบข้อมูล' }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div v-if="receipt.receipt" class="relative group">
                                        <img @click="openImage(receipt.receipt)" :src="receipt.receipt" alt="Receipt"
                                            class="w-16 h-16 object-cover rounded-md shadow cursor-pointer transition transform hover:scale-105" />
                                        <div
                                            class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-md transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span v-else class="text-sm text-gray-500 italic">ไม่มีใบเสร็จ</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                    formatDate(receipt.createdAt) }}</td>

                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <p class="mt-3 p-2 rounded-full text-center" :class="{
                                        'bg-yellow-200 text-yellow-800': receipt.status === 'รอส่งไฟล์',
                                        'bg-green-200 text-green-800': receipt.status === 'ส่งไฟล์แล้ว'
                                    }">
                                        {{ receipt.status }}
                                    </p>
                                </td>

                                <div v-if="position === 'owner' && receipt.status !== 'ส่งไฟล์แล้ว'" class="px-6 py-4 whitespace-nowrap text-center">
                                    <button @click="openUploadDialog(receipt.projectID, receipt._id)"
                                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                                        </svg>
                                        ส่งใบเสร็จ
                                    </button>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <dialog ref="uploadDialog"
        class="rounded-lg shadow-lg max-w-md w-full p-0 backdrop:bg-gray-900 backdrop:bg-opacity-50">
        <div class="bg-white p-6 rounded-lg">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">อัปโหลดใบเสร็จ</h2>
                <button @click="closeUploadDialog" class="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6 bg-gray-50">
                <div v-if="previewImage" class="mb-4">
                    <img :src="previewImage" alt="Preview" class="max-h-48 mx-auto rounded shadow">
                    <button @click="selectedFile = null; selectedFileBase64 = null; previewImage = null"
                        class="mt-2 text-sm text-red-600 hover:text-red-800">
                        ลบรูปภาพ
                    </button>
                </div>
                <div v-else>
                    <label for="file-upload" class="cursor-pointer flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="mt-1 text-sm text-gray-600">คลิกเพื่อเลือกไฟล์</p>
                    </label>
                    <input id="file-upload" type="file" @change="handleFileChange" accept="image/*" class="hidden">
                </div>
            </div>

            <div class="flex justify-end space-x-3 w-full">
                <button @click="closeUploadDialog"
                    class="px-4 py-2 w-full bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    ยกเลิก
                </button>
                <button @click="uploadReceipt"
                    class="px-4 py-2 bg-green-600 w-full text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
                    :disabled="!selectedFileBase64" :class="{ 'opacity-50 cursor-not-allowed': !selectedFileBase64 }">
                    <div class="flex justify-center w-full items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                        </svg>
                        อัปโหลด
                    </div>
                </button>
            </div>
        </div>
    </dialog>
</template>