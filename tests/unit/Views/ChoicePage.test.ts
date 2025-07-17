import { mount, flushPromises } from '@vue/test-utils'
import ChoicePage from '../../../src/views/ChoicePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routeList } from '../../../src/router/index.ts'
import axios from 'axios'
import { expect, describe, vi, beforeEach, it } from 'vitest'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: routeList,
})

describe('ChoicePage.vue', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset()
    localStorage.setItem('api_token', 'test-token')
  })

  it('calls router.push with child profile', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          profiles: [
            { type: 'child', full_name: 'Child Name', relation_type: '', id: 1, demography: {} as any },
            { type: 'parent', full_name: 'Parent Name', relation_type: '', id: 2, demography: {} as any }
          ]
        }
      }
    });

    const routerPush = vi.spyOn(router, 'push');

    router.push('/');
    await router.isReady();

    const wrapper = mount(ChoicePage, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    await buttons[0].trigger('click'); // child
    expect(routerPush).toHaveBeenCalledWith({ name: 'Dashboard', query: { profile: 'child' } });
  });

  it('calls router.push with parent profile', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          profiles: [
            { type: 'child', full_name: 'Child Name', relation_type: '', id: 1, demography: {} as any },
            { type: 'parent', full_name: 'Parent Name', relation_type: '', id: 2, demography: {} as any }
          ]
        }
      }
    });

    const routerPush = vi.spyOn(router, 'push');

    router.push('/');
    await router.isReady();

    const wrapper = mount(ChoicePage, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    await buttons[1].trigger('click'); // parent
    expect(routerPush).toHaveBeenCalledWith({ name: 'Dashboard', query: { profile: 'parent' } });
  });
});
