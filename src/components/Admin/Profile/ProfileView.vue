<template>
    <div class="bg-gray-100 min-h-screen">

        <!-- End of Navbar -->

        <div class="container mx-auto my-5 p-5">
            <div class="md:flex no-wrap md:-mx-2 ">
                <!-- Left Side -->





                <div class="w-full md:w-3/12 md:mx-2">

                    <!-- Profile Card -->
                    <div class="bg-white p-3 border-t-4  border-green-400">

                        <div class=" relative h-36 w-36 mx-auto sm:mb-0 mb-3">
                            <img src="../../../assets/991895.jpg" alt="aji" class=" w-36 h-36 object-cover rounded-2xl">
                            <a href="#"
                                class="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    class="h-4 w-4">
                                    <path
                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                                    </path>
                                </svg>
                            </a>
                        </div>
                        <h1 class="text-gray-900 text-center font-bold text-xl leading-8 my-1">{{ me.name_title }} {{
                            me.first_name
                        }}
                            {{ me.last_name }}</h1>

                        <ul
                            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">

                            <li class="flex items-center py-3">
                                <span>เข้าร่วมเมื่อ</span>
                                <span class="ml-auto">{{ formatThaiDate(me.createdAt) }}</span>
                            </li>
                        </ul>
                    </div>
                    <!-- End of profile card -->
                    <div class="my-4"></div>
                    <!-- Friends card -->
                    <div class="bg-white p-3 hover:shadow">
                        <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                            <span class="text-green-500">
                                <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </span>
                            <span>สิทธิ์การลา</span>
                        </div>

                        <div class="grid gap-4 mt-2">
                            <div class="flex gap-2 items-center">
                                <div class="bg-red-500 flex items-center justify-center w-20 h-10 rounded text-white">
                                    ลาป่วย</div>
                                <div class="grid  text-sm">
                                    <h2 class="font-semibold leading-none ">
                                        {{ me.leave?.sick_leave }}/30
                                    </h2>
                                    <div class="text-xs text-gray-500  ">
                                        คงเหลือ 30 วัน / ปี
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-2 items-center">
                                <div
                                    class="bg-yellow-500 flex items-center justify-center w-20 h-10 rounded text-white">
                                    ลากิจ</div>
                                <div class="grid  text-sm">
                                    <h2 class="font-semibold leading-none ">
                                        {{ me.leave?.business_leave }}/3
                                    </h2>
                                    <div class="text-xs text-gray-500  ">
                                        คงเหลือ {{ me.leave?.business_leave }} วัน / ปี
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-2 items-center">
                                <div class="flex items-center justify-center bg-blue-500 w-20 h-10 rounded text-white">
                                    ลาคลอด</div>
                                <div class="grid  text-sm">
                                    <h2 class="font-semibold leading-none ">
                                        10 วัน
                                    </h2>
                                    <div class="text-xs text-gray-500  ">
                                        คงเหลือ 98 วัน / ปี
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <!-- End of friends card -->
                </div>
                <!-- Right Side -->
                <div class="w-full md:w-9/12 mx-2 h-64">
                    <!-- Profile tab -->
                    <!-- About Section -->
                    <div class="bg-white p-3 shadow-sm rounded-sm">
                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500">
                                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span class="tracking-wide">About</span>
                        </div>
                        <div class="text-gray-700">
                            <div class="grid md:grid-cols-2 text-sm">
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">ชื่อ-นามสกุล</div>
                                    <div class="px-4 py-2">{{ me.name_title }} {{ me.first_name }} {{ me.last_name }}
                                    </div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">ชื่อเล่น</div>
                                    <div class="px-4 py-2">{{ me.nick_name }} </div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">เพศ</div>
                                    <div class="px-4 py-2" v-if="me.name_title === 'นาย'">ชาย</div>
                                    <div class="px-4 py-2" v-else>หญิง</div>
                                </div>

                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">เลขบัตรประชาชน</div>
                                    <div class="px-4 py-2">{{ me.iden_number }}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">เบอร์โทร</div>
                                    <div class="px-4 py-2">{{ me.tel }}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold"> ที่อยู่</div>
                                    <div class="px-2 py-2">{{ me.address }} ตำบล {{ me.subdistrict }} อำเภอ {{
                            me.district }} จังหวัด {{ me.provice }} {{ me.postcode }}</div>
                                </div>

                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Email</div>
                                    <div class="px-4 py-2">
                                        <a class="text-blue-800">{{ me.email }}</a>
                                    </div>
                                </div>
                                <!-- <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">วันเกิด</div>
                                    <div class="px-4 py-2">{{ me.birthday }}</div>
                                </div> -->
                            </div>
                        </div>
                        <button @click="showDialog" class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs 
                            p-3 my-4">
                            แก้ไขข้อมูลส่วนตัว
                        </button>
                    </div>
                    <!-- End of about section -->

                    <div class="my-4"></div>

                    <!-- Experience and education -->
                    <div class="bg-white p-3 shadow-sm rounded-sm">

                        <div class="grid grid-cols-2">
                            <div>
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span clas="text-green-500">
                                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </span>
                                    <span class="tracking-wide">Experience</span>
                                </div>
                                <ul class="list-inside space-y-2">
                                    <li>
                                        <div class="text-teal-600">Owner at Her Company Inc.</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div class="text-teal-600">Owner at Her Company Inc.</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div class="text-teal-600">Owner at Her Company Inc.</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div class="text-teal-600">Owner at Her Company Inc.</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span clas="text-green-500">
                                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path fill="#fff"
                                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                    </span>
                                    <span class="tracking-wide">Education</span>
                                </div>
                                <ul class="list-inside space-y-2">
                                    <li>
                                        <div class="text-teal-600">Masters Degree in Oxford</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                    <li>
                                        <div class="text-teal-600">Bachelors Degreen in LPU</div>
                                        <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- End of Experience and education grid -->
                    </div>
                    <!-- End of profile tab -->
                </div>
            </div>
        </div>

    </div>

    <Dialog v-model:visible="DialogEdit" :modal="true">

        <body class="  leading-normal ">
            <main class="flex-1 md:p-0 lg:pt-8  md:ml-6 flex flex-col">

                <section class="bg-cream-lighter p-6 shadow">
                    <div class="md:flex">
                        <h2 class="md:w-1/2 uppercase tracking-wide text-sm sm:text-lg mb-6">แก้ไขข้อมูลส่วนตัว</h2>
                    </div>

                    <div class="md:flex mb-8">
                        <div class="md:w-1/4">
                            <legend class="uppercase tracking-wide text-sm">ข้อมูลส่วนตัว</legend>
                        </div>
                        <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">

                            <div class="md:flex mb-4">
                                <div class="md:flex-1 md:pr-3">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">คำนำหน้า
                                    </label>
                                    <input v-model="editedMe.name_title" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   p-4 border-0" type="text">
                                </div>
                                <div class="md:flex-1 md:pl-3">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">ชื่อจริง</label>
                                    <input v-model="editedMe.first_name" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   p-4 border-0" type="text">
                                </div>
                                <div class="md:flex-1 md:pl-3">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">นามสกุล</label>
                                    <input v-model="editedMe.last_name" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   p-4 border-0" type="text">
                                </div>
                            </div>

                            <div class="md:flex mb-4">
                                <div class="md:flex-1 md:pr-3">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">ชื่อเล่น</label>
                                    <input v-model="editedMe.nick_name" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                                </div>
                                <div class="md:flex-1 md:pr-3">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">อายุ</label>
                                    <input v-model="editedMe.age" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                                </div>
                                <!-- <div class="md:flex-1 ">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">วันเกิด</label>
                                    <Calendar v-model="editedMe.birthday" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm  p-3 border-0" />

                                </div> -->
                            </div>

                        </div>
                    </div>

                    <div class="md:flex mb-8">
                        <div class="md:w-1/4">
                            <legend class="uppercase tracking-wide text-sm">ข้อมูลติดต่อ</legend>
                        </div>
                        <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                            <div class="mb-4">
                                <label class="block uppercase tracking-wide text-xs font-bold">ที่อยู่</label>
                                <input v-model="editedMe.address" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                            </div>


                            <div class="md:flex mb-4">
                                <div class="md:flex-1 md:pr-3">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">จังหวัด</label>

                                    <Dropdown v-model="editedMe.provice" :options="item_province" filter
                                        @change="chooseProvince" optionValue="name_th" optionLabel="name_th"
                                        placeholder="เลือกจังหวัด" class="no-rounded w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   border-0" />


                                </div>
                                <div class="md:flex-1 md:pr-3">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">อำเภอ</label>

                                    <Dropdown v-model="editedMe.district" :options="item_amphure" filter
                                        @change="chooseAmphure" optionValue="name_th" optionLabel="name_th"
                                        placeholder="เลือกอำเภอ" class="no-rounded w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   border-0" />
                                </div>

                                <div class="md:flex-1 ">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">ตำบล</label>
                                    <Dropdown v-model="editedMe.subdistrict" :options="item_tambon" filter
                                        @change="chooseDistrict" optionValue="name_th" optionLabel="name_th"
                                        placeholder="เลือกตำบล" class="no-rounded w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   border-0" />

                                </div>
                            </div>
                            <div class="md:flex mb-4">
                                <div class="md:flex-1 md:pr-3">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">รหัสไปรษณีย์</label>
                                    <input v-model="editedMe.postcode" :disabled="isDisabled" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                                </div>
                                <div class="md:flex-1 md:pr-3">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">เบอร์โทร</label>
                                    <input v-model="editedMe.tel" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                                </div>
                                <div class="md:flex-1 ">
                                    <label
                                        class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">E-mail</label>
                                    <input v-model="editedMe.email" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
         focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                                </div>
                            </div>

                        </div>
                    </div>


                    <button @click="saveEdit"
                        class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">บันทึก</button>

                </section>
            </main>
        </body>
    </Dialog>

</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Swal from 'sweetalert2';
import Dropdown from "primevue/dropdown";

export default {
    components: {
        Dropdown
    },
    data() {
        return {
            isDisabled: false,

            item_province: [],
            item_amphure: [],
            item_tambon: [],


            province: null,
            amphure: null,
            tambon: null,
            postcode: null,


            me: {},
            editedMe: {},
            DialogEdit: false,
        };
    },
    async mounted() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_VUE_APP_PROVINCE}`);
            this.item_province = response.data;
            this.fetchME();
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลจังหวัด:', error);
        }
    },

    methods: {
        async showDialog() {
            // เปิด Dialog
            this.DialogEdit = true;

            // ดึงข้อมูลอำเภอ
            const amphures = await axios.get(`${import.meta.env.VITE_VUE_APP_AMPHURE}`);
            this.item_amphure = amphures.data;

            // กำหนดค่าเดิมของอำเภอที่ตรงกับค่าใน editedMe.district
            if (this.editedMe.district) {
                const amphure = this.item_amphure.find(el => el.name_th === this.editedMe.district);

                // กำหนดค่าเดิมของอำเภอที่พบได้
                if (amphure) {
                    this.editedMe.district = amphure.name_th;
                }
            }

            // หาข้อมูลอำเภอที่ตรงกับค่าเดิมของ editedMe.district
            const selectedAmphure = this.item_amphure.find((el) => el.name_th === this.editedMe.district);

            if (selectedAmphure) {
                // ดึงข้อมูลตำบล
                const tambons = await axios.get(`${import.meta.env.VITE_VUE_APP_TAMBON}`);
                this.item_tambon = tambons.data.filter((tambon) => tambon.amphure_id === selectedAmphure.id);
            }
        },

        async saveEdit() {
            try {
                const editedData = {};

                // ตรวจสอบและเพิ่มข้อมูลที่ถูกแก้ไขเข้าไปใน editedData
                if (this.editedMe.name_title !== this.me.name_title) {
                    editedData.name_title = this.editedMe.name_title;
                }
                if (this.editedMe.first_name !== this.me.first_name) {
                    editedData.first_name = this.editedMe.first_name;
                }
                if (this.editedMe.last_name !== this.me.last_name) {
                    editedData.last_name = this.editedMe.last_name;
                }
                if (this.editedMe.nick_name !== this.me.nick_name) {
                    editedData.nick_name = this.editedMe.nick_name;
                }
                if (this.editedMe.age !== this.me.age) {
                    editedData.age = this.editedMe.age;
                }
                if (this.editedMe.birthday !== this.me.birthday) {
                    editedData.birthday = this.formattedBirthday();
                }
                if (this.editedMe.address !== this.me.address) {
                    editedData.address = this.editedMe.address;
                }
                if (this.editedMe.provice !== this.me.provice) {
                    editedData.provice = this.editedMe.provice;
                }
                if (this.editedMe.district !== this.me.district) {
                    editedData.district = this.editedMe.district;
                }
                if (this.editedMe.subdistrict !== this.me.subdistrict) {
                    editedData.subdistrict = this.editedMe.subdistrict;
                }
                if (this.editedMe.postcode !== this.me.postcode) {
                    editedData.postcode = this.editedMe.postcode;
                }
                if (this.editedMe.tel !== this.me.tel) {
                    editedData.tel = this.editedMe.tel;
                }
                if (this.editedMe.email !== this.me.email) {
                    editedData.email = this.editedMe.email;
                }

                // ตรวจสอบว่ามีการแก้ไขข้อมูลหรือไม่
                if (Object.keys(editedData).length === 0) {
                    // ไม่มีการแก้ไขข้อมูล
                    Swal.fire({
                        icon: 'info',
                        title: 'ไม่มีการเปลี่ยนแปลงข้อมูล',
                        text: 'กรุณาแก้ไขข้อมูลก่อนที่จะบันทึก',
                    });
                } else {
                    console.log(editedData);
                    await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/update/${this.me._id}`, editedData, {
                        headers: {
                            'auth-token': localStorage.getItem('token'),
                        },
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'บันทึกข้อมูลสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.DialogEdit = false;
                    this.fetchME();

                    console.log('บันทึกข้อมูลสำเร็จ');
                }
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
                    text: 'กรุณาลองอีกครั้ง',
                });
            }
        },


        formattedBirthday() {
            // แปลงวันเกิดเป็นรูปแบบไทย
            return dayjs(this.editedMe.birthday).locale('th').format('D MMMM YYYY');
        },



        async chooseProvince(evt) {
            try {
                const findprovince = this.item_province.find(item => item.name_th == evt.value);
                const responseAmphure = await axios.get(`${import.meta.env.VITE_VUE_APP_AMPHURE}`);
                this.item_amphure = responseAmphure.data.filter(el => el.province_id == findprovince.id);

                this.item_tambon = [];
                this.editedMe.district = null;
                this.editedMe.subdistrict = null;
                this.amphure = null;
                this.tambon = null;


            } catch (error) {
                console.error(error);
                this.$toast.add({
                    severity: "error",
                    summary: "เกิดข้อผิดพลาดในการเรียกข้อมูลเขต/อำเภอ",
                    life: 3000,
                });
            }
        },

        async chooseAmphure(evt) {
            try {
                const selectedAmphure = this.item_amphure.find(item => item.name_th == evt.value);
                const tambonResponse = await axios.get(`${import.meta.env.VITE_VUE_APP_TAMBON}`);
                this.item_tambon = tambonResponse.data.filter(el => el.amphure_id === selectedAmphure.id);

                // เคลียร์ค่าที่เกี่ยวข้องกับตำบล
                this.editedMe.subdistrict = null;
                this.tambon = null;
            } catch (error) {
                console.error(error);
                this.$toast.add({
                    severity: "error",
                    summary: "เกิดข้อผิดพลาดในการเรียกข้อมูลแขวง/ตำบล",
                    life: 3000,
                });
            }
        },

        chooseDistrict(evt) {
            const tambon = this.item_tambon.find(item => item.name_th == evt.value)
            console.log(tambon)
            this.editedMe.postcode = tambon.zip_code;
        },


        formattedBirthdayshow(birthday) {
            return dayjs(birthday).locale('th').format('D MMMM YYYY');
        },

        //แปลงวันที่
        formatThaiDate(dateString) {
            const thaiDate = dayjs(dateString).locale('th').format('DD/MM/YYYY');
            return thaiDate;
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
                this.editedMe = { ...this.me };
                console.log(response.data.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },



    },
};
</script>

<style>
div:where(.swal2-container) {
    z-index: 9000;
}

.no-rounded {
    border-radius: 0 !important;
}

p-dropdown-filter p-inputtext p-component {
    padding: 4px;
    background-color: red;
}
</style>
