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

function typewriter() {
    document.getElementById('scroll').scrollIntoView();
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination = document.getElementById("secret");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br /><br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
    if (iTextPos++ == iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
}

$(document).ready(function () {
    aText.push("Dear Liv,");
    aText.push("I know that life is tough right now.");
    aText.push("I know that you weren't exactly built for quarantine.");
    aText.push("But I also know that you are trying so hard to make everything okay.");
    aText.push("And I promise that soon, everything actually will be.");
    aText.push("But for now, it's okay to not have it all together.");
    aText.push("I love you so much, I see how hard you are trying, and I know that this too shal pass.");
    aText.push("-Pat");
    iArrLength = aText[0].length;
    typewriter()




});

