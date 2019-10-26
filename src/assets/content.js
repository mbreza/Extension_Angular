window.addEventListener("message", function (event) {
  if (event.source == window && event.origin == "https://localhost:8443") {
    if (event.data.type == "encrypt") {
      encrypt({sender: '', messageType: ''})
    } else if (event.data.type == "currentSignIn") {
      currentSignIn();
    } else if (event.data.type == "decrypt") {
      decrypt({sender: '', messageType: ''})
    } else if (event.data.type == "encryptStorage") {
      encrypt({sender: event.data.sender, messageType: event.data.messageType})
    } else if (event.data.type == "decryptStorage") {
      decrypt({sender: event.data.sender, messageType: event.data.messageType})
    } else {
      // console.log('JESTEM W ELSE');
    }
  }
});

function decrypt(value) {
  let arrayByte = event.data.key.substring(1);
  arrayByte = arrayByte.substring(0, arrayByte.length - 1);
  arrayByte = arrayByte.split(",")
  let publicKey = ""
  for (var i = 0; i < arrayByte.length; ++i) {
    publicKey += (String.fromCharCode(arrayByte[i]));
  }
  console.log('klucz publiczny w content.js: ' +  publicKey.replace(/^\s+|\s+$/g, ''));
  console.log('widomosc do rozszyfrowania w content.js: ' + event.data.message.replace(/^\s+|\s+$/g, ''));
  browser.runtime.sendMessage({
    type: 'decrypt',
    key: publicKey.replace(/^\s+|\s+$/g, ''),
    content: event.data.message.replace(/^\s+|\s+$/g, '')
  }).then((res) => {
    if (res.decryptedMessage === 'Not logged in!') {
      alert('You need to sign in to addon.')
    } else {
       console.log('Wiadmosc rozszyfrowana w content.js: ' + res.decryptedMessage);
      if (value.sender !== '') {
        // console.log('storage');
        // console.log(value.sender);
        window.postMessage({
          type: 'decryptedStorage'.toString(),
          message: res.decryptedMessage,
          sender: value.sender,
          messageType: value.messageType
        }, "https://localhost:8443");
      } else {
        // console.log('not storage decrypt');
        window.postMessage({
          type: 'decrypted'.toString(),
          message: res.decryptedMessage
        }, "https://localhost:8443");
      }
    }
  });
}

function encrypt(value) {
  let arrayByte = event.data.key.substring(1);
  arrayByte = arrayByte.substring(0, arrayByte.length - 1);
  arrayByte = arrayByte.split(",")
  let publicKey = ""
  for (var i = 0; i < arrayByte.length; ++i) {
    publicKey += (String.fromCharCode(arrayByte[i]));
  }
  console.log(publicKey);
  browser.runtime.sendMessage({
    type: 'encrypt',
    key: publicKey,
    content: event.data.message
  }).then((res) => {
    if (res.encryptedMessage == 'Not logged in!') {
      alert('You need to sign in to addon.')
    } else {
      // console.log(res.encryptedMessage);
      if (value.sender !== '') {
        // console.log('storage');
        // console.log(value.sender);
        window.postMessage({
          type: 'encryptedStorage'.toString(),
          encyptedMessage: res.encryptedMessage.replace(/^\s+|\s+$/g, ''),
          sender: value.sender,
          messageType: value.messageType
        }, "https://localhost:8443")
      } else {
        // console.log('not storage encrypt');
        window.postMessage({
          type: 'encrypted'.toString(),
          encyptedMessage: res.encryptedMessage.replace(/^\s+|\s+$/g, '')
        }, "https://localhost:8443")
      }
    }
  });
}

function currentSignIn() {
  browser.runtime.sendMessage({
    type: 'currentSignIn'
  }).then((res) => {
    if (res.signInType == 'notSignedIn') {
      alert('You need to sign in to addon.')
    } else {
      window.postMessage({
        type: 'currentSignedIn'.toString(),
        publicKey: res.currentUser.publicKey.replace(/^\s+|\s+$/g, ''),
        email: res.currentUser.emailaddress.replace(/^\s+|\s+$/g, '')
      }, "https://localhost:8443")
    }
  });
}