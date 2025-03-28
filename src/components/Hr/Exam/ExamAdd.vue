<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="popup-content bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh]"
    >
      <div>
        <form @submit.prevent="addExamRequest" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-xl font-bold text-gray-800">
              เพิ่มข้อสอบ ตำแหน่ง: {{ formData.extype_id }}
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
          <div>
            <label class="block text-sm font-medium text-gray-700 mt-2">{{
              `ตำแหน่งย่อย`
            }}</label>
            <!-- <input
              v-model="formData.position"
              placeholder="ป้อนตำแหน่ง Back-end"
              class="my-2 w-64 h-10 border px-2 rounded"
            /> -->
            <Dropdown
              v-model="formData.position"
              :options="examTypeSub"
              filter
              placeholder="เลือกตำแหน่งย่อย"
              optionLabel="position"
              class="border"
            />
          </div>

          <!-- Repeatable fields for questions and answers -->
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
                :placeholder="`ป้อน คำถาม`"
                required
              ></textarea>
            </div>
          </div>

          <!-- Repeatable fields for choices and their points -->
          <div v-for="index in 4" :key="index" class="flex md:space-x-4">
            <div class="w-full flex flex-wrap justify-start items-center gap-2 my-1">
              <label
                :for="`c${index}`"
                class="block text-sm font-medium text-gray-700"
                >{{ `คำตอบข้อ ${index}` }}</label
              >
              <input
                v-model="formData[`c${index}`]"
                :name="`c${index}`"
                :id="`c${index}`"
                class="border rounded px-4 py-2"
                :placeholder="`ป้อน คำตอบ`"
                required
              />
              {{ console.log(formData) }}
              <label
                :for="`c${index}`"
                class="block text-sm font-medium text-gray-700"
                >{{ `คำตอบข้อ ${index}` }}</label
              >
              <div class="border-2 border-gray-300 rounded-full">
                <RadioButton
                  v-model="selectedAnswer"
                  :inputId="`c${index}`"
                  :name="`c${index}`"
                  :value="index"
                  :label="index"
                  class="items-center"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Save and Close buttons -->
          <div class="p-3 mt-6 text-center space-x-4 md:block">
            <button
              type="submit"
              class="button-primary px-4 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
            >
              Save
            </button>
            <button
              @click.prevent="ModalClose"
              class="button-secondary px-4 py-2 rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none"
            >
              Close
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
  props: {
    selectedExamType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedAnswer: 1,
      formData: {
        exam_id: "",
        extype_id: this.selectedExamType, // กำหนดค่าจาก prop ที่รับมา
        question_1: "",
        question_2: "",
        question_3: "",
        c1: "",
        c1_point: 0,
        c2: "",
        c2_point: 0,
        c3: "",
        c3_point: 0,
        c4: "",
        c4_point: 0,
        cr_answer: "",
        em_id: "",
        statusquestion: "1",
        position: "",
        image: "",
      },
      imagePreview: null,
      examType: [],
      examTypeSub: [],
    };
  },
  async mounted() {
    await this.fetchExamTypes();
    await this.fetchMe();
    await this.fetchExamTypes();
  },
  watch: {
    selectedAnswer: function (newAnswer) {
      if (newAnswer) {
        this.formData[`c${newAnswer}_point`] = 1;
      }
      // Clear previous selected answer
      for (let i = 1; i <= 4; i++) {
        if (i !== newAnswer) {
          this.formData[`c${i}_point`] = 0;
        }
      }
    },
  },
  methods: {
    incrementPoint(index) {
      this.formData[`c${index}_point`]++;
    },
    decrementPoint(index) {
      if (this.formData[`c${index}_point`] > 0) {
        this.formData[`c${index}_point`]--;
      }
    },

    handleImageUpload() {
      const file = this.$refs.fileInput.files[0];
      this.formData.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    async fetchMe() {
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
        console.log(data);

        this.formData.em_id = data.data._id;

        console.log(this.formData.em_id);
      } catch (error) {
        console.error("Error fetching current employee:", error);
      }
    },

    async fetchExamTypes() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/exam-type`,
          {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          }
        );
        console.log("exam type", response.data.data);
        this.examTypes = response.data.data;
        const exam = response.data.data.find(
          (item) => item.extype_name === this.formData.extype_id
        );
        this.examTypeSub = exam.extype_sub;
        console.log(this.examTypeSub);
      } catch (error) {
        console.error("Error fetching exam types:", error);
      }
    },

    async addExamRequest() {
      try {
        const { isConfirmed } = await Swal.fire({
          title: "Confirm Add",
          text: "Are you sure you want to add?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        });
        if (!isConfirmed) return;
        console.log(this.formData);
        // return;
        const form = new FormData();
        for (const [key, value] of Object.entries(this.formData)) {
          form.append(key, value);
        }

        const { status } = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/exam/insert-exam`,
          form,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // await Swal.fire("เพิ่มข้อมูลสำเร็จ!", ".", "success");
        Swal.fire({
          title: "success",
          text: "เพิ่มข้อมูลสำเร็จ",
          icon: "success",
          timer: 2500,
        });
        this.$emit("addExam");
        this.$emit("close");

        console.log(this.formData);
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire("Error!", error.message, "error");
      }
    },

    ModalClose() {
      this.$emit("close");
    },
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
  z-index: 1111;
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
