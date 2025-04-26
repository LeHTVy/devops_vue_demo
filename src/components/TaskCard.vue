<template>
  <div class="task-card" :class="cardClass">
    <div class="task-card-header">
      <slot name="header">
        <h3>{{ title }}</h3>
      </slot>
    </div>

    <div class="task-card-content">
      <slot></slot>
    </div>

    <div class="task-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    default: 'medium'
  }
})

const cardClass = computed(() => ({
  'task-card': true,
  [`priority-${props.priority}`]: true
}))
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.task-card-header {
  margin-bottom: 12px;
}

.task-card-content {
  margin-bottom: 12px;
}

.task-card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.priority-high {
  border-left: 4px solid #ff4444;
}

.priority-medium {
  border-left: 4px solid #ffbb33;
}

.priority-low {
  border-left: 4px solid #00C851;
}
/* Dark mode specific adjustments
@media (prefers-color-scheme: dark) {
  .task-card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .task-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
}*/
</style>
