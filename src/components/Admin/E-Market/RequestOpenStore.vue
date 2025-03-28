<template>
    <section class="container px-4 mx-auto">
        <div class="sm:flex sm:items-center sm:justify-between mt-6">
            <div>
                <div class="flex items-center gap-x-3 mt-4">
                    <h2 class="text-lg font-medium text-gray-800 ">คำขอเปิดร้านค้า</h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">{{ Shop.length }}
                        รายการ</span>
                </div>

            </div>

   
        </div>



        <div class="mt-6 xl:flex xl:items-center xl:justify-between">

            <!-- <div class="inline-flex flex-wrap overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row">
                <button @click="showAllItems"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 bg-gray-100 sm:text-sm hover:bg-gray-100">ดูทั้งหมด</button>
                <button @click="showItemsByPosition('manager')"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">ผู้จัดการ</button>
                <button @click="showItemsByPosition('รอการอนุมัติ')"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">รอการอนุมัติ</button>
                <button @click="showItemsByPosition('employee')"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">พนักงาน</button>
            </div> -->


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
                        <th class="px-4 py-3">ลำดับ</th>
                        <th class="px-4 py-3">พาร์ทเนอร์</th>
                        <th class="px-4 py-3">ร้านค้า</th>

                        <th class="px-4 py-3">สถานะ</th>
                        <th class="px-4 py-3">วันที่</th>
                        <th class="px-4 py-3">ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody v-if="paginatedItems.length > 0" class="bg-white">
                    <tr v-for="(item, index) in paginatedItems" :key="index" class="text-[#000000]">
                        <td class="px-4 py-3 border border-[#0C359E]">
                            <div class="flex justify-center items-center text-sm text-center">
                                <div>
                                    <p class="text-black">{{ index + 1 }}</p>
                                </div>
                            </div>
                        </td>

                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <h2 class="font-medium text-gray-800">{{ item.shop_partner_id?.partner_name }}</h2>
                                <h2 class="font-medium text-gray-800">{{ item.shop_partner_id?.partner_company_name }}
                                </h2>

                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border text-center border-[#0C359E]">
                            <div>
                                <h4 class="text-black"> {{ item.shop_name }}</h4>
                                <h4 class="text-black"> {{ item.shop_type }}</h4>

                                <h4 class="text-black"> เลขประจำตัวภาษี: {{ item.taxid }}</h4>

                                <h4 class="text-black"> ที่อยู่: {{ item.address.address }} ตำบล {{ item.address.tambon
                                    }} อำเภอ {{ item.address.amphure }} จังหวัด {{ item.address.province }} {{
                                        item.address.zipcode }}</h4>

                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <span class="text-center inline-flex px-4 py-3 mr-auto items-center 
                                 text-sm leading-none bg-yellow-100 text-yellow-800 rounded-lg"> {{
                                    item.request_status_detail[item.request_status_detail.length - 1].status }} </span>

                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <p class="text-black">{{ formatDateTimeThai(item.createdAt) }}</p>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm border border-[#0C359E]">
                            <div class="flex justify-center gap-3">
                                <!-- <EmployeeDetail :employee_id="item._id" :employee="item" /> -->
                                <button  @click="approveStoreRequest(item._id)" class="btn px-4 py-2"> อนุมัติ
                                </button>

                                <button @click="NotapproveStoreRequest(item._id)"
                                    class="c-button c-button--gooey px-4 py-2 text-sm"> ไม่อนุมัติ
                                    <div class="c-button__blobs">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else class="bg-white">
                    <tr>
                        <td colspan="6" class="text-center py-4 text-gray-800">ไม่มีรายการ</td>
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


    </section>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';
// import EmployeeDetail from "./DetailEmployee.vue";
import dayjs from 'dayjs';

export default {
    components: {
        // EmployeeDetail
    },
    data() {
        return {
            Shop: [],
            filteredItems: [],
            currentPage: 1,
            itemsPerPage: 8,
        };
    },
    mounted() {
        this.getShop();
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
        async NotapproveStore(id) {
            try {
                await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/requestshop/unapprove/${id}`, null, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                Swal.fire({
                    icon: 'success',
                    text: 'ไม่อนุมัติสำเร็จ',
                    timer: 1500,
                    showConfirmButton: false,
                });
                this.getProduct();
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการอนุมัติคำขอสินค้า:', error);
            }
        },
        async approveStoreRequest(id) {
            try {
                await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/requestshop/approve/${id}`, null, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                Swal.fire({
                    icon: 'success',
                    text: 'คำขอสินค้าได้รับการอนุมัติเรียบร้อยแล้ว',
                    timer: 1500,
                    showConfirmButton: false,
                });
                this.getShop();
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการอนุมัติคำขอสินค้า:', error);
            }
        },
        showAllItems() {
            // แสดงรายการทั้งหมด
            this.filteredItems = this.Shop;
            this.currentPage = 1; // กลับไปที่หน้าแรก
        },
        showItemsByPosition(role) {
            // กรองรายการตามตำแหน่งที่เลือก
            this.filteredItems = this.Shop.filter(item => item.role === role);
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
        async getShop() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/requestshop/waitapprove/`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                this.Shop = response.data.data.reverse();
                this.filteredItems = this.Shop;
                console.log("คำร้องร้านค้า", response.data.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        formatDateTimeThai(dateTime) {
            return dayjs(dateTime).locale('th').format('DD/MM/YYYY HH:mm:ss'); // ใช้ locale เป็น 'th' และรูปแบบ 'DD/MM/YYYY HH:mm:ss'
        },
        async confirmDelete(id) {
            const confirmed = await Swal.fire({
                title: 'ยืนยันการลบข้อมูล',
                text: 'คุณต้องการลบข้อมูลนี้หรือไม่?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                confirmButtonColor: '#0C359E',
                cancelButtonText: 'ยกเลิก'
            });

            if (confirmed.isConfirmed) {
                await this.deleteItem(id);
            }
        },
        async deleteItem(id) {
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

        navigateToAddPage() {
            this.$router.push('/Add/Employee');
        },


        async deleteItem(id) {
            try {
                await axios.delete(`${import.meta.env.VITE_VUE_APP_DECCAN}/del/${id}`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                this.Shop = this.Shop.filter(item => item._id !== id);
                Swal.fire({
                    icon: 'success',
                    text: 'ลบข้อมูลพนักงานสำเร็จ',
                    timer: 1500,
                    showConfirmButton: false,

                });
                this.getShop();
                console.log(`Item with ID ${id} deleted successfully.`);
            } catch (error) {
                console.error(`Error deleting item with ID ${id}:`, error);
                Swal.fire({
                    icon: 'error',
                    text: `An error occurred while deleting the item with ID ${id}.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
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

.btn {
    background-color: #00BFA6;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    border-radius: 0;
    border: 2px dashed #00BFA6;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: .4s;
}

.btn span:last-child {
    display: none;
}

.btn:hover {
    transition: .4s;
    border: 2px dashed #00BFA6;
    background-color: #CFFDE1;
    color: #00BFA6;
}

.btn:active {
    background-color: #87dbd0;
}
</style>
