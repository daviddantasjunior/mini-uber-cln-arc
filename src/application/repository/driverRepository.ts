import Driver from 'src/domain/driver'

export default interface DriverRepository {
  save(driver: Driver): Promise<void>
  get(driverId: string): Promise<Driver>
}
