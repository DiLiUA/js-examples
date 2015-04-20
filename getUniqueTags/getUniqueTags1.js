function getUniqueTags(){
	// debugger;
	var arr = [];
	
	var elem = document.body.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i += 1){
		arr.push(elem[i].tagName)
	}
 var newArr = unique(arr);
return newArr;
}
getUniqueTags()

function unique(arr) {
  var obj = {};
 
  for(var i=0; i<arr.length; i++) {
    var str = arr[i];
    obj[str] = true; 
  }
  
  return Object.keys(obj);
}
