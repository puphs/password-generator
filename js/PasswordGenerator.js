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
			this.restoreDefaultOptions();
		}
	}

	restoreDefaultOptions() {
		this.options = {
			lowercase: true,
			uppercase: true,
			symbols: true,
			numbers: true,
			length: 16,
		};
	}

	// If use is true, password may contain lowercase letters
	useLowercase(use) {
		this.options.lowercase = use ? true : false;
	}
	// If use is true, password may contain uppercase letters
	useUppercase(use) {
		this.options.uppercase = use ? true : false;
	}
	// If use is true, password may contain symbols (e.g. ?, !, *, (, @...)
	useSymbols(use) {
		this.options.symbols = use ? true : false;
	}
	// If use is true, password may contain numbers
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
		return password;
	}

	/* 
	returns an array of all characters the password can contain
	based on options property
	*/
	getAllPossibleCharacters() {
		let characters = [];
		// lowercase letter codes are in 97-122
		if (this.options.lowercase)
			for (let i = 97; i <= 122; i++) characters.push(String.fromCharCode(i));

		// Uppercase letter codes are in 65-90
		if (this.options.uppercase)
			for (let i = 65; i <= 90; i++) characters.push(String.fromCharCode(i));

		// Number letter codes are in 48-57
		if (this.options.lowercase)
			for (let i = 48; i <= 57; i++) characters.push(String.fromCharCode(i));

		// Symbols
		return characters.concat(...'!"#$%&\'()*+,-.:;<=>?@^_~|{}[]`');
	}
}
