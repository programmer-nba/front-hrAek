<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const timeinout = ref([]);
const isLoading = ref(true);
const dateFilter = ref('');
const searchTerm = ref('');

// Filter options
const startDate = ref('');
const endDate = ref('');
const selectedProject = ref('');

const uniqueProjects = ref([]);

const fetchTimeiout = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/timeinout`);
        const rawData = response.data.data;

        for (let time of rawData) {
            await fetchProjectName(time);
            await fetchEmployeeID(time);
        }

        const projects = new Set(rawData.map(item => item.projectName).filter(Boolean));
        uniqueProjects.value = Array.from(projects);

        timeinout.value = groupTimeEntries(rawData);
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

const fetchEmployeeID = async (time) => {
    if (!time.employeeId) return;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getid/${time.employeeId}`);
        time.employeeName = response.data.data.first_name;
        time.employeeLastname = response.data.data.last_name;
    } catch (error) {
        console.error("Error fetching employee name:", error);
        time.employeeName = "ไม่พบข้อมูล";
        time.employeeLastname = "";
    }
};

const fetchProjectName = async (time) => {
    if (!time.projectId) return;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/${time.projectId}`);
        time.projectName = response.data.data.title;
        time.projectCode = response.data.data.projectCode;
    } catch (error) {
        console.error("Error fetching project name:", error);
        time.projectName = "ไม่พบข้อมูล";
        time.projectCode = "";
    }
};

const groupTimeEntries = (data) => {
    const grouped = data.reduce((acc, entry) => {
        const datePart = entry.createdAt ? new Date(entry.createdAt).toISOString().split('T')[0] : 'unknown';
        const key = `${entry.employeeId}-${entry.projectId}-${datePart}`;

        if (!acc[key]) {
            acc[key] = {
                employeeId: entry.employeeId,
                employeeName: entry.employeeName,
                employeeLastname: entry.employeeLastname,
                projectName: entry.projectName,
                projectCode: entry.projectCode,
                projectId: entry.projectId,
                date: datePart, // Use extracted date
                createdAt: entry.createdAt,
                timeIn: entry.type === "เข้างาน" ? entry.time : null,
                timeOut: entry.type === "ออกงาน" ? entry.time : null,
                location: entry.location || null,
            };
        } else {
            if (entry.type === "เข้างาน") acc[key].timeIn = entry.time;
            if (entry.type === "ออกงาน") acc[key].timeOut = entry.time;
        }

        return acc;
    }, {});

    return Object.values(grouped);
};

const calculateWorkHours = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return '-';

    const [inHour, inMin] = timeIn.split(':').map(Number);
    const [outHour, outMin] = timeOut.split(':').map(Number);

    let diffHours = outHour - inHour;
    let diffMins = outMin - inMin;

    if (diffMins < 0) {
        diffHours--;
        diffMins += 60;
    }

    return `${diffHours}:${diffMins.toString().padStart(2, '0')}`;
};

const filteredEntries = computed(() => {
    return timeinout.value.filter(entry => {
        // Date range filter
        const entryDate = entry.date ? new Date(entry.date) : null;
        if (!entryDate) return false;

        const hasStartDate = startDate.value !== '';
        const hasEndDate = endDate.value !== '';

        if (hasStartDate && new Date(startDate.value) > entryDate) return false;
        if (hasEndDate && new Date(endDate.value) < entryDate) return false;

        if (selectedProject.value && entry.projectName !== selectedProject.value) return false;


        if (searchTerm.value) {
            const fullName = `${entry.employeeName} ${entry.employeeLastname}`.toLowerCase();
            if (!fullName.includes(searchTerm.value.toLowerCase())) return false;
        }

        return true;
    });
});

const resetFilters = () => {
    startDate.value = '';
    endDate.value = '';
    selectedProject.value = '';
    searchTerm.value = '';
};

const formatDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

const showLocationOnMap = (locationString) => {
    if (!locationString) {
        Swal.fire({
            icon: "info",
            title: "ไม่พบพิกัดสถานที่",
            text: "ไม่มีข้อมูลพิกัดสถานที่สำหรับรายการนี้",
        });
        return;
    }

    const [lat, lng] = locationString.split(',').map(Number);
    const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapUrl, '_blank');
};

onMounted(async () => {
    await fetchTimeiout();
});
</script>

<template>
    <div class="container mx-auto px-4 py-8 max-w-6xl bg-gray-50 min-h-screen">
        <div class="mb-8 text-center">
            <h1 class="text-4xl font-bold text-gray-800">ประวัติลงเวลาพนักงาน</h1>
            <div class="h-1.5 w-32 bg-green-600 mx-auto mt-3 rounded-full"></div>
        </div>

        <div class="bg-white p-4 mb-6 rounded-lg shadow-md">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="flex flex-col">
                    <label class="mb-1 text-gray-600 font-medium">วันที่เริ่มต้น</label>
                    <input type="date" v-model="startDate"
                        class="p-2 border rounded-md focus:ring-green-500 focus:border-green-500">
                </div>
                <div class="flex flex-col">
                    <label class="mb-1 text-gray-600 font-medium">วันที่สิ้นสุด</label>
                    <input type="date" v-model="endDate"
                        class="p-2 border rounded-md focus:ring-green-500 focus:border-green-500">
                </div>
                <div class="flex flex-col">
                    <label class="mb-1 text-gray-600 font-medium">โปรเจกต์</label>
                    <select v-model="selectedProject"
                        class="p-2 border rounded-md focus:ring-green-500 focus:border-green-500">
                        <option value="">ทั้งหมด</option>
                        <option v-for="project in uniqueProjects" :key="project" :value="project">
                            {{ project }}
                        </option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <label class="mb-1 text-gray-600 font-medium">ค้นหาพนักงาน</label>
                    <input type="text" v-model="searchTerm" placeholder="ชื่อพนักงาน"
                        class="p-2 border rounded-md focus:ring-green-500 focus:border-green-500">
                </div>
            </div>
            <div class="flex justify-end mt-4">
                <button @click="resetFilters"
                    class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md mr-2 text-gray-700 transition">
                    รีเซ็ต
                </button>
            </div>
        </div>

        <div v-if="isLoading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p class="mt-4 text-gray-600 text-lg font-medium">กำลังโหลดข้อมูล...</p>
        </div>

        <div v-else>
            <div class="mb-4 flex justify-between items-center">
                <p class="text-gray-700">พบข้อมูลทั้งหมด {{ filteredEntries.length }} รายการ</p>
            </div>

            <div class="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table class="w-full">
                    <thead class="bg-green-700 text-white">
                        <tr class="text-lg">
                            <th class="py-4 px-6 text-left">พนักงาน</th>
                            <th class="py-4 px-6 text-left">โปรเจกต์</th>
                            <th class="py-4 px-6 text-left">วันที่</th>
                            <th class="py-4 px-6 text-left">เวลาเข้า</th>
                            <th class="py-4 px-6 text-left">เวลาออก</th>
                            <th class="py-4 px-6 text-left">เวลาทำงาน</th>
                            <th class="py-4 px-6 text-center">สถานที่</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredEntries.length === 0">
                            <td colspan="7" class="py-8 text-center text-gray-500 italic">ไม่พบข้อมูลที่ตรงกับเงื่อนไข
                            </td>
                        </tr>
                        <tr v-for="(entry, index) in filteredEntries" :key="index"
                            class="border-b hover:bg-gray-50 transition">
                            <td class="py-4 px-6">
                                <div class="flex items-center space-x-3">
                                    <p class="font-medium mt-3">{{ entry.employeeName }} {{ entry.employeeLastname }}</p>
                                </div>
                            </td>
                            <td class="py-4 px-6">
                                <div>
                                    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                        {{ entry.projectName || 'ไม่พบข้อมูล' }}
                                    </span>
                                    <p v-if="entry.projectCode" class="text-xs text-gray-500 mt-1">{{ entry.projectCode
                                        }}</p>
                                </div>
                            </td>
                            <td class="py-4 px-6">{{ formatDate(entry.date) }}</td>
                            <td class="py-4 px-6">
                                <span :class="{ 'text-red-600': !entry.timeIn }">
                                    {{ entry.timeIn || '-' }}
                                </span>
                            </td>
                            <td class="py-4 px-6">
                                <span :class="{ 'text-red-600': !entry.timeOut }">
                                    {{ entry.timeOut || '-' }}
                                </span>
                            </td>
                            <td class="py-4 px-6">
                                <span class="font-medium" :class="{ 'text-red-600': !entry.timeIn || !entry.timeOut }">
                                    {{ calculateWorkHours(entry.timeIn, entry.timeOut) }}
                                </span>
                            </td>
                            <td class="py-4 px-6 text-center">
                                <button v-if="entry.location" @click="showLocationOnMap(entry.location)"
                                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition">
                                    ดูแผนที่
                                </button>
                                <span v-else class="text-gray-400">-</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>