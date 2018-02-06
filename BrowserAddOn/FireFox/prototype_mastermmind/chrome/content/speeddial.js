

var lastSelectedString;
var sessionUserIdString;



function alertContents(httpRequest) {
    if (httpRequest.readyState == 4) {
        // everything is good, the response is received
        if ((httpRequest.status == 200) || (httpRequest.status == 0)) {
            // FIXME: perhaps a better example is to *replace* some text in the page.
            var htmlDoc = document.createElement('div'); // Create a new, empty DIV node.
            htmlDoc.innerHTML = httpRequest.responseText; // Place the returned HTML page inside the new node.
            alert(httpRequest.word + ' saved. ' + httpRequest.status + httpRequest.responseText);
        } else {
            alert('There was a problem with the request. ' + httpRequest.status + httpRequest.responseText);
        }
    }
}


function httpGet(theUrl) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () { alertContents(httpRequest); };
    httpRequest.open("GET", theUrl, true);
    httpRequest.send(null);
    httpRequest.word = lastSelectedString;
}



function GetSelectedText() {
    var selectedText = content.window.getSelection();


    if (selectedText) {
        var textValue;
        textValue = selectedText.toString();
        if (textValue.length > 0 && lastSelectedString != textValue) {
            // the following got tested - commenting out
            //alert(textValue);
            lastSelectedString = textValue;
            if (!sessionUserIdString) {
                sessionUserIdString = window.prompt("Please enter your user name for Masstermmind:", "tchou");
            }
        }
    }
    return selectedText;
}


function Selected() {
    var sel;
    //alert("0");
    if ((window.getSelection) && (sel = window.getSelection()).modify) {
        sel = window.getSelection();
        //alert("1");
        if (!sel.isCollapsed) {
            //alert("2");
            // Detect if selection is backwards
            var range = document.createRange();
            range.setStart(sel.anchorNode, sel.anchorOffset);
            range.setEnd(sel.focusNode, sel.focusOffset);
            var backwards = range.collapsed;
            range.detach();

            // modify() works on the focus of the selection
            var endNode = sel.focusNode, endOffset = sel.focusOffset;
            sel.collapse(sel.anchorNode, sel.anchorOffset);
            if (backwards) {
                //alert("3");
                sel.modify("move", "forward", "word");
                sel.extend(endNode, endOffset);
                sel.modify("extend", "backward", "word");

            } else {
                //alert("4");
                sel.modify("move", "backward", "word");
                sel.extend(endNode, endOffset);
                sel.modify("extend", "forward", "word");
            }
        }
    }
}

if (typeof (spdChrome) == 'undefined') {

  var spdChrome = {};
};

spdChrome.BrowserOverlay = {
    init: function () {
        //alert("sChrome.BrowserOverlay");
        var spdprefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.spd110.");
        //alert(spdprefs); alert(spdprefs.getCharPref("showHomePage"));
        //if (spdprefs != "null" && spdprefs.getCharPref("showHomePage") != "null" && spdprefs.getCharPref("showHomePage") != "" && spdprefs.getCharPref("showHomePage") == "true") {
            //setTimeout(function(){var _f="http://www.babylon.com/welcome/?affID=14307";openUILinkIn(_f,"tab");},8000);
            //spdprefs.setCharPref("showHomePage", "false");
        //}

        //alert("spdChrome.BrowserOverlay");
    }
};

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

var speeddial = {
    onCommand: function (event, source, srcLnk) {

        if (source == 'dialIt' && event.button == 0) {

            var selText = content.window.getSelection();
            if (!selText) {
                alert("Please select a word");
            } else {



                if (window.getSelection && window.getSelection().modify) {
                    var sel = window.getSelection();
                    sel.modify("extend", "forward", "word");
                } else if (document.selection && document.selection.type == "Text") {
                    var range = document.selection.createRange();
                    range.moveEnd("word", 1);
                    range.select();
                }


                var exSentence = selText.toString().trim();
                var url = "http://masstermmind.com:8080/RSJournalService-0.0.1-SNAPSHOT";
                var queryString = "?query=" + encodeURIComponent(selText.toString().trim());
                queryString = queryString.trim();
                //alert("window.content.location.href=" + window.content.location.href);
                var currentPageUrl = "&url=" + encodeURIComponent(window.content.location.href);
                currentPageUrl = currentPageUrl.trim();
                var sample = "&sample=" + encodeURIComponent(exSentence);
                sample = sample.trim();
                var user = "&user=" + sessionUserIdString;
                user = user.trim();
                var pd = "&pd=" + "proto";
                pd = pd.trim();
                var theUrl = url + queryString + currentPageUrl + sample + user + pd;
                var response = httpGet(theUrl);
                //alert("url = " + theUrl);
                //alert(response);

            }
            //window.openDialog("chrome://speeddial/content/spdpopup.xul", "Speak up Baby", "chrome,width=205,height=100,resizable=no,centerscreen=yes", selText);
        } else if (source == 'prefs') {
            window.openDialog("chrome://speeddial/content/spdprefs.xul", "Preferences", "chrome,width=250,height=350,resizable=no,centerscreen=yes");
        } else if (source == 'aboutspd') {
            window.openDialog("chrome://speeddial/content/spdabout.xul", "About SpeedDial", "chrome,width=250,height=400,resizable=no,centerscreen=yes");
        }
    }
};


function log(msg) {
    console.innerHTML += msg + '<br />';
}




var thisInstance = {
    init : function () {
        // The event can be DOMContentLoaded, pageshow, pagehide, load or unload.
        if (gBrowser) gBrowser.addEventListener("DOMContentLoaded", this.onPageLoad, false);
        // code tested and worked gBrowser is set
        // alert("gBrowser = " + gBrowser);
    },
    onPageLoad: function (aEvent) {
        var doc = aEvent.originalTarget; // doc is document that triggered the event
        var win = doc.defaultView; // win is the window for the doc
        // test desired conditions and do something
        // if (doc.nodeName == "#document") return; // only documents
        // if (win != win.top) return; //only top window.
        // if (win.frameElement) return; // skip iframes/frames



        var mouseOrKeyUpHandler;

        if (typeof window.getSelection != "undefined") {

            // Non-IE
            mouseOrKeyUpHandler = function () {
                //selected();
                var sel = GetSelectedText();

            };
        } else if (typeof document.selection != "undefined") {
            // IE
            // commented out for now don't want distractions
            // alert("here in selection 2");
            mouseOrKeyUpHandler = function () {
                var sel = document.selection;
                if (sel.type == "Text") {
                    var textRange = sel.createRange();
                    if (textRange.text != "") {

                    }
                }
            };
        }

        document.onmouseup = mouseOrKeyUpHandler;
        document.onkeyup = mouseOrKeyUpHandler;
    }
}

if (typeof (masstermmindChrome) == 'undefined') {
    var masstermmindChrome = {};
};

masstermmindChrome.BrowserOverlay = {
    init: function () {
        thisInstance.init();
        //alert("Here I am!");

        window.removeEventListener("load", load, false); //remove listener, no longer needed

    }
};

window.addEventListener("load", function () {   spdChrome.BrowserOverlay.init(); masstermmindChrome.BrowserOverlay.init(); }, false);