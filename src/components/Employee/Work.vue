<template>
  <!-- Dialog ที่จะเปิดเมื่อคลิก -->
  <dialog ref="uploadDialog" header="อัปโหลดไฟล์" position="right"
    class="px-4 sm:px-6 py-6 sm:py-8 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full">
    <div class="space-y-6">
      <!-- Header with close button -->
      <div class="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 class="text-xl font-bold text-gray-800">อัปโหลดไฟล์งาน</h2>
        <button @click="closeDialog" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="space-y-6">
        <div class="space-y-3">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium mr-3">
              1</div>
            <h4 class="text-lg font-medium text-gray-700">เพิ่มไฟล์สำรวจพื้นที่</h4>
          </div>

          <div v-if="!img_surway"
            class="border-2 border-dashed border-gray-300 rounded-lg pt-3 text-center hover:border-green-400 transition-colors">
            <input type="file" @change="(e) => handleImageChange(e, 'img_surway')" class="hidden" id="surveyInput" />
            <label for="surveyInput" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="mt-1 text-sm text-gray-500">เลือกไฟล์</p>
            </label>
          </div>
          <div v-else class="flex justify-center">
            <img :src="img_surway" alt="img_surway" class="w-full max-w-[200px] h-auto">
          </div>
        </div>

        <!-- Section 2 - Process -->
        <div class="space-y-3">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3">2
            </div>
            <h4 class="text-lg font-medium text-gray-700">เพิ่มภาพขั้นตอนการทำงาน</h4>
          </div>

          <div v-if="!img_process"
            class="border-2 border-dashed border-gray-300 rounded-lg pt-3 text-center hover:border-blue-400 transition-colors">
            <input type="file" @change="(e) => handleImageChange(e, 'img_process')" class="hidden" id="processInput" />
            <label for="processInput" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="mt-1 text-sm text-gray-500">เลือกไฟล์</p>
            </label>
          </div>
          <div v-else class="flex justify-center">
            <img :src="img_process" alt="img_process" class="w-full max-w-[200px] h-auto">
          </div>
        </div>

        <!-- Section 3 - Testing -->
        <div class="space-y-3">
          <div class="flex items-center">
            <div
              class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium mr-3">3
            </div>
            <h4 class="text-lg font-medium text-gray-700">เพิ่มภาพการทดสอบ</h4>
          </div>

          <div v-if="!img_testing"
            class="border-2 border-dashed border-gray-300 rounded-lg pt-3 text-center hover:border-purple-400 transition-colors">
            <input type="file" @change="(e) => handleImageChange(e, 'img_testing')" class="hidden" id="testingInput" />
            <label for="testingInput" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p class="mt-1 text-sm text-gray-500">เลือกไฟล์</p>
            </label>
          </div>
          <div v-else class="flex justify-center">
            <img :src="img_testing" alt="img_testing" class="w-full max-w-[200px] h-auto">
          </div>

        </div>

        <!-- Section 4 - Delivery -->
        <div class="space-y-3">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-medium mr-3">
              4</div>
            <h4 class="text-lg font-medium text-gray-700">เพิ่มภาพส่งมอบงาน</h4>
          </div>

          <div v-if="!img_deliverwork"
            class="border-2 border-dashed border-gray-300 rounded-lg pt-3 text-center hover:border-amber-400 transition-colors">
            <input type="file" @change="(e) => handleImageChange(e, 'img_deliverwork')" class="hidden"
              id="deliveryInput" />
            <label for="deliveryInput" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p class="mt-1 text-sm text-gray-500">เลือกไฟล์</p>
            </label>
          </div>

          <div v-else class="flex justify-center">
            <img :src="img_deliverwork" alt="img_deliverwork" class="w-full max-w-[200px] h-auto">
          </div>
        </div>
      </div>

      <!-- Submit button -->
      <div class="pt-4">
        <button @click="uploadImagesInvoice" type="submit"
          class="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span v-if="position === 'พนักงานภาคสนาม'">ขอใบแจ้งหนี้</span>
          <span v-if="position === 'ช่างเทคนิค'">ส่งงาน</span>
        </button>

        <!-- Error message -->
        <div v-if="errorMessage" class="text-red-500 mt-3 text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </dialog>

  <dialog ref="expensesDialog" header="เบิกค่าใช้จ่าย" position="right"
    class="px-2 sm:px-2 py-1 sm:py-1 bg-white rounded-xl shadow-lg">
    <div class="bg-gradient-to-b from-[#EAFDFC] to-[#D9F1F0] px-6 py-12 sm:py-16 lg:px-8 min-h-screen relative">
      <!-- Header with decorative elements -->
      <div class="mx-auto max-w-2xl text-center relative">
        <div class="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-blue-100 opacity-50"></div>
        <div class="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-blue-100 opacity-50"></div>

        <button @click="closeExpenses"
          class="absolute top-0 right-0 text-gray-500 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 class="text-3xl font-bold tracking-tight text-[#0002A1] sm:text-4xl mb-2">
          ขอเบิกค่าใช้จ่าย
        </h2>
        <p class="text-sm text-gray-600">กรอกข้อมูลให้ครบถ้วนเพื่อขอเบิกค่าใช้จ่าย</p>
      </div>

      <div class="mx-auto mt-10 max-w-xl sm:mt-14 bg-white p-6 rounded-xl shadow-md">
        <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div class="group">
            <label
              class="block mb-1 text-sm font-medium text-gray-900 group-hover:text-blue-800 transition-colors">วันที่</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input v-model="newInvoice.date" type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all hover:border-blue-300" />
            </div>
          </div>

          <div class="group">
            <label for="editProjectStatus"
              class="block mb-1 text-sm font-medium text-gray-900 group-hover:text-blue-800 transition-colors">ประเภท</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <select v-model="newInvoice.title" id="editProjectStatus"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all hover:border-blue-300">
                <option disabled selected value="">เลือกประเภทค่าใช้จ่าย</option>
                <option value="ค่าที่พัก">ค่าที่พัก</option>
                <option value="ค่าน้ำมัน">ค่าน้ำมัน</option>
                <option value="ค่าเบี้ยเลี้ยง">ค่าเบี้ยเลี้ยง</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
          </div>

          <div class="group">
            <label for="firstname"
              class="block mb-1 text-sm font-medium text-gray-900 group-hover:text-blue-800 transition-colors">ชื่อ
              ผู้รับเงิน</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input v-model="newInvoice.firstname" type="text" id="firstname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all hover:border-blue-300"
                placeholder="กรอกชื่อ" required />
            </div>
          </div>

          <div class="group">
            <label for="lastname"
              class="block mb-1 text-sm font-medium text-gray-900 group-hover:text-blue-800 transition-colors">นามสกุล
              ผู้รับเงิน</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input v-model="newInvoice.lastname" type="text" id="lastname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all hover:border-blue-300"
                placeholder="กรอกนามสกุล" required />
            </div>
          </div>

          <div class="group">
            <label for="amount"
              class="block mb-1 text-sm font-medium text-gray-900 group-hover:text-blue-800 transition-colors">จำนวนเงิน</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input v-model="newInvoice.totalAmount" type="text" id="amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition-all hover:border-blue-300"
                placeholder="กรอกจำนวนเงิน" required />
            </div>
          </div>

          <div class="group">
            <label
              class="block mb-1 text-sm font-medium text-gray-900 group-hover:text-blue-800 transition-colors">เพิ่มรูปภาพหรือไฟล์</label>
            <div v-if="!img_invoice" class="flex items-center justify-center w-full">
              <label for="fileUpload"
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-1 text-xs text-gray-500"><span class="font-semibold">คลิกเพื่อเลือกไฟล์</span></p>
                  <p class="text-xs text-gray-500">รองรับ PNG, JPG หรือ PDF</p>
                </div>
                <input id="fileUpload" type="file" @change="(e) => handleImageChange(e, 'img_invoice')"
                  class="hidden" />
              </label>
            </div>
            <div class="flex justify-center" v-else>
              <img :src="img_invoice" alt="ImgInvoice" class="w-24 h-24">
            </div>

          </div>

          <div class="sm:col-span-2 group">
            <label for="note"
              class="block mb-1 text-sm font-medium text-gray-900 group-hover:text-blue-800 transition-colors">หมายเหตุ</label>
            <div class="relative">
              <div class="absolute top-3 left-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <textarea v-model="newInvoice.remark" id="note" placeholder="กรอกหมายเหตุ (ถ้ามี)" rows="3"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 transition-all hover:border-blue-300"></textarea>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-between gap-4">
          <button @click="closeExpenses" type="button"
            class="w-1/2 text-red-500 inline-flex items-center justify-center bg-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-sm px-5 py-2.5 hover:text-white focus:z-10 transition-all">
            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            ยกเลิก
          </button>

          <button type="submit" @click="submitInvoice()"
            class="w-1/2 rounded-lg bg-gradient-to-r from-[#153E90] to-[#0E49B5] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:from-[#0E49B5] hover:to-[#0A3D9C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
            <span class="flex items-center justify-center">
              <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              บันทึก
            </span>
          </button>
        </div>
      </div>
    </div>
  </dialog>

  <dialog ref="depositDialog" header="แจ้งฝากเงิน" position="right"
    class="px-2 sm:px-2 py-1 sm:py-1 bg-white rounded-xl shadow-lg">
    <div class="bg-gradient-to-br from-[#EAFDFC] to-[#e0f7ff] px-6 py-12 sm:py-16 lg:px-8 min-h-screen">
      <div class="mx-auto max-w-2xl text-center relative">
        <button @click="closeDeposit"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-all duration-300 bg-white rounded-full p-2 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
        <div class="mb-8">
          <div class="flex justify-center mb-4">
            <div class="bg-[#0002A1] p-4 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                <path
                  d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
              </svg>
            </div>
          </div>
          <h2 class="text-3xl font-bold tracking-tight text-[#0002A1] sm:text-4xl drop-shadow-sm">
            แจ้งฝากเงิน
          </h2>
          <p class="mt-2 text-gray-600">กรุณากรอกข้อมูลให้ครบถ้วนเพื่อแจ้งการฝากเงินของท่าน</p>
        </div>
      </div>

      <div class="mx-auto mt-8 max-w-xl sm:mt-12 bg-white p-6 rounded-xl shadow-lg">
        <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div>
            <label class="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">วันที่</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0002A1" viewBox="0 0 16 16">
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
              </div>
              <input v-model="deposit.date" type="date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" />
            </div>
          </div>

          <div>
            <label for="time" class="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">เลือกเวลา</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0002A1" viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
              </div>
              <input id="time" type="time"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                v-model="deposit.time" />
            </div>
          </div>

          <div>
            <label for="editProjectStatus"
              class="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">ธนาคาร</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0002A1" viewBox="0 0 16 16">
                  <path
                    d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                </svg>
              </div>
              <select id="editProjectStatus" v-model="deposit.bank"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5">
                <option disabled selected>เลือกธนาคาร</option>
                <option value="ธนาคารกรุงเทพ (Bangkok Bank – BBL)">ธนาคารกรุงเทพ (Bangkok Bank – BBL)</option>
                <option value="ธนาคารกรุงไทย (Krungthai Bank – KTB)">ธนาคารกรุงไทย (Krungthai Bank – KTB)</option>
                <option value="ธนาคารกสิกรไทย (Kasikornbank – KBank)">ธนาคารกสิกรไทย (Kasikornbank – KBank)</option>
                <option value="ธนาคารไทยพาณิชย์ (Siam Commercial Bank – SCB)">ธนาคารไทยพาณิชย์ (Siam Commercial Bank –
                  SCB)</option>
                <option value="ธนาคารทหารไทยธนชาต (ทีเอ็มบีธนชาต) (TMBThanachart Bank – TTB)">ธนาคารทหารไทยธนชาต
                  (ทีเอ็มบีธนชาต) (TMBThanachart Bank – TTB)</option>
                <option value="ธนาคารเกียรตินาคินภัทร (Kiatnakin Phatra Bank – KKP)">ธนาคารเกียรตินาคินภัทร (Kiatnakin
                  Phatra Bank – KKP)</option>
                <option value="ธนาคารซีไอเอ็มบี ไทย (CIMB Thai Bank – CIMBT)">ธนาคารซีไอเอ็มบี ไทย (CIMB Thai Bank –
                  CIMBT)</option>
                <option value="ธนาคารยูโอบี (UOB Bank – UOB)">ธนาคารยูโอบี (UOB Bank – UOB)</option>
                <option value="ธนาคารแลนด์ แอนด์ เฮ้าส์ (Land and Houses Bank – LH Bank)">ธนาคารแลนด์ แอนด์ เฮ้าส์ (Land
                  and Houses Bank – LH Bank)</option>
              </select>
            </div>
          </div>

          <div>
            <label for="editProjectCustomer"
              class="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">ชื่อบัญชี</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0002A1" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <input type="text" id="editProjectCustomer"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="กรอกชื่อบัญชี" v-model="deposit.accountName" />
            </div>
          </div>

          <div>
            <label for="accountNumber"
              class="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">เลขบัญชี</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0002A1" viewBox="0 0 16 16">
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                </svg>
              </div>
              <input type="text" id="accountNumber"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="กรอกเลขบัญชี" v-model="deposit.accountNumber" />
            </div>
          </div>

          <div>
            <label for="amount"
              class="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">จำนวนเงินฝาก</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0002A1" viewBox="0 0 16 16">
                  <path
                    d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                </svg>
              </div>
              <input type="text" id="amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="กรอกจำนวนเงินฝาก" v-model="deposit.amount" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              class="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">เพิ่มรูปภาพหรือไฟล์สลิป</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div v-if="!img_deposit" class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                  aria-hidden="true">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-[#0002A1] hover:text-blue-800 focus-within:outline-none">
                    <span>อัปโหลดไฟล์</span>
                    <input id="file-upload" type="file" class="sr-only"
                      @change="(e) => handleImageChange(e, 'img_deposit')">
                  </label>
                  <p class="pl-1">หรือลากและวาง</p>
                </div>
              </div>
              <div class="flex justify-center" v-else>
                <img :src="img_deposit" alt="img_deposit" class="w-full h-[300px]">
              </div>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="note"
              class="block w-full mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">หมายเหตุ</label>
            <div class="relative">
              <div class="absolute top-3 left-3 flex items-start pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0002A1" viewBox="0 0 16 16">
                  <path
                    d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  <path
                    d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                  <path
                    d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                </svg>
              </div>
              <textarea v-model="deposit.remark" id="note" placeholder="กรอกหมายเหตุ (ถ้ามี)" rows="4"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 pt-2 pr-3"></textarea>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-between gap-4">
          <button @click="closeDeposit" type="button"
            class="w-1/2 text-red-500 inline-flex items-center justify-center bg-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-sm px-5 py-2.5 hover:text-white focus:z-10 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-x-circle mr-2" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            ยกเลิก
          </button>

          <button type="submit" @click="submitdeposit()"
            class="w-1/2 rounded-lg bg-gradient-to-r from-[#153E90] to-[#0E49B5] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:from-[#0E49B5] hover:to-[#0002A1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-check-circle inline-block mr-2" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path
                d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
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
        <input type="file" @change="(e) => handleImageChange(e, 'img_receipt')" />
      </div>

      <!-- ปุ่มยืนยัน -->
      <div class="w-full">
        <button @click="uploadImagesReceipt" type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
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
        <main class="grid grid-cols-[100%,100%] gap-6 w-full max-w-screen-lg pb-2">
          <section class="w-full relative bg-[#79E0EE]/60 rounded-[6px]">
            <div class="-mt-px flex divide-x divide-gray-200 p-4 bg-[#11009E]">
              <div class="flex-1 w-0">
                <div class="flex flex-col justify-center items-center gap-1 mb-2">
                  <div class="text-xs font-semibold text-white">ลงชื่อเข้างาน</div>
                  <button @click="logWorkTime" class="px-2 py-1 text-white bg-green-500 rounded">
                    ลงเวลา
                  </button>
                </div>
              </div>
              <div class="-ml-px flex w-0 flex-1">
                <div class="flex-1 w-0">
                  <div class="flex flex-col justify-center items-center gap-1">
                    <div class="text-xs font-semibold text-white">ลงชื่อออกงาน</div>
                    <button v-if="!TimeToDay?.afterOut" :class="!onsite ? '' : 'hover:bg-[#472e99]'"
                      @click="logWorkTime" class="px-2 py-1 text-white bg-green-500 rounded">
                      ลงเวลา
                    </button>
                    <div v-else class="text-lg text-white">
                      {{ TimeToDay.afterOut ? TimeToDay.afterOut : "-" }}
                    </div>
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

          <!-- <label for="filterStatus" class="text-gray-600">สถานะ:</label>
          <Dropdown v-model="filterStatus" placeholder="สถานะ" :options="filstatus" optionLabel="name"
            optionValue="value" class="border" filter @change="searchProjects" />
          <Checkbox v-model="checkedMe" class="border rounded" :binary="true" @change="searchProjects" />
          <label class="text-gray-600">งานของฉัน</label> -->
        </div>
        <div></div>
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
                    project.status[project.status.length - 1].name !== 'ส่งงานแล้ว'
                  " icon="pi pi-angle-double-up" :label="project.status[project.status.length - 1].name" :class="[
                    project.status[project.status.length - 1].name === 'รอรับงาน'
                      ? 'bg-teal-500'
                      : project.status[project.status.length - 1].name ===
                        'กำลังดำเนินการ'
                        ? 'bg-yellow-500'
                        : project.status[project.status.length - 1].name ===
                          'งานถูกยกเลิก'
                          ? 'bg-red-500'
                          : project.status[project.status.length - 1].name === 'เสร็จแล้ว'
                            ? 'bg-blue-500'
                            : 'bg-gray-500', // กรณีอื่นๆ ใช้สีเทา
                  ]" class="px-3 py-2 text-white inline-block rounded hover:shadow-lg" @click="viewStatus(project)" />
                  <ButtonP v-if="
                    project.status[project.status.length - 1].name ===
                    'ดำเนินการสำเร็จ' ||
                    project.status[project.status.length - 1].name === 'ส่งงานแล้ว'
                  " @click="viewStatus(project)" icon="pi pi-check" label="ส่งงานแล้ว"
                    class="px-3 py-2 text-white bg-blue-500 inline-block rounded hover:shadow-lg" />
                </div>
              </td>

              <!-- ดูรายละเอียด-->
              <td class="py-2 px-4">
                <div>{{ formatDate(project.endDate) }}</div>
                <span v-if="isOverdue(project.endDate)" class="text-red-500">
                  (เลยกำหนด {{ calculateDays(project.endDate) }} วัน)
                </span>
              </td>
              <td class="py-2 px-4">
                <ButtonP @click="viewDetails(project)" label="ดูรายละเอียด"
                  class="px-3 py-2 text-green-500 border-2 border-green-500 rounded hover:bg-green-500 hover:text-white" />
              </td>

              <!-- รับงาน-->
              <td class="py-2 px-4">
                {{ console.log(project) }}
                <div class="flex flex-wrap gap-2">
                  <ButtonP v-if="project.status[project.status.length - 1].name === 'รอรับงาน'"
                    @click="acceptWork(project)" label="รับงานนี้"
                    class="px-3 py-2 text-blue-500 border-2 border-blue-500 rounded hover:bg-blue-500 hover:text-white" />

                  <div v-if="
                    project.status[project.status.length - 1].name !== 'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !== 'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !== 'ส่งงานแล้ว'
                  ">

                    <CheckinLocation :projectId="project._id" :projectCode="project.code" />

                  </div>

                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !== 'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !== 'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !== 'ส่งงานแล้ว'
                  " @click="updateWork(project)" label="อัพเดทงาน"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />
                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !== 'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !== 'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !== 'ส่งงานแล้ว'
                  " @click="() => { detailEmployee = project; openDialog(); }
                  " label="ขั้นตอนการปฏิบัติงาน"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />

                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !== 'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !== 'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !== 'ส่งงานแล้ว'
                  " @click="openExpenses(project._id)" label="เบิกค่าใช้จ่าย"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />

                  <ButtonP v-if="
                    position !== 'ช่างเทคนิค' &&
                    project.status[project.status.length - 1].name !== 'รอรับงาน' &&
                    project.status[project.status.length - 1].name !== 'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !== 'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !== 'ส่งงานแล้ว'
                  " @click="() => { detailEmployee = project; openDeposit(project._id); }" label="แจ้งฝากเงิน"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />

                  <ButtonP v-if="
                    position !== 'ช่างเทคนิค' &&
                    project.status[project.status.length - 1].name !== 'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !== 'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !== 'ส่งงานแล้ว'
                  " @click="() => { detailEmployee = project; openReceipt(); }" label="ใบเสร็จรับเงิน"
                    class="px-3 py-2 text-violet-500 border-2 border-violet-500 rounded hover:bg-violet-500 hover:text-white" />

                  <ButtonP v-if="
                    project.status[project.status.length - 1].name !== 'รอรับงาน' &&
                    project.status[project.status.length - 1].name !==
                    'ดำเนินการสำเร็จ' &&
                    project.status[project.status.length - 1].name !== 'งานถูกยกเลิก' &&
                    project.status[project.status.length - 1].name !== 'ส่งงานแล้ว'
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
import CheckinLocation from '../CheckinLocation.vue'

const img_surway = ref("");
const img_process = ref("");
const img_testing = ref("");
const img_deliverwork = ref("");
const img_invoice = ref("");
const img_deposit = ref("");
const img_receipt = ref("");

const currentLocation = ref(null);
const locationError = ref(null);
const isLoggingTime = ref(false);

const projectIdEx = ref('')
const projectIdDp = ref('')

const TimeToDay = ref({
  morningIn: null,
  afterOut: null,
  morningInLocation: null,
  afterOutLocation: null,
});

const selectTimeInOutId = ref("");
const selectTimeInOutCode = ref("");

const position = localStorage.getItem('position')

const newInvoice = ref({});

const deposit = ref({});
const submitdeposit = async () => {
  closeDeposit()
  const payload = deposit.value;

  const emID = localStorage.getItem('id')

  const depositSubmit = {
    date: payload.date,
    time: payload.time,
    bank: payload.bank,
    accountName: payload.accountName,
    accountNumber: payload.accountNumber,
    amount: payload.amount,
    image: img_deposit.value,
    projectId: projectIdDp.value,
    remark: payload.remark,
    employeeID: emID
  };

  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการแจ้งฝากเงินหรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ใช่, ส่งเลย!",
    cancelButtonText: "ยกเลิก",
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    Swal.fire({
      title: "กำลังส่งข้อมูล...",
      text: "กรุณารอสักครู่",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/deposit`,
      depositSubmit
    );

    Swal.fire({
      title: "ส่งสำเร็จ!",
      text: "ใบแจ้งหนี้ถูกส่งเรียบร้อยแล้ว",
      icon: "success",
    });

    deposit.value = {};
  } catch (error) {
    console.error("error:", error);

    // Error Alert (แจ้งเตือนเมื่อผิดพลาด)
    Swal.fire({
      title: "เกิดข้อผิดพลาด!",
      text: "ไม่สามารถส่งใบแจ้งหนี้ได้ กรุณาลองใหม่อีกครั้ง",
      icon: "error",
    });
  }
};

async function handleImageChange(event, type) {
  const file = event.target.files[0];
  if (!file) return;

  const base64 = await convertToBase64(file);

  if (type === "img_surway") img_surway.value = base64;
  else if (type === "img_process") img_process.value = base64;
  else if (type === "img_testing") img_testing.value = base64;
  else if (type === "img_deliverwork") img_deliverwork.value = base64;
  else if (type === "img_invoice") img_invoice.value = base64;
  else if (type === "img_deposit") img_deposit.value = base64;
  else if (type === "img_receipt") img_receipt.value = base64;
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
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
      }
    );

    alert(" อัปโหลดรูปภาพสำเร็จ");
    closeDialog();
    console.log("Upload response:", response.data);
  } catch (error) {
    console.error(" เกิดข้อผิดพลาดในการอัปโหลด:", error);
    alert("เกิดข้อผิดพลาดในการอัปโหลด");
  }
}

async function uploadImagesInvoice() {
  closeDialog()
  const employeeID = localStorage.getItem("id");
  const position = localStorage.getItem("position");

  const confirmResult = await Swal.fire({
    title: "ยืนยันการอัปโหลด?",
    text: "คุณแน่ใจหรือไม่ว่าต้องการอัปโหลดรูปภาพ?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ใช่, อัปโหลดเลย!",
    cancelButtonText: "ยกเลิก",
  });

  if (!confirmResult.isConfirmed) {
    return;
  }

  try {
    const id = detailEmployee.value?._id;
    if (!id) {
      Swal.fire("เกิดข้อผิดพลาด", "ไม่พบ ID โปรเจคที่จะอัปโหลด", "error");
      return;
    }

    Swal.fire({
      title: "กำลังอัปโหลด...",
      text: "กรุณารอสักครู่",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/invoiceem`,
      {
        projectID: id,
        employeeID,
        position,
        img_surway: img_surway.value,
        img_process: img_process.value,
        img_testing: img_testing.value,
        img_deliverwork: img_deliverwork.value,
      }
    );

    Swal.fire("สำเร็จ!", "อัปโหลดรูปภาพสำเร็จ", "success");
    closeDialog();
    console.log("Upload response:", response.data);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปโหลด:", error);
    Swal.fire("เกิดข้อผิดพลาด", "อัปโหลดไม่สำเร็จ", "error");
  }
}

async function uploadImagesReceipt() {
  closeReceipt()
  const employeeID = localStorage.getItem("id");
  const position = localStorage.getItem("position");
  const id = detailEmployee.value?._id;

  if (!id) {
    Swal.fire("ข้อผิดพลาด", "ไม่พบ ID โปรเจคที่จะอัปโหลด", "error");
    return;
  }

  const result = await Swal.fire({
    title: "ยืนยันการอัปโหลด?",
    text: "คุณต้องการอัปโหลดรูปภาพใบเสร็จหรือไม่?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ใช่, อัปโหลดเลย!",
    cancelButtonText: "ยกเลิก",
  });

  if (!result.isConfirmed) {
    return;
  }

  Swal.fire({
    title: "กำลังอัปโหลด...",
    text: "กรุณารอสักครู่",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/receipt`,
      {
        projectID: id,
        employeeID,
        position,
        receipt: img_receipt.value,
      }
    );

    Swal.fire("สำเร็จ!", "อัปโหลดรูปภาพสำเร็จ", "success");
    console.log("Upload response:", response.data);
  } catch (error) {
    Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถอัปโหลดรูปภาพได้", "error");
    console.error("เกิดข้อผิดพลาดในการอัปโหลด:", error);
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

      projectId: "", //  ให้เซตจาก route หรือข้อมูลปัจจุบัน
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
      return new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate() + 1,
        9,
        0,
        0,
        0
      );
    } else if (currentTime.getHours() >= 12) {
      return new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        18,
        0,
        0,
        0
      );
    } else if (currentTime.getHours() >= 9) {
      return new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        12,
        0,
        0,
        0
      );
    } else {
      return new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        9,
        0,
        0,
        0
      );
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
      const response = await axios.get(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getme`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.data.data) {
        this.TimeToWork = response.data.data.reverse();
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  },

  async fetchTimeToDay() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/time/getday`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.data.data) {
        this.TimeToDay = response.data.data;
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  },
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "ไม่ได้รับอนุญาตให้เข้าถึงตำแหน่งปัจจุบัน";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "ไม่สามารถระบุตำแหน่งได้";
            break;
          case error.TIMEOUT:
            errorMessage = "หมดเวลาในการหาตำแหน่ง";
            break;
          default:
            errorMessage = "เกิดข้อผิดพลาดในการระบุตำแหน่ง";
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

const logWorkTime = async () => {
  try {
    isLoggingTime.value = true;
    locationError.value = null;

    const location = await getCurrentLocation();
    currentLocation.value = location;

    const now = new Date();
    const hour = now.getHours();
    const timeType = hour < 12 ? "ลงชื่อเข้า" : "ลงชื่อออก";

    const projectId = selectTimeInOutId.value || "";
    const projectCode = selectTimeInOutCode.value || "";

    const employeeId = localStorage.getItem("id");

    console.log("projectId : ", projectId);
    console.log("projectCode : ", projectCode);
    console.log("employeeId : ", employeeId);
    console.log("latitude : ", location.latitude);
    console.log("longitude : ", location.longitude);
    console.log("timeType : ", timeType);

    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/create/log`,
      {
        projectId,
        projectCode,
        employeeId,
        latitude: location.latitude,
        longitude: location.longitude,
        timeType,
      }
    );

    if (response.data.status) {
      Swal.fire({
        icon: "success",
        title: "บันทึกเวลาสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    locationError.value = error.message;
    Swal.fire({
      icon: "error",
      title: "ไม่สามารถบันทึกเวลาได้",
      text: error.message || "โปรดลองอีกครั้ง",
      showConfirmButton: true,
    });
  } finally {
    isLoggingTime.value = false;
  }
};

///////////////
const checkinDialog = ref(null);

const openCheckin = (id, code) => {
  if (checkinDialog.value) {
    checkinDialog.value.showModal(); // เปิด dialog

    selectTimeInOutCode.value = code;
    selectTimeInOutId.value = id;

    console.log("code : ", code);
    console.log("id : ", id);
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

const openDeposit = (id) => {
  depositDialog.value.showModal();
  projectIdDp.value = id;
};

const closeDeposit = () => {
  depositDialog.value.close();
};
////////////
const expensesDialog = ref(null);

const openExpenses = (id) => {
  expensesDialog.value.showModal();

  projectIdEx.value = id
};

const closeExpenses = () => {
  expensesDialog.value.close();
};
///////////////
const uploadDialog = ref(null);
const errorMessage = ref("");

const openDialog = () => {
  uploadDialog.value.showModal();
};

const closeDialog = () => {
  uploadDialog.value.close();
};

const updateWorks = (project) => {
  if (!project) {
    errorMessage.value = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return;
  }
  console.log("Updating work:", project);
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
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getme`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    console.log(res);
    itemMe.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const projects = ref([]);
const projectOrigin = ref([]);
const getProjectAll = async () => {

  const employeeId = localStorage.getItem("id");
  try {
    loading.value = true;
    const res = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/project/em/${employeeId}`, {
    });
    console.log('res : ', res);
    const data = res.data;
    // .filter(
    //   (item) => item.projectSubType === itemMe.value.position
    // );
    projects.value = data
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
const totalPages = computed(() => Math.ceil(projects.value.length / itemsPerPage));

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
            `${import.meta.env.VITE_VUE_APP_DECCAN}/project/${id}/update-office`,
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
        item.status[item.status.length - 1].name.toLowerCase().includes(searchKey)
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
    fildata = fildata.filter((item) => item.employees.includes(itemMe.value._id));
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

const submitInvoice = async () => {
  closeExpenses()
  const payload = newInvoice.value;

  const emID = localStorage.getItem('id')

  const invoiceSubmit = {
    date: payload.date,
    title: payload.title,
    firstname: payload.firstname,
    lastname: payload.lastname,
    totalAmount: payload.totalAmount,
    image: img_invoice.value,
    projectId: projectIdEx.value,
    remark: payload.remark,
    employeeID: emID
  };

  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณต้องการส่งใบแจ้งหนี้นี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ใช่, ส่งเลย!",
    cancelButtonText: "ยกเลิก",
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    Swal.fire({
      title: "กำลังส่งข้อมูล...",
      text: "กรุณารอสักครู่",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await axios.post(
      `${import.meta.env.VITE_VUE_APP_DECCAN}/invoice`,
      invoiceSubmit
    );

    // Success Alert (แจ้งเตือนเมื่อสำเร็จ)
    Swal.fire({
      title: "ส่งสำเร็จ!",
      text: "ใบแจ้งหนี้ถูกส่งเรียบร้อยแล้ว",
      icon: "success",
    });

    newInvoice.value = {};
  } catch (error) {
    console.error("error:", error);

    // Error Alert (แจ้งเตือนเมื่อผิดพลาด)
    Swal.fire({
      title: "เกิดข้อผิดพลาด!",
      text: "ไม่สามารถส่งใบแจ้งหนี้ได้ กรุณาลองใหม่อีกครั้ง",
      icon: "error",
    });
  }
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
