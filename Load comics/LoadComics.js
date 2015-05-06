(function() {
	'use strict';

	var nextComicURL = $('.previous-comic').prop('href');
	var comicContainer = $('#comic-container');
	var isLoadComics = false;

	function comicsPositionOnPage() {
		var scrollTopPage = $(document).scrollTop();
		var heightPage = $(window).height();
		var lastComic = comicContainer.find(':last');
		var topPositionLastComic = lastComic.offset().top;
		var lastComicHeight = lastComic.height();
		//console.log(scrollTopPage, heightPAge, topPositionLastComic, lastComicHeight);
		return scrollTopPage + heightPage > topPositionLastComic + lastComicHeight;
	}

	function isValidComisToInsert($comicsNodeToInsert) {
		return !$comicsNodeToInsert.find('a').get(0);
	}

	function pasteComics($comicNode) {
		$comicNode.css('opacity', 0);
		$comicNode.find('img').on('load', function() {
			$comicNode.animate({
				opacity: 1
			});
		});
		comicContainer.append($comicNode);
	}

	function loadComics() {
		var amountLoadComic = 0;
		isLoadComics = true;

		function uploadTheFollowingComics() {
			$.get(nextComicURL).then(function(nextcomicPage) {
				var $nextcomicPage = $(nextcomicPage);
				nextComicURL = $nextcomicPage.find('.previous-comic').prop('href');
				var $nextComicNode = $nextcomicPage.find('.row:has(#main-comic):last');
				if (isValidComisToInsert($nextComicNode)) {
					amountLoadComic += 1;
					pasteComics($nextComicNode);
				}
				if (amountLoadComic < 2) {
					uploadTheFollowingComics();
				} else {
					isLoadComics = false;
				}
			});
		}
		uploadTheFollowingComics();
	}

	$(window).on('resize', function() {
		if (!isLoadComics && comicsPositionOnPage()) {
			loadComics();
		}
	});

	$(window).on('scroll', function() {
		if (!isLoadComics && comicsPositionOnPage()) {
			loadComics();
		}
	});
}());