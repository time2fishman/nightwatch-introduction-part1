const selectors = require('./selectors')

/**
 * Looks over the UI to make sure needed elements are visible and displaying the right text.  (Buttons and the display)
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 */
const uiChecker = browser => {
    //check elements for visibility
    browser.expect.element(selectors['0']).to.be.visible
    browser.expect.element(selectors['1']).to.be.visible
    browser.expect.element(selectors['2']).to.be.visible
    browser.expect.element(selectors['3']).to.be.visible
    browser.expect.element(selectors['4']).to.be.visible
    browser.expect.element(selectors['5']).to.be.visible
    browser.expect.element(selectors['6']).to.be.visible
    browser.expect.element(selectors['7']).to.be.visible
    browser.expect.element(selectors['8']).to.be.visible
    browser.expect.element(selectors['9']).to.be.visible
    browser.expect.element(selectors['+']).to.be.visible
    browser.expect.element(selectors['-']).to.be.visible
    browser.expect.element(selectors['*']).to.be.visible
    browser.expect.element(selectors['/']).to.be.visible
    browser.expect.element(selectors['=']).to.be.visible
    browser.expect.element(selectors['%']).to.be.visible
    browser.expect.element(selectors['+/-']).to.be.visible
    browser.expect.element(selectors['AC']).to.be.visible
    browser.expect.element(selectors['.']).to.be.visible
    browser.expect.element(selectors['result']).to.be.visible
    //check elements for displayed text
    browser.expect.element(selectors['0']).text.to.equal('0')
    browser.expect.element(selectors['1']).text.to.equal('1')
    browser.expect.element(selectors['2']).text.to.equal('2')
    browser.expect.element(selectors['3']).text.to.equal('3')
    browser.expect.element(selectors['4']).text.to.equal('4')
    browser.expect.element(selectors['5']).text.to.equal('5')
    browser.expect.element(selectors['6']).text.to.equal('6')
    browser.expect.element(selectors['7']).text.to.equal('7')
    browser.expect.element(selectors['8']).text.to.equal('8')
    browser.expect.element(selectors['9']).text.to.equal('9')
    browser.expect.element(selectors['+']).text.to.equal('+')
    browser.expect.element(selectors['-']).text.to.equal('-')
    browser.expect.element(selectors['*']).text.to.equal('×')
    browser.expect.element(selectors['/']).text.to.equal('÷')
    browser.expect.element(selectors['=']).text.to.equal('=')
    browser.expect.element(selectors['%']).text.to.equal('%')
    browser.expect.element(selectors['+/-']).text.to.equal('+/-')
    browser.expect.element(selectors['AC']).text.to.equal('AC')
    browser.expect.element(selectors['.']).text.to.equal('.')
    browser.expect.element(selectors['result']).text.to.equal('0')
}

// keeps track of the number on the calculator display screen based
// on button clicks
var currentDisplay = '0'

/**
 * Clicks a button and checks that the resulting display is correct.
 * If the button clicked '=', we won't check the result in this function.
 * As the function won't reset with the test, we should click the clear button before each test
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {string} button      the key of the button to click (corresponds to the keys in selectors.js)
 */
const buttonClicker = (browser, button) => {
    //click the button
    browser.click(selectors[button])
    //set the expected display per the requirements, and check it
    switch (button) {
        case 'AC': //clear the display (set to 0)
            currentDisplay = '0'
            break
        case '=': //end the function if '='
            return
            break
        case '%': //if the display is not 0, divide it by 100
            if (currentDisplay !== '0')
                currentDisplay = (parseFloat(currentDisplay) / 100).toString()
            break
        case '+/-': //flip the positive/negative status of the number
            if (currentDisplay[0] === '-')
                currentDisplay = currentDisplay.substr(1)
            else
                currentDisplay = '-' + currentDisplay
            break
        case '*': //if the button is any of these 4, default the screen back to 0
        case '/':
        case '+':
        case '-':
            currentDisplay = '0'
            break
        case '.': //if it's a decimal, check that the number doesn't already contain a . - if it does, leave currentDisplay alone,
            if (currentDisplay.indexOf('.') === -1) //if there is no decimal, indexOf returns -1
                currentDisplay += '.'
            break
        default: //for any regular number, update the display appropriately
            if (currentDisplay === '0')
                currentDisplay = button
            else
                currentDisplay += button
    }
    //now that currentDisplay has been updated appropraitely (matching the requirements) we can 'expect' the result
    browser.expect.element(selectors['result']).text.to.equal(currentDisplay)
}

module.exports = {
    uiChecker: uiChecker,
    buttonClicker: buttonClicker
}