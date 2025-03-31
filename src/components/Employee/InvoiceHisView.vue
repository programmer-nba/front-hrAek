<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const invoice = ref([])
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

onMounted(async () => {
    await fetchProject()
    console.log('invoice : ', invoice.value)
})
</script>

<template>
    <div class="container mx-auto px-4 py-6 max-w-6xl">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800 text-center">ประวัติใบแจ้งหนี้</h1>
            <div class="h-1 w-24 bg-blue-500 mx-auto mt-2 rounded-full"></div>
        </div>
    </div>
</template>

<style scoped>

</style>