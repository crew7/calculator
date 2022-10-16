function add( initialNumber , addedNumber ) {
	return initialNumber + addedNumber;
}

function subtract( initialNumber, subtractor ) {
	return initialNumber - subtractor;
}

function multiply( initialNumber, multiplier ) {
	return initialNumber * multiplier;
}

function divide( initialNumber, divider ) {
	return initialNumber / divider
}

function operate(initialNumber, operator, modifierNumber) {
	if (operator === '+') {
		return add(initialNumber, modifierNumber);
	} else if (operator === '-') {
		return subtract(initialNumber, modifierNumber);
	} else if (operator === '*') {
		return multiply(initialNumber, modifierNumber);
	} else if (operator === '/') {
		return divide(initialNumber, modifierNumber);
	}
}