import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('Um lance sem valor minimo', () => {
    test('não aceita lance com valor menor que zero', () => {
        const wrapper = mount(Lance)
        const input = wrapper.find('input')
        input.setValue(-100)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toBeUndefined()
    })

    test('emite um lance quando um valor é maior que zero', () => {
        const wrapper = mount(Lance)
        const input = wrapper.find('input')
        input.setValue(100)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toHaveLength(1)
    })

    test('emit o valor esperado de um lance válido', () => {
        const wrapper = mount(Lance)
        const input = wrapper.find('input')
        input.setValue(100)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        // [
        //     [100]
        // ]
        const lance = parseInt(lancesEmitidos[0][0])
        expect(lance).toBe(100)
    })
})

describe('um lance com valor minimo', () => {
    test('todos os lances devem possuir um valor maior do que o minio informado', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wrapper.find('input')
        input.setValue(400)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toHaveLength(1)
    })
    test('emite o valor esperado de um lance valido', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wrapper.find('input')
        input.setValue(400)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        // [ [400] ]
        const valorDoLance = parseInt(lancesEmitidos[0][0])
        expect(valorDoLance).toBe(400)
    })
    test('não são aceitos lances com valores menores do que o minimo informado', async () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wrapper.find('input')
        input.setValue(100)
        wrapper.trigger('submit')
        await wrapper.vm.$nextTick() // Aguardar o dom ser atualizado
        const msgErro = wrapper.find('p.alert').element.textContent
        const msgEsperada = 'O valor mínimo para o lance é de R$ 300'
        expect(msgErro).toContain(msgEsperada)
    })
})