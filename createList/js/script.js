'use strict'

function createList(listData, listContainer, itemContainer) {
	// debugger;
	if (listData.length === 0) {
		return;
	}
	if (!listContainer) {
		listContainer = 'ul'
	}
	if (!itemContainer) {
		itemContainer = 'li'
	}
	var newListContainer = document.createElement(listContainer);

	document.body.appendChild(newListContainer);

	for (var i = 0; i < listData.length; i += 1) {
		var newItemContainer = document.createElement(itemContainer);

		if (listData[i] instanceof Array) {

			var childItemContainer = createList(listData[i], listContainer, itemContainer)
			newItemContainer.appendChild(childItemContainer);
		} else {
			newItemContainer.innerHTML = listData[i];
		}
		newListContainer.appendChild(newItemContainer);
	}

	return newListContainer;
}
createList(['мясо', 'рыба']);
createList(['мясо', ['яблоки', 'бананы']], 'ul');
createList(['мясо', ['яблоки', 'бананы']], 'div', 'div');
createList(['мясо', 'рыба', ['яблоки', 'бананы', ['сливы', 'абрикос', 'арбуз']],
	['хлеб'], 'макароны'
]);