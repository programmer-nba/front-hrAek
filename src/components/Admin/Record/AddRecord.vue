<template>
    <div class=" bg-[#EAFDFC] px-6 py-24 sm:py-32 lg:px-8">


        <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold tracking-tight text-[#0002A1] sm:text-4xl">บันทึกข้อความ</h2>
        </div>
        <div class="mx-auto mt-16 max-w-xl sm:mt-20">
            <div class="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">ประเภท</label>
                    <div class="mt-2.5">
                        <Dropdown v-model="selectedType" :options="typeOptions" optionLabel="name" optionValue="value"
                            placeholder="ประเภท" class=" w-full rounded-md border-0 px-3.5 text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6" />

                    </div>
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">หัวข้อ</label>
                    <div class="mt-2.5">
                        <input type="text" v-model="Headers" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">ถึง</label>
                    <div class="mt-2.5">
                        <input type="text" v-model="To" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">รายละเอียด</label>
                    <div class="mt-2.5">
                        <Editor v-model="Detail" editorStyle="height: 320px" />
                    </div>
                </div>

                <!-- <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">รายละเอียด</label>
                    <div class="mt-2.5">
                        <textarea rows="4" v-model="Detail" class="block w-full rounded-md 
                        border-0 px-3.5 py-2 text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6"></textarea>
                    </div>

                    <div class="flex gap-x-2  mt-2">
                        <div class="w-full">
                            <label class="block text-sm font-semibold leading-6 text-[#2146C7]">จำนวน</label>
                            <input type="number" v-model="qty" class=" w-full rounded-md 
                        border-0 px-3.5 py-2 text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6 " />
                        </div>
                        <div class="w-full">
                            <label class="block text-sm font-semibold leading-6 text-[#2146C7]">ราคา</label>
                            <input type="number" v-model="price" class=" w-full rounded-md 
                        border-0 px-3.5 py-2 text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <button @click="addItem"
                        class="w-full mt-2 bg-[#FF9800] text-white px-4 py-2 rounded-lg hover:bg-[#FFAF45] focus:outline-none">Add</button>

                </div> -->


                <div class="sm:col-span-2" v-if="addedItems.length > 0">
                    <article class="border w-full mx-auto border-gray-400 rounded-lg md:p-4 bg-white  px-2 m-2">
                        <div>
                            <div v-for="(item, index) in addedItems" :key="index" class=" border-b">
                                <div class="m-2">

                                    <p>
                                    <div class="text text-gray-700 text-sm hover:text-black">
                                        รายละเอียด</div>
                                    </p>
                                </div>
                                <div class="px-6">
                                    <h2 class="text-base font-bold mb-2 hover:text-blue-600 leading-7">
                                        <div id="article-link-151230">
                                            {{ item.Detail }}
                                        </div>
                                    </h2>


                                    <div class="flex justify-between items-center mb-2 ">
                                        <div class="flex " v-if="item.qty && item.price">
                                            <div
                                                class="text-base py-1 pl-1 pr-2 text-gray-600  rounded hover:bg-gray-100 hover:text-black">

                                                จำนวน<span class="hidden md:inline">&nbsp; {{ item.qty }}</span>
                                            </div>
                                            <div
                                                class="text-base py-1 pl-1 pr-2 text-gray-600 rounded hover:bg-gray-100 hover:text-black">

                                                ราคา<span class="hidden md:inline">&nbsp; {{ item.price }}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center">
                                            <button type="button" @click="removeItem(index)"
                                                class="bg-gray-400 rounded text-sm px-3 py-2 text-current hover:text-black hover:bg-gray-500">
                                                <span>ลบ</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>


                </div>

                <div v-if="selectedType === 'OT'">
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">ตั้งแต่เวลา</label>
                    <div class="mt-2.5">
                        <a-time-picker
                            :popupStyle="{ backgroundColor: '#3490dc !important', color: '#2146C7 !important' }" class="block w-full rounded-md border-0 px-3.5 py-2 
                        text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6" v-model:value="date_in" format="HH:mm" />

                    </div>
                </div>
                <div v-if="selectedType === 'OT'" class="">
                    <label class="block text-sm font-semibold leading-6 text-[#2146C7]">ถึงเวลา</label>
                    <div class="mt-2.5">
                        <a-time-picker class="block w-full rounded-md border-0 px-3.5 py-2 
                        text-gray-900 
                        shadow-sm ring-1 ring-inset focus:outline-none shadow-[#1363DF]
                        ring-[#85F4FF] focus:ring-2 focus:ring-inset focus:ring-[#47B5FF]
                        sm:text-sm sm:leading-6" v-model:value="date_out" format="HH:mm" />
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
            selectedType: null,
            typeOptions: [
                { name: 'OT', value: 'OT' },
                { name: 'บันทึกข้อความ', value: 'Normal' }
            ],
            Headers: '',
            To: '',
            Detail: '',
            qty: null,
            price: null,
            number: '',
            date_in: '',
            date_out: '',
            addedItems: []
        };
    },

    methods: {
        // addItem() {
        //     if (!this.Detail) {
        //         // ถ้าข้อมูลไม่ครบให้แสดงข้อความแจ้งเตือน
        //         Swal.fire({
        //             icon: 'warning',
        //             text: 'กรุณากรอกรายละเอียด',
        //         });
        //         return;
        //     }
        //     const newItem = {
        //         Detail: this.Detail,
        //         qty: this.qty,
        //         price: this.price
        //     };
        //     this.addedItems.push(newItem);
        //     this.Detail = '';
        //     this.qty = null;
        //     this.price = null;
        // },
        // removeItem(index) {
        //     this.addedItems.splice(index, 1);
        // },

        async submitRecord() {
            try {
 
                // const details = this.addedItems.map(item => {
                //     return {
                //         detail: item.newDetail,
                //         price: item.price,
                //         qty: item.qty
                //     };
                // });
                const postData = {
                    Type: this.selectedType,
                    Headers: this.Headers,
                    To: this.To,
                    Detail: this.Detail,
                };
                if (this.selectedType === 'OT') {
                    postData.OT = {
                        Timein: dayjs(this.date_in).format(), 
                        Timeout: dayjs(this.date_out).format(), 
                    };
                }

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
