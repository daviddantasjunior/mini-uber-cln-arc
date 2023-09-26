import express from 'express'
import { env } from './env'

const app = express()

app.use(express.json())

app.get('/hello', (req, res) => {
  res.status(200).setHeader('Content-Type', 'text/plain').end('Hello world')
})

app.listen(env.PORT, env.HOST, () =>
  console.log(`Server running at http://${env.HOST}:${env.PORT}/`),
)
