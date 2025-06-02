import { mount } from '@vue/test-utils'
import TaskManager from '@/components/TaskManager.vue'
import { test, expect } from 'vitest'

const global = {
  directives: {
    focus: { mounted: () => {} },
  },
}

test('hiển thị tiêu đề và mở form thêm nhiệm vụ', async () => {
  const wrapper = mount(TaskManager, { global })

  expect(wrapper.find('h1').text()).toBe('Quản Lý Nhiệm Vụ')

  const toggleBtn = wrapper.findAll('button').find((btn) => btn.text() === 'Thêm nhiệm vụ mới')
  expect(toggleBtn).toBeTruthy()

  await toggleBtn.trigger('click')
  await wrapper.vm.$nextTick()

  expect(wrapper.find('form').exists()).toBe(true)
})
