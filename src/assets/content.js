window.addEventListener("message", function (event) {
  if (event.source == window && event.origin == "https://83.0.171.108:8443") {
    if (event.data.type == "encrypt") {
      encrypt()
    } else if (event.data.type == "currentSignIn") {
      currentSignIn();
    } else if (event.data.type == "decrypt") {
      decrypt()
    } else {
      console.log('JESTEM W ELSE');
    }
  }
});

function decrypt(){
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
    if (res.signInType == 'notSignedIn') {
      alert('You need to sign in to addon.')
    } else {
      window.postMessage({
        type: 'decrypted'.toString(),
        message: res.decryptedMessage
      }, "https://83.0.171.108:8443")
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
  console.log(publicKey);
  browser.runtime.sendMessage({
    type: 'encrypt',
    key: publicKey,
    content: event.data.message
  }).then((res) => {
    if (res.encryptedMessage == 'Not logged in!') {
      alert('You need to sign in to addon.')
    } else {
      console.log(res.encryptedMessage);
      window.postMessage({
        type: 'encrypted'.toString(),
        encyptedMessage: res.encryptedMessage.replace(/^\s+|\s+$/g, '')
      }, "https://83.0.171.108:8443")
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
      }, "https://83.0.171.108:8443")
    }
  });
}

//event.data
// $(() =>{
//     browser.runtime.sendMessage({ type: "currentSignIn" }).then(async (res) => {
//         if(res.signInType !== 'notSignedIn'){
//             const privateKey = (await openpgp.key.readArmored(res.currentUser.privateKey)).keys[0]
//             await privateKey.decrypt(res.currentUser.password)

//             const options = {
//                 message: await openpgp.message.readArmored($('#wiadomosc').text()),
//                 publicKeys: (await openpgp.key.readArmored(res.currentUser.publicKey)).keys,
//                 privateKeys: [privateKey]
//             }

//             openpgp.decrypt(options).then(plaintext => {
//                 console.log(plaintext.data);
//                 $('#wiadomosc').text(plaintext.data);
//             })
//         }
//     });
// })