<script setup>
import { ref, reactive, computed, watch } from 'vue'
import TaskItem from './TaskItem.vue'
import TaskFilter from './TaskFilter.vue'
import TaskForm from './TaskForm.vue'
import TaskStats from './TaskStats.vue'

// Tải danh sách nhiệm vụ từ LocalStorage hoặc khởi tạo danh sách trống
const tasks = reactive(JSON.parse(localStorage.getItem('tasks')) || [])

const filter = ref('all')
const sortBy = ref('dueDate')
const searchQuery = ref('')
const showAddForm = ref(false)
const newTaskId = ref(tasks.length ? tasks[tasks.length - 1].id + 1 : 1)
const darkMode = ref(false)

// Lưu danh sách nhiệm vụ vào LocalStorage mỗi khi danh sách thay đổi
watch(
  () => tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  },
  { deep: true },
)

const filteredTasks = computed(() => {
  return tasks
    .filter((task) => {
      // Áp dụng filter
      if (filter.value === 'active' && task.completed) return false
      if (filter.value === 'completed' && !task.completed) return false

      // Áp dụng search
      if (searchQuery.value && !task.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
        return false

      return true
    })
    .sort((a, b) => {
      // Sort theo các tiêu chí
      if (sortBy.value === 'title') {
        return a.title.localeCompare(b.title)
      } else if (sortBy.value === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      } else if (sortBy.value === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      return 0
    })
})

// Stats
const stats = computed(() => {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const active = total - completed
  const percentComplete = total ? Math.round((completed / total) * 100) : 0

  return { total, completed, active, percentComplete }
})

// Watched properties
watch(filter, (newVal) => {
  console.log(`Filter changed to: ${newVal}`)
})

watch(darkMode, (newVal) => {
  document.body.classList.toggle('dark-mode', newVal)
})

// Các methods
function addTask(newTask) {
  tasks.push({
    id: newTaskId.value++,
    title: newTask.title,
    completed: false,
    priority: newTask.priority || 'medium',
    dueDate: newTask.dueDate || new Date(),
  })
  showAddForm.value = false
}

function toggleTaskStatus(id) {
  const task = tasks.find((t) => t.id === id)
  if (task) {
    task.completed = !task.completed
  }
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id)
  if (index !== -1) {
    tasks.splice(index, 1)
  }
}

function editTask(updatedTask) {
  const index = tasks.findIndex((t) => t.id === updatedTask.id)
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask }
  }
}
</script>

<template>
  <div class="task-manager" :class="{ 'dark-theme': darkMode }">
    <header>
      <h1>Quản Lý Nhiệm Vụ</h1>
      <div class="theme-toggle">
        <label for="darkMode">Chế độ tối</label>
        <input id="darkMode" type="checkbox" v-model="darkMode" />
      </div>
    </header>

    <TaskStats :stats="stats" />

    <div class="controls">
      <TaskFilter v-model:filter="filter" v-model:sort="sortBy" />

      <div class="search-box">
        <input type="text" v-model="searchQuery" placeholder="Tìm kiếm nhiệm vụ..." v-focus />
      </div>

      <button @click="showAddForm = !showAddForm">
        {{ showAddForm ? 'Hủy' : 'Thêm nhiệm vụ mới' }}
      </button>
    </div>

    <transition name="slide">
      <TaskForm v-if="showAddForm" @add-task="addTask" />
    </transition>

    <!-- Hiển thị thông báo nếu không có nhiệm vụ -->
    <p v-if="tasks.length === 0">Hiện tại chưa có nhiệm vụ</p>

    <!-- Hiển thị danh sách nhiệm vụ -->
    <transition-group name="list" tag="ul" class="task-list">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-status="toggleTaskStatus"
        @delete-task="deleteTask"
        @edit-task="editTask"
        v-memo="[task.completed, task.title]"
      />
    </transition-group>

    <p v-if="filteredTasks.length === 0">Không có nhiệm vụ nào khớp với bộ lọc.</p>
  </div>
</template>

<style scoped>
.task-manager {
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark-theme {
  background-color: #222;
  color: #eee;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}

header h1 {
  font-size: 2.2rem;
  margin: 0;
  color: #2c3e50;
}

.dark-theme header h1 {
  color: #eee;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.dark-theme .controls {
  background-color: #333;
}

.search-box {
  flex: 1;
  min-width: 200px;
}

input[type='text'] {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input[type='text']:focus {
  border-color: #42b983;
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
  outline: none;
}

button {
  padding: 10px 18px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.2s;
}

button:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.task-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

/* Animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

/* Dark theme */
.dark-theme input,
.dark-theme button {
  background-color: #444;
  color: #fff;
  border-color: #555;
}

.dark-theme button {
  background-color: #42b983;
}

.dark-theme button:hover {
  background-color: #3aa876;
}
</style>

<!-- Test case -->
<script>
describe('Task Manager', () => {
  it('should add a new task', () => {
    cy.visit('/')
    cy.get('button').contains('Thêm nhiệm vụ mới').click() // Mở form
    cy.get('[data-cy="add-task-input"]').type('New Task')
    cy.get('[data-cy="add-task-button"]').click()
    cy.contains('New Task').should('exist')
  })
})
</script>
