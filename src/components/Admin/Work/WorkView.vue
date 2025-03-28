<template>
    <section class="container px-4 mx-auto">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3 mt-4">
                    <h2 class="text-lg font-medium text-gray-800 ">งานทั้งหมด</h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">{{ works.length }}
                        รายการ</span>
                </div>

            </div>

            <div class="flex items-center mt-4 gap-x-3">
          

                <button
                    class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <span>Add work</span>
                </button>
            </div>
        </div>

        <div class="mt-6 md:flex md:items-center md:justify-between">
            <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse  ">
                <button
                    class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm  ">
                    ดูทั้งหมด
                </button>

                <button
                    class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm   hover:bg-gray-100">
                    Monitored
                </button>

                <button
                    class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm   hover:bg-gray-100">
                    Unmonitored
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

                <input type="text" placeholder="Search"
                    class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  
                     focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
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
                                        ประเภทงาน
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        ชื่องาน
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        ราคา
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        รายละเอียด
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        วันที่
                                    </th>



                                    <th scope="col"
                                        class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50 ">
                                        ตัวเลือก
                                    </th>

                                </tr>

                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200 ">
                                <tr v-for="(item, index) in works" :key="index">
                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 class="text-gray-700 ">{{ item.type }} </h4>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 class="font-medium text-gray-800  ">{{ item.project_name }}</h2>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">


                                        <div>
                                            <h4 class="text-[#001B79] "> {{ item.price }} </h4>
                                        </div>

                                    </td>
                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 class="text-gray-700 ">{{ item.detail }} </h4>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 class="text-gray-700 ">{{ formatDate(item.createdAt) }}</h4>
                                        </div>
                                    </td>




                                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                                        <div class="flex justify-center">
                                            <button @click="deleteItem(item._id)">
                                                <svg class="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
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
                    class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 ">
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
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            works: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/partner/getAll`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                this.works = response.data.data;
                console.log(response.data.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async deleteItem(id) {
            try {
                await axios.delete(`${import.meta.env.VITE_VUE_APP_DECCAN}/del/${id}`, {
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
        formatDate(dateString) {
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
      return formattedDate;
    },
    },
};
</script>
