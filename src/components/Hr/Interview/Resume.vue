<template>
  <div class="flex justify-center items-center h-full">
    {{ console.log(interview.userInfo) }}
    <div
      v-if="
        interview && interview.userInfo && interview.userInfo.image
      "
    >
      <img :src="`https://drive.google.com/thumbnail?id=${interview.userInfo.image}`" alt="Resume Image" />
      <!-- <img :src="`https://drive.google.com/uc?export=view&id=${interview.userInfo.image}`" alt="Resume Image" /> -->
      <!-- <img :src="`https://drive.google.com/file/d/${interview.userInfo.image}/view?usp=sharing`" alt="Resume Image" /> -->
    </div>
    <div
      v-else-if="
        interview && interview.userInfo && interview.userInfo.image === 'no-image'
      "
    >
      <img :src="require('@/assets/images/no-image.png')" alt="No Image" />
    </div>
    <div v-else class="text-center text-gray-500">ไม่มีรูปภาพ</div>
    <!-- <div
      v-else-if="
        interview && interview.userInfo && interview.userInfo.image === 'pdf'
      "
    >
      <object
        :data="interview.userInfo.image"
        type="application/pdf"
        width="100%"
        height="600"
      >
        <p>ไม่สามารถแสดงไฟล์ PDF ได้ กรุณาติดตั้งโปรแกรมอ่าน PDF</p>
      </object>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    interview: {
      type: Object,
      required: true,
    },
  },
};
</script>
