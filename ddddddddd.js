// encrypt(AesCtrParams, key, data);
// SubtleCrypto.encrypt(AesCtrParams,CryptoKey,BufferSource,Promise)

// getMessageEncoding(), encryptMessage(key), decryptMessage(key)

(() => {
    let ciphertext;
    let counter;

    function getMessageEncoding() {
        const messageBox = document.querySelector("#aes-ctr-message");
        let message = messageBox.value;
        let enc = new TextEncoder();
        return enc.encode(message);
    }
    async function encryptMessage(key) {
        let encoded = getMessageEncoding();
        // The counter block value must never be reused with a given key.
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
        console.log("ciphertextValue:",ciphertext)
    }

    window.crypto.subtle.generateKey(
        {
            name: "AES-CTR",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    ).then((key) => {
        const encryptButton = document.querySelector(".aes-ctr .encrypt-button");
        encryptButton.addEventListener("click", () => {
            encryptMessage(key);
        });
    });

})();