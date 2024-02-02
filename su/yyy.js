// encrypt(AesCtrParams, key, data);
// SubtleCrypto.encrypt(AesCtrParams,CryptoKey,BufferSource,Promise)
(() => {
    let counter;
    /*
    Fetch the contents of the "message" textbox, and encode it
    in a form we can use for the encrypt operation.
    */
    window.crypto.subtle.generateKey(
        {
            name: "AES-CTR",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    ).then((key) => {
        const encryptButton = document.querySelector("#submitBtn");
        encryptButton.addEventListener("click", () => {
            encryptMessage(key);
        });
    });
})();
function getMessageEncoding() {
    const messageBox = document.querySelector('input[name="a1"]:checked');
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
}
/*
Get the encoded message, encrypt it and display a representation
of the ciphertext in the "Ciphertext" element.
*/
async function encryptMessage(key) {
    let encoded = getMessageEncoding();
    counter = window.crypto.getRandomValues(new Uint8Array(16)),
        ciphertext = await window.crypto.subtle.encrypt(
            {
                name: "AES-CTR",
                counter,
                length: 64
            },
            key,
            encoded
        );
    let buffer = new Uint8Array(ciphertext, 0, 5);
    const ciphertextValue = document.querySelector(".ciphertext-value");
    console.log(ciphertext);
}