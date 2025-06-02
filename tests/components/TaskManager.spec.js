import { mount } from '@vue/test-utils'
import TaskManager from '@/components/TaskManager.vue'
import { test, expect } from 'vitest'

test('renders TaskManager component', () => {
  const wrapper = mount(TaskManager)
  expect(wrapper.exists()).toBe(true)
})
