var parrenContainer = document.querySelector('#messages-container');
parrenContainer.addEventListener('click', removeblock, false);

function removeblock(event) {
	var event = event || window.event;
	var target = event.target || event.srcElement;
	if (target.className == 'remove-button') {
		target.parentNode.style.display = 'none';
	}
}