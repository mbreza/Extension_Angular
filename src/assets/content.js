//import * as $ from 'jquery';
//import $ from "jquery";
//$('#wiadomosc').text("JEBAC DISA DWA");
console.log("JEBAC DISA TRZY");
// $(function () {
//     console.log("JD");

//     chrome.storage.local.get(['loggedIn', 'currentPrivKey', 'currentPubKey'], async function (result) {

//         if (result.loggedIn == "Const") {
//             const privateKey = (await openpgp.key.readArmored(result.currentPrivKey)).keys[0]
//             await privateKey.decrypt("Aq1")

//             const options = {
//                 message: await openpgp.message.readArmored($('#wiadomosc').text()),
//                 publicKeys: (await openpgp.key.readArmored(result.currentPubKey)).keys,
//                 privateKeys: [privateKey]
//             }

//             openpgp.decrypt(options).then(plaintext => {
//                 console.log(plaintext.data)
//                 $('#wiadomosc').text(plaintext.data);
//             })
//         } else if (result.loggedIn == "Temp") {
//             chrome.runtime.sendMessage({ type: "send" }, async function (response) {
//                 var viewUser = $.parseJSON(response.currentUser);

//                 const privateKey = (await openpgp.key.readArmored(viewUser.privkey)).keys[0]
//                 await privateKey.decrypt("Aq1")

//                 const options = {
//                     message: await openpgp.message.readArmored($('#wiadomosc').text()),
//                     publicKeys: (await openpgp.key.readArmored(viewUser.publicKey)).keys,
//                     privateKeys: [privateKey]
//                 }

//                 openpgp.decrypt(options).then(plaintext => {
//                     console.log(plaintext.data)
//                     $('#wiadomosc').text(plaintext.data);
//                 })
//             });
//         }
//     })
// })// $(function () {
//     console.log("JD");

//     chrome.storage.local.get(['loggedIn', 'currentPrivKey', 'currentPubKey'], async function (result) {

//         if (result.loggedIn == "Const") {
//             const privateKey = (await openpgp.key.readArmored(result.currentPrivKey)).keys[0]
//             await privateKey.decrypt("Aq1")

//             const options = {
//                 message: await openpgp.message.readArmored($('#wiadomosc').text()),
//                 publicKeys: (await openpgp.key.readArmored(result.currentPubKey)).keys,
//                 privateKeys: [privateKey]
//             }

//             openpgp.decrypt(options).then(plaintext => {
//                 console.log(plaintext.data)
//                 $('#wiadomosc').text(plaintext.data);
//             })
//         } else if (result.loggedIn == "Temp") {
//             chrome.runtime.sendMessage({ type: "send" }, async function (response) {
//                 var viewUser = $.parseJSON(response.currentUser);

//                 const privateKey = (await openpgp.key.readArmored(viewUser.privkey)).keys[0]
//                 await privateKey.decrypt("Aq1")

//                 const options = {
//                     message: await openpgp.message.readArmored($('#wiadomosc').text()),
//                     publicKeys: (await openpgp.key.readArmored(viewUser.publicKey)).keys,
//                     privateKeys: [privateKey]
//                 }

//                 openpgp.decrypt(options).then(plaintext => {
//                     console.log(plaintext.data)
//                     $('#wiadomosc').text(plaintext.data);
//                 })
//             });
//         }
//     })
// })

// <div id="wiadomosc">-----BEGIN PGP MESSAGE-----
// Version: OpenPGP.js v4.4.10
// Comment: https://openpgpjs.org

// wcFMA0a87e8FNX61AQ//WS1xoQb4heCn7ma+s/7fE9AnVJH9m6cmcUgZLKpj
// /s3VTJG6qP6h+ivMgnJneEc9y02rHYFxu31QlMplqjwj4niPPAjDbrLX2jo4
// Pd6sYX9Pbdkp0Rsnz3T1dRgrInYIuHet0PpuN/cbL8wbEgCmUvjkSn05temw
// +jEFnzgt20Ec+i/R3rmApJGgM/lnfQN6c+MnlBGI+VUX8VqWHQiDvZ10jU3N
// 0/0WwbUlCVpcN0Zq7HVEW+Ao0hKTLkpp/nEaOilIJG6lD+st+3V9uQfFc869
// 7b5+ME1Peft4pHMgrDBiXYopMh+ZIrBSfQzweBq3NwcCz+Nn3NVLbNFvFUbx
// 1Xlj9XBWFrd4IrbTkDGOri5SoEFXis73EssyhdpxaeojYWie6ZSplBENLq0v
// ILcIgYkXjckKhEX0xX2hJPJAZWyUUTg9EnXV2ANrMKiMKR1GL3Si77UtCdYD
// 9IfCfJostmQDQA4g09fQh9/+FnFSWm4lU8KGHUWhLmR2HJmdhgefE+hD3rEA
// EY/ZKya4r0XYimVWwWYyLm3sz6A5q81dlm4+/z2sT//k43zfKsM0UwXYvDSQ
// ZxBC+Kentchm/HCPlkElAR5joBcTQJTM74ugk3gyW/QY9VF5rMm4QzYNsJ2F
// Xm69np42x+vISKpoiUXxxcF/q/VArira4XUH9tn5JKjSwasBa9/rOfJ9NR6X
// Yi5gpVJwUGvush2fduJlfvuCAVDK080CjVWUwx+W9kpvmIR4JjWpWQdxe4Qm
// TYU4jSJQIcCuCaG8AuxRdjWWSmMlUOz4UwFLXrpZmEi0iacxtjD2pOOI9W1K
// v5N0HRwrEE8H5Gq8BAq18qdJYSFGFXLLni10EV6BUjYzKNVYAs2d6f//BAWr
// eKha9EqV6ycqCOSmRUbeytJEcoRp2RZs/Py9vrMFiyq0FEVmNlu4KLzNGYSo
// ma1bgiGzazmqUn8lsUz7SF34kxfLB4vxsFpZVhN2a1NVKx78k+gxNeAvL1V0
// 3t9vJESacDYz/NfPXKXAF1JdWkdAzZt2GLclQihMIvZkbxq9gRpku3TQyN31
// 3Ud1nEkyEUPcd/VXjhfHVHLP1AL4HA7KQc1Q5OPJN0njwV2W1OWNyOKm/JWd
// cgxB/QHHoR43Uod8PlOA/Ctzz/rUBGEFh3DKjWzHGpvTt1tQNntnnwvQJkAR
// bPRazFNwfCcrRo8Xj+x6568yPkGpHhkYzmdGmoTzeD3H1cuF5CehSscNqh4s
// ItTRDRvbqZHXBuracMPe6U0X0NkhYMGxfBoRSMWlBA+RIMuIQRQ5ZDmYgZ5u
// 5065jAWdjt3UxB4+RWIHYS0EowJ1oi/Gdx6zzvWfC1JWfOUc3Tem2+sXxBQ1
// ABPlFkQlAX4YaePdlkEMJsn/e/EzTX4NoZ6g4lBZP/op2AeIRWVTs4QoFZqg
// fjZo0cf2zWoP/EmbyJcSXzoMNIEdpxxXB1chwfV3z1aNy5QCIcj//70dDOja
// SfCd3Tqx3pfWdQV21KAR8qzKMEVTYloP
// =JsnM
// -----END PGP MESSAGE-----</div>