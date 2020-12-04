import Swiper from './libs/swiper-bundle.esm.browser.min.js';
import PasswordGenerator from './PasswordGenerator.js';
import PasswordLengthRange from './PasswordLengthRange.js';
import PasswordStrength from './PasswordStrength.js';

document.addEventListener('DOMContentLoaded', () => {
	setupPaswordAdvicesSlider();

	let passwordGenerator = new PasswordGenerator();

	// Password length input range
	const passwordLengthRange = new PasswordLengthRange(
		'.password-length__title',
		'.password-length__range',
		(passwordLength) => {
			passwordGenerator.setLength(passwordLength);
		}
	);

	//console.log(PasswordStrength.getStrength());
	const passwordInput = document.querySelector('.password-preview__input'),
		passwordStrengthTitle = document.querySelector('.password-preview__strength-title'),
		passwordCharacters = document.querySelector('.password-preview__characters'),
		passwordStrengthIndicatorFill = document.querySelector('.strength-indicator__fill');

	// Buttons
	const generatePasswordBtn = document.querySelector('.settings__generate-password-btn'),
		restoreSettingsBtn = document.querySelector('.settings__restore-settings-btn'),
		passwordCopyBtn = document.querySelector('.password-preview__copy-btn'),
		passwordVisibilityBtn = document.querySelector('.password-preview__visibility-btn');

	// Setting up buttons
	const optionBtns = document.querySelectorAll('.settings__option');

	passwordInput.addEventListener('focus', () => {
		passwordInput.parentNode.classList.add('password-preview__input-outer--active');
	});
	passwordInput.addEventListener('blur', () => {
		passwordInput.parentNode.classList.remove('password-preview__input-outer--active');
	});
	passwordInput.addEventListener('input', () => {
		updatePasswordPreview(passwordInput.value);
	});

	generatePasswordBtn.addEventListener('click', () => {
		let password = passwordGenerator.generate();
		passwordInput.value = password;
		updatePasswordPreview(password);
		//passwordStrength.updateTitleAndIndicator(passwordInput.value);
	});
	restoreSettingsBtn.addEventListener('click', restoreSettings);

	// Password copy functionnality
	passwordCopyBtn.addEventListener('click', () => {
		// selecting password
		passwordInput.select();
		passwordInput.setSelectionRange(0, 99999);

		document.execCommand('copy');

		// removing selection
		passwordInput.selectionEnd = 0;
		passwordInput.blur();
	});

	// Password visibility functionality
	passwordVisibilityBtn.addEventListener('click', () => {
		if (passwordInput.getAttribute('type') == 'text') {
			passwordVisibilityBtn.classList.add('password-preview__visibility-btn--visible');
			passwordInput.setAttribute('type', 'password');
		} else {
			passwordInput.setAttribute('type', 'text');
			passwordVisibilityBtn.classList.remove('password-preview__visibility-btn--visible');
		}
	});

	optionBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			if (isOptionSelected(btn.dataset.option)) {
				unselectOption(btn);
			} else {
				selectOption(btn);
			}

			let selectedBtnsCount = 0;
			optionBtns.forEach((optionBtn) => {
				if (isOptionSelected(optionBtn.dataset.option)) {
					selectedBtnsCount++;
				}
			});
			if (selectedBtnsCount == 0) selectOption(btn);
		});
	});

	restoreSettings();

	function isOptionSelected(optionStr) {
		return passwordGenerator.options[optionStr];
	}

	function selectOption(option) {
		option.classList.add('settings__option--selected');
		option.classList.remove('settings__option--hoverable');
		option.setAttribute('selected', '');
		setPasswordGeneratorOption(option.dataset.option, true);
	}

	function unselectOption(option) {
		option.classList.remove('settings__option--selected');
		option.classList.add('settings__option--hoverable');
		option.removeAttribute('selected', '');
		setPasswordGeneratorOption(option.dataset.option, false);
	}

	function setPasswordGeneratorOption(optionStr, value) {
		switch (optionStr) {
			case 'lowercase':
				passwordGenerator.useLowercase(value);
				break;
			case 'uppercase':
				passwordGenerator.useUppercase(value);
				break;
			case 'symbols':
				passwordGenerator.useSymbols(value);
				break;
			case 'numbers':
				passwordGenerator.useNumbers(value);
				break;
		}
	}

	function setupPaswordAdvicesSlider() {
		const swiper = new Swiper('.swiper-container', {
			loop: true,
			navigation: {
				prevEl: '.password-advices__prev-btn',
				nextEl: '.password-advices__next-btn',
			},
		});
	}

	function restoreSettings() {
		optionBtns.forEach((btn) => {
			selectOption(btn);
		});
		passwordLengthRange.setPasswordLength(16);
	}

	function updatePasswordPreview(password) {
		let strength = PasswordStrength.getStrength(password);
		let indicatorFillPercent = 0;
		switch (strength) {
			case PasswordStrength.STRENGTH.BAD:
				indicatorFillPercent = 0;
				break;
			case PasswordStrength.STRENGTH.OK:
				indicatorFillPercent = 33;
				break;
			case PasswordStrength.STRENGTH.GOOD:
				indicatorFillPercent = 66;
				break;
			case PasswordStrength.STRENGTH.EXCELLENT:
				indicatorFillPercent = 100;
				break;
		}
		passwordStrengthIndicatorFill.style.width = indicatorFillPercent + '%';
		passwordStrengthTitle.textContent = 'Password strength: ' + strength;
		passwordCharacters.textContent = 'Characters: ' + password.length;
	}
});
