const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');

const $messages = document.querySelector('#messages');

// Templates
const $messageTemplate = document.querySelector('#message-template');

socket.on('message', (message) => {
    const html = Mustache.render($messageTemplate.innerHTML, {
        message
    });

    $messages.insertAdjacentHTML("beforeend", html);
})

socket.on('locationMessage', (url) => {
    console.log(url);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //disable
    $messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        //enable
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            return console.log(error);
        }

        console.log('Message Delivered');
    });
})

const $locationButton = document.querySelector('#send-location');

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported byt your browser')
    }

    $locationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        socket.emit('sendLocation', location, () => {
            $locationButton.removeAttribute('disabled');
            console.log('Location shared');
        });
    });
});