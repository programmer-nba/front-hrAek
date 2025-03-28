<template>

<div class="flex items-center min-h-screen bg-[#86A7FC] ">
    <div class="container mx-auto">
        <div class="max-w-md mx-auto my-10 bg-[#3468C0]  p-5 rounded-md shadow-sm">
            <div class="text-center">
                <h1 class="my-3 text-3xl font-semibold text-white ">เพิ่มงาน </h1>
            </div>
            <div class="m-7">

        


                    <div class="mb-6">
                        <label class="block mb-2 text-sm text-white ">ประเภทงาน</label>
                        <input v-model="type" type="text"  placeholder="กรอกประเภทงาน"  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   " />
                    </div>
                    <div class="mb-6">
                        <label  class="block mb-2 text-sm text-white ">ชื่องาน</label>
                        <input v-model="project_name" type="text"  placeholder="กรอกชื่องาน" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   " />
                    </div>
                    <div class="mb-6">

                        <label  class="text-sm text-white ">ราคา</label>
                        <input v-model="price" type="text"  placeholder="กรอกราคา" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   " />
                    </div>
                    <div class="mb-6">
                        <label for="message" class="block mb-2 text-sm text-white ">รายละเอียด</label>

                        <textarea rows="5" v-model="detail" placeholder="กรอกรายละเอียด" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   " required></textarea>
                    </div>
                    <div class="mb-6">
                        <button  class="w-full px-3 py-4 text-white bg-[#B4D4FF] hover:bg-[#11009E] rounded-md focus:bg-[#0F2167] focus:outline-none">บันทึก</button>
                    </div>
                 
              
            </div>
        </div>
    </div>
</div>
        

</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            items: [],
        };
    },

    methods: {
   

       

    },
};
</script>