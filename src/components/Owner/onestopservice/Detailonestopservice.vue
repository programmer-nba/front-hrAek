<template>

    <button @click="getdata" class="c-button c-button--gooey px-4 py-2 text-sm"> รายละเอียด
        <div class="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </button>


    <Sidebar v-model:visible="sidebar" class="p-sidebar-lg" position="right" style="width: 850px;">

        <div class=" bg-gradient-to-r from-pink-300 to-indigo-300">
            <div class="grid grid-cols-12 gap-0">
                <div class="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xxl:col-span-12 px-6 pt-6">
                    <div class="grid grid-cols-12 gap-6">
                
                        <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xxl:col-span-6">
                            <!-- Start Card List -->
                            <div
                                class=" bg-pink-600 hover:bg-pink-700 p-3 text-white rounded-xl shadow-xl flex items-center ">
                                รายละเอียด one stop service
                            </div>
                            <!-- End Card List -->
                        </div>



                    </div>

                </div>
                <div class="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12  px-6 ">

                    <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-2">
                        <div class="p-8 space-y-3 border-2 bg-white  border-blue-400  rounded-xl hover:shadow-2xl transition duration-500 ">
                            <div class="bg-white  p-4 ">
                                <div class="flex flex-col justify-center items-center">
                                    
                                    <div class="w-32 h-32 rounded-full bg-gray-300 border-2 border-white mt-2">
                                       
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxhAxJ4D7MOeTTj6kR9PBeZonW5HM7giKjTbEmR-HMBwf3G1VqGnlwpO1kWrdyIZu8_U&usqp=CAU"
                                            class="rounded-full w-auto" />
                                    </div>
                                    
                                    <div class="font-semibold text-black text-xl ">ชื่อร้านค้า: {{ data.shop_name_second }} </div>
                                
                                </div>
                            </div>
                        </div>

                        

                        <div class="px-8 space-y-3 border-2 bg-white  border-blue-400 rounded-xl">
                           

                            <div class="mt-8">
                                <p class="text-xl font-semibold my-4">รายละเอียดร้าน</p>
                                <div class="flex space-x-2 text-black text-sm">
                                    <!-- svg  -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="#453F78" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                                        <circle cx="12" cy="10" r="3" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                    <p> ชื่อร้านค้า "{{ data.shop_name_second }}</p>
                                </div>
                                <div class="flex space-x-2 text-black text-sm ">
                                    <!-- svg  -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="#453F78" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="M7 15h0M2 9.5h20" />
                                    </svg>
                                    <p> ประเภทร้านค้า : {{ data.shop_type }}</p>
                                </div>
                               
                            </div>
                        </div>
                        
                    </div>

                    <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-2 pb-5">

                        <div class="px-8 pt-2 space-y-3 border-2 bg-white  border-blue-400  rounded-xl hover:shadow-2xl transition duration-500">

                            <div class="bg-white rounded-2xl  py-2  ">
                            
                                <div class="mt-4">
                                    <h1 class="text-lg text-black font-semibold hover:underline cursor-pointer">
                                        ข้อมูลติดต่อ</h1>
                                    <p class="mt-4 text-md text-black">
                                        
                                            {{ data.shop_address || '-' }} ตำบล {{ data.shop_subdistrict || '-' }} อำเภอ
                                            {{ data.shop_district || '-' }} จังหวัด {{ data.shop_province || '-' }} {{data.shop_postcode || '-' }}
                                       
                                    </p>


                                   
                                </div>
                            </div>

                        </div>

                        <div class="px-8 pt-2.5 space-y-3 border-2 bg-white  border-blue-400  rounded-xl hover:shadow-2xl transition duration-500">
                            <div class="bg-white rounded-2xl    ">
                            
                                <div class="mt-4">
                                    <h1 class="text-lg text-black font-semibold hover:underline cursor-pointer">
                                        ข้อมูลจดทะเบียน</h1>
                                    <p class="mt-4 text-md text-black">
                                        <span class="font-semibold text-base">เลขทะเบียนบริษัท :</span> {{ data.shop_tax_number || '-' }} <br>
                                        <span class="font-semibold text-base">ชื่อคนจดทะเบียนบริษัท :</span> {{ data.shop_tax_name || '-' }} <br>
                                       
                                           
                                    </p>


                            
                                </div>
                            </div>
                        </div>





                    </div>

              


                </div>
            </div>
        </div>





    </Sidebar>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import Sidebar from "primevue/sidebar";

export default {
    components: {
        Sidebar
    },
    async mounted() {

    },
    props: {
        data_id: String,
        data: Object,
    },
    data: () => ({
        isloading: false,
        sidebar: false,
        loading: false,

        item_row: "",
    }),
    methods: {
        getImageUrl(imageId) {
            return `https://drive.google.com/thumbnail?id=${imageId}`;
        },
        clickfile(item){
             const fileID = item; // ปรับตามต้องการ
            const directLink = `https://drive.google.com/file/d/${fileID}/view`;
            const newTab = window.open(directLink, "_blank");
        },
        async getdata() {
            this.sidebar = true;
        },
        dateFormat(date) {
            if (date) {
                return dayjs(date).format("DD/MM/YYYY");
            }
        },
    }
}
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
    color: #06c8d9;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: 4px solid #06c8d9;
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
    background-color: #06c8d9;
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
