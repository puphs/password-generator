import Characters from './Characters.js';
import Swiper from './libs/swiper-bundle.esm.browser.min.js';
import PasswordGenerator from './PasswordGenerator.js';
import PasswordLengthRange from './PasswordLengthRange.js';
import PasswordStrength from './PasswordStrength.js';
import PasswordInput from './PasswordInput.js';
import Toast from './Toast.js';

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

	const passwordInput = new PasswordInput('.password-preview__input', (inputValue) => {
		updatePasswordPreview(inputValue);
	});

	let passwordCoppiedToast = new Toast('Password coppied to clipboard', Toast.DURATION_SHORT);

	const passwordStrengthTitle = document.querySelector('.password-preview__strength-title'),
		passwordCharacters = document.querySelector('.password-preview__characters'),
		passwordStrengthIndicatorFill = document.querySelector('.strength-indicator__fill');

	// Buttons
	const generatePasswordBtn = document.querySelector('.settings__generate-password-btn'),
		restoreSettingsBtn = document.querySelector('.settings__restore-settings-btn'),
		passwordCopyBtn = document.querySelector('.password-preview__copy-btn'),
		passwordVisibilityBtn = document.querySelector('.password-preview__visibility-btn');

	// Setting up buttons
	const optionBtns = document.querySelectorAll('.settings__option');

	document.addEventListener('keydown', (e) => {
		if (e.key == 'Enter' || e.key == ' ') {
			generatePassword();
		}
	});

	generatePasswordBtn.addEventListener('click', () => {
		generatePassword();
	});

	restoreSettingsBtn.addEventListener('click', restoreSettings);

	// Password copy functionnality
	passwordCopyBtn.addEventListener('click', () => {
		passwordInput.copyToClipboard();
		passwordCoppiedToast.show();
	});

	// Password visibility functionality
	passwordVisibilityBtn.addEventListener('click', () => {
		if (passwordInput.isVisible()) {
			passwordInput.setVisibility(false);
			passwordVisibilityBtn.classList.add('password-preview__visibility-btn--visible');
		} else {
			passwordInput.setVisibility(true);
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
	generatePassword();

	function generatePassword() {
		let password = passwordGenerator.generate();
		passwordInput.setValue(password);
		updatePasswordPreview(password);
	}

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
