//-------------------------- FUNCTIONS --------------------------//

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

//Seperated these duties due to symbol differences. dataAppender for backend calculations and displayAggregator for frontend visuals.
function dataAppender(dataNumber) {
	eachNumber += dataNumber;
}

function displayAggregator(displayDataPiece) {
	displayEquation += displayDataPiece;
	calcDisplay.textContent = displayEquation;
}
//===============================================


//-------------------------- FUNCTION END --------------------------//

let displayEquation = "" //Displays each side of equation for displyAggregator
let eachNumber = "" //Stores each side of equation for dataAppender

let snowballData = [] //Array to pass into operate function


let calcDisplay = document.querySelector('.displayContainer p')
let allButtons = document.querySelectorAll('button');


allButtons.forEach( (individualButton) => {
	individualButton.addEventListener('click', (clickData) => {

		clickTarget = clickData.target

		if (clickTarget.hasAttribute('data-number')) {

			calcDataNumber = clickTarget.getAttribute('data-number');
			calcDisplayNumber = clickTarget.textContent;

			dataAppender(calcDataNumber);
			displayAggregator(calcDisplayNumber);
			

		} else if (clickTarget.hasAttribute('data-operator')) {

			calcDataOperator = clickTarget.getAttribute('data-operator');
			calcDisplayOperator = clickTarget.textContent;

			dataAppender(calcDataOperator);
			displayAggregator(calcDisplayOperator);


		} else if (clickTarget.hasAttribute('data-equals')) {

			calcDataEquals = clickTarget.getAttribute('data-equals');
			calcDisplayEquals = clickTarget.textContent;

			displayAggregator(calcDisplayEquals);


		} else if (clickTarget.hasAttribute('data-clear')) {

			calcDataClear = clickTarget.getAttribute('data-clear');
			calcDisplayClear = clickTarget.textContent;



		}

		
	} )
} )

