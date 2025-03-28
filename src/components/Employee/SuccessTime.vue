<template>
    <!-- <div>
        <p>ลงเวลาเข้างานสำเร็จ!</p>
        <p>เวลาเข้างาน: {{ data }}</p>
    </div> -->
    <a-result
    status="success"
    title="ลงเวลาสำเร็จ!"
    :sub-title="'เวลา: ' + data.time"
    :sub-title-style="{ color: 'red' }" 

  >
    <template #extra>
      <a-button key="buy">กลับหน้าหลัก</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
    props: ['data'],
};
</script>