<template>
  <div>
    <Sidebar v-model:visible="Detailsvisible" header="ข้อมูลเพิ่มเติม" position="right" class="w-4/12">
      <div class="grid grid-cols-2 gap-8">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">รหัส</label>
          <p>{{ detailEmployee.code }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">ประเภท</label>
          <p>{{ detailEmployee?.refs[0]?.packagename }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">รายละเอียด</label>
          <p>{{ detailEmployee.detail }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">วันที่เริ่ม</label>
          <p>{{ formatDate(detailEmployee.start_date) }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">วันที่ครบกำหนด</label>
          <p>{{ formatDate(detailEmployee.due_date) }}</p>
        </div>
        <!-- <div class="mb-4">
          <label class="block text-sm font-bold mb-2">ความคืบหน้า</label>
          <p>{{ detailEmployee.progress }}%</p>
        </div> -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">สถานะ</label>
          <p>{{ getLastStatus(detailEmployee.status) }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">พนักงาน</label>
          <p v-for="emp in detailEmployee.employees" :key="emp">
            <!-- {{ console.log(emp) }} -->
            {{ filterEmployee(emp) }}
          </p>
          <p v-if="detailEmployee.employees.length < 1">ไม่มี</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">ลูกค้า</label>
          <p>ชื่อลูกค้า : {{ detailEmployee.customer.customer_name }}</p>
          <p>เบอร์โทรศัพท์ : {{ detailEmployee.customer.customer_tel }}</p>
          <p>Line ID : {{ detailEmployee.customer.customer_line }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">รายละเอียดสินค้า</label>
          <ul>
            <li v-for="detailEmployee in detailEmployee.refs" :key="detailEmployee._id">
              <p>
                ชื่อสินค้า {{ detailEmployee.packagename }} <br />
                รายละเอียดสินค้า {{ detailEmployee.packagedetail }}
              </p>
            </li>
          </ul>
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-bold mb-2">รายละเอียดเพิ่มเติม</label>
          <p>{{ detailEmployee.detail }}</p>
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-bold mb-2">หมายเหตุ</label>
          <p>{{ detailEmployee.remark }}</p>
        </div>
      </div>
    </Sidebar>

    <Dialog v-model:visible="showAddProjectModal" :modal="true" class="w-1/2"
      header="เพิ่มโปรเจคใหม่">
      <form class="px-4 sm:px-10 mt-2 sm:mt-5">
        <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-2">
          <div>
            <label for="projectType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภทงาน</label>
            <select v-model="newProject.type" @change="fetchEmployees" id="projectType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>โปรดเลือกประเภทงาน</option>
              <option v-for="pType in projectTypes" :key="pType._id" :value="pType">
                {{ pType.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">หัวข้องาน</label>
            <input v-model="newProject.title" type="text" id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>
          <div>
            <label for="projectSubType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภทงานย่อย (ถ้ามี)</label>
            <input v-model="newProject.projectSubType" type="text" id="projectSubType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>
          <div>
            <label for="dueDate"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันกำหนดส่ง</label>
            <Calendar v-model="newProject.dueDate"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 sm:p-2.5"
              required />
          </div>

          <div class="col-span-2">
            <label for="projectDetail"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รายละเอียดงาน</label>
            <textarea v-model="newProject.detail" id="projectDetail" rows="5"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder=""></textarea>
          </div>
          <!-- เพิ่ม Remark -->
          <div class="col-span-2">
            <label for="projectRemark"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">หมายเหตุ</label>
            <textarea v-model="newProject.remark" id="projectRemark" rows="3"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder=""></textarea>
          </div>
        </div>
        <div class="flex justify-end">
          <button @click="submitProject"
            class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            เพิ่มงาน
          </button>
        </div>
      </form>
    </Dialog>

    <Dialog v-model:visible="showEditProjectModal" :modal="true" class="w-1/2"
      header="แก้ไขโปรเจค">
      <form class="px-4 sm:px-10 mt-2 sm:mt-5">
        <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-2">
          <!-- Position -->
          <div>
            <label for="editProjectPosition"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ตำแหน่งงาน</label>
            <select v-model="editedProject.position" @change="fetchEmployeesForEditedProject" id="editProjectPosition"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option  disabled selected>โปรดเลือกตำแหน่งงาน</option>
              <option value="GRP">Graphic</option>
              <option value="DEV">Programmer</option>
            </select>
          </div>

          <!-- Employee -->
          <div v-if="employeeDropdownVisible && employees.length">
            <label for="editProjectEmployee"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">พนักงาน</label>
            <select v-model="editedProject.employee_id" @change="setEmployeeEdit" id="editProjectEmployee"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>โปรดเลือกพนักงาน</option>
              <option v-for="employee in employees" :key="employee._id" :value="employee._id">
                {{ employee.first_name }} {{ employee.last_name }} ({{
      employee.nick_name
    }})
              </option>
            </select>
          </div>
          <!-- Title -->
          <div>
            <label for="editProjectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อโปรเจค</label>
            <input v-model="editedProject.title" type="text" id="editProjectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required />
          </div>

          <!-- Progress -->
          <div>
            <label for="editProjectProgress"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ความคืบหน้า</label>
            <input v-model="editedProject.progress" type="number" id="editProjectProgress"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <!-- Due Date -->
          <div>
            <label for="editProjectDueDate"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันกำหนดส่ง</label>
            <Calendar v-model="editedProject.due_date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 sm:p-2.5"
              required />
          </div>

          <!-- Type -->
          <div>
            <label for="editProjectType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภทโครงการ</label>
            <select v-model="editedProject.type_code" id="editProjectType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>โปรดเลือกประเภทโครงการ</option>
              <option v-for="type in projectTypes" :key="type._id" :value="type.type_code">
                {{ type.type_name }}
              </option>
            </select>
          </div>

          <!-- Sub Type -->
          <div>
            <label for="editProjectSubType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภทงาน</label>
            <input v-model="editedProject.sub_type" type="text" id="editProjectSubType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <!-- Customer -->
          <div>
            <label for="editProjectCustomer"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อลูกค้า</label>
            <input v-model="editedProject.customer_name" type="text" id="editProjectCustomer"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <!-- Status -->
          <div>
            <label for="editProjectStatus"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">สถานะ</label>
            <select v-model="editedProject.status.status_name" id="editProjectStatus"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>โปรดเลือกสถานะ</option>
              <option value="โปรเจ็คเสร็จลุล่วง">โปรเจ็คเสร็จลุล่วง</option>
              <option value="อยู่ระหว่างการทำงาน">อยู่ระหว่างการทำงาน</option>
              <option value="โปรเจ็ครอการอนุมัติ">โปรเจ็ครอการอนุมัติ</option>
              <option value="โปรเจ็คถูกระงับ">โปรเจ็คถูกระงับ</option>
            </select>
          </div>

          <div v-if="editedProject.status.status_name === 'โปรเจ็คเสร็จลุล่วง'">
            <label for="editProjectDueDate"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันที่โปรเจคสำเร็จ</label>
            <Calendar v-model="editedProject.finish_date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 sm:p-2.5"
              required />
          </div>

          <!-- Detail -->
          <div class="col-span-2">
            <label for="editProjectDetail"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รายละเอียดงาน</label>
            <textarea v-model="editedProject.detail" id="editProjectDetail" rows="5"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder=""></textarea>
          </div>

          <!-- Remark -->
          <div class="col-span-2">
            <label for="editProjectRemark"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">หมายเหตุ</label>
            <textarea v-model="editedProject.remark" id="editProjectRemark" rows="3"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder=""></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button @click="submitEditedProject"
            class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            บันทึก
          </button>
        </div>
      </form>
    </Dialog>

    <div class="flex flex-wrap -mx-3 bg-cyan-200 h-full sm:h-screen">
      <div class="w-full max-w-full px-3 mb-6 mx-auto">
        <div
          class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-zinc-100 m-5">
          <div class="shadow-xl">
            <!-- card header -->
            <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <span class="mr-3 font-semibold text-dark text-3xl">งานเดือน {{ new Date().getMonth() + 1 }} /
                  {{ new Date().getFullYear() + 543 }}</span>
              </h3>
            </div>

            <div class="px-10 space-y-4">
              <div class="flex md:justify-start justify-center">
                <button @click="toggleAddProjectModal"
                  class="px-5 py-2 text-white font-bold bg-blue-500 rounded hover:bg-blue-700">
                  เพิ่มโปรเจค
                </button>
              </div>
              <div class="w-full">
                <div class="relative mx-auto pt-2 text-gray-600">
                  <input v-model="searchQuery" type="search" name="search" placeholder="ค้นหาชื่อ"
                    class=" h-10 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none pl-2 w-full" />
                </div>
              </div>
              <div class="w-full space-y-2">
                <label for="filterType" class=" text-gray-600">ประเภทงาน</label>
                <select v-model="filterType" id="filterType"
                  class="w-full h-10 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none">
                  <option value="">ทั้งหมด</option>
                  <option value="DEV">Programmer</option>
                  <option value="GRP">Graphic</option>
                </select>
                <label for="filterStatus" class=" text-gray-600">สถานะ</label>
                <select v-model="filterStatus" id="filterStatus"
                  class="w-full h-10 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none">
                  <option value="">ทั้งหมด</option>
                  <option value="โปรเจ็คเสร็จลุล่วง">โปรเจ็คเสร็จลุล่วง</option>
                  <option value="อยู่ระหว่างการทำงาน">
                    อยู่ระหว่างการทำงาน
                  </option>
                  <option value="โปรเจ็ครอการอนุมัติ">
                    โปรเจ็ครอการอนุมัติ
                  </option>
                  <option value="โปรเจ็คถูกระงับ">โปรเจ็คถูกระงับ</option>
                </select>
              </div>
            </div>

            <div class="flex-auto block py-8 pt-6 px-9 rounded-2xl">
              <div class="overflow-x-auto">
                <table
                  class="w-full my-0 align-middle text-slate-600 border-neutral-200 border-collapse container table table-auto">
                  <thead class="align-bottom">
                    <tr class="font-semibold text-sm text-center text-black">
                      <th class="p-4 text-center min-w-[100px]">รหัส</th>
                      <th class="p-4 text-center min-w-[100px]">หัวข้อ</th>
                      <th class="p-4 text-center min-w-[100px]">
                        <div class="flex justify-center">
                          <button class="bg-white hover:text-purple-500 text-sm" @click="seeName = !seeName">
                            พนักงาน
                          </button>
                        </div>
                      </th>
                      <th class="p-4 text-center min-w-[50px]">สถานะ</th>
                      <th class="p-4 text-center min-w-[100px]">
                        วันกำหนดส่ง
                      </th>
                      <th class="p-4 text-center min-w-[100px]">จัดการ</th>
                      <!-- เพิ่มหัวข้อใหม่ -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(project, index) in filteredProjects" :key="index"
                      class="border-b border-dashed last:border-b-0 text-sm">
                      <td class="p-3 text-start">
                        <span class="font-semibold text-light-inverse text-md/normal">{{ project.code }}</span>
                      </td>
                      <td class="p-3">
                        <div class="flex items-center">
                          <div class="flex flex-col justify-start">
                            <span
                              class="font-semibold transition-colors duration-200 ease-in-out text-secondary-inverse hover:text-primary">
                              {{ project.title }}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td class="p-3 text-center">
                        <div v-if="project.employees.length"
                          class="font-semibold text-light-inverse text-md/normal flex justify-center">
                          <div v-for="em in getEmployeesData(project.employees)" :key="em._id">
                            <div v-if="!seeName" class="flex items-center -mx-3">
                              <Image v-if="em.imageUrl" :src="em.imageUrl" :alt="em.nick_name"
                                imageClass="w-[45px] h-[45px] rounded-full shadow-md" preview />
                              <div v-else class="w-[45px] h-[45px] rounded-full bg-sky-200">
                                <small class="p-0 m-0">{{em.nick_name}}</small>
                              </div>
                            </div>
                            <div v-else class="flex items-center font-normal flex-wrap gap-2">
                              <p class="m-0 py-0 px-1 rounded bg-gray-200">
                                {{ em.nick_name || em.first_name }}
                              </p>
                            </div>
                          </div>
                          <ButtonP icon="pi pi-plus-circle text-purple-500 font-bold text-4xl"
                            class="bg-white hidden rounded-full scale-75 focus:outline-0 focus:ring-0 hover:bg-purple-300"
                            @click="openSelectEmployees(project)" />
                        </div>
                        <div v-else>
                          <ButtonP icon="pi pi-plus-circle text-purple-500 font-bold text-xl"
                            class="bg-purple-200 rounded py-2 focus:outline-0 focus:ring-0 hover:bg-purple-300"
                            @click="openSelectEmployees(project)" />
                        </div>
                      </td>

                      <td class="p-3">
                        <div>
                          <ButtonP icon="pi pi-angle-double-up" :label="project.status[project.status.length - 1]?.name
      " :class="[
      project.status[project.status.length - 1]?.name ===
        'รอรับงาน'
        ? 'bg-teal-500'
        : project.status[project.status.length - 1]
          ?.name === 'กำลังดำเนินการ'
          ? 'bg-yellow-500'
          : project.status[project.status.length - 1]
            ?.name === 'เสร็จแล้ว'
            ? 'bg-blue-500'
            : 'bg-gray-500', // กรณีอื่นๆ ใช้สีเทา
    ]" class="px-3 py-2 text-white inline-block rounded hover:shadow-lg"
                            @click="viewStatus(project)" />
                        </div>
                        <!-- <span
                          class="text-center align-baseline inline-flex px-1 py-2 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg"
                          :class="{
                            'bg-gray-500 text-white opacity-90':
                              project.status[project.status.length - 1].name ===
                              'รอรับงาน',
                            'bg-green-500 text-white opacity-90':
                              project.status[project.status.length - 1].name ===
                              'โปรเจ็คเสร็จลุล่วง',
                            'bg-yellow-500 text-black opacity-90':
                              project.status[project.status.length - 1].name ===
                              'อยู่ระหว่างการทำงาน',
                            'bg-blue-500 text-white opacity-90':
                              project.status[project.status.length - 1].name ===
                              'โปรเจ็ครอการอนุมัติ',
                            'bg-red-500 text-white opacity-90':
                              project.status[project.status.length - 1].name ===
                              'โปรเจ็คถูกระงับ',
                          }"
                        >
                          {{ project.status[project.status.length - 1].name }}
                        </span> -->
                      </td>
                      <td class="pr-0 text-center">
                        <div v-if="project.dueDate">
                          <p class="font-semibold m-0 p-0 text-light-inverse text-md/normal">
                            {{ formatDate(project.dueDate) }}
                          </p>
                          <p class="font-semibold m-0 p-0 text-light-inverse text-md/normal"
                            :class="formatDayLeft(project.dueDate)?.class">
                            {{ formatDayLeft(project.dueDate)?.text }}
                          </p>
                        </div>
                        <div v-else>
                          <ButtonP icon="pi pi-plus-circle text-purple-500 font-bold text-xl"
                            class="bg-purple-200 rounded py-2 focus:outline-0 focus:ring-0 hover:bg-purple-300"
                            @click="openSelectDueDate(project)" />
                        </div>
                      </td>
                      <td class="pr-0 text-center">
                        <button @click="viewDetails(project)"
                          class="px-3 py-2 m-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                          ดูรายละเอียด
                        </button>
                        <button @click="editProject(project)"
                          class="px-3 py-2 m-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700">
                          แก้ไข
                        </button>
                        <button @click="confirmDelete(project._id)"
                          class="px-3 py-2 m-1 bg-red-500 text-white rounded-lg hover:bg-red-700">
                          ลบ
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="flex justify-center mt-4">
                  <button @click="currentPage--" :disabled="currentPage === 1"
                    class="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded">
                    ก่อนหน้า
                  </button>
                  <button @click="currentPage++" :disabled="currentPage === totalPages"
                    class="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded">
                    หน้าถัดไป
                  </button>
                </div>
                <span class="px-4 py-2 flex justify-center">{{ currentPage }} จาก {{ totalPages }}</span>

                <div v-if="filteredProjects.length === 0" class="text-center mt-4 text-gray-500">
                  ไม่พบข้อมูล
                </div>
                <div v-if="isLoading" class="text-center">Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="openSelectEmployeesDialog" :modal="true"
      class="w-1/2 bg-white" header=" ">
      <p class="mt-2">
        พนักงานที่เลือก
        <span class="rounded-full px-2.5 text-white" :class="selectedEmployees.length ? 'bg-red-500' : 'bg-gray-500'">{{
      selectedEmployees.length }}</span>
      </p>
      <div class="flex overflow-x-auto bg-white">
        <div v-for="(selected, index) in selectedEmployees" :key="selected._id">
          <div
            class="flex justify-between hover:line-through w-[200px] hover:bg-red-200 text-xs border rounded shadow-sm py-2 px-3 items-center cursor-pointer"
            @click="selectedEmployees.splice(index, 1)">
            <div class="flex items-center gap-x-2">
              <Image v-if="selected.imageUrl" :src="selected.imageUrl" :alt="selected.image"
                imageClass="w-[40px] h-[40px] rounded-full" />
              <div>
                <p class="m-0 px-0 py-1 text-left">
                  {{ selected.name_title }}{{ selected.first_name }}
                  {{ selected.last_name }}
                  {{ selected.nick_name ? `(${selected.nick_name})` : null }}
                </p>
                <small :class="[
      'text-xs px-2 rounded',
      selected?.position?.toLowerCase().includes('programmer')
        ? 'bg-sky-200'
        : selected?.position?.toLowerCase().includes('graphic')
          ? 'bg-pink-200'
          : selected?.position?.toLowerCase().includes('marketting')
            ? 'bg-yellow-200'
            : selected?.position?.toLowerCase().includes('manager')
              ? 'bg-green-200'
              : selected?.position?.toLowerCase().includes('hr')
                ? 'bg-purple-200'
                : selected?.position?.toLowerCase().includes('owner')
                  ? 'bg-red-200'
                  : selected?.position?.toLowerCase().includes('admin')
                    ? 'bg-orange-200'
                    : selected?.position?.toLowerCase().includes('accounting')
                      ? 'bg-emerald-200'
                      : selected?.position?.toLowerCase().includes('lawyer')
                        ? 'bg-gray-200'
                        : '',
    ]">
                  {{ selected.position?.toLowerCase() }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center border-b-4 border-dashed my-3">
        <SelectButton class="py-3" v-model="filterEmployees" :options="employTypesOptions" multiple
          aria-labelledby="multiple" :pt="{ button: 'border text-xs border-collapse' }" />
      </div>
      <div class="grid grid-cols-3 justify-start items-start gap-3">
        <div v-for="employ in filteredEmployees" :key="employ._id">
          <div class="flex justify-between w-[300px] border rounded shadow-sm py-2 px-3 items-center" :class="selectedEmployees.includes(employ) ? 'bg-green-100' : 'bg-white'
      ">
            <div class="flex items-center gap-2">
              <Image v-if="employ.imageUrl" :src="employ.imageUrl" :alt="employ.image" preview
                imageClass="w-[40px] h-[40px] rounded-full" />
              <div>
                <p class="m-0 px-0 py-1 text-left">
                  {{ employ.name_title }}{{ employ.first_name }}
                  {{ employ.last_name }}
                  {{ employ.nick_name ? `(${employ.nick_name})` : null }}
                </p>
                <small :class="[
      'text-xs px-2 rounded',
      employ.position?.toLowerCase().includes('programmer')
        ? 'bg-sky-200'
        : employ.position?.toLowerCase().includes('graphic')
          ? 'bg-pink-200'
          : employ.position?.toLowerCase().includes('marketting')
            ? 'bg-yellow-200'
            : employ.position?.toLowerCase().includes('manager')
              ? 'bg-green-200'
              : employ.position?.toLowerCase().includes('hr')
                ? 'bg-purple-200'
                : employ.position?.toLowerCase().includes('owner')
                  ? 'bg-red-200'
                  : employ.position?.toLowerCase().includes('admin')
                    ? 'bg-orange-200'
                    : employ.position?.toLowerCase().includes('accounting')
                      ? 'bg-emerald-200'
                      : employ.position?.toLowerCase().includes('lawyer')
                        ? 'bg-gray-200'
                        : '',
    ]">
                  {{ employ.position?.toLowerCase() }}
                </small>
              </div>
            </div>
            <div class="flex items-center">
              <Checkbox v-model="selectedEmployees" inputId="employ1" name="employ" :value="employ"
                class="border-2 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="h-[30px] my-3 flex flex-col w-full items-end gap-y-2">
          <ButtonP :loading="isLoading" :disabled="!selectedEmployees.length" label="บันทึก"
            class="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-500 hover:text-gray-900"
            @click="updateEmployees" />
          <small class="text-red-500" :class="selectedEmployees.length ? 'hidden' : ''">กรุณาเลือกพนักงานอย่างน้อย 1
            คน</small>
        </div>
      </template>
    </Dialog>

    <Dialog v-model:visible="openSelectDueDateDialog" :modal="true" class="w-full max-w-md bg-white" header=" ">
      <div class="w-full flex justify-center items-center py-3">
        <Calendar dateFormat="dd/mm/yy" v-model="newProject.dueDate" showIcon iconDisplay="input" inputId="icondisplay"
          class="border rounded" inputClass="px-3 py-2" />
      </div>
      <template #footer>
        <div class="h-[30px] my-3 flex flex-col w-full items-end gap-y-2">
          <ButtonP :loading="isLoading" :disabled="!newProject.dueDate" label="บันทึก"
            class="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-500 hover:text-gray-900"
            @click="updateDueDate" />
        </div>
      </template>
    </Dialog>

    <Dialog v-model:visible="DetailsStatus" modal header="รายละเอียดอัพเดตงาน" style="min-width: 320px">
      {{ console.log(detailEmployee) }}
      <Timeline :value="detailEmployee.map((item, index) => ({
      content: item.name,
      date: formatDate(item.timestamp),
      time: formatTime(item.timestamp),
      status: item.name,
      index,
    }))
      ">
        <template #opposite="slotProps">
          <small class="p-text-secondary">{{ slotProps.item.date }} {{ slotProps.item.time }}</small>
        </template>
        <template #content="slotProps">
          {{ slotProps.item.status }}
        </template>
        <template #marker="slotProps">
          <div v-if="slotProps.item.index === 0" class="bg-blue-500 rounded-full w-4 h-4" />
          <div v-else-if="slotProps.item.index % 2 === 0" class="bg-green-300 rounded-full w-4 h-4" />
          <div v-else class="bg-green-400 rounded-full w-4 h-4" />
        </template>
      </Timeline>
      <template #footer></template>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Dialog from "primevue/dialog";
import Swal from "sweetalert2";
import Calendar from "primevue/calendar";
import Sidebar from "primevue/sidebar";

export default {
  components: {
    Dialog,
    Calendar,
    Sidebar,
  },
  data() {
    return {
      seeName: false,
      openSelectEmployeesDialog: false,
      openSelectDueDateDialog: false,
      currentPage: 1,
      pageSize: 10, // กำหนดจำนวนรายการที่แสดงในหนึ่งหน้า
      filterType: "", // เก็บค่าประเภทงานที่จะกรอง
      filterStatus: "", // เก็บค่าสถานะที่จะกรอง
      searchQuery: "", // เพิ่มตัวแปรสำหรับเก็บค่าการค้นหา
      projectPositions: [], // เพิ่ม array สำหรับเก็บตำแหน่งงาน
      showEditProjectModal: false,
      editedProject: {},
      employees: [],
      employeeDropdownVisible: false,
      selectedEmployee: "ทั้งหมด",
      selectedEmployees: [],
      filterEmployees: [],
      Detailsvisible: false,
      projects: [],
      isLoading: false,
      showAddProjectModal: false,
      newProject: {},
      projectTypes: [],
      detailEmployee: null, // เพิ่ม detailEmployee เพื่อเก็บข้อมูลโปรเจคที่ถูกเลือก
      employTypesOptions: [],
      DetailsStatus: false,
    };
  },
  mounted() {
    this.fetchProjects();
    this.fetchProjectTypes();
    this.fetchEmployees();
    // เรียกใช้เมื่อโหลด component
  },
  computed: {
    filteredEmployees() {
      const customOrder = this.employTypesOptions.map((co) =>
        co?.toLowerCase()
      );
      const result = this.filterEmployees.length
        ? this.employees
          .filter((em) =>
            this.filterEmployees.some((se) =>
              se?.toLowerCase().includes(em.position?.toLowerCase())
            )
          )
          .sort(
            (a, b) =>
              customOrder.indexOf(a.position?.toLowerCase()) -
              customOrder.indexOf(b.position?.toLowerCase())
          )
        : this.employees.sort(
          (a, b) =>
            customOrder.indexOf(a.position?.toLowerCase()) -
            customOrder.indexOf(b.position?.toLowerCase())
        );
      return result;
    },
    filteredProjects() {
      // กรองโปรเจคตามค่าค้นหาของรหัสโปรเจค และชื่อโปรเจค
      const filtered = this.projects.filter((project) => {
        const matchesSearch =
          project.code
            ?.toLowerCase()
            .includes(this.searchQuery?.toLowerCase()) ||
          project.product_detail[0].packagename
            ?.toLowerCase()
            .includes(this.searchQuery?.toLowerCase());
        const matchesType =
          !this.filterType || project.code.substring(0, 3) === this.filterType;
        const matchesStatus =
          !this.filterStatus || project.status.name === this.filterStatus;
        return matchesSearch && matchesType && matchesStatus;
      });

      // คำนวณจำนวนหน้าทั้งหมด
      this.totalPages = Math.ceil(filtered.length / this.pageSize);

      // คำนวณหน้าที่แสดง
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return filtered.slice(startIndex, endIndex);
    },
  },
  methods: {
    async updateEmployees() {
      this.isLoaing = true;
      const id = this.newProject._id;
      const employees = this.selectedEmployees.map((em) => em._id);
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project/${id}/update`,
          {
            employees: employees,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (data.status) {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "เพิ่มพนักงานลงงานสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          this.fetchProjects();
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "เพิ่มพนักงานลงงานไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        this.isLoaing = false;
        this.newProject = {};
        this.openSelectEmployeesDialog = false;
        this.selectedEmployees = [];
      }
    },
    async updateDueDate() {
      this.isLoaing = true;
      const id = this.newProject._id;
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project/${id}`,
          {
            dueDate: this.newProject.dueDate,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (data.status) {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "เพิ่มเวลาครบกำหนดสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          this.fetchProjects();
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "เพิ่มเวลาครบกำหนดไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        this.isLoaing = false;
        this.newProject = {};
        this.openSelectDueDateDialog = false;
      }
    },
    formatDayLeft(dueDate) {
      const timestamps = new Date(dueDate).getTime() - new Date().getTime();
      // Convert timestamps to days and hours
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const millisecondsPerHour = 60 * 60 * 1000;

      const days = Math.floor(timestamps / millisecondsPerDay);
      const hours = Math.floor(
        (timestamps % millisecondsPerDay) / millisecondsPerHour
      );
      const result =
        days + 1 > 7
          ? {
            text: `อีก ${days + 1} วัน`,
            class: "",
          }
          : days + 1 > 0 && days + 1 < 7
            ? {
              text: `อีก ${days + 1} วัน`,
              class: "text-orange-500",
            }
            : days + 1 === 0
              ? {
                text: `ครบกำหนดวันนี้`,
                class: "text-red-500",
              }
              : {
                text: `เกินกำหนด ${Math.abs(days + 1)} วัน`,
                class: "text-red-500",
              };
      return result;
    },
    getEmployeesData(emId) {
      const result = this.employees.filter((e) => emId.includes(e._id));
      return result;
    },
    openSelectEmployees(project) {
      this.newProject = project;
      this.selectedEmployees = this.getEmployeesData(project.employees);
      console.log(this.selectedEmployees);
      this.openSelectEmployeesDialog = true;
    },
    openSelectDueDate(project) {
      this.newProject = project;
      this.openSelectDueDateDialog = true;
    },
    async fetchEmployeesForEditedProject() {
      // Reset employees array and selectedEmployee
      this.employees = [];
      this.selectedEmployee = "ทั้งหมด";

      // Get the selected job position from editedProject
      const selectedPosition = this.editedProject.position;

      if (selectedPosition === "GRP" || selectedPosition === "DEV") {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
            {
              headers: { "auth-token": localStorage.getItem("token") },
            }
          );
          // Filter employees based on selected job position
          this.employees = response.data.data.filter((employee) =>
            employee.employee_number.startsWith(selectedPosition)
          );
          // Show the dropdown if there are employees available
          this.employeeDropdownVisible = this.employees.length > 0;

          // Set the selected employee if it matches the edited project's employee ID
          if (
            this.employees.find(
              (employee) => employee._id === this.editedProject.employee_id
            )
          ) {
            this.selectedEmployee = this.editedProject.employee_id;
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        // Hide the dropdown if no job position is selected
        this.employeeDropdownVisible = false;
      }
    },
    setEmployeeEdit() {
      const selectedEmployeeData = this.employees.find(
        (employee) => employee._id === this.editedProject.employee_id
      );
      if (selectedEmployeeData) {
        this.editedProject.employee_number =
          selectedEmployeeData.employee_number;
        this.editedProject.nick_name = selectedEmployeeData.nick_name;
      }
    },
    editProject(project) {
      // Open the edit dialog
      this.showEditProjectModal = true;
      // Populate the editedProject with the project details
      this.editedProject = { ...project };
      // Find the corresponding type in projectTypes and assign its type_code and type_name to editedProject
      const selectedType = this.projectTypes.find(
        (type) => type.type_code === project.type.type_code
      );
      if (selectedType) {
        this.editedProject.type_code = selectedType.type_code;
        this.editedProject.type_name = selectedType.type_name;
      }

      // Fetch additional data for edited project
      this.fetchEmployeesForEditedProject();
    },

    async submitEditedProject() {
      try {
        this.isLoading = true;
        // Make a PUT request to update the project
        const response = await axios.put(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/requset/update/project/${this.editedProject._id
          }`,
          this.editedProject,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        // Close the edit dialog
        this.showEditProjectModal = false;
        // Show a success message
        await Swal.fire({
          icon: "success",
          title: "แก้ไขโปรเจคสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        // Refresh the project list
        this.fetchProjects();
      } catch (error) {
        console.error("Error submitting edited project:", error);
        // Show an error message
        await Swal.fire({
          icon: "error",
          title: "ไม่สามารถแก้ไขโปรเจค",
          text: "เกิดข้อผิดพลาดในการแก้ไขโปรเจค",
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        this.isLoading = false;
      }
    },
    setEmployeeData() {
      const selectedEmployeeData = this.employees.find(
        (employee) => employee._id === this.selectedEmployee
      );
      if (selectedEmployeeData) {
        this.newProject.employee_number = selectedEmployeeData.employee_number;
        this.newProject.nick_name = selectedEmployeeData.nick_name;
      }
    },
    async fetchEmployees() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/get`,
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );

        this.employees = response.data.data;
        this.employees.map((em) => {
          this.imageUrl(em);
        });
        this.employTypesOptions = [
          ...new Set(
            response.data.data.map((em) => em.position?.toLowerCase())
          ),
        ];
        console.log(this.employTypesOptions);
        console.log("employees", this.employees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    viewDetails(project) {
      console.log(project);
      this.detailEmployee = project;
      this.Detailsvisible = true;
    },
    calculateRemainingDays(dueDate, statusName, startDate, finishDate) {
      // Check if status_name is "โปรเจ็คเสร็จลุล่วง"
      if (statusName === "โปรเจ็คเสร็จลุล่วง") {
        // Parse startDate and finishDate using dayjs
        const start = dayjs(startDate);
        const finish = dayjs(finishDate);

        // Calculate difference between finish date and start date
        const projectDuration = finish.diff(start, "day");

        return `ใช้เวลาทำ${projectDuration} วัน`;
      }

      // Parse dueDate using dayjs
      const due = dayjs(dueDate);

      // Calculate difference between due date and current date
      const diffDays = due.diff(dayjs(), "day");

      // Check if past due
      if (diffDays < 0) {
        // Calculate number of days overdue
        const daysOverdue = Math.abs(diffDays);
        return `เกินกำหนด ${daysOverdue} วัน`;
      } else {
        // Return number of days left or 'ครบกำหนด' if due today
        return diffDays > 0 ? `${diffDays} วัน` : "ครบกำหนดวันนี้";
      }
    },
    calculateProjectDuration(project) {
      // Check if the project status is "โปรเจ็คเสร็จลุล่วง"
      if (project.status.status_name === "โปรเจ็คเสร็จลุล่วง") {
        // Parse start_date and finish_date using dayjs
        const startDate = dayjs(project.start_date);
        const finnishDate = dayjs(project.finish_date);

        // Calculate difference in days between start_date and finish_date
        const projectDuration = finnishDate.diff(startDate, "day");

        return `โปรเจ็คใช้เวลา ${projectDuration} วัน`;
      } else {
        return "โปรเจ็คยังไม่เสร็จลุล่วง";
      }
    },

    formatDate(date) {
      return dayjs(date).locale("th").format("D MMMM YYYY");
    },
    getLastStatus(item) {
      return item[item.length - 1]?.name;
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
            `${import.meta.env.VITE_VUE_APP_DECCAN}/project/${id}`,
            {
              headers: { "auth-token": localStorage.getItem("token") },
            }
          );
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "สำเร็จ",
              text: "ลบงานสำเร็จ",
              showConfirmButton: false,
              timer: 2000,
            });
            // Reload the project data
            this.fetchProjects();
          }
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
    async fetchProjectTypes() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        // กำหนดข้อมูลให้กับตัวแปร projectTypes
        console.log("types", response.data.data);
        this.projectTypes = response.data.data;
      } catch (error) {
        console.error("Error fetching project types:", error);
      }
    },
    async imageUrl(em) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/uploads/image-thumbnail`,
          {
            imageId: em.image,
          }
        );
        if (data.status) {
          em.imageUrl = data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async fetchProjects() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project`,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        this.projects = response.data.data.slice().reverse();
        console.log(this.projects);
        // แปลงเวลาในโซน UTC เป็นเวลาในโซนไทย
        this.projects.forEach((project) => {
          project.due_date = dayjs(project.due_date)
            .locale("th")
            .format("YYYY-MM-DD");
          project.finish_date = dayjs(project.finish_date)
            .locale("th")
            .format("YYYY-MM-DD");
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleAddProjectModal() {
      this.showAddProjectModal = !this.showAddProjectModal;
    },
    async submitProject() {
      let payload = this.newProject;
      payload.code = this.newProject.type?.code;
      payload.projectType = this.newProject.type?.name;
      // console.log(this.newProject.type)
      // return
      try {
        this.isLoading = true;
        const response = await axios.post(
          `${import.meta.env.VITE_VUE_APP_DECCAN}/project`,
          payload,
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
          await Swal.fire({
            icon: "success",
            title: "เพิ่มงานสำเร็จ",
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
    filterEmployee(id) {
      let filemp = this.employees;
      filemp = filemp.find((emp) => emp._id === id);
      // console.log('filemp',filemp);
      return filemp.first_name + " " + filemp.last_name;
    },
    viewStatus(project) {
      // console.log(project);
      this.detailEmployee = project.status.slice().reverse();
      this.DetailsStatus = true;
    },
    // formatDate(date) {
    //   return new Date(date).toLocaleDateString("th-TH", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //   });
    // },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        // ถ้า timestamp ไม่ถูกต้อง ให้คืนค่าว่างเปล่า
        return "";
      }
      return date.toLocaleTimeString("th-TH", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    },
  },
};
</script>
<style>
.project {
  z-index: 9999;
  /* กำหนดค่า Z-Index ที่ต้องการ */
}

.border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity));
}

table {
  border-collapse: collapse;
}

th,
td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}
</style>
