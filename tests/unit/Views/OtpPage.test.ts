import { mount, flushPromises } from '@vue/test-utils'
import OtpPage from '../../../src/views/OtpPage.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('axios')
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: OtpPage },
    { path: '/choice', component: { template: '<div>Choice</div>' } }
  ],
})

beforeEach(async () => {
  vi.clearAllMocks()
  localStorage.setItem('phoneNumber', '+8801512345678')
  router.push('/')
  await router.isReady()
})

describe('OtpPage.vue', () => {
  it('renders OTP input and message', () => {
    const wrapper = mount(OtpPage, {
      global: { plugins: [router] }
    })

    expect(wrapper.text()).toContain('ও.টি.পি')
    expect(wrapper.find('input[type="numbr"]').exists()).toBe(true)
  })

  it('alerts when submitted without OTP', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const wrapper = mount(OtpPage, {
      global: { plugins: [router] }
    })

    await wrapper.find('form').trigger('submit.prevent')
    expect(alertMock).toHaveBeenCalledWith('Please enter OTP!')
  })

  it('submits OTP and navigates to /choice on success', async () => {
    const wrapper = mount(OtpPage, {
      global: { plugins: [router] }
    })

    const vm = wrapper.vm as any
    vm.otp = '1234'

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          token: 'dummy_token',
          user: { name: 'Test User' }
        }
      }
    })

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(localStorage.getItem('api_token')).toBe('dummy_token')
    expect(localStorage.getItem('user')).toContain('Test User')
    expect(localStorage.getItem('phoneNumber')).toBe(null)
    expect(router.currentRoute.value.path).toBe('/choice')
  })

  it('shows alert on invalid OTP', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const wrapper = mount(OtpPage, {
      global: { plugins: [router] }
    })

    const vm = wrapper.vm as any
    vm.otp = '0000'

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        success: false
      }
    })

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(alertMock).toHaveBeenCalledWith('Failed to verify OTP. Try again.')
  })
})
