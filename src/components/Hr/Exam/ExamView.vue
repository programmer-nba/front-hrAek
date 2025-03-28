<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-10 flex justify-center items-center"
    @click.self="ModalClose"
    v-show="ViewPopup"
  >
    <div class="popup-content bg-white rounded-lg overflow-auto max-h-[80vh]">
      <div>
        <form @submit.prevent="viewExamRequest" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-lg font-semibold">
              แก้ไขข้อสอบ ตำแหน่ง: {{ formData.extype_id }}
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
            <!-- <div>
              <label
                for="exam_id"
                class="block mb-2 text-sm font-medium text-gray-900"
                >หมายเลขข้อสอบ</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.exam_id }}
              </p>
            </div> -->

            <!-- extype_id to display extype_name -->
            <!-- <div>
              <label
                for="extype_id"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ประเภทข้อสอบ</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.extype_id }}
              </p>
            </div> -->
          </div>

          <div class="flex">
            <div class="col-span-2 flex-grow mb-4 mr-6">
              <label
                for="question_1"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำถามที่ 1</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32"
              >
                {{ formData.question_1 }}
              </p>
            </div>

            <!-- <div class="col-span-2 flex-grow mb-4 mr-6">
              <label
                for="question_2"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำถามที่ 2</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32"
              >
                {{ formData.question_2 }}
              </p>
            </div> -->

            <!-- <div class="col-span-2 flex-grow mb-4">
              <label
                for="question_3"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำถามที่ 3</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32"
              >
                {{ formData.question_3 }}
              </p>
            </div> -->
          </div>

          <div class="grid gap-6 mb-6 md:grid-cols-4">
            <div class="col-span-2">
              <label
                for="c1"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบข้อ 1</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.c1 }}
              </p>
            </div>

            <div class="col-span-2">
              <label
                for="c1_point"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คะแนนข้อ 1</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.c1_point }}
              </p>
            </div>

            <div class="col-span-2">
              <label
                for="c2"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบข้อ 2</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.c2 }}
              </p>
            </div>

            <div class="col-span-2">
              <label
                for="c2_point"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คะแนนข้อ 2</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.c2_point }}
              </p>
            </div>

            <div class="col-span-2">
              <label
                for="c3"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบข้อ 3</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.c3 }}
              </p>
            </div>

            <div class="col-span-2">
              <label
                for="c3_point"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คะแนนข้อ 3</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คะแนน"
                required=""
                @input="validateNumber"
              >
                {{ formData.c3_point }}
              </p>
            </div>

            <div class="col-span-2">
              <label
                for="c4"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบข้อ 4</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.c4 }}
              </p>
            </div>

            <div class="col-span-2">
              <label
                for="c4_point"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คะแนนข้อ 4</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.c4_point }}
              </p>
            </div>
            <!-- 
            <div class="col-span-2">
              <label
                for="cr_answer"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบที่ถูก</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คำตอบที่ถูก"
              >
                {{ formData.cr_answer }}
              </p>
            </div> -->

            <!-- em_id to display em_firstname && em_lastname -->
            <div class="col-span-2">
              <label
                for="em_id"
                class="block mb-2 text-sm font-medium text-gray-900"
                >พนักงาน</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.em_id }}
              </p>
            </div>

            <!-- <div class="col-span-2">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900"
                >รูปภาพปัจจุบัน</label
              >
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-150 p-2.5"
              >
            <img
                  v-if="formData.image"
                  :src="
                    'https://drive.google.com/thumbnail?id=' + formData.image
                  "
                  alt="Uploaded Image"
                  class="mt-2 max-w-150 h-150"
                />
             </p>
            </div>  -->
          </div>

          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <button
              @click.prevent="ModalClose"
              class="mb-2 md:mb-0 bg-gray-500 border border-gray-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
      <!-- เช่น ข้อความ รูปภาพ หรือ Component อื่นๆ -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewPopup",
  props: {
    exam: Object, // รับข้อมูลข้อสอบที่จะแสดง
  },
  data() {
    return {
      ViewPopup: true,
    };
  },

  created() {
    // นำข้อมูลข้อสอบที่ได้รับมาแสดงในฟอร์มเมื่อคอมโพเนนต์ถูกสร้างขึ้น
    this.formData = { ...this.exam };
  },

  methods: {
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
