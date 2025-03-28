<template>

    <!-- <a-breadcrumb>
        <a-breadcrumb-item :to="{ path: '/' }">ยื่นเอกสาร</a-breadcrumb-item>
        <a-breadcrumb-item>ยื่นขอโอที</a-breadcrumb-item>
    </a-breadcrumb> -->

    <div class=" bg-[#EAFDFC] px-6 py-12 sm:py-24 lg:px-8 min-h-screen">


        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-[#0002A1] sm:text-4xl">ขอโอที</h2>
        </div>
        <div class="mx-auto mt-16 max-w-xl sm:mt-20">
            <div class="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">วันที่</label>
                    <div class="mt-2.5">
                        <a-date-picker class="block w-full rounded-md border-0 px-3.5 py-2 
                        text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6" v-model:value="date" />

                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">เริ่มเวลา</label>
                    <div class="mt-2.5">
                        <a-time-picker
                            :popupStyle="{ backgroundColor: '#3490dc !important', color: '#2146C7 !important' }" class="block w-full rounded-md border-0 px-3.5 py-2 
                        text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6" v-model:value="date_in" format="HH:mm" />

                    </div>
                </div>
                <div>
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">ถึงเวลา</label>
                    <div class="mt-2.5">
                        <a-time-picker class="block w-full rounded-md border-0 px-3.5 py-2 
                        text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6" v-model:value="date_out" format="HH:mm" />
                    </div>
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">รายละเอียด</label>
                    <div class="mt-2.5">
                        <Editor v-model="Detail" editorStyle="height: 320px" />
                    </div>
                </div>

            </div>
            <div class="mt-10">
                <button @click="submitRecord"
                    class="block w-full rounded-md bg-[#153E90] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0E49B5]
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">บันทึก</button>
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



    }
}
</script>

<style>
:where(.css-dev-only-do-not-override-19yxfbp).ant-btn-primary {
    background-color: #1677ff;
}
</style>
