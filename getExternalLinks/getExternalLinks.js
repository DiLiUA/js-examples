function getExternalLinks(){
	var hostPage = window.location.hostname;
	var resArr = [];
	var links = document.getElementsByTagName('a');
	for (var i = 0; i<links.length; i += 1){
		if (links[i].hostname !== hostPage && resArr.indexOf(links[i].hostname) ==-1){
			resArr.push(links[i].hostname);
		}
	}
	return resArr;
}
getExternalLinks();