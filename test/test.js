import PasswordStrength from '../app/js/PasswordStrength.js';
import Characters from '../app/js/Characters.js';

const expect = chai.expect;
describe('Characters.js', () => {
	describe('isSetContainsLowercase', () => {
		it(`'text' contains lowercase letter`, () => {
			expect(Characters.isSetContainsLowercaseCharacter(new Set(...'text'))).to.equal(true);
		});
		it(`'TEXT' doens't contain lowercase letter`, () => {
			expect(Characters.isSetContainsLowercaseCharacter(new Set(...'TEXT'))).to.equal(false);
		});
		it(`'123' doens't contain lowercase letter`, () => {
			expect(Characters.isSetContainsLowercaseCharacter(new Set(...'123'))).to.equal(false);
		});
		it(`'%!#%$(*&^' doens't contain lowercase letter`, () => {
			expect(Characters.isSetContainsLowercaseCharacter(new Set(...'%!#%$(*&^'))).to.equal(false);
		});
	});
	describe('isSetContainsUppercase', () => {
		it(`'text' doesn't contain uppercase letter`, () => {
			expect(Characters.isSetContainsUppercaseCharacter(new Set(...'text'))).to.equal(false);
		});
		it(`'TEXT' contains uppercase letter`, () => {
			expect(Characters.isSetContainsUppercaseCharacter(new Set(...'TEXT'))).to.equal(true);
		});
		it(`'123' doens't contain uppercase letter`, () => {
			expect(Characters.isSetContainsUppercaseCharacter(new Set(...'123'))).to.equal(false);
		});
		it(`'%!#%$(*&^' doens't contain uppercase letter`, () => {
			expect(Characters.isSetContainsUppercaseCharacter(new Set(...'%!#%$(*&^'))).to.equal(false);
		});
	});
	describe('isSetContainsSymbol', () => {
		it(`'text' doesn't contain symbol`, () => {
			expect(Characters.isSetContainsSymbolCharacter(new Set(...'text'))).to.equal(false);
		});
		it(`'TEXT' doesn't contain symbol`, () => {
			expect(Characters.isSetContainsSymbolCharacter(new Set(...'TEXT'))).to.equal(false);
		});
		it(`'123' doens't contain symbol`, () => {
			expect(Characters.isSetContainsSymbolCharacter(new Set(...'123'))).to.equal(false);
		});
		it(`'%!#%$(*&^' contains symbol`, () => {
			expect(Characters.isSetContainsSymbolCharacter(new Set(...'%!#%$(*&^'))).to.equal(true);
		});
	});
	describe('isSetContainsNumber', () => {
		it(`'text' doesn't contain number`, () => {
			expect(Characters.isSetContainsNumberCharacter(new Set(...'text'))).to.equal(false);
		});
		it(`'TEXT' doesn't contain number`, () => {
			expect(Characters.isSetContainsNumberCharacter(new Set(...'TEXT'))).to.equal(false);
		});
		it(`'123' contains number`, () => {
			expect(Characters.isSetContainsNumberCharacter(new Set(...'123'))).to.equal(true);
		});
		it(`'%!)#%$*&^' doesn't contains number`, () => {
			expect(Characters.isSetContainsNumberCharacter(new Set(...'%!#%$(*&^'))).to.equal(false);
		});
	});
});

describe('PasswordStrength.js', () => {
	describe('getStrength', () => {
		it(`abwowix is bad password`, () => {
			expect(PasswordStrength.getStrength('abwowix')).to.equal(PasswordStrength.STRENGTH.BAD);
		});
		it(`asdfa28 is bad password`, () => {
			expect(PasswordStrength.getStrength('asdfa28')).to.equal(PasswordStrength.STRENGTH.BAD);
		});
		it(`7182837132 is bad password`, () => {
			expect(PasswordStrength.getStrength('7182837132')).to.equal(PasswordStrength.STRENGTH.BAD);
		});
		it(`abwTowiWSAx is ok password`, () => {
			expect(PasswordStrength.getStrength('abwTowiWSAx')).to.equal(PasswordStrength.STRENGTH.OK);
		});
		it(`assaswssasA is ok password`, () => {
			expect(PasswordStrength.getStrength('assaswssasA')).to.equal(PasswordStrength.STRENGTH.OK);
		});
		it(`ab1wTowiWSAx is good password`, () => {
			expect(PasswordStrength.getStrength('ab1wTowiWSAx')).to.equal(PasswordStrength.STRENGTH.GOOD);
		});
		it(`AabwT21owiW%SAx is good password`, () => {
			expect(PasswordStrength.getStrength('AabwT21owiW%SAx')).to.equal(
				PasswordStrength.STRENGTH.GOOD
			);
		});
		it(`AabwT21owiW%SAxo is excellent password`, () => {
			expect(PasswordStrength.getStrength('AabwT21owiW%SAxo')).to.equal(
				PasswordStrength.STRENGTH.EXCELLENT
			);
		});
	});
});
