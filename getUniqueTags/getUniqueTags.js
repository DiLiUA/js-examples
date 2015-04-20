function getUniqueTags(){
	// debugger;
	var arr = [];
	
	var elem = document.body.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i += 1){
		if(arr.indexOf(elem[i].tagName) ==-1){
			arr.push(elem[i].tagName)
		}
	}
return arr;
}
getUniqueTags();