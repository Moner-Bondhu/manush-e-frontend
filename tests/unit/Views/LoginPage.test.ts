declare global {
  interface ImportMetaEnv {
    VITE_API_ENDPOINT: string
  }

  interface ImportMeta {
    env: ImportMetaEnv
  }
}


import { mount, flushPromises } from '@vue/test-utils'
import LoginPage from '../../../src/views/LoginPage.vue'
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
    { path: '/', component: LoginPage },
    { path: '/send-otp', component: { template: 'OTP Page' } }
  ],
})

beforeEach(async () => {
  router.push('/')
  await router.isReady()
})

describe('LoginPage.vue', () => {
  it('renders logo and input field', () => {
    const wrapper = mount(LoginPage, {
      global: { plugins: [router] }
    })

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('লগইন করতে আপনার ফোন নাম্বার দিন')
  })

  it('alerts when submitted with empty input', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const wrapper = mount(LoginPage, {
      global: { plugins: [router] }
    })

    await wrapper.find('form').trigger('submit.prevent')
    expect(alertMock).toHaveBeenCalledWith('Please enter a number!')
  })

  it('submits phone number and navigates on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } })
    const wrapper = mount(LoginPage, {
      global: { plugins: [router] }
    })

    await wrapper.find('input').setValue('01512345678')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_ENDPOINT}/login`,
      { phoneNumber: '+8801512345678' }
    )
    expect(router.currentRoute.value.path).toBe('/send-otp')
  })

  it('shows PWA install button if deferredPrompt is set', async () => {
    const wrapper = mount(LoginPage, {
      global: { plugins: [router] }
    })

    // simulate `beforeinstallprompt` event
    const installEvent = { prompt: vi.fn(), userChoice: Promise.resolve({ outcome: 'dismissed' }) }
    window.dispatchEvent(new CustomEvent('beforeinstallprompt', { detail: installEvent }))

    const vm = wrapper.vm as any
    vm.deferredPrompt = installEvent
    await vm.$nextTick()

    expect(wrapper.find('ion-button').text()).toContain('পরবর্তি')
  })
})
