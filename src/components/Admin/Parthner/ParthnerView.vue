<template>
    <!-- component -->
    <section class="container px-4 mx-auto mt-4">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 ">ข้อมูลสมัครพาร์ทเนอร์</h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">{{ partners.length }}</span>
                </div>

            </div>


        </div>
        <div class="mt-6 xl:flex xl:items-center xl:justify-between">

<div class="inline-flex flex-wrap overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row">
    <button @click="showAllItems"
        class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 bg-gray-100 sm:text-sm hover:bg-gray-100">ดูทั้งหมด</button>
    <button @click="showItemsByPosition('อนุมัติแล้ว')"
        class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">อนุมัติแล้ว</button>
    <button @click="showItemsByPosition('ยังกรอกข้อมูลไม่ครบ')"
        class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">ข้อมูลไม่ครบ</button>
    <!-- <button @click="showItemsByPosition('employee')"
        class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">พนักงาน</button> -->

    </div>


<div class="relative flex items-center mt-4 xl:mt-0">
    <span class="absolute">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 ">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
    </span>

    <input type="text" placeholder="Search" class="block w-full py-1.5 pr-5 text-black bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 
        focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
</div>

</div>
        <div class="overflow-x-auto p-3">
            <table class="w-full  border">
                <thead>
                    <tr
                        class="text-sm tracking-wide text-center text-[#DFF5FF] bg-[#0C359E] uppercase border-b border-[#50C4ED]">
                        <th class="px-4 py-3">ชื่อ-นามสกุล</th>
                        <th class="px-4 py-3">เลขบัตรประชาชน</th>
                        <th class="px-4 py-3">บริษัท</th>
                        <th class="px-4 py-3">ที่อยู่พาร์ทเนอร์</th>
                        <th class="px-4 py-3">สถานะ</th>
                        <th class="px-4 py-3">ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="partner in paginatedItems" :key="partner.id" class="text-[#000000]">
                        <td class="px-4 py-3 border border-[#0C359E]">
                            <div class="flex items-center justify-center text-sm text-center">
                                <div>
                                    <p class="text-black text-center">{{ partner.antecedent }} {{
                        partner.partner_name }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border text-center border-[#0C359E]">
                            <div>
                                <h4 class="text-gray-700">{{ partner.partner_iden_number }}</h4>
                                <h4 class="text-gray-700">เบอร์: {{ partner.partner_phone }}</h4>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <h4 class="text-gray-700"> {{ partner.partner_company_name }}</h4>
                                <h4 class="text-gray-700 ">เลขที่: {{ partner.partner_company_number }} </h4>
                                <h4 class="text-gray-700 ">ที่ตั้ง: {{ partner.partner_company_address }} </h4>

                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <h4 class="text-gray-700"> {{ partner.partner_address }}</h4>

                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center whitespace-nowrap">
                            <div :class="{
                        'inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ': partner.status_appover == 'อนุมัติแล้ว',
                        'inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60 ': partner.status_appover === 'รออนุมัติ',
                        'inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60 ': partner.status_appover === 'ยกเลิกการเป็นพาร์ทเนอร์',
                        'inline px-3 py-1 text-sm font-normal rounded-full text-[#B0578D] gap-x-2 bg-[#FACBEA] ': partner.status_appover === 'ยังกรอกข้อมูลไม่ครบ'


                    }">
                                {{ partner.status_appover }}
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm border border-[#0C359E]">
                           
                            <div class="space-x-2  py-4 text-center">
                                            <button @click="cancelPartner(partner._id)"
                                                v-if="partner.status_appover === 'รออนุมัติ'"
                                                class="inline-block rounded-md bg-red-500 px-4 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">ยกเลิก</button>

                                            <button @click="confirmPartner(partner._id)"
                                                v-if="partner.status_appover === 'รออนุมัติ' ||  partner.status_appover === 'ยังกรอกข้อมูลไม่ครบ'"
                                                class="inline-block rounded-md bg-green-500 px-4 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">ยืนยัน</button>

                                            <button v-if="partner.status_appover === 'อนุมัติแล้ว'"
                                                @click="showModal(true, partner)" class="animated-button px-6 py-3">
                                                <span>เลือกสัญญา</span>
                                            </button>

                                        </div>
                           
                            <div class="flex justify-center gap-3">
                                <EmployeeDetail :employee_id="partner._id" :employee="partner" />


                           
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

        <!-- <div class="flex flex-col mt-6">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200  md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 ">
                            <thead class="bg-[#3B3486] ">
                                <tr>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                        ชื่อ-นามสกุล
                                    </th>

                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                        เลขบัตรประชาชน
                                    </th>

                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                        บริษัท
                                    </th>

                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                        ที่อยู่พาร์ทเนอร์</th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                        สถานะ</th>

                                    <th scope="col" class=" py-3.5 px-4">

                                    </th>
                                </tr>
                            </thead>


                            <tbody v-if="partners.length > 0" class="bg-white divide-y divide-gray-200  ">
                                <tr class="hover:bg-gray-50" v-for="partner in partners" :key="partner.id">
                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800  ">{{ partner.antecedent }} {{
                                                partner.partner_name }}</h2>
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 class="text-gray-700">{{ partner.partner_iden_number }}</h4>
                                            <h4 class="text-gray-700">เบอร์: {{ partner.partner_phone }}</h4>

                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-sm ">
                                        <div>
                                            <h4 class="text-gray-700"> {{ partner.partner_company_name }}</h4>
                                            <h4 class="text-gray-700 ">เลขที่: {{ partner.partner_company_number }} </h4>
                                            <h4 class="text-gray-700 ">ที่ตั้ง: {{ partner.partner_company_address }} </h4>

                                        </div>
                                    </td>


                                    <td class="px-4 py-4 text-sm ">
                                        <div>
                                            <h4 class="text-gray-700"> {{ partner.partner_address }}</h4>

                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div :class="{
                                            'inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ': partner.status_appover == 'อนุมัติแล้ว',
                                            'inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60 ': partner.status_appover === 'รออนุมัติ',
                                            'inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60 ': partner.status_appover === 'ยกเลิกการเป็นพาร์ทเนอร์',
                                            'inline px-3 py-1 text-sm font-normal rounded-full text-[#B0578D] gap-x-2 bg-[#FACBEA] ': partner.status_appover === 'ยังกรอกข้อมูลไม่ครบ'


                                        }">
                                            {{ partner.status_appover }}
                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div class="space-x-2  py-4 text-center">
                                            <button @click="cancelPartner(partner._id)"
                                                v-if="partner.status_appover === 'รออนุมัติ'"
                                                class="inline-block rounded-md bg-red-500 px-4 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">ยกเลิก</button>

                                            <button @click="confirmPartner(partner._id)"
                                                v-if="partner.status_appover === 'รออนุมัติ'"
                                                class="inline-block rounded-md bg-green-500 px-4 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">ยืนยัน</button>

                                            <button v-if="partner.status_appover === 'อนุมัติแล้ว'"
                                                @click="showModal(true, partner)" class="animated-button px-6 py-3">
                                                <span>เลือกสัญญา</span>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                            <tbody v-else>
                                <tr>
                                    <td colspan="6" class="px-4 py-4 text-sm text-center text-gray-500">
                                        ไม่มีรายการข้อมูลสมัครพาร์ทเนอร์
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
            <div class="text-sm text-gray-500 ">
                Page <span class="font-medium text-gray-700 ">1 of 10</span>
            </div>

            <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
                <a href="#"
                    class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100  
                     ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>
                        previous
                    </span>
                </a>

                <a href="#"
                    class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100   ">
                    <span>
                        Next
                    </span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </a>
            </div>
        </div> -->








        <a-modal v-model:open="modalVisible" centered width="650px" footer-hide>
            <template #footer>

            </template>
            <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline"> เพิ่มประเภทสัญญา</h3>
                <div class="mt-2">
                    <select v-model="selectedContractType"
                        class="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500">
                        <option v-for="contract in contractTypes" :value="contract.code" :key="contract.code">
                            {{ contract.code }}


                        </option>
                    </select>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                    <button @click="clickHandler"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base 
                        font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:w-auto sm:text-sm">
                        เพิ่ม </button>
                </div>
            </div>
        </a-modal>


    </section>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import EmployeeDetail from "./DetailEmployee.vue";

export default {
    components: {
        EmployeeDetail
    },
    data() {
        return {
            partners: [],
            modalVisible: false,
            selectedContractType: "",
            contractTypes: [],
            filteredItems: [],
            currentPage: 1,
            itemsPerPage: 8,
        };
    },
    created() {
        this.fetchPartners();
        this.getContractTypes();
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
            this.filteredItems = this.partners;
            this.currentPage = 1; // กลับไปที่หน้าแรก
        },
        showItemsByPosition(status_appover) {
            // กรองรายการตามตำแหน่งที่เลือก
            this.filteredItems = this.partners.filter(item => item.status_appover === status_appover);
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
        async getContractTypes() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_CONTRACT}/base-contract/codes`);
                this.contractTypes = response.data.data.ddsc;
                console.log(response.data.data.ddsc)
            } catch (error) {
                console.error('Error fetching contract types:', error);
            }
        },
        clickHandler() {
            const data = {
                partner_id: this.selectedId.partner_iden,
                code: this.selectedContractType,
                partner_main_name: this.selectedId.partner_name,
                partner_prefix: this.selectedId.antecedent,
                partner_tax_id: this.selectedId.partner_iden_number
            };
            axios.post(`${import.meta.env.VITE_VUE_APP_CONTRACT}/partner-contract/create`, data)
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

        showModal(visible, partner) {
            this.modalVisible = visible;
            this.selectedId = partner;
            console.log(partner);
        },
        handleOk() {
            this.modalVisible = false;
        },

        async fetchPartners() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/officegetall`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                console.log("partners", response.data.data);
                this.partners = response.data.data.reverse();
                this.filteredItems = this.partners;

            } catch (error) {
                console.error('Error fetching partners:', error);
            }
        },


        async confirmPartner(partnerId) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_VUE_APP_DECCAN}/partners/approve/${partnerId}`, {},
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    }
                );

                console.log(response.data.data);
                await Swal.fire({
                    title: 'ยืนยันสำเร็จ',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
                this.fetchPartners();
            } catch (error) {
                console.error("Error confirming partner:", error);
            }
        },

        async cancelPartner(partnerId) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_VUE_APP_DECCAN}/admin/partner/cancel/${partnerId}`, {},
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    }
                );

                console.log(response.data.data);

                Swal.fire({
                    icon: 'success',
                    title: 'ยกเลิกสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                });

                this.fetchPartners();
            } catch (error) {
                console.error("Error canceling partner:", error);
            }
        },

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