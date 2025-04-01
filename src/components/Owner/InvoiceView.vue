<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const employeeInvoices = ref([]);

const isLoading = ref(true);
const modalInvoice = ref(null);
const selectedFile = ref(null);
const selectedProject = ref(null);
const selectedFileBase64 = ref(null);

const openInvoice = (project) => {
    selectedProject.value = project;
    modalInvoice.value.showModal();
};

const closeInvoice = () => {
    modalInvoice.value.close();
    selectedFile.value = null;
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        selectedFileBase64.value = reader.result;
    };
    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };
};

const fetchEmployeeInvoices = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/invoiceem`);
        employeeInvoices.value = response.data.data;

        for (let invoice of employeeInvoices.value) {
            fetchProjectName(invoice)
            fetchEmployeeID(invoice)
        }
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

const fetchEmployeeID = async (invoice) => {
    if (!invoice.employeeID) return;

    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getid/${invoice.employeeID}`);
        invoice.employeeName = response.data.data.first_name;
        invoice.employeeLastname = response.data.data.last_name;
        invoice.employeePosition = response.data.data.position;
    } catch (error) {
        console.error("Error fetching employee name:", error);
        invoice.employeeName = "ไม่พบข้อมูล";
    }
};

const fetchProjectName = async (invoice) => {
    if (!invoice.projectID) return;

    try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/${invoice.projectID}`);
        invoice.projectName = response.data.data.title;
    } catch (error) {
        console.error("Error fetching project name:", error);
        invoice.projectName = "ไม่พบข้อมูล";
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


const submitInvoice = async () => {
    if (!selectedFileBase64.value) {
        Swal.fire({
            icon: "warning",
            title: "กรุณาเลือกไฟล์ก่อนอัปโหลด",
        });
        return;
    }

    const emID = localStorage.getItem('id')

    try {
        await axios.post(`${import.meta.env.VITE_VUE_APP_DECCAN}/invoicepj`, {
            projectId: selectedProject.value,
            img_invoice: selectedFileBase64.value,
            employeeID: emID
        });

        Swal.fire({
            icon: "success",
            title: "อัปโหลดไฟล์สำเร็จ!",
        });

        closeInvoice();
        fetchEmployeeInvoices();
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "อัปโหลดไฟล์ไม่สำเร็จ",
            text: error.message || "โปรดลองอีกครั้ง",
        });
    }
};

onMounted(async () => {
    await fetchEmployeeInvoices()
    console.log('employeeInvoices', employeeInvoices.value)
});
</script>

<template>
    <div class="container mx-auto px-4 py-8 max-w-6xl bg-gray-50 min-h-screen">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800 text-center">ประวัติใบแจ้งหนี้</h1>
            <div class="h-1.5 w-32 bg-green-600 mx-auto mt-3 rounded-full"></div>
            <p class="text-center text-gray-600 mt-3">ติดตามความคืบหน้าของโครงการต่างๆ ได้ที่นี่</p>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-green-600 text-white">
                            <th class="px-6 py-4 text-left">โครงการ</th>
                            <th class="px-6 py-4 text-left">ผู้ส่ง</th>
                            <th class="px-6 py-4 text-left">ตำแหน่ง</th>
                            <th class="px-6 py-4 text-center">สำรวจ</th>
                            <th class="px-6 py-4 text-center">กระบวนการ</th>
                            <th class="px-6 py-4 text-center">ทดสอบ</th>
                            <th class="px-6 py-4 text-center">ส่งมอบ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="invoice in employeeInvoices" :key="invoice.projectID" class="border-b">
                            <td class="px-6 py-4">{{ invoice.projectName }}</td>
                            <td class="px-6 py-4">
                                <p class="mt-3">{{ invoice.employeeName }} {{ invoice.employeeName }}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p class="mt-3">{{ invoice.employeePosition }}</p>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <img v-if="invoice.img_surway" @click="openImage(invoice.img_surway)"
                                    class="w-16 h-16 object-cover cursor-pointer border rounded-lg"
                                    :src="invoice.img_surway" alt="สำรวจ">
                            </td>
                            <td class="px-6 py-4 text-center">
                                <img v-if="invoice.img_process" @click="openImage(invoice.img_process)"
                                    class="w-16 h-16 object-cover cursor-pointer border rounded-lg"
                                    :src="invoice.img_process" alt="กระบวนการ">
                            </td>
                            <td class="px-6 py-4 text-center">
                                <img v-if="invoice.img_testing" @click="openImage(invoice.img_testing)"
                                    class="w-16 h-16 object-cover cursor-pointer border rounded-lg"
                                    :src="invoice.img_testing" alt="ทดสอบ">
                            </td>
                            <td class="px-6 py-4 text-center">
                                <img v-if="invoice.img_deliverwork" @click="openImage(invoice.img_deliverwork)"
                                    class="w-16 h-16 object-cover cursor-pointer border rounded-lg"
                                    :src="invoice.img_deliverwork" alt="ส่งมอบ">
                            </td>
                            <td class="px-6 py-4 text-center">
                                <div v-if="invoice.employeePosition !== 'ช่างเทคนิค'">
                                    <button @click="openInvoice(invoice.projectID)"
                                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">ส่งใบแจ้งหนี้</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>

    </div>

    <dialog ref="modalInvoice" class="p-6 rounded-lg shadow-xl bg-white w-1/3">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">อัปโหลดไฟล์แนบ</h2>
        <p class="text-sm text-gray-600 mb-3">กรุณาเลือกไฟล์ที่ต้องการอัปโหลด</p>

        <input type="file" @change="handleFileUpload" class="mb-4 w-full border p-2 rounded-lg">

        <div class="flex justify-end gap-2">
            <button @click="closeInvoice"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">ยกเลิก</button>
            <button @click="submitInvoice"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">อัปโหลด</button>
        </div>
    </dialog>
</template>