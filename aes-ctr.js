(() => {

    let ciphertext1;
    let counter1;

    let ciphertext2;
    let counter2;

    let ciphertext3;
    let counter3;

    function getMessageEncoding1() {
        var messageBox1 = document.querySelector('input[name="a1"]:checked');
        let message = messageBox1.value;
        let enc = new TextEncoder();
        return enc.encode(message);
    }

    function getMessageEncoding2() {
        var messageBox2 = document.querySelector('input[name="a2"]:checked');
        let message2 = messageBox2.value;
        let enc = new TextEncoder();
        return enc.encode(message2);
    }

    function getMessageEncoding3() {
        var messageBox3 = document.querySelector('input[name="a3"]:checked');
        let message3 = messageBox3.value;
        let enc = new TextEncoder();
        return enc.encode(message3);
    }

    async function encryptMessage1(key) {
        let encoded1 = getMessageEncoding1();
        counter1 = window.crypto.getRandomValues(new Uint8Array(16));
        ciphertext1 = await window.crypto.subtle.encrypt(
            {
                name: "AES-CTR",
                counter: counter1, // 수정된 부분: counter1 대신 counter 사용
                length: 64
            },
            key,
            encoded1
        );
        let buffer1 = new Uint8Array(ciphertext1, 0, 5);
        console.log("ciphertext1 :", buffer1);
    }

    window.crypto.subtle.generateKey(
        {
            name: "AES-CTR",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    ).then((key) => {
        const encryptButton1 = document.querySelector(".encrypt-button1");
        encryptButton1.addEventListener("click", () => {
            encryptMessage1(key);
        });
    });

    async function encryptMessage2(key) {
        let encoded2 = getMessageEncoding2();
        counter2 = window.crypto.getRandomValues(new Uint8Array(16));
        ciphertext2 = await window.crypto.subtle.encrypt(
            {
                name: "AES-CTR",
                counter: counter2, // 수정된 부분: counter2 대신 counter 사용
                length: 64
            },
            key,
            encoded2
        );
        let buffer2 = new Uint8Array(ciphertext2, 0, 5);
        console.log("ciphertext2 :", buffer2);
    }
    window.crypto.subtle.generateKey(
        {
            name: "AES-CTR",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    ).then((key) => {
        const encryptButton2 = document.querySelector(".encrypt-button2");
        encryptButton2.addEventListener("click", () => {
            encryptMessage2(key);
        });

    });

    async function encryptMessage3(key) {
        let encoded3 = getMessageEncoding3();
        counter3 = window.crypto.getRandomValues(new Uint8Array(16));
        ciphertext3 = await window.crypto.subtle.encrypt(
            {
                name: "AES-CTR",
                counter: counter3, // 수정된 부분: counter3 대신 counter 사용
                length: 64
            },
            key,
            encoded3
        );
        let buffer3 = new Uint8Array(ciphertext3, 0, 5);
        console.log("ciphertext3 :", buffer3);
    }
    window.crypto.subtle.generateKey(
        {
            name: "AES-CTR",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    ).then((key) => {
        const encryptButton3 = document.querySelector(".encrypt-button3");
        encryptButton3.addEventListener("click", () => {
            encryptMessage3(key);
        });
    });

})();
