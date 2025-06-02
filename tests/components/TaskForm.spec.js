import { mount } from '@vue/test-utils'
import TaskForm from '@/components/TaskForm.vue'
import { test, expect } from 'vitest'

// Đăng ký directive focus giả lập
const global = {
  directives: {
    focus: {
      mounted: () => {},
    },
    'char-limit': {
      mounted: () => {},
    },
  },
}

test('nhập tiêu đề và submit sẽ emit add-task', async () => {
  const wrapper = mount(TaskForm, { global })

  const input = wrapper.find('[data-cy="add-task-input"]')
  await input.setValue('Nhiệm vụ demo')

  await wrapper.find('form').trigger('submit.prevent')

  const emitted = wrapper.emitted('add-task')
  expect(emitted).toBeTruthy()
  expect(emitted[0][0]).toMatchObject({
    title: 'Nhiệm vụ demo',
    priority: 'medium',
  })
})
