import Cpf from './cpf'
import Email from './email'
import UUIDGenerator from './uuidGenerator'

export default class Passenger {
  document: Cpf
  email: Email

  constructor(
    readonly passengerId: string,
    readonly name: string,
    email: string,
    document: string,
  ) {
    this.document = new Cpf(document)
    this.email = new Email(email)
  }

  static create(name: string, email: string, document: string) {
    const passengerId = UUIDGenerator.create()
    return new Passenger(passengerId, name, email, document)
  }
}
