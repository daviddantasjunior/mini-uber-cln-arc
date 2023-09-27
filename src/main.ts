import express from 'express'
import { env } from './env'
import CalculateRide from './application/usecase/calculateRide'
import CreateDriver from './application/usecase/createDriver'
import CreatePassenger from './application/usecase/createPassenger'
import GetDriver from './application/usecase/getDriver'
import GetPassenger from './application/usecase/getPassenger'
import DriverRepositoryDatabase from './infra/repository/driverRepositoryDatabase'
import PassengerRepositoryDatabase from './infra/repository/passengerRepositoryDatabase'

const app = express()

app.use(express.json())

app.get('/hello', (req, res) => {
  res.status(200).setHeader('Content-Type', 'text/plain').end('Hello world')
})

app.post('/calculate_ride', async function (req, res) {
  try {
    const usecase = new CalculateRide()
    const output = await usecase.execute(req.body)
    res.json(output)
  } catch (e: any) {
    res.status(422).send(e.message)
  }
})

app.post('/passengers', async function (req, res) {
  try {
    const usecase = new CreatePassenger(new PassengerRepositoryDatabase())
    const output = await usecase.execute(req.body)
    res.json(output)
  } catch (e: any) {
    res.status(422).send(e.message)
  }
})

app.get('/passengers/:passengerId', async function (req, res) {
  const usecase = new GetPassenger(new PassengerRepositoryDatabase())
  const output = await usecase.execute({ passengerId: req.params.passengerId })
  res.json(output)
})

app.post('/drivers', async function (req, res) {
  try {
    const usecase = new CreateDriver(new DriverRepositoryDatabase())
    const output = await usecase.execute(req.body)
    res.json(output)
  } catch (e: any) {
    res.status(422).send(e.message)
  }
})

app.get('/drivers/:driverId', async function (req, res) {
  const usecase = new GetDriver(new DriverRepositoryDatabase())
  const output = await usecase.execute({ driverId: req.params.driverId })
  res.json(output)
})

app.listen(env.PORT, env.HOST, () =>
  console.log(`Server running at http://${env.HOST}:${env.PORT}/`),
)
