<script setup>
const courseInfo = {
  courseName: 'Fronnt-End Web Development',
  courseCode: 'SW306DE01',
  instructor: 'Pham Hong Thanh',
  university: 'Hoa Sen University',
  studentName1: 'Le Hoang Thao Vy',
  studentId1: '22118775',
  studentName2: 'Huynh Quang Vinh',
  studentId2: '22122478',
  studentName3: 'Pham Gia Khanh',
  studentId3: '22122930',
}
</script>

<template>
  <div class="course-info">
    <h2>Thông tin khóa học</h2>
    <p><strong>Môn học:</strong> {{ courseInfo.courseName }}</p>
    <p><strong>Mã môn học:</strong> {{ courseInfo.courseCode }}</p>
    <p><strong>Giảng viên:</strong> {{ courseInfo.instructor }}</p>
    <p><strong>Trường:</strong> {{ courseInfo.university }}</p>
    <p><strong>Họ và tên sinh viên:</strong> {{ courseInfo.studentName1 }}</p>
    <p><strong>MSSV:</strong> {{ courseInfo.studentId1 }}</p>
    <p><strong>Họ và tên sinh viên:</strong> {{ courseInfo.studentName2 }}</p>
    <p><strong>MSSV:</strong> {{ courseInfo.studentId2 }}</p>
    <p><strong>Họ và tên sinh viên:</strong> {{ courseInfo.studentName3 }}</p>
    <p><strong>MSSV:</strong> {{ courseInfo.studentId3 }}</p>
  </div>
</template>

<style scoped>
.course-info {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

p {
  margin: 10px 0;
}
</style>
