import { mount } from '@vue/test-utils'
import TaskManager from '@/components/TaskManager.vue'
import { test, expect } from 'vitest'

test('hiển thị tiêu đề và mở form thêm nhiệm vụ', async () => {
  const wrapper = mount(TaskManager)

  // Kiểm tra tiêu đề
  expect(wrapper.find('h1').text()).toBe('Quản Lý Nhiệm Vụ')

  // Click nút để mở form thêm nhiệm vụ
  const toggleBtn = wrapper.find('button')
  await toggleBtn.trigger('click')

  // Kiểm tra form đã hiển thị
  expect(wrapper.findComponent({ name: 'TaskForm' }).exists()).toBe(true)
})
