import pgp from 'pg-promise'
import PassengerRepository from 'src/application/repository/passengerRepository'
import Passenger from 'src/domain/passenger'

export default class PassengerRepositoryDatabase
  implements PassengerRepository
{
  async save(passenger: Passenger) {
    const connection = pgp()('postgres://postgres:postgres@localhost:5432/miniuber')
    await connection.query(
      'insert into miniuber.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)',
      [
        passenger.passengerId,
        passenger.name,
        passenger.email.value,
        passenger.document.value,
      ],
    )
    await connection.$pool.end()
  }

  async get(passengerId: string): Promise<Passenger> {
    const connection = pgp()('postgres://postgres:postgres@localhost:5432/miniuber')
    const [passengerData] = await connection.query(
      'select * from miniuber.passenger where passenger_id = $1',
      [passengerId],
    )
    await connection.$pool.end()
    return new Passenger(
      passengerData.passenger_id,
      passengerData.name,
      passengerData.email,
      passengerData.document,
    )
  }
}
