export default class {
	constructor(titleSelector, rangeSelector, passwordLengthUpdateCallback) {
		this.title = document.querySelector(titleSelector);
		this.range = document.querySelector(rangeSelector);
		this.passwordLengthUpdateCallback = passwordLengthUpdateCallback;

		this.range.addEventListener('input', (e) => {
			let passwordLength = Math.floor(
				remap(
					this.range.value,
					this.range.min,
					this.range.max,
					MIN_PASSWORD_LENGTH,
					MAX_PASSWORD_LENGTH
				)
			);
			this.updateTitle(passwordLength);
			if (this.passwordLengthUpdateCallback) this.passwordLengthUpdateCallback(passwordLength);
			//setPasswordLength(passwordLength);
		});
	}

	updateTitle(passwordLength) {
		this.title.textContent = `Password length: ${passwordLength}`;
	}

	setPasswordLength(passwordLength) {
		this.updateTitle(passwordLength);
		const rangeValue = Math.floor(
			remap(
				passwordLength,
				MIN_PASSWORD_LENGTH,
				MAX_PASSWORD_LENGTH,
				this.range.min,
				this.range.max
			)
		);
		this.range.value = rangeValue;
		if (this.passwordLengthUpdateCallback) this.passwordLengthUpdateCallback(passwordLength);
	}
}

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 48;

function remap(value, from1, to1, from2, to2) {
	return ((value - from1) / (to1 - from1)) * (to2 - from2) + from2;
}
