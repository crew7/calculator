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
			console.log(snowballingData);
			break;
	};
}

//Seperated these duties due to symbol differences. DATA for calculations DISPLAY for display.


function dataAppender(dataPassalong) {
	if (!dataOperatorsArray.includes(dataPassalong)) {
		eachDataPiece += dataPassalong; 
	};

	if (dataOperatorsArray.includes(dataPassalong)) {
		if (eachDataPiece !== "") {
			if (snowballingData.length === 1) { //REPLACE ANSWER
				snowballingData[0] = Number(eachDataPiece);
				eachDataPiece = ""
			} else {
				snowballingData.push(eachDataPiece); //PUSH NUMBER
				eachDataPiece = ""
			};
		};
		if (snowballingData.length === 1 && dataPassalong !== '=') {
			snowballingData.push(dataPassalong); //PUSH OPERATOR
		};
		if (snowballingData.length === 2 && eachDataPiece === "" && dataPassalong !== '=') {
			snowballingData.pop();
			snowballingData.push(dataPassalong); //REPLACE OPERATOR
		};
	};

	if (snowballingData.length === 3 && dataOperatorsArray.includes(dataPassalong)) {
		let initialNumber = Number(snowballingData[0]); 
		let operator = snowballingData[1];
		let modifierNumber = Number(snowballingData[2]);

		snowballedResult = operate(initialNumber, operator, modifierNumber);

		if (dataPassalong !== '=') {
			snowballingData = [snowballedResult, dataPassalong] 
		} else {
			snowballingData = [snowballedResult]
		}
	};
	console.log(snowballingData);
	console.log(eachDataPiece);
}

//=================================================================================================================

function displayAppender(displayPassalong) {
	if (displayOperatorsArray.includes(displayPassalong)) {

		checkIfOperator = eachDisplayPiece.charAt(eachDisplayPiece.length - 2);

		if (displayOperatorsArray.includes(checkIfOperator) && checkIfOperator !== '=') {
			eachDisplayPiece = eachDisplayPiece.slice(0,-3) //REPLACE OPERATOR
		}

		eachDisplayPiece += ` ${displayPassalong} ` //Add spaces for operators for cleanliness
		calcDisplay.textContent = eachDisplayPiece;
		
	} else { //If not operator, just add without spaces

		eachDisplayPiece += displayPassalong;
		calcDisplay.textContent = eachDisplayPiece;

	}
}

function dataClear() {

}

function displayClear() {

}


//=================================================================================================================


//-------------------------- FUNCTION END --------------------------//

let eachDisplayPiece = "" //Displays each side of equation for displyAggregator
let eachDataPiece = "" //Stores each side of equation for dataAppender

let snowballingData = [] //Array to pass each piece of data separately

let displayOperatorsArray = ["÷","×","-","+","="]
let dataOperatorsArray = ["/","*","-","+","="]


let calcDisplay = document.querySelector('.displayContainer .displayBottom')
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

			dataAppender(calcDataEquals);
			displayAppender(calcDisplayEquals);


		} else if (clickTarget.hasAttribute('data-clear')) {
			dataClear();
			displayClear();
		}

		
	} )
} )

