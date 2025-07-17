import { mount, flushPromises } from '@vue/test-utils'
import DashboardPage from '../../../src/views/DashboardPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routeList } from '../../../src/router/index.ts'
import axios from 'axios'
import { vi, describe, it, expect, beforeEach } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

const router = createRouter({
  history: createWebHistory(),
  routes: routeList,
})

describe('DashboardPage.vue', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset()
    localStorage.setItem('api_token', 'test-token')
  })

  it('renders scale cards from API', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: [
          { id: 1, name: 'Sleep', description: 'Track sleep', status: 'complete' },
          { id: 2, name: 'Mood', description: 'Track mood', status: 'incomplete' },
        ],
      },
    })

    router.push({ name: 'Dashboard', query: { profile: 'child' } })
    await router.isReady()

    const wrapper = mount(DashboardPage, {
      global: {
        plugins: [router],
      },
    })

    await flushPromises()

    const cards = wrapper.findAll('div.shadow')
    expect(cards.length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('Sleep')
    expect(wrapper.text()).toContain('Mood')
  })

  it('routes to Questions when incomplete scale card is clicked', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: [
          { id: 3, name: 'Focus', description: 'Track focus', status: 'incomplete' },
        ],
      },
    })

    router.push({ name: 'Dashboard', query: { profile: 'parent' } })
    await router.isReady()

    const wrapper = mount(DashboardPage, {
      global: {
        plugins: [router],
      },
    })

    const routerPushSpy = vi.spyOn(router, 'push')

    await flushPromises()

    const card = wrapper.find('div.shadow')
    await card.trigger('click')

    expect(routerPushSpy).toHaveBeenCalledWith({
      name: 'Questions',
      params: { id: 3 },
    })
  })
})