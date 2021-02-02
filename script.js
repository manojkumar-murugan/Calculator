// window.onload = wrapper()

function wrapper(){
    const calculator = document.querySelector(".calculator")
    const display = calculator.querySelector(".calculator__display")
    const keys = calculator.querySelector(".calculator__keys")

    // function allClear(){
    //     document.querySelector("#field1").value=""
    // }

    // adding event listener
    keys.addEventListener('click', e => {
        if (e.target.matches('button')) {
            const key = e.target
            
            // to identify action - add sub mul div modulo 
            const action = key.dataset.action
            // Content in that button
            const keyContent = key.textContent
            const displayedNum = display.textContent
            let previousKeyType = calculator.dataset.previousKeyType
            
            // Release the depressed
            Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))
            if (!action) {
                // First time clicking a number || operator is clicked
                if(displayedNum==='0'){
                    display.textContent=keyContent
                }
                else if(previousKeyType ==='operator'){
                    display.textContent=keyContent
                    calculator.dataset.previousKeyType = 'number'
                }
                // Some number present already
                else{
                    display.textContent = displayedNum + keyContent
                }
                console.log('number key!')
            }
            
            if (action === 'decimal') {
                display.textContent = displayedNum+'.'
                console.log('decimal key!')
            }

            if (action === 'add'||action === 'subtract' ||action === 'multiply' || action === 'divide' || action === 'modulo') {
                    
                // To mark the key which is clicked
                key.classList.add('is-depressed')
                calculator.dataset.previousKeyType = 'operator'
                // Store the first clicked number
                calculator.dataset.firstValue = displayedNum
                // To find already clicked
                calculator.dataset.operator = action
                console.log('operator key!')
            }
            
            if(action === 'negate'){
                display.textContent = negate(displayedNum)
            }

            if (action === 'clear') {
                display.textContent=0
                console.log('clear key!')
            }

            if (action === 'calculate') {
                const firstValue= calculator.dataset.firstValue
                const secondValue = displayedNum
                const operator =calculator.dataset.operator

                display.textContent=calculate(firstValue,secondValue,operator)
                console.log('equal key!')
            }
        }
            
    })

    const negate = (num) => {
        return parseFloat(num)*-1
    }

    const calculate = (n1, n2, operator) => {
        let result = ''
        if (operator==='add') {
            result = parseFloat(n1)+parseFloat(n2)
        } else if (operator === 'subtract') {
            result = parseFloat(n1)-parseFloat(n2)
        } else if (operator === 'multiply') {
            result = parseFloat(n1)*parseFloat(n2)
        } else if (operator === 'divide') {
            result = parseFloat(n1)/parseFloat(n2)
        } else if (operator === 'modulo') {
            result = parseFloat(n1)%parseFloat(n2)
        }
        return Number.isInteger(result)?result:result.toFixed(2)
    }
}
