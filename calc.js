//-------------------------- CALCULATION FUNCTIONS --------------------------//

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

//-------------------------- CALCULATION FUNCTION END --------------------------//

let allButtons = document.querySelectorAll('button');


allButtons.forEach( (individualButton) => {
	individualButton.addEventListener('click', (clickData) => {
		clickTarget = clickData.target
		if (clickTarget.hasAttribute('data-number')) {

			console.log(clickTarget.getAttribute('data-number'));

		} else if (clickTarget.hasAttribute('data-operator')) {

			console.log(clickTarget.getAttribute('data-operator'))

		} else if (clickTarget.hasAttribute('data-operator')) {

			console.log(clickTarget.getAttribute('data-operator'))

		} else if (clickTarget.hasAttribute('data-equals')) {

			console.log(clickTarget.getAttribute('data-equals'))

		} else if (clickTarget.hasAttribute('data-clear')) {

			console.log(clickTarget.getAttribute('data-clear'))

		}

		
	} )
} )

