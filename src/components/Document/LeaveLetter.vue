<template>
  <div class="p-4 w-full h-screen overflow-auto bg-sky-100">
    <div class="flex justify-end">
      <ButtonP
        @click="visibleAdd = true"
        label="เพิ่มประเภท"
        icon="pi pi-plus"
        class="px-3 py-2 rounded text-white bg-teal-500 hover:bg-teal-700"
      />
    </div>
    <div class="flex justify-center mt-2">
      <table>
        <thead>
          <tr class="text-center bg-sky-300 border-b-4 border-blue-500">
            <th class="p-2">ลำดับ</th>
            <th class="p-2">ประเภท</th>
            <th class="p-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in itemLeave"
            :key="index"
            class="border-b-2 border-blue-500"
          >
            <td class="p-2">{{ index + 1 }}</td>
            <td class="p-2">{{ item.leavetype_name }}</td>
            <td class="p-2">
              <div class="flex flex-wrap gap-1">
                <ButtonP
                  @click="editLeave(1, item)"
                  label="แก้ไข"
                  class="px-3 py-2 rounded text-white bg-orange-500 hover:bg-orange-700"
                />
                <ButtonP
                  @click="removeLeave(item)"
                  label="ลบ"
                  class="px-3 py-2 rounded text-white bg-red-500 hover:bg-red-700"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Dialog
      v-model:visible="visibleAdd"
      modal
      header="ประเภทลา"
      @hide="(formData = {}), (updateEdit = false)"
    >
      <div class="flex flex-col gap-1">
        <div class="text-xl font-bold">ประเภท</div>
        <InputText
          v-model="formData.leavetype_name"
          placeholder="ประเภท"
          class="px-3 py-2 border-2 border-blue-500"
        />
      </div>
      <template #footer>
        <div class="w-full flex justify-center gap-1">
          <ButtonP
            v-if="updateEdit === false"
            label="บันทึก"
            icon="pi pi-check"
            class="px-3 py-2 rounded text-white bg-teal-500 hover:bg-teal-700"
            @click="addLeavetype"
          />
          <ButtonP
            v-if="updateEdit === true"
            label="อัพเดต"
            icon="pi pi-check"
            class="px-3 py-2 rounded text-white bg-blue-500 hover:bg-blue-700"
            @click="editLeave(2)"
          />
          <ButtonP
            label="ยกเลิก"
            icon="pi pi-times"
            class="px-3 py-2 rounded text-white bg-red-500 hover:bg-red-700"
            @click="visibleAdd = false"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

onMounted(() => {
  getLeavetype();
});

const formData = ref({});

const itemLeave = ref([]);
const getLeavetype = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leavetype/getall`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    itemLeave.value = res.data.data;
    console.log("itemLeave", itemLeave.value);
  } catch (e) {
    console.log(e);
  }
};

const visibleAdd = ref(false);
const addLeavetype = async () => {
  try {
    const data = {
      leavetype_name: formData.value.leavetype_name,
      leavetype_default: "",
    };
    const res = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leavetype/insert`,
      data,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("leavetype/add", res);
    visibleAdd.value = false;
    Swal.fire({
      icon: "success",
      text: "เพิ่มประเภทเรียบร้อย",
      showConfirmButton: false,
      timer: 1500,
    });
    getLeavetype();
  } catch (e) {
    console.log(e);
  }
};

const updateEdit = ref(false);
const editLeave = async (wid, item) => {
  try {
    if (wid === 1) {
      updateEdit.value = true;
      formData.value = item;
      visibleAdd.value = true;
    }
    if (wid === 2) {
      const data = {
        leavetype_name: formData.value.leavetype_name,
        leavetype_default: "",
      };
      const res = await axios.put(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/leavetype/update/${
          formData.value._id
        }`,
        data,
        {
          headers: {
            "auth-token": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("leavetype/update", res);
      visibleAdd.value = false;
      Swal.fire({
        icon: "success",
        text: "อัพเดตประเภทเรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      });
      getLeavetype();
    }
  } catch (e) {
    console.log(e);
  }
};

const removeLeave = async (item) => {
  try {
    const check = await Swal.fire({
      icon: "warning",
      text: "ต้องการลบข้อมูลใช่หรือไม่",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });
    if (!check.isConfirmed) return;

    const res = await axios.delete(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/leavetype/delete/${item._id}`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("leavetype/remove", res);
    Swal.fire({
      icon: "success",
      text: "ลบประเภทเรียบร้อย",
      showConfirmButton: false,
      timer: 1500,
    });
    getLeavetype();
  } catch (e) {
    console.log(e);
  }
};
</script>
<style scoped></style>
