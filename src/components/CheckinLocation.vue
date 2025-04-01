<script setup>
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import dayjs from 'dayjs';

const props = defineProps({
    projectId: String,
    projectCode: String
});

const timeinout = ref([])

const employeeId = localStorage.getItem("id");
const isModalOpen = ref(false);
const isLoggingTime = ref(false);
const locationError = ref("");
const hasCheckedInToday = ref(false);
const hasCheckedOutToday = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const checkIfCheckedInToday = () => {
    const today = dayjs().format("YYYY-MM-DD");
    hasCheckedInToday.value = timeinout.value.some(log => 
        log.type === "เข้างาน" && 
        log.projectId === props.projectId && 
        dayjs(log.createdAt).format("YYYY-MM-DD") === today
    );

    hasCheckedOutToday.value = timeinout.value.some(log => 
        log.type === "ออกงาน" && 
        log.projectId === props.projectId && 
        dayjs(log.createdAt).format("YYYY-MM-DD") === today
    );
};

const fetchTimeLogs = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/timeinout/employee/${employeeId}`);
        if (response.data.status) {
            timeinout.value = response.data.data; 
            checkIfCheckedInToday()
        } else {
            timeinout.value = [];
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

const CheckInCheckOut = async (timeType) => {
    if (isLoggingTime.value) return;
    isLoggingTime.value = true;

    if (timeType === "เข้างาน" && hasCheckedInToday.value) {
        Swal.fire({
            icon: "warning",
            title: "คุณได้เช็คอินโปรเจคนี้แล้ววันนี้",
            text: "ไม่สามารถเช็คอินซ้ำได้",
        });
        isLoggingTime.value = false;
        return;
    }

    if (timeType === "ออกงาน" && hasCheckedOutToday.value) {
        Swal.fire({
            icon: "warning",
            title: "คุณได้เช็คเอาต์แล้ววันนี้",
            text: "ไม่สามารถเช็คเอาต์ซ้ำได้",
        });
        isLoggingTime.value = false;
        return;
    }

    if (!navigator.geolocation) {
        Swal.fire({
            icon: "error",
            title: "อุปกรณ์ไม่รองรับการระบุตำแหน่ง",
            text: "ไม่สามารถดึงพิกัดได้",
        });
        isLoggingTime.value = false;
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_VUE_APP_DECCAN}/create/log`,
                    {
                        projectId: props.projectId,
                        projectCode: props.projectCode,
                        employeeId,
                        timeType,
                        latitude,
                        longitude,
                    }
                );

                if (response.data.status) {
                    Swal.fire({
                        icon: "success",
                        title: "บันทึกเวลาสำเร็จ",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    // โหลดข้อมูลใหม่เพื่ออัปเดตสถานะเช็คอินและเช็คเอาต์
                    await fetchTimeLogs();
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "ไม่สามารถบันทึกเวลาได้",
                    text: error.message || "โปรดลองอีกครั้ง",
                    showConfirmButton: true,
                });
            } finally {
                isLoggingTime.value = false;
            }
        },
        (error) => {
            locationError.value = error.message;
            Swal.fire({
                icon: "error",
                title: "ไม่สามารถดึงพิกัดได้",
                text: error.message || "โปรดลองอีกครั้ง",
            });
            isLoggingTime.value = false;
        }
    );
};

onMounted(async() => {
    await fetchTimeLogs()

    console.log('timeinout : ' , timeinout)
})
</script>

<template>
    <div class="flex justify-center items-center relative">
        <div @click="openModal"
            class="px-3 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 cursor-pointer hover:text-white">
            <p class="font-bold mt-3">เช็คอินโปรเจคนี้</p>
        </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative z-50">
            <h2 class="text-lg font-bold text-gray-700 mb-4">เลือกประเภทการเช็คอิน</h2>
            <div class="flex">
                <button @click="CheckInCheckOut('เข้างาน')" 
                    :disabled="hasCheckedInToday"
                    :class="hasCheckedInToday ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'"
                    class="w-full py-4 my-2 text-white rounded">
                    {{ hasCheckedInToday ? "เข้างานแล้ววันนี้" : "ลงชื่อเข้างาน" }}
                </button>

                <div class="border-1 m-2"></div>

                <button @click="CheckInCheckOut('ออกงาน')" 
                    :disabled="hasCheckedOutToday"
                    :class="hasCheckedOutToday ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'"
                    class="w-full py-4 my-2 text-white rounded">
                    {{ hasCheckedOutToday ? "ออกงานแล้ววันนี้" : "ลงชื่อออกงาน" }}
                </button>
            </div>

            <button @click="closeModal" class="mt-4 text-gray-500 hover:text-gray-700">ปิด</button>
        </div>
    </div>
</template>