<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const invoice = ref([]);
const isLoading = ref(true);

const fetchProject = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project`);
        invoice.value = response.data.data;
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

const openImage = (imageUrl) => {
    if (imageUrl) {
        Swal.fire({
            imageUrl: imageUrl,
            imageAlt: "Project Image",
            showCloseButton: true,
            showConfirmButton: false,
            width: "30%",
        });
    }
};

const getStatusColor = (imageExists) => {
    return imageExists ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500';
};

const getStatusText = (imageExists) => {
    return imageExists ? 'เสร็จสิ้น' : 'รอดำเนินการ';
};

onMounted(fetchProject);
</script>

<template>
    <div class="container mx-auto px-4 py-8 max-w-6xl bg-gray-50 min-h-screen">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800 text-center">ประวัติใบแจ้งหนี้</h1>
            <div class="h-1.5 w-32 bg-green-600 mx-auto mt-3 rounded-full"></div>
            <p class="text-center text-gray-600 mt-3">ติดตามความคืบหน้าของโครงการต่างๆ ได้ที่นี่</p>
        </div>

        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <span class="ml-3 text-lg text-gray-600">กำลังโหลดข้อมูล...</span>
        </div>

        <!-- No data state -->
        <div v-else-if="invoice.length === 0" class="text-center py-12 bg-white rounded-lg shadow">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="mt-4 text-lg text-gray-600">ไม่พบข้อมูลใบแจ้งหนี้</p>
        </div>

        <!-- Data table -->
        <div v-else class="bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-green-600 text-white">
                            <th class="px-6 py-4 text-left">โครงการ</th>
                            <th class="px-6 py-4 text-center">สำรวจ</th>
                            <th class="px-6 py-4 text-center">กระบวนการ</th>
                            <th class="px-6 py-4 text-center">ทดสอบ</th>
                            <th class="px-6 py-4 text-center">ส่งมอบ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in invoice" :key="item._id"
                            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                            <td class="px-6 py-4 border-b border-gray-200">
                                <div class="font-medium text-gray-900">{{ item.title }}</div>
                            </td>

                            <td class="px-6 py-4 border-b border-gray-200">
                                <div class="flex flex-col items-center">
                                    <div v-if="item.img_surway"
                                        class="relative mb-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        @click="openImage(item.img_surway)">
                                        <img :src="item.img_surway" alt="Survey" class="w-20 h-20 object-cover">
                                        <div
                                            class="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span
                                                class="text-white text-xs font-medium px-2 py-1 bg-black bg-opacity-50 rounded">ดูรูปภาพ</span>
                                        </div>
                                    </div>
                                    <span v-else
                                        class="w-20 h-20 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
                                        ไม่มีรูปภาพ
                                    </span>
                                    <span
                                        :class="`text-xs font-medium px-2 py-1 rounded-full mt-1 ${getStatusColor(item.img_surway)}`">
                                        {{ getStatusText(item.img_surway) }}
                                    </span>
                                </div>
                            </td>

                            <td class="px-6 py-4 border-b border-gray-200">
                                <div class="flex flex-col items-center">
                                    <div v-if="item.img_process"
                                        class="relative mb-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        @click="openImage(item.img_process)">
                                        <img :src="item.img_process" alt="Process" class="w-20 h-20 object-cover">
                                        <div
                                            class="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span
                                                class="text-white text-xs font-medium px-2 py-1 bg-black bg-opacity-50 rounded">ดูรูปภาพ</span>
                                        </div>
                                    </div>
                                    <span v-else
                                        class="w-20 h-20 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
                                        ไม่มีรูปภาพ
                                    </span>
                                    <span
                                        :class="`text-xs font-medium px-2 py-1 rounded-full mt-1 ${getStatusColor(item.img_process)}`">
                                        {{ getStatusText(item.img_process) }}
                                    </span>
                                </div>
                            </td>

                            <td class="px-6 py-4 border-b border-gray-200">
                                <div class="flex flex-col items-center">
                                    <div v-if="item.img_testing"
                                        class="relative mb-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        @click="openImage(item.img_testing)">
                                        <img :src="item.img_testing" alt="Testing" class="w-20 h-20 object-cover">
                                        <div
                                            class="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span
                                                class="text-white text-xs font-medium px-2 py-1 bg-black bg-opacity-50 rounded">ดูรูปภาพ</span>
                                        </div>
                                    </div>
                                    <span v-else
                                        class="w-20 h-20 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
                                        ไม่มีรูปภาพ
                                    </span>
                                    <span
                                        :class="`text-xs font-medium px-2 py-1 rounded-full mt-1 ${getStatusColor(item.img_testing)}`">
                                        {{ getStatusText(item.img_testing) }}
                                    </span>
                                </div>
                            </td>

                            <td class="px-6 py-4 border-b border-gray-200">
                                <div class="flex flex-col items-center">
                                    <div v-if="item.img_deliverwork"
                                        class="relative mb-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                        @click="openImage(item.img_deliverwork)">
                                        <img :src="item.img_deliverwork" alt="Deliver Work"
                                            class="w-20 h-20 object-cover">
                                        <div
                                            class="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span
                                                class="text-white text-xs font-medium px-2 py-1 bg-black bg-opacity-50 rounded">ดูรูปภาพ</span>
                                        </div>
                                    </div>
                                    <span v-else
                                        class="w-20 h-20 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
                                        ไม่มีรูปภาพ
                                    </span>
                                    <span
                                        :class="`text-xs font-medium px-2 py-1 rounded-full mt-1 ${getStatusColor(item.img_deliverwork)}`">
                                        {{ getStatusText(item.img_deliverwork) }}
                                    </span>
                                </div>
                            </td>
                            <td class="px-6 py-4 border-b border-gray-200 text-center">
                                <button
                                    v-if="item.img_surway && item.img_process && item.img_testing && item.img_deliverwork"
                                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                    @click="sendInvoice(item._id)">
                                    ส่งใบแจ้งหนี้
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>