# Vue 3 Directives for Interactive UI - Demo Ứng dụng Quản lý Nhiệm vụ

Đây là một ứng dụng demo được xây dựng để minh họa việc sử dụng các directive của Vue 3 để tạo ra trải nghiệm người dùng tương tác tốt hơn.

## Cài đặt

npm install

# Chạy server phát triển

npm run dev

# Build cho production

npm run build

## Deployment

Ứng dụng được deploy tự động lên GitHub Pages thông qua workflow CI/CD.

## Code Coverage

Để kiểm tra code coverage, chạy lệnh:
npm run test:coverage

## Các Directive đã sử dụng trong ứng dụng

### Built-in Directives

1. **v-model**: Binding hai chiều cho forms

   - Ví dụ: `v-model="searchQuery"`, `v-model.trim="newTask.title"`
   - Modifiers: `.trim` để loại bỏ khoảng trắng

2. **v-bind (hoặc :)**: Binding một chiều

   - Ví dụ: `:class="{ 'completed': task.completed }"`, `:style="{ width: `${stats.percentComplete}%` }"`

3. **v-if/v-else**: Render có điều kiện

   - Ví dụ: `v-if="showAddForm"`, `v-if="!isEditing"`, `v-else`

4. **v-for**: Render danh sách

   - Ví dụ: `v-for="task in filteredTasks" :key="task.id"`
   - Với `:key` để tối ưu hóa render

5. **v-on (hoặc @)**: Xử lý sự kiện

   - Ví dụ: `@click="showAddForm = !showAddForm"`, `@submit.prevent="checkForm"`
   - Modifiers: `.stop`, `.prevent`

6. **v-show**: Toggle hiển thị (khác v-if ở chỗ element vẫn giữ trong DOM)

   - Ví dụ: `v-show="filteredTasks.length > 0"`

7. **v-text**: Binding text content

   - Ví dụ: `v-text="task.title"`

8. **v-html**: Binding HTML content (cẩn thận XSS)

9. **v-once**: Render một lần duy nhất

10. **v-memo**: Tối ưu hóa việc render lại
    - Ví dụ: `v-memo="[task.completed, task.title]"`

### Custom Directives

1. **v-focus**: Tự động focus vào input

   ```javascript
   app.directive('focus', {
     mounted: (el) => el.focus(),
   })
   ```

2. **v-char-limit**: Giới hạn số ký tự và hiển thị bộ đếm

   ```javascript
   app.directive('char-limit', {
     mounted(el, binding) {
       const maxChars = binding.value || 50
       // ... logic để giới hạn và hiển thị bộ đếm
     },
   })
   ```

3. **v-priority**: Thêm màu sắc đánh dấu cho độ ưu tiên

   ```javascript
   app.directive('priority', {
     mounted(el, binding) {
       const priorityColors = { high: '#ffcccc', medium: '#ffffcc', low: '#ccffcc' }
       el.style.borderLeft = `5px solid ${priorityColors[binding.value] || '#ccc'}`

       // Sử dụng arguments
       if (binding.arg === 'bold') {
         el.style.fontWeight = 'bold'
       }

       // Sử dụng modifiers
       if (binding.modifiers.pulse) {
         if (binding.value === 'high') {
           el.classList.add('priority-pulse')
         }
       }
     },
   })
   ```

4. **v-overdue**: Đánh dấu nhiệm vụ quá hạn

   ```javascript
   app.directive('overdue', (el, binding) => {
     if (!binding.value) return

     const dueDate = new Date(binding.value)
     const today = new Date()

     if (dueDate < today) {
       el.classList.add('overdue')
       el.setAttribute('title', 'Nhiệm vụ đã quá hạn!')
     }
   })
   ```

5. **v-count**: Hiệu ứng đếm số

   ```javascript
   app.directive('count', {
     mounted(el, binding) {
       const duration = binding.arg || 1000
       const start = 0
       const end = binding.value || 0

       // ... logic animation đếm số
     },
   })
   ```

## Cấu trúc Hook của Custom Directive

Vue 3 cung cấp các hook sau cho custom directive:

- **created**: được gọi trước khi attribute hoặc event listener của element được áp dụng
- **beforeMount**: được gọi khi directive được gắn lần đầu tiên vào element
- **mounted**: tương tự lifecycle hook mounted, được gọi khi element được thêm vào DOM
- **beforeUpdate**: được gọi trước khi element được cập nhật
- **updated**: được gọi sau khi element và component của nó được cập nhật
- **beforeUnmount**: được gọi trước khi element bị gỡ bỏ khỏi DOM
- **unmounted**: được gọi khi directive bị gỡ bỏ khỏi element

## Tài nguyên học tập

- [Vue 3 Documentation - Directives](https://vuejs.org/guide/reusability/custom-directives.html)
- [Vue 3 Style Guide](https://vuejs.org/style-guide/)

```

```
