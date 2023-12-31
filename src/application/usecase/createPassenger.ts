import Passenger from 'src/domain/passenger'
import PassengerRepository from '../repository/passengerRepository'

type Input = {
  name: string
  email: string
  document: string
}

type Output = {
  passengerId: string
}

export default class CreatePassenger {
  constructor(readonly passengerRepository: PassengerRepository) {}

  async execute(input: Input): Promise<Output> {
    const passenger = Passenger.create(input.name, input.email, input.document)
    await this.passengerRepository.save(passenger)
    return {
      passengerId: passenger.passengerId,
    }
  }
}
