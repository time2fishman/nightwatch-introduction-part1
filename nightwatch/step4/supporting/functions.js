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
 * If the button clicked is a special operator (=, %, +/-), we won't
 * check the result in this function.
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {string} button      the key of the button to click (corresponds to the keys in selectors.js)
 */
const buttonClicker = (browser, button) => {
    //click the button
    browser.click(selectors[button])
    //verify the display if NOT a special operator
    //if the button is one of the listed 'special operators' we'll just end our function now.
    if (button === '=' || button === '%' || button === '+/-')
        return
    //if the button clicked is not a number or decimal, we handle it a little differently.
    if (isNaN(parseInt(button)) && button !== '.') {
        //current display is returned to 0
        currentDisplay = '0'
        browser.expect.element(selectors['result']).text.to.equal('0')
    }
    else {
        //if the current display is 0, the button clicked will replace it, unless the button is a period.
        if (currentDisplay === '0' && button !== '.')
            currentDisplay = button
        //otherwise, the button clicked is appended to the current display
        else
            currentDisplay += button
        //either way, now we can check the updated display
        browser.expect.element(selectors['result']).text.to.equal(currentDisplay)
    }
}

module.exports = {
    uiChecker: uiChecker,
    buttonClicker: buttonClicker
}