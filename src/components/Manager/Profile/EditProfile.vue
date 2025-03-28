<template>
    <div class="bg-slate-100 min-h-screen px-5 py-8 sm:px-20 sm:py-16">
        <div class="w-full">
            <h1 class="text-2xl sm:text-4xl text-center sm:text-left font-bold">แก้ไขข้อมูลส่วนตัว</h1>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-5 mt-5 sm:mt-11">
            <div class="sm:col-span-1">
                <div
                    class="py-4 sm:py-8 px-4 sm:px-8 bg-white rounded-xl shadow-lg space-y-2 sm:space-y-0 sm:flex sm:items-center sm:space-x-6">
                    <!-- Profile image -->
                    <div class="text-center sm:text-left">
                        <div class="space-y-0.5">
                            <!-- Employee name -->
                            <div class="text-base sm:text-3xl text-black font-semibold">
                                {{ ME.name_title }} {{ ME.first_name }} {{ ME.last_name }}
                            </div>
                            <!-- Employee position -->
                            <p class="text-xs sm:text-base text-slate-500 font-medium">
                              ตำแหน่ง  {{ ME.position }}
                            </p>
                        </div>
                    </div>
                </div>



                <Dialog v-model:visible="editpassword" modal class="px-2 sm:px-2 py-1 sm:py-1 bg-white  rounded-xl shadow-lg ">
                    <div class="w-full bg-white ">
                        <h1 class="text-xl sm:text-2xl text-left font-bold mb-5">เปลี่ยนรหัสผ่าน</h1>
                        <div class="mb-3 sm:mb-6 ">
                            <!-- Old password input -->
                            <h1 class="text-lg sm:text-xl mb-3 sm:mb-5 text-black">
                                กรอกรหัสผ่านเก่าเพื่อยืนยันการเปลี่ยนรหัสผ่านใหม่*</h1>
                            <label for="old_password"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รหัสผ่านเก่า</label>
                            <input ref="old_password" type="password" id="old_password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="•••••••••" required />
                        </div>
                        <div class="mb-3 sm:mb-6">
                            <!-- New password input -->
                            <h1 class="text-lg sm:text-xl mb-1 sm:mb-1 text-black">กรอกรหัสผ่านใหม่ที่คุณต้องการเปลี่ยน*
                            </h1>
                            <h1 class="text-xs sm:text-sm mb-5 sm:mb-5 text-black">รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8
                                ตัวอักษร</h1>
                            <label for="new_password"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รหัสผ่านใหม่</label>
                            <input ref="new_password" type="password" id="new_password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="•••••••••" required />
                        </div>
                        <div class="mb-3 sm:mb-6">
                            <!-- Confirm password input -->
                            <label for="confirm_password"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ยืนยันรหัสผ่านอีกครั้ง</label>
                            <input ref="confirm_password" type="password" id="confirm_password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="•••••••••" required />
                        </div>
                        <!-- Submit button for change password -->
                        <button @click="updatePassword"
                            class="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none">
                            อัปเดตรหัสผ่าน
                        </button>
                    </div>
                </Dialog>


                <button @click="editpassword = true"
                    class="relative mt-5 py-2 w-full text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                    เปลี่ยนรหัสผ่าน
                </button>


                <!-- <div class="px-4 sm:px-8 py-8 sm:py-10 bg-white mt-5 rounded-xl shadow-lg ">
                    <div class="w-full mb-24 bg-white ">
                        <h1 class="text-xl sm:text-2xl text-left font-bold mb-5">เปลี่ยนรหัสผ่าน</h1>
                        <div class="mb-3 sm:mb-6 ">
                            <h1 class="text-lg sm:text-xl mb-3 sm:mb-5 text-black">
                                กรอกรหัสผ่านเก่าเพื่อยืนยันการเปลี่ยนรหัสผ่านใหม่*</h1>
                            <label for="old_password"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รหัสผ่านเก่า</label>
                            <input ref="old_password" type="password" id="old_password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="•••••••••" required />
                        </div>
                        <div class="mb-3 sm:mb-6">
                            <h1 class="text-lg sm:text-xl mb-1 sm:mb-1 text-black">กรอกรหัสผ่านใหม่ที่คุณต้องการเปลี่ยน*
                            </h1>
                            <h1 class="text-xs sm:text-sm mb-5 sm:mb-5 text-black">รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8
                                ตัวอักษร</h1>
                            <label for="new_password"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รหัสผ่านใหม่</label>
                            <input ref="new_password" type="password" id="new_password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="•••••••••" required />
                        </div>
                        <div class="mb-3 sm:mb-6">
                            <label for="confirm_password"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ยืนยันรหัสผ่านอีกครั้ง</label>
                            <input ref="confirm_password" type="password" id="confirm_password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="•••••••••" required />
                        </div>
                        <button @click="updatePassword"
                            class="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none">
                            อัปเดตรหัสผ่าน
                        </button>
                    </div>
                </div> -->
            </div>

            <div class="sm:col-span-3 bg-white shadow-lg rounded-xl">
                <!-- Edit profile section -->
                <h1 class="text-left text-xl sm:text-2xl font-bold ml-4 sm:ml-10 mt-2 sm:mt-6">แก้ไขข้อมูลส่วนตัว</h1>
                <form class="px-4 sm:px-10 mt-2 sm:mt-5">
                    <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-2">
                        <div>
                            <label for="first_name"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อจริง</label>
                            <input v-model="ME.first_name" type="text" id="first_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="" required />
                        </div>
                        <!-- Last name input -->
                        <div>
                            <label for="last_name"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">นามสกุล</label>
                            <input v-model="ME.last_name" type="text" id="last_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="" required />
                        </div>
                        <!-- Nickname input -->
                        <div>
                            <label for="nick_name"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อเล่น</label>
                            <input v-model="ME.nick_name" type="text" id="nick_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="" required />
                        </div>
                        <!-- ID number input -->
                        <div>
                            <label for="iden_number"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รหัสบัตรประชาชน</label>
                            <input v-model="ME.iden_number" type="tel" id="iden_number"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required readonly />
                        </div>
                        <!-- Phone number input -->
                        <div>
                            <label for="tel"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เบอร์โทรศัพท์</label>
                            <input v-model="ME.tel" type="tel" id="tel"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="" required />
                        </div>
                        <!-- Address input -->
                        <div>
                            <label for="address"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">บ้านเลขที่/หมู่ที่</label>
                            <input v-model="ME.address" type="text" id="address"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="" required />
                        </div>

                        
                        <!-- กล่องเลือกจังหวัด -->
                    <div class="mb-4">
                        <label for="province" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">จังหวัด</label>
                        <select v-model="selectedProvince" @change="fetchAmphures(selectedProvince)" class="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5">
                            <option value="">เลือกจังหวัด</option>
                            <option v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name_th }}</option>
                        </select>
                    </div>

                    <!-- กล่องเลือกอำเภอ -->
                    <div v-if="selectedProvince" class="mb-4">
                        <label for="district" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">อำเภอ</label>
                        <select v-model="selectedAmphure" @change="fetchTambons(selectedAmphure)" class="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5">
                            <option value="">เลือกอำเภอ</option>
                            <option v-for="amphure in amphures" :key="amphure.id" :value="amphure.id">{{ amphure.name_th }}</option>
                        </select>
                    </div>

                    <!-- กล่องเลือกตำบล -->
                    <div v-if="selectedAmphure" class="mb-4">
                        <label for="subdistrict" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ตำบล</label>
                        <select v-model="selectedTambon" @change="fetchZipCode(selectedTambon)" class="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5">
                            <option value="">เลือกตำบล</option>
                            <option v-for="tambon in tambons" :key="tambon.id" :value="tambon.id">{{ tambon.name_th }}</option>
                        </select>
                    </div>

                    <!-- กล่องแสดงรหัสไปรษณีย์ -->
                    <div v-if="zipCode" class="mb-4">
                        <label for="zipcode" class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รหัสไปรษณีย์</label>
                        <input type="text" id="zipcode" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" :value="zipCode" readonly>
                    </div>

                        <!-- <div>
                            <label for="birthday"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันเกิด</label>
                            <div class="card flex justify-content-center">
                                <Calendar v-model="ME.birthday" dateFormat="dd/mm/yy" id="birthday"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full h-10"
                                    placeholder="" required />
                            </div>
                        </div> -->
                        <!-- Age input -->
                        <div>
                            <label for="age"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">อายุ</label>
                            <input v-model="ME.age" type="number" id="age"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="" required />
                        </div>
                        <!-- Email input -->
                        <div>
                            <label for="email"
                                class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">อีเมล</label>
                            <input v-model="ME.email" type="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
                                placeholder="" required />
                        </div>
                        <div>

                        </div>
                        <!-- Submit button for edit profile -->
                        <div class="mb-6">
                            <button @click="updateEmployee"
                                class="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none">
                                อัปเดตข้อมูลส่วนตัว
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import Calendar from 'primevue/calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // นำเข้าไฟล์ locale สำหรับภาษาไทย
import Dialog from 'primevue/dialog';


export default {
    components: {
        Calendar,
        Dialog
    },
    name: 'Employee',
    data() {
        return {
            provinces: [],
            amphures: [],
            tambons: [],
            selectedProvince: '',
            selectedAmphure: '',
            selectedTambon: '',
            zipCode: '',
            ME: {},
            editpassword: false
        };
    },
    created() {
        this.fetchMe();
        this.fetchProvinces(); // ดึงข้อมูลจังหวัดเมื่อ component mounted

    },
    methods: {
        async fetchProvinces() {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json');
        this.provinces = response.data;
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    },
    async fetchAmphures(provinceId) {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json');
        this.amphures = response.data.filter(amphure => amphure.province_id === provinceId);
        this.selectedAmphure = ''; // reset selected amphure when province changes
      } catch (error) {
        console.error('Error fetching amphures:', error);
      }
    },
    async fetchTambons(amphureId) {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json');
        this.tambons = response.data.filter(tambon => tambon.amphure_id === amphureId);
        this.selectedTambon = ''; // reset selected tambon when amphure changes
      } catch (error) {
        console.error('Error fetching tambons:', error);
      }
    },
    async fetchZipCode(tambonId) {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json');
        const tambon = response.data.find(tambon => tambon.id === tambonId);
        this.zipCode = tambon.zip_code;
      } catch (error) {
        console.error('Error fetching zip code:', error);
      }
    },
        async fetchMe() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getme`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                if (response.data.data) {
                    this.ME = response.data.data;

                    // Convert birthday to Thai date format
                    this.ME.birthday = dayjs(this.ME.birthday).locale('th').format('DD/MM/YYYY');
                } else {
                    console.error("ไม่พบข้อมูลgetme");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            }
        },
        async updateEmployee() {
    try {
        this.ME.provice = this.provinces.find(province => province.id === this.selectedProvince)?.name_th || '';
        this.ME.district = this.amphures.find(amphure => amphure.id === this.selectedAmphure)?.name_th || '';
        this.ME.subdistrict = this.tambons.find(tambon => tambon.id === this.selectedTambon)?.name_th || '';
        this.ME.postcode = this.tambons.find(tambon => tambon.id === this.selectedTambon)?.zip_code || '';


        // Show confirmation dialog before updating
        const confirmed = await Swal.fire({
            icon: 'warning',
            title: 'ยืนยันการอัปเดต',
            text: 'คุณแน่ใจหรือไม่ที่ต้องการอัปเดตข้อมูลส่วนตัว',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        });

        // If user confirms the update
        if (confirmed.isConfirmed) {
            // Send PUT request to update employee data
            const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/update/${this.ME._id}`,
                this.ME, {
                headers: { "auth-token": `${localStorage.getItem("token")}` },
            });

            // Notify that the update was successful
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ',
                text: 'อัปเดตข้อมูลพนักงานสำเร็จ',
                showCancelButton: false,
                timer: 2000
            });

            // Load the new employee data
            this.fetchMe();
        }
    } catch (error) {
        // Notify if there's an error updating
        console.error('Error updating employee:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'อัพเดทข้อมูลพนักงานไม่สำเร็จ'
        });
    }
},


        async updatePassword() {
            if (!this.$refs.old_password.value || !this.$refs.new_password.value || !this.$refs.confirm_password.value) {
                Swal.fire({
                    icon: 'warning',
                    title: 'กรอกข้อมูลไม่ครบ',
                    text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
                    customClass: {
                        container: 'updatePassword',
                    }
                });
                return;
            }
            // Check if new password is at least 8 characters long
            if (new_password.value.length < 8) {
                Swal.fire({
                    icon: 'warning',
                    title: 'รหัสความยาวอย่างน้อย 8 ตัวอักษร',
                    text: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
                    customClass: {
                        container: 'updatePassword',
                    }
                });
                return;
            }

            try {
                // Fetch current employee data
                const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getme`, {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                if (response.data.data) {
                    const { old_password, new_password, confirm_password } = this.$refs;

                    // Check if new password matches the confirm password
                    if (new_password.value !== confirm_password.value) {
                        Swal.fire({
                            icon: 'error',
                            title: 'ผิดพลาด',
                            text: 'รหัสผ่านใหม่ไม่ตรงกับยืนยันรหัสผ่าน',
                            customClass: {
                                container: 'updatePassword',
                            }

                        });
                        return;
                    }

                    const isOldPasswordCorrect = await bcrypt.compare(old_password.value, response.data.data.password);
                    if (!isOldPasswordCorrect) {
                        Swal.fire({
                            icon: 'error',
                            title: 'ผิดพลาด',
                            text: 'รหัสผ่านเก่าไม่ถูกต้อง',
                            customClass: {
                                container: 'updatePassword',
                            }
                        });
                        return;
                    }

                    // Show confirmation dialog before updating password
                    const confirmed = await Swal.fire({
                        icon: 'warning',
                        title: 'ยืนยันการอัปเดตรหัสผ่าน',
                        text: 'คุณแน่ใจหรือไม่ที่ต้องการอัปเดตรหัสผ่าน',
                        showCancelButton: true,
                        confirmButtonText: 'ยืนยัน',
                        cancelButtonText: 'ยกเลิก',
                        customClass: {
                            container: 'updatePassword',
                        }
                    });

                    // If user confirms the password update
                    if (confirmed.isConfirmed) {
                        // Update password
                        const updatedResponse = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/update/${this.ME._id}`,
                            { password: new_password.value }, {
                            headers: { "auth-token": localStorage.getItem("token") },
                        });
                        this.editpassword = false
                        // Notify that the password update was successful
                        Swal.fire({
                            icon: 'success',
                            title: 'สำเร็จ',
                            text: 'อัปเดตรหัสผ่านสำเร็จ',
                            showCancelButton: false,
                            timer: 2000,
                            customClass: {
                                container: 'updatePassword',
                            }
                        });


                        // Clear input fields
                        old_password.value = '';
                        new_password.value = '';
                        confirm_password.value = '';
                    }
                } else {
                    console.error("ไม่พบข้อมูลgetme");
                }
            } catch (error) {
                // Notify if there's an error updating password
                console.error('Error updating password:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'อัพเดทรหัสผ่านไม่สำเร็จ',
                    customClass: {
                        container: 'updatePassword',
                    }

                });
            }
        },

    },
};
</script>

<style>
.updatePassword {
    z-index: 9999;
    /* กำหนดค่า Z-Index ที่ต้องการ */
}
</style>
