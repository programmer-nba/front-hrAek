<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    v-show="showPopup"
  >
    <div class="popup-content bg-white rounded-lg overflow-auto max-h-[80vh]">
      <div>
        <form @submit.prevent="addPostRequest" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-lg font-semibold">
              เพิ่มผู้สมัคร ตำแหน่ง: {{ formData.Position_applied }}
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
                min="0"
                max="10"
                step="0.1"
              />
              <span class="text-sm text-gray-500">{{
                calculateScore(formData.Score)
              }}</span>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <!-- Save and Close buttons -->
            <button
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded mr-2"
              :disabled="
                !formData.Position_applied ||
                !formData.Score ||
                !formData.Result
              "
            >
              เพิ่มข้อสอบ
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
  name: "AddPopup",
  data() {
    return {
      showPopup: true,
      formData: {
        Position_applied: "",
        Score: null,
        Result: "",
      },
      ExamType: [],
    };
  },

  mounted() {
    this.fetchPostTypes();
  },

  methods: {
    calculateScore(score) {
      if (score === null || score === undefined || score === "") {
        return "";
      } else {
        return score.toFixed() + "";
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

    async addPostRequest() {
      try {
        if (
          !this.formData.Score ||
          this.formData.Score < 0 ||
          this.formData.Score > 10
        ) {
          Swal.fire(
            "Invalid Score",
            "Please enter a score between 0 and 10.",
            "error"
          );
          return;
        } else {
          this.formData.Result = this.calculateScore(this.formData.Score);
        }
        const formData = this.formData;

        await Swal.fire({
          title: "ยืนยันการเพิ่ม",
          text: "คุณแน่ใจหรือไม่ที่จะเพิ่มข้อมูล?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "เพิ่ม",
          cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.post(
              `${
                import.meta.env.VITE_VUE_APP_DECCAN
              }/examresults/insert-examresults/`,
              formData
            );
            {
              await Swal.fire("เพิ่มข้อมูลสําเร็จ!", ".", "success");
              console.log(formData);
            }
            this.$emit("addResults");
            this.$emit("close");
            console.log(this.formData);
          }
        });
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire("Error!", "Failed to update data", "error");
      }
    },

    ModalClose() {
      this.$emit("close");
    },
    resetForm() {
      this.formData = {
        Position_applied: "",
        Score: null,
        Result: "",
      };
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  max-width: 800px;
  width: 90%;
}
</style>
