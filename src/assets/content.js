console.log('content sie laduje');
$(() => {
    console.log('jquery dziala');
    browser.runtime.sendMessage({
        type: 'decrypt',
        content: $('#wiadomosc').text()
    }).then((res) => {
        console.log(res);
        if (res !== 'notSignedIn') {
            $('#wiadomosc').text(res);
        }
    });
})