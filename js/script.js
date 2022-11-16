function operate(operator, a, b) {
	// Store the operators
	const operators = {
		'sum': (a, b) => a + b,
		'subtract': (a, b) => a - b,
		'multiply': (a, b) => a * b,
		'divide': (a, b) => a / b,
	}
	// Calculate with all arguments using the operator
	let number = arguments[1];
	for (let i = 2; i < arguments.length; i++) {
		number = operators[operator](number, arguments[i]);
	}
	return number;
}

function initButtons() {
	const buttons = document.querySelectorAll('.calcButtons > button');
	const calcOutput = document.querySelector('.calcOutput');
	let isActiveOperator = false;
	let activeOperator;
	let numberA;
	let numberB;
	
	buttons.forEach(button => {
		button.addEventListener('click', (e) => {
			// Remove active state from operator button if there is an active one
			buttons.forEach(button => {
				button.classList.remove('calcButtons--active');
			});

			let buttonData = e.target.dataset.button;
			let number = parseInt(buttonData);
			if (typeof number === 'number' && ! Number.isNaN(number)) {
				// Number buttons
				// Update output screen
					calcOutput.textContent = number;
				// Store number
				if (numberA === undefined) {
					numberA = number;
				} else {
					numberB = number;
				}
			} else if (e.target.classList.contains('calcButtons--operator')) {
				// Operator buttons
				// Add active state to clicked operator button
				e.target.classList.add('calcButtons--active');
				isActiveOperator = true;
				activeOperator = buttonData;
			} else if (buttonData === 'decimal') {
				// Decimal button
				calcOutput.textContent += ',' ;
			} else if (buttonData === 'reset') {
				// Reset button
				calcOutput.textContent = '0' ;
				activeOperator = undefined;
				isActiveOperator = false;
				numberA = undefined;
				numberB = undefined;
			}
			
			// Calculate only on operator or equals button press
			if (e.target.classList.contains('calcButtons--operator') || buttonData === 'equals') {
				// Is all the data available to start a calculation?
				if (isActiveOperator && numberA !== undefined && numberB !== undefined) {
					numberA = operate(activeOperator, numberA, numberB);
					numberB = undefined;
					calcOutput.textContent = numberA;
				}
				// Reset stored active operator when equals button initiated the calculation
				if (e.target.classList.contains('calcButtons--equals')) {
					activeOperator = undefined;
					isActiveOperator = false;
				}
			}

		})
	});
}

function init() {
	initButtons();
}

init();