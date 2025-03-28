<template>

    <div class="bg-[#E1F7F5] min-h-screen">
        <div class="px-4 pt-5 max-w-md mx-auto">

            <div @click="goToRecordPage"
                class=" my-4 bg-gradient-to-r from-[#002E94] to-[#1746A2]   p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">

                <div class="flex items-center py-3">
                    <span class="w-8 h-8 shrink-0 mr-4 rounded-full flex items-center justify-center text-[#E1F7F5]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 21 21">
                            <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M17.5 14.5v-10a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z" />
                                <path
                                    d="m5.305 4.935l-2.004.73a2 2 0 0 0-1.195 2.563l3.42 9.397A2 2 0 0 0 8.09 18.82l5.568-2.198M8.5 7.5h5m-5 2h6m-6 2h3" />
                            </g>
                        </svg>
                    </span>
                    <div class="space-y-3 flex-1">
                        <div class="flex items-center text-[#E1F7F5]">
                            <h4 class="font-medium text-base mr-auto  flex items-center">
                                บันทึกข้อความ

                            </h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    d="m13.5 10.5l-4-4l2-2a1 1 0 0 0-.5-1.68L1.74.53A1 1 0 0 0 .53 1.74L2.82 11a1 1 0 0 0 1.68.46l2-2l4 4Z" />
                            </svg>
                        </div>

                    </div>
                </div>

            </div>

            <div
                class=" my-4 bg-gradient-to-r from-[#002E94] to-[#1746A2]   p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
                <div class="flex items-center py-3">
                    <span class="w-8 h-8 shrink-0 mr-4 rounded-full flex items-center justify-center text-[#E1F7F5]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 21 21">
                            <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M17.5 14.5v-10a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z" />
                                <path
                                    d="m5.305 4.935l-2.004.73a2 2 0 0 0-1.195 2.563l3.42 9.397A2 2 0 0 0 8.09 18.82l5.568-2.198M8.5 7.5h5m-5 2h6m-6 2h3" />
                            </g>
                        </svg>
                    </span>
                    <div class="space-y-3 flex-1">
                        <div class="flex items-center text-[#E1F7F5]">
                            <h4 class="font-medium text-base mr-auto  flex items-center">
                                ขอลางาน
                            </h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    d="m13.5 10.5l-4-4l2-2a1 1 0 0 0-.5-1.68L1.74.53A1 1 0 0 0 .53 1.74L2.82 11a1 1 0 0 0 1.68.46l2-2l4 4Z" />
                            </svg>
                        </div>

                    </div>
                </div>
            </div>


            <div @click="goToOTPage"
                class=" my-4 bg-gradient-to-r from-[#002E94] to-[#1746A2]   p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
                <div class="flex items-center py-3">
                    <span class="w-8 h-8 shrink-0 mr-4 rounded-full flex items-center justify-center text-[#E1F7F5]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 21 21">
                            <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M17.5 14.5v-10a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z" />
                                <path
                                    d="m5.305 4.935l-2.004.73a2 2 0 0 0-1.195 2.563l3.42 9.397A2 2 0 0 0 8.09 18.82l5.568-2.198M8.5 7.5h5m-5 2h6m-6 2h3" />
                            </g>
                        </svg>
                    </span>
                    <div class="space-y-3 flex-1">
                        <div class="flex items-center text-[#E1F7F5]">
                            <h4 class="font-medium text-base mr-auto  flex items-center">
                                ขอโอที
                            </h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    d="m13.5 10.5l-4-4l2-2a1 1 0 0 0-.5-1.68L1.74.53A1 1 0 0 0 .53 1.74L2.82 11a1 1 0 0 0 1.68.46l2-2l4 4Z" />
                            </svg>
                        </div>

                    </div>
                </div>
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

        };
    },

    methods: {
        goToOTPage() {
            this.$router.push({ name: 'OT' });
        },
        goToRecordPage() {
            this.$router.push({ name: 'Record' });
        },
    },
};
</script>