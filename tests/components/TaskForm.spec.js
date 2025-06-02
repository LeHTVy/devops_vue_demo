import { mount } from '@vue/test-utils'
import TaskForm from '@/components/TaskForm.vue'
import { test, expect } from 'vitest'

test('nhập tiêu đề và submit sẽ emit add-task', async () => {
  const wrapper = mount(TaskForm)

  // Nhập tiêu đề nhiệm vụ
  const input = wrapper.find('[data-cy="add-task-input"]')
  await input.setValue('Nhiệm vụ demo')

  // Submit form
  await wrapper.find('form').trigger('submit.prevent')

  // Kiểm tra sự kiện add-task đã được emit với dữ liệu đúng
  const emitted = wrapper.emitted('add-task')
  expect(emitted).toBeTruthy()
  expect(emitted[0][0]).toMatchObject({
    title: 'Nhiệm vụ demo',
    priority: 'medium', // hoặc giá trị mặc định khác nếu bạn thay đổi
  })
})
