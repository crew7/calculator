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

	
	

	

	if (dataOperatorsArray.includes(dataPassalong) && snowballingData.length === 0) {
		snowballingData.unshift(0); //if start with operator, then 0 then operator.
	}


	if (!dataOperatorsArray.includes(dataPassalong)) { //IF NUMBER
		if (eachDataPiece.indexOf(".") === -1 || dataPassalong !== ".") { //PREVENTS DOUBLE FLOAT
			eachDataPiece += dataPassalong;
		}
	};


	if (dataOperatorsArray.includes(dataPassalong)) { //IF OPERATOR
		
		if (eachDataPiece !== "") { //IF STORED NUMBER

			if (snowballingData.length === 1) { //REPLACE ANSWER (e.g. 5 > =) 

				snowballingData[0] = Number(eachDataPiece);
				eachDataPiece = ""	
				 
			} else { 
				snowballingData.push(Number(eachDataPiece)); //PUSH NUMBER
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
		
		

		if (dataPassalong === '=' && snowballingData[0] === 0 && dataOperatorsArray.includes(snowballingData[1]) && snowballingData.length <= 2) {
			snowballingData.push(0); //PREVENTS BUGS WHERE STARTING WITH OPERATOR AND CLICKING '='
		}
		
		
	};

	replaceFalseyValues();

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

	}

	console.log(snowballingData)


	//NOT INT, FLOAT, OR EMPTY STRING, RESET.
	if ( !isFinite(snowballedDataResult) || isNaN(snowballedDataResult) ) { //num > / > 0 gives infinity, / > = gives NaN
		snowballedDataResult = 0
		displayAnswer = 0
		snowballingData = [0]
	} else if  (snowballingData.length === 1) {
		displayAnswer = snowballingData[0]
	} else if (snowballingData.length === 2) {
		displayAnswer = snowballingData[0]
	} else if (snowballedDataResult) {
		displayAnswer = snowballedDataResult.toString();
	} else if (snowballingData[0]) {
		displayAnswer = snowballingData[0]
	} else {
		displayAnswer = 0
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

		if (snowballingDisplay.length === 1 && displayOperatorsArray.includes(snowballingDisplay[0]) ) {
			snowballingDisplay.unshift("0") //IF START OPERATOR, UNSHIFT 0
		}
		
		if (displayPassalong === '=') { 
			
			
			if (isNaN(displayAnswer) || !isFinite(displayAnswer)) {
				displayAnswer = 0 //Data validation for odd inputs like . > =
			}
			

			snowballingDisplay.push(displayAnswer.toString()); 
			
			snowballingDisplay = snowballingDisplay.filter(n => n) //ABOVE PUSH GIVES UNDEFINED, FILTER REMOVES. 
			
			if (snowballingDisplay.length === 1) snowballingDisplay.pop(); //ABOVE FILTER BYPASSES ABOVE IF STATEMENTS, SO LEN 1 CHECK HERE.	
			
			expressionDisplayOverwrite = [] //RESET OVERWRITE ARRAY FROM PREVIOUS REFORMAT.
			expressionDisplay = snowballingDisplay.slice();
			PopTrailingDecimals(expressionDisplay);
			expressionDisplay.pop(); //REMOVE ANS FOR EXPRESSION

			latestDisplayIndex = snowballingDisplay.length - 1 //REWRITE
			snowballingDisplay = [snowballingDisplay[latestDisplayIndex]]; //REMOVE ALL BUT ANS FOR RESULT
			
		};
		

	};

	if (!displayOperatorsArray.includes(displayPassalong)) { //IF PASSALONG NUMBER

		if (isNaN(displayAnswer) || !isFinite(displayAnswer)) {
			displayAnswer = 0 //Data validation for odd inputs like . > = > 5
		}

		if (displayAnswer.toString() === calcDisplayBottom.textContent) { //REPLACE ANSWER
			snowballingDisplay = [] 
			calcDisplayBottom.textContent = ""
		}
		
		if (!snowballingDisplay[latestDisplayIndex]) { //IF EMPTY ARRAY
			snowballingDisplay.push(displayPassalong);
			if (snowballingDisplay[0] === ".") {
				snowballingDisplay[0] = "0" + "." //IF START '.'
			}
		} else if (!displayOperatorsArray.includes(snowballingDisplay[latestDisplayIndex])) { //IF LATEST INDEX IS NUMBER/DOT

			if (snowballingDisplay[latestDisplayIndex].indexOf(".") === -1 || displayPassalong !== ".") { //PREVENTS DOUBLE FLOAT
				snowballingDisplay[latestDisplayIndex] += displayPassalong 
			}
			
		} else {
			snowballingDisplay.push(displayPassalong);
			latestDisplayIndex = snowballingDisplay.length - 1

			if (snowballingDisplay[latestDisplayIndex] === ".") {
				snowballingDisplay[latestDisplayIndex] = "0" + "." //IF LATEST INDEX START '.'
			}
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

function PopTrailingDecimals(expressionDisplayArray) {
	for (each of expressionDisplayArray) {
		if (each.toString().endsWith(".")) {
			let expressionReformatted = each.toString().slice(0, each.length - 1)
			expressionDisplayOverwrite.push(expressionReformatted);
		} else {
			expressionDisplayOverwrite.push(each);
		}
		expressionDisplay = expressionDisplayOverwrite
	}


};

function replaceFalseyValues() {
	for (index in snowballingData) {
		if ( !dataOperatorsArray.includes(snowballingData[index]) ) {
			if (isNaN(snowballingData[index]) || !isFinite(snowballingData[index])) { //isFinite messes up other conditions, so nested if.
				snowballingData[index] = 0
			}
		}
	}
}

function dataClear() {
	eachDataPiece = ""
	snowballingData = []
	snowballedDataResult = ""
	
}

function displayClear() {
	eachDisplayPiece = "" //Displays each side of equation for displyAggregator
	snowballingDisplay = []
	latestDisplayIndex = ""
	displayAnswer = 0
	expressionDisplay = []
	calcDisplayBottom.textContent = "0"
	calcDisplayTop.textContent = ""
}


//=================================================================================================================


//-------------------------- FUNCTION END --------------------------//

//----Display variables
let eachDisplayPiece = "" //Displays each side of equation for displyAggregator
let snowballingDisplay = []
let latestDisplayIndex = ""
let displayAnswer = 0
let expressionDisplay = []
let expressionDisplayOverwrite = []
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


		} else if (clickTarget.hasAttribute('data-dot')) {

			calcDataDot = clickTarget.getAttribute('data-dot')
			calcDisplayDot = clickTarget.textContent;

			dataAppender(calcDataDot);
			displayAppender(calcDataDot);

		} else if (clickTarget.hasAttribute('data-clear')) {
			dataClear();
			displayClear();
		}

		
	} )
} )

