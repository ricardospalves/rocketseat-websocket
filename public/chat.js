(function() {
  'use strict'

  const socket = io()

  const urlSearchParams = new URLSearchParams(window.location.search)
  const username = urlSearchParams.get('username')
  const room = urlSearchParams.get('room')
  const formElement = document.querySelector('form')
  const messagesElement = document.querySelector('ul')

  document.querySelector('h1').textContent = `Olá, ${username}. Você está na sala sobre ${room}`

  socket.emit('room', {
    username,
    room
  }, response => {
    const fragmentElement = document.createDocumentFragment()

    response.forEach(({room, message, username}) => {
      fragmentElement.appendChild(
        messageElement({
          room, message, username
        })
      )
    })

    messagesElement.appendChild(fragmentElement)
  })

  formElement.addEventListener('submit', event => {
    event.preventDefault()

    const textAreaElement = event.target.querySelector('textarea')
    const textAreaValue = textAreaElement.value

    textAreaElement.value = ''

    socket.emit('message', {
      message: textAreaValue,
      room,
      username
    })
  })

  socket.on('message', ({message, username}) => {
    messagesElement.appendChild(messageElement({
      message,
      username,
    }))
  })

  function messageElement({username, message}) {
    const itemElement = document.createElement('li')
    const usernameElement = document.createElement('b')
    const messageElement = document.createElement('span')
    const fragment = document.createDocumentFragment()

    usernameElement.textContent = `${username}: `
    messageElement.textContent = message
    fragment.appendChild(usernameElement)
    fragment.appendChild(messageElement)

    itemElement.append(fragment)

    return itemElement
  }
})()