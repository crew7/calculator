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
	if (!dataOperatorsArray.includes(dataPassalong)) { //IF NUMBER
		eachDataPiece += dataPassalong; 
	};

	if (dataOperatorsArray.includes(dataPassalong)) { //IF OPERATOR
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

	if (snowballingData.length === 3 && dataOperatorsArray.includes(dataPassalong)) { //3 INDEXES AND OPERATOR
		let initialNumber = Number(snowballingData[0]); 
		let operator = snowballingData[1];
		let modifierNumber = Number(snowballingData[2]);

		snowballedDataResult = operate(initialNumber, operator, modifierNumber);

		if (dataPassalong !== '=') {
			snowballingData = [snowballedDataResult, dataPassalong] 
		} else {
			snowballingData = [snowballedDataResult]
		}
	};

	if (snowballedDataResult || snowballedDataResult === 0) {
		displayAnswer = snowballedDataResult.toString();	
	}
		
}

//=================================================================================================================

function displayAppender(displayPassalong) {

	calcDisplayTop.textContent = "" //RESET EXPRESSION PAGE

	latestDisplayIndex = snowballingDisplay.length - 1
	if (displayOperatorsArray.includes(displayPassalong) && displayOperatorsArray.includes(snowballingDisplay[latestDisplayIndex])) {
		snowballingDisplay.pop(); //IF LAST PASSALONG OPERATOR, REMOVE LAST OPERATOR
	}
	
	if (displayOperatorsArray.includes(displayPassalong)) { //IF PASSALONG OPERATOR

		snowballingDisplay.push(displayPassalong); //PUSH OPERATOR
		
		if (displayPassalong === '=') { 


			if (snowballingDisplay.length === 2) displayAnswer = snowballingDisplay[0]; //IF NUM THEN OPERATOR, SINCE OPERATORS REPLACE
			
			if (snowballingDisplay.length === 3 && displayOperatorsArray.includes(snowballingDisplay[0]) && displayOperatorsArray.includes(snowballingDisplay[2])) {
				displayAnswer = snowballingDisplay[1]; //IF INDEX 0 AND 2 OPERATOR, INDEX 1 ANS
				snowballingDisplay.shift();
			} else if (displayOperatorsArray.includes(snowballingDisplay[0])) {
				snowballingDisplay.shift(); //IF START WITH OPERATOR, IGNORE IT
			}

			
			if (displayAnswer) snowballingDisplay.push(displayAnswer.toString());
			snowballingDisplay = snowballingDisplay.filter(n => n) //ABOVE PUSH GIVES UNDEFINED, FILTER REMOVES.
			if (snowballingDisplay.length === 1) snowballingDisplay.pop(); //ABOVE FILTER BYPASSES ABOVE IF STATEMENTS, SO LEN 1 CHECK HERE.	
			

			expressionDisplay = snowballingDisplay.slice();
			expressionDisplay.pop(); //REMOVE ANS FOR EXPRESSION

			latestDisplayIndex = snowballingDisplay.length - 1 //REWRITE
			snowballingDisplay = [snowballingDisplay[latestDisplayIndex]]; //REMOVE ALL BUT ANS FOR RESULT
			
		};
	};

	if (!displayOperatorsArray.includes(displayPassalong)) { //IF PASSALONG NUMBER

		if (displayAnswer === calcDisplayBottom.textContent) { //REPLACE ANSWER
			snowballingDisplay = []
		}

		if (!snowballingDisplay[latestDisplayIndex]) { //IF EMPTY ARRAY
			snowballingDisplay.push(displayPassalong);
		} else if (!displayOperatorsArray.includes(snowballingDisplay[latestDisplayIndex])) { //IF LATEST INDEX IS NUMBER
			snowballingDisplay[latestDisplayIndex] += displayPassalong
		} else {
			snowballingDisplay.push(displayPassalong);
		}
	}





	overwriteDisplay = snowballingDisplay.join(" ");
	calcDisplayBottom.textContent = overwriteDisplay;
	
	

	//TEMP TOP DISPLAY
	if (expressionDisplay[latestDisplayIndex - 1] === "=") { //Since expression is popped, latest is actually -1
		expressionDisplay = expressionDisplay.join(" ");
		calcDisplayTop.textContent = expressionDisplay;

	}
	


}

function dataClear() {

}

function displayClear() {

}


//=================================================================================================================


//-------------------------- FUNCTION END --------------------------//

//----Display variables
let eachDisplayPiece = "" //Displays each side of equation for displyAggregator
let snowballingDisplay = []
let latestDisplayIndex = ""
let displayAnswer = ""
let expressionDisplay = []
let displayOperatorsArray = ["÷","×","-","+","="]

//----Data variables
let eachDataPiece = "" //Stores each side of equation for dataAppender

let snowballingData = [] //Array to pass each piece of data separately

let dataOperatorsArray = ["/","*","-","+","="]
let snowballedDataResult = "" //Declare for check if true statements





let calcDisplayTop = document.querySelector('.displayContainer .displayTop')
let calcDisplayBottom = document.querySelector('.displayContainer .displayBottom')
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

