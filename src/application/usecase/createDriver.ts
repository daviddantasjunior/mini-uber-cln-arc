import Driver from 'src/domain/driver'
import DriverRepository from '../repository/driverRepository'

type Input = {
  name: string
  email: string
  document: string
  carPlate: string
}

type Output = {
  driverId: string
}

export default class CreateDriver {
  constructor(readonly driverRepository: DriverRepository) {}

  async execute(input: Input): Promise<Output> {
    const driver = Driver.create(
      input.name,
      input.email,
      input.document,
      input.carPlate,
    )
    await this.driverRepository.save(driver)
    return {
      driverId: driver.driverId,
    }
  }
}
