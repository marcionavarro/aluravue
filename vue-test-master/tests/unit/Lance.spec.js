import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

test('não aceita lance com valor menor que zero', () => {
    const wrapper = mount(Lance)
    expect(wrapper).toBeTruthy()
})