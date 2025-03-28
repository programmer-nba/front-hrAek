<template>
    <div class="bg-[#ecf2f7] flex items-center justify-center min-h-screen  text-slate-600">
        <section class="max-w-[968px] w-full mx-4">
            <p class="flex justify-center w-full mt-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="max-w-[100px] " viewBox="0 0 36 36">
                    <path fill="#FFDC5D"
                        d="M18.154 26.76c.271.091.487-.159.586-.302c.279-.405.422-1.309.004-2.227c-.423-.927-.702-2.072-1.69-3.821c-.115-.204-.494-2.746-1.242-4.354c-.202-.435-1.495-.684-2.009-.529c-.513.154.005.98.037 1.134c.344 1.651 1.305 4.077 1.45 4.404c.8 1.806 1.965 2.389 2.071 3.706c.055.69.205 1.286.6 1.228c.092.352.093.728.193.761zm-14.823.204c-.257.126-.504-.094-.62-.222c-.33-.365-.591-1.242-.296-2.208c.297-.975.424-2.146 1.174-4.01c.087-.217.129-2.787.66-4.479c.143-.457 1.392-.875 1.922-.789c.529.086.124.972.112 1.129c-.124 1.682-.758 4.213-.859 4.556c-.556 1.895-1.634 2.627-1.566 3.946c.036.692-.034 1.302-.433 1.296c-.048.363 0 .735-.094.781z" />
                    <path fill="#5C913B"
                        d="M6.488 29.5c-.5-2.734-.263-6.48-.263-6.48h7.644s.238 3.746-.262 6.48c-.063.344-.188 3.344.109 5.5c.066.479-2.886.937-2.844-.125c.078-1.969-.264-3.513-.328-4.5c-.035-.547-.25-1.875-.344-3.208c-.011-.018-.295-.018-.306 0c-.094 1.333-.308 2.661-.344 3.208c-.064.987-.406 2.531-.328 4.5c.042 1.062-2.91.604-2.844.125c.297-2.156.172-5.156.11-5.5z" />
                    <path fill="#292F33"
                        d="M5.503 36c-.499-.406.041-1.161 1.42-1.402c1.163-.203 2.2-.032 2.363.35c.212.493.05 1.052.05 1.052H5.503zm9.117 0c.499-.406-.041-1.161-1.42-1.402c-1.163-.203-2.2-.032-2.363.35c-.212.493-.05 1.052-.05 1.052h3.833z" />
                    <path fill="#99AAB5"
                        d="M5.246 14.766C6.465 14 8.043 14 8.043 14h4s1.578 0 2.797.766c1.201.754 1.656 3 1.656 3l-2.373.688l-.105 5.527h-7.95l-.105-5.527l-2.373-.688s.455-2.246 1.656-3z" />
                    <path fill="#FFAC33"
                        d="M12.217.49C11.114.133 8.519.23 7.87 1.074c-1.687.032-3.666 1.557-3.926 3.569c-.257 1.991.316 2.915.519 4.412c.231 1.696 1.184 2.239 1.947 2.466c1.097 1.449 2.263 1.387 4.22 1.387c3.823 0 5.644-2.558 5.805-6.902c.097-2.629-1.445-4.619-4.218-5.516z" />
                    <path fill="#FFDC5D"
                        d="M8.446 11.599v2.458c0 .905.688 2.72 1.638 2.72s1.638-1.815 1.638-2.72v-2.458H8.446z" />
                    <path fill="#F9CA55"
                        d="M8.446 13.716c.498.563.965.704 1.637.704c.671 0 1.142-.142 1.64-.704v-.666H8.446v.666z" />
                    <path fill="#FFDC5D"
                        d="M14.403 6.191c-.37-.512-.843-.925-1.882-1.071c.389.178.762.795.811 1.135c.049.341.097.616-.211.276c-1.235-1.365-2.579-.827-3.912-1.661c-.93-.582-1.213-1.226-1.213-1.226s-.114.86-1.525 1.736c-.409.254-.897.819-1.168 1.655c-.195.6-.134 1.136-.134 2.05c0 2.67 2.201 4.915 4.915 4.915s4.915-2.265 4.915-4.915c0-1.661-.174-2.31-.596-2.894z" />
                    <path fill="#C1694F" d="M12 12H8s0 1 2 1s2-1 2-1z" />
                    <circle cx="7.5" cy="8.5" r=".5" fill="#662113" />
                    <circle cx="12.5" cy="8.5" r=".5" fill="#662113" />
                    <path fill="#C1694F" d="M9 10h2s0 1-1 1s-1-1-1-1z" />
                    <path fill="#FFDC5D"
                        d="M18.074 26.76c-.271.091-.487-.159-.586-.302c-.279-.405-.422-1.309-.004-2.227c.423-.927.702-2.072 1.69-3.821c.115-.204.494-2.746 1.242-4.354c.202-.435 1.495-.684 2.009-.529c.513.154-.005.98-.037 1.134c-.344 1.651-1.305 4.077-1.45 4.404c-.8 1.806-1.965 2.389-2.071 3.706c-.055.69-.205 1.286-.6 1.228c-.093.352-.094.728-.193.761zm14.595.204c.257.126.504-.094.62-.222c.33-.365.591-1.242.296-2.208c-.297-.975-.424-2.146-1.174-4.01c-.087-.217-.129-2.787-.66-4.479c-.143-.457-1.392-.875-1.922-.789c-.529.086-.124.972-.112 1.129c.124 1.682.758 4.213.859 4.556c.556 1.895 1.634 2.627 1.566 3.946c-.036.692.034 1.302.433 1.296c.048.363 0 .735.094.781z" />
                    <path fill="#4289C1"
                        d="M29.512 29.5c.5-2.734.263-6.48.263-6.48h-7.644s-.238 3.746.262 6.48c.063.344.188 3.344-.109 5.5c-.066.479 2.886.937 2.844-.125c-.078-1.969.264-3.513.328-4.5c.035-.547.25-1.875.344-3.208c.011-.018.295-.018.306 0c.094 1.333.308 2.661.344 3.208c.064.987.406 2.531.328 4.5c-.042 1.062 2.91.604 2.844.125c-.297-2.156-.172-5.156-.11-5.5z" />
                    <path fill="#292F33"
                        d="M30.497 36c.499-.406-.041-1.161-1.42-1.402c-1.163-.203-2.2-.032-2.363.35c-.212.493-.05 1.052-.05 1.052h3.833zm-9.117 0c-.499-.406.041-1.161 1.42-1.402c1.163-.203 2.2-.032 2.363.35c.212.494.05 1.053.05 1.053L21.38 36z" />
                    <path fill="#FA743E"
                        d="M30.754 14.766C29.535 14 27.957 14 27.957 14h-4s-1.578 0-2.797.766c-1.201.754-1.656 3-1.656 3l2.373.688l.105 5.527h7.95l.105-5.527l2.373-.688s-.455-2.246-1.656-3z" />
                    <path fill="#FFAC33"
                        d="M28.015.49c-1.103-.357-3.699-.26-4.347.584c-1.687.032-3.666 1.557-3.926 3.569c-.257 1.991.316 2.915.519 4.412c.231 1.696 1.184 2.239 1.947 2.466c1.097 1.449 2.263 1.387 4.22 1.387c3.823 0 5.644-2.558 5.805-6.902c.097-2.629-1.445-4.619-4.218-5.516z" />
                    <path fill="#FFDC5D"
                        d="M24.239 11.599v2.458c0 .905.688 2.72 1.638 2.72s1.638-1.815 1.638-2.72v-2.458h-3.276z" />
                    <path fill="#F9CA55"
                        d="M24.24 13.716c.498.563.965.704 1.637.704c.671 0 1.142-.142 1.64-.704v-.666H24.24v.666z" />
                    <path fill="#FFDC5D"
                        d="M30.201 6.191c-.37-.512-.844-.925-1.882-1.071c.389.178.762.795.811 1.135c.049.341.097.616-.211.276c-1.235-1.365-2.579-.827-3.912-1.661c-.931-.582-1.214-1.226-1.214-1.226s-.114.86-1.525 1.736c-.409.254-.897.819-1.168 1.655c-.195.6-.134 1.136-.134 2.05c0 2.67 2.201 4.915 4.915 4.915s4.915-2.265 4.915-4.915c.001-1.661-.173-2.31-.595-2.894z" />
                    <path fill="#C1694F" d="M28 12h-4s0 1 2 1s2-1 2-1z" />
                    <circle cx="23.5" cy="8.5" r=".5" fill="#662113" />
                    <circle cx="28.5" cy="8.5" r=".5" fill="#662113" />
                    <path fill="#C1694F" d="M25 10h2s0 1-1 1s-1-1-1-1z" />
                </svg>

            </p>
            <h1 class="mx-2 my-6 text-2xl font-semibold text-center sm:text-3xl">เพิ่มพนักงาน</h1>

            <div
                class="w-full bg-white p-8 rounded-lg gap-3 flex items-center justify-center shadow-[0px_10px_15px_9px_#DDE4F1] flex-col sm:flex-row mb-10">
                <div class="mt-6">
                    <div class=" flex sm:flex-row flex-col gap-3">
                        <span class="sm:w-1/3 w-full">
                            <label class="block text-xs font-semibold text-gray-600 uppercase">คำนำหน้า</label>
                            <Dropdown v-model="name_title" :options="titleOptions" optionLabel="label"
                                optionValue="value" placeholder="เลือกคำนำหน้า" class="no-rounded w-full mt-2 text-gray-700 bg-gray-200 appearance-none 
                focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
                        </span>
                        <span class="sm:w-1/3 w-full">
                            <label class="block text-xs font-semibold text-gray-600 uppercase">ชื่อจริง</label>
                            <input v-model="first_name" type="text"
                                class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
                        </span>
                        <span class="sm:w-1/3 w-full">
                            <label class="block text-xs font-semibold text-gray-600 uppercase">นามสกุล</label>
                            <input v-model="last_name" type="text"
                                class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
                        </span>


                    </div>

                    <div class="flex sm:flex-row flex-col gap-3 mt-4">

                        <span class="sm:w-1/3 w-full flex-grow">
                            <label class="block text-xs font-semibold text-gray-600 uppercase">เลขบัตรประชาชน</label>
                            <input v-model="iden_number" type="text" class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none
                focus:bg-gray-300 focus:shadow-inner" />
                        </span>

                        <span class="sm:w-1/3 w-full flex-grow">
                            <label class="block text-xs font-semibold text-gray-600 uppercase">ตำแหน่ง</label>
                            <Dropdown v-model="selectedPosition" :options="positionOptions" filter
                                placeholder="เลือกตำแหน่ง" class="no-rounded w-full mt-2 text-gray-700 bg-gray-200 appearance-none 
                focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
                        </span>

                        <!-- ใช้เงื่อนไข v-if เพื่อตรวจสอบว่าควรแสดงช่อง "ตำแหน่งรอง" หรือไม่ -->
                        <span class="sm:w-1/3 w-full flex-grow"
                            v-if="selectedPosition === 'employee' || selectedPosition === 'head_department'">
                            <label class="block text-xs font-semibold text-gray-600 uppercase">ตำแหน่งรอง</label>
                            <Dropdown v-model="selectedSubPosition" :options="subPositionOptions" filter
                                placeholder="เลือกตำแหน่ง" class="no-rounded w-full mt-2 text-gray-700 bg-gray-200 appearance-none 
                focus:outline-none focus:bg-gray-300 focus:shadow-inner" />
                        </span>
                    </div>

                </div>
            </div>


            <button @click="saveData"
                class="mb-20 px-20 py-4 text-white bg-[#2B3499] mx-auto block mt-5 rounded-xl text-lg transition-all duration-150 ease-in hover:bg-[#001B79]">
                บันทึก
            </button>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

import Button from 'primevue/button';

export default {
    components: {
        Button
    },
    data() {
        return {
            isDisabled: false,

            name_title: null,
            titleOptions: [
                { label: 'นาย', value: 'นาย' },
                { label: 'นาง', value: 'นาง' },
                { label: 'นางสาว', value: 'นางสาว' },
            ],
            first_name: '',
            last_name: "",
            iden_number: '',

            selectedPosition: '',
            selectedSubPosition: '',
            positionOptions: ['owner', 'manager', 'employee', 'head_department'],
            subPositionOptions: ['programmer', 'graphic', 'accounting']

        };

    },
    async mounted() {

    },
    methods: {

        async saveData() {
            try {
                let data = {
                    name_title: this.name_title,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    iden_number: this.iden_number,
                    role: this.selectedPosition,
                };

                // เช็คเงื่อนไขหากเลือกตำแหน่งเป็น owner หรือ manager
                if (this.selectedPosition === 'owner' || this.selectedPosition === 'manager') {
                    // กำหนดตำแหน่งรองให้เป็นค่าของตำแหน่งที่เลือก
                    data.position = this.selectedPosition;
                }
                // เช็คเงื่อนไขหากเลือกตำแหน่งเป็น employees หรือ head_department
                else if (this.selectedPosition === 'employee' || this.selectedPosition === 'head_department') {
                    // กำหนดตำแหน่งรองให้เป็นค่าของตำแหน่งรองที่เลือกใน dropdown
                    data.position = this.selectedSubPosition;
                }
                if (this.isEmpty(data)) {
                    // ถ้าข้อมูลไม่ครบถ้วน
                    Swal.fire({
                        icon: 'error',
                        title: 'ข้อมูลไม่ครบถ้วน',
                        text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
                    });
                    return;
                }
                
                const response = await axios.post(
                    `${import.meta.env.VITE_VUE_APP_DECCAN}/post`,
                    data,
                    {
                        headers: {
                            "auth-token": localStorage.getItem('token'),
                        },
                    }
                );
                Swal.fire({
                    icon: 'success',
                    text: 'เพิ่มสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // console.log('datadatadatadata',data);
                console.log('Data saved successfully:', response.data);
                this.$router.push('/employee/all');

            } catch (error) {
                console.error('Error saving data:', error);
            }
        },

        isEmpty(object) {
            return Object.keys(object).some(key => {
                const value = object[key];
                return value === null || value === '' || value === undefined;
            });
        },


    },


};
</script>

<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.no-rounded {
    border-radius: 0 !important;
}
</style>