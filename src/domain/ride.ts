import DistanceCalculator from './distanceCalculator'
import FareCalculatorFactory from './fareCalculatorFactory'
import Position from './position'
import Segment from './segment'

export default class Ride {
  positions: Position[]
  MIN_PRICE = 10

  constructor() {
    this.positions = []
  }

  addPosition(lat: number, long: number, date: Date) {
    this.positions.push(new Position(lat, long, date))
  }

  calculate() {
    let price = 0
    for (const [index, position] of this.positions.entries()) {
      const nextPosition = this.positions[index + 1]
      if (!nextPosition) break
      const distance = DistanceCalculator.calculate(
        position.coord,
        nextPosition.coord,
      )
      const segment = new Segment(distance, nextPosition.date)
      const fareCalculator = FareCalculatorFactory.create(segment)
      price += fareCalculator.calculate(segment)
    }
    return price < this.MIN_PRICE ? this.MIN_PRICE : price
  }
}
