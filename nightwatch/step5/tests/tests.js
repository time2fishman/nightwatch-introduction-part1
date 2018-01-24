const selectors = require('../supporting/selectors')
const functions = require('../supporting/functions')
const data = require('../supporting/data')

module.exports = {
    beforeEach : browser => {
        browser.url('http://localhost:3000')
        functions.buttonClicker(browser, 'AC')
    },
    after : browser => {
        browser.end()
    },
    'UI Check' : browser => functions.uiChecker(browser),
    '2+2=4' : browser => {
        //I click all the appropriate buttons and check the display for the appropriate results, per the steps of my test case
        functions.buttonClicker(browser, data.simpleAddition.buttons[0])
        functions.buttonClicker(browser, data.simpleAddition.buttons[1])
        functions.buttonClicker(browser, data.simpleAddition.buttons[2])
        functions.buttonClicker(browser, data.simpleAddition.buttons[3])
        browser.expect.element(selectors['result']).text.to.equal(data.simpleAddition.solution)
    },
    '32.1*2=64.2' : browser => {
        functions.buttonClicker(browser, data.decimalMultiplication.buttons[0])
        functions.buttonClicker(browser, data.decimalMultiplication.buttons[1])
        functions.buttonClicker(browser, data.decimalMultiplication.buttons[2])
        functions.buttonClicker(browser, data.decimalMultiplication.buttons[3])
        functions.buttonClicker(browser, data.decimalMultiplication.buttons[4])
        functions.buttonClicker(browser, data.decimalMultiplication.buttons[5])
        functions.buttonClicker(browser, data.decimalMultiplication.buttons[6])
        browser.expect.element(selectors['result']).text.to.equal(data.decimalMultiplication.solution)
    },
    'otherButtons' : browser => {
        functions.buttonClicker(browser, data.otherButtons.buttons[0])
        functions.buttonClicker(browser, data.otherButtons.buttons[1])
        functions.buttonClicker(browser, data.otherButtons.buttons[2])
        functions.buttonClicker(browser, data.otherButtons.buttons[3])
        functions.buttonClicker(browser, data.otherButtons.buttons[4])
        functions.buttonClicker(browser, data.otherButtons.buttons[5])
        functions.buttonClicker(browser, data.otherButtons.buttons[6])
        functions.buttonClicker(browser, data.otherButtons.buttons[7])
        functions.buttonClicker(browser, data.otherButtons.buttons[8])
        browser.expect.element(selectors['result']).text.to.equal(data.otherButtons.solution)
    }
}