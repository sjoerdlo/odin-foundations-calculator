function operate(operator, a, b) {
	// Store the operators and their operations
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
	let currentNumber = 0;
	
	buttons.forEach(button => {
		button.addEventListener('click', (e) => {
			// Remove active state from operator button if there is an active one
			buttons.forEach(button => {
				button.classList.remove('calcButtons--active');
			});

			// Store which type of button we're dealing with
			let buttonType = e.target.dataset.button;
			
			// Make the buttons work
			switch (buttonType) {
				case 'number':
					// Number buttons
					currentNumber = parseInt(e.target.textContent);
					// Update output screen
					calcOutput.textContent = currentNumber;
					// Store number
					if (numberA === undefined) {
						numberA = currentNumber;
					} else {
						numberB = currentNumber;
					}
					break;

				case 'operator':
					// Operator buttons
					// Add active state to clicked operator button
					e.target.classList.add('calcButtons--active');
					isActiveOperator = true;
					activeOperator = e.target.dataset.buttonOperator;
					break;
					
				case 'decimal':
					// Decimal button
					calcOutput.textContent += ',' ;
					break;

				case 'sign':
					// Sign button
					// Toggle the sign on button click on output screen
					if (Array.from(calcOutput.textContent)[0] === '-') {
						calcOutput.textContent = calcOutput.textContent.substring(1);
					} else {
						calcOutput.textContent = `-${calcOutput.textContent}`;
					}
					// Toggle sign on current stored number
					currentNumber = currentNumber * -1;
					if (numberB === undefined) {
						numberA = currentNumber;
					} else {
						numberB = currentNumber;
					}

					break;

				case 'percentage':
		
					break;

				case 'reset':
					// Reset button
					calcOutput.textContent = '0' ;
					activeOperator = undefined;
					isActiveOperator = false;
					numberA = undefined;
					numberB = undefined;
					currentNumber = 0;
					break;
			
				default:
					break;
			}
			
			// Calculate only on operator or equals button press
			if (e.target.classList.contains('calcButtons--operator') || buttonType === 'equals') {
				// Is all the data available to start a calculation?
				if (isActiveOperator && numberA !== undefined && numberB !== undefined) {
					numberA = operate(activeOperator, numberA, numberB);
					numberB = undefined;
					calcOutput.textContent = currentNumber = numberA;
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