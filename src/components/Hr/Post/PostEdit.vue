<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    v-show="showPopup"
  >
    <div class="popup-content bg-white rounded-lg overflow-auto max-h-[80vh]">
      <div>
        <form @submit.prevent="updatePost" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-lg font-semibold">
              แก้ไขประกาศงาน บริษัท: {{ formData.company }}
            </h3>
            <!-- Close button -->
            <button
              @click.prevent="ModalClose"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="Company"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                บริษัท
              </label>
              <input
                v-model="formData.company"
                type="text"
                name="Company"
                id="Company"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ชื่อบริษัท"
                required
              />
            </div>

            <div>
              <label
                for="Header"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                หัวข้อ
              </label>
              <input
                v-model="formData.header"
                type="text"
                name="Header"
                id="Header"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน หัวข้อ"
                required
              />
            </div>
          </div>

          <div class="mt-4">
            <label
              for="Description"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              รายละเอียด
            </label>
            <textarea
              v-model="formData.description"
              name="Description"
              id="Description"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32"
              placeholder="ป้อน รายละเอียด"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="department"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ตำแหน่ง
              </label>
              <select
                v-model="formData.department"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled>เลือกตำแหน่ง</option>
                <option
                  v-for="type in ExamType"
                  :key="type._id"
                  :value="type.extype_name"
                >
                  {{ type.extype_name }}
                </option>
              </select>
            </div>

            <div>
              <label
                for="amount"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                จำนวนที่รับ
              </label>
              <div class="flex">
                <input
                  v-model.number="formData.amount"
                  type="number"
                  name="amount"
                  id="amount"
                  class="bg-gray-50 border-r border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-2 px-3 leading-tight"
                  placeholder="ป้อน จำนวนที่รับ"
                  required
                />
                <span
                  class="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                >
                  คน
                </span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div class="relative">
              <label
                for="salary"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                เงินเดือน
              </label>
              <div class="flex">
                <input
                  v-model.number="formData.start_salary"
                  type="number"
                  name="salary"
                  id="salary"
                  class="bg-gray-50 border-r border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-2 px-3 leading-tight"
                  placeholder="ป้อน เงินเดือน"
                  required
                />ถึง
                <input
                  v-model.number="formData.end_salary"
                  type="number"
                  name="salary"
                  id="salary"
                  class="bg-gray-50 border-r border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2 px-2 px-3 leading-tight"
                  placeholder="ป้อน เงินเดือน"
                  required
                />
                <span
                  class="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                >
                  บาท
                </span>
              </div>
            </div>

            <div>
              <label
                for="sex"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                เพศ
              </label>
              <select
                v-model="formData.sex"
                id="sex"
                name="sex"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled>โปรดเลือกเพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="ชาย/หญิง">ชาย/หญิง</option>
                <option value="ทุกเพศ">ทุกเพศ</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div class="grid grid-cols-3 gap-2">
              <div class="col-span-2">
                <label
                  for="ageRange"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  อายุ
                </label>
                <div class="flex">
                  <input
                    v-model.number="formData.age.start_age"
                    type="number"
                    name="start_age"
                    id="start_age"
                    class="bg-gray-50 border-r border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 py-2 px-2 px-3 leading-tight"
                    placeholder="อายุเริ่มต้น"
                    required
                  />

                  <span class="inline-flex items-center px-3 text-gray-500">
                    ถึง
                  </span>

                  <input
                    v-model.number="formData.age.end_age"
                    type="number"
                    name="end_age"
                    id="end_age"
                    class="bg-gray-50 border-l border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 py-2 px-2 px-3 leading-tight"
                    placeholder="อายุสิ้นสุด"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="col-span-1">
              <label
                for="experience"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ประสบการณ์
              </label>
              <div class="flex">
                <select
                  v-model="formData.experience"
                  id="Education_lv"
                  name="Education_lv"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>โปรดเลือกประสบการณ์</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <!-- เพิ่มตัวเลือกอื่นๆ ตามความเหมาะสม -->
                </select>

                <span class="inline-flex items-center px-3 text-gray-500">
                  ปี
                </span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="Education_lv"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ระดับการศึกษา
              </label>
              <select
                v-model="formData.education.education_lv"
                id="Education_lv"
                name="Education_lv"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled>โปรดเลือกระดับการศึกษา</option>
                <option value="ประถมศึกษา">มัธยมต้น</option>
                <option value="ประถมศึกษา">มัธยมปลาย</option>
                <option value="ประถมศึกษา">ปริญญาตรี</option>
                <option value="มัธยมศึกษา">ปริญญาโท</option>
                <option value="อุดมศึกษา">ปริญญาเอก</option>
                <!-- เพิ่มตัวเลือกอื่นๆ ตามความเหมาะสม -->
              </select>
            </div>

            <div>
              <label
                for="Field_of_study"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                สาขาวิชา
              </label>
              <select
                v-model="formData.education.field_of_study"
                id="Field_of_study"
                name="Field_of_study"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled>โปรดเลือกสาขาวิชา</option>
                <option value="วิศวะคอมพิวเตอร์">วิศวะคอมพิวเตอร์</option>
                <option value="วิทยาการคอมพิวเตอร์">วิทยาการคอมพิวเตอร์</option>
                <option value="ไอที">ไอที</option>
                <!-- เพิ่มตัวเลือกอื่นๆ ตามความเหมาะสม -->
              </select>
            </div>
          </div>

          <!-- Feature inputs -->
          <div class="mt-4">
            <label
              for="feature"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              คุณสมบัติ
            </label>
            <div
              v-for="(item, index) in formData.feature"
              :key="index"
              class="flex items-center mb-2"
            >
              <textarea
                v-model="item.feature_detail"
                :name="'feature[' + index + '][feature_detail]'"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-20 mr-2"
                placeholder="ป้อน คุณสมบัติ"
                required
              ></textarea>
              <button
                @click.prevent="removeFeature(index)"
                class="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                ลบ
              </button>
            </div>
            <button
              @click.prevent="addFeature"
              class="bg-green-500 text-white px-3 py-1 rounded-md mt-2"
            >
              เพิ่ม Feature
            </button>
          </div>

          <!-- Working inputs -->
          <div class="mt-4">
            <label
              for="Working"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              ลักษณะงาน
            </label>
            <div
              v-for="(item, index) in formData.working"
              :key="index"
              class="flex items-center mb-2"
            >
              <textarea
                v-model="item.working"
                :name="'Working[' + index + '][working]'"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-20 mr-2"
                placeholder="ป้อน ลักษณะงาน"
              ></textarea>
              <button
                @click.prevent="removeWorking(index)"
                class="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                ลบ
              </button>
            </div>
            <button
              @click.prevent="addWorking"
              class="bg-green-500 text-white px-3 py-1 rounded-md mt-2"
            >
              เพิ่ม Working
            </button>
          </div>

          <!-- Welfare inputs -->
          <div class="mt-4">
            <label
              for="Welfare"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              สวัสดิการ
            </label>
            <div
              v-for="(item, index) in formData.welfare"
              :key="index"
              class="flex items-center mb-2"
            >
              <textarea
                v-model="item.welfare"
                :name="'Welfare[' + index + '][welfare]'"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-20 mr-2"
                placeholder="ป้อน สวัสดิการ"
                required
              ></textarea>
              <button
                @click.prevent="removeWelfare(index)"
                class="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                ลบ
              </button>
            </div>
            <button
              @click.prevent="addWelfare"
              class="bg-green-500 text-white px-3 py-1 rounded-md mt-2"
            >
              Add Welfare
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div class="mt-4">
              <label
                for="end_date"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                วันที่สิ้นสุด
              </label>
              <input
                v-model="formData.end_date"
                type="date"
                name="end_date"
                id="end_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>

            <div class="mt-4">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                รูปภาพ
              </label>
              <div class="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  ref="fileInput"
                  @change="handleImageUpload"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div class="col-span-2">
                <label
                  for="image"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >รูปภาพปัจจุบัน</label
                >
                <p
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                >
                  <!-- Show uploaded image -->
                  <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Uploaded Image"
                    class="mt-2 max-w-full h-auto"
                  />
                  <img
                    v-else-if="formData.image"
                    :src="
                      'https://drive.google.com/thumbnail?id=' + formData.image
                    "
                    alt="Uploaded Image"
                    class="mt-2 max-w-full h-auto"
                  />
                  <!-- Show a placeholder image if no image is uploaded -->
                  <img
                    v-else
                    src="https://via.placeholder.com/150"
                    alt="Placeholder Image"
                    class="mt-2 max-w-full h-auto"
                  />
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <!-- Save and Close buttons -->
            <button
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              บันทึก
            </button>
            <button
              @click.prevent="ModalClose"
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditPopup",
  props: {
    post: Object, // รับข้อมูลข้อสอบที่จะแก้ไข
  },
  data() {
    return {
      showPopup: true,
      formData: {
        company: "",
        header: "",
        description: "",
        department: "",
        amount: "",
        start_salary: "",
        end_salary: "",
        sex: "",
        age: {
          start_age: "",
          end_age: "",
        },
        experience: "",
        education: {
          education_lv: "",
          field_of_study: "",
        },
        feature: [{ feature_detail: "" }],
        working: [{ working: "" }],
        welfare: [{ welfare: "" }],
        image: "", // Change to null initially
        end_date: "",
      },
      imagePreview: null,
      ExamType: [],
      Employees: [],
    };
  },

  created() {
    // นำข้อมูลข้อสอบที่ได้รับมาแสดงในฟอร์มเมื่อคอมโพเนนต์ถูกสร้างขึ้น
    this.formData = { ...this.post };
  },

  mounted() {
    this.fetchPostTypes(); // Fetch post types when component mounts
  },

  methods: {
    handleImageUpload() {
      const file = this.$refs.fileInput.files[0];
      this.formData.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },

    async fetchPostTypes() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_POST}/exam-type`
        );
        if (response.data.status) {
          // ตรวจสอบ status ใน JSON response
          this.ExamType = response.data.data; // แสดงค่าจาก key "data"
        } else {
          console.error("Error fetching post types:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching post types:", error);
      }
    },

    async updatePost() {
      try {
        const confirmsPost = await Swal.fire({
          title: "Confirm Update",
          text: "Are you sure you want to update?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        });

        if (confirmsPost.isConfirmed) {
          const { data } = await axios.put(
            `${import.meta.env.VITE_API_POST}/post/update-post/${
              this.formData._id
            }`,
            this.formData
          );
          {
            await Swal.fire("Updated!", "Post has been updated.", "success");
          }
          this.$emit("editedPost");
          this.$emit("close");
        }
        console.log(this.formData);
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire("Error!", error.response.data.message, "error");
      }
    },

    ModalClose() {
      this.$emit("close");
    },

    validateNumber(event) {
      const inputValue = event.target.value;
      const regex = /^[0-9]*$/; // ตรวจสอบว่าเป็นตัวเลขหรือไม่
      if (!regex.test(inputValue)) {
        event.target.value = inputValue.replace(/[^0-9]/g, ""); // ลบอักขระที่ไม่ใช่ตัวเลข
      }
    },

    // Methods for handling feature, working, and welfare inputs
    addFeature() {
      this.formData.feature.push({ feature_detail: "" });
    },
    removeFeature(index) {
      this.formData.feature.splice(index, 1);
    },
    addWorking() {
      this.formData.working.push({ working: "" });
    },
    removeWorking(index) {
      this.formData.working.splice(index, 1);
    },
    addWelfare() {
      this.formData.welfare.push({ welfare: "" });
    },
    removeWelfare(index) {
      this.formData.welfare.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  background-color: rgba(0, 0, 0, 0.1);
}

.popup-content {
  max-width: 800px;
  width: 90%;
}
</style>
