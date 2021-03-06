var socket = io();

function scrolltoBottom () {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search)
    socket.emit('join', params, function (err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        }else {
            console.log('No error')
        }
    })
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ul></ul>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html);
    scrolltoBottom();
});

socket.on('newLocationMessage', function (location) {
    var formattedTime = moment(location.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: location.url,
        from: location.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html);
    scrolltoBottom();

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My location</a>')
    // li.text(`${location.from} ${formattedTime}: `);
    // a.attr('href', location.url)
    // li.append(a);

    // jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messagetextBox = jQuery('[name=message]')
    socket.emit("createMessage", {
        text: messagetextBox.val()
    }, function () {
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