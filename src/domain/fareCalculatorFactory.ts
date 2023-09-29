import NormalFareCalculator from './normalFareCalculator'
import OvernightFareCalculator from './overnightFareCalculator'
import OvernightSundayFareCalculator from './overnightSundayFareCalculator'
import Segment from './segment'
import SundayFareCalculator from './sundayFareCalculator'

export default class FareCalculatorFactory {
  static create(segment: Segment) {
    if (segment.isOvernight() && !segment.isSunday()) {
      return new OvernightFareCalculator()
    }
    if (segment.isOvernight() && segment.isSunday()) {
      return new OvernightSundayFareCalculator()
    }
    if (!segment.isOvernight() && segment.isSunday()) {
      return new SundayFareCalculator()
    }
    if (!segment.isOvernight() && !segment.isSunday()) {
      return new NormalFareCalculator()
    }
    throw new Error('Invalid segment')
  }
}
