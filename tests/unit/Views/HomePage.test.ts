import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HomePage from '../../../src/views/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Define routes for testing navigation
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/dashboard', name: 'Dashboard', component: { template: '<div>Dashboard</div>' } },
    { path: '/choice', name: 'Choice', component: { template: '<div>Choice</div>' } },
    { path: '/task1', name: 'Task1', component: { template: '<div>Task1</div>' } },
  ],
})

let routerPushSpy: any

beforeEach(async () => {
  routerPushSpy = vi.spyOn(router, 'push')
  router.push('/')
  await router.isReady()
})

describe('HomePage.vue', () => {
  it('renders profile section', () => {
    const wrapper = mount(HomePage, {
      global: { plugins: [router] },
    })

    expect(wrapper.text()).toContain('ব্যবহারকারীর নাম')
    expect(wrapper.find('img[alt="User Avatar"]').exists()).toBe(true)
  })

  it('renders multiple cards', () => {
    const wrapper = mount(HomePage, {
      global: { plugins: [router] },
    })

    const cards = wrapper.findAllComponents({ name: 'IonCard' })
    expect(cards.length).toBeGreaterThanOrEqual(6)
  })

  it('displays IonIcons in quick options', () => {
    const wrapper = mount(HomePage, {
      global: { plugins: [router] },
    })

    const icons = wrapper.findAllComponents({ name: 'IonIcon' })
    expect(icons.length).toBeGreaterThan(0)
  })

  it('calls router.push when dashboard button is clicked', async () => {
    const wrapper = mount(HomePage, {
      global: { plugins: [router] },
    })

    const navButtons = wrapper.findAll('ion-button')
    await navButtons[1].trigger('click') // Button linking to /dashboard
    expect(routerPushSpy).toHaveBeenCalled()
  })

    it('renders scroll containers with correct classes and styles', () => {
    const wrapper = mount(HomePage, {
        global: { plugins: [router] },
    })

    const scrollContainers = wrapper.findAll('.scroll-section')
    expect(scrollContainers.length).toBe(2)

    scrollContainers.forEach(container => {
        expect(container.classes()).toContain('scrollbar-hidden')
        expect(container.classes()).toContain('overflow-x-auto')
    })

    const styledContainers = wrapper.findAll('[style]')
    const inlineStyle = styledContainers[0].attributes('style')
    expect(inlineStyle).toContain('margin-left: 12px')
    expect(inlineStyle).toContain('margin-right: 12px')
    })

})
