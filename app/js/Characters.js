export default class {
	static get lowercase() {
		return (function () {
			let characters = [];
			// lowercase letter codes are in 97-122
			for (let i = 97; i <= 122; i++) characters.push(String.fromCharCode(i));
			return characters;
		})();
	}

	static get uppercase() {
		return (function () {
			let characters = [];
			// Uppercase letter codes are in 65-90
			for (let i = 65; i <= 90; i++) characters.push(String.fromCharCode(i));
			return characters;
		})();
	}

	static get numbers() {
		return (function () {
			let characters = [];
			// Number letter codes are in 48-57
			for (let i = 48; i <= 57; i++) characters.push(String.fromCharCode(i));
			return characters;
		})();
	}

	static get symbols() {
		return (function () {
			return [...'!"#$%&\'()*+,-.:;<=>?@^_~|{}[]`'];
		})();
	}

	static get all() {
		let c = this;
		return (function () {
			return c.lowercase.concat(c.uppercase).concat(c.numbers).concat(c.symbols);
		})();
	}

	static get allSet() {
		let c = this;
		return (function () {
			return new Set(c.all);
		})();
	}

	static isSetContainsLowercaseCharacter(set) {
		for (let letter of this.lowercase) {
			if (set.has(letter)) {
				return true;
			}
		}
		return false;
	}

	static isSetContainsUppercaseCharacter(set) {
		for (let letter of this.uppercase) {
			if (set.has(letter)) {
				return true;
			}
		}
		return false;
	}

	static isSetContainsNumberCharacter(set) {
		for (let letter of this.numbers) {
			if (set.has(letter)) {
				return true;
			}
		}
		return false;
	}

	static isSetContainsSymbolCharacter(set) {
		for (let letter of this.symbols) {
			if (set.has(letter)) {
				return true;
			}
		}
		return false;
	}
}
