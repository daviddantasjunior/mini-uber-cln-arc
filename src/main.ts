import express from 'express'
import { env } from './env'
import Ride from './ride'
import pgp from 'pg-promise'
import { v4 as uuidv4 } from 'uuid'
import { validate } from './cpfValidator'

const app = express()

app.use(express.json())

app.get('/hello', (req, res) => {
  res.status(200).setHeader('Content-Type', 'text/plain').end('Hello world')
})

app.post('/calculate_ride', function (req, res) {
  try {
    const ride = new Ride()
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date))
    }
    const price = ride.calculate()
    res.json({ price })
  } catch (error: any) {
    res.status(422).send(error.message)
  }
})

app.post('/passengers', async function (req, res) {
  try {
    const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
    const passengerId = uuidv4()
    if (!validate(req.body.document)) throw new Error('Invalid cpf')
    await connection.query(
      'insert into miniuber.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)',
      [passengerId, req.body.name, req.body.email, req.body.document],
    )
    await connection.$pool.end()
    res.json({
      passengerId,
    })
  } catch (error: any) {
    res.status(422).send(error.message)
  }
})

app.get('/passengers/:passengerId', async function (req, res) {
  const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
  const [passengerData] = await connection.query(
    'select * from miniuber.passenger where passenger_id = $1',
    [req.params.passengerId],
  )
  await connection.$pool.end()
  res.json(passengerData)
})

app.post('/drivers', async function (req, res) {
  try {
    const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
    const driverId = uuidv4()
    if (!validate(req.body.document)) throw new Error('Invalid cpf')
    await connection.query(
      'insert into miniuber.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)',
      [
        driverId,
        req.body.name,
        req.body.email,
        req.body.document,
        req.body.carPlate,
      ],
    )
    await connection.$pool.end()
    res.json({
      driverId,
    })
  } catch (error: any) {
    res.status(422).send(error.message)
  }
})

app.get('/drivers/:driverId', async function (req, res) {
  const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
  const [driverData] = await connection.query(
    'select * from miniuber.driver where driver_id = $1',
    [req.params.driverId],
  )
  await connection.$pool.end()
  res.json({
    driverId: driverData.driver_id,
    name: driverData.name,
    email: driverData.email,
    document: driverData.document,
    carPlate: driverData.car_plate,
  })
})

app.listen(env.PORT, env.HOST, () =>
  console.log(`Server running at http://${env.HOST}:${env.PORT}/`),
)
