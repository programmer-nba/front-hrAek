<template>
  <div class="bg-gray-100 min-h-screen">

      <!-- End of Navbar -->

      <div class="container mx-auto my-5 p-5">
          <div class="md:flex no-wrap md:-mx-2 ">
              <!-- Left Side -->





              <div class="w-full md:w-3/12 md:mx-2">

                  <!-- Profile Card -->
                  <div class="bg-white p-3 border-t-4  border-green-400">

                      <div class="relative h-36 w-36 mx-auto sm:mb-0 mb-3">
                          <!-- แสดงภาพ -->

                          <img v-if="!imageUrl" :src="getImageUrl(me.image)"
                              class="w-36 h-36 object-cover rounded-2xl">


                          <img v-if="imageUrl" :src="imageUrl" class="w-36 h-36 object-cover rounded-2xl">

                          <!-- ปุ่มอัพโหลด -->
                          <label for="file-upload"
                              class="absolute -right-2 bottom-2 -ml-3 text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300 cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                  class="h-4 w-4">
                                  <path
                                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                                  </path>
                              </svg>
                          </label>

                          <!-- input ที่ใช้เลือกไฟล์ -->
                          <input id="file-upload" type="file" class="hidden" @change="handleFileChange">
                      </div>

                      <div v-if="imageUrl" class="flex justify-center mt-2">
                          <button @click="SaveImage" class="btn_center text-sm  text-white px-6 py-2">
                              ยืนยัน
                          </button>
                      </div>


                      <h1 class="text-gray-900 text-center font-bold text-xl leading-8 my-1">{{ me.name_title }} {{
                          me.first_name
                          }}
                          {{ me.last_name }}</h1>

                      <ul
                          class="bg-gray-100 text-black hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">

                          <li class="flex items-center py-3 text-black">
                              <span class="">เข้าร่วมเมื่อ</span>
                              <span class="ml-auto">{{ formatThaiDate(me.createdAt) }}</span>
                          </li>
                          
                      </ul>
                      <button
        @click="editpassword = true"
        class="relative py-2 w-full text-white text-base font-bold nded-full overflow-hidden bg-blue-500 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-300 before:to-blue-700 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
      >
        เปลี่ยนรหัสผ่าน
      </button>
                      
                  </div>
                  <!-- End of profile card -->
                  <div class="my-4"></div>
                  <!-- Friends card -->
                  <div class="bg-white p-3 hover:shadow">
                      <div class="flex items-center space-x-3 font-semibold text-black text-xl leading-8">
                          <span class="text-green-500">
                              <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                  viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                          </span>
                          <span>สิทธิ์การลา</span>
                      </div>

                      <div class="grid gap-4 mt-2">
                          <div class="flex gap-2 items-center">
                              <div class="bg-red-500 flex items-center justify-center w-20 h-10 rounded text-white">
                                  ลาป่วย</div>
                              <div class="grid  text-sm">
                                  <h2 class="font-semibold leading-none ">
                                      {{ me.leave?.sick_leave }}/30
                                  </h2>
                                  <div class="text-xs text-gray-500  ">
                                      คงเหลือ 30 วัน / ปี
                                  </div>
                              </div>
                          </div>
                          <div class="flex gap-2 items-center">
                              <div
                                  class="bg-yellow-500 flex items-center justify-center w-20 h-10 rounded text-white">
                                  ลากิจ</div>
                              <div class="grid  text-sm">
                                  <h2 class="font-semibold leading-none ">
                                      {{ me.leave?.business_leave }}/3
                                  </h2>
                                  <div class="text-xs text-gray-500  ">
                                      คงเหลือ {{ me.leave?.business_leave }} วัน / ปี
                                  </div>
                              </div>
                          </div>
                          <div class="flex gap-2 items-center">
                              <div class="flex items-center justify-center bg-blue-500 w-20 h-10 rounded text-white">
                                  ลาคลอด</div>
                              <div class="grid  text-sm">
                                  <h2 class="font-semibold leading-none ">
                                      10 วัน
                                  </h2>
                                  <div class="text-xs text-gray-500  ">
                                      คงเหลือ 98 วัน / ปี
                                  </div>
                              </div>
                          </div>
                      </div>


                  </div>
                  <!-- End of friends card -->
              </div>
              <!-- Right Side -->
              <div class="w-full md:w-9/12 mx-2 h-64">
                  <!-- Profile tab -->
                  <!-- About Section -->
                  <div class="bg-white p-3 shadow-sm rounded-sm">
                      <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 justify-center mb-2 sm:justify-start">
                          <span class="flex items-center gap-2 tracking-wide bg-blue-500 rounded-lg p-2 text-white">
                              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>About</span>
                      </div>
                      <div class="text-black">
                          <div class="grid md:grid-cols-2 text-sm">
                              <div class="grid grid-cols-2">
                                  <div class="px-4 py-2 font-semibold">ชื่อ-นามสกุล</div>
                                  <div class="px-4 py-2 bg-gray-200 border-gray-500 border-2 rounded-lg">{{ me.name_title }} {{ me.first_name }} {{ me.last_name }}
                                  </div>
                              </div>
                              <div class="grid grid-cols-2">
                                  <div class="px-4 py-2 font-semibold">ชื่อเล่น</div>
                                  <div class="px-4 py-2 bg-gray-200 border-gray-500 border-2 rounded-lg">{{ me.nick_name }} </div>
                              </div>
                              <div class="grid grid-cols-2">
                                  <div class="px-4 py-2 font-semibold">เพศ</div>
                                  <div class="px-4 py-2 bg-gray-200 border-gray-500 border-2 rounded-lg" v-if="me.name_title === 'นาย'">ชาย</div>
                                  <div class="px-4 py-2 bg-gray-200 border-gray-500 border-2 rounded-lg" v-else>หญิง</div>
                              </div>

                              <div class="grid grid-cols-2">
                                  <div class="px-4 py-2 font-semibold ">เลขบัตรประชาชน</div>
                                  <div class="px-4 py-2 bg-gray-200 border-gray-500 border-2 rounded-lg">{{ me.iden_number }}</div>
                              </div>
                              <!-- <div class="grid grid-cols-2">
                                  <div class="px-4 py-2 font-semibold">วันเกิด</div>
                                  <div class="px-4 py-2 bg-gray-200 border-gray-500 border-2 rounded-lg">{{ me.birthday }}</div>
                              </div> -->
                              <div class="grid grid-cols-2">
                                  <div class="px-4 py-2 font-semibold">Email</div>
                                  <div class="px-4 py-2 bg-gray-200 border-gray-500 border-2 rounded-lg">
                                      <a class="text-blue-800 ">{{ me.email }}</a>
                                  </div>
                              </div>
                              <div class="grid grid-cols-2">
                                  <div class="px-4 py-2 font-semibold">เบอร์โทร</div>
                                  <div class="px-4 py-2 bg-gray-200 border-gray-500 border-2 rounded-lg">{{ me.tel }}</div>
                              </div>
                              <div></div>
                              <div class="grid grid-cols-2">
                                  <div class="px-4 py-2 font-semibold"> ที่อยู่</div>
                                  <div class="px-2 py-2 bg-gray-200 border-gray-500 border-2 rounded-lg">{{ me.address }} ตำบล {{ me.subdistrict }} อำเภอ {{
                                      me.district }} จังหวัด {{ me.provice }} {{ me.postcode }}</div>
                              </div>

                             
                             
                          </div>
                      </div>
                      <div class="flex justify-center w-full">
                      <button @click="showDialog" class="block w-full bg-blue-500 border-blue-500 border-2   text-white text-sm font-semibold rounded-lg hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs 
                          p-3 my-4">
                          แก้ไขข้อมูลส่วนตัว
                      </button>
                  </div>
                  </div>
                  <!-- End of about section -->

                  <div class="my-4"></div>

                  <!-- Experience and education -->
                  <div class="bg-white p-3 shadow-sm rounded-sm">

                      <div class="grid grid-cols-2">
                          <div>
                              <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                  <span clas="text-green-500">
                                      <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                          viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                  </span>
                                  <span class="tracking-wide">Experience</span>
                              </div>
                              <ul class="list-inside space-y-2">
                                  <li>
                                      <div class="text-teal-600">Owner at Her Company Inc.</div>
                                      <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                  </li>
                                  <li>
                                      <div class="text-teal-600">Owner at Her Company Inc.</div>
                                      <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                  </li>
                                  <li>
                                      <div class="text-teal-600">Owner at Her Company Inc.</div>
                                      <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                  </li>
                                  <li>
                                      <div class="text-teal-600">Owner at Her Company Inc.</div>
                                      <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                  </li>
                              </ul>
                          </div>
                          <div>
                              <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                  <span clas="text-green-500">
                                      <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                          viewBox="0 0 24 24" stroke="currentColor">
                                          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                          <path fill="#fff"
                                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                      </svg>
                                  </span>
                                  <span class="tracking-wide">Education</span>
                              </div>
                              <ul class="list-inside space-y-2">
                                  <li>
                                      <div class="text-teal-600">Masters Degree in Oxford</div>
                                      <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                  </li>
                                  <li>
                                      <div class="text-teal-600">Bachelors Degreen in LPU</div>
                                      <div class="text-gray-500 text-xs">March 2020 - Now</div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <!-- End of Experience and education grid -->
                  </div>
                  <!-- End of profile tab -->
              </div>
          </div>
      </div>

  </div>

  <Dialog v-model:visible="DialogEdit" header="แก้ไขข้อมูลส่วนตัว" :modal="true">

      <body class="  leading-normal ">
          <main class="flex-1 md:p-0 lg:pt-8  md:ml-6 flex flex-col">

              <section class="">
                 

                  <div class="md:flex mb-8">
                      <div class="md:w-1/4">
                          <legend class="uppercase tracking-wide text-sm">ข้อมูลส่วนตัว</legend>
                      </div>
                      <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">

                          <div class="md:flex mb-4">
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">ชื่อผู้ใช้
                                  </label>
                                  <input v-model="editedMe.userid" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-2 border-0" type="text">
                              </div>
                              
                          </div>

                          <!-- <div class="md:flex mb-4">
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Password</label>
                                  <input v-model="editedMe.password" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="password">
                              </div>
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">อายุ</label>
                                  <input v-model="editedMe.age" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                              </div>
                              <div class="md:flex-1 ">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">วันเกิด</label>
                                  <Calendar v-model="editedMe.birthday" class="w-full mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm  p-3 border-0" />

                              </div>
                          </div> -->

                      </div>
                  </div>



                  <div class="md:flex mb-8">
                      <div class="md:w-1/4">
                          <legend class="uppercase tracking-wide text-sm">ข้อมูลส่วนตัว</legend>
                      </div>
                      <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">

                          <div class="md:flex mb-4">
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">คำนำหน้า
                                  </label>
                                  <input v-model="editedMe.name_title" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                              </div>
                              <div class="md:flex-1 md:pl-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">ชื่อจริง</label>
                                  <input v-model="editedMe.first_name" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                              </div>
                              <div class="md:flex-1 md:pl-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">นามสกุล</label>
                                  <input v-model="editedMe.last_name" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                              </div>
                          </div>

                          <div class="md:flex mb-4">
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">ชื่อเล่น</label>
                                  <input v-model="editedMe.nick_name" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                              </div>
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">อายุ</label>
                                  <input v-model="editedMe.age" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                              </div>
                              <!-- <div class="md:flex-1 ">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">วันเกิด</label>
                                  <Calendar1 v-model="editedMe.birthday"  class="w-full  mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm  p-3 border-0" />

                              </div> -->
                          </div>

                      </div>
                  </div>

                  <div class="md:flex mb-8">
                      <div class="md:w-1/4">
                          <legend class="uppercase tracking-wide text-sm">ข้อมูลติดต่อ</legend>
                      </div>
                      <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                          <div class="mb-4">
                              <label class="block uppercase tracking-wide text-xs font-bold ">ที่อยู่</label>
                              <input v-model="editedMe.address" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                          </div>


                          <div class="md:flex mb-4">
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">จังหวัด</label>

                                  <Dropdown v-model="editedMe.provice" :options="item_province" filter
                                      @change="chooseProvince" optionValue="name_th" optionLabel="name_th"
                                      placeholder="เลือกจังหวัด" class="no-rounded w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   border-0" />


                              </div>
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">อำเภอ</label>

                                  <Dropdown v-model="editedMe.district" :options="item_amphure" filter
                                      @change="chooseAmphure" optionValue="name_th" optionLabel="name_th"
                                      placeholder="เลือกอำเภอ" class="no-rounded w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   border-0" />
                              </div>

                              <div class="md:flex-1 ">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">ตำบล</label>
                                  <Dropdown v-model="editedMe.subdistrict" :options="item_tambon" filter
                                      @change="chooseDistrict" optionValue="name_th" optionLabel="name_th"
                                      placeholder="เลือกตำบล" class="no-rounded w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   border-0" />

                              </div>
                          </div>
                          <div class="md:flex mb-4">
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">รหัสไปรษณีย์</label>
                                  <input v-model="editedMe.postcode" :disabled="isDisabled" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                              </div>
                              <div class="md:flex-1 md:pr-3">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">เบอร์โทร</label>
                                  <input v-model="editedMe.tel" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                              </div>
                              <div class="md:flex-1 ">
                                  <label
                                      class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">E-mail</label>
                                  <input v-model="editedMe.email" class="w-full bg-gray-200 rounded-lg mt-2 ring-1 ring-inset focus:outline-none  shadow-[#1363DF] ring-[#85F4FF] focus:ring-2 focus:ring-inset
       focus:ring-[#47B5FF] shadow-sm   p-3 border-0" type="text">
                              </div>
                          </div>

                      </div>
                  </div>

<div class="grid grid-col sm:flex gap-2">
                  <button @click="saveEdit"
                      class="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">บันทึก</button>
                  <button @click="DialogEdit = false"
                      class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">ยกเลิก</button>
              </div>
              </section>
          </main>
      </body>
  </Dialog>

  <Dialog
        v-model:visible="editpassword"
        modal
        header="เปลี่ยนรหัสผ่าน"
        class="px-2 sm:px-2 py-1 sm:py-1 bg-white rounded-xl shadow-lg"
      >
        <div class="w-full bg-white">
          
          <div class="mb-3 sm:mb-6">
            <!-- Old password input -->
            <h1 class="text-lg sm:text-xl mb-3 sm:mb-5 text-black">
              กรอกรหัสผ่านเก่าเพื่อยืนยันการเปลี่ยนรหัสผ่านใหม่*
            </h1>
            <label
              for="old_password"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900"
              >รหัสผ่านเก่า</label
            >
            <input
              ref="old_password"
              type="password"
              id="old_password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="•••••••••"
              required
            />
          </div>
          <div class="mb-3 sm:mb-6">
            <!-- New password input -->
            <h1 class="text-lg sm:text-xl mb-1 sm:mb-1 text-black">
              กรอกรหัสผ่านใหม่ที่คุณต้องการเปลี่ยน*
            </h1>
            <h1 class="text-xs sm:text-sm mb-5 sm:mb-5 text-black">
              รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร
            </h1>
            <label
              for="new_password"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900"
              >รหัสผ่านใหม่</label
            >
            <input
              ref="new_password"
              type="password"
              id="new_password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="•••••••••"
              required
            />
          </div>
          <div class="mb-3 sm:mb-6">
            <!-- Confirm password input -->
            <label
              for="confirm_password"
              class="block mb-1 sm:mb-2 text-xs sm:text-base font-medium text-gray-900"
              >ยืนยันรหัสผ่านอีกครั้ง</label
            >
            <input
              ref="confirm_password"
              type="password"
              id="confirm_password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:p-2.5"
              placeholder="•••••••••"
              required
            />
          </div>
          <!-- Submit button for change password -->
          <button
            @click="updatePassword"
            class="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-700 active:bg-blue-900 focus:outline-none"
          >
            อัปเดตรหัสผ่าน
          </button>
        </div>
      </Dialog>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Dropdown from "primevue/dropdown";
import Swal from 'sweetalert2';
import Calendar1 from 'primevue/calendar';
import bcrypt from "bcryptjs";

export default {
  components: {
      Dropdown,
      Calendar1
  },
  data() {
      return {
          isDisabled: false,
          editpassword:false,
          item_province: [],
          item_amphure: [],
          item_tambon: [],

          province: null,
          amphure: null,
          tambon: null,
          postcode: null,
          me: {},
          editedMe: {},
          DialogEdit: false,
          selectedFile: null,
          imageUrl: null,
      };
  },
  async mounted() {
      try {
          const response = await axios.get(`${import.meta.env.VITE_VUE_APP_PROVINCE}`);
          this.item_province = response.data;
          this.fetchME();
      } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลจังหวัด:', error);
      }
  },

  methods: {
      getImageUrl(imageId) {
          return `https://drive.google.com/thumbnail?id=${imageId}`;
      },

      async SaveImage() {
          try {
              const formData = new FormData();
              formData.append('image', this.selectedFile);

              const response = await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/employee/upload/image/${this.me._id}`, formData,
                  {
                      headers: {
                          "auth-token": localStorage.getItem("token"),
                          "Content-Type": "multipart/form-data"
                      },
                  });
              console.log('การอัปโหลดภาพสำเร็จ:', response.data);
              Swal.fire({
                  icon: 'success',
                  title: 'อัปโหลดภาพสำเร็จ',
                  text: 'การอัปโหลดภาพของคุณสำเร็จแล้ว',
                  showConfirmButton: false,
                  timer: 1500
              });
              this.imageUrl = null;
              this.fetchME();
          } catch (error) {
              console.error('เกิดข้อผิดพลาดในการอัปโหลดภาพ:', error);
          }
      },
      handleFileChange(event) {
          this.selectedFile = event.target.files[0];
          // Create a preview URL for the selected image
          this.imageUrl = URL.createObjectURL(this.selectedFile);
      },




      async showDialog() {
          // เปิด Dialog
          this.DialogEdit = true;

          // ดึงข้อมูลอำเภอ
          const amphures = await axios.get(`${import.meta.env.VITE_VUE_APP_AMPHURE}`);
          this.item_amphure = amphures.data;

          // กำหนดค่าเดิมของอำเภอที่ตรงกับค่าใน editedMe.district
          if (this.editedMe.district) {
              const amphure = this.item_amphure.find(el => el.name_th === this.editedMe.district);

              // กำหนดค่าเดิมของอำเภอที่พบได้
              if (amphure) {
                  this.editedMe.district = amphure.name_th;
              }
          }

          // หาข้อมูลอำเภอที่ตรงกับค่าเดิมของ editedMe.district
          const selectedAmphure = this.item_amphure.find((el) => el.name_th === this.editedMe.district);

          if (selectedAmphure) {
              // ดึงข้อมูลตำบล
              const tambons = await axios.get(`${import.meta.env.VITE_VUE_APP_TAMBON}`);
              this.item_tambon = tambons.data.filter((tambon) => tambon.amphure_id === selectedAmphure.id);
          }
      },

      async saveEdit() {
          try {
              const editedData = {};

              // ตรวจสอบและเพิ่มข้อมูลที่ถูกแก้ไขเข้าไปใน editedData
              if (this.editedMe.name_title !== this.me.name_title) {
                  editedData.name_title = this.editedMe.name_title;
              }
              if (this.editedMe.first_name !== this.me.first_name) {
                  editedData.first_name = this.editedMe.first_name;
              }
              if (this.editedMe.last_name !== this.me.last_name) {
                  editedData.last_name = this.editedMe.last_name;
              }
              if (this.editedMe.nick_name !== this.me.nick_name) {
                  editedData.nick_name = this.editedMe.nick_name;
              }
              if (this.editedMe.age !== this.me.age) {
                  editedData.age = this.editedMe.age;
              }
              if (this.editedMe.birthday !== this.me.birthday) {
                  editedData.birthday = this.formattedBirthday();
              }
              if (this.editedMe.address !== this.me.address) {
                  editedData.address = this.editedMe.address;
              }
              if (this.editedMe.provice !== this.me.provice) {
                  editedData.provice = this.editedMe.provice;
              }
              if (this.editedMe.district !== this.me.district) {
                  editedData.district = this.editedMe.district;
              }
              if (this.editedMe.subdistrict !== this.me.subdistrict) {
                  editedData.subdistrict = this.editedMe.subdistrict;
              }
              if (this.editedMe.postcode !== this.me.postcode) {
                  editedData.postcode = this.editedMe.postcode;
              }
              if (this.editedMe.tel !== this.me.tel) {
                  editedData.tel = this.editedMe.tel;
              }
              if (this.editedMe.email !== this.me.email) {
                  editedData.email = this.editedMe.email;
              }

              // ตรวจสอบว่ามีการแก้ไขข้อมูลหรือไม่
              if (Object.keys(editedData).length === 0) {
                  // ไม่มีการแก้ไขข้อมูล
                  Swal.fire({
                      icon: 'info',
                      title: 'ไม่มีการเปลี่ยนแปลงข้อมูล',
                      text: 'กรุณาแก้ไขข้อมูลก่อนที่จะบันทึก',
                  });
              } else {
                  console.log(editedData);
                  await axios.put(`${import.meta.env.VITE_VUE_APP_DECCAN}/update/${this.me._id}`, editedData, {
                      headers: {
                          'auth-token': localStorage.getItem('token'),
                      },
                  });
                  Swal.fire({
                      icon: 'success',
                      title: 'บันทึกข้อมูลสำเร็จ',
                      showConfirmButton: false,
                      timer: 1500
                  });
                  this.DialogEdit = false;
                  this.fetchME();

                  console.log('บันทึกข้อมูลสำเร็จ');
              }
          } catch (error) {
              console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
              Swal.fire({
                  icon: 'error',
                  title: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
                  text: 'กรุณาลองอีกครั้ง',
              });
          }
      },


      formattedBirthday() {
          // แปลงวันเกิดเป็นรูปแบบไทย
          return dayjs(this.editedMe.birthday).locale('th').format('D MMMM YYYY');
      },



      async chooseProvince(evt) {
          try {
              const findprovince = this.item_province.find(item => item.name_th == evt.value);
              const responseAmphure = await axios.get(`${import.meta.env.VITE_VUE_APP_AMPHURE}`);
              this.item_amphure = responseAmphure.data.filter(el => el.province_id == findprovince.id);

              this.item_tambon = [];
              this.editedMe.district = null;
              this.editedMe.subdistrict = null;
              this.amphure = null;
              this.tambon = null;


          } catch (error) {
              console.error(error);
              this.$toast.add({
                  severity: "error",
                  summary: "เกิดข้อผิดพลาดในการเรียกข้อมูลเขต/อำเภอ",
                  life: 3000,
              });
          }
      },

      async chooseAmphure(evt) {
          try {
              const selectedAmphure = this.item_amphure.find(item => item.name_th == evt.value);
              const tambonResponse = await axios.get(`${import.meta.env.VITE_VUE_APP_TAMBON}`);
              this.item_tambon = tambonResponse.data.filter(el => el.amphure_id === selectedAmphure.id);

              // เคลียร์ค่าที่เกี่ยวข้องกับตำบล
              this.editedMe.subdistrict = null;
              this.tambon = null;
          } catch (error) {
              console.error(error);
              this.$toast.add({
                  severity: "error",
                  summary: "เกิดข้อผิดพลาดในการเรียกข้อมูลแขวง/ตำบล",
                  life: 3000,
              });
          }
      },

      chooseDistrict(evt) {
          const tambon = this.item_tambon.find(item => item.name_th == evt.value)
          console.log(tambon)
          this.editedMe.postcode = tambon.zip_code;
      },


      formattedBirthdayshow(birthday) {
          return dayjs(birthday).locale('th').format('D MMMM YYYY');
      },

      //แปลงวันที่
      formatThaiDate(dateString) {
          const thaiDate = dayjs(dateString).locale('th').format('DD/MM/YYYY');
          return thaiDate;
      },


      async fetchME() {
          try {
              const response = await axios.get(`${import.meta.env.VITE_VUE_APP_DECCAN}/getme `,
                  {
                      headers: {
                          "auth-token": localStorage.getItem("token"),
                      },
                  });
              this.me = response.data.data;
              this.editedMe = { ...this.me };
              console.log(response.data.data);

          } catch (error) {
              console.error('Error fetching data:', error);
          }
      },

      async updatePassword() {
    if (
      !this.$refs.old_password.value ||
      !this.$refs.new_password.value ||
      !this.$refs.confirm_password.value
    ) {
      Swal.fire({
        icon: "warning",
        title: "กรอกข้อมูลไม่ครบ",
        text: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        customClass: {
          container: "updatePassword",
        },
      });
      return;
    }
    // Check if new password is at least 8 characters long
    if (new_password.value.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "รหัสความยาวอย่างน้อย 8 ตัวอักษร",
        text: "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร",
        customClass: {
          container: "updatePassword",
        },
      });
      return;
    }

    try {
      // Fetch current employee data
      const response = await axios.get(
        `${import.meta.env.VITE_VUE_APP_DECCAN}/getme`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.data.data) {
        const { old_password, new_password, confirm_password } = this.$refs;

        // Check if new password matches the confirm password
        if (new_password.value !== confirm_password.value) {
          Swal.fire({
            icon: "error",
            title: "ผิดพลาด",
            text: "รหัสผ่านใหม่ไม่ตรงกับยืนยันรหัสผ่าน",
            customClass: {
              container: "updatePassword",
            },
          });
          return;
        }

        const isOldPasswordCorrect = await bcrypt.compare(
          old_password.value,
          response.data.data.password
        );
        if (!isOldPasswordCorrect) {
          Swal.fire({
            icon: "error",
            title: "ผิดพลาด",
            text: "รหัสผ่านเก่าไม่ถูกต้อง",
            customClass: {
              container: "updatePassword",
            },
          });
          return;
        }

        // Show confirmation dialog before updating password
        const confirmed = await Swal.fire({
          icon: "warning",
          title: "ยืนยันการอัปเดตรหัสผ่าน",
          text: "คุณแน่ใจหรือไม่ที่ต้องการอัปเดตรหัสผ่าน",
          showCancelButton: true,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
          customClass: {
            container: "updatePassword",
          },
        });

        // If user confirms the password update
        if (confirmed.isConfirmed) {
          // Update password
          const updatedResponse = await axios.put(
            `${import.meta.env.VITE_VUE_APP_DECCAN}/update/${this.me._id}`,
            { password: new_password.value },
            {
              headers: { "auth-token": localStorage.getItem("token") },
            }
          );
          this.editpassword = false;
          // Notify that the password update was successful
          Swal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: "อัปเดตรหัสผ่านสำเร็จ",
            showCancelButton: false,
            timer: 2000,
            customClass: {
              container: "updatePassword",
            },
          });

          // Clear input fields
          old_password.value = "";
          new_password.value = "";
          confirm_password.value = "";
        }
      } else {
        console.error("ไม่พบข้อมูลgetme");
      }
    } catch (error) {
      // Notify if there's an error updating password
      console.error("Error updating password:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "อัพเดทรหัสผ่านไม่สำเร็จ",
        customClass: {
          container: "updatePassword",
        },
      });
    }
  },

  },
};
</script>

<style>
div:where(.swal2-container) {
  z-index: 9000;
}

.no-rounded {
  border-radius: 0 !important;
}

p-dropdown-filter p-inputtext p-component {
  padding: 4px;
  background-color: red;
}
</style>

<style scoped>
.btn_center {

  letter-spacing: 2px;
  border-radius: 0px;
  text-transform: uppercase;
  background-color: #031d67;
  box-shadow: 0px 15px 18px -6px rgba(35, 22, 214, 0.65);
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -ms-transition: all 0.4s;
  -o-transition: all 0.4s;
  position: relative;
}

.btn_center:hover {
  background-color: #051749;
  box-shadow: 0px 22px 19px -8px rgba(16, 8, 119, 0.65);
  transform: scale(1.02, 1.02);
}

.btn_center:active {
  background-color: #051749;
  box-shadow: 0px 12px 18px -4px rgba(7, 4, 51, 0.65);
  transform: scale(0.95, 0.95);
  transition: all 0.4s -0.125s;
}
</style>