import { createServer } from 'node:http'
import { join } from 'node:path'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(join(__dirname, '..', 'public')))

export {
  httpServer,
  io
}