var pageHasLoaded = false;
// set up text to print, each item in array is new line
var aText = new Array(

);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength;  // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row
var selectedIndex;
var secretsLength;
var timeoutA;
var timeoutB;

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

function typewriter() {
    document.getElementById('scroll').scrollIntoView();
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination = document.getElementById("secret");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br /><br />';
    }

    if (aText[iIndex]) {
        destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
        if (iTextPos++ == iArrLength) {
            iTextPos = 0;
            iIndex++;
            if (iIndex != aText.length) {
                iArrLength = aText[iIndex].length;
                timeoutA = setTimeout("typewriter()", 500);
            }
        } else {
            timeoutB = setTimeout("typewriter()", iSpeed);
        }
    }

}

$(document).ready(function () {
    // aText.push("Dear Liv,");
    // aText.push("I know that life is tough right now.");
    // aText.push("I know that you weren't exactly built for quarantine.");
    // aText.push("But I also know that you are trying so hard to make everything okay.");
    // aText.push("And I promise that soon, everything actually will be.");
    // aText.push("But for now, it's okay to not have it all together.");
    // aText.push("I love you so much, I see how hard you are trying, and I know that this too shall pass.");
    // aText.push("-Pat");

    getAllSecrets()
});



function getAllSecrets() {
    return new Promise((resolve, reject) => {
        var secretsRef = database.ref(`/Secrets/`);
        secretsRef.on("value", function (snapshot) {
            const secrets = snapshot.val();
            console.log(secrets);
            getLatestSecret(secrets);
            if (!pageHasLoaded) {
                pageHasLoaded = true;
                secretsLength = secrets.length;
                convertSecretsArrayIndexesToLinks(secrets);
            }
            resolve(secrets);
        });
    });
}

function getLatestSecret(secrets) {
    const latestSecret = secrets[secrets.length - 1].secret;
    console.log("latest secret is " + latestSecret);
    splitStringIntoArray(latestSecret)
}

function splitStringIntoArray(string) {
    string = addStringWrapper(string);
    let secretStringArr = string.split(". ");
    for (var i = 1; i < secretStringArr.length - 2; i++) {
        if (!secretStringArr[i].includes("!") && !secretStringArr[i].includes("?")) {
            secretStringArr[i] = secretStringArr[i] + ".";
        }
    }
    console.log(secretStringArr);
    aText = secretStringArr;
    iArrLength = aText[0].length;
    typewriter()
}

function addStringWrapper(string) {
    return "Dear Liv,. " + string + " -Pat. "
}


function convertSecretsArrayIndexesToLinks(secrets) {

    let maxIndex = secrets.length - 1;
    let minIndex = secrets.length - 3;

    if (minIndex != 1) {
        renderButton("button", "secretLinksContainer", "<<", "secret-link", "allLink", "showAllLinks()");
    }

    for (let i = minIndex; i < maxIndex + 1; i++) {
        let index = i;
        if (i == secrets.length - 1) {
            renderButton("button", "secretLinksContainer", index, "secret-link active-secret-link", "secretLink" + index, "goToSecret(" + index + ")");
            selectedIndex = secrets.length - 1;
        } else {
            renderButton("button", "secretLinksContainer", index, "secret-link", "secretLink" + index, "goToSecret(" + index + ")");
        }

    }


}

function convertSecretsArrayIndexesToFullLinks(secrets) {

    for (let i = 1; i < secrets.length; i++) {
        let index = i;
        renderButton("button", "secret", index, "secret-link", "secretLink" + index, "goToSecret(" + index + ")");
    }
}

function convertSecretsArrayIndexesToSpecificLinks() {

    if (selectedIndex == 1) {
        renderButton("button", "secretLinksContainer", selectedIndex, "secret-link", "secretLink" + selectedIndex, "goToSecret(" + selectedIndex + ")");
        renderButton("button", "secretLinksContainer", (selectedIndex + 1), "secret-link", "secretLink" + (selectedIndex + 1), "goToSecret(" + (selectedIndex + 1) + ")");
        renderButton("button", "secretLinksContainer", (selectedIndex + 2), "secret-link", "secretLink" + (selectedIndex + 2), "goToSecret(" + (selectedIndex + 2) + ")");
    } else if (selectedIndex < secretsLength - 1) {
        if (selectedIndex > 2) {
            renderButton("button", "secretLinksContainer", "<<", "secret-link", "allLink", "showAllLinks()");
        }
        renderButton("button", "secretLinksContainer", (selectedIndex - 1), "secret-link", "secretLink" + (selectedIndex - 1), "goToSecret(" + (selectedIndex - 1) + ")");
        renderButton("button", "secretLinksContainer", selectedIndex, "secret-link", "secretLink" + selectedIndex, "goToSecret(" + selectedIndex + ")");
        renderButton("button", "secretLinksContainer", (selectedIndex + 1), "secret-link", "secretLink" + (selectedIndex + 1), "goToSecret(" + (selectedIndex + 1) + ")");
    } else {

        if (selectedIndex > 2) {
            renderButton("button", "secretLinksContainer", "<<", "secret-link", "allLink", "showAllLinks()");
        }
        renderButton("button", "secretLinksContainer", (selectedIndex - 2), "secret-link", "secretLink" + (selectedIndex - 2), "goToSecret(" + (selectedIndex - 2) + ")");
        renderButton("button", "secretLinksContainer", (selectedIndex - 1), "secret-link", "secretLink" + (selectedIndex - 1), "goToSecret(" + (selectedIndex - 1) + ")");
        renderButton("button", "secretLinksContainer", selectedIndex, "secret-link", "secretLink" + selectedIndex, "goToSecret(" + selectedIndex + ")");


    }

}

function showAllLinks() {
    console.log("showing all links");
    initializePage()
    pageHasLoaded = false;
    $("#secretLinksContainer").html("");
    return new Promise((resolve, reject) => {
        var secretsRef = database.ref(`/Secrets/`);
        secretsRef.on("value", function (snapshot) {
            const secrets = snapshot.val();
            console.log(secrets);
            convertSecretsArrayIndexesToFullLinks(secrets);
            resolve(secrets);
        });
    });
}



function renderButton(
    elementType,
    parentID,
    innerHTML,
    className,
    ID,
    onclick
) {
    var container = document.getElementById(parentID);
    var el = document.createElement(elementType);
    el.innerHTML = innerHTML;
    el.className += className;
    el.id = ID;
    el.setAttribute("onclick", onclick);
    container.appendChild(el);
}

function goToSecret(index) {
    initializePage();
    $("#secretLinksContainer").html("");
    console.log("fetching secret " + index)
    selectedIndex = index;



    return new Promise((resolve, reject) => {
        var secretsRef = database.ref(`/Secrets/${index}`);
        secretsRef.on("value", function (snapshot) {
            const secrets = snapshot.val();
            const secret = secrets.secret;
            console.log(secret);
            splitStringIntoArray(secret);
            convertSecretsArrayIndexesToSpecificLinks()
            $(".active-secret-link").removeClass("active-secret-link");
            $("#secretLink" + index).addClass("active-secret-link");
            //getLatestSecret(secrets);
            //convertSecretsArrayIndexesToString(secrets);
            resolve(secrets);
        });
    });

}

function initializePage() {
    aText = new Array();
    iIndex = 0; // start printing array at this posision
    iTextPos = 0; // initialise text position
    sContents = ''; // initialise contents variable
    $("#secret").text("");
    clearTimeout(timeoutA)
    clearTimeout(timeoutB)
}






