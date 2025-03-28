<template>

    <button @click="getproduct" class="c-button c-button--gooey px-4 py-2 text-sm"> รายละเอียด
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
                                        v-model="product.product_name" placeholder="กรอกชื่อสินค้า" />
                                </div>
                                <div class="col-span-full">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่สินค้า</label>
                                    <input type="text"
                                        class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                        v-model="product.product_category" placeholder="กรอกชื่อหมวดหมู่สินค้า" />
                                </div>

                                <div class="col-span-full">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">ประเภทสินค้า</label>
                                    <div class="flex gap-4">
                                        <div v-for="provider in productProviders" :key="provider.value"
                                            class="w-full flex items-center p-2 border rounded-md">
                                            <RadioButton :inputId="provider.value" v-model="product.product_provider"
                                                :value="provider.value" class="mr-2" />
                                            <label :for="provider.value">{{ provider.label }}</label>
                                        </div>
                                    </div>
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
                                            <label class="block text-sm font-medium text-gray-700">ราคาแนะนำขาย</label>
                                            <input type="number"
                                                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                                v-model="product.product_price" @input="calproduct_price"
                                                placeholder="กรอกราคาสินค้า" />
                                        </div>
                                        <div class="col-span-full lg:col-span-4">
                                            <label class="block text-sm font-medium text-gray-700">กำไรสุทธิ:</label>
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
                                        v-model="product.product_stock" placeholder="กรอกจำนวนสต็อก" />
                                </div>
                                <div class="col-span-full">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">รายละเอียดสินค้า</label>
                                    <Editor v-model="product.product_detail" editorStyle="height: 200px"
                                        placeholder="กรอกรายละเอียดสินค้า" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพสินค้า</label>
                                    <Image :src="getImageUrl(product.product_image)" width="350"
                                        v-if="product.product_image != '' && product?.product_imagepreview == undefined"
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
                                    <Image :src="getImageUrl(product.product_subimage1)" class="pb-3" width="350"
                                        v-if="product.product_subimage1 != '' && product?.product_imagepreview1 == undefined"
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
                                    <Image :src="getImageUrl(product.product_subimage2)" class="pb-3" width="350"
                                        v-if="product.product_subimage2 != '' && product?.product_imagepreview2 == undefined"
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
                                    <Image :src="getImageUrl(product.product_subimage3)" class="pb-3" width="350"
                                        v-if="product.product_subimage3 != '' && product?.product_imagepreview3 == undefined"
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
                                    <Image :src="getImageUrl(product.product_imagedoc)" class="pb-3" width="350"
                                        v-if="product.product_imagedoc != '' && product?.product_imagedocpreview3 == undefined"
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
                                <button @click="editdata"
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
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import Sidebar from "primevue/sidebar";
import RadioButton from 'primevue/radiobutton';

export default {
    components: {
        Sidebar,
        RadioButton
    },
    async mounted() {

    },
    props: {
        product_id: String,
        product: Object,
    },
    data: () => ({
        isloading: false,
        sidebar: false,
        loading: false,
        item_row: "",
        productProviders: [
            { value: 'normal', label: 'สินค้าทั่วไป' },
            { value: 'coop', label: 'สินค้าสหกรณ์' }
        ], // Move productProviders to data
    }),
    methods: {
        getImageUrl(imageId) {
            // return `https://drive.google.com/thumbnail?id=${imageId}`;
            return `${import.meta.env.VITE_VUE_APP_PARTNER}${imageId}`;
        },
        clickfile(item) {
            const fileID = item; // ปรับตามต้องการ
            const directLink = `https://drive.google.com/file/d/${fileID}/view`;
            const newTab = window.open(directLink, "_blank");
        },
        async getproduct() {
            this.sidebar = true;
        },
        dateFormat(date) {
            if (date) {
                return dayjs(date).format("DD/MM/YYYY");
            }
        },
        async editdata() {
            this.loading = true;
            await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/partners/requestproduct/editproduct/${this.product_id}`, this.product, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                }
            }).then((res) => {

                this.sidebar = false;
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch((error) => {
                console.log(error);
            });
            this.loading = false;
        }

        // chooseimageproduct(e){
        //     this.product.product_imagenew = e.files[0];
        //     this.product.product_imagepreview = URL.createObjectURL(e.files[0]);
        // },
        // chooseimagesubproduct1(e){
        //     this.product.product_subimagenew1 = e.files[0];
        //     this.product.product_imagepreview1 = URL.createObjectURL(e.files[0]);
        // },
        // chooseimagesubproduct2(e){
        //     this.product.product_subimagenew2 = e.files[0];
        //     this.product.product_imagepreview2 = URL.createObjectURL(e.files[0]);
        // },
        // chooseimagesubproduct3(e){
        //     this.product.product_subimagenew3 = e.files[0];
        //     this.product.product_imagepreview3 = URL.createObjectURL(e.files[0]);
        // },
        // async uploadimgproduct (id){
        //     const formData = new FormData();
        //     formData.append('image', this.product.product_imagenew);
        //     formData.append('id', id);
        //     await axios.post('https://api.localhost:3000/uploadimgproduct', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }).then((res) => {
        //         this.product.product_image = res.data;
        //     }).catch((error) => {
        //         console.log(error);
        //     });

        // }

    },
    computed: {
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
