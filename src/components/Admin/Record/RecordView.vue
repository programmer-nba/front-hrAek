<template>
    <section class="container px-4 mx-auto w-full  ">
        <div class="sm:flex sm:items-center sm:justify-between mt-6">
            <div>
                <div class="flex items-center gap-x-3 mt-4">
                    <h2 class="text-lg font-medium text-gray-800 ">คำขอบันทึกข้อความทั้งหมด</h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
                        {{ records.length }} รายการ</span>
                </div>

            </div>

            <div class="flex items-center mt-4 gap-x-3">


                <button @click="goToAddRecordPage"
                    class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <span>เพิ่มบันทึกข้อความ</span>
                </button>
            </div>
        </div>

        <div class="mt-6 md:flex md:items-center md:justify-between">
            <div
                class="inline-flex overflow-hidden bg-white border border-[#7BD3EA] divide-x rounded-lg  rtl:flex-row-reverse  ">
                <button @click="showAllItems"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'all' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200  sm:text-sm hover:bg-[#B4D4FF]">
                    all
                </button>

                <button @click="showItemsByPosition('รอผู้บริหารอนุมัติ')"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'รอผู้บริหารอนุมัติ' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200 sm:text-sm hover:bg-[#B4D4FF]">
                    รออนุมัติ
                </button>

                <button @click="showItemsByPosition('อนุมัติ')"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'อนุมัติ' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200 sm:text-sm hover:bg-[#B4D4FF]">
                    อนุมัติแล้ว
                </button>
            </div>

            <div class="relative flex items-center mt-4 md:mt-0">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 ">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>

                <input type="text" v-model="searchTerm" placeholder="Search" class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  focus:border-blue-400 
                    focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">

            </div>
        </div>

        <div class="flex flex-col mt-6">

            <div class="overflow-x-auto p-3">
                <div class="inline-block min-w-full ">
                    <div class="overflow-hidden border border-[#0C359E] rounded-lg">
                        <table class="min-w-full divide-y divide-[#0C359E] ">
                            <thead>
                                <tr
                                    class="text-sm  tracking-wide text-center text-[#DFF5FF] bg-[#0C359E] uppercase border-b border-[#50C4ED]">
                                    <th class="px-2 py-3 whitespace-nowrap">เลขที่ข้อความ</th>
                                    <th class="px-2 py-3 ">พนักงาน</th>

                                    <th class="px-2 py-3">ประเภท</th>
                                    <th class="px-2 py-3">รายละเอียด</th>

                                    <th class="px-2 py-3">สถานะ</th>
                                    <th class="px-2 py-3 whitespace-nowrap">วันที่ทำรายการ</th>

                                    <th class="px-2 py-3"></th>
                                </tr>
                            </thead>
                            <template v-if="paginatedItems.length > 0">
                                <tbody class="divide-y  divide-[#0C359E]">
                                    <tr v-for="( record, index) in paginatedItems" :key="index" class="text-[#000000] ">

                                        <td class="px-2 py-3 border-r border-[#0C359E]">

                                            <p class=" text-black text-center">{{ record.Document_id }}</p>

                                        </td>
                                        <td class="px-2 py-3 border-r border-[#0C359E]">
                                            <div>
                                                <p class="text-black text-center text-sm">{{
                                                    getEmployeeName(record.Status_detail[0].employee_id) }}</p>
                                            </div>
                                            <div>
                                                <p class="text-black text-center text-sm">{{
                                                    getEmployeePosition(record.Status_detail[0].employee_id) }}</p>
                                            </div>

                                        </td>

                                        <td class="px-2 py-3 text-sm  text-center border-r border-[#0C359E]">
                                            <p class=" text-black "> {{ record.Type }}</p>
                                        </td>
                                        <td class="px-2 py-3 text-sm border-r border-[#0C359E]"
                                            style="vertical-align: top; max-width: 600px;">
                                            <p class=" text-black"> หัวข้อ: {{ record.Headers }}</p>
                                            <p class=" text-black"> เรียน: {{ record.To }}</p>

                                            <div
                                                style="overflow-wrap: break-word;  max-height: 100px; overflow-y: auto; ">
                                                <p class="text-gray-700" v-html="record.Detail"></p>
                                            </div>
                                        </td>

                                        <td
                                            class="px-2 py-3 text-sm  whitespace-nowrap text-center border-r border-[#0C359E]">
                                            <span
                                                class="py-2 px-2 flex items-center justify-center to-transparent border-2 text-white text-sm rounded-lg "
                                                :class="{
                                                    'bg-gradient-to-t from-[#FC4F00] via-[#FF8B13] border-[#FE6244]': record.Status_document === 'รอตรวจสอบ',
                                                    'bg-gradient-to-t from-[#ff0844] via-[#C70039] border-[#B80000]': record.Status_document === 'ไม่อนุมัติ',
                                                    'bg-gradient-to-t from-blue-600 via-[#3081D0] border-[#3081D0]': record.Status_document === 'รอหัวหน้าแผนกอนุมัติ',
                                                    'bg-gradient-to-t from-[#FF8787] via-[#FF8F8F] border-[#FA7070]': record.Status_document === 'รอผู้จัดการอนุมัติ',

                                                    'bg-gradient-to-t from-[#974EC3] via-[#9575DE] border-[#711DB0]': record.Status_document === 'รอผู้บริหารอนุมัติ',
                                                    'bg-gradient-to-t from-[#379237] via-[#82CD47] border-[#82CD47]': record.Status_document === 'อนุมัติ'
                                                }">
                                                {{ record.Status_document }}
                                            </span>
                                        </td>
                                        <td class="px-2 py-3 text-sm  text-center border-r border-[#0C359E]">
                                            <p class=" text-black"> {{ formatDateTimeThai(record.date_start) }}</p>
                                        </td>
                                        <td class="px-2 py-3 text-sm    whitespace-nowrap">

                                            <div  class="grid grid-cols-1  lg:grid-cols-1 xl:grid-cols-2 gap-2 ">
                                                <button v-if="record.Status_document === 'รอผู้บริหารอนุมัติ'" @click="approveDocument(record)"
                                                    class="Btn inline-flex  items-center justify-center ">
                                                    <span
                                                        class="svgContainer inline-flex justify-center items-center px-2 py-3  bg-opacity-20 bg-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                            class="text-white" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2"
                                                            stroke-linecap="round" stroke-linejoin="round">
                                                            <polyline points="9 11 12 14 22 4"></polyline>
                                                            <path
                                                                d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11">
                                                            </path>
                                                        </svg> </span>
                                                    <span
                                                        class="px-4 w-full text-base inline-flex justify-center items-center text-white">อนุมัติ</span>
                                                </button>

                                                <button v-if="record.Status_document === 'รอผู้บริหารอนุมัติ'" @click="confirmRejectDocument(record)"
                                                    class="btn w-full py-2  border-2 border-red-800 transition duration-1000 ease-in-out hover:bg-red-200">
                                                    <span
                                                        class="text-md text-red-900 text-base font-normal">ไม่อนุมัติ</span>
                                                </button>


                                            </div>

                                            <div  class="flex-wrap flex mt-1 flex-col">

                                                <button v-if="record.Status_document === 'รอผู้บริหารอนุมัติ'" @click="openModalEdit(record)"
                                                    class="BtnEdit  inline-flex   items-center justify-center ">
                                                    <span
                                                        class="svgContainer inline-flex justify-center items-center px-2 py-3  bg-opacity-20 bg-white">
                                                        <svg class="text-white" xmlns="http://www.w3.org/2000/svg"
                                                            width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" stroke-width="2"
                                                            stroke-linecap="round" stroke-linejoin="round">
                                                            <path
                                                                d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34">
                                                            </path>
                                                            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                                                        </svg> </span>
                                                    <span
                                                        class="px-4 w-full text-base inline-flex justify-center items-center text-white">แก้ไข</span>
                                                </button>


                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="6" class="text-center py-4 text-black">ไม่มีรายการคำขอ</td>
                                </tr>
                            </template>
                        </table>
                    </div>
                </div>
            </div>
            <div class="mt-6 sm:flex sm:items-center sm:justify-between mb-6">
                <div class="text-sm text-black ">
                    หน้า <span class="font-medium text-black">{{ currentPage }} / {{ totalPages }}</span>
                </div>

                <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="flex items-center  cursor-pointer justify-center w-1/2 px-5 py-2 text-sm text-[#EEF5FF] capitalize transition-colors duration-200 bg-[#4942E4] border rounded-md sm:w-auto gap-x-2 hover:bg-[#11009E]    ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 rtl:-sca[#11009E]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>
                            ก่อนหน้า
                        </span>
                    </button>

                    <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="flex items-center  cursor-pointer justify-center w-1/2 px-5 py-2 text-sm text-[#EEF5FF] capitalize transition-colors duration-200 bg-[#4942E4] border rounded-md sm:w-auto gap-x-2 hover:bg-[#11009E]    ">
                        <span>
                            ถัดไป
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>

    </section>

    <a-modal v-model:open="modalEdit" centered>
        <template #footer>
            <div class="flex justify-end  mt-4 space-x-2">
                <button @click="modalEdit = false"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300">ยกเลิก</button>
                <button @click="saveEdit"
                    class="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">ยืนยัน</button>
            </div>
        </template>

        <div class="my-6">
            <div class="bg-white  w-full">
                <h1 class="text-xl font-semibold mb-2">กรอกรายละเอียดที่ต้องการแก้ไข</h1>
                <textarea v-model="remark" rows="6" placeholder="รายละเอียด..."
                    class="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"></textarea>


            </div>
        </div>
    </a-modal>


</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            records: [],
            me: {},
            searchTerm: '',
            itemsPerPage: 10,
            currentPage: 1,
            activeStatus: 'all',
            Employees: [],
            modalEdit: false,
            remark: '',
        };
    },
    mounted() {
        this.fetchME();
        this.showAllItems();
        this.getEmployee();
    },
    computed: {
        filteredItems() {
            if (!this.searchTerm) {
                return this.records.filter(item => this.activeStatus === 'all' || item.Status_document === this.activeStatus);
            } else {
                const searchTerm = this.searchTerm.toLowerCase();

                const filteredRecords = this.records.filter(item => {
                    // Check if search term exists in any field
                    return Object.values(item).some(value => {
                        if (typeof value === 'string') {
                            return value.toLowerCase().includes(searchTerm);
                        }
                        return false;
                    }) && (this.activeStatus === 'all' || item.Status_document === this.activeStatus);
                });
                console.log("Filtered records:", filteredRecords);
                return filteredRecords;
            }
        },

        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = this.currentPage * this.itemsPerPage;
            return this.filteredItems.slice(startIndex, endIndex);
        },
    },
    methods: {
        saveEdit(record) {
            if (!this.remark) {
                Swal.fire({
                    icon: 'warning',
                    title: 'ผิดพลาด',
                    text: 'กรุณากรอก Remark ก่อนที่จะบันทึกข้อมูล',
                });
                return;
            }
            const dataToSend = {
                statusApprove: "แก้ไข",
                remark: this.remark
            };

            axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/document/update/status/${this.record._id}`, dataToSend,
                {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                })
                .then(response => {
                    console.log('Response from API:', response);
                    this.modalEdit = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'สำเร็จ!',
                        text: 'ข้อมูลได้ถูกส่งเรียบร้อยแล้ว',
                    });
                    this.fetchRecords();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },

        openModalEdit(record) {
            this.record = record;
            this.modalEdit = true;
        },


        getEmployeeName(employeeId) {
            const employee = this.Employees.find(el => el._id === employeeId);
            if (employee) {
                return `${employee.name_title} ${employee.first_name} ${employee.last_name} `;
            } else {
                return '-';
            }
        },
        getEmployeePosition(employeeId) {
            const employee = this.Employees.find(el => el._id === employeeId);
            if (employee) {
                return employee.position;
            } else {
                return '-';
            }
        },

        async getEmployee() {
            await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/get`, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            }).then((res) => {
                console.log("em", res.data.data);
                this.Employees = res.data.data;
            }).catch((error) => {
                console.error("Error fetching records:", error);

            })
        },
        async approveDocument(record) {
            try {
                await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/document/update/status/${record._id}`, { statusApprove: "อนุมัติ" },
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                Swal.fire({
                    icon: 'success',
                    text: 'อนุมัติสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.fetchRecords();
            } catch (error) {
                console.error("Error approving document:", error);
                // Show error message
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'เกิดข้อผิดพลาดในการอนุมัติเอกสาร',
                    confirmButtonColor: '#1D24CA',
                    confirmButtonText: 'ตกลง'
                });
            }
        },
        async rejectDocument(record) {
            try {
                await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/document/update/status/${record._id}`, { statusApprove: "ไม่อนุมัติ" },
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                Swal.fire({
                    icon: 'success',
                    text: 'ไม่อนุมัติสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.fetchRecords();
            } catch (error) {
                console.error("Error rejecting document:", error);
                // Show error message
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: 'เกิดข้อผิดพลาดในการไม่อนุมัติเอกสาร',
                    confirmButtonColor: '#1D24CA',
                    confirmButtonText: 'ตกลง'
                });
            }
        },
        async confirmRejectDocument(record) {
            const confirmed = await Swal.fire({
                icon: 'warning',
                text: 'คุณแน่ใจหรือไม่ที่จะไม่อนุมัติเอกสารนี้?',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#9BB0C1',
                confirmButtonText: 'ใช่, ไม่อนุมัติ',
                cancelButtonText: 'ยกเลิก'
            });

            if (confirmed.isConfirmed) {
                this.rejectDocument(record);
            }
        },

        showAllItems() {
            // Show all items
            this.activeStatus = 'all';
            this.currentPage = 1;
        },
        showItemsByPosition(Status_document) {
            this.activeStatus = Status_document;
            this.currentPage = 1;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        async fetchRecords() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/document/getall`);

                this.records = response.data.data.reverse();

                console.log("คำขอบันทึกข้อความ", response.data);
            } catch (error) {
                console.error("Error fetching records:", error);
            }
        },
        goToAddRecordPage() {
            this.$router.push('/Record/AddRecord');
        },
        async deleteDocument(_id) {
            try {
                await axios.delete(`${import.meta.env.VITE_VUE_APP_DECCAN}/document/delete/${_id}`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                Swal.fire({
                    icon: 'success',
                    text: 'ลบข้อมูลสำเร็จ',
                    timer: 2000,
                    showConfirmButton: false,

                });
                this.fetchRecords();
                console.log(`Item with ID ${_id} deleted successfully.`);
            } catch (error) {
                console.error(`Error deleting item with ID ${_id}:`, error);
                Swal.fire({
                    icon: 'error',
                    text: error.response.data.message,
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        },
        async fetchME() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getme `,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                this.me = response.data.data;
                console.log(response.data.data._id);
                this.fetchRecords();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        formatDateTimeThai(dateTime) {
            return dayjs(dateTime).locale('th').format('DD/MM/YYYY HH:mm:ss'); // ใช้ locale เป็น 'th' และรูปแบบ 'DD/MM/YYYY HH:mm:ss'
        }

    },
};
</script>

<style>
.Btn {
    background: linear-gradient(-45deg, #0C359E, #0B60B0, #0C359E, #0B60B0);
    background-size: 400% 400%;
}

.BtnEdit {
    background: linear-gradient(-45deg, #FAA300, #FFC700, #FAA300, #FFC700);
    background-size: 400% 400%;
}

.BtnEdit:hover {
    animation: gradient 5s ease infinite;
}

.Btn:hover {
    animation: gradient 5s ease infinite;
}

/* Button's gradient animation */
@keyframes gradient {
    0% {
        background-position: 0 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}
</style>