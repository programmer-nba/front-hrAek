<template>
  <div
    v-if="showAddEmployeeForm"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-auto z-40"
  >
    <div
      class="bg-white w-full md:w-5/6 lg:w-2/3 xl:w-1/2 p-9 rounded-2xl shadow-md overflow-hidden overflow-y-scroll"
      style="max-height: 80vh"
    >
      <h2 class="text-4xl font-semibold mb-4">เพิ่มข้อมูลพนักงาน</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
          <label for="role" class="block text-sm font-bold mb-2"
            >คำนำหน้า</label
          >
          <Dropdown
            v-model="name_title"
            :options="titleOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="เลือกคำนำหน้า"
            class="no-rounded w-full mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          />
        </div>
        <div class="mb-4">
          <label for="first_name" class="block text-sm font-bold mb-2"
            >ชื่อจริง</label
          >
          <input
            v-model="first_name"
            type="text"
            id="first_name"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="last_name" class="block text-sm font-bold mb-2"
            >นามสกุล</label
          >
          <input
            v-model="last_name"
            type="text"
            id="last_name"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="iden_number" class="block text-sm font-bold mb-2"
            >เลขประจำตัวประชาชน</label
          >
          <input
            v-model="iden_number"
            type="text"
            id="iden_number"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
            oninput="javascript: if (this.value.length > 13) this.value = this.value.slice(0, 13);"
          />
        </div>
        <div class="mb-4">
          <label for="nick_name" class="block text-sm font-bold mb-2"
            >ชื่อเล่น</label
          >
          <input
            v-model="nick_name"
            type="text"
            id="nick_name"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="tel" class="block text-sm font-bold mb-2"
            >เบอร์โทรศัพท์</label
          >
          <input
            v-model="tel"
            type="text"
            id="tel"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-bold mb-2">อีเมล</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-bold mb-2"
            >ที่อยู่</label
          >
          <input
            v-model="address"
            type="text"
            id="address"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="subdistrict" class="block text-sm font-bold mb-2"
            >แขวง/ตำบล</label
          >
          <input
            v-model="subdistrict"
            type="text"
            id="subdistrict"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="district" class="block text-sm font-bold mb-2"
            >เขต/อำเภอ</label
          >
          <input
            v-model="district"
            type="text"
            id="district"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="provice" class="block text-sm font-bold mb-2"
            >จังหวัด</label
          >
          <input
            v-model="provice"
            type="text"
            id="provice"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="postcode" class="block text-sm font-bold mb-2"
            >รหัสไปรษณีย์</label
          >
          <input
            v-model="postcode"
            type="text"
            id="postcode"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <!-- <div class="mb-4">
          <label for="birthday" class="block text-sm font-bold mb-2"
            >วันเกิด</label
          >
          <input
            v-model="birthday"
            type="date"
            id="birthday"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div> -->
        <div class="mb-4">
          <label for="salary" class="block text-sm font-bold mb-2"
            >เงินเดือน</label
          >
          <input
            v-model="salary"
            type="number"
            id="salary"
            class="form-input w-full h-10 border-2 rounded-xl border-gray-700"
          />
        </div>
        <div class="mb-4">
          <label for="role" class="block text-sm font-bold mb-2">Role</label>
          <Dropdown
            v-model="selectedPosition"
            :options="positionOptions"
            filter
            placeholder="เลือกตำแหน่ง"
            class="no-rounded w-full mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          />
        </div>
        <div
          class="mb-4"
          v-if="
            selectedPosition === 'employee' ||
            selectedPosition === 'head_department'
          "
        >
          <label for="position" class="block text-sm font-bold mb-2"
            >Position</label
          >
          <Dropdown
            v-model="selectedSubPosition"
            :options="subPositionOptions"
            placeholder="เลือกตำแหน่ง"
            class="no-rounded w-full mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          />
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button
          @click="saveData"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          เพิ่มข้อมูลพนักงาน
        </button>
        <button
          @click="closeAddForm"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: {
    showAddEmployeeForm: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close-add-form", "employee-added"],
  data() {
    return {
      name_title: null,
      titleOptions: [
        { label: "นาย", value: "นาย" },
        { label: "นาง", value: "นาง" },
        { label: "นางสาว", value: "นางสาว" },
      ],
      first_name: "",
      last_name: "",
      nick_name: "",
      iden_number: "",
      tel: "",
      email: "",
      address: "",
      subdistrict: "",
      district: "",
      provice: "",
      postcode: "",
      birthday: null,
      salary: 0,
      selectedPosition: "",
      selectedSubPosition: "",
      positionOptions: ["owner", "manager", "employee", "head_department"],
      subPositionOptions: ["programmer", "graphic", "accounting"],
    };
  },
  methods: {
    saveData() {
      let data = {
        name_title: this.name_title,
        first_name: this.first_name,
        last_name: this.last_name,
        nick_name: this.nick_name,
        iden_number: this.iden_number,
        tel: this.tel,
        email: this.email,
        address: this.address,
        subdistrict: this.subdistrict,
        district: this.district,
        provice: this.provice,
        postcode: this.postcode,
        birthday: this.birthday,
        salary: this.salary,
        role: this.selectedPosition,
      };

      data.userid = this.iden_number;
      data.password = this.iden_number;

      if (
        this.selectedPosition === "owner" ||
        this.selectedPosition === "manager"
      ) {
        data.position = this.selectedPosition;
      } else if (
        this.selectedPosition === "employee" ||
        this.selectedPosition === "head_department"
      ) {
        data.position = this.selectedSubPosition;
      }

      if (this.isEmpty(data)) {
        Swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        });
        return;
      }

      axios
        .post(`${import.meta.env.VITE_VUE_APP_DECCAN}/post`, data, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "เพิ่มสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$emit("employee-added");
          this.closeAddForm();
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    isEmpty(object) {
      return Object.keys(object).some((key) => {
        const value = object[key];
        return value === null || value === "" || value === undefined;
      });
    },

    closeAddForm() {
      this.$emit("close-add-form");
    },
  },
};
</script>
