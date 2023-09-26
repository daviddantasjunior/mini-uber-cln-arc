import Segment from './segment'

function isOvernight(segment: Segment) {
  return segment.date.getHours() >= 22 || segment.date.getHours() <= 6
}

function isSunday(segment: Segment) {
  return segment.date.getDay() === 0
}

function isValidDistance(segment: Segment) {
  return (
    segment.distance !== null &&
    segment.distance !== undefined &&
    typeof segment.distance === 'number' &&
    segment.distance > 0
  )
}

function isValidDate(segment: Segment) {
  return (
    segment.date != null &&
    segment.date !== undefined &&
    segment.date instanceof Date &&
    segment.date.toString() !== 'Invalid Date'
  )
}

export function calculate(segments: Segment[]) {
  let price = 0
  for (const segment of segments) {
    segment.date = new Date(segment.date)
    if (!isValidDistance(segment)) return -1
    if (!isValidDate(segment)) return -2
    if (isOvernight(segment) && !isSunday(segment)) {
      price += segment.distance * 3.9
    }
    if (isOvernight(segment) && isSunday(segment)) {
      price += segment.distance * 5
    }
    if (!isOvernight(segment) && isSunday(segment)) {
      price += segment.distance * 2.9
    }
    if (!isOvernight(segment) && !isSunday(segment)) {
      price += segment.distance * 2.1
    }
  }
  price = price < 10 ? 10 : price
  return price
}