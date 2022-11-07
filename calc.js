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
	switch (operator) {
		case '+':
			return add(initialNumber, modifierNumber);
			break;
		case '-':
			return subtract(initialNumber, modifierNumber);
			break;
		case '*':
			return multiply(initialNumber, modifierNumber);
			break;
		case '/':
			return divide(initialNumber, modifierNumber);
			break;
		case '=':
			break;
	};
}

//Seperated these duties due to symbol differences. DATA for calculations DISPLAY for display.
function dataAppender(dataPassalong) {
	if (dataOperatorsArray.includes(dataPassalong)) {
		snowballingData.push(eachDataPiece); //Push instantly in case calculation array already has two index rotations already
		eachDataPiece = ""
		if (snowballingData.length === 1) {
			snowballingData.push(dataPassalong); //If still on first index rotation, push operator. Wouldn't want otherwise in case array already has 3 indexes.
		};
	};
	if (!dataOperatorsArray.includes(dataPassalong)) {
		eachDataPiece += dataPassalong; //Just continue creating number operator isnt chosen
	};
	if (snowballingData.length === 3 && dataOperatorsArray.includes(dataPassalong)) {
		let initialNumber = Number(snowballingData[0]); //Convert data from string to integer for healthy operations
		let operator = snowballingData[1];
		let modifierNumber = Number(snowballingData[2]);

		snowballedResult = operate(initialNumber, operator, modifierNumber);

		snowballingData = [snowballedResult, dataPassalong] //Take results of operations for next number rotation
	};
	console.log(snowballingData);
}

//=================================================================================================================

function displayAppender(displayPassalong) {
	if (displayOperatorsArray.includes(displayPassalong)) {

		checkIfOperator = eachDisplayPiece.charAt(eachDisplayPiece.length - 2); //Check if last chosen value is operator

		if (displayOperatorsArray.includes(checkIfOperator)) {
			eachDisplayPiece = eachDisplayPiece.slice(0,-3) //If last chosen value operator, then remove so new operator replaces it.
		}

		eachDisplayPiece += ` ${displayPassalong} ` //Add spaces for operators for cleanliness
		calcDisplay.textContent = eachDisplayPiece;
		
	} else { //If not operator, just add without spaces

		eachDisplayPiece += displayPassalong;
		calcDisplay.textContent = eachDisplayPiece;

	}
}

//=================================================================================================================


//-------------------------- FUNCTION END --------------------------//

let eachDisplayPiece = "" //Displays each side of equation for displyAggregator
let eachDataPiece = "" //Stores each side of equation for dataAppender

let snowballingData = [] //Array to pass each piece of data separately

let displayOperatorsArray = ["÷","×","-","+","="]
let dataOperatorsArray = ["/","*","-","+","="]


let calcDisplay = document.querySelector('.displayContainer p')
let allButtons = document.querySelectorAll('button');


allButtons.forEach( (individualButton) => {
	individualButton.addEventListener('click', (clickData) => {

		clickTarget = clickData.target

		if (clickTarget.hasAttribute('data-number')) {

			calcDataNumber = clickTarget.getAttribute('data-number');
			calcDisplayNumber = clickTarget.textContent;

			dataAppender(calcDataNumber);
			displayAppender(calcDisplayNumber);
			

		} else if (clickTarget.hasAttribute('data-operator')) {

			calcDataOperator = clickTarget.getAttribute('data-operator');
			calcDisplayOperator = clickTarget.textContent;

			dataAppender(calcDataOperator);
			displayAppender(calcDisplayOperator);


		} else if (clickTarget.hasAttribute('data-equals')) {

			calcDataEquals = clickTarget.getAttribute('data-equals');
			calcDisplayEquals = clickTarget.textContent;

			displayAppender(calcDisplayEquals);


		} else if (clickTarget.hasAttribute('data-clear')) {

			calcDataClear = clickTarget.getAttribute('data-clear');
			calcDisplayClear = clickTarget.textContent;



		}

		
	} )
} )

