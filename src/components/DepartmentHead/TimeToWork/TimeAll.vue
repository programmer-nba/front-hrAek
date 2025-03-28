<template>
    <div class=" px-4 ">
        <div class="sm:flex sm:items-center sm:justify-between mt-6">
            <div>
                <div class="flex items-center gap-x-3 mt-4">
                    <h2 class="text-lg font-medium text-gray-800 ">เวลาเข้างานทั้งหมด</h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
                        {{ Time.length }} รายการ</span>
                </div>

            </div>


        </div>

        <div class="mt-6 md:flex md:items-center md:justify-between">
            <div v-if="activeType === 'table'"
                class="inline-flex overflow-hidden bg-white border border-[#7BD3EA] divide-x rounded-lg  rtl:flex-row-reverse  ">
                <button @click="showAllItems"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'all' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200  sm:text-sm hover:bg-[#B4D4FF]">
                    วัน
                </button>

                <button @click="showItemsByPosition('รอผู้จัดการอนุมัติ')"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'รอผู้จัดการอนุมัติ' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200 sm:text-sm hover:bg-[#B4D4FF]">
                    เดือน
                </button>

                <button @click="showItemsByPosition('อนุมัติแล้ว')"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'อนุมัติแล้ว' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200 sm:text-sm hover:bg-[#B4D4FF]">
                    ปี
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
            <div
                class="inline-flex overflow-hidden bg-white border border-[#7BD3EA] divide-x rounded-lg  rtl:flex-row-reverse mt-4 sm:mt-0 ">
                <button @click="showDisplay('table')"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeType === 'table' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200  sm:text-sm hover:bg-[#B4D4FF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                        <path fill="currentColor" fill-rule="evenodd"
                            d="M4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3m-3 1.5a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3zm4.75.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0m1 0A.75.75 0 0 1 8 4.5h2.75a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75M5.25 9a1 1 0 1 0 0-2a1 1 0 0 0 0 2m1 1.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0M8 7.25a.75.75 0 0 0 0 1.5h2.75a.75.75 0 0 0 0-1.5zm-.75 3.5A.75.75 0 0 1 8 10h2.75a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75"
                            clip-rule="evenodd" />
                    </svg>
                </button>

                <button @click="showDisplay('Cascader')"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeType === 'Cascader' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200 sm:text-sm hover:bg-[#B4D4FF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
                        <path fill="currentColor"
                            d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z" />
                    </svg>
                </button>
            </div>
        </div>

 
        <div v-if="activeType === 'table'" class="flex flex-col mt-6">

            <div class="overflow-x-auto p-3">
                <div class="inline-block min-w-full ">
                    <div class="overflow-hidden border border-[#0C359E] rounded-lg">
                        <table class="min-w-full divide-y divide-[#0C359E] ">
                            <thead>
                                <tr
                                    class="text-sm  tracking-wide text-center text-[#DFF5FF] bg-[#0C359E] uppercase border-b border-[#50C4ED]">
                                    <th class="px-2 py-3 ">วันที่</th>

                                    <th class="px-2 py-3">เวลาเข้างานเช้า</th>
                                    <th class="px-2 py-3">เวลาออกงานเช้า</th>

                                    <th class="px-2 py-3">เวลาเข้างานบ่าย</th>
                                    <th class="px-2 py-3 whitespace-nowrap">เวลาออกงานบ่าย</th>

                                    <th class="px-2 py-3"></th>
                                </tr>
                            </thead>
                            <template v-if="paginatedItems.length > 0">
                                <tbody class="divide-y  divide-[#0C359E]">
                                    <tr v-for="( TimeToWork, index) in paginatedItems" :key="index"
                                        class="text-[#000000] ">


                                        <td class="px-2 py-3 text-sm  text-center border-r border-[#0C359E]">
                                            <p class=" text-black "> {{ formatDate(TimeToWork.day) }}</p>
                                        </td>
                                        <td class="px-2 py-3 border-r border-[#0C359E]">
                                            <div>
                                                <p class="text-black text-center text-sm">{{ TimeToWork.morningIn }}</p>
                                            </div>
                                        </td>

                                        <td class="px-2 py-3 text-sm  text-center border-r border-[#0C359E]">
                                            <p class=" text-black "> {{ TimeToWork.morningOut }}</p>
                                        </td>


                                        <td class="px-2 py-3 text-sm  text-center border-r border-[#0C359E]">
                                            <p class=" text-black "> {{ TimeToWork.afterIn }}</p>
                                        </td>
                                        <td class="px-2 py-3 text-sm  text-center border-r border-[#0C359E]">
                                            <p class=" text-black "> {{ TimeToWork.afterOut }}</p>
                                        </td>

                                        <td class="px-2 py-3 text-sm    whitespace-nowrap">
                                            <p class=" text-black text-center">หมายเหตุ</p>
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
                        class="flex items-center  cursor-pointer justify-center w-1/2 px-3 py-2 text-sm text-[#EEF5FF] capitalize transition-colors duration-200 bg-[#4942E4] border rounded-md sm:w-auto gap-x-2 hover:bg-[#11009E]    ">
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
                        class="flex items-center  cursor-pointer justify-center w-1/2 px-3 py-2 text-sm text-[#EEF5FF] capitalize transition-colors duration-200 bg-[#4942E4] border rounded-md sm:w-auto gap-x-2 hover:bg-[#11009E]    ">
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

        <div v-else-if="activeType === 'Cascader'">

            <a-calendar :value="value" @update:value="updateValue">
                <template #dateCellRender="{ current }">
                    <ul class="events">
                        <li v-for="item in TimeCalendar" :key="item.content">
                            <template v-if="current && current.format('YYYY/MM/DD') === item.day">
                                <div class="flex flex-col">
                                    <a-badge :status="item.morningIn ? 'success' : 'error'"
                                        :text="item.morningIn ? 'เข้างานเช้า ' + item.morningIn : 'เข้างานเช้า -'" />
                                    <a-badge :status="item.morningOut ? 'success' : 'error'"
                                        :text="item.morningOut ? 'ออกงานเช้า ' + item.morningOut : 'ออกงานเช้า -'" />
                                    <a-badge :status="item.afterIn ? 'success' : 'error'"
                                        :text="item.afterIn ? 'เข้างานบ่าย ' + item.afterIn : 'เข้างานบ่าย -'" />
                                    <a-badge :status="item.afterOut ? 'success' : 'error'"
                                        :text="item.afterOut ? 'ออกงานบ่าย ' + item.afterOut : 'ออกงานบ่าย -'" />
                                </div>
                            </template>
                        </li>
                    </ul>
                </template>
                <template #monthCellRender="{ current }">
                    <div v-if="current" class="flex flex-col">
                        <template v-if="getDaysWithTime(current)">
                            <a-badge :status="'success'" :text="getDaysWithTime(current)" />
                        </template>
                        <template v-if="getMissingDays(current)">
                            <a-badge :status="'error'" :text="getMissingDays(current)" />
                        </template>
                    </div>
                </template>
            </a-calendar>




        </div>



    </div>



</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            Time: [],
            me: {},
            searchTerm: '',
            itemsPerPage: 10,
            currentPage: 1,
            activeStatus: 'all',
            missingDates: [],
            TimeCalendar: [],
            activeType: 'table',
            value: ''
        };
    },
    mounted() {
        this.fetchTime();
        this.fetchTimeCalendar();

    },

    computed: {
        filteredItems() {
            if (!this.searchTerm) {
                return this.Time.filter(item => this.activeStatus === 'all' || item.Status_document === this.activeStatus);
            } else {
                const searchTerm = this.searchTerm.toLowerCase();
                const filteredTime = this.Time.filter(item => {
                    return Object.values(item).some(value => {
                        if (typeof value === 'string') {
                            return value.toLowerCase().includes(searchTerm);
                        }
                        return false;
                    }) && (this.activeStatus === 'all' || item.Status_document === this.activeStatus);
                });
                return filteredTime;
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
        getDaysWithTime(current) {
            if (!current || !current.month) return '';

            const today = new Date();
            const isThisYear = current.year() === today.getFullYear();
            const isPastMonth = current.year() === today.getFullYear() && current.month() <= today.getMonth();

            if (isThisYear && isPastMonth) {
                const monthData = this.getMonthData(current);
                return `ลงเวลา ${monthData.daysWithTime} วัน`;
            } else {
                return '';
            }
        },
        getMissingDays(current) {
            if (!current || !current.month) return '';

            const today = new Date();
            const isThisYear = current.year() === today.getFullYear();
            const isPastMonth = current.year() === today.getFullYear() && current.month() <= today.getMonth();

            if (isThisYear && isPastMonth) {
                const monthData = this.getMonthData(current);
                return `ขาด ${monthData.missingDays} วัน`;
            } else {
                return '';
            }
        },
        getMonthData(current) {
            if (!current || !current.month) return { daysWithTime: 0, missingDays: 0 };

            const month = current.month();
            const year = current.year();
            const daysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();

            const monthData = this.TimeCalendar.filter(item => {
                const itemYear = dayjs(item.day).year();
                const itemMonth = dayjs(item.day).month();
                return itemYear === year && itemMonth === month;
            });

            const daysWithTime = monthData.length;
            const missingDays = daysInMonth - daysWithTime;

            return { daysWithTime, missingDays };
        },


        async fetchTimeCalendar() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                this.TimeCalendar = response.data.data.reverse();
                console.log("เวลา", response.data);
            } catch (error) {
                console.error("Error fetching Time:", error);
            }
        },


        async fetchTime() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                this.Time = response.data.data.reverse();
                console.log("เวลา", response.data);

                // ตรวจสอบและแทรกข้อมูลของวันที่ที่ขาดโดยอัตโนมัติ
                this.insertMissingDates();

            } catch (error) {
                console.error("Error fetching Time:", error);
            }
        },

        insertMissingDates() {
            // สร้างอาร์เรย์ของวันที่ที่มีอยู่ในข้อมูลที่ได้รับมา
            const existingDates = this.Time.map(item => item.day);

            // คำนวณวันที่เริ่มต้นของเดือนปัจจุบัน
            const startDate = dayjs().startOf('month');
            // คำนวณวันที่สิ้นสุดของเดือนปัจจุบัน
            const endDate = dayjs().endOf('month');
            // คำนวณวันที่ปัจจุบัน
            const currentDate = dayjs().startOf('day');

            for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate, 'day'); date = date.add(1, 'day')) {
                const formattedDate = date.format('YYYY/MM/DD');
                // ถ้าวันที่นี้ยังไม่มีอยู่ในข้อมูล และเป็นวันที่น้อยกว่าหรือเท่ากับวันปัจจุบัน
                if (!existingDates.includes(formattedDate) && (date.isBefore(currentDate, 'day') || date.isSame(currentDate, 'day'))) {
                    // สร้างข้อมูลใหม่สำหรับวันที่นี้และแทรกลงในตาราง
                    const missingData = {
                        day: formattedDate
                    };
                    this.Time.push(missingData);
                }
            }

            // เรียงลำดับข้อมูลใหม่ให้เรียงตามวันที่
            this.Time.sort((a, b) => {
                return dayjs(b.day).diff(dayjs(a.day));
            });

            // รีเฟรชข้อมูลใน filteredItems และ paginatedItems
            this.$nextTick(() => {
                this.$forceUpdate();
            });
        },


        updateValue(newValue) {
            this.value = newValue;
        },
        showDisplay(Type) {
            this.activeType = Type;
        },
        formatDate(dateString) {
            const date = dayjs(dateString);
            const thaiDate = date.locale('th').format('DD/MM/YYYY');
            return thaiDate;
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
                console.error("Error fetching Time:", error);

            })
        },

        showAllItems() {
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
                this.fetchTime();
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
                this.fetchTime();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        formatDateTimeThai(dateTime) {
            return dayjs(dateTime).locale('th').format('DD/MM/YYYY HH:mm:ss');
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


<style scoped>
.events {
    list-style: none;
    margin: 0;
    padding: 0;
}

.events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
}

.notes-month {
    text-align: center;
    font-size: 28px;
}

.notes-month section {
    font-size: 28px;
}
</style>