import Characters from './Characters.js';
export default class {
	/*
    options object can contain:
        1.lowercase, uppercase, symbols, numbers - boolean properties;
        2.length - integer property;
    */
	constructor(options) {
		if (options) {
			this.options = options;
		} else {
			this.options = {};
		}
	}

	setLength(length) {
		if (typeof length == 'string') {
			length = parseInt(length) || 16;
		} else if (typeof length != 'number') {
			length = 16;
		}
		length = Math.min(48, Math.max(8, length));
		this.options.length = length;
	}

	// If use is true, password will contain lowercase letters
	useLowercase(use) {
		this.options.lowercase = use ? true : false;
	}
	// If use is true, password will contain uppercase letters
	useUppercase(use) {
		this.options.uppercase = use ? true : false;
	}
	// If use is true, password will contain symbols (e.g. ?, !, *, (, @...)
	useSymbols(use) {
		this.options.symbols = use ? true : false;
	}
	// If use is true, password will contain numbers
	useNumbers(use) {
		this.options.numbers = use ? true : false;
	}

	// returns password string generated based on options propery
	generate() {
		let password = '';
		let characters = this.getAllPossibleCharacters();

		let randomValues = new Uint8Array(this.options.length || 16);
		crypto.getRandomValues(randomValues);

		for (let i = 0; i < randomValues.length; i++) {
			password += characters[randomValues[i] % characters.length];
		}

		if (!this.isPasswordMatchesOptions(password)) {
			return this.generate();
		} else {
			return password;
		}
	}

	isPasswordMatchesOptions(password) {
		let charactersSet = new Set([...password]);

		if (this.options.lowercase)
			if (!Characters.isSetContainsLowercaseCharacter(charactersSet)) return false;
		if (this.options.uppercase)
			if (!Characters.isSetContainsUppercaseCharacter(charactersSet)) return false;
		if (this.options.numbers)
			if (!Characters.isSetContainsNumberCharacter(charactersSet)) return false;
		if (this.options.symbols)
			if (!Characters.isSetContainsSymbolCharacter(charactersSet)) return false;
		return true;
	}

	/* 
	returns an array of all characters the password can contain
	based on options property
	*/
	getAllPossibleCharacters() {
		let characters = [];
		if (this.options.uppercase) characters = characters.concat(Characters.uppercase);

		if (this.options.numbers) characters = characters.concat(Characters.numbers);

		if (this.options.symbols) characters = characters.concat(Characters.symbols);

		if (characters.length == 0 || this.options.lowercase)
			characters = characters.concat(Characters.lowercase);

		return characters;
	}
}
