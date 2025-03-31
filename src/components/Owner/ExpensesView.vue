<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2';
import axios from 'axios';

const expenses = ref([])

const fetchExpenses = async () => {
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
    }
};

const approve = async (expenseId) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/invoice/complete/${expenseId}`);

        Swal.fire({
            icon: 'success',
            title: 'อนุมัติสำเร็จ',
            text: 'สถานะได้ถูกเปลี่ยนเป็น "อนุมัติสำเร็จ"',
        });

        await fetchExpenses()
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
        const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/invoice/cancle/${expenseId}`);

        Swal.fire({
            icon: 'success',
            title: 'ยกเลิกการอนุมัติ',
            text: 'สถานะได้ถูกเปลี่ยนเป็น "ไม่อนุมัติ"',
        });

        await fetchExpenses()
    } catch (error) {
        console.error("Error approving expense:", error);
        Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถยกเลิกการอนุมัติได้',
            text: error.message || 'โปรดลองอีกครั้ง',
        });
    }
};

onMounted(async () => {
    await fetchExpenses()
    console.log('Expenses :', expenses.value)
})
</script>

<template>
    <div>
        <div class="flex justify-center mt-3">
            <p class="text-2xl font-bold">รายการเบิกค่าใช้จ่าย</p>
        </div>

        <div class="mt-6 overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr class="bg-gray-100 text-left">
                        <th class="px-6 py-3 font-semibold text-sm text-gray-600">รหัส</th>
                        <th class="px-6 py-3 font-semibold text-sm text-gray-600">หัวข้อ</th>
                        <th class="px-6 py-3 font-semibold text-sm text-gray-600">ชื่อ</th>
                        <th class="px-6 py-3 font-semibold text-sm text-gray-600">จำนวนเงิน</th>
                        <th class="px-6 py-3 font-semibold text-sm text-gray-600">หมายเหตุ</th>
                        <th class="px-6 py-3 font-semibold text-sm text-gray-600">สถานะ</th>
                        <th class="px-6 py-3 font-semibold text-sm text-gray-600">วันที่</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="expense in expenses" :key="expense._id" class="border-b hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm text-gray-800">{{ expense.expensesID }}</td>
                        <td class="px-6 py-4 text-sm text-gray-800">{{ expense.title }}</td>
                        <td class="px-6 py-4 text-sm text-gray-800">{{ expense.firstname }} {{ expense.lastname }}</td>
                        <td class="px-6 py-4 text-sm text-gray-800">{{ expense.totalAmount }} บาท</td>
                        <td class="px-6 py-4 text-sm text-gray-800">{{ expense.remark }}</td>
                        <td class="px-6 py-4 text-sm text-gray-800">
                            <div class="">
                                <p class="p-2 rounded-lg" :class="{
                                    'bg-yellow-200 w-fit': expense.status === 'รอการอนุมัติ',
                                    'bg-green-100 w-fit': expense.status === 'อนุมัติสำเร็จ',
                                    'bg-red-100 w-fit': expense.status === 'ไม่อนุมัติ'
                                }">{{ expense.status }}</p>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-800">{{ new
                            Date(expense.createdAt).toLocaleDateString('th-TH') }}</td>
                        <td>
                            <div v-if="expense.status !== 'อนุมัติสำเร็จ' && expense.status !== 'ไม่อนุมัติ'" class="flex space-x-4">
                                <button @click="approve(expense._id)"
                                    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                    อนุมัติ
                                </button>

                                <button @click="disapprove(expense._id)"
                                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    ไม่อนุมัติ
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>
