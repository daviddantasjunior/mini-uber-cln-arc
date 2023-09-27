export default class Segment {
  constructor(
    public distance: number,
    public date: Date,
  ) {
    if (!this.isValidDistance()) throw new Error('Invalid distance')
    if (!this.isValidDate()) throw new Error('Invalid date')
  }

  isOvernight() {
    return this.date.getHours() >= 22 || this.date.getHours() <= 6
  }

  isSunday() {
    return this.date.getDay() === 0
  }

  isValidDistance() {
    return (
      this.distance && typeof this.distance === 'number' && this.distance > 0
    )
  }

  isValidDate() {
    return (
      this.date &&
      this.date instanceof Date &&
      this.date.toString() !== 'Invalid Date'
    )
  }
}
