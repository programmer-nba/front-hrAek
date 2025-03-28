<template>


  <Sidebar v-model:visible="Detailsvisible" header="ข้อมูลเพิ่มเติม" position="right" class="w-4/12">
    <div class="grid grid-cols-2 gap-8">
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">รหัสโปรเจค</label>
        <p>{{ detailEmployee.project_id }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">ชื่อโปรเจค</label>
        <p>{{ detailEmployee.title }}</p>
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
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">ความคืบหน้า</label>
        <p>{{ detailEmployee.progress }}%</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">สถานะ</label>
        <p>{{ detailEmployee.status.status_name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">พนักงาน</label>
        <p>{{ detailEmployee.nick_name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2">ลูกค้า</label>
        <p>{{ detailEmployee.customer }}</p>
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

  <!-- <Dialog v-model:visible="showAddProjectModal" :modal="true" class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2"
    header="เพิ่มโปรเจคใหม่">
    <form class="px-4 sm:px-10 mt-2 sm:mt-5">
      <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-2">
        <div>

          <label for="projectType"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ตำแหน่งงาน</label>
          <select v-model="newProject.typeCode" @change="fetchEmployees" id="projectType"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            required>
            <option value="" disabled selected>โปรดเลือกตำแหน่งงาน</option>
            <option value="GRP">ช่างเทคนิค</option>
            <option value="DEV">เจ้าหน้าที่ภาคสนาม</option>
          </select>
        </div>

        
        <div v-if="employeeDropdownVisible && employees.length">
          <label for="employeeDropdown"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">พนักงาน</label>
          <select v-model="selectedEmployee" @change="setEmployeeData" id="employeeDropdown"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            required>
            <option value="" disabled selected>โปรดเลือกพนักงาน</option>
            <option v-for="employee in employees" :key="employee._id" :value="employee._id">{{ employee.first_name }} {{
              employee.last_name }} ({{ employee.nick_name }})</option>
          </select>
        </div>

        <div v-else>
          <p class="text-sm text-gray-500">ไม่มีข้อมูลพนักงาน</p>
        </div>
        <div>
          <label for="projectTitle"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อโปรเจค</label>
          <input v-model="newProject.title" type="text" id="projectTitle"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            placeholder="" required />
        </div>
        <div>
          <label for="dueDate"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันกำหนดส่ง</label>
          <Calendar v-model="newProject.due_date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 sm:p-2.5"
            required />
        </div>
        <div>
          <label for="projectProgress"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ความคืบหน้า</label>
          <input v-model="newProject.progress" type="number" id="projectProgress"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            placeholder="" required />
        </div>
        <div>
          <label for="projectProgress"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภทโครงการ</label>
          <select v-model="newProject.type_code" id="projectType"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            required>
            <option value="" disabled selected>โปรดเลือกประเภทโครงการ</option>
            <option value="" >1</option>
            <option v-for="type in projectTypes" :key="type._id" :value="type.type_code">{{ type.type_name }}</option>
          </select>
        </div>

        <div>
          <label for="projectsub_type"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภทงาน</label>
          <input v-model="newProject.sub_type" type="text" id="projectsub_type"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            placeholder="" required />
        </div>

        <div>
          <label for="projectStatus"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">สถานะ</label>
          <select v-model="newProject.status_name" id="projectStatus"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            required>
            <option value="" disabled selected>โปรดเลือกสถานะ</option>
            <option value="โปรเจ็คเสร็จลุล่วง">โปรเจ็คเสร็จลุล่วง</option>
            <option value="อยู่ระหว่างการทำงาน">อยู่ระหว่างการทำงาน</option>
            <option value="โปรเจ็ครอการอนุมัติ">โปรเจ็ครอการอนุมัติ</option>
            <option value="โปรเจ็คถูกระงับ">โปรเจ็คถูกระงับ</option>
          </select>
        </div>
        <div>
          <label for="projectcustomer"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อลูกค้า</label>
          <input v-model="newProject.customer_name" type="text" id="projectcustomer"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            placeholder="" required />
        </div>

        
        <div class="col-span-2">
          <label for="projectDetail"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">รายละเอียดงาน</label>
          <textarea v-model="newProject.detail" id="projectDetail" rows="5"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            placeholder=""></textarea>
        </div>
       
        <div class="col-span-2">
          <label for="projectRemark"
            class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">หมายเหตุ</label>
          <textarea v-model="newProject.remark" id="projectRemark" rows="3"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
            placeholder=""></textarea>
        </div>

      </div>
      <div class="mb-6">
        <button @click="submitProject"
          class="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none">เพิ่มโปรเจค</button>
      </div>
    </form>
  </Dialog> -->

<Dialog v-model:visible="showAddProjectModal" :modal="true" class="w-1/2"
      header="เพิ่มโปรเจคใหม่">
      <form class="px-4 sm:px-10 mt-2 sm:mt-5">
        <div class="grid gap-3 sm:gap-6 mb-3 sm:mb-6 md:grid-cols-2">

        <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อโปรเจค</label>
            <input v-model="newProject.title" type="text" id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

          <div>
            <label for="projectType"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ผู้รับผิดชอบ</label>
            <select v-model="newProject.type" @change="fetchEmployees" id="projectType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              required>
              <option value="" disabled selected>โปรดเลือกผู้รับผิดชอบ</option>
              <option v-for="pType in projectTypes" :key="pType._id" :value="pType">
                {{ pType.name }}
              </option>
            </select>
          </div>

          <div>
            <label for="datePicker">ตั้งแต่วันที่:</label>
            <input type="date" v-model="selectedDate" id="datePicker">
          </div>
          <div>
            <label for="datePicker">ถึงวันที่:</label>
            <input type="date" v-model="selectedDate" id="datePicker">
          </div>

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">สถานที่ตั้ง</label>
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

          <div>
            <label for="projectTitle"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เลขพิกัดละติจูด ลองจิจูด</label>
            <input v-model="newProject.title" type="text" id="projectTitle"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="" required />
          </div>

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
    
  <Dialog v-model:visible="showEditProjectModal" :modal="true" class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2"
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
            <option value="" disabled selected>โปรดเลือกตำแหน่งงาน</option>
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
            <option v-for="employee in employees" :key="employee._id" :value="employee._id">{{ employee.first_name }} {{
              employee.last_name }} ({{ employee.nick_name }})</option>
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 sm:p-2.5"
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
            <option v-for="type in projectTypes" :key="type._id" :value="type.type_code">{{ type.type_name }}</option>
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
          <Calendar v-model="editedProject.finnish_date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 sm:p-2.5"
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
      <div class="mb-6">
        <button @click="submitEditedProject"
          class="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none">บันทึก</button>
      </div>

    </form>
  </Dialog>

  <div class="flex flex-wrap -mx-3  bg-cyan-200 h-full sm:h-screen">
    <div class="w-full max-w-full px-3 mb-6 mx-auto ">
      <div
        class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-zinc-100 m-5">
        <div class="shadow-xl">
          <!-- card header -->
          <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
            <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
              <span class="mr-3 font-semibold text-dark text-3xl">โปรเจคทั้งหมด</span>
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 ml-10 py-2">
            <div>
              <button @click="toggleAddProjectModal"
                class="px-5 py-2 text-white font-bold bg-gradient-to-bl from-purple-500 to-purple-800 rounded-full shadow-md hover:scale-90 hover:shadow-purple-400 cursor-pointer">
                เพิ่มโปรเจค
              </button>
            </div>
            <div class="flex justify-between w-full">
              <div class="relative mx-auto pt-2 text-gray-600">
                <input v-model="searchQuery" type="search" name="search" placeholder="ค้นหาชื่อ"
                  class="w-full h-10 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none">
              </div>
            </div>
            <div class="flex items-center mr-10 w-full">
              <label for="filterType" class="mr-3 text-gray-600">ประเภทงาน:</label>
              <select v-model="filterType" id="filterType"
                class="w-full h-10 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none">
                <option value="">ทั้งหมด</option>
                <option value="DEV">Programmer</option>
                <option value="GRP">Graphic</option>
              </select>
              <label for="filterStatus" class="ml-2 text-gray-600">สถานะ:</label>
              <select v-model="filterStatus" id="filterStatus"
                class="w-full h-10 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none">
                <option value="">ทั้งหมด</option>
                <option value="โปรเจ็คเสร็จลุล่วง">โปรเจ็คเสร็จลุล่วง</option>
                <option value="อยู่ระหว่างการทำงาน">อยู่ระหว่างการทำงาน</option>
                <option value="โปรเจ็ครอการอนุมัติ">โปรเจ็ครอการอนุมัติ</option>
                <option value="โปรเจ็คถูกระงับ">โปรเจ็คถูกระงับ</option>
              </select>
            </div>
          </div>



          <!-- end card header -->
          <!-- card body -->

          <div class="flex-auto block py-8 pt-6 px-9 rounded-2xl ">
            <div class="overflow-x-auto">
              <table class="w-full my-0 align-middle text-slate-600 border-neutral-200 container">
                <thead class="align-bottom">
                  <tr class="font-semibold text-xl text-black">
                    <th class="pb-3 text-center min-w-[100px]">รหัสโปรเจค</th>
                    <th class="pb-3 text-start  min-w-[100px]">ชื่อโปรเจค</th>
                    <th class="pb-3 text-center min-w-[100px]">พนักงาน</th>
                    <th class="pb-3 text-center start">ความคืบหน้า</th>
                    <th class="pb-3  text-center min-w-[50px]">สถานะ</th>
                    <th class="pb-3  text-center min-w-[100px]">เหลือกี่วัน</th>
                    <th class="pb-3  text-center min-w-[100px]">วันกำหนดส่ง</th>
                    <th class="pb-3  text-center min-w-[100px]">การจัดการ</th> <!-- เพิ่มหัวข้อใหม่ -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(project, index) in filteredProjects" :key="index"
                    class="border-b border-dashed last:border-b-0">
                    <td class="pr-0 text-center">
                      <span class="font-semibold text-light-inverse text-md/normal">{{ project.project_id }}</span>
                    </td>
                    <td class="p-3 pl-0">
                      <div class="flex items-center">
                        <div class="flex flex-col justify-start">
                          <span
                            class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">{{
                              project.title }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="p-3 pr-0 text-center">
                      <span class="font-semibold text-light-inverse text-md/normal">{{ project.nick_name }}</span>
                    </td>
                    <td class="p-3 pr-0 mr-10 text-center">
                      <div class="flex items-center justify-center h-full">
                        <span class="mr-2">{{ project.progress }}%</span>
                        <div class="relative w-full">
                          <div class="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                            <div :style="{ width: project.progress + '%' }"
                              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500">
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="p-3 pr-12 text-center">
                      <span
                        class="text-center align-baseline inline-flex px-1 py-2 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg "
                        :class="{
                          'bg-green-500 text-white opacity-90': project.status.status_name === 'โปรเจ็คเสร็จลุล่วง',
                          'bg-yellow-500 text-black opacity-90': project.status.status_name === 'อยู่ระหว่างการทำงาน',
                          'bg-blue-500 text-white opacity-90': project.status.status_name === 'โปรเจ็ครอการอนุมัติ',
                          'bg-red-500 text-white opacity-90': project.status.status_name === 'โปรเจ็คถูกระงับ'
                        }">
                        {{ project.status.status_name }}
                      </span>
                    </td>

                    <td class="pr-0 text-center">
                      <span class="font-semibold text-light-inverse text-md/normal">{{
                        calculateRemainingDays(project.due_date, project.status.status_name, project.start_date,
                          project.finnish_date) }}</span>
                    </td>
                    <td class="pr-0 text-center">
                      <span class="font-semibold text-light-inverse text-md/normal">{{ project.due_date }}</span>
                    </td>
                    <td class="pr-0 text-center">
                      <button @click="viewDetails(project)"
                        class="px-3 py-2 m-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700">ดูรายละเอียด</button>
                      <button @click="editProject(project)"
                        class="px-3 py-2 m-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700">แก้ไข</button>
                      <button @click="confirmDelete(project._id)"
                        class="px-3 py-2 m-1 bg-red-500 text-white rounded-lg hover:bg-red-700">ลบ</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="flex justify-center mt-4">
                <button @click="previousPage" :disabled="currentPage === 1"
                  class="px-4 py-2 mx-2 bg-gray-200 hover:bg-gray-300 rounded">
                  ก่อนหน้า
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages"
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
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Dialog from 'primevue/dialog';
import Swal from 'sweetalert2';
import Calendar from 'primevue/calendar';
import Sidebar from 'primevue/sidebar';


export default {
  components: {
    Dialog,
    Calendar,
    Sidebar
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 6, // กำหนดจำนวนรายการที่แสดงในหนึ่งหน้า
      filterType: '', // เก็บค่าประเภทงานที่จะกรอง
      filterStatus: '', // เก็บค่าสถานะที่จะกรอง
      searchQuery: '', // เพิ่มตัวแปรสำหรับเก็บค่าการค้นหา
      projectPositions: [], // เพิ่ม array สำหรับเก็บตำแหน่งงาน
      showEditProjectModal: false,
      editedProject: {
      },
      employees: [],
      employeeDropdownVisible: false,
      selectedEmployee: '',
      Detailsvisible: false,
      projects: [],
      isLoading: false,
      showAddProjectModal: false,
      newProject: {
        employee_number: "", // เพิ่ม property เก็บ employee_number
        nick_name: "", // เพิ่ม property เก็บ nick_name        customer_name: "", // เปลี่ยนจาก customer.customer_name เป็น customer_name เพื่อให้เป็นค่าตัวแปรที่ถูกต้อง
        progress: "",
        status_name: "",
        title: "",
        type_code: "", // เก็บรหัสประเภทโปรเจค
        sub_type: "",
        due_date: "",
        detail: "",
        refs: {
          refs: ""
        },
        Remark: "",
        projectTypes: [],
      },
      detailEmployee: null // เพิ่ม detailEmployee เพื่อเก็บข้อมูลโปรเจคที่ถูกเลือก

    };
  },
  mounted() {
    this.fetchProjects();
    this.fetchProjectTypes();
    this.fetchEmployees();
    // เรียกใช้เมื่อโหลด component
  },
  computed: {
    filteredProjects() {
      // กรองโปรเจคตามค่าค้นหาของรหัสโปรเจค และชื่อโปรเจค
      const filtered = this.projects.filter(project => {
        const matchesSearch = project.project_id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesType = !this.filterType || project.project_id.substring(0, 3) === this.filterType;
        const matchesStatus = !this.filterStatus || project.status.status_name === this.filterStatus;
        return matchesSearch && matchesType && matchesStatus;
      });

      // คำนวณจำนวนหน้าทั้งหมด
      this.totalPages = Math.ceil(filtered.length / this.pageSize);

      // คำนวณหน้าที่แสดง
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return filtered.slice(startIndex, endIndex);
    }
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--; // ลดหน้าลง 1
      }
    },
    // ฟังก์ชันเมื่อคลิกที่ปุ่มหน้าถัดไป
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++; // เพิ่มหน้าขึ้น 1
      }
    },
    async fetchEmployeesForEditedProject() {
      // Reset employees array and selectedEmployee
      this.employees = [];
      this.selectedEmployee = '';

      // Get the selected job position from editedProject
      const selectedPosition = this.editedProject.position;

      if (selectedPosition === 'GRP' || selectedPosition === 'DEV') {
        try {
          const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/get`, {
            headers: { "auth-token": localStorage.getItem("token") }
          });
          // Filter employees based on selected job position
          this.employees = response.data.data.filter(employee => employee.employee_number.startsWith(selectedPosition));
          // Show the dropdown if there are employees available
          this.employeeDropdownVisible = this.employees.length > 0;

          // Set the selected employee if it matches the edited project's employee ID
          if (this.employees.find(employee => employee._id === this.editedProject.employee_id)) {
            this.selectedEmployee = this.editedProject.employee_id;
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        // Hide the dropdown if no job position is selected
        this.employeeDropdownVisible = false;
      }
    },
    setEmployeeEdit() {
      const selectedEmployeeData = this.employees.find(employee => employee._id === this.editedProject.employee_id);
      if (selectedEmployeeData) {
        this.editedProject.employee_number = selectedEmployeeData.employee_number;
        this.editedProject.nick_name = selectedEmployeeData.nick_name;
      }
    },
    editProject(project) {
      // Open the edit dialog
      this.showEditProjectModal = true;
      // Populate the editedProject with the project details
      this.editedProject = { ...project };
      // Find the corresponding type in projectTypes and assign its type_code and type_name to editedProject
      const selectedType = this.projectTypes.find(type => type.type_code === project.type.type_code);
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
        const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/requset/update/project/${this.editedProject._id}`, this.editedProject, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        // Close the edit dialog
        this.showEditProjectModal = false;
        // Show a success message
        await Swal.fire({
          icon: 'success',
          title: 'แก้ไขโปรเจคสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        });
        // Refresh the project list
        this.fetchProjects();
      } catch (error) {
        console.error("Error submitting edited project:", error);
        // Show an error message
        await Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถแก้ไขโปรเจค',
          text: 'เกิดข้อผิดพลาดในการแก้ไขโปรเจค',
          showConfirmButton: false,
          timer: 1500
        });
      } finally {
        this.isLoading = false;
      }
    },
    setEmployeeData() {
      const selectedEmployeeData = this.employees.find(employee => employee._id === this.selectedEmployee);
      if (selectedEmployeeData) {
        this.newProject.employee_number = selectedEmployeeData.employee_number;
        this.newProject.nick_name = selectedEmployeeData.nick_name;
      }
    },
    async fetchEmployees() {
      // Reset employees array and selectedEmployee
      this.employees = [];
      this.selectedEmployee = '';

      // Get the selected job position
      const selectedPosition = this.newProject.typeCode;

      if (selectedPosition === 'GRP' || selectedPosition === 'DEV') {
        try {
          const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/get`, {
            headers: { "auth-token": localStorage.getItem("token") }
          });
          // Filter employees based on selected job position
          this.employees = response.data.data.filter(employee => employee.employee_number.startsWith(selectedPosition));
          // Show the dropdown if there are employees available
          this.employeeDropdownVisible = this.employees.length > 0;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        // Hide the dropdown if no job position is selected
        this.employeeDropdownVisible = false;
      }
    },
    viewDetails(project) {
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
        const projectDuration = finish.diff(start, 'day');

        return `ใช้เวลาทำ${projectDuration} วัน`;
      }

      // Parse dueDate using dayjs
      const due = dayjs(dueDate);

      // Calculate difference between due date and current date
      const diffDays = due.diff(dayjs(), 'day');

      // Check if past due
      if (diffDays < 0) {
        // Calculate number of days overdue
        const daysOverdue = Math.abs(diffDays);
        return `เกินกำหนด ${daysOverdue} วัน`;
      } else {
        // Return number of days left or 'ครบกำหนด' if due today
        return diffDays > 0 ? `${diffDays} วัน` : 'ครบกำหนดวันนี้';
      }
    },
    calculateProjectDuration(project) {
      // Check if the project status is "โปรเจ็คเสร็จลุล่วง"
      if (project.status.status_name === "โปรเจ็คเสร็จลุล่วง") {
        // Parse start_date and finnish_date using dayjs
        const startDate = dayjs(project.start_date);
        const finnishDate = dayjs(project.finnish_date);

        // Calculate difference in days between start_date and finnish_date
        const projectDuration = finnishDate.diff(startDate, 'day');

        return `โปรเจ็คใช้เวลา ${projectDuration} วัน`;
      } else {
        return 'โปรเจ็คยังไม่เสร็จลุล่วง';
      }
    },

    formatDate(date) {
      return dayjs(date).locale('th').format('D MMMM YYYY');
    },
    async confirmDelete(id) {
      const result = await Swal.fire({
        title: 'ยืนยันการลบ',
        text: 'คุณต้องการที่จะลบโปรเจคนี้หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
      });

      if (result.isConfirmed) {
        // ถ้าผู้ใช้กดปุ่ม "ลบ"
        try {
          const response = await axios.delete(`${import.meta.env.VITE_VUE_APP_DECCAN}/requset/delete/${id}`, {
            headers: { "auth-token": `${localStorage.getItem("token")}` },
          });
          // Notify that the deletion was successful
          await Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'ลบโปรเจคสำเร็จ',
            showConfirmButton: false,
            timer: 2000
          });
          // Reload the project data
          this.fetchProjects();
        } catch (error) {
          // Notify if there's an error deleting
          console.error('Error deleting project:', error);
          await Swal.fire({
            icon: 'error',
            title: 'ไม่สำเร็จ',
            text: 'ไม่สามารถลบโปรเจคได้'
          });
        }
      }
    },
    async fetchProjectTypes() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/getall`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        // กำหนดข้อมูลให้กับตัวแปร projectTypes
        this.projectTypes = response.data.data;
      } catch (error) {
        console.error("Error fetching project types:", error);
      }
    },
    async fetchProjects() {
      try {
        this.isLoading = true;
        const response = await axios.get(`${import.meta.env.VITE_VUE_APP_PROJECT}/requset/getall`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        this.projects = response.data.data;

        // แปลงเวลาในโซน UTC เป็นเวลาในโซนไทย
        this.projects.forEach(project => {
          project.due_date = dayjs(project.due_date).locale('th').format('YYYY-MM-DD');
          project.finnish_date = dayjs(project.finnish_date).locale('th').format('YYYY-MM-DD');
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
      try {
        this.isLoading = true;
        const response = await axios.post(`${import.meta.env.VITE_VUE_APP_DECCAN}/requset/insert/project`, this.newProject, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        this.newProject = {
          progress: "",
          status_name: "",
          typeCode: "",
          title: "",
          Type: "",
          type_code: "",
          sub_type: "",
          detail: "",
          due_date: "",
          refs: {
            refs: ""
          },
          Remark: "",
        };
        // ปิดกล่อง popup
        this.showAddProjectModal = false;
        // แสดง SweetAlert2 แจ้งเตือน
        await Swal.fire({
          icon: 'success',
          title: 'เพิ่มโปรเจคสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        });
        // รีเฟรชรายการโปรเจค
        this.fetchProjects();
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message === 'ไม่พบประเภทโครงการที่ระบุ') {
          // Handle specific error condition
          await Swal.fire({
            icon: 'error',
            title: 'เพิ่มโปรเจคไม่สำเร็จ',
            text: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: 'project',
            }
          });
        } else {
          // Handle other errors
          console.error("Error submitting project:", error);
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
<style>
.project {
  z-index: 9999;
  /* กำหนดค่า Z-Index ที่ต้องการ */
}
</style>