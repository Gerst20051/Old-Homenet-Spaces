function google_ad_request_done(google_ads) {  
	if (google_ads.length > 0) {
		var first_ad_unit = '', second_ad_unit = '';
		for(var i = 0; i < google_ads.length; ++i) {
			if (i < 3) 
			{
				if (i == 0) first_ad_unit += '';
				first_ad_unit += '<br><a href="' + google_ads[i].url + '">' + google_ads[i].line1 + '</a><br><a style="text-decoration:none; color: #000000" href="' + google_ads[i].url + '">' + google_ads[i].line2 + ' ' + google_ads[i].line3 + '</a><br><a style="text-decoration:none; color:#008000; font-family:Verdana; font-size:10px" href="' + google_ads[i].url + '">' + google_ads[i].visible_url + '</a><br>';
				if (i == 2) first_ad_unit += '';
			}
			else 
			{
				if (i == 3) second_ad_unit += '';
				second_ad_unit += '<br><b><a style="font-weight:bold; color:blue;" href="' + google_ads[i].url + '">' + google_ads[i].line1 + '</a></b><br><a style="text-decoration:none; color: #000000" href="' + google_ads[i].url + '">' + google_ads[i].line2 + ' ' + google_ads[i].line3 + '</a><br><a style="text-decoration:none; color:#008000; font-family:Verdana; font-size:10px" href="' + google_ads[i].url + '">' + google_ads[i].visible_url + '</a><br>';
			}
			
					
		
		}
	}
	
	var googleFooter='<div align="right"><font face="arial,sans-serif" color="#008000" size="1">Ads by Google</font></div><div class="rule"></div><br>';
	document.getElementById("first_ad_unit").innerHTML += first_ad_unit + googleFooter;
	document.getElementById("second_ad_unit").innerHTML += second_ad_unit + googleFooter;
	
}


google_ad_client = "pub-3964816748264478";
google_ad_channel ="0871798195";
google_ad_output = 'js';
google_max_num_ads = '6';
google_feedback = "on";
google_ad_type  = "text";

