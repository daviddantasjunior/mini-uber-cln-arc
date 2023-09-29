import { env } from './env'
import CalculateRide from './application/usecase/calculateRide'
import CreateDriver from './application/usecase/createDriver'
import CreatePassenger from './application/usecase/createPassenger'
import GetDriver from './application/usecase/getDriver'
import GetPassenger from './application/usecase/getPassenger'
import DriverRepositoryDatabase from './infra/repository/driverRepositoryDatabase'
import PassengerRepositoryDatabase from './infra/repository/passengerRepositoryDatabase'
import PgPromiseAdapter from './infra/database/pgPromiseAdapter'
import ExpressAdapter from './infra/http/expressAdapter'
import MainController from './infra/http/mainController'
import HapiAdapter from './infra/http/hapiAdapter'
import FastifyAdapter from './infra/http/fastifyAdapter'

// main composition root
const connection = new PgPromiseAdapter()
const passengerRepository = new PassengerRepositoryDatabase(connection)
const driverRepository = new DriverRepositoryDatabase(connection)
const calculateRide = new CalculateRide()
const createPassenger = new CreatePassenger(passengerRepository)
const getPassenger = new GetPassenger(passengerRepository)
const createDriver = new CreateDriver(driverRepository)
const getDriver = new GetDriver(driverRepository)
const httpServer = new ExpressAdapter()
// const httpServer = new HapiAdapter()
// const httpServer = new FastifyAdapter()
const mainController = new MainController(
  httpServer,
  calculateRide,
  createPassenger,
  getPassenger,
  createDriver,
  getDriver,
)

httpServer.listen(env.PORT, env.HOST, () =>
  console.log(`Server running at http://${env.HOST}:${env.PORT}/`),
)
