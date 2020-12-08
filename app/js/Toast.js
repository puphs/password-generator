export default class {
	constructor(message = '', duration = 0) {
		// creating toast element
		this.toastElement = document.createElement('div');
		this.toastElement.classList.add('toast');
		this.toastMessageElement = document.createElement('p');
		this.toastMessageElement.classList.add('toast__message');
		this.toastElement.append(this.toastMessageElement);

		this.animationShowName = 'toast-show';
		this.animaitonHideName = 'toast-hide';

		// adding styles
		this.addStyle();

		window.addEventListener('resize', () => {
			this.centerHorizontally();
		});

		document.body.append(this.toastElement);

		this.setMessage(message);
		this.setDuration(duration);
		this.hideTimeout = 0;
	}

	addStyle() {
		let styleClass = 'toast__style';
		if (document.querySelector('.' + styleClass)) return;

		let styleElement = document.createElement('style');
		styleElement.classList.add(styleClass);
		styleElement.append(
			document.createTextNode(`
        .toast {
            position: fixed;
            background-color: white;
            padding: 8px 16px;
            bottom: 32px;
            margin: 0 auto;
            border-radius: 3px;
            opacity: 0;
            transform: none;
			animation-fill-mode: forwards;
			z-index: 100;
        }

        .toast__message {
            margin: 0;
            font-size: 16px;
            color: black;
        }
        
        @keyframes ${this.animationShowName} {
            0% {
                transform: translateY(10px);
                opacity: 0;
            }
            50% {
                transform: translateY(0px);
            }
            100% {
                opacity: 1;
            }
        }
        
        @keyframes ${this.animaitonHideName} {
            0% {
                opacity: 1;
            }
            50% {
            }
            100% {
                opacity: 0;
            }
        }
        `)
		);
		document.head.append(styleElement);
	}

	setMessage(message) {
		this.toastMessageElement.textContent = message;
		this.centerHorizontally();
	}

	// if duration is 0, then toast won't be hidden
	setDuration(duration) {
		this.duration = duration;
	}

	centerHorizontally() {
		this.toastElement.style.left =
			document.body.offsetWidth / 2 - this.toastElement.offsetWidth / 2 + 'px';
	}

	show() {
		requestAnimationFrame(() => {
			this.toastElement.style.animationName = `${this.animationShowName}`;
			this.toastElement.style.animationDuration = '0.5s';
			clearTimeout(this.hideTimeout);
			if (this.duration)
				this.hideTimeout = setTimeout(() => {
					this.hide();
				}, this.duration);
		});
	}

	hide() {
		requestAnimationFrame(() => {
			this.toastElement.style.animationName = `${this.animaitonHideName}`;
			this.toastElement.style.animationDuration = '1.4s';
		});
	}

	static get DURATION_SHORT() {
		return 1500;
	}
	static get DURATION_LONG() {
		return 3000;
	}
}
