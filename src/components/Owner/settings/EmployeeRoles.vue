<template>
  <div>
    <Toast />
    <div class="border bg-white  shadow-md p-4">
      <div class="flex gap-x-2 items-center pb-3">
        <p class="font-bold m-0">ตำแหน่งพนักงาน</p>
        <ButtonP icon="pi pi-plus" @click="createModalHandle" :class="[
          'w-7 h-7 focus:outline-0 focus:ring-0 rounded-full',
          visible ? 'bg-sky-600 text-white' : '',
        ]" />
        <ButtonP icon="pi pi-cog" @click="edittings = !edittings" :class="[
          'w-7 h-7 focus:outline-0 focus:ring-0 rounded-full',
          edittings ? 'bg-sky-600 text-white' : '',
        ]" />
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full table-fixed">
          <thead class="font-bold border-b border-b-black">
            <tr>
              <th class="px-4 py-2">ระดับ</th>
              <th class="px-4 py-2">ตำแหน่ง</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role._id">
              <td class="px-4 py-2">
                <a class="m-0 truncate">{{ role.thai_role }}</a> ({{ role.role }})
              </td>
              <td class="px-4 py-2">
                <a class="m-0 truncate">{{ role.thai_position || "" }}</a>
                ({{ role.position }})
              </td>
              <td class="px-4 py-2 text-end">
                <ButtonP icon="pi pi-pencil text-orange-500" :class="[!edittings ? 'hidden' : '']" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>

    <Dialog v-model:visible="visible" modal header="เพิ่มตำแหน่ง" :style="{ width: '25rem' }">
      <div class="flex flex-col test-start items-center gap-2 ">
        <label for="Abbreviation" class="font-semibold w-full">CODE <small class="font-normal">(EN)</small></label>
        <InputText id="Abbreviation" :class="[
          'flex-auto w-full p-2 border',
          requires.includes('Abbreviation') ? 'ring-red-500 ring-2' : '',
        ]" autocomplete="off" placeholder="H-FD, BD" v-model="role.Abbreviation" />
      </div>

      <div class="flex gap-2 ">
        <div class="flex flex-col test-start items-center gap-2 mt-2 mb-3">
          <label for="thai_role" class="font-semibold w-full">ระดับ <small class="font-normal">(ไทย)</small></label>
          <InputText id="thai_role" :class="[
            'flex-auto w-full p-2 border',
            requires.includes('thai_role') ? 'ring-red-500 ring-2' : '',
          ]" autocomplete="off" placeholder="หัวหน้า, พนักงาน" v-model="role.thai_role" />
        </div>
        <div class="flex flex-col test-start items-center gap-2 mt-2 mb-3">
          <label for="role" class="font-semibold w-full">ระดับ <small class="font-normal">(EN)</small></label>
          <InputText id="role" :class="[
            'flex-auto w-full p-2 border',
            requires.includes('role') ? 'ring-red-500 ring-2' : '',
          ]" autocomplete="off" placeholder="head, employee" v-model="role.role" />
        </div>
      </div>

      <div class="flex gap-2">
        <div class="flex flex-col test-start items-center gap-2 mt-2 mb-3">
          <label for="thai_position" class="font-semibold w-full">ตำแหน่ง <small
              class="font-normal">(ไทย)</small></label>
          <InputText id="thai_position" :class="[
            'flex-auto w-full p-2 border',
            requires.includes('thai_position') ? 'ring-red-500 ring-2' : '',
          ]" autocomplete="off" placeholder="ฟร้อนเอนด์, แบ็คเอนด์" v-model="role.thai_position" />
        </div>
        <div class="flex flex-col test-start items-center gap-2 mt-2 mb-3">
          <label for="position" class="font-semibold w-full">ตำแหน่ง <small class="font-normal">(EN)</small></label>
          <InputText id="position" :class="[
            'flex-auto w-full p-2 border',
            requires.includes('position') ? 'ring-red-500 ring-2' : '',
          ]" autocomplete="off" placeholder="frontend, backend" v-model="role.position" />
        </div>
      </div>
      <div class="flex justify-end gap-5 mt-2 border-t pt-3">
        <ButtonP type="button" label="ยกเลิก" severity="secondary" @click="visible = false"></ButtonP>
        <ButtonP :loading="loading" type="button" class="bg-sky-600 text-white px-3 py-1 rounded" label="บันทึก"
          @click="createRole"></ButtonP>
      </div>
    </Dialog>
  </div>
</template>
<script>
import axios from "axios";

const URL = import.meta.env.VITE_VUE_APP_DECCAN;
const AUTH_TOKEN = { "auth-token": localStorage.getItem("token") };

export default {
  data() {
    return {
      requires: [],
      loading: false,
      roles: [],
      role: {},
      permissions: [],
      edittings: false,
      editting: false,
      visible: false,
    };
  },
  computed: {},
  methods: {
    async fetchRoles() {
      this.loading = true;
      try {
        const { data } = await axios.get(`${URL}/role/getall`, {
          headers: AUTH_TOKEN,
        });
        if (data.status) {
          this.roles = [...data.data];
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    createModalHandle() {
      (this.editting = false), (this.edittings = false);
      this.role = {};

      this.visible = true;
    },
    updateModalHandle(data) {
      (this.editting = true), (this.role = { ...data });

      this.visible = true;
    },
    async createRole() {
      if (!this.requiresCheck()) return;
      this.loading = true;
      const payload = {
        role: this.role.role,
        thai_role: this.role.thai_role,
        position: this.role.position,
        thai_position: this.role.thai_position,
        Abbreviation: this.role.Abbreviation,
        number_role: this.role.number_role,
        permissions: this.permissions,
      };
      try {
        const { data } = await axios.post(`${URL}/role/create`, payload, {
          headers: AUTH_TOKEN,
        });
        if (data.status) {
          this.toastSuccess("เพิ่มตำแหน่งใหม่แล้ว");
          this.fetchRoles();
          this.requires = [];
          this.visible = false;
        }
      } catch (err) {
        console.log(err);
        this.toastError("ไม่สามารถเพิ่มตำแหน่งได้");
      } finally {
        this.loading = false;
      }
    },
    toastSuccess(detail) {
      this.$toast.add({
        severity: "success",
        summary: "สำเร็จ",
        detail: detail,
        life: 3000,
      });
    },
    toastError(detail) {
      this.$toast.add({
        severity: "error",
        summary: "เกิดข้อผิดพลาด",
        detail: detail,
        life: 3000,
      });
    },
    requiresCheck() {
      if (!this.role.Abbreviation) {
        this.requires.push("Abbreviation");
      }
      if (!this.role.role) {
        this.requires.push("role");
      }
      if (!this.role.thai_role) {
        this.requires.push("thai_role");
      }
      if (!this.role.position) {
        this.requires.push("position");
      }
      if (!this.role.thai_position) {
        this.requires.push("thai_position");
      }
      if (
        !this.role.Abbreviation ||
        !this.role.role ||
        !this.role.thai_role ||
        !this.role.position ||
        !this.role.thai_position
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.fetchRoles();
  },
};
</script>
<style scoped></style>
