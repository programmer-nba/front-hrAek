<template>
    <section class="container px-4 mx-auto">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3 mt-4">
                    <h2 class="text-lg font-medium text-gray-800 ">สัญญาทั้งหมด</h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">{{ items.length }}
                        รายการ</span>
                </div>

            </div>


        </div>


        <div class="flex flex-col mt-6">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200  md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 ">
                            <thead class="bg-[#3B3486]">

                                <tr>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        เลขที่สัญญา
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        ผู้ทำสัญญา
                                    </th>

                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        รายละเอียดสัญญา
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        วันที่ทำสัญญา
                                    </th>

                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        สถานะ
                                    </th>

                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        ตัวเลือก
                                    </th>

                                </tr>

                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200 ">
                                <tr v-for="(item, index) in items" :key="index" v-if="items.length > 0">
                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 class="text-gray-700 ">{{ item.contract_code }} </h4>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800  ">ชื่อ:{{ item.partner.name }}</h2>
                                            <p class="text-sm font-normal text-gray-600 ">เลขกำกับภาษี:{{
                                                item.partner.tax_id }}</p>
                                            <p class="text-sm font-normal text-gray-600 ">เบอร์: {{ item.partner.tel }}</p>

                                        </div>
                                    </td>

                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <button @click="goToContractDetails(item.contract_code)" class="block w-full select-none rounded-lg bg-[#3559E0] py-2 px-2 text-center align-middle
                                             font-sans text-sm font-bold uppercase text-white shadow-md shadow-[#86B6F6]
      transition-all hover:shadow-lg hover:shadow-[#96EFFF] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50
       disabled:shadow-none">
                                                ดูรายละเอียด
                                            </button>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 class="text-gray-700 ">ตั้งแต่ {{ formatDateThai(item.contract_start) }}
                                            </h4>
                                            <p class="text-gray-500 ">ถึง: {{ formatDateThai(item.contract_end) }}</p>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-sm whitespace-nowrap">

                                        <div :class="{
                                            'inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ': item.status[item.status.length - 1].name == 'การลงนามสัญญาสำเร็จ',
                                            'inline px-3 py-1 text-sm font-normal rounded-full text-[#D63484] gap-x-2 bg-[#FF9BD2] ': item.status[item.status.length - 1].name === 'รอลงนาม',
                                            'inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60 ': item.status[item.status.length - 1].name === 'รอตรวจสอบ',

                                            'inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60 ': item.status[item.status.length - 1].name === 'ยกเลิกการลงนามสัญญา'
                                        }">
                                            {{ item.status[item.status.length - 1].name }}
                                        </div>
                                    </td>




                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div class="flex justify-center">
                                            <button @click="deleteItem(item._id)"
                                                v-if="item.status[item.status.length - 1].name !== 'รอลงนาม' && item.status[item.status.length - 1].name !== 'รอตรวจสอบ'">
                                                <svg class="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                    </path>
                                                </svg>

                                            </button>
                                            <button @click="confirmContract(item._id)"
                                                v-if="item.status[item.status.length - 1].name !== 'การลงนามสัญญาสำเร็จ' && item.status[item.status.length - 1].name !== 'ยกเลิกการลงนามสัญญา' && item.status[item.status.length - 1].name !== 'รอลงนาม'">

                                                <svg class="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <g fill="none" stroke="currentColor" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="2">
                                                        <path stroke-dasharray="60" stroke-dashoffset="60"
                                                            d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset"
                                                                dur="0.5s" values="60;0" />
                                                        </path>
                                                        <path stroke-dasharray="14" stroke-dashoffset="14"
                                                            d="M8 12L11 15L16 10">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset"
                                                                begin="0.6s" dur="0.2s" values="14;0" />
                                                        </path>
                                                    </g>
                                                </svg>
                                            </button>
                                            <button @click="cancleContract(item._id)"
                                                v-if="item.status[item.status.length - 1].name !== 'การลงนามสัญญาสำเร็จ' && item.status[item.status.length - 1].name !== 'ยกเลิกการลงนามสัญญา' && item.status[item.status.length - 1].name !== 'รอลงนาม'">
                                                <svg class="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                                                    viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="currentColor"
                                                        d="M1005.303 98.988c-447.59.377-859.063 373.342-901.291 819.483c-45.314 379.987 168.535 777.154 517.567 938.558c324.137 158.423 740.176 108.288 1009.01-135.647c273.526-236.69 393.041-640.13 272.893-984.32c-114.258-351.15-451.46-619.981-822.842-636.252c-25.079-1.64-50.213-1.947-75.337-1.822m18.334 289.733c329.628-9.588 631.825 281.137 635.693 610.898c14.255 301.673-212.385 597.907-513.018 648.484c-290.913 58.275-613.563-109.854-715.39-392.282c-109.622-279.29 2.217-632.478 269.045-779.065c97.56-57.284 210.508-88.176 323.67-88.035M794.723 615.498L615.498 794.723l230.63 230.633l-226.464 226.466l176.38 176.381l226.468-226.467l230.765 230.766l179.225-179.225l-230.766-230.765l226.473-226.475l-176.38-176.38c-75.492 75.49-150.983 150.981-226.473 226.472l-230.633-230.63z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>

                                </tr>

                                <tr v-else>
                                    <td colspan="6" class="px-4 py-4 text-sm text-center text-gray-500">ไม่มีรายการ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
            <div class="text-sm text-gray-500 ">
                Page <span class="font-medium text-gray-700">1 of 10</span>
            </div>

            <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
                <a href="#"
                    class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 ">
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
        </div>

    </section>
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
        };
    },
    mounted() {
        this.getData();

    },
    methods: {
        goToContractDetails(contract_code) {
            this.$router.push({ name: 'ContractByID', params: { id: contract_code } });
        },

        formatDateThai(date) {
            return dayjs(date).locale('th').format('DD MMMM YYYY');  // แก้เป็น 'th'
        },

        async getData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_CONTRACT}/partner-contract/all`,
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

        async deleteItem(id) {
            try {
                await axios.delete(`${import.meta.env.VITE_VUE_APP_CONTRACT}/${id}`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                this.items = this.items.filter(item => item._id !== id);
                Swal.fire({
                    icon: 'success',
                    text: 'ลบข้อมูลพนักงานสำเร็จ',
                    timer: 2000,
                    showConfirmButton: false,

                });

                console.log(`Item with ID ${id} deleted successfully.`);
            } catch (error) {
                console.error(`Error deleting item with ID ${id}:`, error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `An error occurred while deleting the item with ID ${id}.`,
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        },

        async confirmContract(_id) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_VUE_APP_CONTRACT}/successfully/${_id}`,

                );

                console.log(response.data.data);
                await Swal.fire({
                    title: 'ยืนยันสำเร็จ',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
                this.getData();
            } catch (error) {
                console.error("Error confirming partner:", error);
            }
        },
        async cancleContract(_id) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_VUE_APP_CONTRACT}/cancle/${_id}`,

                );

                console.log(response.data.data);
                await Swal.fire({
                    title: 'ยกเลิกสำเร็จ',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
                this.getData();
            } catch (error) {
                console.error("Error confirming partner:", error);
            }
        },

    },
};
</script>
