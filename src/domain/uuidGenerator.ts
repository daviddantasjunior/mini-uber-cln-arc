import { v4 as uuidV4 } from 'uuid'

export default class UUIDGenerator {
  static create() {
    return uuidV4()
  }
}
