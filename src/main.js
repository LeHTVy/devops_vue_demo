import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Đăng ký custom directives
app.directive('focus', {
  mounted: (el) => el.focus()
})

app.directive('char-limit', {
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
        
        // Đổi màu khi gần đến giới hạn
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
  }
})

app.directive('priority', {
  mounted(el, binding) {
    const priorityColors = {
      high: '#ffcccc',
      medium: '#ffffcc',
      low: '#ccffcc'
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
      low: '#ccffcc'
    }
    
    el.style.borderLeft = `5px solid ${priorityColors[binding.value] || '#ccc'}`
  }
})

app.directive('overdue', (el, binding) => {
  if (!binding.value) return
  
  const dueDate = new Date(binding.value)
  const today = new Date()
  
  if (dueDate < today) {
    el.classList.add('overdue')
    el.setAttribute('title', 'Nhiệm vụ đã quá hạn!')
  }
})

app.directive('count', {
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
})

app.use(router)
app.mount('#app')
