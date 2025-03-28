<template>
    <!-- component -->
    <section class="container px-4 mx-auto mt-4">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3 mx-3">
                    <h2 class="text-lg font-medium text-gray-800 ">อนุมัติ one stop service </h2>

                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">{{ shop.length }}</span>
                </div>

            </div>


        </div>
        <div class="xl:flex xl:items-center xl:justify-between">

<div class="inline-flex flex-wrap overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row">

    </div>


<div class="relative flex items-center mx-3">
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
                            
                            <th class="px-4 py-3">ชื่อร้านค้า</th>
                            <th class="px-4 py-3">ประเภท</th>
                            <th class="px-4 py-3">ชื่อ partner</th>
                            <th class="px-4 py-3">ที่อยู่</th>
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
                                <h4 class="text-gray-700">{{ data.shop_type}}</h4>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <h4 class="text-gray-700">{{ getpartner(data?.shop_partner_id)  }}</h4>
                            </div>
                        </td>
                        <td class="px-2 py-3 text-sm border border-[#0C359E] text-center">
                            <div>
                                <h4 class="text-gray-700"> {{ data.shop_address }} {{data.shop_subdistrict}} {{data.shop_district}} {{data.shop_province}} {{data.shop_postcode}}</h4>
                            </div>
                        </td>
                       
                        
                      
                        <td class="px-4 py-3 text-sm border border-[#0C359E]">
                           
                            <div class="space-x-2  py-4 text-center">   
                               <button @click="opensidebar(data)" class="inline-block rounded-md bg-orange-500 px-4 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-orange-600">แก้ไข</button>
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

          <Sidebar v-model:visible="sidebar" class="p-sidebar-lg" position="right" style="width: 850px;">
            <div class=" bg-gradient-to-r from-pink-300 to-indigo-300">
                <div class="grid grid-cols-12 gap-0">
                <div class="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xxl:col-span-12 px-6 pt-6">
                    <div class="grid grid-cols-1 mobileL:grid-cols-2 gap-6">
                
                        <div>
                            <!-- Start Card List -->
                            <div class=" bg-pink-600 hover:bg-pink-700 p-3 text-white rounded-xl shadow-xl flex items-center ">
                                รายละเอียดร้านค้า one stop service
                            </div>
                            <!-- End Card List -->
                        </div>
                    </div>

                </div>
                <div class="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 px-6 ">

                    <div class="grid grid-cols-1 gap-8 mt-8 mb-12">
                        <div class="p-8 space-y-3 border-2 bg-white  border-blue-400  rounded-xl hover:shadow-2xl transition duration-500 ">
                           <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                <div class="col-span-full"> 
                                    <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อร้านค้า</label>
                                    <input v-model="form.shop_name_second" type="text"  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">ละติจูด</label>
                                    <input v-model="form.shop_latitude" type="text"  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
                                </div> 
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">ลองจิจูด</label>
                                    <input v-model="form.shop_longtitude"  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
                                </div> 
                                <div class="col-span-full">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                                    <input v-model="form.shop_address"  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
                                </div>  
                                <div>   
                                    <label class="block text-sm font-medium text-gray-700 mb-2">จังหวัด</label>
                                    <Dropdown
                                        v-model="form.shop_province"
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
                                        v-model="form.shop_district"
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
                                        v-model="form.shop_subdistrict"
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
                                     v-model="form.shop_postcode" placeholder="กรอกรหัสไปรษณีย์"  />
                                </div>
                                <div class="col-span-full">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">คุณได้จดทะเบียนภาษีหรือไม่?</label>
                                    <Dropdown
                                        v-model="form.shop_status_tax"
                                        :options="optiontax"
                                        optionLabel="name"
                                        optionValue="value"
                                        placeholder="กรุณาเลือก"
                                        class="w-full border focus:outline-none "     
                                        @change="choosestatus()"          
                                        
                                    />
                                </div>
                                <div  v-if ="form.shop_status_tax == 'มี'" class="col-span-full">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อจดทะเบียนภาษี</label>
                                    <input v-model="form.shop_tax_name"  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
                                </div>
                                <div  v-if ="form.shop_status_tax == 'มี'">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">เลขประจำตัวจดทะเบียนภาษี</label>
                                    <input v-model="form.shop_tax_number"  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
                                </div>
                                <div  v-if ="form.shop_status_tax == 'มี'">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์จดทะเบียนภาษี</label>
                                    <input v-model="form.shop_tax_phone"   type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" />
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
            form:{
                _id:"",
                shop_partner_id:"",
                shop_name_second:"",
                shop_type:"One Stop Service",
                shop_name_main:"ทศกัณฐ์ One Stop Service",
                shop_latitude:0,
                shop_longtitude:0,
                shop_size:"",
                shop_address:"",
                shop_subdistrict:"",
                shop_district:"",
                shop_province:"",
                shop_postcode:"",
    
                shop_tax_number:"",
                shop_tax_name:"",
                shop_tax_phone:"",
                shop_status_tax:"",
            },
            optiontax: [
                { name: "จดทะเบียนภาษี", value: "มี" },
                { name: "ไม่ได้จดทะเบียนภาษี", value: "ไม่มี" },
            ],
            optionprovince: [],
            optionamphure:[],
            optiontambon:[],
            partners:[],
        };
    },
    created() {
        this.fetchshop();
        this.fetchPartners();
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
            axios.post(`${import.meta.env.VITE_VUE_APP_DECCAN}/data-contract/create`, data)
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
              
                if(response.data.data.length > 0)
                {
                    this.shop = response.data.data.filter(item => item.shop_status === true);
                    this.shop = this.shop.reverse();
                }
                
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
                const province = this.optionprovince.find((item) => item.name_th == this.form.shop_province);
                this.optionamphure = response.data.filter((item) => item.province_id == province.id);
            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },

        async chooseamphure() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_TAMBON}`);
                const amphure = this.optionamphure.find((item) => item.name_th == this.form.shop_district);
                this.optiontambon = response.data.filter((item) => item.amphure_id == amphure.id); 

            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        },    
        
        async choosetambon (){
            const zipcode = this.optiontambon.find(item => item.name_th == this.form.shop_subdistrict);
          
            this.form.shop_postcode = zipcode?.zip_code;
        },
        async choosestatus(){
            if(this.form.shop_status_tax == "ไม่มี")
            {
                this.form={
                    shop_tax_number:"",
                    shop_tax_name:"",
                    shop_tax_phone:"",
                };
            }
        },
        async opensidebar(shop) {
            this.sidebar = true;
            this.form = shop;
            await this.getProvince();
            await this.chooseprovice();
            await this.chooseamphure();
            await this.choosetambon();

        },
        async updateshop(){
            try {
                const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/onestopservice/${this.form._id}`, this.form,
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
        async fetchPartners() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/officegetall`,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                this.partners = response.data.data.reverse();
            } catch (error) {
                console.error('Error fetching partners:', error);
            }
        },
        getpartner(partner_id){
            const partner = this.partners.find(item => item._id == partner_id);
            if(!partner)
            {
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