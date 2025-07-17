import { mount, flushPromises } from '@vue/test-utils'
import QuestionPage from '../../../src/views/QuestionPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'

// Mock axios
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>
  get: ReturnType<typeof vi.fn>
}
mockedAxios.post = vi.fn()
mockedAxios.get = vi.fn()

// Define router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/scale/:id', name: 'Questions', component: QuestionPage },
    { path: '/dashboard', name: 'Dashboard', component: { template: '<div>Dashboard</div>' } }
  ]
})

// Mock scale data
const mockScale = {
  name: 'Test Scale',
  visible_to: 'child',
  questions: [
    {
      id: 1,
      text: 'What is your favorite color?',
      type: 'select_one',
      options: [
        { id: 101, text: 'Red', value: 1, order: 1 },
        { id: 102, text: 'Blue', value: 2, order: 2 }
      ]
    },
    {
      id: 2,
      text: 'Select fruits you like:',
      type: 'select_multiple',
      options: [
        { id: 201, text: 'Apple', value: 1, order: 1 },
        { id: 202, text: 'Banana', value: 2, order: 2 }
      ]
    },
    {
      id: 3,
      text: 'Any comments?',
      type: 'text',
      options: []
    }
  ]
}

describe('QuestionPage.vue', () => {
  beforeEach(async () => {
    mockedAxios.get.mockResolvedValue({ data: { data: mockScale } })
    mockedAxios.post.mockResolvedValue({ data: { success: true } })
    window.localStorage.setItem('api_token', 'mocktoken')

    router.push('/scale/1')
    await router.isReady()
  })

  it('renders first question correctly', async () => {
    const wrapper = mount(QuestionPage, { global: { plugins: [router] } })
    await flushPromises()

    expect(wrapper.text()).toContain(mockScale.questions[0].text)
  })

  it('disables next button with no answer', async () => {
    const wrapper = mount(QuestionPage, { global: { plugins: [router] } })
    await flushPromises()

    const nextBtn = wrapper.findAllComponents({ name: 'IonButton' })
      .find(btn => btn.text().includes('পরবর্তি'))

    expect(nextBtn?.props('disabled')).toBe(true)
  })

  it('enables next and sends select_one answer', async () => {
    const wrapper = mount(QuestionPage, { global: { plugins: [router] } })
    await flushPromises()

    const radio = wrapper.find('input[type="radio"][value="1"]')
    await radio.setValue()

    const nextBtn = wrapper.findAllComponents({ name: 'IonButton' })
      .find(btn => btn.text().includes('পরবর্তি'))

    expect(nextBtn?.attributes('disabled')).toBeUndefined()

    await nextBtn?.trigger('click')
    await flushPromises()

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/question/respond/1'),
      { option_id: 101 },
      expect.any(Object)
    )
  })

  it('enables next and sends select_multiple answer', async () => {
    const wrapper = mount(QuestionPage, { global: { plugins: [router] } })
    await flushPromises()

    // Q1
    await wrapper.find('input[type="radio"][value="1"]').setValue()
    await wrapper.findAllComponents({ name: 'IonButton' })
      .find(btn => btn.text().includes('পরবর্তি'))?.trigger('click')
    await flushPromises()

    // Q2
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    expect(checkboxes.length).toBeGreaterThan(0)

    await checkboxes[0].setValue(true)
    await checkboxes[1].setValue(true)

    await wrapper.findAllComponents({ name: 'IonButton' })
      .find(btn => btn.text().includes('পরবর্তি'))?.trigger('click')
    await flushPromises()

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/question/respond/2'),
      { text_answer: '1,2' },
      expect.any(Object)
    )
  })

  it('enables next and sends text answer', async () => {
    const wrapper = mount(QuestionPage, { global: { plugins: [router] } })
    await flushPromises()

    // Q1
    await wrapper.find('input[type="radio"][value="1"]').setValue()
    await wrapper.findAllComponents({ name: 'IonButton' })
      .find(btn => btn.text().includes('পরবর্তি'))?.trigger('click')
    await flushPromises()

    // Q2
    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.exists()).toBe(true)
    await checkbox.setValue(true)
    await wrapper.findAllComponents({ name: 'IonButton' })
      .find(btn => btn.text().includes('পরবর্তি'))?.trigger('click')
    await flushPromises()

    // Q3
    const input = wrapper.find('input[type="text"]')
    expect(input.exists()).toBe(true)
    await input.setValue('Test comment')

    await wrapper.findAllComponents({ name: 'IonButton' })
      .find(btn => btn.text().includes('পরবর্তি'))?.trigger('click')
    await flushPromises()

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/question/respond/3'),
      { text_answer: 'Test comment' },
      expect.any(Object)
    )
  })
})
