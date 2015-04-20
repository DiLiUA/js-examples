var largeImg = document.querySelector('#largeImg');
var containerSmalImg = document.querySelector('#thumbs');

containerSmalImg.onclick = function(event) {
	event = event || window.event;
	var target = event.target || event.srcElement;
	while (target != this) {
		if (target.tagName == "A") {
			largeImg.src = target.href;
			largeImg.alt = target.title;
			return false;
		}
		target = target.parentNode;
	}
}

var images = thumbs.getElementsByTagName('img');
for (var i = 0; i < images.length; i++) {
	var url = images[i].parentNode.href;
	var img = document.createElement('img');
	img.src = url;
}