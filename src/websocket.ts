import { io } from './http'

type SocketId = {
  socketId: string
}

type Username = {
  username: string
}

type Room = {
  room: string
}

type OnRoomData = Username & Room

type User = OnRoomData & SocketId

type OnMessageData = Username & Room & {
  message: string,
}

type Message = OnMessageData

const users: User[] = []

const messages: Message[] = []

io.on('connection', (socket) => {
  socket.on('room', ({room, username}: OnRoomData, callback) => {
    socket.join(room)

    const userInRoom = users.find(user => user.username === username && user.room === room)

    if(userInRoom) {
      userInRoom.socketId = socket.id
    } else {
      users.push({
        socketId: socket.id,
        room,
        username,
      })
    }

    const messagesRoom = getMessagesRoom(room)

    callback(messagesRoom)
  })

  socket.on('message', ({message: userMessage,room,username}: OnMessageData) => {
    const message: Message = {
      room,
      message: userMessage,
      username
    }

    messages.push(message)

    io.to(room).emit('message', message)
  })
})

function getMessagesRoom(room: string) {
  const messagesRoom = messages.filter(message => message.room === room)

  return messagesRoom
}