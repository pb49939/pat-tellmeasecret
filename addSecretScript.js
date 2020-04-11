let newSecretTextToAdd = "";
var firebaseConfig = {
    apiKey: "AIzaSyCnW60Q61rA-FhQ30NtJKVq5lUCV9BTwfg",
    authDomain: "secret-a5756.firebaseapp.com",
    databaseURL: "https://secret-a5756.firebaseio.com",
    projectId: "secret-a5756",
    storageBucket: "secret-a5756.appspot.com",
    messagingSenderId: "586926212316",
    appId: "1:586926212316:web:73a916afa2c26ae8632019"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
let alreadySent = true;

$(document).ready(function () {
    getAllSecrets()
});

function getAllSecrets() {
    return new Promise((resolve, reject) => {
        var secretsRef = database.ref(`/Secrets/`);
        secretsRef.on("value", function (snapshot) {
            const secrets = snapshot.val();
            console.log(secrets);

            if (secrets && !alreadySent) {
                addSecret(newSecretTextToAdd, secrets.length);
            } else if (!alreadySent) {
                addSecret(newSecretTextToAdd, 1);
            }

            resolve(secrets);
        });
    });
}

function addSecret(secret, index) {
    alreadySent = true;
    const date = new Date();
    firebase.database().ref('Secrets/' + index).set({
        secret: secret,
        timestamp: date.toString()
    });

    const Http = new XMLHttpRequest();
    const url = 'https://pbaldwi3.api.stdlib.com/smsproject@dev/sendText/';
    Http.open("GET", url);
    Http.send();
}


function saveNewSecretClicked() {
    alreadySent = false;
    newSecretTextToAdd = $("#secretInput").val();
    console.log(newSecretTextToAdd);
    getAllSecrets();
};






