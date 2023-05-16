import { httpServer } from './http'
import "./websocket"

const PORT = 3000

httpServer.listen(PORT, () => {
  console.log(`🚀 server running on port http://localhost:${PORT}`)
})