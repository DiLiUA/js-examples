var parrentContainerTree = document.querySelector('.tree');
parrentContainerTree.addEventListener('click', showOrHideSubmenu, false);

function showOrHideSubmenu(event) {
    var event = event || window.event;
    var target = event.target || event.srcElement;
    while (target != this) {
        if (target.className !== "submenu" && target.tagName !== 'span') {
            return false;
        } else {
            target.parentNode.children[1].style.display = (target.parentNode.children[1].style.display == 'block') ? 'none' : 'block';
        }
        target = target.parentNode;
    }
}