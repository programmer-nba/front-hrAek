<!-- views/Dashboard.vue -->
<template>
    <div class="rounded-b-xl bg-indigo-600 p-5 pb-20 text-white lg:hidden ">
        <div class=" flex items-center justify-between">
            <button class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                        <path stroke-dasharray="46" stroke-dashoffset="46"
                            d="M16 5V4C16 3.44772 15.5523 3 15 3H6C5.44771 3 5 3.44772 5 4V20C5 20.5523 5.44772 21 6 21H15C15.5523 21 16 20.5523 16 20V19">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="46;0" />
                        </path>
                        <path stroke-dasharray="12" stroke-dashoffset="12" d="M10 12h11" opacity="0">
                            <set attributeName="opacity" begin="0.6s" to="1" />
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s"
                                values="12;0" />
                        </path>
                        <path stroke-dasharray="6" stroke-dashoffset="6" d="M21 12l-3.5 -3.5M21 12l-3.5 3.5"
                            opacity="0">
                            <set attributeName="opacity" begin="0.8s" to="1" />
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s"
                                values="6;0" />
                        </path>
                    </g>
                </svg>
            </button>
            <h1 class="flex items-center text-3xl font-semibold">DDSC</h1>
            <button class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z">
                    </path>
                </svg>
            </button>
        </div>

    </div>

    <div class="-mt-16 p-5 lg:hidden  ">

        <div
            class="border-b border-gray-200  xl:hidden flex items-center   flex-row justify-between px-5  rounded-xl p-2 bg-white shadow-sm">

            <div class="flex flex-col items-center border-b-2 border-black ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048">
                    <path fill="currentColor"
                        d="M1468 1139q-52 43-89 96q-83-42-173-62t-184-21q-108 0-206 27t-184 76t-154 119t-119 155t-76 185t-27 206H128q0-146 43-281t124-247t193-196t254-129q-54-36-96-83t-72-102t-46-116t-16-126q0-106 40-199t110-162t163-110t199-41q106 0 199 40t162 110t110 163t41 199q0 65-16 126t-45 117t-73 102t-97 83q43 14 83 31t80 40zM640 640q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149zm1090 511q66 0 125 25t102 69t69 102t26 125q0 66-25 124t-69 102t-103 69t-125 26q-97 0-177-54l-292 292q-19 19-45 19t-45-19t-19-45q0-26 19-45l292-292q-54-80-54-177q0-66 25-124t69-102t102-69t125-26zm0 514q40 0 75-15t61-41t42-62t16-75q0-40-15-75t-42-61t-61-42t-76-15q-40 0-75 15t-61 42t-42 61t-15 75q0 40 15 75t41 61t62 42t75 15z" />
                </svg>
                <p class="text-sm text-black ">โปรไฟล์</p>
            </div>
            <div @click="goToOTPage" class="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" d="M9 13h6M9 9h4m-4 8h4" />
                        <path
                            d="M19 13v2c0 2.828 0 4.243-.879 5.121C17.243 21 15.828 21 13 21h-2c-2.828 0-4.243 0-5.121-.879C5 19.243 5 17.828 5 15V9c0-2.828 0-4.243.879-5.121C6.757 3 8.172 3 11 3" />
                        <path stroke-linecap="round" d="M18 3v6m3-3h-6" />
                    </g>
                </svg>
                <p class="text-sm text-gray-600">ยื่นเอกสาร</p>
            </div>
            <div class="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                    <g fill="none">
                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="4"
                            d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
                        <circle cx="14" cy="24" r="3" fill="currentColor" />
                        <circle cx="24" cy="24" r="3" fill="currentColor" />
                        <circle cx="34" cy="24" r="3" fill="currentColor" />
                    </g>
                </svg>
                <p class="text-sm text-gray-600">more</p>
            </div>
            <div class="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                    <g fill="none">
                        <path stroke="currentColor" stroke-linejoin="round" stroke-width="4"
                            d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
                        <circle cx="14" cy="24" r="3" fill="currentColor" />
                        <circle cx="24" cy="24" r="3" fill="currentColor" />
                        <circle cx="34" cy="24" r="3" fill="currentColor" />
                    </g>
                </svg>
                <p class="text-sm text-gray-600">more</p>
            </div>
        </div>
    </div>
    <div class="min-h-screen bg-[#E0F4FF]">

        <nav class="bg-white w-full xl:flex hidden relative shadow justify-center items-center px-8 h-20">


            <!-- end logo -->

            <!-- search bar -->
            <!-- <div class="hidden sm:block flex-shrink flex-grow-0 justify-start px-2"> -->
            <div class="relative hidden sm:block flex-shrink flex-grow-0">
                <input type="text" class="bg-purple-white bg-gray-100 rounded-lg border-0 p-3 w-full"
                    placeholder="Search somthing..." style="min-width:400px;">
                <div class="absolute top-0 right-0 p-4 pr-3 text-purple-lighter">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
            <!-- end search bar -->


            <!-- end login -->
        </nav>

        <div class="pb-6 space-y-2 text-center pt-8">
            <span
                class="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600">
                {{ workPeriodLabel }}</span>
            <h2 class="text-2xl text-cyan-900 font-bold">
                <a-statistic-countdown :value="deadline" :value-style="valueStyle" class="custom-statistic">
                    {{ workPeriod }}
                </a-statistic-countdown>
            </h2>
        </div>


        <main class="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4  w-2xl container px-2 mx-auto">

            <aside class="">

                <div class="  flex items-center justify-center  text-[#9e9cb6]">

                    <section class="w-full  relative bg-[#79E0EE]/60 rounded-[6px] mx-2 ">
                        <div
                            class="absolute text-[#1D267D] bg-yellow-400 rounded-[4px] top-6 left-6 px-2 py-1 text-sm font-bold roll-in-blurred-right">
                            {{ ME.employee_number }}
                        </div>
                        <img :src="getImageUrl(ME.image)" class="rounded-full w-[120px] h-[120px] mx-auto my-10 p-0 border-[6px] object-cover  border-[#231f39] 
                shadow-[0px_27px_16px_-11px_rgba(31,27,56,0.25)] 
                transition-all duration-150 ease-in hover:scale-105 cursor-pointer 
                slide-in-elliptic-top-fwd">

                        <h1 class="text-xl font-bold text-center text-[#11009E]">{{ ME.first_name }} {{ ME.last_name }}
                        </h1>
                        <p class="font-semibold text-center text-[#11009E]">{{ ME.position }}</p>

                        <div class="text-sm leading-normal text-[#11009E] flex justify-center items-center">
                            <svg viewBox="0 0 24 24" class="mr-1" width="16" height="16" stroke="currentColor"
                                stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            เชียงใหม่, ประเทศไทย
                            <!-- {{ currentLocation }} -->
                        </div>
                        <div class="flex items-center justify-center gap-2 w-[80%] mx-auto mt-5 mb-10">
                            <button @click="logWorkTime"
                                class="flex-1 border border-[#231f39] rounded-[4px] py-3 text-white bg-[#231f39] transition-all duration-150 ease-in hover:bg-[#472e99]">ลงเวลาเข้างาน</button>


                        </div>
                        <div class="-mt-px flex  divide-x divide-gray-200 p-4 bg-[#11009E]">
                            <div class="flex-1 w-0">
                                <div class="flex flex-col justify-center items-center">
                                    <h4 class="text-xs font-semibold text-white">เวลาเข้างานช่วงเช้า</h4>
                                    <h1 class="text-lg  text-white">{{ TimeToDay.morningIn ? TimeToDay.morningIn : '-'
                                        }}</h1>
                                </div>
                                <div class="flex flex-col justify-center items-center">
                                    <h4 class="text-xs font-semibold text-white">เวลาออกงานช่วงเช้า</h4>
                                    <h1 class="text-lg  text-white">{{ TimeToDay.morningOut ? TimeToDay.morningOut : '-'
                                        }}</h1>
                                </div>
                            </div>
                            <div class="-ml-px flex w-0 flex-1">
                                <div class="flex-1 w-0 ">
                                    <div class="flex flex-col justify-center items-center">
                                        <h4 class="text-xs font-semibold text-white">เวลาเข้างานช่วงบ่าย</h4>
                                        <h1 class="text-lg  text-white">{{ TimeToDay.afterIn ? TimeToDay.afterIn : '-'
                                            }}</h1>
                                    </div>
                                    <div class="flex flex-col justify-center items-center">
                                        <h4 class="text-xs font-semibold text-white">เวลาออกงานช่วงบ่าย</h4>
                                        <h1 class="text-lg  text-white">{{ TimeToDay.afterOut ? TimeToDay.afterOut : '-'
                                            }}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </section>

                </div>

                <div class="bg-white shadow mt-6  rounded-lg p-6">
                    <h3 class="text-black text-sm font-semibold mb-4">ประวัติการเข้างาน</h3>

                    <div class="flex flex-col justify-center items-center">
                        <div class="relative flex  w-full flex-col rounded-[10px] border-[1px] border-gray-200 
                bg-white bg-clip-border shadow-md shadow-[#F3F3F3]  ">
                            <div class="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 
                  pb-[20px] pt-4 shadow-2xl shadow-gray-100 ">

                                <button @click="redirectToTimeToWork"
                                    class="linear rounded-[20px] bg-[#146C94] text-white px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-[#19A7CE] active:bg-[#0A4D68] ">
                                    ดูทั้งหมด
                                </button>
                            </div>
                            <div class="w-full overflow-x-auto px-4  ">
                                <table role="table" class="w-full  overflow-x-auto ">
                                    <thead class="bg-[#141E46]">
                                        <tr class="text-center text-sm text-white">
                                            <th style="cursor: pointer" class="px-2 py-2  whitespace-nowrap ">
                                                <div
                                                    class="ml-2 flex items-center justify-between py-2 px-2 text-start ">
                                                    วันที่
                                                </div>
                                            </th>
                                            <th style="cursor: pointer" class=" whitespace-nowrap">
                                                <div class="flex items-center justify-between py-2 px-2 text-start ">
                                                    เข้างานเช้า
                                                </div>
                                            </th>
                                            <th style="cursor: pointer" class=" whitespace-nowrap">
                                                <div class="flex items-center justify-between py-2 px-2 text-start ">
                                                    ออกเที่ยง
                                                </div>
                                            </th>
                                            <th style="cursor: pointer" class=" whitespace-nowrap">
                                                <div class="flex items-center justify-between py-2 px-2 text-start ">
                                                    เวลาเข้างานบ่าย
                                                </div>
                                            </th>
                                            <th style="cursor: pointer" class=" whitespace-nowrap">
                                                <div class="flex items-center justify-between py-2 px-2 text-start ">
                                                    เวลาออกเย็น
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <template v-if="TimeToWork.length > 0">
                                        <tbody role="rowgroup" class="px-4">

                                            <tr v-for="(item, index) in TimeToWork" :key="index" role="row">
                                                <td class="py-3 text-sm" role="cell">
                                                    <div class="flex items-center gap-2">

                                                        <p class="text-sm ml-2 font-medium"
                                                            :class="{ 'text-[#FF004D]': index === 0, 'text-[#313866]': index !== 0 }"
                                                            v-if="item !== null && item.day !== null">
                                                            {{ isToday(item.day) ? 'วันนี้' : formatDate(item.day) }}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td class="py-3 text-sm" role="cell">
                                                    <p class="text-sm ml-2 font-medium"
                                                        :class="{ 'text-[#FF004D]': index === 0, 'text-[#1b1b1b]': index !== 0 }"
                                                        v-if="item !== null && item.morningIn !== null">
                                                        {{ item.morningIn }}
                                                    </p>
                                                </td>
                                                <td class="py-3 text-sm" role="cell">
                                                    <p class="text-sm ml-2 font-medium"
                                                        :class="{ 'text-[#FF004D]': index === 0, 'text-[#313866]': index !== 0 }"
                                                        v-if="item !== null && item.morningOut !== null">
                                                        {{ item.morningOut }}
                                                    </p>
                                                </td>
                                                <td class="py-3 text-sm" role="cell">
                                                    <p class="text-sm ml-2 font-medium"
                                                        :class="{ 'text-[#FF004D]': index === 0, 'text-[#313866]': index !== 0 }"
                                                        v-if="item !== null && item.afterIn !== null">
                                                        {{ item.afterIn }}
                                                    </p>
                                                </td>
                                                <td class="py-3 text-sm" role="cell">
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
                                            <td colspan="5" class="py-3 text-center text-sm font-medium">
                                                ไม่มีรายการ
                                            </td>
                                        </tr>
                                    </template>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>





            </aside>

            <article class="">

                <div class="bg-white shadow rounded-lg  p-4">
                    <div class="flex flex-col gap-2">
                        <h2 class="text-sm font-bold tracking-tight text-[#11009E] sm:text-xl">
                            งานของฉัน
                        </h2>
                        <div class="w-full relative bg-white shadow p-2 rounded">

                            <span
                                class="absolute inset-x-0 top-0 h-2 rounded-tl rounded-tr bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>


                            <header class="p-2 border-b border-[#F79327] flex">
                                <div class="flex flex-col">
                                    <h4 class="text-xs font-semibold">งาน</h4>
                                    <h1 class="text-lg  text-green-600">เขียนโปรแกรม POS</h1>
                                </div>
                            </header>
                            <div class="flex flex-wrap p-2 w-full gap-4">
                                <div class="flex  justify-between  w-full">
                                    <div class="flex flex-col  w-full ">
                                        <h4 class="text-xs text-[#CD1818]">รายละเอียด</h4>
                                        <h1 class="text-lg text-[#212A3E]">6-Frais de scolarité 2eme trimestre</h1>

                                    </div>
                                    <a-progress type="circle" :strokeColor="'#11009E'" :percent="75"
                                        :format="percent => `${percent} Days`" />

                                </div>


                                <div class="flex flex-col text-[#212A3E]">
                                    <h4 class="text-xs">วันที่เริ่ม</h4>
                                    <h1 class="text-md">11/08/2022</h1>
                                </div>

                                <div class="flex flex-col text-[#212A3E]">
                                    <h4 class="text-xs">สิ้นสุด</h4>
                                    <h1 class="text-md ">11/08/2023</h1>
                                </div>

                            </div>
                            <a-progress :percent="50" status="active" :strokeColor="'orange'"
                                :trailColor="'lightgrey'" />

                        </div>



                    </div>
                </div>


                <div class="bg-white shadow rounded-lg ">

                </div>


                <!-- <div class="bg-white shadow rounded-lg mb-6">
            <div class="flex flex-row px-2 py-3 mx-3">
              <div class="w-auto h-auto rounded-full">
                <img class="w-12 h-12 object-cover rounded-full shadow cursor-pointer" alt="User avatar"
                  src="../../assets/dog.jpg">
              </div>
              <div class="flex flex-col mb-2 ml-4 mt-1">
                <div class="text-white text-sm font-semibold">อิฟ</div>
                <div class="flex w-full mt-1">
                  <div class="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                    โปรแกรมเมอร์
                  </div>
  
                </div>
              </div>
            </div>
            <div class="border-b border-gray-100"></div>
            <div class="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
  
            </div>
            <div class="text-gray-500 text-sm mb-6 mx-3 px-2">Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500</div>
            <div class="flex justify-start mb-4 border-t border-gray-100">
  
              <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                <span
                  class="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z">
                    </path>
                  </svg>
                </span>
                <span
                  class="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                  <svg class="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                    </path>
                  </svg>
                </span>
              </div>
            </div>
  
            <div class="text-black p-4 antialiased flex">
              <div>
                <div class="bg-gray-100 rounded-lg px-4 pt-2 pb-2.5">
                  <div class="font-semibold text-sm leading-relaxed">หัวข้อหลัก</div>
                  <div class="text-xs leading-snug md:leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>
  
              </div>
            </div>
  
          </div> -->



            </article>

        </main>

    </div>


</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Swal from 'sweetalert2';

export default {
    components: {

    },
    data() {
        return {
            ME: {},
            TimeToWork: [],
            TimeToDay: {},
            deadline: new Date(),
            valueStyle: {
                color: '#146C94', // กำหนดสีข้อความเป็นสีขาว
                fontSize: '48px' // กำหนดขนาดข้อความใหญ่ขึ้น
            },
            currentLocation: ''
        };
    },

    mounted() {
    this.fetchTimeData();
    this.fetchTimeToDay();
    this.fetchMe();
    console.log(new Date());

    const currentTime = new Date();
    let startCountdown;

    if (currentTime.getHours() >= 18) {
        // นับถอยหลังจาก 09:00 ของวันถัดไป
        startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 9, 0, 0, 0);
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
                startCountdown = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 9, 0, 0, 0);
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



    computed: {
        workPeriodLabel() {
            const currentTime = new Date();
            if (currentTime.getHours() >= 18 || currentTime.getHours() < 9) {
                return 'รอเข้างานช่วงเช้า';
            } else if (currentTime.getHours() >= 9 && currentTime.getHours() < 12) {
                return 'รอออกงานช่วงเช้า';
            } else if (currentTime.getHours() >= 12 && currentTime.getHours() < 13) {
                return 'รอเข้างานช่วงบ่าย';
            } else if (currentTime.getHours() >= 13 && currentTime.getHours() < 18) {
                return 'รอออกงานช่วงบ่าย';
            } else {
                return 'รอเข้างานช่วงเช้า';
            }
        }
    },

    methods: {
        goToOTPage() {
            this.$router.push({ name: 'OT' });
        },
        redirectToTimeToWork() {
            this.$router.push('/TimeToWork');
        },
        getImageUrl(imageId) {
            return `https://drive.google.com/thumbnail?id=${imageId}`;
        },

        formatDate(date) {
            return new Date(date).toLocaleDateString("th-TH");
        },

        formatDate(dateString) {
            const date = dayjs(dateString);
            // จัดรูปแบบวันที่เป็น "วัน เดือน ปี" แบบไทย
            const thaiDate = date.locale('th').format('D MMMM YYYY');
            return thaiDate;
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

        /* getme */
        async fetchMe() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getme`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                console.log("getme", response.data.data);

                if (response.data.data) {
                    this.ME = response.data.data;
                } else {
                    console.error("ไม่พบข้อมูลgetme");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            }
        },

        /* ประวัติการเข้างาน */
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
                console.log("ประวัติการเข้างานวันนี้", response.data.data);

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
                <p>ผู้ลงเวลา: ${this.ME.first_name} ${this.ME.last_name}</p>
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


    }
};
</script>


<style>
.kanit-font {
    font-family: 'Kanit', sans-serif;
}

.custom-statistic .ant-statistic-content-value {
    color: #146c94;
    font-size: 48px;
    font-weight: bold;
}
</style>
