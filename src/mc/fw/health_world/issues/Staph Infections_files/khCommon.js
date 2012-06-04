// KidsHealth common Javascript

// Copyright date
var KHcopyDate=2007;

function MM_openBrWindow(theURL,winName,features)
{
	window.open(theURL,winName,features);
}

// Close window in all browsers
function closeWindow() {
	window.open('','_parent','');
	window.close();
}