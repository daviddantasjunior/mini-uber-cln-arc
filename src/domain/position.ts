import Coord from './coord'

export default class Position {
  coord: Coord

  constructor(
    lat: number,
    long: number,
    readonly date: Date,
  ) {
    this.coord = new Coord(lat, long)
  }
}
