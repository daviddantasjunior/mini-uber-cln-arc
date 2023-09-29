import FareCalculator from './fareCalculator'
import Segment from './segment'

export default class OvernightFareCalculator implements FareCalculator {
  FARE = 3.9

  calculate(segment: Segment): number {
    return segment.distance * this.FARE
  }
}
