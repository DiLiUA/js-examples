(function() {
	"use strict";

	function ValidationForm() {
		this.validEmail = false;
		this.validPass = false;
		this.validPhone = true;
		this.validCheckbox = false;
		

		// Variables for method validation email
		this.emailInput = {
			element: document.querySelector('#emailField'),
			container: document.querySelector('#emailField').parentNode,
			errorBlock: document.querySelector('#emailField').parentNode.querySelector('.alert-danger'),
			messages: {
				required: 'E-mail не может быть пустым. Пожалуйста введите свой e-mail',
				pattern: 'Неверно указан e-mail. Один из вариантов правильного e-mail: author@mail.com',
				unique: function(value) {
					return value + ' уже занят. Придумайте другой';
				}
			}
		};

		// Variables for method validation password
		this.passwordInput = {
			element: document.querySelector('#passwordField'),
			container: document.querySelector('#passwordField').parentNode,
			errorBlock: document.querySelector('#passwordField').parentNode.querySelector('.alert-danger'),
			messages: {
				required: 'Пароль не может быть пустым. Пожалуйста введите свой пароль',
				pattern: 'Использованы запрещенные символы (разрешенные - латинские буквы, цифры, подчеркивание, минус)',
				minlength: 'Пароль должен состоять минимум из 5 символов',
				alphaNumeric: 'Пароль должен состоять из букв и цифер'
			}
		};

		// Variables for method validation phone number
		this.phoneInput = {
			element: document.querySelector('#phoneField'),
			container: document.querySelector('#phoneField').parentNode,
			errorBlock: document.querySelector('#phoneField').parentNode.querySelector('.alert-danger'),
			messages: {
				pattern: 'Неверно указан номер телефона. Необходима запись в формате +380XXXXXXXXX, где X - номер вашего телефона'
			}
		};

		// Variables for method validation checkbox
		this.checkboxInput = {
			element: document.querySelector('#checkboxField'),
			container: document.querySelector('#checkboxField').parentNode.parentNode,
			errorBlock: document.querySelector('#checkboxField').parentNode.parentNode.querySelector('.alert-danger'),
			messages: {
				required: 'Чтобы зарегистрироватся, нужно принять наши Условия использования'
			}
		};

		// Variables for method button
		this.buttonInput = {
			element: document.querySelector('.btn'),
			container: document.querySelector('.btn').parentNode,
			errorBlock: document.querySelector('.btn').parentNode.querySelector('.alert-danger'),
			messages: {
				required: 'Заполните все поля помеченные *'
			}
		};

		this.bindEventsHandlers();
	}

	// Validation email
	ValidationForm.prototype.emailValidation = function(event) {
		var validMail = /(^[a-z0-9][\S\w]+)@([a-z]+)\.([a-z]+$)/; //pattern for e-mail
		var errorMessage;
		// Check the correctness of input e-mail
		if (!validMail.test(this.emailInput.element.value) && this.emailInput.element.value.length) {
			errorMessage = this.emailInput.messages.pattern;
		}

		if (!this.emailInput.element.value.length) {
			errorMessage = this.emailInput.messages.required;
		}

		if (errorMessage) {
			this.showErrorMessage(this.emailInput, errorMessage, 'validEmail');
		} else {
			this.hideErrorMessage(this.emailInput, 'validEmail');
		}

		this.buttonValidation();
	};



	// Checking for existing e-mail
	ValidationForm.prototype.emailServerValidation = function(event) {
		var errorMessage;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + this.emailInput.element.value, true);
		xhr.onreadystatechange = function() {
			var JSONParseResponseText;
			if (xhr.readyState === 4) {
				JSONParseResponseText = JSON.parse(xhr.responseText);
				if (!JSONParseResponseText.used) {
					this.hideErrorMessage(this.emailInput, 'validEmail');
				} else {
					errorMessage = this.emailInput.messages.unique(this.emailInput.element.value);
					console.log(errorMessage);
					this.showErrorMessage(this.emailInput, errorMessage, 'validEmail');
				}
			}
		}.bind(this);
		xhr.send();

	};

	//Method validation password
	ValidationForm.prototype.passwordValidation = function(event) {
		var errorMessage;
		var validPassword = /[^a-zA-Z0-9_\-]+/; //pattern for password
		var numbers = /\d+/; //pattern for number
		var letters = /[a-zA-z]+/; //pattern for letters
		var passwordCharacters = /[_\-]+/; // pattern for symbols

		if (!this.passwordInput.element.value.length) {
			errorMessage = this.passwordInput.messages.required;
		} else if (validPassword.test(this.passwordInput.element.value)) {
			errorMessage = this.passwordInput.messages.pattern;
		} else if (this.passwordInput.element.value.length < 5) {
			errorMessage = this.passwordInput.messages.minlength;
		} else if (!passwordCharacters.test(this.passwordInput.element.value) && (!numbers.test(this.passwordInput.element.value) || !letters.test(this.passwordInput.element.value))) {
			errorMessage = this.passwordInput.messages.alphaNumeric;
		}

		if (errorMessage) {
			this.showErrorMessage(this.passwordInput, errorMessage, 'validPass');
		} else {
			this.hideErrorMessage(this.passwordInput, 'validPass');
		}

		this.buttonValidation();
	};

	// Method validation phone number
	ValidationForm.prototype.telephoneNumberValidation = function(event) {
		var errorMessage;
		var validNumber = /^\+380\d{9}$/; // pattern for phone number
		if (!validNumber.test(this.phoneInput.element.value) && this.phoneInput.element.value.length) {
			errorMessage = this.phoneInput.messages.pattern;
			this.showErrorMessage(this.phoneInput, errorMessage, 'validPhone');
		} else {
			this.hideErrorMessage(this.phoneInput, 'validPhone');
		}
		this.buttonValidation();
	};

	//  Method validation checkbox
	ValidationForm.prototype.checkboxValidation = function(event) {
		var errorMessage;
		if (!this.checkboxInput.element.checked) {
			errorMessage = this.checkboxInput.messages.required;
			this.showErrorMessage(this.checkboxInput, errorMessage, 'validCheckbox');
		} else {
			this.hideErrorMessage(this.checkboxInput, 'validCheckbox');
		}
		this.buttonValidation();
	};

	// Checks the presence of error of received HTML element
	ValidationForm.prototype.hasError = function(element) {
		return element.className.split(' ').indexOf('has-error') !== -1;
	};

	// Method to display the error message
	ValidationForm.prototype.showErrorMessage = function(domElement, messageText, validField) {
		domElement.errorBlock.innerHTML = messageText;
		domElement.errorBlock.style.display = 'block';
		if (!this.hasError(domElement.container)) {
			this.dangerStyle(domElement.container); // adds style to block containers for input and error messages
		}
		this[validField] = false;
	};

	// Method to hide the error message
	ValidationForm.prototype.hideErrorMessage = function(domElement, validField) {
		domElement.errorBlock.style.display = 'none';
		this.deleteDangerStyle(domElement.container); // remove the style from the block-container for input and error messages
		this[validField] = true;
	};

	// Method to display the error message styles
	ValidationForm.prototype.dangerStyle = function(element) {
		element.className += ' has-error';
	};

	// Method to hide the error message styles
	ValidationForm.prototype.deleteDangerStyle = function(element) {
		element.className = element.className.replace('has-error', '').trim();
	};

	// Method for checking the correctness of filling the form fields
	ValidationForm.prototype.buttonValidation = function() {
		if (this.validEmail && this.validPass && this.validPhone && this.validCheckbox) {
			this.buttonInput.element.disabled = false;
		} else {
			this.buttonInput.element.disabled = true;
		}
	};

	// Method to display a message with the error form filling
	ValidationForm.prototype.buttonErrorShow = function() {
		var errorMessage;
		if (this.buttonInput.element.disabled) {
			errorMessage = this.buttonInput.messages.required;
			this.showErrorMessage(this.buttonInput, errorMessage);
		}
	};

	// Method to hide a message with the error form filling
	ValidationForm.prototype.buttonErrorHide = function(event) {
		var errorMessage;
		if (this.buttonInput.element.disabled) {
			errorMessage = this.buttonInput.messages.required;
			this.hideErrorMessage(this.buttonInput, errorMessage);
		}
	};

	// Bind event Handlers
	ValidationForm.prototype.bindEventsHandlers = function() {

		this.emailInput.element.addEventListener('keyup', this.emailValidation.bind(this), false);
		this.emailInput.element.addEventListener('input', this.emailValidation.bind(this), false);
		this.emailInput.element.addEventListener('blur', this.emailServerValidation.bind(this), false);

		this.passwordInput.element.addEventListener('keyup', this.passwordValidation.bind(this), false);
		this.passwordInput.element.addEventListener('input', this.passwordValidation.bind(this), false);

		this.phoneInput.element.addEventListener('keyup', this.telephoneNumberValidation.bind(this), false);
		this.phoneInput.element.addEventListener('input', this.telephoneNumberValidation.bind(this), false);

		this.checkboxInput.element.addEventListener('click', this.checkboxValidation.bind(this), false);

		this.buttonInput.container.addEventListener('mouseover', this.buttonErrorShow.bind(this), false);
		this.buttonInput.container.addEventListener('mouseout', this.buttonErrorHide.bind(this), false);
	};

	var validForm = new ValidationForm();
}());