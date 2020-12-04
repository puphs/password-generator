import Characters from './Characters.js';
export default class {
	// constructor(titleSelector, indicatorSelector) {
	// 	this.title = document.querySelector(titleSelector);
	// 	this.indicatorSelector = document.querySelector(indicatorSelector);
	// }

	// updateTitleAndIndicator(password) {
	// 	let passwordCharacters = new Set(...password);
	// 	isSetContainsLowercase(passwordCharacters);
	// }

	static get STRENGTH() {
		return {
			BAD: 'Bad',
			OK: 'Ok',
			GOOD: 'Good',
			EXCELLENT: 'Excellent',
		};
	}

	/*
	Bad 
	Ok: >= 8 symbols, contains lowercase, uppercase
	Good: >= 12 symbols, contains lowercase, uppercase, numbers
	Excellent: >= 16 symbols, contains lowercase, uppercase, numbers and symbols
	*/
	static getStrength(password) {
		let charactersSet = new Set([...password]);
		let strength = this.STRENGTH.BAD;
		let characterTypesCount = 0;
		let passwordContains = {
			lowercase: Characters.isSetContainsLowercaseCharacter(charactersSet),
			uppercase: Characters.isSetContainsUppercaseCharacter(charactersSet),
			numbers: Characters.isSetContainsNumberCharacter(charactersSet),
			symbols: Characters.isSetContainsSymbolCharacter(charactersSet),
		};
		for (let prop in passwordContains) if (passwordContains[prop]) characterTypesCount++;

		if (password.length >= 8 && characterTypesCount >= 2) strength = this.STRENGTH.OK;
		if (password.length >= 10 && characterTypesCount >= 2) strength = this.STRENGTH.OK;

		if (password.length >= 10 && characterTypesCount >= 4) strength = this.STRENGTH.GOOD;
		if (password.length >= 12 && characterTypesCount >= 3) strength = this.STRENGTH.GOOD;

		if (password.length >= 20 && characterTypesCount >= 3) strength = this.STRENGTH.EXCELLENT;
		if (password.length >= 16 && characterTypesCount >= 4) strength = this.STRENGTH.EXCELLENT;

		return strength;
	}
}
