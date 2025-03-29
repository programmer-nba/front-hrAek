<template>

  <!-- Dialog ที่จะเปิดเมื่อคลิก -->
  <dialog ref="uploadDialog" header="อัปโหลดไฟล์" position="right"
    class="px-2 sm:px-2 py-1 sm:py-1 bg-white rounded-xl shadow-lg">
    <div class="mx-10 py-2 space-y-2">
      <h2 class="text-lg font-semibold text-gray-800">อัปโหลดไฟล์</h2>
      <button @click="closeDialog" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        ✕
      </button>
      <!-- ข้อความหัวข้อสำหรับแต่ละขั้นตอน -->
      <div class="flex sm:justify-start justify-center">
        <h4 class="text-black">1. เพิ่มไฟล์สำรวจพื้นที่</h4>
      </div>
      <div class="mx-10 py-2 space-y-2">
        <input type="file" @change="e => handleImageChange(e, 'img_surway')" />

      </div>

      <div class="flex sm:justify-start justify-center">
        <h4 class="text-black">2. เพิ่มภาพขั้นตอนการทำงาน</h4>
      </div>
      <div class="mx-10 py-2 space-y-2">
        <input type="file" @change="e => handleImageChange(e, 'img_process')" />
      </div>

      <div class="flex sm:justify-start justify-center">
        <h4 class="text-black">3. เพิ่มภาพการทดสอบ</h4>
      </div>
      <div class="mx-10 py-2 space-y-2">
        <input type="file" @change="e => handleImageChange(e, 'img_testing')" />
      </div>

      <div class="flex sm:justify-start justify-center">
        <h4 class="text-black">4. เพิ่มภาพส่งมอบงาน</h4>
      </div>
      <div class="mx-10 py-2 space-y-2">
        <input type="file" @change="e => handleImageChange(e, 'img_deliverwork')" />
      </div>

      <!-- ปุ่มยืนยัน -->
      <div>
        <button @click="uploadImages" type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          ขอใบแจ้งหนี้
        </button>

        <!-- ข้อความแสดงข้อผิดพลาด -->
        <div v-if="errorMessage" class="text-red-500 mt-2">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </dialog>

  <dialog ref="expensesDialog" header="เบิกค่าใช้จ่าย" position="right"
    class="px-2 sm:px-2 py-1 sm:py-1 bg-white rounded-xl shadow-lg">
    <div class=" bg-[#EAFDFC] px-6 py-12 sm:py-24 lg:px-8 min-h-screen">
      <div class="mx-auto max-w-2xl text-center">
        <button @click="closeExpenses" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✕
        </button>
        <h2 class="text-3xl font-bold tracking-tight text-[#0002A1] sm:text-4xl">ขอเบิกค่าใช้จ่าย</h2>
      </div>
      <div class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          <div>
            <label class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันที่</label>
              <input v-model="newInvoice.date" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5">
          </div>

          <div>
            <label for="editProjectStatus"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ประเภท</label>
            <select v-model="newInvoice.title" id="editProjectStatus"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="กรอกชื่อ">
              <option disabled selected></option>
              <option value="">ค่าที่พัก</option>
              <option value="">ค่าน้ำมัน</option>
              <option value="">ค่าเบี้ยเลี้ยง</option>
              <option value="">อื่นๆ</option>
            </select>
          </div>

          <div>
            <label for="editProjectCustomer"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อ ผู้รับเงิน</label>
            <input v-model="newInvoice.firstname" type="text" id="editProjectCustomer"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="กรอกชื่อ" required />
          </div>

          <div>
            <label for="editProjectCustomer"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">นามสกุล ผู้รับเงิน</label>
            <input v-model="newInvoice.lastname" type="text" id="editProjectCustomer"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="กรอกนามสกุล" required />

          </div>

          <div>
            <label class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">จำนวนเงิน</label>
            <input v-model="newInvoice.totalAmount" type="text" id="editProjectCustomer"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="กรอกจำนวนเงิน" required />

          </div>

          <div class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">
            <h4 class="text-black"> เพิ่มรูปภาพหรือไฟล์</h4>
            <input type="file" @change="e => handleImageChange(e, 'img_invoice')"/>
          </div>

          <div class="sm:col-span-2">
            <label for="note"
              class="block w-full mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">หมายเหตุ</label>
            <textarea v-model="newInvoice.remark" id="note" placeholder="กรอกหมายเหตุ" rows="4"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"></textarea>
          </div>

        </div>
        <div class="mt-6 flex justify-between gap-4">
          <button @click="closeExpenses" type="button"
            class="w-1/2 text-red-500 inline-flex items-center justify-center bg-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-lg px-5 py-2.5 hover:text-white focus:z-10">
            <i class="pi pi-times h-4 w-4 mr-2 -ml-0.5"> </i>
            ยกเลิก
          </button>

          <button type="submit"
            class="w-1/2 rounded-md bg-[#153E90] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0E49B5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </dialog>

  <dialog ref="depositDialog" header="แจ้งฝากเงิน" position="right"
    class="px-2 sm:px-2 py-1 sm:py-1 bg-white rounded-xl shadow-lg">
    <div class=" bg-[#EAFDFC] px-6 py-12 sm:py-24 lg:px-8 min-h-screen">
      <div class="mx-auto max-w-2xl text-center">
        <button @click="closeDeposit" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✕
        </button>
        <h2 class="text-3xl font-bold tracking-tight text-[#0002A1] sm:text-4xl">แจ้งฝากเงิน</h2>
      </div>
      <div class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">

          <div>
            <label class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">วันที่</label>
            <a-date-picker
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5" />
          </div>

          <div>
            <label for="time" class="block mb-2 text-sm font-medium text-gray-900">เลือกเวลา</label>
            <input id="time" type="time"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

          </div>

          <div>
            <label for="editProjectStatus"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ธนาคาร</label>
            <select id="editProjectStatus"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5">
              <option disabled selected>เลือกธนาคาร</option>
              <option value="">ธนาคารกรุงเทพ (Bangkok Bank – BBL)</option>
              <option value="">ธนาคารกรุงไทย (Krungthai Bank – KTB)</option>
              <option value="">ธนาคารกสิกรไทย (Kasikornbank – KBank)</option>
              <option value="">ธนาคารไทยพาณิชย์ (Siam Commercial Bank – SCB)</option>
              <option value="">ธนาคารทหารไทยธนชาต (ทีเอ็มบีธนชาต) (TMBThanachart Bank – TTB)</option>
              <option value="">ธนาคารเกียรตินาคินภัทร (Kiatnakin Phatra Bank – KKP)</option>
              <option value="">ธนาคารซีไอเอ็มบี ไทย (CIMB Thai Bank – CIMBT)</option>
              <option value="">ธนาคารยูโอบี (UOB Bank – UOB)</option>
              <option value="">ธนาคารแลนด์ แอนด์ เฮ้าส์ (Land and Houses Bank – LH Bank)</option>
              <option value="">อื่นๆ</option>
            </select>
          </div>

          <div>
            <label for="editProjectCustomer"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">ชื่อ บัญชี</label>
            <input type="text" id="editProjectCustomer"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="กรอกชื่อ บัญชี" required />
          </div>

          <div>
            <label for="editProjectCustomer"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">เลขบัญชี</label>
            <input type="text" id="editProjectCustomer"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="กรอกเลขบัญชี" required />

          </div>

          <div>
            <label class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">จำนวนเงินฝาก</label>
            <input type="text" id="editProjectCustomer"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="กรอกจำนวนเงินฝาก" required />

          </div>

          <div class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">
            <h4 class="text-black"> เพิ่มรูปภาพหรือไฟล์สลิป</h4>
            <input type="file" required />
          </div>

          <div class="sm:col-span-2">
            <label for="note"
              class="block w-full mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900">หมายเหตุ</label>
            <textarea id="note" placeholder="กรอกหมายเหตุ" rows="4"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"></textarea>
          </div>

        </div>
        <div class="mt-6 flex justify-between gap-4">
          <button @click="closeDeposit" type="button"
            class="w-1/2 text-red-500 inline-flex items-center justify-center bg-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-lg px-5 py-2.5 hover:text-white focus:z-10">
            <i class="pi pi-times h-4 w-4 mr-2 -ml-0.5"> </i>
            ยกเลิก
          </button>

          <button type="submit"
            class="w-1/2 rounded-md bg-[#153E90] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0E49B5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </dialog>

  <dialog ref="receiptDialog" header="ใบเสร็จรับเงิน" position="right"
    class="px-2 sm:px-2 py-1 sm:py-1 bg-white rounded-xl shadow-lg">
    <div class="mx-10 py-2 space-y-2">
      <h2 class="text-lg font-semibold text-gray-800">แนบหลักฐานการจ่ายเงิน</h2>
      <button @click="closeReceipt" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        ✕
      </button>
      <!-- ข้อความหัวข้อสำหรับแต่ละขั้นตอน -->
      <div class="flex sm:justify-start justify-center">
        <h4 class="text-black">รูปที่ 1</h4>
      </div>
      <div class="mx-10 py-2 space-y-2">
        <input type="file" @change="handleFileChange($event, 'surveyFile')" required />
      </div>

      <div class="flex sm:justify-start justify-center">
        <h4 class="text-black">รูปที่ 2</h4>
      </div>
      <div class="mx-10 py-2 space-y-2">
        <input type="file" @change="handleFileChange($event, 'workStepFile')" required />
      </div>
      <!-- ปุ่มยืนยัน -->
      <div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          ยืนยัน
        </button>

        <!-- ข้อความแสดงข้อผิดพลาด -->
        <div v-if="errorMessage" class="text-red-500 mt-2">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </dialog>

  <dialog ref="checkinDialog" header="เช็คอินเข้างาน" position="right"
    class="px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-xl shadow-lg w-[50%] h-[50%]">
    <div class="mx-10 py-2 space-y-2">
      <h2 class="text-lg font-semibold text-gray-800">เช็คอินเข้างาน</h2>
      <button @click="closeCheckin" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        ✕
      </button>

      <div>
        <div class=" pb-6 space-y-2 text-center pt-8 hidden">
          <span
            class="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600">
            {{ workPeriodLabel }}</span>
          <h2 class="text-2xl text-cyan-900 font-bold">
            <a-statistic-countdown :value="deadline" :value-style="valueStyle" class="custom-statistic"> {{ workPeriod
              }}
            </a-statistic-countdown>
            <h1></h1>
          </h2>
        </div>
        <main class="grid grid-cols-[100%,100%] gap-6 w-full max-w-screen-lg pb-2">

          <section class="w-full relative bg-[#79E0EE]/60 rounded-[6px]">
            <CheckLocation class="scale-75 origin-top" @check="onsiteHandle" />

            <div class="-mt-px flex divide-x divide-gray-200 p-4 bg-[#11009E]">
              <div class="flex-1 w-0">

                <div class="flex flex-col justify-center items-center gap-1 mb-2">
                  <div class="text-xs font-semibold text-white"> เข้างานเช้า</div>
                  <button v-if="!TimeToDay?.morningIn" :class="!onsite ? '' : 'hover:bg-[#472e99]'" @click="logWorkTime"
                    class="px-2 py-1 text-white bg-green-500 rounded">
                    ลงเวลา
                  </button>
                  <div v-else class="text-lg text-white"> {{ TimeToDay.morningIn ? TimeToDay.morningIn : "-" }}</div>
                </div>

                <!-- <div class="flex flex-col justify-center items-center gap-1">
                          <div class="text-xs font-semibold text-white">ออกงานเช้า</div>
                          <button v-if="!TimeToDay.morningOut" :class="!onsite ? '' : 'hover:bg-[#472e99]'" @click="logWorkTime" class="px-2 py-1 text-white bg-green-500 rounded"> ลงเวลา
                          </button>
                          <div v-else class="text-lg text-white"> {{ TimeToDay.morningOut ? TimeToDay.morningOut : "-" }}</div>
                        </div> -->

              </div>
              <div class="-ml-px flex w-0 flex-1">
                <div class="flex-1 w-0">

                  <!-- <div
                            class="flex flex-col justify-center items-center gap-1 mb-2">
                            <div class="text-xs font-semibold text-white"> เข้างานบ่าย</div>
                            <button v-if="!TimeToDay.afterIn" :class="!onsite ? '' : 'hover:bg-[#472e99]'" @click="logWorkTime" class="px-2 py-1 text-white bg-green-500 rounded"> ลงเวลา
                            </button>
                            <div v-else class="text-lg text-white"> {{ TimeToDay.afterIn ? TimeToDay.afterIn : "-" }}</div>
                          </div> -->

                  <div class="flex flex-col justify-center items-center gap-1">
                    <div class="text-xs font-semibold text-white"> ออกงานบ่าย</div>
                    <button v-if="!TimeToDay?.afterOut" :class="!onsite ? '' : 'hover:bg-[#472e99]'"
                      @click="logWorkTime" class="px-2 py-1 text-white bg-green-500 rounded">
                      ลงเวลา
                    </button>
                    <div v-else class="text-lg text-white"> {{ TimeToDay.afterOut ? TimeToDay.afterOut : "-" }}</div>
                  </div>

                </div>
              </div>

            </div>
          </section>

        </main>

      </div>

    </div>
  </dialog>

  <div class="p-4 w-full h-screen">
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>
    <div class="flex justify-center mb-4">
      <a class="text-4xl">งานของฉัน</a>
    </div>

    <div class="p-4 w-full bg-gray-100 rounded-lg">
      <div class="text-2xl mb-3">
        งานเดือน {{ new Date().getMonth() + 1 }} /
        {{ new Date().getFullYear() + 543 }}
      </div>
      <div class="flex flex-wrap justify-between items-center gap-2 mb-3">
        <div class="flex flex-wrap items-center gap-2">
          <input v-model="searchQuery" placeholder="ค้นหาชื่อ"
            class="h-10 px-2 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
            @keyup="searchProjects" />

          <label for="filterStatus" class="text-gray-600">สถานะ:</label>
          <Dropdown v-model="filterStatus" placeholder="สถานะ" :options="filstatus" optionLabel="name"
            optionValue="value" class="border" filter @change="searchProjects" />
          <!-- {{ console.log(checkedMe) }} -->
          <Checkbox v-model="checkedMe" class="border rounded" :binary="true" @change="searchProjects" />
          <label class="text-gray-600">งานของฉัน</label>
        </div>
        <div>

        </div>
      </div>

      <div class="w-full flex justify-center">
        <table class="shadow">
          <thead>
            <tr class="bg-white text-center">
              <th class="p-4">รหัส</th>
              <th class="p-4">หัวข้อ</th>
              <th class="p-4">สถานะ</th>
              <th class="p-4">วันกำหนดส่ง</th>
              <th class="p-4">รายละเอียด</th>
              <th class="p-4">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project, i) in paginated" :key="i" class="bg-white">
              <td class="py-2 px-4">{{ project.code }}</td>
              <td class="py-2 px-4">{{ project.title }}</td>
              <td class="py-2 px-4">
                <div>
                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !==
                    'ส่งงานแล้ว'
                  " icon="pi pi-angle-double-up" :label="project.status[project.status.length - 1].name" :class="[
                      project.status[project.status.length - 1].name ===
                        'รอรับงาน'
                        ? 'bg-teal-500'
                        : project.status[project.status.length - 1].name ===
                          'กำลังดำเนินการ'
                          ? 'bg-yellow-500'
                          : project.status[project.status.length - 1].name ===
                            'งานถูกยกเลิก'
                            ? 'bg-red-500'
                            : project.status[project.status.length - 1].name ===
                              'เสร็จแล้ว'
                              ? 'bg-blue-500'
                              : 'bg-gray-500', // กรณีอื่นๆ ใช้สีเทา
                    ]" class="px-3 py-2 text-white inline-block rounded hover:shadow-lg"
                    @click="viewStatus(project)" />
                  <ButtonP v-if="
                    project.status[project.status.length - 1].name ===
                    'ดำเนินการสำเร็จ' ||
                    project.status[project.status.length - 1].name ===
                    'ส่งงานแล้ว'
                  " @click="viewStatus(project)" icon="pi pi-check" label="ส่งงานแล้ว"
                    class="px-3 py-2 text-white bg-blue-500 inline-block rounded hover:shadow-lg" />
                </div>
              </td>
              <td class="py-2 px-4">
                <div>{{ formatDate(project.dueDate) }}</div>
                <span v-if="isOverdue(project.dueDate)" class="text-red-500">
                  (เลยกำหนด {{ calculateDays(project.dueDate) }} วัน)
                </span>
              </td>
              <td class="py-2 px-4">
                <ButtonP @click="viewDetails(project)" label="ดูรายละเอียด"
                  class="px-3 py-2 text-green-500 border-2 border-green-500 rounded hover:bg-green-500 hover:text-white" />
              </td>
              <td class="py-2 px-4"> {{ console.log(project) }}
                <div class="flex flex-wrap gap-2">
                  <ButtonP v-if="
                    project.status[project.status.length - 1].name ===
                    'รอรับงาน'
                  " @click="acceptWork(project)" label="รับงานนี้"
                    class="px-3 py-2 text-blue-500 border-2 border-blue-500 rounded hover:bg-blue-500 hover:text-white" />

                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !==
                    'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !==
                    'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !==
                    'ส่งงานแล้ว'
                  " @click="openCheckin" label="เช็คอินเข้างาน"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />

                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !==
                    'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !==
                    'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !==
                    'ส่งงานแล้ว'
                  " @click="updateWork(project)" label="อัพเดทงาน"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />
                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !==
                    'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !==
                    'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !==
                    'ส่งงานแล้ว'
                  " @click="() => { detailEmployee = project; openDialog(); }" label="อัพโหลดไฟล์"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />

                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !==
                    'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !==
                    'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !==
                    'ส่งงานแล้ว'
                  " @click="openExpenses" label="เบิกค่าใช้จ่าย"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />

                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !==
                    'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !==
                    'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !==
                    'ส่งงานแล้ว'
                  " @click="openDeposit" label="แจ้งฝากเงิน"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />

                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !==
                    'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !==
                    'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !==
                    'ส่งงานแล้ว'
                  " @click="openReceipt" label="ใบเสร็จรับเงิน"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />

                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !==
                    'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !==
                    'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !==
                    'ส่งงานแล้ว'
                  " @click="completedWork(project)" label="ปิดงาน"
                    class="px-3 py-2 text-red-500 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white" />
                </div>
              </td>
            </tr>
            <tr v-if="paginated.length === 0">
              <td colspan="8">
                <div class="p-8 text-center">ไม่มีงาน</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="totalPages > 1" class="flex justify-center mt-4 gap-1">
        <ButtonP @click="currentPage = 1" :disabled="currentPage < 2" icon="pi pi-angle-double-left"
          class="px-4 py-2 text-white border bg-gray-800 hover:bg-gray-950 rounded" />
        <ButtonP @click="currentPage--" :disabled="currentPage < 2" icon="pi pi-angle-left"
          class="px-4 py-2 text-white border bg-gray-800 hover:bg-gray-950 rounded" />
        <div class="px-2 py-2 text-white border bg-gray-900 rounded">
          หน้า {{ currentPage }}/{{ totalPages }}
        </div>
        <ButtonP @click="currentPage++" :disabled="currentPage === totalPages" icon="pi pi-angle-right"
          class="px-4 py-2 text-white border bg-gray-800 hover:bg-gray-950 rounded" />
        <ButtonP @click="currentPage = totalPages" :disabled="currentPage === totalPages"
          icon="pi pi-angle-double-right" class="px-4 py-2 text-white border bg-gray-800 hover:bg-gray-950 rounded" />
      </div>
    </div>

    <Sidebar v-model:visible="Detailsvisible" header="ข้อมูลเพิ่มเติม" position="right" class="w-4/12">
      <div class="grid grid-cols-2 gap-8">
        {{ console.log(detailEmployee) }}
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
          <p>{{ formatDate(detailEmployee.startDate) }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">วันที่ครบกำหนด</label>
          <p>{{ formatDate(detailEmployee.dueDate) }}</p>
        </div>
        <!-- <div class="mb-4">
          <label class="block text-sm font-bold mb-2">ความคืบหน้า</label>
          <p>{{ detailEmployee.progress }}%</p>
        </div> -->
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">สถานะ</label>
          <p>
            {{ detailEmployee.status[detailEmployee.status.length - 1].name }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">พนักงาน</label>
          <p v-for="emp in detailEmployee.employees" :key="emp">
            {{ filterEmployees(emp) }}
          </p>
          <p v-if="detailEmployee.employees.length < 1">ไม่มี</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">ลูกค้า</label>
          <p>ชื่อ : {{ detailEmployee.customer.customer_name || "ไม่มี" }}</p>
          <p>
            เบอร์โทรศัพท์ :
            {{ detailEmployee.customer.customer_tel || "ไม่มี" }}
          </p>
          <p>Line : {{ detailEmployee.customer.customer_line || "ไม่มี" }}</p>
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
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">ใบเสร็จเลขที่</label>
          <p>{{ detailEmployee.billNo || "ไม่มี" }}</p>
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

    <Dialog v-model:visible="AddProjectModal" modal class="w-full md:w-5/6 lg:w-2/3 xl:w-1/2" header="เพิ่มโปรเจคใหม่">
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
            <CalendarP v-model="newProject.dueDate"
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
        <div class="mb-6">
          <button @click.prevent="submitProject"
            class="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none">
            เพิ่มงาน
          </button>
        </div>
      </form>
    </Dialog>

    <Dialog v-model:visible="DetailsStatus" modal header="รายละเอียดอัพเดตงาน" style="min-width: 320px">
      {{ console.log("detailEmployee", detailEmployee) }}
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

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th";
import CheckLocation from "../etc/CheckLocation.vue";
import MiniEvents from "../props/MiniEvents.vue";
import EventReminds from "../props/EventReminds.vue";


const img_surway = ref('');
const img_process = ref('');
const img_testing = ref('');
const img_deliverwork = ref('');
const img_invoice = ref('')

const newInvoice = ref({})



async function handleImageChange(event, type) {
  const file = event.target.files[0];
  if (!file) return;

  const base64 = await convertToBase64(file);

  if (type === 'img_surway') img_surway.value = base64;
  else if (type === 'img_process') img_process.value = base64;
  else if (type === 'img_testing') img_testing.value = base64;
  else if (type === 'img_deliverwork') img_deliverwork.value = base64;
  else if (type === 'img_invoice') img_invoice.value = base64
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

async function uploadImages() {
  try {
    //id project
    const id = detailEmployee.value?._id;
    if (!id) {
      alert("ไม่พบ ID โปรเจคที่จะอัปโหลด");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/project/upload/${id}`,
      {
        img_surway: img_surway.value,
        img_process: img_process.value,
        img_testing: img_testing.value,
        img_deliverwork: img_deliverwork.value,
      },
    );

    alert(' อัปโหลดรูปภาพสำเร็จ');
    closeDialog();
    console.log('Upload response:', response.data);
  } catch (error) {
    console.error(' เกิดข้อผิดพลาดในการอัปโหลด:', error);
    alert('เกิดข้อผิดพลาดในการอัปโหลด');
  }
}
///////////////
const myComponent = {
  components: {
    CheckLocation,

    MiniEvents,
    EventReminds,
  },
  data() {
    return {
      marquee: "",
      onsite: false,
      ME: {},
      TimeToWork: [],
      TimeToDay: {},
      deadline: new Date(),
      valueStyle: {
        color: "#146C94",
        fontSize: "48px",
      },
      currentLocation: "",
      remindEvents: [],

      projectId: '', //  ให้เซตจาก route หรือข้อมูลปัจจุบัน

    };
  },


  mounted() {
    this.fetchTimeData();
    this.fetchTimeToDay();
    this.fetchMe();

    console.log(new Date());

    const currentTime = new Date();
    let startCountdown = this.getNextDeadline(currentTime);

    this.deadline = startCountdown;

    setInterval(() => {
      if (this.deadline <= 0) {
        startCountdown = this.getNextDeadline(new Date());
        this.deadline = startCountdown;
        this.fetchTimeData();
      }
    }, 1000);
  },

  computed: {
    workPeriodLabel() {
      const currentTime = new Date();
      if (currentTime.getHours() >= 18 || currentTime.getHours() < 9) {
        return "รอเข้างานช่วงเช้า";
      } else if (currentTime.getHours() >= 9 && currentTime.getHours() < 12) {
        return "รอออกงานช่วงเช้า";
      } else if (currentTime.getHours() >= 12 && currentTime.getHours() < 13) {
        return "รอเข้างานช่วงบ่าย";
      } else if (currentTime.getHours() >= 13 && currentTime.getHours() < 18) {
        return "รอออกงานช่วงบ่าย";
      } else {
        return "รอเข้างานช่วงเช้า";
      }
    },
  },
  getNextDeadline(currentTime) {
    if (currentTime.getHours() >= 18) {
      return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 9, 0, 0, 0);
    } else if (currentTime.getHours() >= 12) {
      return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 18, 0, 0, 0);
    } else if (currentTime.getHours() >= 9) {
      return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 12, 0, 0, 0);
    } else {
      return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0, 0, 0);
    }
  },

  eventEmitHanler(val) {
    this.remindEvents = val.filter((ev) => ev.remind);
  },

  onsiteHandle(e) {
    this.onsite = e;
  },

  goToOTPage() {
    this.$router.push({ name: "OT" });
  },

  redirectToTimeToWork() {
    this.$router.push("/TimeToWork");
  },

  getImageUrl(imageId) {
    return `https://drive.google.com/thumbnail?id=${imageId}`;
  },

  formatDate(date) {
    return new Date(date).toLocaleDateString("th-TH");
  },

  formatDate(dateString) {
    const date = dayjs(dateString);
    return date.locale("th").format("D MMMM YYYY");
  },

  isToday(date) {
    const today = new Date();
    const inputDate = new Date(date);
    return today.toDateString() === inputDate.toDateString();
  },

  async fetchMe() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getme`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.data.data) {
        this.ME = response.data.data;
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  },
  async fetchTimeData() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.data.data) {
        this.TimeToWork = response.data.data.reverse();
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  },

  async fetchTimeToDay() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/time/getday`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.data.data) {
        this.TimeToDay = response.data.data;
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  },

  async logWorkTime() {
    try {
      await Swal.fire({
        icon: "info",
        title: "กำลังลงเวลาเข้างาน...",
        showConfirmButton: false,
        timer: 1500,
      });

      const response = await axios.post(`${import.meta.env.VITE_VUE_APP_DECCAN}/time/morning/in`, {}, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      await Swal.fire({
        icon: "success",
        html: `
            <p>ลงเวลาสำเร็จ</p>
            <p>เวลา: ${response.data.data.time}</p>
            <p>ผู้ลงเวลา: ${this.ME.first_name} ${this.ME.last_name}</p>
          `,
      });

      this.fetchTimeData();
      this.fetchTimeToDay();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "ยังไม่ถึงเวลาลงงานขณะนี้",
      });
      console.error("เกิดข้อผิดพลาดในการบันทึกเวลาเข้างาน:", error);
    }
  },
};


///////////////
const checkinDialog = ref(null);


const openCheckin = () => {
  if (checkinDialog.value) {
    checkinDialog.value.showModal(); // เปิด dialog
  }

  // เรียกใช้งาน myComponent หลังเปิด dialog
  if (myComponent.value) {
    myComponent.value.doSomething();
  }
};

const closeCheckin = () => {
  checkinDialog.value.close();
};
///////////
const receiptDialog = ref(null);

const openReceipt = () => {
  receiptDialog.value.showModal();
};

const closeReceipt = () => {
  receiptDialog.value.close();
};
/////////////
const depositDialog = ref(null);

const openDeposit = () => {
  depositDialog.value.showModal();
};

const closeDeposit = () => {
  depositDialog.value.close();
};
////////////
const expensesDialog = ref(null);

const openExpenses = () => {
  expensesDialog.value.showModal();
};

const closeExpenses = () => {
  expensesDialog.value.close();
};
///////////////
const uploadDialog = ref(null);
const errorMessage = ref('');

const openDialog = () => {
  uploadDialog.value.showModal();
};

const closeDialog = () => {
  uploadDialog.value.close();
};



const updateWorks = (project) => {
  if (!project) {
    errorMessage.value = 'กรุณากรอกข้อมูลให้ครบถ้วน';
    return;
  }
  console.log('Updating work:', project);
  closeDialog();
};
/////////////
const loading = ref(false);
onMounted(async () => {
  await getMe();
  fetchProjectTypes();
  getEmployeeAll();
  getProjectAll();
});

const itemMe = ref([]);
const getMe = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(res);
    itemMe.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const projects = ref([]);
const projectOrigin = ref([]);
const getProjectAll = async () => {
  try {
    loading.value = true;
    const res = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/project`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(res);
    const data = res.data.data;
    // .filter(
    //   (item) => item.projectSubType === itemMe.value.position
    // );
    projects.value = data.slice().reverse();
    projectOrigin.value = data.slice().reverse();
    searchProjects();
    loading.value = false;
  } catch (e) {
    console.log(e);
  }
};
const currentPage = ref(1);
const itemsPerPage = 10;
const paginated = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return projects.value.slice(startIndex, endIndex);
});
const totalPages = computed(() =>
  Math.ceil(projects.value.length / itemsPerPage)
);

const detailEmployee = ref([]);
const Detailsvisible = ref(false);
const viewDetails = (project) => {
  // console.log(project);
  detailEmployee.value = project;
  Detailsvisible.value = true;
};

const DetailsStatus = ref(false);
const viewStatus = (project) => {
  // console.log(project);
  detailEmployee.value = project.status.slice().reverse();
  DetailsStatus.value = true;
};

const projectTypes = ref([]);
const fetchProjectTypes = async () => {
  try {
    loading.value = true;
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/project-types`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    // กำหนดข้อมูลให้กับตัวแปร projectTypes
    // console.log("types", response.data.data);
    projectTypes.value = response.data.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching project types:", error);
  }
};

const employeeAll = ref([]);
const getEmployeeAll = async () => {
  try {
    loading.value = true;
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/get`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    // console.log(res);
    employeeAll.value = res.data.data;
    loading.value = false;
  } catch (e) {
    console.log(e);
  }
};
function filterEmployees(id) {
  let filemp = employeeAll.value;
  filemp = filemp.find((emp) => emp._id === id);
  // console.log('filemp',filemp);
  return filemp?.first_name || "" + " " + filemp?.last_name || "";
}

//เพิ่มงาน
const AddProjectModal = ref(false);
const newProject = ref({});
const submitProject = async () => {
  try {
    let payload = newProject.value;
    payload.code = newProject.value.type?.code;
    payload.projectType = newProject.value.type?._id;
    // console.log(payload);
    // return;
    if (payload.code === undefined || payload.projectType === undefined) {
      Swal.fire({
        title: "error!",
        text: "Please Your Put Data.",
        icon: "error",
        timer: 1500,
      });
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/project`,
      payload,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    Swal.fire({
      title: "success!",
      text: "Your success.",
      icon: "success",
      timer: 1500,
    });
    getProjectAll();
    newProject.value = {};
    AddProjectModal.value = false;
  } catch (e) {
    console.log(e);
    Swal.fire({
      title: "error!",
      text: "Your error.",
      icon: "error",
      timer: 1500,
    });
  }
};

const acceptWork = async (project) => {
  try {
    const billNo = project.billNo;
    const id = project._id;
    console.log(billNo, id);
    // --------------- ฝากแก้ตรงนี้ใหม่ด้วย ---------------
    //Office
    if (billNo.substring(0, 2) != "TG") {
      Swal.fire({
        title: "งานใหม่มาถึงแล้ว?",
        text: "ยืนยันการรับงาน OFFICE!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await getOffice(id);
        }
      });
    }
    //TOSSAGUNS
    if (billNo.substring(0, 2) === "TG") {
      Swal.fire({
        title: "งานใหม่มาถึงแล้ว?",
        text: "ยืนยันการรับงาน TOSSAGUNS!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = { employees: itemMe.value._id };
          const res = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/project/${id}/update`,
            data,
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          console.log("confirm", res);
          Swal.fire({
            title: "สําเร็จ!",
            text: "คุณได้รับงานนี้แล้ว",
            icon: "success",
            timer: 2000,
          });
          getProjectAll();
        }
      });
    }
  } catch (e) {
    console.log("confirm", e);
  }
};
const getOffice = async (id) => {
  try {
    console.log("ididid", id);
    const data = { employees: [itemMe.value._id] };
    const res = await axios.put(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/project/${id}/accept-office`,
      data,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log("project", res);
    Swal.fire({
      title: "สําเร็จ!",
      text: "คุณได้รับงานนี้แล้ว",
      icon: "success",
      timer: 2000,
    });
    getProjectAll();
  } catch (e) {
    console.log("project", e);
    Swal.fire({
      title: "error!",
      text: "Is not completed.",
      icon: "error",
      timer: 2000,
    });
  }
};

const updateWork = async (project) => {
  try {
    const id = project._id;
    const billNo = project.billNo;
    //เช็คงาน
    if (!project.employees.includes(itemMe.value._id)) {
      Swal.fire({
        title: "งานนี้ไม่ใช่งานของคุณ!",
        text: "โปรดอัพเดตงานของคุณ",
        icon: "info",
        timer: 2000,
      });
      return;
    }
    //รอยืนยันอัพเดต
    const { value: status } = await Swal.fire({
      input: "text",
      inputPlaceholder: "รายละเอียด . . .",
      // title: "อัพเดตงานล่าสุด?",
      text: "อัพเดตงานล่าสุด?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write status!";
        }
      },
    });
    //ทำการอัพเดต
    if (billNo.substring(0, 2) !== "TG" && status) {
      console.log("status", status);
      // return;
      const body = { status: status };
      const res = await axios.put(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/project/${id}/update-office`,
        body,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log("update", res);
      Swal.fire({
        title: "สำเร็จ!",
        text: "อัพเดตงานสำเร็จ",
        icon: "success",
        timer: 2000,
      });
      getProjectAll();
    }
    //tossaguns
    if (billNo.substring(0, 2) === "TG" && status) {
      const res = await axios.put(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/project/${id}/update`,
        null,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log("update", res);
      Swal.fire({
        title: "สำเร็จ!",
        text: "อัพเดตงานสำเร็จ",
        icon: "success",
        timer: 2000,
      });
      getProjectAll();
    }
  } catch (e) {
    console.log("update", e);
    Swal.fire({
      title: "error!",
      text: "Is not completed.",
      icon: "error",
      timer: 2000,
    });
  }
};

const completedWork = async (project) => {
  try {
    if (!project.employees.includes(itemMe.value._id)) {
      Swal.fire({
        title: "งานนี้ไม่ใช่งานของคุณ!",
        text: "โปรดอัพเดตงานของคุณ",
        icon: "info",
        timer: 2000,
      });
      return;
    }
    // ส่งงาน office
    if (project.billNo.substring(0, 2) != "TG") {
      Swal.fire({
        title: "ยืนยันการส่งงาน?",
        text: "ส่งงาน OFFICE!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept",
      }).then(async (result) => {
        // --------------- ฝากแก้ใหม่หน่อย ตรงนี้---------------
        if (result.isConfirmed) {
          const id = project._id;
          const body = {
            status: "ส่งงานแล้ว",
          };
          const res = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN
            }/project/${id}/update-office`,
            body
          );
          console.log("confirm", res);
          Swal.fire({
            title: "สำเร็จ!",
            text: "ส่งงานสำเร็จ",
            icon: "success",
            timer: 2000,
          });
          getProjectAll();
        }
      });
    }
    // ส่งงาน TOSSAGUNS
    if (project.billNo.substring(0, 2) === "TG") {
      const id = project._id;
      Swal.fire({
        title: "คุณกำลังจะส่งงานแล้ว?",
        text: "ยืนยันการส่งงานใช่ไหม!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/project/${id}/submit`,
            null,
            {
              headers: {
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          console.log("completed", res);
          Swal.fire({
            title: "ส่งงานแล้ว!",
            text: "คุณได้ส่งงานสำเร็จแล้ว",
            icon: "success",
            timer: 2000,
          });
          getProjectAll();
        }
      });
    }
  } catch (e) {
    console.log("completed", e);
    Swal.fire({
      title: "error!",
      text: "Is not completed.",
      icon: "error",
      timer: 2000,
    });
  }
};

const filterStatus = ref("");
const filstatus = ref([
  { name: "ทั้งหมด", value: "" },
  { name: "โปรเจ็คเสร็จลุล่วง", value: "โปรเจ็คเสร็จลุล่วง" },
  { name: "อยู่ระหว่างการทำงาน", value: "อยู่ระหว่างการทำงาน" },
  { name: "โปรเจ็ครอการอนุมัติ", value: "โปรเจ็ครอการอนุมัติ" },
  { name: "โปรเจ็คถูกระงับ", value: "โปรเจ็คถูกระงับ" },
]);
const filterType = ref("");
const filtype = ref([
  { name: "ทั้งหมด", value: "" },
  { name: "Programmer", value: "PRG" },
  { name: "Graphic", value: "GRP" },
]);
const searchQuery = ref("");
const checkedMe = ref(false);

const searchProjects = () => {
  // console.log(projectOrigin.value);
  currentPage.value = 1;
  let fildata = projectOrigin.value;
  let searchKey = searchQuery.value.toLowerCase();
  if (searchKey) {
    fildata = fildata.filter(
      (item) =>
        item.code.toLowerCase().includes(searchKey) ||
        item.title.toLowerCase().includes(searchKey) ||
        item.status[item.status.length - 1].name
          .toLowerCase()
          .includes(searchKey)
    );
  }
  let filType = filterType.value;
  if (filType) {
    fildata = fildata.filter((item) => item.code.substring(0, 3) === filType);
  }
  let filStatus = filterStatus.value;
  if (filStatus) {
    fildata = fildata.filter(
      (item) => item.status[item.status.length - 1].name === filStatus
    );
  }
  // console.log(itemMe.value._id);
  if (checkedMe.value === true) {
    fildata = fildata.filter((item) =>
      item.employees.includes(itemMe.value._id)
    );
  }
  // console.log(fildata);
  projects.value = fildata;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const formatTime = (timestamp) => {
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
};
const isOverdue = (date) => {
  const differenceInDays = calculateDays(date);
  return differenceInDays > 0;
};
//ความต่างของวัน
const calculateDays = (date) => {
  const currentDate = new Date();
  const itemDate = new Date(date);
  // const differenceInTime = currentDate.getTime() - itemDate.getTime();
  const differenceInTime = currentDate.getTime() - itemDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};
</script>
<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}
</style>
