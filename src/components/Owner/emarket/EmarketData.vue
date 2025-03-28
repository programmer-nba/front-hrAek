<template>
    <!-- component -->
    <section class="container px-4 mx-auto mt-4">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 ">ข้อมูลฝากขายสินค้า (e-market)</h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">{{ requestproduct.length
                        }}</span>
                </div>

            </div>


        </div>
        <div class="mt-6 mx-3">

            <div class="inline-flex flex-wrap overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row">
                <button @click="showAllItems"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 bg-gray-100 sm:text-sm hover:bg-gray-100">ดูทั้งหมด</button>
                <button @click="showItemsByPosition(true)"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">เปิดขาย</button>
                <button @click="showItemsByPosition(false)"
                    class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 sm:text-sm hover:bg-gray-100">ปิดขาย</button>

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
                        <th class="px-4 py-3">สถานะ</th>
                        <th class="px-4 py-3">ชื่อสินค้า</th>
                        <th class="px-4 py-3">หมวดหมู่สินค้า</th>
                        <th class="px-4 py-3">ราคาสินค้า</th>
                        <th class="px-4 py-3">ชื่อ partner</th>

                        <th class="px-4 py-3">ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="product in paginatedItems" :key="product.id" class="text-[#000000]">
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center whitespace-nowrap">
                            <div>
                                <InputSwitch v-model="product.product_status"
                                    @click="changestatus(product.product_status, product._id)" />
                            </div>
                        </td>
                        <td class="px-4 py-3 border border-[#0C359E]">
                            <div class="flex items-center justify-center text-sm text-center">
                                <div>
                                    <p class="text-black text-center">{{ product.product_name }} </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border text-center border-[#0C359E]">
                            <div>
                                <h4 class="text-gray-700">{{ product.product_category }}</h4>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <h4 class="text-gray-700"> {{ product.product_price?.toLocaleString('en', {
                                    minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</h4>
                            </div>
                        </td>

                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center whitespace-nowrap">
                            {{ product?.product_partner_id?.partner_name }}
                        </td>

                        <td class="px-4 py-3 text-sm border border-[#0C359E]">

                            <div class="space-x-2  py-4 text-center">
                                <button @click="opensidebar(product)"
                                    class="inline-block rounded-md bg-orange-500 px-4 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-orange-600">แก้ไข</button>
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

        <Sidebar v-model:visible="sidebar" class="p-sidebar-lg" position="right" style="width: 850px;">
            <div class=" bg-gradient-to-r from-pink-300 to-indigo-300">
                <div class="grid grid-cols-12 gap-0">
                    <div class="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xxl:col-span-12 px-6 pt-6">
                        <div class="grid grid-cols-12 gap-6">

                            <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xxl:col-span-6">
                                <!-- Start Card List -->
                                <div
                                    class=" bg-pink-600 hover:bg-pink-700 p-3 text-white rounded-xl shadow-xl flex items-center ">
                                    รายละเอียดสินค้า
                                </div>
                                <!-- End Card List -->
                            </div>
                        </div>

                    </div>
                    <div class="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12  px-6 ">

                        <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 ">
                            <div
                                class="p-8 space-y-3 border-2 bg-white  border-blue-400  rounded-xl hover:shadow-2xl transition duration-500 ">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                                    <div class="col-span-full">
                                        <label class="block text-sm font-medium text-gray-700">ชื่อสินค้า</label>

                                        <input type="text"
                                            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                            v-model="form.product_name" placeholder="กรอกชื่อสินค้า" />
                                    </div>
                                    <div class="col-span-full">
                                        <label
                                            class="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่สินค้า</label>
                                        <input type="text"
                                            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                            v-model="form.product_category" placeholder="กรอกชื่อหมวดหมู่สินค้า" />
                                    </div>
                                    <div class="col-span-full">
                                        <div class="grid grid-cols-12 w-full gap-4">
                                            <div class="col-span-full lg:col-span-4">
                                                <label
                                                    class="block text-sm font-medium text-gray-700">ราคาต้นทุนสินค้า</label>
                                                <input type="number"
                                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                    v-model="product.product_basecost" @input="calproduct_cost"
                                                    placeholder="กรอกราคาทุนสินค้า" />
                                            </div>
                                            <div class="col-span-full lg:col-span-4">
                                                <label class="block text-sm font-medium text-gray-700">vat 7%:</label>
                                                <input type="number" :disabled="true"
                                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                    :value="costVat" />
                                            </div>
                                            <div class="col-span-full lg:col-span-4">
                                                <label class="block text-sm font-medium text-gray-700">ราคาต้นทุนก่อน
                                                    vat:</label>
                                                <input type="number" :disabled="true"
                                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                    :value="costNet" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <div class="grid grid-cols-12 w-full gap-4">
                                            <div class="col-span-full lg:col-span-4">
                                                <label
                                                    class="block text-sm font-medium text-gray-700">ราคาที่ส่งให้บริษัท</label>
                                                <input type="number"
                                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                    v-model="product.product_costprice" @input="calproduct_price"
                                                    placeholder="กรอกราคาสินค้า" />
                                            </div>
                                            <div class="col-span-full lg:col-span-4">
                                                <label class="block text-sm font-medium text-gray-700">vat 7%:</label>
                                                <input type="number" :disabled="true"
                                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                    :value="priceVat" />
                                            </div>
                                            <div class="col-span-full lg:col-span-4">
                                                <label class="block text-sm font-medium text-gray-700">ราคาต้นทุนก่อน
                                                    vat:</label>
                                                <input type="number" :disabled="true"
                                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                    :value="priceNet" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <div class="grid grid-cols-12 w-full gap-4">
                                            <div class="col-span-full lg:col-span-4">
                                                <label
                                                    class="block text-sm font-medium text-gray-700">ราคาแนะนำขาย</label>
                                                <input type="number"
                                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                    v-model="product.product_price" @input="calproduct_price"
                                                    placeholder="กรอกราคาสินค้า" />
                                            </div>
                                            <div class="col-span-full lg:col-span-4">
                                                <label
                                                    class="block text-sm font-medium text-gray-700">กำไรสุทธิ:</label>
                                                <input type="number" :disabled="true"
                                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                    :value="profit" />
                                            </div>
                                            <div class="col-span-full lg:col-span-4">
                                                <label class="block text-sm font-medium text-gray-700">ส่วนต่างฝากขาย
                                                    :</label>
                                                <input type="number" :disabled="true"
                                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                    :value="profitTg" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-full">
                                        <label class="block text-sm font-medium text-gray-700">จำนวนสต็อก</label>
                                        <input type="number"
                                            class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                            v-model="form.product_stock" placeholder="กรอกจำนวนสต็อก" />
                                    </div>
                                    <div class="col-span-full">
                                        <label
                                            class="block text-sm font-medium text-gray-700 mb-2">รายละเอียดสินค้า</label>
                                        <Editor v-model="form.product_detail" editorStyle="height: 200px"
                                            placeholder="กรอกรายละเอียดสินค้า" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพสินค้า</label>
                                        <Image :src="getImageUrl(form.product_image)" width="350"
                                            v-if="form.product_image != '' && form?.product_imagepreview == undefined"
                                            class="pb-3" preview />
                                        <div v-else class="text-sm py-3 text-center">ไม่มีรูปภาพ</div>
                                        <!-- <Image :src="product?.product_imagepreview"  width="350" v-if="product?.product_imagepreview != undefined" class="pb-3"  preview />
                                    <FileUpload
                                        mode="basic"
                                        chooseLabel="แนบรูปภาพสินค้า"
                                        :auto="true"
                                        class="buttonfile "
                                        @uploader="chooseimageproduct"
                                        :customUpload="true"
                                        accept="image/png, image/jpeg,image/jpg"
                                        :fileLimit="1"
                                        invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                                    />   -->
                                    </div>
                                    <div class="">
                                        <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพย่อยสินค้า
                                            1</label>
                                        <Image :src="getImageUrl(form.product_subimage1)" class="pb-3" width="350"
                                            v-if="form.product_subimage1 != '' && form?.product_imagepreview1 == undefined"
                                            preview />
                                        <div v-else class="text-sm py-3 text-center">ไม่มีรูปภาพ</div>
                                        <!-- <Image :src="product?.product_imagepreview1" class="pb-3"  width="350" v-if="product?.product_imagepreview1 != undefined"  preview />
                                   
                                    <FileUpload
                                        mode="basic"
                                        chooseLabel="แนบรูปภาพย่อยสินค้า 1"
                                        :auto="true"
                                        class="buttonfile "
                                        @uploader="chooseimagesubproduct1"
                                        :customUpload="true"
                                        accept="image/png, image/jpeg,image/jpg"
                                        :fileLimit="1"
                                        invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                                    /> -->

                                    </div>
                                    <div class="">
                                        <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพย่อยสินค้า
                                            2</label>
                                        <Image :src="getImageUrl(form.product_subimage2)" class="pb-3" width="350"
                                            v-if="form.product_subimage2 != '' && form?.product_imagepreview2 == undefined"
                                            preview />
                                        <div v-else class="text-sm py-3 text-center">ไม่มีรูปภาพ</div>
                                        <!-- <Image :src="product?.product_imagepreview2" class="pb-3"  width="350" v-if="product?.product_imagepreview2 != undefined"  preview />

                                    <FileUpload
                                        mode="basic"
                                        chooseLabel="แนบรูปภาพย่อยสินค้า 2"
                                        :auto="true"
                                        class="buttonfile "
                                        @uploader="chooseimagesubproduct2"
                                        :customUpload="true"
                                        accept="image/png, image/jpeg,image/jpg"
                                        :fileLimit="1"
                                        invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                                    /> -->

                                    </div>
                                    <div class="">
                                        <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพย่อยสินค้า
                                            3</label>
                                        <Image :src="getImageUrl(form.product_subimage3)" class="pb-3" width="350"
                                            v-if="form.product_subimage3 != '' && form?.product_imagepreview3 == undefined"
                                            preview />
                                        <div v-else class="text-sm py-3 text-center">ไม่มีรูปภาพ</div>
                                        <!-- <Image :src="product?.product_imagepreview3" class="pb-3"  width="350" v-if="product?.product_imagepreview3 != undefined"  preview />
                                    <FileUpload
                                        mode="basic"
                                        chooseLabel="แนบรูปภาพย่อยสินค้า 3"
                                        :auto="true"
                                        class="buttonfile "
                                        @uploader="chooseimagesubproduct3"
                                        :customUpload="true"
                                        accept="image/png, image/jpeg,image/jpg"
                                        :fileLimit="1"
                                        invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                                    /> -->

                                    </div>
                                    <div class="">
                                        <label
                                            class="block text-sm font-medium text-gray-700 mb-2">เอกสารทางกฎหมายกำกับสินค้า</label>
                                        <Image :src="getImageUrl(form.product_imagedoc)" class="pb-3" width="350"
                                            v-if="form.product_imagedoc != '' && form?.product_imagedocpreview == undefined"
                                            preview />
                                        <div v-else class="text-sm py-3 text-center">ไม่มีรูปภาพ</div>
                                        <!-- <Image :src="product?.product_imagepreview3" class="pb-3"  width="350" v-if="product?.product_imagepreview3 != undefined"  preview />
                                    <FileUpload
                                        mode="basic"
                                        chooseLabel="แนบรูปภาพย่อยสินค้า 3"
                                        :auto="true"
                                        class="buttonfile "
                                        @uploader="chooseimagesubproduct3"
                                        :customUpload="true"
                                        accept="image/png, image/jpeg,image/jpg"
                                        :fileLimit="1"
                                        invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                                    /> -->

                                    </div>
                                </div>
                                <div class="flex justify-center gap-3 pt-4">
                                    <button @click="updateproduct"
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button">
                                        บันทึก
                                    </button>
                                    <button @click="sidebar == false"
                                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button">
                                        ยกเลิก
                                    </button>
                                </div>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
        </Sidebar>
    </section>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    components: {

    },
    data() {
        return {
            requestproduct: [],
            modalVisible: false,
            selectedContractType: "",
            contractTypes: [],
            filteredItems: [],
            currentPage: 1,
            itemsPerPage: 8,
            sidebar: false,
            form: {
                product_name: "",
                product_category: "",
                product_basecost: "",
                product_costprice: "",
                product_price: "",
                product_stock: "",
                product_detail: "",
                product_image: "",
                product_subimage1: "",
                product_subimage2: "",
                product_subimage3: "",
                product_imagedoc: ""
            },
        };
    },
    created() {
        this.fetchrequestproduct();
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
        costVat() {
            return (this.product.product_basecost * 0.07).toFixed(2);
        },
        costNet() {
            return (this.product.product_basecost - this.costVat).toFixed(2);
        },
        priceVat() {
            return (this.product.product_costprice * 0.07).toFixed(2);
        },
        priceNet() {
            return (this.product.product_costprice - this.priceVat).toFixed(2);
        },
        profit() {
            return (this.priceNet - this.product.product_basecost).toFixed(2);
        },
        profitTg() {
            return (this.product.product_price - this.product.product_costprice).toFixed(2);
        }
    },

    methods: {
        showAllItems() {
            // แสดงรายการทั้งหมด
            this.filteredItems = this.requestproduct;
            this.currentPage = 1; // กลับไปที่หน้าแรก
        },
        showItemsByPosition(status_appover) {
            // กรองรายการตามตำแหน่งที่เลือก
            this.filteredItems = this.requestproduct.filter(item => item.product_status === status_appover);
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
                product_id: this.selectedId.product_iden,
                code: this.selectedContractType,
                product_main_name: this.selectedId.product_name,
                product_prefix: this.selectedId.antecedent,
                product_tax_id: this.selectedId.product_iden_number
            };
            axios.post(`${import.meta.env.VITE_VUE_APP_DECCAN}/product-contract/create`, data)
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

        showModal(visible, product) {
            this.modalVisible = visible;
            this.selectedId = product;
            console.log(product);
        },
        handleOk() {
            this.modalVisible = false;
        },

        async fetchrequestproduct() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/product/getallproductbyoffice`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });

                this.requestproduct = response.data.data.reverse();
                this.filteredItems = this.requestproduct;

            } catch (error) {
                console.error('Error fetching requestproduct:', error);
            }
        },


        async opensidebar(product) {
            this.sidebar = true;
            this.form = product;
        },

        async updateproduct() {
            try {
                const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/product/editproductbyoffice/${this.form._id}`, this.form,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });

                this.fetchrequestproduct();
                this.sidebar = false;
                Swal.fire({
                    icon: 'success',
                    text: 'แก้ไขสำเร็จ.',
                    showConfirmButton: false,
                    timer: 1500
                });

            } catch (error) {
                console.error('Error fetching requestproduct:', error);
            }
        },

        async changestatus(status, id) {
            try {

                const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/product/editproductbyoffice/${id}`, {
                    product_status: !status
                },
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });

                Swal.fire({
                    icon: 'success',
                    text: 'เปลี่ยนสถานะสำเร็จ.',
                    showConfirmButton: false,
                    timer: 1500
                });


            } catch (error) {
                console.error('Error fetching requestproduct:', error);
            }
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