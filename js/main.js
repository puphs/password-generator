import Swiper from './libs/swiper-bundle.esm.browser.min.js';

window.onload = () => {
	setupPaswordAdvicesSlider();
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
