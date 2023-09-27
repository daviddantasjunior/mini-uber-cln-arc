import CarPlate from '@/domain/carPlate'
import { expect, test } from 'vitest'

test('Deve testar uma placa válida', function () {
  const carPlate = new CarPlate('AAA9999')
  expect(carPlate).toBeDefined()
})

test('Não deve testar uma placa inválida', function () {
  expect(() => new CarPlate('AAA999')).toThrow(new Error('Invalid car plate'))
})