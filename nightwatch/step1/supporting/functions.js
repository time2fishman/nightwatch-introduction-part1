const selectors = require('./selectors')

/**
 * uiCheck looks over the UI of the calculator to make sure all needed buttons and fields are visible.
 * 
 * @param {object} browser browser : this is a nightwatch control object ('browser' or 'client' normally)
 */
const uiCheck = browser => {
    Object.getOwnPropertyNames(selectors).forEach(item => {
        browser.expect.element(selectors[item]).to.be.visible;
    });
}
var currentDisplay //default what the display should appear as to nothing
/**
 * pressButton clicks the button and checks the resulting display to make sure it's accurate.  In the case that the button is the '=', '+/-' or '%' buttons, it does not verify the display
 * 
 * @param {object} browser browser : this is a nightwatch control object ('browser' or 'client' normally)
 * @param {string} button button is the string key of the button to click ('+/-', '0', '1', '2', '*', etc)
 */
const pressButton = (browser, button) => {
    //by default the calculator should display '0'
    let expectedText = '0'
    //if the number IS a number, set or add to the 'currentDisplay' and expect that result
    if(!isNaN(parseInt(button))){
        if(currentDisplay)
            currentDisplay+=button
        else
            currentDisplay=button
        expectedText = currentDisplay
    }
    //otherwise, blank the 'currentDisplay'
    else{
        currentDisplay=null
    }
    browser.click(selectors[button])
    if (button !== '=' && button !== '%' && button !== '+/-') //we don't check the result display for the '=', '+/-' or '%' buttons
        browser.expect.element(selectors['result']).text.to.equal(expectedText) //check anticipated displayed result
}

/**
 * runTest will take a test object containing a set of buttons to click, and an anticipated result, and check all of them appropriately
 * 
 * @param {object} browser browser : this is a nightwatch control object ('browser' or 'client' normally)
 * @param {object} test test : this is an object with an array of clicks, and an expected result { clicks : [], result : '' }
 */
const runTest = (browser, test) => {
    test.clicks.forEach(click=>{ //uses pressButton to click every button in the test's 'click' array
        pressButton(browser, click)
    })
    browser.expect.element(selectors['result']).text.to.equal(test.result) //checks the test's result
}

module.exports = {
    uiCheck: uiCheck,
    pressButton: pressButton,
    runTest: runTest
}