<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-10 flex justify-center items-center"
    @click.self="ModalClose"
    v-show="showPopup"
  >
    <div class="popup-content bg-white rounded-lg overflow-auto max-h-[80vh]">
      <div class="p-6">
        <!-- Modal header -->
        <div class="flex items-center justify-between pb-4 border-b">
          <h3 class="text-lg font-semibold">
            Post Details: {{ formData.Position_applied }}
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
            <p
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            >
              {{ formData.Position_applied }}
            </p>
          </div>

          <div>
            <label
              for="Score"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              คะแนน
            </label>
            <p
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            >
              {{ calculateScore(formData.Score) }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label
              for="Result"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              ผลการสอบ
            </label>
            <p
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            >
              {{ formData.Result }}
            </p>
          </div>

          <div>
            <label
              for="Meeting_result"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              การนัดสัมภาษณ์
            </label>
            <p
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            >
              {{ formData.Meeting_result }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="meeting_type"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              ประเภทการสัมภาษณ์
            </label>
            <p
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            >
              {{ formData.Meeting.meeting_type }}
            </p>
          </div>

          <div>
            <label
              for="meeting_date"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              วันและเวลาที่นัดหมาย
            </label>
            <p
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            >
              {{ formattedMeetingDate }}
            </p>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <!-- Close button -->
          <button
            @click.prevent="ModalClose"
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "EditPopup",
  props: {
    results: Object, // รับข้อมูลผลสอบที่จะแก้ไข
  },
  data() {
    return {
      showPopup: true,
      formData: {
        Result: "",
      },
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

  methods: {
    calculateScore(score) {
      if (score === null || score === undefined || score === "") {
        return "";
      } else {
        return (score / 1).toFixed() + "";
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

