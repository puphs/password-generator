import Characters from './Characters.js';

export default class {
	constructor(titleSelector, indicatorSelector) {
		this.title = document.querySelector(titleSelector);
		this.indicatorSelector = document.querySelector(indicatorSelector);
	}

	updateTitleAndIndicator(password) {
		let passwordCharacters = new Set(...password);
		isSetContainsLowercase(passwordCharacters);
	}
}

function isSetContainsLowercase(set) {
	for (let letter of Characters.lowercase) {
		if (set.has(letter)) {
			return true;
		}
	}
	return false;
}

function isSetContainsUppercase(set) {
	for (let letter of Characters.uppercase) {
		if (set.has(letter)) {
			return true;
		}
	}
	return false;
}

function isSetContainsNumber(set) {
	for (let letter of Characters.number) {
		if (set.has(letter)) {
			return true;
		}
	}
	return false;
}

function isSetContainsSymbol(set) {
	for (let letter of Characters.symbols) {
		if (set.has(letter)) {
			return true;
		}
	}
	return false;
}

const PASSWORD_STRENGTH = {
	BAD: 'Bad',
	OK: 'Ok',
	GOOD: 'Good',
	EXCELLENT: 'Excellent',
};
