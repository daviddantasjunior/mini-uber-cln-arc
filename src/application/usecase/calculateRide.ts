import Ride from '@/domain/ride'

type Input = {
  segments: { distance: number; date: Date }[]
}

type Output = {
  price: number
}

export default class CalculateRide {
  async execute(input: Input): Promise<Output> {
    const ride = new Ride()
    for (const segment of input.segments) {
      ride.addSegment(segment.distance, new Date(segment.date))
    }
    const price = ride.calculate()
    return {
      price,
    }
  }
}
