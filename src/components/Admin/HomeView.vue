<template>
    <div class="min-h-screen  pt-6 mb-6 sm:px-24 px-2 bg-[#DCF2F1]">
        
        <div class="mb-4 space-y-2 text-center mt-2">
            <span
                class="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600">
                {{workPeriodLabel }}</span>
            <h2 class="text-2xl text-cyan-900 font-bold">
                <a-statistic-countdown :value="deadline" :value-style="valueStyle" class="custom-statistic">
                    {{ workPeriod }}
                </a-statistic-countdown>
            </h2>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            <div
                class="bg-blue-500  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600  text-white font-medium group">
                <div
                    class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="stroke-current text-blue-800  transform transition-transform duration-500 ease-in-out">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                        </path>
                    </svg>
                </div>
                <div class="text-right">
                    <p class="text-2xl">{{ items.length || 0 }}</p>
                    <p>Employee</p>
                </div>
            </div>


            <div
                class="bg-blue-500  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600  text-white font-medium group">
                <div
                    class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">

                    <svg width="30" height="30"
                        class="stroke-current text-blue-800  transform transition-transform duration-500 ease-in-out"
                        viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor"
                            d="M8 9a4 4 0 1 1 4-4a4 4 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m16 6a4 4 0 1 1 4-4a4 4 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m2 27h-4a2 2 0 0 1-2-2v-7h2v7h4v-9h2v-6a1 1 0 0 0-1-1h-6.42L16 20l-4.58-8H5a1 1 0 0 0-1 1v6h2v9h4v-7h2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1-2-2v-6a3 3 0 0 1 3-3h7.58L16 16l3.42-6H27a3 3 0 0 1 3 3v6a2 2 0 0 1-2 2v7a2 2 0 0 1-2 2" />
                    </svg>
                </div>
                <div class="text-right">
                    <p class="text-2xl">{{ partners.length || 0 }}</p>
                    <p>Parthner</p>
                </div>
            </div>
            <div
                class="bg-blue-500  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600  text-white font-medium group">
                <div
                    class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="stroke-current text-blue-800  transform transition-transform duration-500 ease-in-out">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                </div>
                <div class="text-right">
                    <p class="text-2xl">0</p>
                    <p>งานวันนี้</p>
                </div>
            </div>
            <div
                class="bg-blue-500  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600  text-white font-medium group">
                <div
                    class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">

                    <svg width="30" height="30"
                        class="stroke-current text-blue-800  transform transition-transform duration-500 ease-in-out"
                        viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor"
                            d="M6 3v26h20V9.6l-.3-.3l-6-6l-.3-.3zm2 2h10v6h6v16H8zm12 1.4L22.6 9H20zM10 9v2h6V9zm0 4v2h12v-2zm3.5 3c-.9 0-1.6.6-2 1.3c-.4.7-.5 1.6-.5 2.6c0 .6.2 1.2.3 1.8c-.4.1-.8.4-1.3.4v2c.7 0 1.4-.1 2-.3c.1.2.1.3.3.5c.4.4 1 .7 1.7.7c1.6 0 2.6-1.1 3.3-1.9c.1-.2.2-.3.3-.4c0 .1 0 .2.1.3c.1.2.2.4.4.6c.2.2.6.4.9.4c.6 0 1-.4 1.2-.6c.2-.2.4-.5.6-.7c.4-.4.7-.7 1.1-.7v-2c-1.2 0-2.1.7-2.6 1.3c0-.1 0-.2-.1-.3c-.1-.2-.2-.4-.4-.7c-.2-.3-.5-.3-.8-.3c-.8 0-1.1.5-1.4.8c-.3.3-.6.7-.8 1.1c-.6.7-1 1.1-1.8 1.1c-.1 0-.1-.1-.2-.1c.1 0 .1-.1.2-.1c1.1-.9 2-2.1 2-3.7c0-.8-.2-1.5-.6-2.1c-.4-.6-1.1-1-1.9-1m-.1 2c.3 0 .3 0 .4.2c.1.2.2.5.2 1c0 .6-.3 1.2-.8 1.7c0-.3-.2-.7-.2-.9c0-.8.1-1.4.3-1.7c.1-.2.1-.3.1-.3" />
                    </svg>
                </div>
                <div class="text-right">
                    <p class="text-2xl">{{ Contractor.length || 0 }}</p>
                    <p>สัญญา</p>
                </div>
            </div>
        </div>



        <!-- ./Statistics Cards -->

        <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
            <!-- Recent Activities -->
            <div class="relative flex flex-col min-w-0 break-words bg-[#3468C0]  w-full shadow-lg rounded">


                <img class="w-32 h-32 mx-auto rounded-full -mt-4 border-8 border-white" src="../../assets/man.png"
                    alt="">
                <div class="w-full text-center ">
                    <div class="flex justify-center lg:pt-4 pt-6 pb-0">
                        <div class="p-3 text-center">
                            <span class="text-xl font-bold block uppercase tracking-wide text-white">
                                {{ me.role }}</span>
                            <span class="text-sm text-white">ตำแหน่ง</span>
                        </div>
                        <div class="p-3 text-center">
                            <span class="text-xl font-bold block uppercase tracking-wide text-white">
                                {{ me.position }}</span>
                            <span class="text-sm text-white">แผนก</span>
                        </div>


                    </div>
                </div>
                <div class="text-center mt-2">
                    <h3 class="text-2xl text-white font-bold leading-normal mb-1">
                        {{ me.name_title }} {{ me.first_name }} {{ me.last_name }}

                    </h3>

                </div>
                <div class="flex items-center justify-center gap-2 w-[80%] mx-auto mt-5 mb-4">
                    <button @click="logWorkTime"
                        class="flex-1 border border-[#50C4ED] rounded-[4px] py-3 text-[#124076] 
                        bg-[#C4E4FF] transition-all duration-150 ease-in hover:bg-[#0C359E] hover:text-[#F6F5F5]">ลงเวลาเข้างาน</button>


                </div>

                <div class="-mt-px flex  divide-x divide-gray-200 p-4 bg-[#11009E]">
                    <div class="flex-1 w-0">
                        <div class="flex flex-col justify-center items-center">
                            <h4 class="text-xs font-semibold text-white">เวลาเข้างานช่วงเช้า</h4>
                            <h1 class="text-lg  text-white">{{ TimeToDay.morningIn ? TimeToDay.morningIn : '-' }}</h1>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <h4 class="text-xs font-semibold text-white">เวลาออกงานช่วงเช้า</h4>
                            <h1 class="text-lg  text-white">{{ TimeToDay.morningOut ? TimeToDay.morningOut : '-' }}</h1>
                        </div>
                    </div>
                    <div class="-ml-px flex w-0 flex-1">
                        <!-- ทำการรวมโค้ดซ้ำซ้อนเ ข้ามาในส่วนนี้ -->
                        <div class="flex-1 w-0 ">
                            <div class="flex flex-col justify-center items-center">
                                <h4 class="text-xs font-semibold text-white">เวลาเข้างานช่วงบ่าย</h4>
                                <h1 class="text-lg  text-white">{{ TimeToDay.afterIn ? TimeToDay.afterIn : '-' }}</h1>
                            </div>
                            <div class="flex flex-col justify-center items-center">
                                <h4 class="text-xs font-semibold text-white">เวลาออกงานช่วงบ่าย</h4>
                                <h1 class="text-lg  text-white">{{ TimeToDay.afterOut ? TimeToDay.afterOut : '-' }}</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <!-- Social Traffic -->
            <div class="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50  w-full shadow-lg rounded">
                <div class="rounded-t mb-0 px-0 border-0">
                    <div class="flex flex-wrap items-center px-4 py-2">
                        <div class="relative w-full max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-gray-900 ">พาร์ทเนอร์รอการยืนยัน</h3>
                        </div>
                        <div class="relative w-full max-w-full flex-grow flex-1 text-right">
                            <router-link to="/ParthnerView">
                                <button
                                    class="bg-[#0C2D57] text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                    ดูทั้งหมด
                                </button>
                            </router-link>
                        </div>
                    </div>
                    <div class="block w-full overflow-x-auto">
                        <table class="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th
                                        class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        ชื่อ</th>
                                    <th
                                        class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        สถานะ</th>
                                    <th
                                        class="px-4 bg-gray-100 text-gray-500  align-middle border border-solid border-gray-200  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                        วันที่
                                    </th>

                                </tr>
                            </thead>
                            <tbody v-if="filteredPartners.length > 0">
                                <tr v-for="partner in filteredPartners" :key="partner.id" class="text-gray-700 ">
                                    <th
                                        class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                        {{ partner.partner_name }}</th>
                                    <td
                                        class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <span
                                            class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                                            {{ partner.status_appover }} </span>
                                    </td>
                                    <th
                                        class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                        {{ formatThaiDate(partner.createdAt) }}</th>
                                </tr>


                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="3" class="text-center text-gray-700 py-4">
                                        ไม่มีรายการพาร์ทเนอร์รอการยืนยัน
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>


        <!-- ./Task Summaries -->
        <div class="grid grid-cols-1 lg:grid-cols-2  gap-4">
            <div class="bg-white shadow mt-6  rounded-lg p-6">
                <h3 class="text-black text-sm font-semibold mb-4">ประวัติการเข้างาน</h3>

                <div class="flex flex-col justify-center items-center">
                    <div class="relative flex  w-full flex-col rounded-[10px] border-[1px] border-gray-200 
              bg-white bg-clip-border shadow-md shadow-[#F3F3F3]  ">
                        <div class="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 
                pb-[20px] pt-4 shadow-2xl shadow-gray-100 ">

                            <button
                                class="linear rounded-[20px] bg-[#146C94] text-white px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-[#19A7CE] active:bg-[#0A4D68] ">
                                See all
                            </button>
                        </div>
                        <div class="w-full overflow-x-scroll px-4 md:overflow-x-hidden ">
                            <table role="table" class="w-full  overflow-x-scroll ">
                                <thead class="bg-[#141E46]">
                                    <tr role="row">
                                        <th role="columnheader" style="cursor: pointer">
                                            <div
                                                class="ml-2 flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-white sm:text-xs lg:text-xs">
                                                วันที่
                                            </div>
                                        </th>
                                        <th role="columnheader" style="cursor: pointer">
                                            <div
                                                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-white sm:text-xs lg:text-xs">
                                                เข้างานเช้า
                                            </div>
                                        </th>
                                        <th role="columnheader" style="cursor: pointer">
                                            <div
                                                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-white sm:text-xs lg:text-xs">
                                                ออกเที่ยง
                                            </div>
                                        </th>
                                        <th role="columnheader" style="cursor: pointer">
                                            <div
                                                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-white sm:text-xs lg:text-xs">
                                                เวลาเข้างานบ่าย
                                            </div>
                                        </th>
                                        <th role="columnheader" style="cursor: pointer">
                                            <div
                                                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-white sm:text-xs lg:text-xs">
                                                เวลาออกเย็น
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <template v-if="TimeToWork.length > 0">
                                    <tbody role="rowgroup" class="px-4">

                                        <tr v-for="(item, index) in TimeToWork" :key="index" role="row">
                                            <td class="py-2 text-sm" role="cell">
                                                <div class="flex items-center gap-2">

                                                    <p class="text-sm ml-2 font-medium"
                                                        :class="{ 'text-[#FF004D]': index === 0, 'text-[#313866]': index !== 0 }"
                                                        v-if="item !== null && item.day !== null">
                                                        {{ isToday(item.day) ? 'วันนี้' : item.day }}
                                                    </p>
                                                </div>
                                            </td>
                                            <td class="py-2 text-sm" role="cell">
                                                <p class="text-sm ml-2 font-medium"
                                                    :class="{ 'text-[#FF004D]': index === 0, 'text-[#1b1b1b]': index !== 0 }"
                                                    v-if="item !== null && item.morningIn !== null">
                                                    {{ item.morningIn }}
                                                </p>
                                            </td>
                                            <td class="py-2 text-sm" role="cell">
                                                <p class="text-sm ml-2 font-medium"
                                                    :class="{ 'text-[#FF004D]': index === 0, 'text-[#313866]': index !== 0 }"
                                                    v-if="item !== null && item.morningOut !== null">
                                                    {{ item.morningOut }}
                                                </p>
                                            </td>
                                            <td class="py-2 text-sm" role="cell">
                                                <p class="text-sm ml-2 font-medium"
                                                    :class="{ 'text-[#FF004D]': index === 0, 'text-[#313866]': index !== 0 }"
                                                    v-if="item !== null && item.afterIn !== null">
                                                    {{ item.afterIn }}
                                                </p>
                                            </td>
                                            <td class="py-2 text-sm" role="cell">
                                                <p class="text-sm ml-2 font-medium"
                                                    :class="{ 'text-[#FF004D]': index === 0, 'text-[#313866]': index !== 0 }"
                                                    v-if="item !== null && item.afterOut !== null">
                                                    {{ item.afterOut }}
                                                </p>
                                            </td>
                                        </tr>

                                    </tbody>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="5" class="py-2 text-center text-sm font-medium">
                                            ไม่มีรายการ
                                        </td>
                                    </tr>
                                </template>
                            </table>
                        </div>
                    </div>
                </div>

            </div>




        </div>
        <!-- Client Table -->

        <!-- ./Client Table -->

        <!-- <Dropdown v-model="selectedStatus" :options="statusOptions" optionLabel="name" placeholder="Select a City" class="w-full md:w-14rem" /> -->

    </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            items: [],
            partners: [],
            statusToDisplay: 'รออนุมัติ',
            me: {},
            Contractor: [],
            TimeToWork: [],
            TimeToDay: [],
            deadline: null,
            valueStyle: {
                color: '#146C94',
                fontSize: '48px',
                fontWeight: 'bold',
            }
        };
    },
    computed: {
        filteredPartners() {
            // Filter partners based on the specified status
            return this.partners.filter(partner => partner.status_appover === this.statusToDisplay);
        },
        workPeriodLabel() {
            const currentTime = new Date();
            if (currentTime.getHours() >= 18 || currentTime.getHours() < 9) {
                return 'รอเข้างานช่วงเช้า';
            } else if (currentTime.getHours() >= 9 && currentTime.getHours() < 12) {
                return 'รอออกงานช่วงเช้า';
            } else if (currentTime.getHours() >= 12 && currentTime.getHours() < 13) {
                return 'รอเข้างานช่วงบ่าย';
            } else {
                return 'รอออกงานช่วงบ่าย';
            }
        }


    },
    mounted() {
        this.fetchTimeData();
        this.fetchTimeToDay();
        this.fetchME();

        const currentTime = new Date();
        let startCountdown;

        if (currentTime.getHours() >= 18) {
            // นับถอยหลังจาก 08:00 ของวันถัดไป
            startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 8, 0, 0, 0);
        } else if (currentTime.getHours() >= 12 && currentTime.getHours() <= 18) {
            // นับถอยหลังจาก 18:00 ของวันนี้
            startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 18, 0, 0, 0);
        } else if (currentTime.getHours() >= 9) {
            // นับถอยหลังจาก 12:00 ของวันนี้
            startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 12, 0, 0, 0);
        } else {
            // นับถอยหลังจาก 09:00 ของวันนี้
            startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0, 0, 0);
        }

        this.deadline = startCountdown;

        setInterval(() => {
            if (this.deadline <= 0) {
                // เวลาหมดลง
                // กำหนดค่า deadline ใหม่
                if (currentTime.getHours() >= 18) {
                    startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 8, 0, 0, 0);
                } else if (currentTime.getHours() >= 12 && currentTime.getHours() <= 18) {
                    startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 18, 0, 0, 0);
                } else if (currentTime.getHours() >= 9) {
                    startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 12, 0, 0, 0);
                } else {
                    startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0, 0, 0);
                }

                this.deadline = startCountdown;

                this.fetchTimeData();
            }
        }, 1000);
    },

    methods: {
        startCountdownTimer() {
            const self = this;

            // ตรวจสอบเวลาทุกๆ 1 วินาที
            setInterval(function () {
                const currentTime = new Date();
                if (currentTime.getHours() === 0 && currentTime.getMinutes() === 0 && currentTime.getSeconds() === 0) {
                    // ทำการรีเฟรชหน้าเว็บเมื่อเวลาเป็น 00:00:00
                    location.reload();
                }
            }, 1000);
        },

        isToday(date) {
            const today = new Date();
            const inputDate = new Date(date);

            return (
                today.getDate() === inputDate.getDate() &&
                today.getMonth() === inputDate.getMonth() &&
                today.getFullYear() === inputDate.getFullYear()
            );
        },
        /* ประวัติการเข้างานทุกวัน */
        async fetchTimeData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                console.log("ประวัติการเข้างาน", response.data.data);

                if (response.data.data) {
                    this.TimeToWork = response.data.data.reverse();
                } else {
                    console.error("ไม่พบข้อมูลเวลาเข้างาน");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            }
        },
        /* ประวัติการเข้างานวันนี้ */
        async fetchTimeToDay() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/time/getday`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                console.log("ประวัติการเข้างาน", response.data.data);

                if (response.data.data) {
                    this.TimeToDay = response.data.data;
                } else {
                    console.error("ไม่พบข้อมูลเวลาเข้างาน");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            }
        },

        async logWorkTime() {
            try {
                await Swal.fire({
                    icon: "info",
                    title: "กำลังลงเวลาเข้างาน...",
                    showConfirmButton: false,
                    timer: 1500,
                });

                const response = await axios.post(
                    `${import.meta.env.VITE_VUE_APP_DECCAN}/time/morning/in`,
                    {},
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    }
                );

                Swal.close();

                await Swal.fire({
                    icon: "success",
                    html: `
                <p>ลงเวลาสำเร็จ</p>
                <p>เวลา: ${response.data.data.time}</p>
                <p>ผู้ลงเวลา: ${this.me.first_name} ${this.me.last_name}</p>
            `
                });

                this.fetchTimeData();

                this.fetchTimeToDay();

            } catch (error) {

                Swal.fire({
                    icon: "error",
                    text: error.response.data.message,
                });
                console.error("เกิดข้อผิดพลาดในการบันทึกเวลาเข้างาน:", error);
            }
        },


        formatThaiDate(dateString) {
            const thaiDate = dayjs(dateString).locale('th').format('DD/MM/YYYY HH:mm:ss');
            return thaiDate;
        },

        async fetchME() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                this.me = response.data.data;
                console.log(response.data.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async fetchEmployeeCount() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                this.items = response.data.data;
                console.log(response.data.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async fetchPartners() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                console.log("partners", response.data.data);

                this.partners = response.data.data;
            } catch (error) {
                console.error('Error fetching partners:', error);
            }
        },

        async fetchContractor() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_CONTRACT}/contract-all/GetAllContract`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                console.log("partners", response.data.data);

                this.Contractor = response.data.data;
            } catch (error) {
                console.error('Error fetching partners:', error);
            }
        },
    },
};
</script>

<style>
.custom-statistic .ant-statistic-content-value {
    color: #146c94;
    font-size: 48px;
    font-weight: bold;
}
</style>