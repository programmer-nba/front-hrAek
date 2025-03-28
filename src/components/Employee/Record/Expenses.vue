<template>

    <div class=" bg-[#EAFDFC] px-6 py-12 sm:py-24 lg:px-8 min-h-screen">


        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-[#0002A1] sm:text-4xl">ขอเบิกค่าใช้จ่าย</h2>
        </div>
        <div class="mx-auto mt-16 max-w-xl sm:mt-20">
            <div class="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">

                <div >
                    <label class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันที่</label>
                    <a-date-picker class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"/>
                </div>

                <div>
                    <label for="editProjectStatus"class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภท</label>
                    <select  id="editProjectStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"placeholder="กรอกชื่อ">
                        <option disabled selected></option>
                        <option value="">ค่าที่พัก</option>
                        <option value="">ค่าน้ำมัน</option>
                        <option value="">ค่าเบี้ยเลี้ยง</option>
                        <option value="">อื่นๆ</option>
                    </select>
                </div>  

                <div>
                    <label for="editProjectCustomer"class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อ ผู้รับเงิน</label>
                    <input type="text" id="editProjectCustomer"class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"placeholder="กรอกชื่อ" required />
                </div>

                <div>
                    <label for="editProjectCustomer"class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">นามสกุล ผู้รับเงิน</label>
                    <input type="text" id="editProjectCustomer"class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"placeholder="กรอกนามสกุล" required />
                    
                </div>

                <div>
                    <label class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">จำนวนเงิน</label>
                    <input type="text" id="editProjectCustomer"  class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"  placeholder="กรอกจำนวนเงิน" required  />
                    
                </div>

                <div class="sm:col-span-2">
                    <label class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รายละเอียด  (***สามารถพิมพ์รายละเอียดและแนบรูปภาพได้***)</label>
                    <div class="mt-2.5">
                        <Editor v-model="Detail" editorStyle="height: 320px" />
                    </div>
                </div>

            </div>
            <div class="mt-6 flex justify-between gap-4">
                <button @click="GoBack" type="button" class="w-1/2 text-red-500 inline-flex items-center justify-center bg-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-lg px-5 py-2.5 hover:text-white focus:z-10" >
                <i class="pi pi-times h-4 w-4 mr-2 -ml-0.5"> </i>
                ยกเลิก
                </button>

                <button @click="submitRecord"
                    class="w-1/2 rounded-md bg-[#153E90] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0E49B5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                บันทึก
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

export default {



    data() {
        return {
            date: '',
            Detail: '',
            date_in: '',
            date_out: '',
        };
    },

    methods: {

        async submitRecord() {
            try {
                const postData = {
                    Type: "OT",
                    Detail: this.Detail,
                    OT: {
                        Timein: dayjs(this.date_in).format(),
                        Timeout: dayjs(this.date_out).format(),
                    },
                    Date: dayjs(this.date).format('DD/MM/YYYY'),
                };

                const response = await axios.post(`${import.meta.env.VITE_VUE_APP_DECCAN}/document/insert`, postData,
                    {
                        headers: {
                            "auth-token": localStorage.getItem("token"),
                        }
                    },
                );

                console.log(response.data.data);
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    text: 'บันทึกข้อมูลเรียบร้อย',
                }).then(() => {
                    this.$router.push('/Record');
                });
            } catch (error) {
                console.error('Error submitting record:', error);
            }
        },
        GoBack() {
      window.history.back();
    },
  


    }
}
</script>

<style>
:where(.css-dev-only-do-not-override-19yxfbp).ant-btn-primary {
    background-color: #1677ff;
}
</style>
