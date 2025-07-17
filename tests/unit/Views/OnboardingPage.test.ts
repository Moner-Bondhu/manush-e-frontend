import { mount, flushPromises } from '@vue/test-utils'
import OnboardingPage from '../../../src/views/OnboardingPage.vue'
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
    { path: '/', component: OnboardingPage },
    { path: '/choice', component: { template: '<div>Choice</div>' } }
  ],
})

beforeEach(async () => {
  vi.clearAllMocks()
  router.push('/')
  await router.isReady()
  localStorage.setItem('api_token', 'dummy_token')
  localStorage.setItem('user', JSON.stringify({ name: 'test user', is_onboarded: false }))
})

describe('OnboardingPage.vue', () => {
  it('renders child name step initially', () => {
    const wrapper = mount(OnboardingPage, {
      global: { plugins: [router] },
    })

    expect(wrapper.text()).toContain('আপনার সন্তানের নাম বলুন')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('navigates through steps using next and previous', async () => {
    const wrapper = mount(OnboardingPage, {
      global: { plugins: [router] },
    })

    const nextButton = wrapper.findAllComponents({ name: 'IonButton' }).find(btn => btn.text() === 'Next')
    await nextButton?.trigger('click')
    expect(wrapper.text()).toContain('আপনার সন্তানের বয়স কত?')

    const prevButton = wrapper.findAllComponents({ name: 'IonButton' }).find(btn => btn.text() === 'Previous')
    await prevButton?.trigger('click')
    expect(wrapper.text()).toContain('আপনার সন্তানের নাম বলুন')
  })

  it('submitting with incomplete data resets to step 1', async () => {
    const wrapper = mount(OnboardingPage, {
      global: { plugins: [router] },
    })

    const vm = wrapper.vm as any
    vm.currentStep = 8
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    
    expect(vm.currentStep).toBe(1)
})

  it('submits correctly with complete data and redirects to /choice', async () => {
    const wrapper = mount(OnboardingPage, {
      global: { plugins: [router] },
    })

    const vm = wrapper.vm as any
    vm.currentStep = 8
    vm.child_name = 'Child'
    vm.child_dob = '2015-01-01'
    vm.child_gender = 'male'
    vm.child_grade = '3'
    vm.parent_name = 'Parent'
    vm.parent_dob = '1980-01-01'
    vm.parent_type = 'father'
    vm.parent_grade = 'teacher'

    mockedAxios.post
      .mockResolvedValueOnce({ data: { success: true } }) // child
      .mockResolvedValueOnce({ data: { success: true } }) // parent
      .mockResolvedValueOnce({ data: { success: true } }) // onboard

    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(mockedAxios.post).toHaveBeenCalledTimes(3)
    expect(router.currentRoute.value.path).toBe('/choice')
  })

  it('completes full onboarding step-by-step and submits', async () => {
  const wrapper = mount(OnboardingPage, { global: { plugins: [router] } })

  mockedAxios.post
    .mockResolvedValueOnce({ data: { success: true } }) // child
    .mockResolvedValueOnce({ data: { success: true } }) // parent
    .mockResolvedValueOnce({ data: { success: true } }) // onboard

  // Step 1: child name
  await wrapper.find('input[type="text"]').setValue('Child')
  await wrapper.findAllComponents({ name: 'IonButton' }).find(b => b.text() === 'Next')?.trigger('click')

  // Step 2: child dob
  await wrapper.find('input[type="date"]').setValue('2015-01-01')
  await wrapper.findAllComponents({ name: 'IonButton' }).find(b => b.text() === 'Next')?.trigger('click')

  // Step 3: gender
  await wrapper.find('input#option1').setValue()
  await wrapper.findAllComponents({ name: 'IonButton' }).find(b => b.text() === 'Next')?.trigger('click')

  // Step 4: grade
  await wrapper.find('select').setValue('3')
  await wrapper.findAllComponents({ name: 'IonButton' }).find(b => b.text() === 'Next')?.trigger('click')

  // Step 5: parent name
  await wrapper.find('input[type="text"]').setValue('Parent')
  await wrapper.findAllComponents({ name: 'IonButton' }).find(b => b.text() === 'Next')?.trigger('click')

  // Step 6: parent dob
  await wrapper.find('input[type="date"]').setValue('1980-01-01')
  await wrapper.findAllComponents({ name: 'IonButton' }).find(b => b.text() === 'Next')?.trigger('click')

  // Step 7: parent type
  await wrapper.find('input#option1').setValue() // father
  await wrapper.findAllComponents({ name: 'IonButton' }).find(b => b.text() === 'Next')?.trigger('click')

  // Step 8: parent occupation
  await wrapper.find('select').setValue('teacher')

  await wrapper.find('form').trigger('submit.prevent')
  await flushPromises()

  expect(mockedAxios.post).toHaveBeenCalledTimes(3)
  expect(router.currentRoute.value.path).toBe('/choice')
})

})
