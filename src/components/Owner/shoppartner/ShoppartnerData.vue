<template>
    <!-- component -->
    <section class="container px-4 mx-auto mt-4">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 ">ข้อมูล shopepartner </h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">{{ shop.length }}</span>
                </div>

            </div>


        </div>
        <div class="mt-6 mx-3">

<div class="inline-flex flex-wrap overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row">
    <button @click="showAllItems" class="w-1/2 md:w-auto px-5 py-2 text-xs font-medium text-black transition-colors duration-200 bg-gray-100 sm:text-sm hover:bg-gray-100">ดูทั้งหมด</button>
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

    <input type="text" placeholder="Search" class="block w-full py-1.5 pr-5 text-black bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 
        focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
</div>

</div>
        <div class="overflow-x-auto p-3">
            <table class="w-full  border">
                <thead>
                    <tr
                        class="text-sm tracking-wide text-center text-[#DFF5FF] bg-[#0C359E] uppercase border-b border-[#50C4ED]">
                            <th class="px-4 py-3">สถานะ</th>
                            <th class="px-4 py-3">ชื่อร้านค้า</th>
                            <th class="px-4 py-3">ประเภทร้านค้า</th>
                           <th class="px-4 py-3">ชื่อ partner</th>
                            
                            
                            <th class="px-4 py-3">ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    <tr v-for="shop in paginatedItems" :key="shop.id" class="text-[#000000]">
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center whitespace-nowrap">
                            <div >
                                <InputSwitch v-model="shop.shop_status"  @click="changestatus(shop.shop_status,shop._id)"  />
                            </div>
                        </td>
                        <td class="px-4 py-3 border border-[#0C359E]">
                            <div class="flex items-center justify-center text-sm text-center">
                                <div>
                                    <p class="text-black text-center">{{ shop.shop_name }} </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border text-center border-[#0C359E]">
                            <div>
                                <h4 class="text-gray-700">{{ shop.shop_type}}</h4>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <h4 class="text-gray-700">{{ data?.shop_partner_id?.partner_name }}</h4>
                            </div>
                        </td>
                      
                        <td class="px-4 py-3 text-sm border border-[#0C359E]">
                           
                            <div class="space-x-2  py-4 text-center">
                                <button @click="opensidebar(shop)" class="inline-block rounded-md bg-orange-500 px-4 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-orange-600">แก้ไข</button>
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
                        <div class="p-8 space-y-3 border-2 bg-white  border-blue-400  rounded-xl hover:shadow-2xl transition duration-500 ">
                           <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <div class=""> 
            <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อร้านค้า (ภาษาไทย)</label>
            <input v-model="form.shop_name" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อร้านค้า (ภาษาอังกฤษ) (ถ้ามี)</label>
            <input v-model="form.shop_nameeng" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
        <div class="col-span-full">
            <label class="block text-sm font-medium text-gray-700 mb-2">ประเภทร้านค้า</label>
            <Dropdown
                v-model="form.shop_type"
                :options="optionshoptype"
                optionLabel="name"
                optionValue="value"
                placeholder="กรุณาเลือกประเภทร้านค้า"
                class="w-full border focus:outline-none "
            />
        </div>
        <div class="col-span-full">
            <label class="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
            <input v-model="form.address.address" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
       <div>   
            <label class="block text-sm font-medium text-gray-700 mb-2">จังหวัด</label>
             <Dropdown
                v-model="form.address.province"
                :options="optionprovince"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกจังหวัด"
                class="w-full border focus:outline-none "
                @change="chooseprovice()"
                filter 
            />
            
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">อำเภอ</label>
             <Dropdown
                v-model="form.address.amphure"
                :options="optionamphure"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกอำเภอ"
                class="w-full border focus:outline-none "
                @change="chooseamphure()"
                filter 
                
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">ตำบล</label>
            <Dropdown
                v-model="form.address.tambon"
                :options="optiontambon"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกตำบล"
                class="w-full border focus:outline-none "
                @change="choosetambon()"
                filter 
                
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">รหัสไปรษณีย์</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="form.address.zipcode" placeholder="กรอกรหัสไปรษณีย์" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรติดต่อร้านค้า</label>
            <input v-model="form.shop_telephone" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">ไอดีไลน์ร้านค้า</label>
            <input v-model="form.shop_idline" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">ละติจูด</label>
            <input v-model="form.latitude" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">ลองจิจูด</label>
            <input v-model="form.longitude" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
        <div class="col-span-full">
            <label class="block text-sm font-medium text-gray-700 mb-2">คุณได้จดทะเบียนภาษีหรือไม่?</label>
             <Dropdown
                v-model="form.taxstatus"
                :options="optiontax"
                optionLabel="name"
                optionValue="value"
                placeholder="กรุณาเลือก"
                class="w-full border focus:outline-none "     
                @change="choosestatus()"          
            />
        </div>

        <div  v-if ="form.taxstatus == true">
            <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อจดทะเบียนภาษี</label>
            <input v-model="form.nametax" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
        <div  v-if ="form.taxstatus == true">
            <label class="block text-sm font-medium text-gray-700 mb-2">เลขประจำตัวจดทะเบียนภาษี</label>
            <input v-model="form.taxid" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
        <div class="col-span-full" v-if="form.taxstatus == true">
            <label class="block text-sm font-medium text-gray-700 mb-2">ที่อยู่ผู้จดทะเบียนภาษี</label>
            <input v-model="form.addresstax.address" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>
        <div  v-if ="form.taxstatus == true">
            <label class="block text-sm font-medium text-gray-700 mb-2">จังหวัดผู้จดทะเบียนภาษี</label>
             <Dropdown
                v-model="form.addresstax.province"
                :options="optionprovince"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกจังหวัด"
                class="w-full border focus:outline-none "
                @change="chooseprovicetax()"
                filter 
            />
        </div>
        <div  v-if ="form.taxstatus == true">
            <label class="block text-sm font-medium text-gray-700 mb-2">อำเภอผู้จดทะเบียนภาษี</label>
            <Dropdown
                v-model="form.addresstax.amphure"
                :options="optionamphuretax"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกอำเภอ"
                class="w-full border focus:outline-none "
                @change="chooseamphuretax()"
                filter 
                
            />
        </div>
        <div  v-if ="form.taxstatus == true">
            <label class="block text-sm font-medium text-gray-700 mb-2">ตำบลผู้จดทะเบียนภาษี</label>
            <Dropdown
                v-model="form.addresstax.tambon"
                :options="optiontambontax"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกตำบล"
                class="w-full border focus:outline-none "
                @change="choosetambontax()"
                filter
            />
        </div>
        <div  v-if ="form.taxstatus == true">
            <label class="block text-sm font-medium text-gray-700 mb-2">รหัสไปรษณีย์ผู้จดทะเบียนภาษี</label>
            <input v-model="form.addresstax.zipcode" type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
        </div>

    </div>
                            <div class="flex justify-center gap-3 pt-4">
                                <button @click="updateshop" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    บันทึก
                                </button>
                                <button @click="sidebar = false" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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
            shop: [],
            modalVisible: false,
            selectedContractType: "",
            contractTypes: [],
            filteredItems: [],
            currentPage: 1,
            itemsPerPage: 8,
            sidebar:false,
            optionprovince:[],
            optionamphure:[],
            optiontambon:[],
            optionamphuretax:[],
            optiontambontax:[],
            optiontax:[
                { name: "จดทะเบียนภาษี", value: true },
                { name: "ไม่ได้จดทะเบียนภาษี", value: false },
            ],
            optionshoptype:[
                { name: "ร้านอาหาร", value: "ร้านอาหาร" },
                { name: "ร้านกาแฟ", value: "ร้านกาแฟ" },
                { name: "ร้านเสื้อผ้า", value: "ร้านเสื้อผ้า" },
                { name: "ร้านตัดผม", value: "ร้านตัดผม" },
                { name: "ร้านนวด", value: "ร้านนวด" },
            ],
            form: {
                _id: "",
                shop_name: "",
                shop_nameeng: "",
                shop_type: "",
                shop_telephone: "",
                shop_idline: "",
                latitude: "",
                longitude: "",
                address: {
                    address: "",
                    province: "",
                    amphure: "",
                    tambon: "",
                    zipcode: "",
                },
                taxstatus: false,
                nametax: "",
                taxid: "",
                addresstax: {
                    address: "",
                    province: "",
                    amphure: "",
                    tambon: "",
                    zipcode: "",
                },
            },
        };
    },
    created() {
        this.fetchshop();
        this.getProvince();
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
                shop_id: this.selectedId.shop_iden,
                code: this.selectedContractType,
                shop_main_name: this.selectedId.shop_name,
                shop_prefix: this.selectedId.antecedent,
                shop_tax_id: this.selectedId.shop_iden_number
            };
            axios.post(`${import.meta.env.VITE_VUE_APP_CONTRACT}/shop-contract/create`, data)
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

        showModal(visible, shop) {
            this.modalVisible = visible;
            this.selectedId = shop;
            console.log(shop);
        },
        handleOk() {
            this.modalVisible = false;
        },

        async fetchshop() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/shop/getshop/office`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
               
                this.shop = response.data.data.reverse();
                this.filteredItems = this.shop;

            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },

        async getProvince() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_PROVINCE}`);

                this.optionprovince = response.data;
            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },

        async chooseprovice () {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_AMPHURE}`);
                const province = this.optionprovince.find((item) => item.name_th == this.form.address.province);
                this.optionamphure = response.data.filter((item) => item.province_id == province.id);
            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },

        async chooseamphure() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_TAMBON}`);
                const amphure = this.optionamphure.find((item) => item.name_th == this.form.address.amphure);
                this.optiontambon = response.data.filter((item) => item.amphure_id == amphure.id); 

            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },    
        
        async choosetambon (){
            const zipcode = this.optiontambon.find(item => item.name_th == this.form.address.tambon);
          
            this.form.address.zipcode = zipcode?.zip_code;
        },

        async chooseprovicetax() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_AMPHURE}`);
                const province = this.optionprovince.find((item) => item.name_th == this.form.addresstax.province);
                this.optionamphuretax = response.data.filter((item) => item.province_id == province.id);

            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },

        async chooseamphuretax() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_TAMBON}`);
                const amphure = this.optionamphuretax.find((item) => item.name_th == this.form.addresstax.amphure);
                this.optiontambontax = response.data.filter((item) => item.amphure_id == amphure.id);
            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },

        async choosetambontax (){
            const zipcode = this.optiontambontax.find(item => item.name_th == this.form.addresstax.tambon);
            this.form.addresstax.zipcode = zipcode?.zip_code;
        },
        async choosestatus(){
            if(this.form.taxstatus == false)
            {
                this.form.nametax = "";
                this.form.taxid = "";
                this.form.addresstax = {
                    address: "",
                    province: "",
                    amphure: "",
                    tambon: "",
                    zipcode: "",
                };
            }
        },

        async opensidebar(shop) {
           
            this.sidebar = true;
            console.log(shop);
            this.form = shop;
            await this.chooseprovice("edit");
            await this.chooseamphure("edit");
            await this.choosetambon("edit");
            if(this.form.taxstatus == true)
            {
                await this.chooseprovicetax("edit");
                await this.chooseamphuretax("edit");
                await this.choosetambontax("edit");
            }
        },

        async updateshop(){
            try {
                const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/shop/getshop/office/${this.form._id}`, this.form,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
              
                this.fetchshop();
                this.sidebar = false;
                Swal.fire({
                    icon: 'success',
                    text: 'แก้ไขสำเร็จ.',
                    showConfirmButton: false,
                    timer: 1500
                });

            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },

        async changestatus(status,id){
            try {
               
                const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/shop/getshop/office/${id}`,{
                    shop_status: !status
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
                console.error('Error fetching shop:', error);
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