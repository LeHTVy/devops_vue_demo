import { mount } from '@vue/test-utils'
import TaskManager from '@/components/TaskManager.vue'
import { test, expect } from 'vitest'

test('hiển thị tiêu đề và mở form thêm nhiệm vụ', async () => {
  const wrapper = mount(TaskManager)
  expect(wrapper.find('h1').text()).toBe('Quản Lý Nhiệm Vụ')
  const toggleBtn = wrapper.find('button')
  await toggleBtn.trigger('click')
  expect(wrapper.findComponent({ name: 'TaskForm' }).exists()).toBe(true)
})
