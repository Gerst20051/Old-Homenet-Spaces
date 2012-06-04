var xList = new Array(0, 728, 468, 160, 120, 120, 336, 300, 250, 120, 160, 203, 200, 150, 160, 160, 120, 100, 300);
var yList = new Array(0,  90,  60, 600, 600, 240, 280, 250, 250,  60,  30, 249, 150,  45,  25,  31, 601, 100,  60);
var AdCounter = 0;
adid = '';
random   = Math.floor(Math.random()*1000000000);

/*
// use for debugging in firefox using firebug
function printfire()
{
    if (document.createEvent)
    {
        printfire.args = arguments;
        var ev = document.createEvent("Events");
        ev.initEvent("printfire", false, true);
        dispatchEvent(ev);
    }
}
*/

function DISPLAY_AD(instance, sizeIndex, position)
{
	// Uncomment this line to debug line by line.
	// debugger;
	adTag 		 = '';
	site       = AD_SITE;
	zone       = 'generalhealth';
	topic    	 = 'none';	
	horizontal = 'none';	
	width      = 0;
	height     = 0;

	// Check that the user has passed in a valid size key.
	if (sizeIndex <= 18)
	{
		width  = xList[sizeIndex];
		height = yList[sizeIndex];
	}

	// Map the ad categories to zone, topic, and horizontal here.
	if (this.AD_CATEGORIES && AD_CATEGORIES.length > 0)
	{
		if (AD_CATEGORIES[0].length > 0)
			zone = AD_CATEGORIES[0];	
			
		if (AD_CATEGORIES.length > 1)
		{
			if (AD_CATEGORIES[1].length > 0)
				topic = AD_CATEGORIES[1];
		
			if (AD_CATEGORIES.length > 2)
			{
				if (AD_CATEGORIES[2].length > 0)
					horizontal = AD_CATEGORIES[2];
			}
		}		
	}
	
	// Make sure the horizontal value is only stored in the horizontal var.
	if (isHorizontal(topic))
	{
		temp = horizontal;
		horizontal = topic;
		topic = temp;
	}
	
	// Perform SCC operations
	if (this.SCC_ZONE && SCC_ZONE.length > 0)
	{
		zone = SCC_ZONE;
	}

	// Build the ad tag here.
	// Check for special offers here. ALL prior logic must be complete.
	if (sizeIndex == 15)
	{
		numSpecialOffers = 3;
		for (i = 0; i < numSpecialOffers; i++)
		{
			adTag = adTag + getAdTag(instance, (i+1), site, zone, topic, horizontal, width, height);
			instance++;
		}
		// Set AdCounter to be 1 less than where we finished (we added one too many).
		AdCounter = instance - 1;
	}
	else
	{
		adTag = getAdTag(instance, position, site, zone, topic, horizontal, width, height);
	}

	// printfire(adTag);	
	// Write the ad tag to the page.
	document.write(adTag);
}

function isHorizontal(category)
{
	result =  
	     (category == 'caregiver'
		 || category == 'childrenshealth'
		 || category == 'infanthealth'
		 || category == 'menshealth'
		 || category == 'seniorhealth'
		 || category == 'teenhealth'
		 || category == 'womenshealth');
		
	return result;
}

function IncrementCounter()
{
    AdCounter ++;
    return AdCounter;
}

function getAdTag(instance, position, site, zone, topic, horizontal, width, height)
{
	// Build the ad tag here.
	adTag    = '';
	if (location.href.toLowerCase().indexOf("https://") == 0)
		adTag = adTag + '<script language="javascript" src="https://ad.doubleclick.net/adj/';
	else
		adTag = adTag + '<script language="javascript" src="http://ad.doubleclick.net/adj/';	
	adTag = adTag + site + '/' + zone + ';';
	adTag = adTag + 't=' + topic + ';';
	adTag = adTag + 'h=' + horizontal + ';';
	
	if (this.SCC_NAME && SCC_NAME.length > 0)
	{
		adTag = adTag + 's=' + SCC_NAME + ';';
	}
	
	if (this.AD_CONTENT && AD_CONTENT.length > 0)
	{
		adTag = adTag + 'c=' + AD_CONTENT + ';';
	}
	
	// Check the content type here
	if (this.THCN_CONTENT_TYPE)
	{
		THCN_CONTENT_TYPE = THCN_CONTENT_TYPE.toLowerCase();
		if (THCN_CONTENT_TYPE.indexOf('video') > -1 || THCN_CONTENT_TYPE.indexOf('animation') > -1)
			adTag = adTag + 'v=' + zone + ';';
	}
	
	// Check for position here.
	if (position && position > 0)
	{
		adTag = adTag + 'pos=' + position + ';';
	}
	
	// Check for exclusion here.
	if (this.EXCLUSION_CAT && EXCLUSION_CAT.length > 0)
	{
		adTag = adTag + '!category=' + EXCLUSION_CAT + ';';
	}
	
	// Check for target audience here.
	if (this.TARGET_AUD && TARGET_AUD.length > 0)
	{
		adTag = adTag + 'ta=' + TARGET_AUD + ';';
	}

	// Check for interstitials here.  add them once per page, by checking
	// if the tile=1.  This may cause multiple interstitials if there are >1
	// tile=1 calls to doubleclick.
	if (instance == 1)
	{
		adTag = adTag + 'dcopt=ist;';
	}

	// Check for search terms here.
	if (this.SEARCH_TERM && SEARCH_TERM.length > 0)
	{
		adTag = adTag + 'kw=' + encodeURI(SEARCH_TERM) + ';';
	}
	
	// Check for keyvals here.
	if (this.KEYVALS_HL && KEYVALS_HL.length > 0) {
		for (var i = 0; i < KEYVALS_HL.length; i++) {
			adTag = adTag + 'hl' + (i+1) + '=' + KEYVALS_HL[i] + ';'; } }

	// Check for foodfit tags here.			
	if (this.KEYVALS_FF && KEYVALS_FF.length > 0)
	{
		// ingredient1
		adTag = adTag + 'in1' + KEYVALS_FF[0] + ';';
		if (AD_CATEGORIES.length > 1)
		{
			//ingredient2
			adTag = adTag + 'in2' + KEYVALS_FF[1] + ';';
			if (AD_CATEGORIES.length > 2)
			{
				//meal
				adTag = adTag + 'm' + KEYVALS_FF[2] + ';';
				if (AD_CATEGORIES.length > 3)
					adTag = adTag + 'se' + KEYVALS_FF[3] + ';';		// season
			}
		}
	}			

	// Finish the ad tag.
	adTag = adTag + 'comp=' + adid + ';';
	adTag = adTag + 'tile=' + instance + ';';
	adTag = adTag + 'sz='   + width + 'x' + height + ';';
	adTag = adTag + 'ord='  + random + '?"></script>';
	
	return adTag;
}

function CM_SET_CATEGORY_TRACKING(prod){
zone = 'generalhealth'; topic = 'none';horizontal = 'none';
if (this.AD_CATEGORIES && AD_CATEGORIES.length > 0){if (AD_CATEGORIES[0].length > 0)zone = AD_CATEGORIES[0]; if (AD_CATEGORIES.length > 1){if (AD_CATEGORIES[1].length > 0)topic = AD_CATEGORIES[1];if (AD_CATEGORIES.length > 2){if (AD_CATEGORIES[2].length > 0)horizontal = AD_CATEGORIES[2];}}}
if (isHorizontal(topic)){temp = horizontal;horizontal = topic;topic = temp;}
if (this.SCC_ZONE && SCC_ZONE.length > 0){zone = SCC_ZONE;}
if(prod){thcn.prop7=zone;thcn.prop8=topic;thcn.prop9=horizontal;}else{s.prop7=zone;s.prop8=topic;s.prop9=horizontal;}
}
