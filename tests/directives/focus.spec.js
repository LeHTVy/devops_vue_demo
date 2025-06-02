// filepath: e:\SoftwareEngeering\seminar\devops_demo\tests\directives\focus.spec.js
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import { test, expect, vi } from 'vitest'

const app = createApp({})
app.directive('focus', {
  mounted: (el) => el.focus(),
})

test('v-focus directive should focus the element', () => {
  const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus') // Theo dõi việc gọi focus()
  mount(
    {
      template: '<input v-focus />',
    },
    { global: { directives: { focus: app._context.directives.focus } } },
  )

  expect(focusSpy).toHaveBeenCalled() // Kiểm tra xem focus() đã được gọi
  focusSpy.mockRestore() // Khôi phục trạng thái ban đầu
})
