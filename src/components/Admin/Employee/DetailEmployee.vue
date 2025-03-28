<template>

    <button @click="getEmployee" class="c-button c-button--gooey px-4 py-2 text-sm"> รายละเอียด
        <div class="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </button>


    <Sidebar v-model:visible="sidebar" class="p-sidebar-lg" position="right" style="width: 850px;">

        <div class="mb-6">
            <!-- Code block starts -->
            <div class="container flex justify-center mx-auto pt-2">
                <div>
                    <h1 class="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold  sm:w-6/6 w-6/6 mx-auto">
                        รายละเอียดพนักงาน</h1>
                </div>
            </div>

        </div>


        <div class=" bg-gradient-to-r from-pink-300 to-indigo-300">
            <div class="grid grid-cols-12 gap-0">
                <div class="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xxl:col-span-12 px-6 py-6">
                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-12 xxl:col-span-6">
                            <!-- Start Nav Bar -->

                            <!-- End Nav Bar -->
                        </div>
                        <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xxl:col-span-6">
                            <!-- Start Card List -->
                            <div
                                class=" bg-pink-600 hover:bg-pink-700 p-3 text-white rounded-xl shadow-xl flex items-center ">
                                {{ employee.employee_number }}

                            </div>
                            <!-- End Card List -->
                        </div>



                    </div>

                </div>
                <div class="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12  px-6 py-6">

                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xxl:col-span-6">
                            <div class="bg-white rounded-xl p-4 shadow-xl">
                                <div class="flex flex-col justify-center items-center">
                                    <div class="w-32 h-32 rounded-full bg-gray-300 border-2 border-white mt-2">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxhAxJ4D7MOeTTj6kR9PBeZonW5HM7giKjTbEmR-HMBwf3G1VqGnlwpO1kWrdyIZu8_U&usqp=CAU"
                                            class="rounded-full w-auto" />
                                    </div>
                                    <p class="font-semibold text-black text-xl mt-1">{{ employee.name_title }}
                                        {{ employee.first_name }} {{ employee.last_name }}</p>
                                    <p class="font-semibold text-base text-black">ชื่อเล่น: {{ employee.nick_name }}
                                    </p>

                                    <div class="px-6 mt-2 ">
                                        <div class="flex items-center flex-wrap ">
                                            <div
                                                class="flex items-center justify-center text-white w-16 h-16 mb-4 bg-[#5356FF] rounded">
                                                ตำแหน่ง </div>
                                            <span class="flex flex-col flex-grow pl-4">
                                                <span class="font-bold text-lg text-black -mt-4">{{ employee.position
                                                    }} </span>
                                                <span class="text-sm text-black uppercase font-bold">{{ employee.role
                                                    }}</span>
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xxl:col-span-5">
                            <div class="p-8 space-y-3 border-2 bg-white  border-blue-400  rounded-xl">
                                <span class="inline-block text-blue-500 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                                    </svg>
                                </span>

                                <h1 class="text-black font-bold tracking-wider">สิทธิ์การลา</h1>
                                <div class="mt-6">
                                    <div class="flex justify-between items-center ">
                                        <div class="flex justify-items-start gap-3 items-stretch">
                                            <div>
                                                <h1 class="font-bold text-black">ลาป่วย</h1>
                                                <p class="text-sm text-black">คงเหลือ {{ employee.leave?.sick_leave }}
                                                    วัน</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="text" placeholder="cvc"
                                                class="py-2 border-2 border-[#000446] text-[#0C359E] outline-none rounded-sm px-4  focus:border-blue-600">
                                                5 </button>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center ">
                                        <div class="flex justify-items-start gap-3 items-stretch">
                                            <div>
                                                <h1 class="font-bold text-black">ลากิจ</h1>
                                                <p class="text-sm text-black">คงเหลือ {{
                                                    employee.leave?.business_leave}} วัน</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="text" placeholder="cvc"
                                                class="py-2 border-2 border-[#000446] text-[#0C359E] outline-none rounded-sm px-4  focus:border-blue-600">
                                                5 </button>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center ">
                                        <div class="flex justify-items-start gap-3 items-stretch">
                                            <div>
                                                <h1 class="font-bold text-black">ลาบวช</h1>
                                                <p class="text-sm text-black">คงเหลือ {{
                                                    employee.leave?.ordination_leave}} วัน</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="text" placeholder="cvc"
                                                class="py-2 border-2 border-[#000446] text-[#0C359E] outline-none rounded-sm px-4  focus:border-blue-600">
                                                5 </button>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center ">
                                        <div class="flex justify-items-start gap-3 items-stretch">
                                            <div>
                                                <h1 class="font-bold text-black">ลาคลอด</h1>
                                                <p class="text-sm text-black">คงเหลือ {{
                                                    employee.leave?.maternity_leave}} วัน</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="text" placeholder="cvc"
                                                class="py-2 border-2 border-[#000446] text-[#0C359E] outline-none rounded-sm px-4  focus:border-blue-600">
                                                5 </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-2">

                        <div
                            class="p-8 space-y-3 border-2 bg-white  border-blue-400  rounded-xl hover:shadow-2xl transition duration-500">

                            <div class="bg-white rounded-2xl  py-2  ">
                                <div
                                    class="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white">
                                    LOGO</div>
                                <div class="mt-4">
                                    <h1 class="text-lg text-black font-semibold hover:underline cursor-pointer">
                                        ข้อมูลติดต่อ</h1>
                                    <p class="mt-4 text-md text-black">
                                        <template
                                            v-if="employee.address || employee.subdistrict || employee.district || employee.province || employee.postcode">
                                            {{ employee.address || '-' }} ตำบล {{ employee.subdistrict || '-' }} อำเภอ
                                            {{ employee.district || '-' }} จังหวัด {{ employee.province || '-' }} {{
                                            employee.postcode || '-' }}
                                        </template>
                                        <template v-else>
                                            -
                                        </template>
                                    </p>


                                    <div class="flex justify-between items-center">

                                        <div class="flex space-x-2 text-black text-sm" >
                                            <!-- svg  -->
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="#453F78" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                                                </path>
                                            </svg>
                                            <p>{{ employee.tel ? employee.tel : '-' }}</p>
                                        </div>
                                        <div class="flex space-x-2 text-black text-sm my-3">
                                            <!-- svg  -->
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="#453F78" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                                </path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                            <p>{{ employee.email ? employee.email : '-' }}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="p-8 space-y-3 border-2 bg-white  border-blue-400 rounded-xl">
                            <span class="inline-block text-blue-500 ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                </svg>
                            </span>

                            <div class="mt-8">
                                <p class="text-xl font-semibold my-2">ข้อมูลส่วนตัว</p>
                                <div class="flex space-x-2 text-black text-sm">
                                    <!-- svg  -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="#453F78" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                                        <circle cx="12" cy="10" r="3" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                    <p>{{ employee.name_title }} {{
                                        employee.first_name }} {{ employee.last_name }}</p>
                                </div>
                                <div class="flex space-x-2 text-black text-sm ">
                                    <!-- svg  -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="#453F78" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="M7 15h0M2 9.5h20" />
                                    </svg>
                                    <p>{{ employee.iden_number }}</p>
                                </div>
                                <div class="flex  space-x-2 text-black text-sm ">
                                    <!-- svg  -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path
                                                d="M8 6v3.999h3V6h2v3.999h3V6h2v3.999L19 10a3 3 0 0 1 2.995 2.824L22 13v1c0 1.014-.377 1.94-.999 2.645L21 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4.36a4.025 4.025 0 0 1-.972-2.182l-.022-.253L2 14v-1a3 3 0 0 1 2.824-2.995L5 10l1-.001V6h2zm11 6H5a1 1 0 0 0-.993.883L4 13v.971l.003.147A2 2 0 0 0 6 16a1.999 1.999 0 0 0 1.98-1.7l.015-.153.005-.176c.036-1.248 1.827-1.293 1.989-.134l.01.134.004.147a2 2 0 0 0 3.992.031l.012-.282c.124-1.156 1.862-1.156 1.986 0l.012.282a2 2 0 0 0 3.99 0L20 14v-1a1 1 0 0 0-.883-.993L19 12zM7 1c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 0 1-2.898-.776C5.85 2.002 7 2.5 7 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 1 1-2.898-.776C10.85 2.002 12 2.5 12 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 1 1-2.898-.776C15.85 2.002 17 2.5 17 1z" />
                                        </g>
                                    </svg>
                                    <p>{{ employee.birthday }}</p>

                                </div>
                                <div class="border-t-2 "></div>

                                <div class="flex justify-between text-black">
                                    <div class="my-2">
                                        <p class="font-semibold text-base mb-2">อายุ</p>
                                        <div class="flex space-x-2">
                                            <p>{{ employee.age }} ปี</p>

                                        </div>
                                    </div>
                                    <div class="my-2">
                                        <p class="font-semibold text-base mb-2">เข้าร่วม</p>

                                        <p>{{ dateFormat(employee.createdAt) }}</p>

                                    </div>
                                </div>
                            </div>
                        </div>





                    </div>
                </div>
            </div>
        </div>





    </Sidebar>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import Sidebar from "primevue/sidebar";

export default {
    components: {
        Sidebar
    },
    async mounted() {

    },
    props: {
        employee_id: String,
        employee: Object,
    },
    data: () => ({
        isloading: false,
        sidebar: false,
        loading: false,

        item_row: "",
    }),
    methods: {
        getImageUrl(imageId) {
            return `https://drive.google.com/thumbnail?id=${imageId}`;
        },
        async getEmployee() {
            this.sidebar = true;
        },
        dateFormat(date) {
            if (date) {
                return dayjs(date).format("DD/MM/YYYY");
            }
        },
    }
}
</script>


<style scoped>
.c-button {
    color: #000;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    z-index: 1;
}

.c-button--gooey {
    color: #06c8d9;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: 4px solid #06c8d9;
    border-radius: 0;
    position: relative;
    transition: all 700ms ease;
}

.c-button--gooey .c-button__blobs {
    height: 100%;
    filter: url(#goo);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: -3px;
    right: -1px;
    z-index: -1;
}

.c-button--gooey .c-button__blobs div {
    background-color: #06c8d9;
    width: 34%;
    height: 100%;
    border-radius: 100%;
    position: absolute;
    transform: scale(1.4) translateY(125%) translateZ(0);
    transition: all 700ms ease;
}

.c-button--gooey .c-button__blobs div:nth-child(1) {
    left: -5%;
}

.c-button--gooey .c-button__blobs div:nth-child(2) {
    left: 30%;
    transition-delay: 60ms;
}

.c-button--gooey .c-button__blobs div:nth-child(3) {
    left: 66%;
    transition-delay: 25ms;
}

.c-button--gooey:hover {
    color: #fff;
}

.c-button--gooey:hover .c-button__blobs div {
    transform: scale(1.4) translateY(0) translateZ(0);
}
</style>
