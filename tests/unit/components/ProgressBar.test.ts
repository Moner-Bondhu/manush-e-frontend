import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProgressBar from '../../../src/components/ProgressBar.vue'

describe('ProgressBar.vue', () => {
  it('renders the correct number of stars based on maxStars', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        number: 3,
        maxStars: 5,
      },
    })
    const stars = wrapper.findAll('svg')
    expect(stars.length).toBe(5)
  })

  it('fills stars correctly based on number prop', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        number: 2,
        maxStars: 5,
      },
    })
    const paths = wrapper.findAll('path')
    const filled = paths.filter(path =>
      path.attributes('fill') === '#FF3D3D'
    )
    const unfilled = paths.filter(path =>
      path.attributes('fill') === 'none'
    )

    expect(filled.length).toBe(2)
    expect(unfilled.length).toBe(3)
  })

  it('defaults maxStars to 5 if not provided', () => {
    const wrapper = mount(ProgressBar, {
      props: { number: 3 },
    })
    expect(wrapper.findAll('svg').length).toBe(5)
  })
})
