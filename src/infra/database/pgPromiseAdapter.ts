import DatabaseConnection from './databaseConnection'
import pgp from 'pg-promise'

// Frameworks and Drivers
export default class PgPromiseAdapter implements DatabaseConnection {
  private connection: any

  constructor() {
    this.connection = pgp()(
      'postgres://postgres:postgres@localhost:5432/miniuber',
    )
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params)
  }

  async close(): Promise<void> {
    await this.connection.$pool.end()
  }
}
