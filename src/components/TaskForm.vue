<script setup>
import { reactive, computed } from 'vue'

const emit = defineEmits(['add-task'])

const newTask = reactive({
  title: '',
  priority: 'medium',
  dueDate: new Date().toISOString().substr(0, 10),
})

const errors = reactive({
  title: '',
})

const isValid = computed(() => {
  return newTask.title.trim() !== ''
})

// Kiểm tra trước khi submit
function checkForm() {
  errors.title = newTask.title.trim() === '' ? 'Tiêu đề không được để trống' : ''

  if (isValid.value) {
    emit('add-task', { ...newTask })
    // Reset form
    newTask.title = ''
    newTask.priority = 'medium'
    newTask.dueDate = new Date().toISOString().substr(0, 10)
  }
}

// Sử dụng v-model modifier
function onTitleInput(e) {
  // Chuyển đổi chữ đầu tiên thành chữ hoa
  if (e.target.value.length > 0) {
    e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
  }
}

// Custom directive v-focus để tự động focus vào input
const vFocus = {
  mounted: (el) => el.focus(),
}

// Custom directive để giới hạn số ký tự
const vCharLimit = {
  mounted(el, binding) {
    const maxChars = binding.value || 50

    const limitInput = () => {
      if (el.value.length > maxChars) {
        el.value = el.value.substr(0, maxChars)
      }

      // Hiển thị số ký tự
      const counter = el.nextElementSibling
      if (counter && counter.classList.contains('char-counter')) {
        counter.textContent = `${el.value.length}/${maxChars}`

        // Đỏi màu khi gần đến giới hạn
        if (el.value.length > maxChars * 0.8) {
          counter.style.color = 'orange'
        } else if (el.value.length === maxChars) {
          counter.style.color = 'red'
        } else {
          counter.style.color = 'inherit'
        }
      }
    }

    el.addEventListener('input', limitInput)
    limitInput() // Khởi tạo

    // Thêm counter span nếu chưa có
    if (!el.nextElementSibling || !el.nextElementSibling.classList.contains('char-counter')) {
      const counter = document.createElement('span')
      counter.classList.add('char-counter')
      counter.style.fontSize = '12px'
      counter.style.marginLeft = '5px'
      counter.textContent = `0/${maxChars}`
      el.insertAdjacentElement('afterend', counter)
    }
  },
}
</script>

<template>
  <div class="task-form">
    <h3>Thêm nhiệm vụ mới</h3>
    <form @submit.prevent="checkForm">
      <div class="form-group">
        <label for="taskTitle">Tiêu đề nhiệm vụ <span class="required">*</span></label>
        <input
          id="taskTitle"
          type="text"
          v-model.trim="newTask.title"
          @input="onTitleInput"
          placeholder="Nhập tiêu đề nhiệm vụ..."
          v-focus
          v-char-limit="50"
        />
        <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
      </div>

      <div class="form-group">
        <label for="taskPriority">Độ ưu tiên</label>
        <select id="taskPriority" v-model="newTask.priority">
          <option value="low">Thấp</option>
          <option value="medium">Trung bình</option>
          <option value="high">Cao</option>
        </select>
      </div>

      <div class="form-group">
        <label for="taskDueDate">Ngày hạn</label>
        <input id="taskDueDate" type="date" v-model="newTask.dueDate" />
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="!isValid" :class="{ 'button-disabled': !isValid }">
          Thêm nhiệm vụ
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.task-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 25px;
  margin-top: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-top: 4px solid #42b983;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 25px;
}

.task-form h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 15px;
  color: #555;
}

.required {
  color: #e74c3c;
  margin-left: 3px;
}

input[type='text'],
input[type='date'],
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

input[type='text']:focus,
input[type='date']:focus,
select:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.25);
  outline: none;
  background-color: #fff;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
  padding-right: 35px;
}

.form-actions {
  margin-top: 25px;
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 12px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
}

button:hover:not(.button-disabled) {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button-disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #e74c3c;
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;
}

.error-message:before {
  content: '⚠';
  margin-right: 5px;
}

.char-counter {
  font-size: 13px;
  color: #7f8c8d;
  margin-left: 8px;
  transition: color 0.3s ease;
}

@media (max-width: 768px) {
  .task-form {
    width: 100%;
    padding: 20px;
  }
}
</style>
