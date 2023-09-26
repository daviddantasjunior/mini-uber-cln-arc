import axios from 'axios'
import { expect, test } from 'vitest'

axios.defaults.validateStatus = function () {
  return true
}

test('Deve fazer o cálculo do preço de uma corrida durante o dia', async function () {
  const input = {
    segments: [{ distance: 10, date: '2021-03-01T10:00:00' }],
  }
  const response = await axios.post(
    'http://localhost:3333/calculate_ride',
    input,
  )
  const output = response.data
  expect(output.price).toBe(21)
})

test('Se a distância for inválida deve lançar um erro', async function () {
  const input = {
    segments: [{ distance: -10, date: '2021-03-01T10:00:00' }],
  }
  const response = await axios.post(
    'http://localhost:3333/calculate_ride',
    input,
  )
  expect(response.status).toBe(422)
  const output = response.data
  expect(output).toBe('Invalid distance')
})
