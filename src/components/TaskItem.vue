<script setup>
import { ref, toRefs, computed } from 'vue'
import TaskCard from './TaskCard.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle-status', 'delete-task', 'edit-task'])
const { task } = toRefs(props)

const isEditing = ref(false)
const editedTask = ref({
  title: '',
  dueDate: '',
  priority: '',
})

// Format date để hiển thị
const formattedDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN')
}

function startEditing() {
  editedTask.value = {
    title: task.value.title,
    dueDate: task.value.dueDate,
    priority: task.value.priority,
  }
  isEditing.value = true
}

function saveEdit() {
  if (editedTask.value.title.trim()) {
    emit('edit-task', {
      ...task.value,
      title: editedTask.value.title.trim(),
      dueDate: editedTask.value.dueDate,
      priority: editedTask.value.priority,
    })
    isEditing.value = false
  }
}

function cancelEdit() {
  isEditing.value = false
}

// Custom directive để highlight ưu tiên
const vPriority = {
  mounted(el, binding) {
    const priorityColors = {
      high: '#ffcccc',
      medium: '#ffffcc',
      low: '#ccffcc',
    }

    el.style.borderLeft = `5px solid ${priorityColors[binding.value] || '#ccc'}`

    if (binding.arg === 'bold') {
      el.style.fontWeight = 'bold'
    }

    if (binding.modifiers.pulse) {
      if (binding.value === 'high') {
        el.classList.add('priority-pulse')
      }
    }
  },
  updated(el, binding) {
    const priorityColors = {
      high: '#ffcccc',
      medium: '#ffffcc',
      low: '#ccffcc',
    }

    el.style.borderLeft = `5px solid ${priorityColors[binding.value] || '#ccc'}`
  },
}

// Custom directive để highlight quá hạn
const vOverdue = (el, binding) => {
  if (!binding.value) return

  const dueDate = new Date(binding.value)
  const today = new Date()

  if (dueDate < today) {
    el.classList.add('overdue')
    el.setAttribute('title', 'Nhiệm vụ đã quá hạn!')
  }
}

// Thêm computed properties cho trạng thái nhiệm vụ
const isOverdue = computed(() => {
  if (!task.value.dueDate) return false
  const dueDate = new Date(task.value.dueDate)
  const today = new Date()
  return dueDate < today
})

const isDueSoon = computed(() => {
  if (!task.value.dueDate || task.value.completed) return false
  const dueDate = new Date(task.value.dueDate)
  const today = new Date()
  const diffTime = dueDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 2 && diffDays > 0
})

// Đăng ký các custom directives
defineExpose({
  vPriority,
  vOverdue,
})
</script>

<template>
  <li class="task-item">
    <task-card :title="task.title" :priority="task.priority">
      <template #header>
        <div class="task-header">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="emit('toggle-status', task.id)"
          />
          <h3 v-text="task.title"></h3>
        </div>
      </template>

      <div class="task-details">
        <div class="task-meta">
          <span class="due-date" v-overdue="task.dueDate">
            Hạn: {{ formattedDate(task.dueDate) }}
          </span>
          <span class="priority"> Độ ưu tiên: {{ task.priority }} </span>
        </div>

        <div class="task-status">
          <span v-if="task.completed" class="status completed">Đã hoàn thành</span>
          <span v-else-if="isOverdue" class="status overdue">Quá hạn</span>
          <span v-else-if="isDueSoon" class="status due-soon">Sắp đến hạn</span>
          <span v-else class="status on-time">Còn thời gian</span>
        </div>
      </div>

      <template #footer>
        <div class="task-actions">
          <button @click.stop="startEditing" class="edit-btn">Sửa</button>
          <button @click.stop="emit('delete-task', task.id)" class="delete-btn">Xóa</button>
        </div>
      </template>
    </task-card>

    <div class="task-edit" v-if="isEditing">
      <div class="edit-form">
        <div class="form-group">
          <label>Tiêu đề:</label>
          <input
            type="text"
            v-model="editedTask.title"
            @keyup.enter="saveEdit"
            @keyup.esc="cancelEdit"
            placeholder="Nhập tiêu đề nhiệm vụ"
          />
        </div>

        <div class="form-group">
          <label>Ngày hạn:</label>
          <input
            type="date"
            v-model="editedTask.dueDate"
            :min="new Date().toISOString().split('T')[0]"
          />
        </div>

        <div class="form-group">
          <label>Độ ưu tiên:</label>
          <select v-model="editedTask.priority">
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </div>

        <div class="edit-actions">
          <button @click="saveEdit" class="save-btn">Lưu</button>
          <button @click="cancelEdit" class="cancel-btn">Hủy</button>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.task-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-header input[type='checkbox'] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #42b983;
}

.task-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-meta {
  display: flex;
  gap: 16px;
  color: #666;
}

.task-status {
  margin-top: 8px;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.status.completed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.overdue {
  background-color: #ffebee;
  color: #c62828;
}

.status.due-soon {
  background-color: #fff3e0;
  color: #ef6c00;
}

.status.on-time {
  background-color: #e3f2fd;
  color: #1565c0;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.edit-btn,
.delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #42b983;
  color: white;
}

.edit-btn:hover {
  background-color: #3aa876;
}

.delete-btn {
  background-color: #ff4444;
  color: white;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.task-edit {
  margin-top: 16px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

.form-group select {
  cursor: pointer;
  background-color: white;
}

.edit-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.save-btn,
.cancel-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background-color: #42b983;
  color: white;
}

.cancel-btn {
  background-color: #666;
  color: white;
}

.overdue {
  color: #e74c3c;
  font-weight: bold;
  animation: blink 1.5s infinite;
}

.priority-pulse {
  animation: pulse 2s infinite;
}

.task-item {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dark-theme .task-item h3 {
  color: #000000;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(231, 76, 60, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
