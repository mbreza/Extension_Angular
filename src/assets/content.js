$(() =>{
    browser.runtime.sendMessage({ type: "currentSignIn" }).then(async (res) => {
        if(res.signInType !== 'notSignedIn'){
            const privateKey = (await openpgp.key.readArmored(res.currentUser.privateKey)).keys[0]
            await privateKey.decrypt(res.currentUser.password)

            const options = {
                message: await openpgp.message.readArmored($('#wiadomosc').text()),
                publicKeys: (await openpgp.key.readArmored(res.currentUser.publicKey)).keys,
                privateKeys: [privateKey]
            }

            openpgp.decrypt(options).then(plaintext => {
                console.log(plaintext.data);
                $('#wiadomosc').text(plaintext.data);
            })
        }
    });
})