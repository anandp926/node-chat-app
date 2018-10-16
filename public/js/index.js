var socket = io();

socket.on('connect', function () {
    console.log('User is connected/server')

    socket.emit('createMessage', {
        from: 'anand',
        text: 'Hi! happy bdy to you'
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message)
});

