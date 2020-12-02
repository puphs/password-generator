import Swiper from './libs/swiper-bundle.esm.browser.min.js';
import PasswordGenerator from './PasswordGenerator.js';

window.onload = () => {
	setupPaswordAdvicesSlider();
	let passwordGenerator = new PasswordGenerator();
	passwordGenerator.generate();
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
