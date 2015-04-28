function game () {
	var minNumber = 0;
	var maxNumber = 50;
	var numberOfAttempts = prompt('За сколько попыток отгадаеш число?');
	var numberOfRetries = parseInt(numberOfAttempts);
	var randomNumber = Math.random() * (maxNumber - minNumber + 1) + minNumber - 0.5;
		randomNumber = Math.round(randomNumber);
	var	programAnswear = ('Я загадала число от ' + minNumber + ' до ' + maxNumber + '.\n' + 'Угадай за ' + numberOfRetries + ' попыток');
	var playerInput;
	var userInput;
	var prewiusUserInput;
	minNumber=parseInt(minNumber);
	maxNumber=parseInt(maxNumber);

	for(var i = 1; i <= numberOfRetries; i+=1){
		playerInput = prompt(programAnswear);
		userInput = parseInt(playerInput);
		if ((userInput > maxNumber) || (userInput < minNumber)){
			alert('Число должно быть в диапазоне от ' + minNumber + ' до ' + maxNumber);
			i--;
		} else if (playerInput == null){
				alert('Не хочеш играть? Слабак');
				break;
		} else if (isNaN(userInput)){
			alert('Значение должно быть числом');
			i--;
		} else if (userInput === randomNumber) {
			alert('Угадал, хитрец! Использовав всего попыток: ' + i);
				break;
		} else if (i === numberOfRetries && userInput !== randomNumber) {
			alert('Проиграл исчерпав все ' + numberOfRetries + ' попыток\n'+ 'Я загадала число ' + randomNumber);
		} else if (i === 1){
			programAnswear='Не верно, давай еще.\n' + 'Осталось попыток: ' + (numberOfRetries-i);
		} else if (Math.abs(randomNumber - userInput) < Math.abs(randomNumber - previousUserInput)){
			programAnswear = 'Теплее\n' + 'Осталось попыток: ' + (numberOfRetries-i);
		} else{
			programAnswear = 'Холоднее\n' + 'Осталось попыток: ' + (numberOfRetries-i);
		}
		previousUserInput = userInput;
	}
}

document.querySelector('button').addEventListener('click', game, false);