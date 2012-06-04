// MedlinePlus General Purpose JavaScript Library
//
//Purpose: Central repository for javascript functions for both the MedlinePlus Application 
//and Static Site. Functions which are exclusively used by the application belong in dynamic.js

//frame breaking script
var notGovSite = document.referrer.indexOf('.gov/') < 0;

if (top.location != self.location &&  notGovSite){
	location.replace('http://www.nlm.nih.gov/medlineplus/framing.html');
}


buttonStates=new Object;

if (document.images && imageNames)   {
	for(var button in imageNames)
	{
	
		buttonStates[button+"On"]=	new Image();
		buttonStates[button+"Off"]=	new Image();
		buttonStates[button+"On"].src=	imagePath + "/" + button + "_button2" + langExt + ".gif";
		buttonStates[button+"Off"].src=	imagePath + "/" + button + "_button1" + langExt + ".gif";

	}
		 
}

function depress(thisImg) {
			if (document.images) {
			//alert(buttonStates[(thisImg + "On")].src);
					imgOn = (buttonStates[(thisImg + "On")].src);
					document.imgForm [thisImg].src = imgOn;
			}
	}

function unpress(thisImg) {
			if (document.images) {
					imgOff = (buttonStates[(thisImg + "Off")].src);
					document.imgForm [thisImg].src = imgOff;
			}
	}



var isW3C = (document.getElementById) ? true : false;
var isAll = (document.all) ? true : false;
var isOperaMac = (navigator.userAgent.indexOf('Opera') != -1 && navigator.platform.indexOf('MacPPC') != -1 ) ? true : false;
var HSCALE=0.9; //default percentage to scale popup windows horizontally
var VSCALE=0.9; //default percentage to scale popup windows vertically

//
//function centeredPopup(url, name, noChrome, width, height)
//Description: Replacement for three previous js functions opens a named popup window
//	url - string, required, relative or full url to the html which will populate the new window
//	name - string, optional, the name of this new popup window - default="theNewWin" 
//	noChrome - boolean, optional, the newly created window will have all or no features - default="false" 
//	width - number/int, optional, the width of the desired popup - default=percentage (based on const HSCALE) of parent window width 
//	height - number/int, optional, the height of the desired popup - default=none, allow the client system to manage the height of the popup 
//Usage: 
//<a href="myurl.server.gov/mypage.html" onclick="return centeredPopup(this.href, myWindow, false, 640, 480);" target="_BLANK">Click</a>
//
function centeredPopup(url, name, noChrome, width, height)
{
	var features;
	var popupDimensions=defaultPopupDims(); //obj holds the default popuDimensions, based on Parent Window
	
	//availheight and width mostly for Opera interoperability 
	var myAvailWidth=getAvailWidth();
	var myAvailHeight=getAvailHeight();

	if( url )
	{
		//handle calls using the old Mplus popup window javascript
		if(url=="#")
		{
			url='';
		}
		
		if(!name)
		{
			name="TheNewWin";
		}

		//ensure width bounds checking, if it doesn't have a value, give it the default
		if( isNaN(width) )
		{
			width=popupDimensions.width;
		}

		if(width > myAvailWidth || width < 0)
		{
			width=parseInt(myAvailWidth * HSCALE);
		}
		
		//check whether this will be a chromeless window 
		if( noChrome == true 
		|| noChrome == "true" 
		|| noChrome == "True" 
		)
		{
			//alert("(" + noChrome + ")");
			features='toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=' + width + ',';
		}
		else
		{
			features='toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=' + width+ ',';
		}
		
		//if height wasn't defined get default
		//note: default height for IE will be 0, IE doesn't give us sufficient info
		//to calculate parent window dimensions
		if(!height)
		{
			height=popupDimensions.height;
			//alert(height);
		}

		//check the height attrib, ensure it doesn't exceed viewable real estate
		//if so, the reduce it to VSCALE set by script designer.
		if(height > myAvailHeight || height < 1)
		{
			height=parseInt(myAvailHeight * VSCALE -100)
		}
		else
		{
			//Opera 6.x Macintosh PPC requires a height value when rendering a new window (if you specify width)
			if( isOperaMac )
			{
				//alert("detected Macintosh Opera!");
				height=parseInt(myAvailHeight *VSCALE);
			}
		}
		

		features+='height='+height+',';
		features += getCenteredCoords(myAvailWidth,myAvailHeight,width,height);
		//alert("Features: " + features);
		
		popUpWin = window.open(url, name, features);

		if( window.focus && !isOperaMac)
		{
			popUpWin.focus();
		}
		return false;
	}
	return true;
}		

//workaround for Opera in MDI mode, must calc the "real" availWidth.
function getAvailWidth()
{
	var myWidth=screen.availWidth;
	
	if(self.screenX && self.screenLeft && (self.screenX != self.screenLeft) )
	{
		myWidth = myWidth - self.screenLeft + self.screenX;		
	}
	
	return myWidth;
}

function getAvailHeight()
{
	var myHeight=screen.availHeight;
	
	if(self.screenY && self.screenTop && (self.screenY != self.screenTop) )
	{
		myHeight = myHeight - (self.screenTop - self.screenY);		
	}
	//alert("myHeight: " + myHeight);
	return myHeight;
}



function getCenteredCoords(myAvailWidth, myAvailHeight, width, height)
{
	var coords="";
	var top, left;

	if(width)
	{
		left=parseInt(.5 * (myAvailWidth - width) );
		if(left < 0)
			left=0;
		coords+='left='+left+',screenX='+left;
		
		//calculate the centered position for height only if we have a value for it
		if(height)
		{
		
			top=parseInt(0.5* (myAvailHeight - height) - 50);
			if(top < 0)
				top=0;
			coords += ',top='+top+',screenY='+top;
		}

		//alert("Coordinates: " + coords);
		return coords;
	}
	return;	
}

//function defaultPopupDims()
//Description: Helper Function for centeredPopup(), called when user doesn't specify
//	a width and height for the new window.
//In: Nothing
//Out: dimensions in object form obj.width=width, obj.height=height
function defaultPopupDims()
{
	//first set an absolute fallback value, in case the object sniffing breaks due to weird
	//browsers
	var dims = new Object();
	dims.width = 580;
	dims.height = 400;

	//work out the width and height of Netscape 4.x, Mozilla, & Opera 7.x Browser 
	if( !isNaN( window.innerWidth)  && window.innerWidth > 0  ) 
	{
			//Non-IE browsers e.g. Netscape, Opera, Safari, etc.
			dims.width = parseInt(window.innerWidth * HSCALE);
			dims.height = parseInt(window.innerHeight * VSCALE);
	}
	else
	{
		if( document.documentElement && document.documentElement.offsetWidth )
		{
			//IE 6+, and any IE Compatible Browsers that supports the documentElement properties
			dims.width = parseInt(document.documentElement.offsetWidth * HSCALE);
			dims.height = parseInt(document.documentElement.offsetHeight * VSCALE);
			
		}
		else
		{
			if( document.body && document.body.offsetWidth)
			{
				//IE 4 and above compatible
				dims.width = parseInt(document.body.offsetWidth * HSCALE);
				dims.height = parseInt(document.body.offsetHeight * VSCALE);

			}
		}
	}
	return dims;
}


//these functions are deprecated, they are here to ensure nothing breaks during the transition
//after all instances have been removed in the code, they will be removed.
function openOutWin(url) 
{
	//
	if(!url)
		url='#';
	centeredPopup(url, 'TheNewWin');
	return true;
	
}

function openNewWin(windowName) 
{
    centeredPopup('#', windowName);
	return true;
}

function openNakedWin(windowName) 
{
	centeredPopup('#', windowName, true);
	return true;
}

function orLivePopup(url){
	centeredPopup(url, "orLive", true, 780, 460);
	return true;
}

//end deprecated functions

function isEmpty(inputStr) {
		for(var i=0; i<inputStr.length; i++) {
				oneChar = inputStr.charAt(i);
				if ((oneChar != ' ') && (oneChar != '\n') && (oneChar !='\t') && (oneChar != '\r'))
						return false;
		}
		return true;
}
function isNetscape() {
		if (navigator.appName == 'Netscape')
				return true;
		else
				return false;
}


function tempPop(url)
{
	var theight=parseInt(screen.availHeight * 0.65);
	var tfeature="toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=900,height="+ theight + ",left=75";
	var name="myName";	
	var popUpWin = window.open(url, name, tfeature);
}


//this is copied from a the feedback.pl cgi
function checkFeedback(myForm)
{
    //errMsg depends on the language context this form has been called in.
    var errMsg="$textLang->{errMsg}";
    if(myForm.subject.value != "" && myForm.message2.value != "")
    {
        //The user has filled out the required fields, continue submission.

        //if a state has been selected, deselect the country
        if ( myForm.state[0].selected == false )
        {
            myForm.country[0].selected = true;
        }
        //now we return true to allow the form submission
        return true;
    }
    else
    {
        //user forgot to fill in one of the required fields
        alert(errMsg);
        //cancel submit
        return false;
    }
}

image1 = new Image(); image2 = new Image(); image3 = new Image(); image4 = new Image(); image5 = new Image(); image6 = new Image(); image7 = new Image();


//cit script for opening a popup window for a videocast
function iwin(_url,_w,_h) { 
    window.open(_url,"_accordent","width="+ _w +",height="+ _h +",resizable=no,scrollbars=no,status=yes",true);
}

//use for the goLocal Box on Mplus topic pages, merely decides whether or not to open the FoLocal Url in a popup or not.

function goLocalPage(url){
	if(url)
	{
		//if the site is hosted, go there else pop open window 
		if (url.indexOf('nlm.nih.gov') > 0)
			location.href=url;
		else
			{
				openOutWin(url);
			}
	}
	return false;
}


function AddListDividers(container_id,interval) {

	if(document.getElementById) {
	
		var container = document.getElementById(container_id);
		var listitems = container.getElementsByTagName("li");
		
		var adjusteditems = new Array(listitems.length);
		
		for(var i=0; i<listitems.length;i++) {
			adjusteditems[i+1] = listitems[i];
		}
		
		for(var i=1; i<listitems.length;i++) {
			if((i % interval) == 0) {
				adjusteditems[i].className='divider';
			}
		}

	}

}


function LoopAlphaListsForDividers(prefix,interval) {

	if(document.getElementById) {
	
		var alphabet = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
		
		for(i=0;i<alphabet.length;i++) {
			var element_id = (prefix + alphabet[i]);
			var element = document.getElementById(element_id);
			
			if(element) {
				AddListDividers(element_id,interval);
			} 
		}
	}
}


  function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\s)"+searchClass+"(\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}


  // this function is needed to work around 
  // a bug in IE related to element attributes
  function hasClass(obj) {
     var result = false;
     if (obj.getAttributeNode("class") != null) {
         result = obj.getAttributeNode("class").value;
     }
     return result;
  }   

//function listSpacing()
//Purpose: given the ID of an HTML list, will loop through list items 
//	and add the the class "listSpace" every nth list element where n=frequency
//	this eliminates the need for adding the HTML directly to the page (problematic in XSLT)
//	or adding additional HTML markup
//Usage: <body onload="listSpacing('myList', 5);">
//Arguments: 
//	- String: name of the ID of the list that is to be modified
//  - Integer: frequency of the spacing (Optional)
 function listSpacing(listID, frequency) {
	var list=document.getElementById(listID).childNodes;	//list is now equal to the array of child nodes
	var listNodeCounter=1;
	if(! isDefined(frequency)){
		frequency=5;
	}
	for (var h = 0; h < list.length; h++) {
		if(list[h].nodeType ==1){							//ensure the child node is an actual element, not whitespace or text
			if(listNodeCounter % frequency == 0){
				list[h].className="listSpace";
			}
			listNodeCounter = listNodeCounter +1;
		}

	}
	return;
}

//library function to mimic the isDefined functionality of higher level languages
// returns true if variable passed is defined, false otherwise
function isDefined(testArgument){
	if(typeof testArgument == 'undefined'){
		return false;
	}
	 return true;
 }
