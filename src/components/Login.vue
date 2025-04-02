<template>
  <div>

    <div v-if="loading" class="overlay">
      <div class="cube">
        <div class="cube_item cube_x"></div>
        <div class="cube_item cube_y"></div>
        <div class="cube_item cube_y"></div>
        <div class="cube_item cube_x"></div>
      </div>
    </div>
    <div class="relative min-h-screen flex">
      <div
        class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div
          class="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-green-900 text-white bg-no-repeat bg-cover relative"
          :style="{ 'background-image': `url(@/assets/character1.png)` }">
          <div class="absolute bg-gradient-to-b from-green-950 to-green-900 opacity-95 inset-0 z-0"></div>
          <div class="absolute triangle min-h-screen right-0 w-16" style=""></div>

          <!-- <img src="../assets/character1.png" class="h-96 absolute right-5 mr-5"> -->

          <!---remove custom style-->
          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div
          class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div class="max-w-md w-full space-y-8">
            <div class="mb-8 flex flex-col items-center">
              <img src="../assets/GPlusS-logo4.png" width="300" alt="" srcset="" />
            </div>
            <div class="text-center">
              <h2 class="mt-6 text-3xl font-bold text-gray-900">เข้าสู่ระบบ</h2>
            </div>

            <div class="mt-8 space-y-6">
              <div class="space-y-5">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 tracking-wide">Username</label>
                  <input v-model="userid" @keyup.enter="login"
                    class="w-full text-base px-4 py-2 border text-black border-gray-300 rounded-lg outline-[#0B60B0]"
                    type="text" placeholder="กรอก username" />
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <div class="relative">
                    <div
                      class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                      <span>
                        <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                    </div>

                    <div class="relative">
                      <input v-model="password" @keyup.enter="login" :type="showPassword ? 'text' : 'password'"
                        class="text-sm sm:text-base text-black px-4 rounded-lg border border-gray-300 w-full py-2 outline-[#0B60B0]"
                        placeholder="กรอกรหัสผ่าน" />
                      <i class="cursor-pointer text-gray-500 absolute right-4 top-1/2 -translate-y-1/2"
                        :class="!showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" @click="showPassword = !showPassword">
                      </i>
                    </div>
                  </div>
                </div>

                <div>
                  <button @click="login"
                    class="w-full flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-950 hover:bg-gradient-to-l hover:from-gray-600 hover:to-gray-900 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in hover:scale-105 duration-300">
                    <span class="mr-2 uppercase">Login</span>
                    <span>
                      <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </button>
                </div>

                <div class="mb-4">
                  <button @click="RegisterForm()" class="w-full text-black p-2 rounded-md ">
                    สมัครสมาชิก
                  </button>
                </div>
                <div>



                </div>

                <Dialog v-model:visible="isRegister" class="w-[50%]" header="กรอกข้อมูลเพื่อสมัครสมาชิก">
                  <div class="bg-white shadow-lg rounded-lg p-6">
                    <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">สมัครสมาชิกใหม่</h2>
                    <form class="px-4 sm:px-8 mt-2 sm:mt-5">
                      <!-- แบ่งส่วนข้อมูลส่วนตัว -->
                      <div class="mb-6">
                        <h3 class="text-lg font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">
                          ข้อมูลการสมัคร</h3>
                        <div class="grid gap-4 sm:gap-6 md:grid-cols-2">
                          <div>
                            <label for="role" class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> ตำแหน่งงานที่สมัคร
                            </label>
                            <Dropdown v-model="selectedSubPosition" :options="subForPosition" filter
                              placeholder="เลือกตำแหน่ง"
                              class="w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                              <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex items-center p-2">
                                  <div>{{ slotProps.value.label }}</div>
                                </div>
                                <span v-else class="p-2 text-gray-400">
                                  {{ slotProps.placeholder }}
                                </span>
                              </template>
                              <template #option="slotProps">
                                <div class="flex items-center p-2 hover:bg-blue-50">
                                  <div>{{ slotProps.option.label }}</div>
                                </div>
                              </template>
                            </Dropdown>
                          </div>
                        </div>
                      </div>

                      <!-- ข้อมูลส่วนตัว -->
                      <div class="mb-6">
                        <h3 class="text-lg font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">ข้อมูลส่วนตัว
                        </h3>
                        <div class="grid gap-4 sm:gap-6 md:grid-cols-2">
                          <div>
                            <label for="role" class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> คำนำหน้า
                            </label>
                            <Dropdown v-model="selectedTitle" :options="subForTitle" filter placeholder="เลือกคำนำหน้า"
                              class="w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                              <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex items-center p-2">
                                  <div>{{ slotProps.value.label }}</div>
                                </div>
                                <span v-else class="p-2 text-gray-400">
                                  {{ slotProps.placeholder }}
                                </span>
                              </template>
                              <template #option="slotProps">
                                <div class="flex items-center p-2 hover:bg-blue-50">
                                  <div>{{ slotProps.option.label }}</div>
                                </div>
                              </template>
                            </Dropdown>
                          </div>

                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> ชื่อ
                            </label>
                            <input type="text" v-model="first_name" placeholder="ชื่อจริง"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                          </div>

                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> นามสกุล
                            </label>
                            <input type="text" v-model="last_name" placeholder="นามสกุล"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                          </div>

                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> เบอร์โทรศัพท์
                            </label>
                            <input type="tel" v-model="tel" placeholder="เบอร์มือถือ 10 หลัก"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                          </div>

                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> อีเมล
                            </label>
                            <input type="email" v-model="email" placeholder="example@mail.com"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            <p v-if="email && !validateEmail(email)" class="text-red-500 text-xs mt-1">
                              กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง
                            </p>
                          </div>

                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> เลขบัตรประชาชน
                            </label>
                            <input type="text" v-model="iden_number"
                              @input="iden_number = iden_number.replace(/[^0-9]/g, '').slice(0, 13)"
                              placeholder="เลข 13 หลัก"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            <p v-if="iden_number && !validateIdCard(iden_number)" class="text-red-500 text-xs mt-1">
                              กรุณากรอกเลขบัตรประชาชน 13 หลัก
                            </p>
                          </div>

                          <div>
                            <label for="datePicker" class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> เกิดวันที่
                            </label>
                            <input type="date" v-model="birthday"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                          </div>
                        </div>
                      </div>

                      <!-- ที่อยู่ -->
                      <div class="mb-6">
                        <h3 class="text-lg font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">
                          ที่อยู่ตามบัตรประชาชน</h3>
                        <div class="grid gap-4 sm:gap-6 md:grid-cols-2">
                          <div class="md:col-span-2">
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> ที่อยู่เลขที่/หมู่บ้าน
                            </label>
                            <input type="text" v-model="address" placeholder="บ้านเลขที่ หมู่บ้าน ซอย ถนน"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                          </div>

                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> จังหวัด
                            </label>
                            <Dropdown v-model="editedMe.province" :options="item_province" filter
                              @change="chooseProvince" optionValue="name_th" optionLabel="name_th"
                              placeholder="เลือกจังหวัด"
                              class="w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                          </div>

                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> อำเภอ/เขต
                            </label>
                            <Dropdown v-model="editedMe.district" :options="item_amphure" filter @change="chooseAmphure"
                              optionValue="name_th" optionLabel="name_th" placeholder="เลือกอำเภอ"
                              class="w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                          </div>

                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> ตำบล/แขวง
                            </label>
                            <Dropdown v-model="editedMe.subdistrict" :options="item_tambon" filter
                              @change="chooseDistrict" optionValue="name_th" optionLabel="name_th"
                              placeholder="เลือกตำบล"
                              class="w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                          </div>

                          <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> รหัสไปรษณีย์
                            </label>
                            <input v-model="editedMe.postcode" placeholder="รหัสไปรษณีย์"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                          </div>
                        </div>
                      </div>

                      <!-- เอกสารแนบ -->
                      <div class="mb-6">
                        <h3 class="text-lg font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-200">
                          เอกสารประกอบการสมัคร</h3>
                        <div class="grid gap-4 sm:gap-6 md:grid-cols-2">
                          <div>
                            <label for="iden-file" class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> สำเนาบัตรประชาชน
                            </label>
                            <div v-if="!image_iden" class="flex items-center justify-center w-full">
                              <label for="iden-file"
                                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                  </svg>
                                  <p class="mb-2 text-sm text-gray-500"><span
                                      class="font-semibold">คลิกเพื่ออัปโหลด</span></p>
                                </div>
                                <input id="iden-file" type="file" class="hidden"
                                  @change="(e) => handleFileChange(e, 'image_iden')" />
                              </label>
                            </div>
                            <div v-else class="flex justify-center">
                              <img :src="this.image_iden" alt="image_iden" class="w-full max-w-[200px] h-auto">
                            </div>
                          </div>

                          <div>
                            <label for="bank-file" class="block mb-2 text-sm font-medium text-gray-700">
                              <span class="text-red-500">*</span> สำเนาหน้าสมุดบัญชีธนาคาร
                            </label>
                            <div v-if="!image_bank" class="flex items-center justify-center w-full">
                              <label for="bank-file"
                                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                  </svg>
                                  <p class="mb-2 text-sm text-gray-500"><span
                                      class="font-semibold">คลิกเพื่ออัปโหลด</span></p>
                                </div>
                                <input id="bank-file" type="file" class="hidden"
                                  @change="(e) => handleFileChange(e, 'image_bank')" />
                              </label>
                            </div>
                            <div v-else class="flex justify-center">
                              <img :src="image_bank" alt="image_bank" class="w-full max-w-[200px] h-auto">
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center justify-between mt-8">
                        <div class="text-xs text-gray-500">
                          <span class="text-red-500">*</span> หมายถึงข้อมูลที่จำเป็นต้องกรอก
                        </div>
                        <div class="flex space-x-4">
                          <button type="button" @click="isRegister = false"
                            class="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                            ยกเลิก
                          </button>
                          <button type="button" @click="SubmitRegister()"
                            class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                            สมัครสมาชิก
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import Swal from "sweetalert2";
import "dayjs/locale/th";
import Dropdown from "primevue/dropdown";


export default {
  name: "Login",

  data() {
    return {
      editedMe: {},
      isRegister: false,
      loading: false,
      showPassword: false,
      iden_number: "",
      address: "",
      name: "",
      gender: "",
      birthday: "",
      tel: "",
      status: "",
      role: "",
      selectedSubPosition: "",
      selectedTitle: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",

      item_province: [],
      item_amphure: [],
      item_tambon: [],
      province: null,
      amphure: null,
      tambon: null,
      postcode: null,
      image_iden: null, // รูปบัตรประชาชน
      image_bank: null, // รูปสมุดบัญชี
      fileType: '', // ใช้แยกประเภทว่ากำลังอัปโหลดรูปอะไรอยู่
      subForPosition: [
        { label: 'ช่างเทคนิค', value: 'ช่างเทคนิค' },
        { label: 'พนักงานภาคสนาม', value: 'พนักงานภาคสนาม' },
      ],
      subForTitle: [
        { label: 'นาย', value: 'นาย' },
        { label: 'นางสาว', value: 'นางสาว' },
        { label: 'นาง', value: 'นาง' },
      ],
    };
  },



  methods: {
    validatePhoneNumber(phone) {
      const regex = /^[0-9]{10}$/;
      return regex.test(phone);
    },

    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    validateIdCard(id) {
      const regex = /^[0-9]{13}$/;
      return regex.test(id);
    },

    formatPhoneNumber(phone) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    },
    resetForm() {
      this.iden_number = "";
      this.first_name = "";
      this.last_name = "";
      this.tel = "";
      this.email = "";
      this.address = "";
      this.birthday = "";
      this.editedMe = {};
      this.selectedSubPosition = "";
      this.selectedTitle = "";
      this.image_iden = null;
      this.image_bank = null;
    },
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async login() {
      try {
        if (!this.userid || !this.password) {
          // ถ้า userid หรือ password ไม่ถูกกรอก
          Swal.fire({
            icon: "warning",
            text: "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน",
          });
          return;
        }
        this.loading = true;
        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/login`,
          {
            userid: this.userid,
            password: this.password,
          }
        );
        localStorage.setItem("token", response.data.token);
        Swal.fire({
          icon: "success",
          text: "เข้าสู่ระบบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Login response:", response.data);
        setTimeout(() => {
          window.location.assign("/");
          this.$router.push("/");
          console.log("Login Success");
        }, 1500);
      } catch (error) {
        console.error("Login failed:", error);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      } finally {
        this.loading = false;
      }
    },
    async RegisterForm() {
      try {
        this.isRegister = true;

        // 1 ดึงข้อมูลจังหวัด
        const provinces = await axios.get(`${import.meta.env.VITE_VUE_APP_PROVINCE}`);
        this.item_province = provinces.data;

        // ถ้ามีจังหวัดที่เลือกไว้แล้ว
        if (this.editedMe.province) {
          const selectedProvince = this.item_province.find(
            (el) => el.name_th === this.editedMe.province
          );

          if (selectedProvince) {
            this.editedMe.province = selectedProvince.name_th;

            // 2 ดึงข้อมูลอำเภอของจังหวัดที่เลือก
            const amphures = await axios.get(`${import.meta.env.VITE_VUE_APP_AMPHURE}`);
            this.item_amphure = amphures.data.filter(
              (el) => el.province_id === selectedProvince.id
            );

            if (this.editedMe.district) {
              const selectedAmphure = this.item_amphure.find(
                (el) => el.name_th === this.editedMe.district
              );

              if (selectedAmphure) {
                this.editedMe.district = selectedAmphure.name_th;

                // 3 ดึงข้อมูลตำบลของอำเภอที่เลือก
                const tambons = await axios.get(`${import.meta.env.VITE_VUE_APP_TAMBON}`);
                this.item_tambon = tambons.data.filter(
                  (tambon) => tambon.amphure_id === selectedAmphure.id
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    async handleFileChange(event, type) {
      const file = event.target.files[0];
      if (!file) return;

      const base64 = await this.convertToBase64(file);

      console.log('base64 : ', base64)

      if (type === "image_bank") {
        this.image_bank = base64;
      } else if (type === "image_iden") {
        this.image_iden = base64;
      }
    },


    async SubmitRegister() {

      if (!this.validateEmail(this.email)) {
        Swal.fire({
          icon: 'error',
          title: 'อีเมลไม่ถูกต้อง',
          text: 'กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง (เช่น example@mail.com)'
        });
        return;
      }

      if (!this.validateIdCard(this.iden_number)) {
        Swal.fire({
          icon: 'error',
          title: 'เลขบัตรประชาชนไม่ถูกต้อง',
          text: 'กรุณากรอกเลขบัตรประชาชน 13 หลัก (ตัวเลขเท่านั้น)'
        });
        return;
      }

      try {
        let position = this.$refs.inputField ? this.$refs.inputField.innerText : '';
        let title = this.$refs.inputField2 ? this.$refs.inputField2.innerText : '';

        let data = {
          iden_number: this.iden_number,
          first_name: this.first_name,
          last_name: this.last_name,
          tel: this.tel,
          userid: this.iden_number,
          password: this.iden_number,
          email: this.email,
          address: this.address,
          birthday: this.birthday,
          provice: this.editedMe.province,
          district: this.editedMe.district,
          subdistrict: this.editedMe.subdistrict,
          postcode: this.editedMe.postcode,
          position: this.selectedSubPosition ? this.selectedSubPosition.value : '',
          name_title: title,
          image_iden: this.image_iden,
          image_bank: this.image_bank,
          role: "employee",
        };

        const result = await Swal.fire({
          title: "ยืนยันการลงทะเบียน?",
          text: "กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนยืนยัน",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            try {
              const response = await axios.post(
                `${import.meta.env.VITE_VUE_APP_DECCAN}/post`,
                data,
                {
                  headers: {
                    "auth-token": localStorage.getItem("token"),
                  },
                }
              );
              return response.data;
            } catch (error) {
              Swal.showValidationMessage(
                `เกิดข้อผิดพลาด: ${error.response?.data?.message || "ไม่สามารถบันทึกข้อมูลได้"}`
              );
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });

        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            text: "เพิ่มสำเร็จ",
            showConfirmButton: false,
            timer: 3000,
          });

          this.isRegister = false

          this.resetForm
        }
      } catch (error) {
        console.error("Error saving data:", error);

        Swal.fire({
          icon: "error",
          text: error.response?.data?.message || "เกิดข้อผิดพลาด",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    async chooseProvince(evt) {
      try {
        const findprovince = this.item_province.find(
          (item) => item.name_th == evt.value
        );
        const responseAmphure = await axios.get(
          `${import.meta.env.VITE_VUE_APP_AMPHURE}`
        );
        this.item_amphure = responseAmphure.data.filter(
          (el) => el.province_id == findprovince.id
        );

        this.item_tambon = [];
        this.editedMe.district = null;
        this.editedMe.subdistrict = null;
        this.amphure = null;
        this.tambon = null;
      } catch (error) {
        console.error(error);
        this.$toast.add({
          severity: "error",
          summary: "เกิดข้อผิดพลาดในการเรียกข้อมูลเขต/อำเภอ",
          life: 3000,
        });
      }
    },

    async mounted() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_PROVINCE}`
        );
        this.item_province = response.data;
        this.fetchME();
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลจังหวัด:", error);
      }
    },

    async chooseAmphure(evt) {
      try {
        const selectedAmphure = this.item_amphure.find(
          (item) => item.name_th == evt.value
        );
        const tambonResponse = await axios.get(
          `${import.meta.env.VITE_VUE_APP_TAMBON}`
        );
        this.item_tambon = tambonResponse.data.filter(
          (el) => el.amphure_id === selectedAmphure.id
        );

        // เคลียร์ค่าที่เกี่ยวข้องกับตำบล
        this.editedMe.subdistrict = null;
        this.tambon = null;
      } catch (error) {
        console.error(error);
        this.$toast.add({
          severity: "error",
          summary: "เกิดข้อผิดพลาดในการเรียกข้อมูลแขวง/ตำบล",
          life: 3000,
        });
      }
    },

    chooseDistrict(evt) {
      const tambon = this.item_tambon.find((item) => item.name_th == evt.value);
      console.log(tambon);
      this.editedMe.postcode = tambon.zip_code;
    },

  },

};
</script>

<style scoped>
@import url("../css/Loading.css");

/*remove custom style*/
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

.triangle {
  border-top: 60rem solid #fff;
  border-left: 25rem solid transparent;
}
</style>
