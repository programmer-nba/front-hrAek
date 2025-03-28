<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-10 flex justify-center items-center"
    v-show="showPopup"
  >
    <div class="popup-content bg-white rounded-lg overflow-auto max-h-[80vh]">
      <div>
        <form @submit.prevent="updatePost" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-lg font-semibold">
              Edit Post: {{ formData.Position_applied }}
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
                for="Position_applied"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ตำแหน่ง
              </label>
              <select
                v-model="formData.Position_applied"
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
                for="Score"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                คะแนน
              </label>
              <input
                v-model.number="formData.Score"
                type="number"
                name="Score"
                id="Score"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คะแนน"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="Result"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ผลการสอบ</label
              >
              <select
                v-model="formData.Result"
                name="Result"
                id="Result"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="" disabled>เลือกผลการสอบ</option>
                <option value="ผ่าน">ผ่าน</option>
                <option value="ไม่ผ่าน">ไม่ผ่าน</option>
              </select>
            </div>

            <div>
              <label
                for="Meeting_result"
                class="block mb-2 text-sm font-medium text-gray-900"
                >การนัดสัมภาษณ์</label
              >
              <select
                v-model="formData.Meeting_result"
                name="Meeting_result"
                id="Meeting_result"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option value="" disabled>เลือกการนัดสัมภาษณ์</option>
                <option value="รอนัดสัมภาษณ์">รอนัดสัมภาษณ์</option>
                <option value="นัดสัมภาษณ์">นัดสัมภาษณ์</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="meeting_type"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ประเภทการสัมภาษณ์</label
              >
              <select
                v-model="formData.Meeting.meeting_type"
                name="meeting_type"
                id="meeting_type"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option value="" disabled>เลือกประเภทการสัมภาษณ์</option>
                <option value="สัมภาษ์ออนไลน์">สัมภาษ์ออนไลน์</option>
                <option value="สัมภาษ์ที่บริษัท">สัมภาษ์ที่บริษัท</option>
              </select>
            </div>

            <div>
              <label
                for="meeting_date"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                วันและเวลาที่นัดหมาย
              </label>
              <input
                v-model="formattedMeetingDate"
                type="datetime-local"
                name="meeting_date"
                id="meeting_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
          </div>
          <div class="flex justify-end mt-6">
            <!-- Save and Close buttons -->
            <button
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Save
            </button>
            <button
              @click.prevent="ModalClose"
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Cancel
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
    results: Object, // รับข้อมูลผลสอบที่จะแก้ไข
  },
  data() {
    return {
      showPopup: true,
      formData: {
        Position_applied: "",
        Score: null,
        Result: "",
        Meeting: {
          meeting_type: "",
          meeting_date: "",
        },
      },
      ExamType: [],
    };
  },

  // Add a computed property to format the date
  computed: {
    formattedMeetingDate: {
      get() {
        return this.formData.Meeting.meeting_date
          ? new Date(this.formData.Meeting.meeting_date)
              .toISOString()
              .slice(0, 16)
          : "";
      },
      set(value) {
        this.formData.Meeting.meeting_date = value;
      },
    },
  },

  created() {
    // นำข้อมูลข้อสอบที่ได้รับมาแสดงในฟอร์มเมื่อคอมโพเนนต์ถูกสร้างขึ้น
    this.formData = { ...this.results };
  },

  mounted() {
    this.fetchPostData();
    this.fetchPostTypes();
  },

  methods: {
    async fetchPostData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/examresults/byid/${
            this.results._id
          }`
        );
        if (response.data.status) {
          this.formData = response.data.data;
          this.formData.Position_applied;
        } else {
          console.error("Error fetching post data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    },

    async fetchPostTypes() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/exam-type`
        );
        if (response.data.status) {
          this.ExamType = response.data.data;
        } else {
          console.error("Error fetching post types:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching post types:", error);
      }
    },

    async updatePost() {
      try {
        const { isConfirmed } = await Swal.fire({
          title: "Confirm Update",
          text: "Are you sure you want to update?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        });

        if (isConfirmed) {
          await axios.put(
            `${
              import.meta.env.VITE_VUE_APP_DECCAN
            }/examresults/update-examresults/${this.results._id}`,
            this.formData // แก้ไขจาก formData เป็น this.formData
          );
          await Swal.fire(
            "Updated!",
            "Exam result has been updated.",
            "success"
          );
          console.log(this.formData);
          this.$emit("editedResults");
          this.$emit("close");
        }
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire("Error!", error.response.data.message, "error");
      }
    },

    ModalClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup-content {
  max-width: 800px;
  width: 90%;
}
</style>
