<script setup>
import { computed } from 'vue'

const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
})

// Sử dụng computed để tạo class cho thanh tiến trình
const progressBarClass = computed(() => {
  const percentage = props.stats.percentComplete
  if (percentage < 30) return 'progress-low'
  if (percentage < 70) return 'progress-medium'
  return 'progress-high'
})

// Thêm custom directive để tạo hiệu ứng đếm số
const vCount = {
  mounted(el, binding) {
    const duration = binding.arg || 1000
    const start = 0
    const end = binding.value || 0
    
    const startTime = performance.now()
    
    function animate(currentTime) {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      
      const currentValue = Math.floor(progress * (end - start) + start)
      el.textContent = currentValue
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        el.textContent = end
      }
    }
    
    requestAnimationFrame(animate)
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      const duration = binding.arg || 1000
      const start = binding.oldValue || 0
      const end = binding.value || 0
      
      const startTime = performance.now()
      
      function animate(currentTime) {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        
        const currentValue = Math.floor(progress * (end - start) + start)
        el.textContent = currentValue
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          el.textContent = end
        }
      }
      
      requestAnimationFrame(animate)
    }
  }
}
</script>

<template>
  <div class="task-stats">
    <div class="stats-cards">
      <div class="stats-card">
        <h3>Tổng số</h3>
        <div class="stats-value" v-count:800="stats.total">{{ stats.total }}</div>
      </div>
      
      <div class="stats-card">
        <h3>Đã hoàn thành</h3>
        <div class="stats-value" v-count:800="stats.completed">{{ stats.completed }}</div>
      </div>
      
      <div class="stats-card">
        <h3>Chưa hoàn thành</h3>
        <div class="stats-value" v-count:800="stats.active">{{ stats.active }}</div>
      </div>
      
      <div class="stats-card">
        <h3>Hoàn thành (%)</h3>
        <div class="stats-value" v-count:1200="stats.percentComplete">{{ stats.percentComplete }}</div>
      </div>
    </div>
    
    <div class="progress-container">
      <div class="progress-text">Tiến độ hoàn thành:</div>
      <div class="progress-bar-container">
        <div 
          class="progress-bar" 
          :class="progressBarClass"
          :style="{ width: `${stats.percentComplete}%` }"
        ></div>
      </div>
      <div class="progress-percentage">{{ stats.percentComplete }}%</div>
    </div>
  </div>
</template>

<style scoped>
.task-stats {
  margin-bottom: 30px;
  padding: 0;
  background-color: transparent;
}

.stats-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.stats-card {
  flex: 1;
  min-width: 120px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s;
  border-top: 3px solid transparent;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.stats-card:nth-child(1) {
  border-top-color: #3498db;
}

.stats-card:nth-child(2) {
  border-top-color: #2ecc71;
}

.stats-card:nth-child(3) {
  border-top-color: #e74c3c;
}

.stats-card:nth-child(4) {
  border-top-color: #f39c12;
}

.stats-card h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #7f8c8d;
  font-weight: 500;
}

.stats-value {
  font-size: 32px;
  font-weight: bold;
  color: #2c3e50;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.progress-text {
  font-size: 16px;
  font-weight: 500;
  min-width: 180px;
  color: #2c3e50;
}

.progress-bar-container {
  flex: 1;
  height: 16px;
  background-color: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  transition: width 0.8s ease, background-color 0.3s;
  border-radius: 10px;
}

.progress-percentage {
  font-size: 16px;
  font-weight: bold;
  min-width: 60px;
  text-align: right;
  color: #2c3e50;
}

.progress-low {
  background: linear-gradient(90deg, #ff9800, #ffb74d);
}

.progress-medium {
  background: linear-gradient(90deg, #2196F3, #64b5f6);
}

.progress-high {
  background: linear-gradient(90deg, #4CAF50, #81c784);
}

@media (max-width: 768px) {
  .stats-cards {
    flex-direction: column;
  }
  
  .progress-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .progress-bar-container {
    width: 100%;
    margin: 10px 0;
  }
  
  .progress-percentage {
    text-align: left;
    align-self: flex-end;
  }
}
</style> 