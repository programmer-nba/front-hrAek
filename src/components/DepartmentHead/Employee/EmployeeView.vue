<template>
    <section class=" px-12 sm:px-24">
        <div class="sm:flex sm:items-center sm:justify-between ">
            <div>
                <div class="flex items-center gap-x-3 mt-4">
                    <h2 class="text-lg font-medium text-gray-800 ">พนักงานทั้งหมด</h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">{{ items.length }}
                        รายการ</span>
                </div>

            </div>


        </div>



        <div class="mt-4 my-2 xl:flex xl:items-center xl:justify-between">


            <div class="relative flex items-center ">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 ">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>

                <input v-model="searchQuery" type="text" placeholder="ค้นหาชื่อหรือเลขที่พนักงาน" @input="filterItems"
                    class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-[#0C359E] rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 
                    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
            </div>

            <div
                class="inline-flex overflow-hidden bg-white border border-[#7BD3EA] divide-x rounded-lg  rtl:flex-row-reverse mt-4 sm:mt-0 ">
                <button @click="showItemsByPosition('grid')"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'grid' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200  sm:text-sm hover:bg-[#B4D4FF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M3 6.75c0-1.768 0-2.652.55-3.2C4.097 3 4.981 3 6.75 3c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55C3 9.403 3 8.519 3 6.75Zm0 10.507c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55C3 19.91 3 19.026 3 17.258ZM13.5 6.75c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55c-.55-.548-.55-1.432-.55-3.2Zm0 10.507c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55c1.768 0 2.652 0 3.2.55c.55.548.55 1.432.55 3.2c0 1.768 0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55c-1.768 0-2.652 0-3.2-.55c-.55-.548-.55-1.432-.55-3.2Z" />
                    </svg>
                </button>

                <button @click="showItemsByPosition('stack')"
                    :class="{ 'bg-[#1D24CA] text-white hover:bg-[#0F2167]': activeStatus === 'stack' }"
                    class="px-5 py-2 text-xs font-medium text-[#11009E] transition-colors duration-200 sm:text-sm hover:bg-[#B4D4FF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm2 1v14h16V5zm2 2h2v2H6zm2 4H6v2h2zm-2 4h2v2H6zm12-8h-8v2h8zm-8 8h8v2h-8zm8-4h-8v2h8z" />
                    </svg>
                </button>
            </div>

        </div>

    </section>
    <div class="overflow-x-auto container p-3 px-4 mx-auto" v-if="activeStatus === 'grid'">
        <table class="w-full  border">
            <thead>
                <tr
                    class="text-sm tracking-wide text-center text-[#DFF5FF] bg-[#0C359E] uppercase border-b border-[#50C4ED]">
                    <th class="px-4 py-3">ลำดับ</th>

                    <th class="px-4 py-3">เลขที่พนักงาน</th>
                    <th class="px-4 py-3">ชื่อ</th>
                    <th class="px-4 py-3">ตำแหน่ง</th>
                    <th class="px-4 py-3">เลขบัตรประชาชน</th>
                    <th class="px-4 py-3">วันที่</th>
                    <th class="px-4 py-3">ตัวเลือก</th>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr v-for="(item, index) in paginatedItems" :key="index" class="text-[#000000]">
                    <td class="px-4 py-3 border border-[#0C359E]">
                        <p class="text-black text-center">{{ index + 1 }}</p>
                    </td>
                    <td class="px-4 py-3 border border-[#0C359E]">

                        <p class="text-black text-center ">{{ item.employee_number }}</p>

                    </td>
                    <td class="px-2 py-3 text-sm border text-center border-[#0C359E]">
                        <div>
                            <h4 class="text-black">{{ item.name_title }} {{ item.first_name }} {{ item.last_name
                                }}</h4>
                        </div>
                    </td>
                    <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                        <div>
                            <h2 class="font-medium text-gray-800">{{ item.role }}</h2>
                            <p class="text-sm font-normal text-black">{{ item.position }}</p>
                        </div>
                    </td>
                    <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                        <div>
                            <p class="text-black">{{ item.iden_number }}</p>
                        </div>
                    </td>
                    <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                        <div>
                            <p class="text-black">{{ formatDateTimeThai(item.createdAt) }}</p>
                        </div>
                    </td>
                    <td class="px-4 py-3 text-sm border border-[#0C359E]">
                        <div class="flex justify-center gap-3">
                            <EmployeeDetail :employee_id="item._id" :employee="item" />



                        </div>
                    </td>
                </tr>
            </tbody>
        </table>



        <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
            <div class="text-sm text-black ">
                หน้า <span class="font-medium text-black">{{ currentPage }} of {{ totalPages }}</span>
            </div>

            <div class="flex items-center my-4 gap-x-4 sm:mt-0">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="flex items-center  cursor-pointer justify-center w-1/2 px-5 py-2 text-sm text-[#EEF5FF] capitalize transition-colors duration-200 bg-[#4942E4] border rounded-md sm:w-auto gap-x-2 hover:bg-[#11009E]    ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
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


    <div v-else-if="activeStatus === 'stack'">
        <div class=" flex items-start justify-center bg-[#87C4FF] min-h-screen">
            <div
                class=" flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-full sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">

                <!-- Content -->
                <div class="flex-1 px-2 sm:px-0">

                    <div
                        class="mb-10 sm:mb-0 mt-10 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                        <div v-for="(item, index) in paginatedItems" :key="index"
                            class="  bg-white py-10 sm:py-4 px-4   space-y-2   rounded-md hover:bg-[#CAEDFF] hover:smooth-hover">
                            <div class="  flex flex-col  items-center ">
                                <img class="w-20 h-20 object-cover object-center rounded-full"
                                    :src="item.image ? getImageUrl(item.image) : '../../../assets/employee.png'" />
                                <h4 class="text-[#0802A3] text-lg font-bold capitalize text-center">{{ item.name_title
                                    }}
                                    {{ item.first_name }} {{ item.last_name
                                    }}</h4>
                                <p class="text-[#0802A3] text-sm">{{ item.employee_number }}</p>

                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="mr-auto space-y-1">
                                    <p class="font-medium text-sm text-gray-900 leading-none">
                                        {{ item.role }}
                                    </p>
                                    <p class="font-normal text-sm text-gray-500 leading-none">
                                        {{ item.position }}
                                    </p>
                                </div>
                                <div 
                                    class="inline-flex px-6 leading-6 py-2 rounded-md bg-indigo-50 hover:bg-indigo-50/80 transition-colors duration-200 text-indigo-500 font-medium text-sm">
                                    {{ item.nick_name }}
                                </div>
                            </div>


                            <div
                                class="flex flex-wrap items-center  justify-between  font-semibold text-sm pt-2 pb-6">
                                <span  class="text-[#0802A3] flex justify-between items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="20" height="20"
                                        viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"
                                            d="M15.6 14.521c-2.395 2.521-8.504-3.533-6.1-6.063c1.468-1.545-.19-3.31-1.108-4.609c-1.723-2.435-5.504.927-5.39 3.066c.363 6.746 7.66 14.74 14.726 14.042c2.21-.218 4.75-4.21 2.214-5.669c-1.267-.73-3.008-2.17-4.342-.767ZM14 3a7 7 0 0 1 7 7m-7-3a3 3 0 0 1 3 3" />
                                    </svg>
                                    {{ item.tel }}
                                </span>
                                <span class="text-[#0802A3] flex justify-between items-center ">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="20" height="20"
                                        viewBox="0 0 14 14">
                                        <g fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path
                                                d="M1.358 2.266h11.284s.858 0 .858.858v7.752s0 .858-.858.858H1.358s-.858 0-.858-.858V3.124s0-.858.858-.858M9.36 5.88h1.986M9.36 7.849h1.986" />
                                            <path d="M3.507 6.208a1.64 1.64 0 1 0 3.282 0a1.64 1.64 0 0 0-3.282 0" />
                                            <path
                                                d="M2.654 9.473a3.17 3.17 0 0 1 1.064-1.19a2.62 2.62 0 0 1 1.43-.434c.502 0 .994.15 1.431.434a3.17 3.17 0 0 1 1.064 1.19" />
                                        </g>
                                    </svg>
                                    {{ item.iden_number }}
                                </span>
                            </div>


                            <div class="flex flex-col w-full relative bottom-0">
                                <EmployeeDetail :employee_id="item._id" :employee="item" />

                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    </div>


</template>


<script>
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import EmployeeDetail from "./DetailEmployee.vue";

export default {
    components: {
        EmployeeDetail,

    },
    data() {
        return {
            items: [],
            filteredItems: [],
            currentPage: 1,
            itemsPerPage: 10,
            searchQuery: '',
            activeStatus: 'stack'
        };
    },
    mounted() {
        this.getData();
    },
    computed: {
        // คำนวณหน้าที่เลือก
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
        // คำนวณรายการที่จะแสดงในหน้านี้
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = this.currentPage * this.itemsPerPage;
            return this.filteredItems.slice(startIndex, endIndex);
        },
    },

    methods: {
        getImageUrl(imageId) {
            return `https://drive.google.com/thumbnail?id=${imageId}`;
        },
        showItemsByPosition(position) {
            // ตั้งค่า activeStatus ตามตำแหน่งที่รับมา
            this.activeStatus = position;
        },
        formatDateTimeThai(dateTime) {
            return dayjs(dateTime).locale('th').format('DD/MM/YYYY HH:mm:ss'); // ใช้ locale เป็น 'th' และรูปแบบ 'DD/MM/YYYY HH:mm:ss'
        },
        async filterItems() {
            if (!this.searchQuery) {
                this.filteredItems = this.items;
                return;
            }

            const searchTerm = this.searchQuery.toLowerCase().trim();
            this.filteredItems = this.items.filter(item => {
                // ตรวจสอบให้แน่ใจว่าฟิลด์ที่ต้องการใช้ toLowerCase() ถูกกำหนดค่าแล้ว
                return (
                    (item.first_name && item.first_name.toLowerCase().includes(searchTerm)) ||
                    (item.last_name && item.last_name.toLowerCase().includes(searchTerm)) ||
                    (item.employee_number && item.employee_number.toLowerCase().includes(searchTerm)) ||
                    (item.role && item.role.toLowerCase().includes(searchTerm)) ||
                    (item.position && item.position.toLowerCase().includes(searchTerm))
                );
            });
        },
        async confirmDelete(id) {
            const confirmed = await Swal.fire({
                title: 'ยืนยันการลบข้อมูล',
                text: 'คุณต้องการลบข้อมูลนี้หรือไม่?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ใช่, ลบเลย',
                cancelButtonText: 'ไม่, ยกเลิก'
            });

            if (confirmed.isConfirmed) {
                await this.deleteItem(id);
            }
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
        async getData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/get/member`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                this.items = response.data.data.reverse();
                this.filteredItems = this.items;
                console.log("พนักงาน", response.data.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },



    },
};
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
    color: #B80000;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: 4px solid #B80000;
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
    background-color: #B80000;
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
