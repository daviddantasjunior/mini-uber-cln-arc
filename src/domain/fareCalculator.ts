import Segment from './segment'

export default interface FareCalculator {
  calculate(segment: Segment): number
}
