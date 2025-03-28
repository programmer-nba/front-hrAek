<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
      <h2 class="text-xl font-bold mb-4">ข้อมูลพนักงาน</h2>
      <div class="mb-4">
        <p class="text-gray-700 font-bold">ชื่อ-นามสกุล: {{ employee.name }}</p>
        <p class="text-gray-700">ตำแหน่ง: {{ employee.position }}</p>
        <!-- แสดงข้อมูลอื่นๆ ที่ต้องการ -->
      </div>
      <div class="flex justify-end">
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="$emit('close')"
        >
          ปิด
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
};
</script>
