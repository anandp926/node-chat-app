var socket = io();

socket.on('connect', function () {
    console.log('User is connected/server')
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message)

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`)

    jQuery('#messages').append(li)
});

socket.on('newLocationMessage', function (location) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My location</a>')
    li.text(`${location.from}: `);
    a.attr('href', location.url)
    li.append(a);

    jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messagetextBox = jQuery('[name=message]')
    socket.emit("createMessage", {
        from: "User",
        text: messagetextBox.val()
    }, function () {
        console.log('done');
        messagetextBox.val('');
    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if( !navigator.geolocation ) {
        return alert('Gelocatoin not supported in your browser')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
})