<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  filter: {
    type: String,
    default: 'all'
  },
  sort: {
    type: String,
    default: 'dueDate'
  }
})

const emit = defineEmits(['update:filter', 'update:sort'])

// Local copies
const localFilter = ref(props.filter)
const localSort = ref(props.sort)

// Watch for prop changes
watch(() => props.filter, (newVal) => {
  localFilter.value = newVal
})

watch(() => props.sort, (newVal) => {
  localSort.value = newVal
})

// Watch for local changes
watch(localFilter, (newVal) => {
  emit('update:filter', newVal)
})

watch(localSort, (newVal) => {
  emit('update:sort', newVal)
})

// Options for sorting
const sortOptions = [
  { value: 'dueDate', label: 'Ngày hạn' },
  { value: 'title', label: 'Tiêu đề' },
  { value: 'priority', label: 'Độ ưu tiên' }
]

// Computed for filter buttons classes
const filterButtonClass = computed(() => {
  return {
    all: localFilter.value === 'all' ? 'active' : '',
    active: localFilter.value === 'active' ? 'active' : '',
    completed: localFilter.value === 'completed' ? 'active' : ''
  }
})

// Sử dụng v-bind directive để áp dụng nhiều attributes
const commonAttrs = {
  class: 'filter-button',
  style: {
    cursor: 'pointer',
    padding: '5px 10px'
  }
}
</script>

<template>
  <div class="task-filter">
    <div class="filter-group">
      <button 
        v-bind="commonAttrs" 
        :class="filterButtonClass.all" 
        @click="localFilter = 'all'"
      >
        Tất cả
      </button>
      
      <button 
        v-bind="commonAttrs" 
        :class="filterButtonClass.active" 
        @click="localFilter = 'active'"
      >
        Chưa hoàn thành
      </button>
      
      <button 
        v-bind="commonAttrs" 
        :class="filterButtonClass.completed" 
        @click="localFilter = 'completed'"
      >
        Đã hoàn thành
      </button>
    </div>
    
    <div class="sort-group">
      <label for="sortSelect">Sắp xếp theo:</label>
      <select 
        id="sortSelect" 
        v-model="localSort"
        class="sort-select"
      >
        <option 
          v-for="option in sortOptions" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.task-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-group, .sort-group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.filter-button {
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.filter-button:hover {
  background-color: #e0e0e0;
}

.filter-button.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.sort-select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

label {
  font-size: 14px;
  color: #555;
}
</style> 