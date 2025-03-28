<template>
    <!-- component -->
    <section class="container px-4 mx-auto mt-4">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 ">อนุมัติ one stop service </h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">{{ shop.length }}</span>
                </div>

            </div>


        </div>
        <div class="mt-6 mx-3">

            <div class="inline-flex flex-wrap overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row">
                <button @click="showAllItems"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 bg-gray-100 sm:text-sm hover:bg-gray-100">ดูทั้งหมด</button>
                <button @click="showItemsByPosition(false)"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">รออนุมัติ</button>
                <button @click="showItemsByPosition(true)"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">อนุมัติ</button>
            </div>


            <div class="relative flex items-center mt-2">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 ">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>

                <input type="text" placeholder="Search" class="block w-full py-1.5 pr-5 text-black bg-white border border-gray-200 rounded-lg  placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 
        focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
            </div>

        </div>
        <div class="overflow-x-auto p-3">
            <table class="w-full  border">
                <thead>
                    <tr
                        class="text-sm tracking-wide text-center text-[#DFF5FF] bg-[#0C359E] uppercase border-b border-[#50C4ED]">
                        <th class="px-4 py-3">ชื่อร้านค้า</th>
                        <th class="px-4 py-3">ประเภท</th>
                        <th class="px-4 py-3">ชื่อ partner</th>
                        <th class="px-4 py-3">ที่อยู่</th>
                        <th class="px-4 py-3">สถานะ</th>
                        <th class="px-4 py-3">รายละเอียด</th>
                        <th class="px-4 py-3">ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="data in paginatedItems" :key="data.id" class="text-[#000000]">
                        <td class="px-4 py-3 border border-[#0C359E]">
                            <div class="flex items-center justify-center text-sm text-center">
                                <div>
                                    <p class="text-black text-center">{{ data.shop_name_second }} </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border text-center border-[#0C359E]">
                            <div>
                                <h4 class="text-gray-700">{{ data.shop_type }}</h4>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <h4 class="text-gray-700">{{ getpartner(data?.shop_partner_id) }}</h4>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <h4 class="text-gray-700"> {{ data.shop_address }} {{ data.shop_subdistrict }}
                                    {{ data.shop_district }} {{ data.shop_province }} {{ data.shop_postcode }}</h4>
                            </div>
                        </td>

                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center whitespace-nowrap">
                            <div :class="{
                                'inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ': data?.shop_status == true,
                                'inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60 ': data?.shop_status == false,
                            }">
                                {{ data?.shop_status == true ? 'อนุมัติ' : 'รอการอนุมัติ' }}
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm border border-[#0c359e] text-center">
                            <Detailonestopservice :data_id="data._id" :data="data" />
                        </td>
                        <td class="px-4 py-3 text-sm border border-[#0C359E]">

                            <div class="space-x-2  py-4 text-center">
                                <button @click="confirmdata(data._id)" v-if="data?.shop_status == false"
                                    class="inline-block rounded-md bg-green-500 px-4 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">อนุมัติ</button>
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
                        class="flex items-center  cursor-pointer justify-center w-1/2 px-3 py-2 text-sm text-[#EEF5FF] capitalize transition-colors duration-200 bg-[#4942E4] border rounded-md sm:w-auto gap-x-2 hover:bg-[#11009E]    ">
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
                        class="flex items-center  cursor-pointer justify-center w-1/2 px-4 py-2 text-sm text-[#EEF5FF] capitalize transition-colors duration-200 bg-[#4942E4] border rounded-md sm:w-auto gap-x-2 hover:bg-[#11009E]    ">
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
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Detailonestopservice from "./Detailonestopservice.vue";

export default {
    components: {
        Detailonestopservice
    },
    data() {
        return {
            shop: [],
            modalVisible: false,
            selectedContractType: "",
            contractTypes: [],
            filteredItems: [],
            currentPage: 1,
            itemsPerPage: 8,
            partners: [],
        };
    },
    created() {
        this.fetchshop();
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
        showAllItems() {
            // แสดงรายการทั้งหมด
            this.filteredItems = this.shop;
            this.currentPage = 1; // กลับไปที่หน้าแรก
        },
        showItemsByPosition(status_appover) {
            // กรองรายการตามตำแหน่งที่เลือก
            this.filteredItems = this.shop.filter(item => item.shop_status === status_appover);
            this.currentPage = 1; // กลับไปที่หน้าแรก
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

        clickHandler() {
            const data = {
                data_id: this.selectedId.data_iden,
                code: this.selectedContractType,
                data_main_name: this.selectedId.data_name,
                data_prefix: this.selectedId.antecedent,
                data_tax_id: this.selectedId.data_iden_number
            };
            axios.post(`${import.meta.env.VITE_VUE_APP_CONTRACT}/data-contract/create`, data)
                .then(response => {
                    console.log(response.data);
                    this.modalVisible = false;
                    Swal.fire({
                        icon: 'success',
                        text: 'เพิ่มประเภทสำเร็จ.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    }); console.error('Error:', error);
                });
        },

        showModal(visible, data) {
            this.modalVisible = visible;
            this.selectedId = data;
            console.log(data);
        },
        handleOk() {
            this.modalVisible = false;
        },

        async fetchshop() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/onestopservice/`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                console.log("shop", response.data.data);
                this.shop = response.data.data.reverse();
                this.filteredItems = this.shop;

            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },


        async confirmdata(dataId) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_VUE_APP_DECCAN}/onestopservice/approve/${dataId}`, {},
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    }
                );
                await Swal.fire({
                    title: 'ยืนยันสำเร็จ',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
                this.fetchshop();
            } catch (error) {
                console.error("Error confirming data:", error);
            }
        },
        getpartner(partner_id) {
            const partner = this.partners.find(item => item._id == partner_id);
            if (!partner) {
                return "ไม่มีข้อมูล";
            }
            return partner?.partner_name;
        }

    },

};
</script>


<style>
.animated-button {
    position: relative;
    display: inline-block;
    border: none;
    background-color: #3559E0;
    color: #fff;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
}

.animated-button:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background-color: #0F2167;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
}

.animated-button span {
    position: relative;
    z-index: 1;
}

.animated-button:hover {
    color: #fff;
    background-color: #0F2167;
    box-shadow: 0 0 20px hsla(263, 77%, 31%, 0);
}

.animated-button:active {
    scale: 0.9;
}

.animated-button:hover:before {
    transform: translate(-50%, -50%) rotate(45deg);
    opacity: 1;
}
</style>