<template>
  <div>
    <Dialog v-model:visible="isAddFileSurveyArea" :modal="true" class="w-1/2"
      header="สมัครสมาชิก">
      <form class="px-4 sm:px-10 mt-2 sm:mt-5">
        <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-2">

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ตำแหน่งงานที่สมัคร</label>
            <select v-model="newProject.type" @change="fetchEmployees" id="projectType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>จังหวัด</option>
              <option v-for="pType in projectTypes" :key="pType._id" :value="pType">
                {{ pType.name }}
              </option>
            </select>
          </div>
<div>
</div>
        <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อ</label>
            <input v-model="newProject.title" type="text" id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">นามสกุล</label>
            <input v-model="newProject.title" type="text" id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เบอร์โทรศัพท์</label>
            <input v-model="newProject.title" type="text" id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ไอดีชื่อผู้ใช้</label>
            <input v-model="newProject.title" type="text" id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รหัสผ่าน</label>
            <input v-model="newProject.title" type="password" id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ยืนยันรหัสผ่าน</label>
            <input v-model="newProject.title" type="password" id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">อีเมล</label>
            <input v-model="newProject.title" type="email" id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เลขบัตรประชาชน</label>
            <input v-model="newProject.title" type="text" id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="datePicker"class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เกิดวันที่:</label>
            <input type="date" v-model="selectedDate" id="datePicker">
          </div>

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ที่อยู่ตามบัตรประชาชน</label>
            <input v-model="newProject.title" type="text" id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="projectType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">จังหวัด</label>
            <select v-model="newProject.type" @change="fetchEmployees" id="projectType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>จังหวัด</option>
              <option v-for="pType in projectTypes" :key="pType._id" :value="pType">
                {{ pType.name }}
              </option>
            </select>
          </div>

            <div>
            <label for="projectType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">อำเภอ</label>
            <select v-model="newProject.type" @change="fetchEmployees" id="projectType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>อำเภอ</option>
              <option v-for="pType in projectTypes" :key="pType._id" :value="pType">
                {{ pType.name }}
              </option>
            </select>
          </div>

          <div>
            <label for="projectType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ตำบล</label>
            <select v-model="newProject.type" @change="fetchEmployees" id="projectType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>ตำบล</option>
              <option v-for="pType in projectTypes" :key="pType._id" :value="pType">
                {{ pType.name }}
              </option>
            </select>
          </div>

          <div>
            <label for="projectType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รหัสไปรษณีย์</label>
            <select v-model="newProject.type" @change="fetchEmployees" id="projectType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>รหัสไปรษณีย์</option>
              <option v-for="pType in projectTypes" :key="pType._id" :value="pType">
                {{ pType.name }}
              </option>
            </select>
          </div>

          <div >
          <label for="projectType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">แนบสำเนาบัตรประชาชน</label>
            <input type="file" @change="handleFileChange($event, 'file1')" required>
          </div>
          
          <div >
          <label for="projectType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">แนบหน้าสมุดบัญชีธนาคาร</label>
            <input type="file" @change="handleFileChange($event, 'file1')" required>
          </div>


        </div>
        <div class="flex justify-end">
          <button @click="submitProject"
            class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            สมัครสมาชิก
          </button>
        </div>
      </form>
    </Dialog>
    <!-- สิ้นสุดส่วนของการสมัครสมาชิก -->


    <Dialog
      header=" "
      v-model:visible="isAddImgProcess"
      
      class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2">
      <div>
      <p class="text-center text-xl font-bold">เพิ่มรูปขั้นตอนการทำงาน</p>
      <input type="file" ref="fileInput" @change="">
      </div>
        <div class="flex justify-end">
          <button
            @click="submitAddFileSurveyArea"
            class="bg-blue-500 text-white p-2 rounded  hover:bg-blue-700 s">
            ยืนยัน
          </button>
        </div>
    </Dialog>
    <!-- สิ้นสุดขั้นตอนการเพิ่มรูปขั้นตอนการทำงาน -->

    <Dialog
      header=" "
      v-model:visible="isAddImgTest"
      
      class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2">
      <div>
      <p class="text-center text-xl font-bold">เพิ่มรูปการทดสอบ</p>
      <input type="file" ref="fileInput" @change="">
      </div>
        <div class="flex justify-end">
          <button
            @click="submitAddFileSurveyArea"
            class="bg-blue-500 text-white p-2 rounded  hover:bg-blue-700 s">
            ยืนยัน
          </button>
        </div>
    </Dialog>
    <!-- สิ้นสุดขั้นตอนการเพิ่มรูปการทดสอบ -->
    <Dialog
      header=" "
      v-model:visible="isAddImgDeliverJob"
      
      class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2">
      <div>
      <p class="text-center text-xl font-bold">เพิ่มรูปการส่งมอบงาน</p>
      <input type="file" ref="fileInput" @change="">
      </div>
        <div class="flex justify-end">
          <button
            @click="submitAddFileSurveyArea"
            class="bg-blue-500 text-white p-2 rounded  hover:bg-blue-700 s">
            ยืนยัน
          </button>
        </div>
    </Dialog>
    <!-- สิ้นสุดขั้นตอนการเพิ่มรูปการส่งมอบงาน -->

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
              required/>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            @click="submitEditProject"
            class="bg-blue-500 text-white p-2 rounded  hover:bg-blue-700 s">
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
              class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3
                class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
              <!-- หัวข้อหลัก -->
                <span class="mr-3 font-semibold text-dark text-3xl">พนักงาน</span>  
                
              </h3>
            </div>

            <div class="mx-10 py-2 space-y-2">

              <div class="flex sm:justify-start justify-center">
                <button
                  @click="addFileSurveyArea"
                  class=" text-white rounded p-2 bg-blue-500 ">
                  เพิ่มไฟล์สำรวจพื้นที่
                </button>
              </div>
              <div class="flex sm:justify-start justify-center">
                <button
                  @click="addImgProcess"
                  class=" text-white rounded p-2 bg-blue-500 ">
                  เพิ่มภาพขั้นตอนการทำงาน
                </button>
              </div>
              <div class="flex sm:justify-start justify-center">
                <button
                  @click="addImgTest"
                  class=" text-white rounded p-2 bg-blue-500 ">
                  เพิ่มภาพการทดสอบ
                </button>
              </div>
              <div class="flex sm:justify-start justify-center">
                <button
                  @click="addImgDeliverJob"
                  class=" text-white rounded p-2 bg-blue-500 ">
                  เพิ่มภาพส่งมอบงาน
                </button>
              </div>
              <div class="">
                <div class="pt-2 relative  text-gray-600">
                  <input
                    v-model="searchQuery"
                    class="border-2 w-full border-gray-300 bg-white h-10 px-3 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="ค้นหา"/>
                </div>
              </div>
            </div>

            <div class="flex-auto block py-8 pt-6 rounded-2xl">
              <div class="overflow-x-auto">
                <table
                  class="w-full my-0 align-middle text-slate-600 border-neutral-200">
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
                      class="border-t border-dashed">
                      <td class="pr-0 text-center">
                        <span
                          class="font-semibold text-light-inverse text-md/normal"
                          >{{ projectTypes.code }}</span>
                      </td>
                      <td class="pr-0 text-center">
                        <span
                          class="font-semibold text-light-inverse text-md/normal"
                          >{{ projectTypes.name }}</span>
                      </td>
                      <td class="pr-0 text-center">
                        <button
                          @click="editProject(projectTypes)"
                          class="px-3 py-2 m-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700">
                          แก้ไข
                        </button>
                        <button
                          @click="confirmDelete(projectTypes._id)"
                          class="px-3 py-2 m-1 bg-red-500 text-white rounded-lg hover:bg-red-700">
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
                    class="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded">
                    ก่อนหน้า
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded">
                    หน้าถัดไป
                  </button>
                </div>
                <span class="px-4 py-2 flex justify-center"
                  >{{ currentPage }} จาก {{ totalPages }}</span>

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
      isAddFileSurveyArea: false,//เพิ่มไฟล์สำรวจพื้นที่
      isAddImgProcess:false,//เพิ่มรูปขั้นตอนการทำงาน
      isAddImgTest:false,//เพิ่มรูปขั้นตอนการทดสอบ
      isAddImgDeliverJob:false,//เพิ่มรูปขั้นตอนการส่งมอบงาน

      currentPage: 1, // เพิ่ม currentPage
      pageSize: 10, // เพิ่ม pageSize
      searchQuery: "", // เพิ่มตัวแปรสำหรับเก็บค่าการค้นหา
      Detailsvisible: false,
      projects: [],
      employees: [],
      isLoading: false,
      
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

    async submitAddFileSurveyArea(event) {
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
          title: "เพิ่มไฟล์สำเร็จ",
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
        console.error("Error Can't AddFile :", error);
        await Swal.fire({
          icon: "error",
          title: "ไม่สามารถเพิ่มไฟล์ได้",
          text: "กรุณาลองใหม่อีกครั้ง",
        });
      } finally {
        this.isLoading = false;
      }
    },//สิ้นสุดปุ่มยืนยัน


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
    addFileSurveyArea() {
      this.isAddFileSurveyArea = true;
    },//functionเพิ่มไฟล์สำรวจพื้นที่

    // handleFileChange(event) {
    //   this.selectedFile = event.target.files[0];
    // },
    // uploadFile() {
    //   if (!this.selectedFile) {
    //     return;
    //   }
    //   console.log('ไฟล์ที่เลือก:', this.selectedFile);
    //   // รีเซ็ตค่าเลือกไฟล์หลังจากอัปโหลด
    //   this.selectedFile = null;
    // },
    //functionจัดการกับไฟล์ที่อัปโหลด

    addImgProcess() {
      this.isAddImgProcess = true;
    },
    addImgTest() {
      this.isAddImgTest = true;
    },
    addImgDeliverJob() {
      this.isAddImgDeliverJob = true;
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

}
</style>
