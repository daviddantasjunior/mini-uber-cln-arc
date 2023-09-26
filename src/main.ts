import express from 'express'
import { env } from './env'
import Ride from './ride'

const app = express()

app.use(express.json())

app.get('/hello', (req, res) => {
  res.status(200).setHeader('Content-Type', 'text/plain').end('Hello world')
})

app.post('/calculate_ride', function (req, res) {
  try {
    const ride = new Ride()
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date))
    }
    const price = ride.calculate()
    res.json({ price })
  } catch (error: any) {
    res.status(422).send(error.message)
  }
})

app.listen(env.PORT, env.HOST, () =>
  console.log(`Server running at http://${env.HOST}:${env.PORT}/`),
)
