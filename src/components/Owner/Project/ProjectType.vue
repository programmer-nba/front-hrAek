<template>
  <div>
    <Dialog
      header=" "
      v-model:visible="showAddProjectModal"
      :modal="true"
      class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2"
    >
      <p class="text-center text-xl font-bold">เพิ่มประเภทงาน</p>
      <form>
        <div class="grid gap-6 mb-3">
          <div>
            <label for="code" class="mb-1 font-medium text-gray-900"
              >รหัสงาน
              <span class="text-red-500 px-3"
                >(กำหนดเป็นภาษาอังกฤษพิมพ์ใหญ่ 2-3 ตัว)</span
              ></label
            >
            <input
              v-model="newProject.code"
              type="text"
              id="code"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="PRG, GRP, MKT"
              required
            />
          </div>
          <div>
            <label for="name" class="mb-1 font-medium text-gray-900"
              >ชื่อประเภทงาน <span class="text-red-500 px-3"></span
            ></label>
            <input
              v-model="newProject.name"
              type="text"
              id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="เขียนโปรแกรม, กราฟฟิค, ส่วนรวม"
              required
            />
          </div>
          <div class="w-full overflow-hidden text-sm">
            <label for="roles" class="mb-1 font-medium text-gray-900"
              >สำหรับ<span class="text-red-500 px-3"
                >(ใครสามารถเข้าถึงงานประเภทนี้ได้บ้าง)</span
              ></label
            >
            <MultiSelect
              scrollHeight="400px"
              v-model="newProject.roles"
              :options="groupedRoles"
              optionLabel="label"
              optionGroupLabel="label"
              optionGroupChildren="items"
              display="chip"
              placeholder="เลือกพนักงาน"
              class="w-full md:w-20rem border-1 bg-gray-100"
            >
              <template #optiongroup="slotProps">
                <div class="flex items-center">
                  <div class=" w-full py-1 px-2 rounded">
                    {{ slotProps.option.label }}
                  </div>
                </div>
              </template>
            </MultiSelect>
          </div>
        </div>
        <div class="mb-6 flex justify-center">
          <button
            @click="submitProject"
            class="bg-blue-500 text-white p-2 roundedtransition rounded hover:bg-blue-700"
          >
            บันทึก
          </button>
        </div>
      </form>
    </Dialog>

    <Dialog
      v-model:visible="showEditProjectModal"
      :modal="true"
      class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2"
      header="แก้ไขโปรเจค"
    >
      <form class="px-4 sm:px-10 mt-2 sm:mt-5">
        <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-1">
          <div>
            <label
              for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900"
              >ชื่อโปรเจค</label
            >
            <input
              v-model="editedProject.type_name"
              type="text"
              id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder=""
              required
            />
          </div>
        </div>
        <div class="flex justify-end">
          <button
            @click="submitEditProject"
            class="bg-blue-500 text-white p-2 rounded  hover:bg-blue-700 s"
          >
            ยืนยันการแก้ไข
          </button>
        </div>
      </form>
    </Dialog>

    <div class="flex flex-wrap bg-cyan-200 md:h-[100vh] h-[130vh]">
      <div class="w-full px-3 mb-6 mx-auto">
        <div
          class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-zinc-100 m-5"
        >
          <div class="shadow-xl">
            <!-- card header -->
            <div
              class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent"
            >
              <h3
                class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark"
              >
                <span class="mr-3 font-semibold text-dark text-3xl"
                  >ประเภทงาน</span
                >
              </h3>
            </div>

            <div class="mx-10 py-2 space-y-2">
              <div class="flex sm:justify-start justify-center">
                <button
                  @click="toggleAddProjectModal"
                  class=" text-white rounded p-2 bg-blue-500 "
                >
                  เพิ่มประเภทงาน
                </button>
              </div>
              <div class="">
                <div class="pt-2 relative  text-gray-600">
                  <input
                    v-model="searchQuery"
                    class="border-2 w-full border-gray-300 bg-white h-10 px-3 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="ค้นหา"
                  />
                </div>
              </div>
            </div>

            <div class="flex-auto block py-8 pt-6 rounded-2xl">
              <div class="overflow-x-auto">
                <table
                  class="w-full my-0 align-middle text-slate-600 border-neutral-200"
                >
                  <thead class="align-bottom">
                    <tr class="font-semibold text-xl text-black">
                      <th class="pb-3 text-center min-w-[100px]"></th>
                      <th class="pb-3 text-center min-w-[100px]"></th>
                      <th class="pb-3 text-center min-w-[100px]"></th>
                      <!-- เพิ่มหัวข้อใหม่ -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(projectTypes, index) in filteredProjects"
                      :key="index"
                      class="border-t border-dashed"
                    >
                      <td class="pr-0 text-center">
                        <span
                          class="font-semibold text-light-inverse text-md/normal"
                          >{{ projectTypes.code }}</span
                        >
                      </td>
                      <td class="pr-0 text-center">
                        <span
                          class="font-semibold text-light-inverse text-md/normal"
                          >{{ projectTypes.name }}</span
                        >
                      </td>
                      <td class="pr-0 text-center">
                        <button
                          @click="editProject(projectTypes)"
                          class="px-3 py-2 m-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
                        >
                          แก้ไข
                        </button>
                        <button
                          @click="confirmDelete(projectTypes._id)"
                          class="px-3 py-2 m-1 bg-red-500 text-white rounded-lg hover:bg-red-700"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="flex justify-center mt-4">
                  <button
                    @click="previousPage"
                    :disabled="currentPage === 1"
                    class="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    ก่อนหน้า
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    หน้าถัดไป
                  </button>
                </div>
                <span class="px-4 py-2 flex justify-center"
                  >{{ currentPage }} จาก {{ totalPages }}</span
                >

                <div v-if="isLoading" class="text-center">Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Dialog from "primevue/dialog";
import Swal from "sweetalert2";
import Sidebar from "primevue/sidebar";

export default {
  components: {
    Dialog,
    Sidebar,
  },
  data() {
    return {
      currentPage: 1, // เพิ่ม currentPage
      pageSize: 10, // เพิ่ม pageSize
      searchQuery: "", // เพิ่มตัวแปรสำหรับเก็บค่าการค้นหา
      Detailsvisible: false,
      projects: [],
      employees: [],
      isLoading: false,
      showAddProjectModal: false,
      showEditProjectModal: false, // เพิ่มตัวแปรสำหรับแสดงกล่อง Dialog สำหรับแก้ไข
      newProject: {},
      editedProject: null, // เพิ่มตัวแปรสำหรับเก็บข้อมูลโปรเจคที่แก้ไข
      detailEmployee: null,
      groupedRoles: [
        {
          label: "Germany",
          code: "DE",
          items: [
            { label: "Berlin", value: "Berlin" },
            { label: "Frankfurt", value: "Frankfurt" },
            { label: "Hamburg", value: "Hamburg" },
            { label: "Munich", value: "Munich" },
          ],
        },
      ],
    };
  },
  mounted() {
    this.fetchProjects();
    this.fetchEmployees();
  },
  computed: {
    filteredProjects() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      // กรองข้อมูลโปรเจคตามค่าค้นหา
      const filtered = this.projects.filter((project) => {
        return project.name
          ?.toLowerCase()
          .includes(this.searchQuery?.toLowerCase());
      });

      // คำนวณจำนวนหน้า
      this.totalPages = Math.ceil(filtered.length / this.pageSize);

      // แบ่งหน้า
      return filtered.slice(startIndex, endIndex);
    },
  },
  methods: {
    async fetchEmployees() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (data.status) {
          console.log(data.data);
          this.employees = data.data;
          this.fetchRoles();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async fetchRoles() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/role/getall`
        );
        if (data.status) {
          const originalRoles = data.data;
          console.log(originalRoles);
          this.groupedRoles = originalRoles
            .filter((r) => r.thai_position)
            .map((role) => {
              const result = {
                label: role.thai_position,
                code: role.position?.toLowerCase(),
                items: this.employees
                  .filter(
                    (ee) =>
                      ee.position &&
                      ee.position?.toLowerCase() ===
                        role.position?.toLowerCase()
                  )
                  .map((em) => {
                    return {
                      label: em.first_name,
                      value: em._id,
                    };
                  }),
              };
              return result;
            })
            .reduce((accumulator, current) => {
              if (!accumulator.some((item) => item.label === current.label)) {
                accumulator.push(current);
              }
              return accumulator;
            }, []);
          console.log(this.groupedRoles);
        }
      } catch (err) {
        console.log(err);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async submitEditProject(event) {
      event.preventDefault();

      try {
        this.isLoading = true;
        const response = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types/${
            this.editedProject._id
          }`,
          this.editedProject,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        // แสดง SweetAlert2 แจ้งเตือน
        await Swal.fire({
          icon: "success",
          title: "แก้ไขโปรเจคสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: "project",
          },
        });
        // ปิดกล่อง Dialog สำหรับแก้ไข
        this.showEditProjectModal = false;
        // รีเฟรชรายการโปรเจค
        this.fetchProjects();
      } catch (error) {
        // แสดงข้อความแจ้งเตือนเมื่อมีข้อผิดพลาด
        console.error("Error submitting edited project:", error);
        await Swal.fire({
          icon: "error",
          title: "ไม่สามารถแก้ไขโปรเจคได้",
          text: "กรุณาลองใหม่อีกครั้ง",
        });
      } finally {
        this.isLoading = false;
      }
    },
    editProject(project) {
      this.editedProject = { ...project };
      this.showEditProjectModal = true; // แสดงกล่อง Dialog สำหรับแก้ไข
    },
    viewDetails(project) {
      this.detailEmployee = project;
      this.Detailsvisible = true;
    },
    async confirmDelete(id) {
      const result = await Swal.fire({
        title: "ยืนยันการลบ",
        text: "คุณต้องการที่จะลบโปรเจคนี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        // ถ้าผู้ใช้กดปุ่ม "ลบ"
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types/${id}`,
            {
              headers: { "auth-token": `${localStorage.getItem("token")}` },
            }
          );
          // Notify that the deletion was successful
          await Swal.fire({
            icon: "success",
            text: "ลบประเภทงานสำเร็จ",
            showConfirmButton: false,
            timer: 2000,
          });
          // Reload the project data
          this.fetchProjects();
        } catch (error) {
          // Notify if there's an error deleting
          console.error("Error deleting project:", error);
          await Swal.fire({
            icon: "error",
            title: "ไม่สำเร็จ",
            text: "ไม่สามารถลบโปรเจคได้",
          });
        }
      }
    },

    async fetchProjects() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        this.projects = response.data.data; // Change this line to assign to `this.projects`
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleAddProjectModal() {
      this.showAddProjectModal = !this.showAddProjectModal;
    },

    async submitProject(event) {
      event.preventDefault();
      try {
        this.isLoading = true;
        this.newProject.roles = this.newProject.roles?.map((p) => p.value);
        console.log(this.newProject);
        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types`,
          this.newProject,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        if (response.data.status) {
          this.newProject = {};
          // ปิดกล่อง popup
          this.showAddProjectModal = false;
          // แสดง SweetAlert2 แจ้งเตือน
          Swal.fire({
            icon: "success",
            title: "เพิ่มประเภทงานสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          // รีเฟรชรายการโปรเจค
          this.fetchProjects();
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "ไม่พบประเภทโครงการที่ระบุ"
        ) {
          // Handle specific error condition
          await Swal.fire({
            icon: "error",
            title: "เพิ่มโปรเจคไม่สำเร็จ",
            text: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: "project",
            },
          });
        } else {
          // Handle other errors
          console.error("Error submitting project:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style>
.project {
  z-index: 9999;
  /* กำหนดค่า Z-Index ที่ต้องการ */
}
</style>
