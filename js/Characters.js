export default class {
	static lowercase = (function () {
		let characters = [];
		// lowercase letter codes are in 97-122
		for (let i = 97; i <= 122; i++) characters.push(String.fromCharCode(i));
		return characters;
	})();

	static uppercase = (function () {
		let characters = [];
		// Uppercase letter codes are in 65-90
		for (let i = 65; i <= 90; i++) characters.push(String.fromCharCode(i));
		return characters;
	})();

	static numbers = (function () {
		let characters = [];
		// Number letter codes are in 48-57
		for (let i = 48; i <= 57; i++) characters.push(String.fromCharCode(i));
		return characters;
	})();

	static symbols = (function () {
		return [...'!"#$%&\'()*+,-.:;<=>?@^_~|{}[]`'];
	})();
}
