import Swiper from './libs/swiper-bundle.esm.browser.min.js';
import PasswordGenerator from './PasswordGenerator.js';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 48;

window.onload = () => {
	setupPaswordAdvicesSlider();
	let passwordGenerator = new PasswordGenerator();

	const passwordInput = document.querySelector('.password-preview__input'),
		passwordStrengthTitle = document.querySelector('.password-preview__strength-title'),
		passwordStrengthIndicator = document.querySelector('.password-preview__strength-indicator');

	// Buttons
	const generatePasswordBtn = document.querySelector('.settings__generate-password-btn'),
		restoreSettingsBtn = document.querySelector('.settings__restore-settings-btn'),
		passwordCopyBtn = document.querySelector('.password-preview__copy-btn'),
		passwordVisibilityBtn = document.querySelector('.password-preview__visibility-btn');

	const passwordLengthRange = document.querySelector('.password-length__range');

	generatePasswordBtn.addEventListener('click', () => {
		passwordInput.value = passwordGenerator.generate();
	});

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

	passwordLengthRange.addEventListener('input', (e) => {
		let passwordLength = Math.floor(
			((passwordLengthRange.value - passwordLengthRange.min) /
				(passwordLengthRange.max - passwordLengthRange.min)) *
				(MAX_PASSWORD_LENGTH - MIN_PASSWORD_LENGTH) +
				MIN_PASSWORD_LENGTH
		);
		console.log(passwordLength);
	});
	// public static float Remap (this float value, float from1, float to1, float from2, float to2) {
	// 	return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
	// }
};

function setupPaswordAdvicesSlider() {
	let swiper = new Swiper('.swiper-container', {
		loop: true,
		navigation: {
			prevEl: '.password-advices__prev-btn',
			nextEl: '.password-advices__next-btn',
		},
	});
}

function generatePassword() {}
