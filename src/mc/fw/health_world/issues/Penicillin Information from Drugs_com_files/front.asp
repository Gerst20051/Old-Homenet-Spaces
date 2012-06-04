var itxturl='http://drugscom.us.intellitxt.com/v3/door.jsp?ts='+(new Date()).getTime()+'&IPID=693&MK=5&refurl='+document.location.href.replace(/\&/g,'%26').replace(/\'/g, '%27').replace(/\"/g, '%22');
try {
document.write('<s'+'cript language="javascript" src="'+itxturl+'"></s'+'cript>');
}catch(e){}
