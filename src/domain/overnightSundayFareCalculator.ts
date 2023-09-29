import FareCalculator from './fareCalculator'
import Segment from './segment'

export default class OvernightSundayFareCalculator implements FareCalculator {
  FARE = 5

  calculate(segment: Segment): number {
    return segment.distance * this.FARE
  }
}
