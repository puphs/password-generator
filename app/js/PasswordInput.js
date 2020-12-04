import Characters from './Characters.js';

export default class {
	constructor(inputSelector, inputCallback) {
		this.input = document.querySelector(inputSelector);
		this.input.addEventListener('focus', () => {
			this.input.parentNode.classList.add('password-preview__input-outer--active');
		});
		this.input.addEventListener('blur', () => {
			this.input.parentNode.classList.remove('password-preview__input-outer--active');
		});
		this.input.addEventListener('input', () => {
			this.filterInput();
			if (inputCallback) {
				inputCallback(this.input.value);
			}
		});
	}

	setValue(value) {
		this.input.value = value;
	}
	getValue() {
		return input.value;
	}

	copyToClipboard() {
		// selecting password
		this.input.select();
		this.input.setSelectionRange(0, 99999);

		document.execCommand('copy');

		// removing selection
		this.input.selectionEnd = 0;
		this.input.blur();
	}

	isVisible() {
		return this.input.getAttribute('type') == 'text';
	}
	setVisibility(visible) {
		if (visible) {
			this.input.setAttribute('type', 'text');
		} else {
			this.input.setAttribute('type', 'password');
		}
	}

	filterInput() {
		let filtered = '';
		for (let char of this.input.value) {
			if (Characters.allSet.has(char)) {
				filtered += char;
			}
		}
		this.input.value = filtered;
	}
}
