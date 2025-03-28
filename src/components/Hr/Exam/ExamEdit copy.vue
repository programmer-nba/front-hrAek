<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-10 flex justify-center items-center"
  >
    <div
      class="popup-content bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh] text-left"
    >
      <div>
        <form @submit.prevent="updateExamRequest" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-xl font-bold text-gray-800">
              แก้ไขข้อสอบ ตำแหน่ง: {{ formData.extype_id }}
            </h3>
            <!-- Close button -->
            <button
              @click.prevent="ModalClose"
              class="text-gray-500 hover:text-gray-700 focus:outline-none"
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

          <!--<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label
              for="exam_id"
              class="block mb-2 text-sm font-medium text-gray-900"
              >หมายเลขข้อสอบ</label
            >
            <input
              v-model="formData.exam_id"
              type="text"
              name="exam_id"
              id="exam_id"
              class="input-field"
              placeholder="ป้อน หมายเลขข้อสอบ"
              required
              @input="validateNumber"
            />
          </div>
          -->

          <!-- extype_id to display extype_name -->
          <!-- <div>
              <label
                for="extype_id"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ประเภทข้อสอบ</label
              >
              <select v-model="formData.extype_id" class="input-field" required>
                <option value="" disabled>เลือกประเภทข้อสอบ</option>
                <option
                  v-for="type in ExamType"
                  :key="type._id"
                  :value="type.extype_name"
                >
                  {{ type.extype_name }}
                </option>
              </select>
            </div> 
          </div>-->

          <!-- Questions -->
          <div
            v-for="index in 1"
            :key="index"
            class="flex flex-col md:flex-row md:space-x-4"
          >
            <div
              v-for="qIndex in 1"
              :key="qIndex"
              class="col-span-2 flex-grow mb-4"
            >
              <label
                :for="`question_${qIndex}`"
                class="block mb-2 text-sm font-medium text-gray-700"
                >{{ `คำถาม` }}</label
              >
              <textarea
                v-model="formData[`question_${qIndex}`]"
                :name="`question_${qIndex}`"
                :id="`question_${qIndex}`"
                class="input-field h-32"
                :placeholder="`ป้อน คำถาม `"
                required
              ></textarea>
            </div>
          </div>

          <!-- Repeatable fields for choices and their points -->
          <div v-for="index in 4" :key="index" class="flex md:space-x-4">
            <div class="col-span-2 flex-grow mb-4">
              <label
                :for="`c${index}`"
                class="block mb-2 text-sm font-medium text-gray-700"
                >{{ `คำตอบข้อ ${index}` }}</label
              >
              <input
                v-model="formData[`c${index}`]"
                :name="`c${index}`"
                :id="`c${index}`"
                class="input-field"
                :placeholder="`ป้อน คำตอบ`"
                required
              />
            </div>

            <div>
              <label
                :for="`c${index}_point`"
                class="block mb-2 text-sm font-medium text-gray-900"
                >{{ `คะแนนข้อ ${index}` }}
              </label>
              <div class="flex items-center">
                <button
                  type="button"
                  @click="decrementPoint(index)"
                  class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-l transition duration-200"
                >
                  -
                </button>
                <input
                  v-model.number="formData[`c${index}_point`]"
                  :name="`c${index}_point`"
                  :id="`c${index}_point`"
                  type="number"
                  class="input-field text-center w-16"
                  min="0"
                  required
                />
                <button
                  type="button"
                  @click="incrementPoint(index)"
                  class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-r transition duration-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- Save and Close buttons -->
          <div class="p-3 mt-6 text-center space-x-4">
            <button
              type="submit"
              class="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 transition duration-200"
            >
              Save
            </button>
            <button
              @click.prevent="ModalClose"
              class="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 transition duration-200"
            >
              Close
            </button>
          </div>
        </form>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditPopup",
  props: {
    exam: Object, // รับข้อมูลข้อสอบที่จะแก้ไข
  },
  data() {
    return {
      isOpen: false,
      imagePreview: null,
      ExamType: [], // Array to store exam types
      formData: {
        exam_id: "",
        extype_id: "", // Change from extype_id to extype_name
        // Add other formData properties here...
      },
    };
  },
  created() {
    // Populate form data when component is created
    this.formData = { ...this.exam };
  },
  mounted() {
    this.fetchExamTypes(); // Fetch exam types when component mounts
  },
  methods: {
    // Handle image upload
    handleImageUpload() {
      const file = this.$refs.fileInput.files[0];
      this.formData.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    // Fetch exam types
    async fetchExamTypes() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/exam-type`,
          {
            headers: {
              "auth-token": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.status) {
          this.ExamType = response.data.data; // Populate ExamType array
        } else {
          console.error("Error fetching exam types:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching exam types:", error);
      }
    },
    // Update exam request
    async updateExamRequest() {
      try {
        const confirmResult = await Swal.fire({
          title: "Confirm Update",
          text: "Are you sure you want to update?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        });
        if (confirmResult.isConfirmed) {
          const formData = new FormData();
          for (const key in this.formData) {
            if (this.formData.hasOwnProperty(key)) {
              formData.append(key, this.formData[key]);
            }
          }
          const response = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/exam/update-exam/${
              this.formData._id
            }`,
            formData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          {
            await Swal.fire("เพิ่มข้อมูลสําเร็จ!", ".", "success");
            console.log(formData);
          }
          this.$emit("editedExam");
          this.$emit("close");
          console.log(this.formData);
        }
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire("Error!", "Failed to update data", "error");
      }
    },
    // Close modal
    ModalClose() {
      this.$emit("close");
    },
    // Validate input as number
    validateNumber(event) {
      const inputValue = event.target.value;
      const regex = /^[0-9]*$/;
      if (!regex.test(inputValue)) {
        event.target.value = inputValue.replace(/[^0-9]/g, "");
      }
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

.input-field {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5;
}
.button-primary {
  @apply px-4 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none;
}
.button-secondary {
  @apply px-4 py-2 rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none;
}
</style>
