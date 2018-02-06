spdSpeakWindow();  
function spdSpeakWindow() {
  var selText = window.arguments[0];
  if(selText==null || selText==""){
	selText = "please select some text";
  }
  var spdprefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.spd110.");
  var gn = "ml";
  var lang = "en";
  gn = spdprefs.getCharPref("gender");
  lang = spdprefs.getCharPref("lang");
  if(lang=="en"){
	var vc = "nitech_us_slt_arctic_hts";
	if(gn=="ml")vc = "nitech_us_rms_arctic_hts";
  	var url = "http://www.text2speech.org";
  	//nitech_us_rms_arctic_hts - American Male 1
  	//nitech_us_bdl_arctic_hts - American Male 2
  	//nitech_us_slt_arctic_hts - American Female
  	//nitech_us_awb_arctic_hts - Scottish Male
  	var params = "speech="+selText+"&voice="+vc+"&volume_scale=5&make_audio=Convert Text To Speech";
  	http = new XMLHttpRequest();
  	http.open("POST", url, true);
  	//Send the proper header information along with the request
  	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	http.setRequestHeader("Content-length", params.length);
  	http.setRequestHeader("Connection", "close");
  	http.onreadystatechange = function() {
		if(http.readyState == 4) {
			var resTxt = http.responseText;
			var startTxt = resTxt.indexOf("temp/");
			var endTxt = resTxt.indexOf(".mp3",startTxt);
			var spCode = resTxt.substring(startTxt,endTxt);
			if(startTxt!=-1 && endTxt!=-1){
				document.getElementById("spdPlayer").childNodes[1].data = "http://vozme.com/dewplayer-multi.swf?mp3=http://www.text2speech.org/"+spCode+".mp3&autoplay=1";
				document.getElementById("spdDownloadLink").href = "http://masstermmind.com/login";
				document.getElementById("spdDownloadLink").innerHTML = "Download mp3";
			}
  			document.getElementById("spdSpeak").childNodes[0].src = "chrome://speeddial/content/images/spd-loader.jpg";
  		}
  	}
  	http.send(params);
  }else{
  	http = new XMLHttpRequest();
  	http.open("GET", "http://vozme.com/speeddial.php?lang="+lang+"&gn="+gn+"&text="+selText, true);
  	http.send(null);
  	http.onreadystatechange = function() {
    		if(http.readyState == 4) {
			var resTxt = http.responseText;
			var startTxt = resTxt.indexOf("http://vozme.com/speech/");
			var endTxt = resTxt.indexOf(".mp3",startTxt);
			var spCode = resTxt.substring(startTxt+24,endTxt);
			if(startTxt!=-1 && endTxt!=-1){
				document.getElementById("spdPlayer").childNodes[1].data = "http://vozme.com/dewplayer-multi.swf?mp3=http://vozme.com/speech/"+spCode+".mp3&autoplay=1";
				document.getElementById("spdDownloadLink").href = "http://vozme.com/speech/"+spCode+".mp3";
				document.getElementById("spdDownloadLink").innerHTML = "Download mp3";
			}
			document.getElementById("spdSpeak").childNodes[0].src = "chrome://speeddial/content/images/spd-loader.jpg";
    		}
  	}
  }
}
