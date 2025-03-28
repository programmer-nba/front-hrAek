<template>
  <div class="p-4 w-full h-screen overflow-auto bg-sky-100">
    <div class="text-center text-2xl font-bold text-blue-700 mb-4">
      ตั้งค่าบันทึกเอกสาร
    </div>

    <div class="flex justify-between items-center gap-2 mb-3">
      <div class="flex items-center gap-2">
        <!-- <InputText
          v-model="searchLeave"
          class="px-3 py-[12px] border-2 border-blue-500"
          placeholder="ค้นหา"
        />
        <div class="text-xl font-bold">ประเภท</div>
        <Dropdown
          v-model="typeselect"
          :options="leavetype"
          optionLabel="name"
          optionValue="type"
          placeholder="เลือกประเภท"
          class="text-sm rounded-lg border-2 border-blue-500"
        /> -->
      </div>
      <div class="flex items-center gap-1">
        <ButtonP
          @click="openTypeDocs = true"
          label="เพิ่มบันทึกเอกสาร"
          class="px-3 py-[12px] bg-blue-500 hover:bg-blue-700 text-white rounded"
        />
        <ButtonP
          @click="openApprove = true"
          label="ผู้อนุมัติ"
          class="px-3 py-[12px] bg-violet-500 hover:bg-violet-700 text-white rounded"
        />
      </div>
    </div>

    <div class="md:flex justify-center">
      <table class="shadow-lg">
        <thead>
          <tr class="text-center bg-sky-300 border-b-4 border-blue-500">
            <th class="px-4 py-2">ลำดับ</th>
            <th class="px-4 py-2">รหัส</th>
            <th class="px-4 py-2">ประเภท</th>
            <th class="px-4 py-2">ผู้อนุมัติเอกสาร</th>
            <!-- <th class="px-4 py-2">รายละเอียด</th> -->
            <th class="px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {{
            console.log("itemRecord", itemRecord)
          }}
          <tr
            v-for="(item, index) in itemRecord"
            :key="index"
            class="border-b-2 border-blue-500"
          >
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ item.type_number }}</td>
            <td class="px-4 py-2">{{ item.type_name }}</td>
            <td class="px-4 py-2">
              <div class="flex justify-center">
                <ButtonP
                  @click="updateApproveFlow(1, item)"
                  class="px-3 py-1 text-white bg-sky-500 hover:bg-sky-700 shadow rounded"
                >
                  <a v-if="item.approve_flow.length > 0">
                    <ul class="list-none text-start">
                      <li v-for="(flow, i) in item.approve_flow" :key="i">
                        {{ flow.thai_role }}
                        <a v-if="flow.position" class="mx-1 text-blue-500">
                          ({{ flow.position }})
                        </a>
                      </li>
                    </ul>
                  </a>
                  <a v-else>เพิ่มผู้อนุมัติ</a>
                </ButtonP>
              </div>
              <!-- <div v-if="item.approve_flow.length > 0">
                <ul class="list-none">
                  <li v-for="(flow, i) in item.approve_flow" :key="i">
                    {{ flow.thai_role }}
                    <a v-if="flow.position" class="mx-1 text-blue-500">
                      ({{ flow.position }})
                    </a>
                  </li>
                </ul>
              </div>
              <div v-else>-</div> -->
            </td>
            <!-- <td class="px-4 py-2">
              <div class="flex justify-center items-center gap-1">
                <ButtonP
                  @click="$router.push({ name: 'LeaveLetter' })"
                  label="ดูรายละเอียด"
                  class="px-3 py-2 rounded text-white bg-blue-500 hover:bg-blue-700"
                />
              </div>
            </td> -->
            <td class="px-4 py-2">
              <div class="flex justify-center items-center gap-1">
                <ButtonP
                  @click="editDocsType(1, item)"
                  label="แก้ไข"
                  class="px-3 py-2 rounded text-white bg-orange-500 hover:bg-orange-700"
                />
                <ButtonP
                  @click="removeDocsType(item)"
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
      v-model:visible="openTypeDocs"
      modal
      header="ประเภทบันทึก"
      @hide="resetValue"
      style="max-width: 300px"
    >
      <div class="px-2">
        <!-- {{ console.log("itemRole", itemRole) }} -->
        <!-- {{ console.log("formData", formData.approve_flow) }} -->
        <!-- <div class="text-xl font-bold mb-1">ผู้เห็นบันทึก</div>
        <Dropdown
          v-model="formData.approve_flow"
          :options="itemRole"
          optionLabel="thai_role"
          placeholder="เลือกผู้เห็นบันทึก"
          class="w-[235px] border-2 border-blue-500 mb-2"
          @change="getRole()"
        />
        <div v-if="formData.approve_flow" class="mb-2">
          {{ formData.approve_flow.thai_role }}({{
            formData.approve_flow.role
          }})
        </div>
        <Dropdown
          v-if="itemPosition.length > 0"
          v-model="formData.position"
          :options="itemPosition"
          optionLabel="thai_position"
          placeholder="เลือกผู้เห็นบันทึก"
          class="w-[235px] border-2 border-blue-500 mb-2"
        />
        <div
          v-if="formData.position && formData.position.position"
          class="mb-2"
        >
          {{ formData.position.thai_position }}
          ({{ formData.position.position }})
        </div> -->
        <!-- <div class="border-b-2 border-blue-500 mb-2"></div> -->
        <!-- <MultiSelect
          v-model="formData.approve_flow"
          :options="itemRole"
          optionLabel="thai_role"
          placeholder="เลือกผู้เห็นบันทึก"
          class="w-[235px] border-2 border-blue-500 mb-2"
        />
        <div v-if="formData.approve_flow" class="mb-2">
          <div v-for="(fl, i) in formData.approve_flow" :key="i">
            {{ fl.thai_role }}({{ fl.role }})
          </div>
        </div> -->

        <div class="text-xl font-bold mb-1">ประเภทหลัก</div>
        <InputText
          v-model="formData.type_number"
          placeholder="หมายเลขบันทึกข้อความ"
          class="px-3 py-[12px] border-2 border-blue-500 mb-2"
        />
        <InputText
          v-model="formData.type_name"
          placeholder="บันทึกข้อความทั่วไป"
          class="px-3 py-[12px] border-2 border-blue-500 mb-2"
        />
      </div>
      <template #footer>
        <ButtonP
          v-if="updateType === false"
          @click="addTypeDocs"
          label="บันทึก"
          class="px-3 py-2 rounded text-white bg-green-500 hover:bg-green-700"
        />
        <ButtonP
          v-if="updateType === true"
          @click="editDocsType(2)"
          label="อัพเดต"
          class="px-3 py-2 rounded text-white bg-blue-500 hover:bg-blue-700"
        />
        <buttonP
          @click="openTypeDocs = false"
          label="ยกเลิก"
          class="px-3 py-2 rounded text-white bg-gray-500 hover:bg-gray-700"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="openUpFlow"
      modal
      header="ผู้เห็นบันทึก"
      @hide="resetValue"
      style="max-width: 300px"
    >
      <div class="px-2">
        <!-- {{ console.log("itemRole", itemRole) }} -->
        <!-- {{ console.log("formData", formData.approve_flow) }} -->

        <MultiSelect
          v-model="formData.approve_flow"
          :options="itemRole"
          optionLabel="thai_role"
          placeholder="เลือกผู้เห็นบันทึก"
          class="w-[235px] border-2 border-blue-500 mb-2"
        />
        <div v-if="formData.approve_flow" class="mb-2">
          <div
            v-for="(flow, index) in formData.approve_flow"
            :key="index"
            class="flex flex-col border-b-2 border-gray-900 gap-2"
          >
            <div class="mt-2">{{ flow.thai_role }}</div>
            <div>({{ flow.role }})</div>
            <Dropdown
              v-model="flow.position"
              :options="positionsForRole[flow.role]"
              optionLabel="position"
              optionValue="position"
              placeholder="เลือกตำแหน่ง"
              class="h-8 w-[235px] items-center border-2 border-blue-500 mb-2"
            />
            <!-- <div v-if="flow.position">{{ flow.position.thai_position }}</div> -->
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex gap-1">
          <ButtonP
            @click="editDocsType(2)"
            label="อัพเดต"
            class="px-3 py-2 rounded text-white bg-blue-500 hover:bg-blue-700"
          />
          <buttonP
            @click="openUpFlow = false"
            label="ยกเลิก"
            class="px-3 py-2 rounded text-white bg-gray-500 hover:bg-gray-700"
          />
        </div>
      </template>
    </Dialog>

    <Dialog v-model:visible="openApprove" modal header="จัดการผู้อนุมัติ">
      <div class="w-full px-2">
        <!-- {{ console.log(itemRole) }} -->
        <div class="text-xl font-bold mb-1">รายการผู้เห็นบันทึก</div>
        <table class="w-full mb-2">
          <thead>
            <tr class="border-b-4 border-blue-500">
              <th class="p-2">ROLE</th>
              <th class="p-2">THAIROLE</th>
              <th class="p-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in itemRole"
              :key="index"
              class="border-b-2 border-blue-500"
            >
              <td class="p-2">{{ item.role }}</td>
              <td class="p-2">{{ item.thai_role }}</td>
              <td class="p-2">
                <div class="flex flex-wrap gap-1">
                  <ButtonP
                    @click="editRole(1, item)"
                    label="แก้ไข"
                    class="p-2 rounded text-white bg-orange-500 hover:bg-orange-700"
                  />
                  <ButtonP
                    @click="removeRole(item)"
                    label="ลบ"
                    class="p-2 rounded text-white bg-red-500 hover:bg-red-700"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ButtonP
          @click="visibleaddRole = true"
          label="เพิ่ม"
          class="w-full px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-700"
        />
      </div>
    </Dialog>

    <Dialog
      v-model:visible="visibleaddRole"
      modal
      header="ผู้เห็นบันทึก"
      @hide="resetValue"
    >
      <div class="px-2 w-full flex flex-col gap-1">
        <div class="text-xl font-bold">ตำแหน่ง</div>
        <InputText
          v-model="formData.role"
          placeholder="employee"
          class="px-3 py-2 border-2 border-blue-500"
        />
        <InputText
          v-model="formData.thai_role"
          placeholder="พนักงาน"
          class="px-3 py-2 border-2 border-blue-500"
        />
      </div>
      <template #footer>
        <ButtonP
          v-if="updateRole === false"
          @click="addRole"
          label="บันทึก"
          class="px-3 py-2 rounded text-white bg-green-500 hover:bg-green-700"
        />
        <ButtonP
          v-if="updateRole === true"
          @click="editRole(2)"
          label="อัพเดต"
          class="px-3 py-2 rounded text-white bg-blue-500 hover:bg-blue-700"
        />
        <buttonP
          @click="visibleaddRole = false"
          label="ยกเลิก"
          class="px-3 py-2 rounded text-white bg-gray-500 hover:bg-gray-700"
        />
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { options } from "preact";

onMounted(() => {
  getMe();
  getRecord();
  getAllRoll();
});

const formData = ref({});

const itemMe = ref([]);
const getMe = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    itemMe.value = res.data.data;
    console.log("itemMe", itemMe.value);
  } catch (e) {
    console.log(e);
  }
};

const itemRecord = ref([]);
const getRecord = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/record/type/getAll`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    itemRecord.value = res.data.data;
    console.log("itemRecord", itemRecord.value);
  } catch (e) {
    console.log(e);
  }
};

const itemRole = ref([]);
// const roleValue = ref([]);
const getAllRoll = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/record/flow/getAll`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    itemRole.value = res.data.data;
    console.log("itemRole", itemRole.value);
  } catch (e) {
    console.log(e);
  }
};

// const position = ref("");
const itemPosition = ref([]);
const getRole = async () => {
  try {
    let data = { role: formData.value.approve_flow.role };
    // console.log("data", formData.value.approve_flow);
    const res = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/role/getrole`,
      data,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    formData.value.position = {};
    itemPosition.value = res.data.data;
    console.log("getRole", itemPosition.value);
  } catch (e) {
    console.log(e);
  }
};

const visibleaddRole = ref(false);
const addRole = async () => {
  try {
    const data = {
      role: formData.value.role,
      thai_role: formData.value.thai_role,
    };
    if (!data.role || !data.thai_role) {
      Swal.fire({
        icon: "warning",
        text: "กรุณากรอกข้อมูลให้ครบ",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    const res = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/record/flow/post`,
      data,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("addRole", res);
    visibleaddRole.value = false;
    getAllRoll();
    Swal.fire({
      icon: "success",
      text: "บันทึกข้อมูลสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (e) {
    console.log("addRole", e);
  }
};

const updateRole = ref(false);
const editRole = async (wid, item) => {
  try {
    if (wid === 1) {
      updateRole.value = true;
      formData.value = item;
      visibleaddRole.value = true;
    }
    if (wid === 2) {
      const data = {
        role: formData.value.role,
        thai_role: formData.value.thai_role,
      };
      if (!data.role || !data.thai_role) {
        Swal.fire({
          icon: "warning",
          text: "กรุณากรอกข้อมูลให้ครบ",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }
      const res = await axios.put(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/record/flow/update/${
          formData.value._id
        }`,
        data,
        {
          headers: {
            "auth-token": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("addRole", res);
      visibleaddRole.value = false;
      getAllRoll();
      Swal.fire({
        icon: "success",
        text: "บันทึกข้อมูลสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
const removeRole = async (item) => {
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
      `${import.meta.env.VITE_VUE_APP_DECCAN}/record/flow/del/${item._id}`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("removeRole", res);
    getAllRoll();
    Swal.fire({
      icon: "success",
      text: "ลบข้อมูลสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (e) {
    console.log(e);
  }
};

const openApprove = ref(false);
const openTypeDocs = ref(false);
const addTypeDocs = async () => {
  try {
    const data = {
      type_name: formData.value.type_name,
      type_number: formData.value.type_number,
      approve_flow: formData.value.approve_flow || [],
    };
    for (let key of Object.keys(data)) {
      // console.log(key);
      if (!data[key]) {
        Swal.fire({
          icon: "warning",
          text: "กรุณากรอกข้อมูลให้ครบ",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }
    }
    // return;
    const check = await Swal.fire({
      title: "คุณต้องการบันทึกหรือไม่?",
      text: "ตรวจสอบข้อมูลที่กรอก",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });
    if (!check.isConfirmed) return;

    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/record/type/post`,
      data,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    Swal.fire({
      icon: "success",
      text: "บันทึกข้อมูลสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
    console.log("addTypeDocs", response);
    openTypeDocs.value = false;
    getRecord();
  } catch (e) {
    console.log(e);
  }
};

const updateType = ref(false);
const editDocsType = async (wid, item) => {
  try {
    if (wid === 1) {
      updateType.value = true;
      const matchingRoles = itemRole.value.filter((fil) =>
        item.approve_flow.some((flow) => fil.role === flow.role)
      );
      formData.value = {
        ...item,
        approve_flow: matchingRoles,
      };
      console.log("editDocsType", formData.value);
      openTypeDocs.value = true;
    } else if (wid === 2) {
      const data = {
        type_name: formData.value.type_name,
        type_number: formData.value.type_number,
        approve_flow: formData.value.approve_flow || [],
      };
      for (let key of Object.keys(data)) {
        if (!data[key]) {
          Swal.fire({
            icon: "warning",
            text: "กรุณากรอกข้อมูลให้ครบ",
            timer: 1500,
            showConfirmButton: false,
          });
          return;
        }
      }
      console.log("editDocsType", data);
      // return;
      const response = await axios.put(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/record/type/update/${
          formData.value._id
        }`,
        data,
        {
          headers: {
            "auth-token": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: "บันทึกข้อมูลสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });
      console.log("addTypeDocs", response);
      openTypeDocs.value = false;
      openUpFlow.value = false;
      getRecord();
    }
  } catch (e) {
    console.log(e);
  }
};
const removeDocsType = async (item) => {
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
      `${import.meta.env.VITE_VUE_APP_DECCAN}/record/type/del/${item._id}`,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("removeDocsType", res);
    getRecord();
    Swal.fire({
      icon: "success",
      text: "ลบข้อมูลสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (e) {
    console.log(e);
  }
};

const openUpFlow = ref(false);
const updateApproveFlow = async (wid, item) => {
  try {
    // return;
    if (wid === 1) {
      const matchingRoles = itemRole.value.filter((fil) =>
        item.approve_flow.some((flow) => fil.role === flow.role)
      );
      formData.value = {
        ...item,
        approve_flow: matchingRoles,
      };
      console.log("item", item);
      console.log("matchingRoles", matchingRoles);
      console.log("updateApproveFlow", formData.value);

      for (const fl of formData.value.approve_flow) {
        // console.log("fl", fl.role);
        await getOnePosition(fl.role); // Fetch positions for the current role
      }
      // formData.value = { ...item };
      openUpFlow.value = true;
    }
  } catch (e) {
    console.log(e);
  }
};

const positionsForRole = ref({});
const getOnePosition = async (role) => {
  try {
    const data = {
      role: role,
    };
    const res = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/role/getrole`,
      data,
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("getOnePosition", res);
    positionsForRole.value[role] = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const resetValue = () => {
  updateRole.value = false;
  updateType.value = false;
  formData.value = {};
};
</script>
<style scoped>
.p-checkbox {
  width: auto;
  height: auto;
}
</style>
<style scoped>
ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 0em;
}
</style>
