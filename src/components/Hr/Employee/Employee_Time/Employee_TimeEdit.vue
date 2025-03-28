<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
      <h2 class="text-xl font-bold mb-4">แก้ไขข้อมูลพนักงาน</h2>
      <form @submit.prevent="updateEmployee">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">
            ชื่อ-นามสกุล
          </label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            v-model="employeeData.name"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="position">
            ตำแหน่ง
          </label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="position"
            type="text"
            v-model="employeeData.position"
            required
          />
        </div>
        <!-- เพิ่มฟิลด์อื่นๆ ที่ต้องการแก้ไข -->
        <div class="flex justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            บันทึก
          </button>
          <button
            class="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="$emit('close')"
          >
            ปิด
          </button>
        </div>
      </form>
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
  data() {
    return {
      employeeData: {
        name: this.employee.name,
        position: this.employee.position,
        // เพิ่มฟิลด์อื่นๆ ที่ต้องการแก้ไข
      },
    };
  },
  methods: {
    updateEmployee() {
      // เพิ่มลอจิกสำหรับการแก้ไขข้อมูลพนักงาน
      console.log("Updating employee:", this.employeeData);
      // ปิดหน้าต่าง
      this.$emit("close");
    },
  },
};
</script>
