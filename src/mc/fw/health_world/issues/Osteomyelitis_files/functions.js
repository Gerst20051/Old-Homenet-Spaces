//Initialize the values for the below variables in the custom_functions.js(in the licensee specific folder) at the top of the file, if a licensee needs to call some methods in the onload method.
//On every page onload the function KH_loadFunctions() is called that calls intializemarquee() and initializeSplat() method for all the licensees.
//An eg. of how to define these variables and the funciton in the custom_functions.js file
//funcNm1 = "customFunctionName";
//funciton customFunctionName() { //do stuff here..... }

var funcNm1 = "";
var funcNm2 = "";
var funcNm3 = "";
var funcNm4 = "";
var funcNm5 = "";

function KH_loadFunctions() {
	intializemarquee();
	initializeSplat();

	if(funcNm1 != null && funcNm1.length > 0){
		eval(funcNm1 + "();");
	}
	if(funcNm2 != null && funcNm2.length > 0){
		eval(funcNm2 + "();");
	}
	if(funcNm3 != null && funcNm3.length > 0){
		eval(funcNm3 + "();");
	}
	if(funcNm4 != null && funcNm4.length > 0){
		eval(funcNm4 + "();");
	}
	if(funcNm5 != null && funcNm5.length > 0){
		eval(funcNm5 + "();");
	}
}

function initializeSplat(){
	if (typeof Tooltip != 'undefined')
		Tooltip.init();
}
