// encrypt, decrypt, generateKey, importKey, exportKey, wrapKey, unwrapKey

// const { AES } = require("crypto-js");

(() => {
    // nonce는 카운터 블록이 한 메시지에서 다음 메시지로 재사용되지 않도록
    // counter는 single msg 내에서 카운터 블록이 재사용되지 않도록 해야
    let counter;
    // generateKey(algorithm, extractable, keyUsages)
    window.crypto.subtle.generateKey(
        {
            name: "AES-CTR", length: 256
        }, true, // extractable

        ["encrypt", "decrypt"] // keyUsages
    ).then((key) => {
        const submitBtn = document.querySelector("#submitBtn");
        submitBtn.addEventListener("click", () => {
            encryptMsg(key);
        });

    });

})();

function getMsgEncoding() { // Uint8Array
    const msgBox1 = document.querySelector('input[name="a1"]:checked');
    const msgBox2 = document.querySelector('input[name="a2"]:checked');
    const msgBox3 = document.querySelector('input[name="a3"]:checked');
    let msg1 = msgBox1.value;
    let msg2 = msgBox2.value;
    let msg3 = msgBox3.value;

    let enc1 = new TextEncoder();
    let enc2 = new TextEncoder();
    let enc3 = new TextEncoder();

    return enc1.encode(msg1), enc2.encode(msg2), enc3.encode(msg3);

}

// encrypt(algorithm, key, data)
async function encryptMsg(key) {
    let encoded = getMsgEncoding();
    counter = window.crypto.getRandomValues(new Uint8Array(16)),
        ciphertext1, ciphertext2, ciphertext3 = await window.crypto.subtle.encrypt(
            {
                name: "AES-CTR",
                counter,
                length: 64
            },
            key,
            encoded
        );

    document.getElementById("ciphertext1").innerText = ciphertext1.innerText;
    document.getElementById("ciphertext2").innerText = ciphertext2.innerText;
    document.getElementById("ciphertext3").innerText = ciphertext3.innerText;

    //ArrayBuffer -> Hex 형변환 
    let constArray1 = Array.from(new Uint8Array(ciphertext1));
    const Hex1 = constArray1.map((b) => b.toString(16).padStart(2, '0')).join('');

    let constArray2 = Array.from(new Uint8Array(ciphertext2));
    const Hex2 = constArray2.map((b) => b.toString(16).padStart(2, '0')).join('');

    let constArray3 = Array.from(new Uint8Array(ciphertext3));
    const Hex3 = constArray3.map((b) => b.toString(16).padStart(2, '0')).join('');
    // const Hex = constArray.map((b) => b.toString(16).padStart(2, '0'));

    // console.log(ciphertext1,ciphertext2,ciphertext3);

   document.write(Hex1);     
// return console.log(Hex1);
// return console.log(Hex2);
// return console.log(Hex3);
    
}




// // exportKey(format, key)
// async function exportCryptoKey(key) {
//     const exported = await window.crypto.subtle.exportKey("raw", key);
//     const exportedKeyBuffer = new Uint8Array(exported);

//     const exportKeyOutput = document.querySelector(".exported-key"); // class
//     exportKeyOutput.textContent = `[${exportedKeyBuffer}]`;
//     console.log(exportKeyOutput.textContent)
// }

// // decrypt(algorithm, key, data)
// function decryptMessage(key, ciphertext) {
//     return window.crypto.subtle.decrypt(
//       { name: "AES-CTR", counter, length: 64 },
//       key,
//       ciphertext,
//     );
//   }
