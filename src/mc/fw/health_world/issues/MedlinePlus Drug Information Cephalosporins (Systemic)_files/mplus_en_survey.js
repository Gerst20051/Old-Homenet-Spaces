// ******************************
// * triggerParams.js           *
// ******************************

// Customer: National Library of Medicine
// Version : DHTML Trigger 2.4
function cppUrlPatch(s) {
	var translated = "";
	var i; 
	var found = 0;
	for(i = 0; (found = s.indexOf(':', found)) != -1; ) {
		translated += s.substring(i, found) + "|";
		i = found + 1;
		found++;
	}
	translated += s.substring(i, s.length);
	return translated;
}
var triggerParms = new Array(); 
var excludeList = new Array();
triggerParms["dt"] = 0; // disable trigger if 1
triggerParms["mid"] = "p18ExFQhQFBBJk91MVxBFQ=="; // model instance id
triggerParms["cid"] = "WyHFr2m0PoaGCBUsi00QIQ=="; // customer id
triggerParms["lf"] = 3; // loyalty factor
triggerParms["sp"] = 0.1; // sample percentage
triggerParms["npc"] = 0; // no persistent cookies if 1
triggerParms["rw"] = 43200; // resample wait (value in minutes)
triggerParms["pu"] = 0; // pop-under control
triggerParms["olpu"] = 1; // On Load pop-under control
triggerParms["lfcookie"] = "ForeseeLoyalty_MID_p18ExFQhQF";
triggerParms["ascookie"] = "ForeseeSurveyShown_p18ExFQhQF";
triggerParms["width"] = 420; // survey width
triggerParms["height"] = 500; // survey height
triggerParms["domain"] = ".nih.gov"; // domain name
triggerParms["omb"] = "1505-0186"; // OMB number
//triggerParms["cmetrics"] = "90010257"; // coremetrics client id
triggerParms["cpp_1"] = "userURL:" + cppUrlPatch (window.location.href);
triggerParms["cpp_2"] = "Browser:"+ cppUrlPatch (navigator.userAgent); // customer parameter 2 - Browser
triggerParms["capturePageView"] = 1;
//excludeList[0] = "/exclude/"; //trigger script will not work under this path
//triggerParms["dcUniqueId"] = "TEST04JloZZN0k9cI1Ep5d"; //  (22 chars unique Id for double cookie I/II)
//triggerParms["midexp"] = 129600; // model instance expiry value
triggerParms["rso"]= 0; //user has chosen to use Retry Survey Option
triggerParms["aro"]= 0; //user has chosen to use Auto Retry Option, with SP=100
//triggerParms["rct"]= 1; //The maximum number of times allowed to serve a survey to a user
//triggerParms["rds"]= 1; //The minimum number of days to wait to serve a survey repeatedly
//triggerParms["mrd"]= 1; //The total number of days that a user can be re-served a survey
triggerParms["compliant508"] = 0; //508 compliant if 1
//DHTML Parameter
triggerParms["dhtml"]= 1;// disable dhtml trigger if dhtml=0
triggerParms["dhtmlWidth"] = 400; // welcome page width
triggerParms["dhtmlHeight"] = 290; // welcome page height
triggerParms["dhtmlURL"]= "/medlineplus/images/FSRInvite.html";


// ******************************
// *  stdLauncher.js            *
// ******************************


// Customer: National Library of Medicine
// Version : DHTML Trigger 2.4
var popUpURL  = "//www.foreseeresults.com/survey/display"; // base URL to the survey 
var FSRImgURL = "//www.foreseeresults.com/survey/FSRImg";
var ckAlreadyShown = triggerParms["ascookie"]; // name of the persistent/session cookie
var ckLoyaltyCount = triggerParms["lfcookie"]; // name of the loyalty count cookie
var fullURL=null;
var oldURL=null;
var fsr_browser =null;
var myPopUp=null;
var winOptions = "width= 1,height= 1,top= 4000,left= 4000,resizable=yes,scrollbars=yes";
var persistentExpires = new Date(); // persistent cookie expiration 
persistentExpires.setTime(persistentExpires.getTime() + (triggerParms["rw"]*60*1000));
function ForeCStdGetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return ForeCStdGetCookieVal (j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) {
			break;
		}
	}
	return null;
}
function fsr_IEshowWindow() {
	if(myPopUp != null && !myPopUp.closed) {return;}
	if (eval("document.all.fsr_window").filters.revealTrans.status == 0) {
		eval("document.all.fsr_window").filters.revealTrans.transition = 23 ;
		eval("document.all.fsr_window").filters.revealTrans.Apply();
		eval("document.all.fsr_window").style.visibility = 'visible';
		eval("document.all.fsr_window").filters.revealTrans.Play();
	} else {
		eval("document.all.fsr_window").style.visibility = 'visible';
	}
}
function fsr_hideWindow() {
		if (fsr_browser=="fsr_ie"){
			if (eval("document.all.fsr_window").filters.revealTrans.status == 0)  {
				eval("document.all.fsr_window").filters.revealTrans.transition = 23;
				eval("document.all.fsr_window").filters.revealTrans.Apply();
				eval("document.all.fsr_window").style.visibility = 'hidden';
				eval("document.all.fsr_window").filters.revealTrans.Play();
			} else {
				eval("document.all.fsr_window").style.visibility = 'hidden';
			}
		} else {
			document.getElementById("fsr_window").style.visibility = 'hidden';
		}
}
function fsr_showWindow() {
	if(myPopUp != null && !myPopUp.closed) {return;}
	document.getElementById("fsr_window").style.visibility = 'visible';
}
function ForeCStdSetCookie (name, value) {
	var argv = ForeCStdSetCookie.arguments;
	var argc = ForeCStdSetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape (value) +
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	((path == null) ? "" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}
function ForeCStdGetCookieVal(offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}
function specialEscape(str) {
	var translated = "";
	var i; 
	var found = 0;
	for(i = 0; (found = str.indexOf('+', found)) != -1; ) {
		translated += str.substring(i, found) + "%2B";
		i = found + 1;
		found++;
	}
	translated += str.substring(i, str.length);
	return translated;
}
function Pop(){
	myPopUp = window.open(fullURL, 'survey',winOptions);
	if (  myPopUp!=null && !myPopUp.closed) {
		if (triggerParms["pu"] == 1){
			self.focus();
		} else {
			myPopUp.focus(); 							
		}
	}
}
function checkMAC(){
	if(navigator.platform.indexOf("Win32") >= 0){
		return false;
	} else {
		return true;
	}	
}
function currentLocationExcluded() {	
	var parentURLPath = window.location.pathname;//location path
	for(key in excludeList) {
		if(parentURLPath.indexOf(excludeList[key]) != -1) {
			return true;
		}
	}
	return false;
}
var FSRImg;
var surveyProcessCont = 1;
function stdImgProc() {
	if (fsr_browser == "fsr_ie") {
		if(triggerParms["compliant508"] == 1) { fsr_IEshowWindow(); }
		else {
			fsr_IEshowWindow();
		}
	} else {
		if(triggerParms["compliant508"] == 1) { fsr_showWindow();}
		else {
			setTimeout ( "fsr_showWindow();", 2000, "JavaScript" );
		}
	}
}

function imgOnloadProc() {
	if(surveyProcessCont == 1 && FSRImg.width == 3) { stdImgProc(); }
  	return true;
}

function imgErrorProc() {
	surveyProcessCont = 0;
	return true;
}

function Poll() { 
	if(triggerParms["dt"] == 1) {
		return;
	}
	if(currentLocationExcluded()) {
		return;
	}
	var stickyCounter = ForeCStdGetCookie(ckLoyaltyCount); // check counter cookie
	var alreadyShown = ForeCStdGetCookie(ckAlreadyShown); // check if we already have shown survey
	var pageCount;
	var randNum = Math.random();
	randNum *= 100;
	if (stickyCounter == null) {
		pageCount = 1; 
		ForeCStdSetCookie(ckLoyaltyCount, pageCount, null,'/',triggerParms["domain"]);
		stickyCounter = ForeCStdGetCookie(ckLoyaltyCount);
	}
	if (stickyCounter != null) {
		pageCount = stickyCounter;
		if(pageCount >= triggerParms["lf"]) {
			if(alreadyShown == null) {
				if (triggerParms["rso"] == 1 && triggerParms["aro"] == 1) {
					triggerParms["sp"] = 100.0; // Update Ssample percentage
				}
				if(randNum <= triggerParms["sp"]) {
					var fsr_mac= checkMAC();
					fsr_browser="fsr_nn6";
					if(document.all){ 
						fsr_browser = "fsr_ie";
					}
					if(document.layers) {
						fsr_browser = "fsr_nn";
					}
					fullURL = popUpURL + "?" + "width=" + triggerParms["width"] +
					"&height=" + triggerParms["height"] +
					"&cid=" + specialEscape(escape(triggerParms["cid"])) + "&mid=" + specialEscape(escape(triggerParms["mid"]));
					if ((triggerParms["omb"] ) != null) {
						fullURL += "&omb=" + escape(triggerParms["omb"]);
					}
					if ((triggerParms["cmetrics"] ) != null) {
						fullURL += "&cmetrics=" + escape(triggerParms["cmetrics"]);
					}
					if (triggerParms["olpu"] == 1) {
						fullURL += "&olpu=1";
					}
					if ((triggerParms["dcUniqueId"]) != null) {
						fullURL += "&dcUniqueId=" + escape(triggerParms["dcUniqueId"]);
					}
					if (triggerParms["rso"] == 1) {
						fullURL += "&rso=1&rct=" + triggerParms["rct"] + "&rds=" + triggerParms["rds"] + "&mrd=" + triggerParms["mrd"] + "&rws=" + triggerParms["rw"];
					}
					if (triggerParms["capturePageView"] == 1) {
						triggerParms["cpp_3"] = "PageView:"+ pageCount; // customer parameter 3 - Page View
					}
					var dcQString = "";
					if ((triggerParms["midexp"] ) != null) {
						fullURL += "&ndc=1&fsexp=5256000&midexp=" + triggerParms["midexp"];
						dcQString = "ndc=1&midexp=" + triggerParms["midexp"] + "&mid=" + specialEscape(escape(triggerParms["mid"]));
						if(triggerParms["dcUniqueId"]!=null) { dcQString += "&dcUniqueId=" + specialEscape(escape(triggerParms["dcUniqueId"])); }
					}
					var customerParams = "";
					for(paramKey in triggerParms) {
						if(paramKey.substring(0,3) == "cpp"){
							fullURL += "&" + paramKey + "=" + escape(triggerParms[paramKey]);
						}
					}	
					oldURL=fullURL;
					fullURL+= "&cpp_4=" + escape("popupStats:window=normal browser="+fsr_browser+" mac="+ fsr_mac);
					if (triggerParms["rso"] != 1) {
						if(triggerParms["npc"] == 1) {
							ForeCStdSetCookie(ckAlreadyShown, 'true',null,'/',triggerParms["domain"]);
						} else {
							ForeCStdSetCookie(ckAlreadyShown, 'true', persistentExpires,'/',triggerParms["domain"]);
						}
					}
					myPopUp = window.open(fullURL, 'survey',winOptions);
					if (myPopUp != null && !myPopUp.closed && (triggerParms["dhtml"] == 0)) {
						if (triggerParms["pu"] == 1){
							self.focus();
						} else {
							myPopUp.focus(); //focusing on survey window								
						}
					} else {					
						if (fsr_mac==false && (fsr_browser != "fsr_nn") && (triggerParms["dhtml"] == 1)) {
							fullURL=oldURL;
							fullURL+= "&cpp_4=" + escape("popupStats:window=dhtml browser="+fsr_browser+" mac="+ fsr_mac);
							fsr_sw = screen.width;
							fsr_sh = screen.height;
							fsr_left = (fsr_sw -triggerParms["dhtmlWidth"])/2;
							fsr_top =Math.min((fsr_sh - triggerParms["dhtmlHeight"])/2,150);
							
							document.write("<div id=\"fsr_window\" style=\"position:absolute; left:" + fsr_left+"px; top:"+fsr_top
							+ "px; z-index:1; border:0; visibility:hidden; filter:revealTrans(Duration=0.5, Transition=23);\">"
							+ "<iframe id=\"cframe\" src="+"\""+ triggerParms["dhtmlURL"]+"?fullURL="+fullURL+"\" width="+triggerParms["dhtmlWidth"]+" height="+triggerParms["dhtmlHeight"]+"></iframe></div>");
														
							if(dcQString == "") { stdImgProc(); }
							else {
								FSRImg = new Image();
								FSRImg.src = null;
								FSRImg.onerror = imgErrorProc;
								FSRImg.onload = imgOnloadProc;
								FSRImg.src = FSRImgURL + "?" + dcQString;
							}
						}
					}
				}
			}
		}	
		pageCount++;
		ForeCStdSetCookie(ckLoyaltyCount, pageCount, null,'/',triggerParms["domain"]);		
	}
}

Poll();
