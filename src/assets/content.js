window.addEventListener("message", function (event) {
  if (event.source == window && event.origin == "https://localhost:8443") {
    if (event.data.type == "encrypt") {
      encrypt();
    } else if (event.data.type == "currentSignIn") {
      currentSignIn();
    } else if (event.data.type == "decrypt") {
      decrypt(event.data.sender);
    } else {
    }
  }
});

function decrypt(sender) {
  let arrayByte = event.data.key.substring(1);
  arrayByte = arrayByte.substring(0, arrayByte.length - 1);
  arrayByte = arrayByte.split(",")
  let publicKey = ""
  for (var i = 0; i < arrayByte.length; ++i) {
    publicKey += (String.fromCharCode(arrayByte[i]));
  }
  browser.runtime.sendMessage({
    type: 'decrypt',
    key: publicKey.replace(/^\s+|\s+$/g, ''),
    content: event.data.message.replace(/^\s+|\s+$/g, '')
  }).then((res) => {
    if (res.decryptedMessage === 'Not logged in!') {
      alert('You need to sign in to addon.')
    } else {
        window.postMessage({
          type: 'decrypted'.toString(),
          message: res.decryptedMessage,
          sender: sender
        }, "https://localhost:8443");
    }
  });
}

function encrypt() {
  let arrayByte = event.data.key.substring(1);
  arrayByte = arrayByte.substring(0, arrayByte.length - 1);
  arrayByte = arrayByte.split(",")
  let publicKey = ""
  for (var i = 0; i < arrayByte.length; ++i) {
    publicKey += (String.fromCharCode(arrayByte[i]));
  }
  browser.runtime.sendMessage({
    type: 'encrypt',
    key: publicKey,
    content: event.data.message
  }).then((res) => {
    if (res.encryptedMessage == 'Not logged in!') {
      alert('You need to sign in to addon.')
    } else {
        window.postMessage({
          type: 'encrypted'.toString(),
          encyptedMessage: res.encryptedMessage.replace(/^\s+|\s+$/g, '')
        }, "https://localhost:8443")
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