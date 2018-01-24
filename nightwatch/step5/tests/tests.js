const selectors = require('../supporting/selectors')
const functions = require('../supporting/functions')
const data = require('../supporting/data')

module.exports = {
    beforeEach: browser => {
        browser.url('http://localhost:3000')
        functions.buttonClicker(browser, 'AC')
    },
    after: browser => {
        browser.end()
    },
    'UI Check': browser => functions.uiChecker(browser),
    '2+2=4': browser => functions.testRunner(browser, data.simpleAddition),
    '32.1*2=64.2': browser => functions.testRunner(browser, data.decimalMultiplication),
    'otherButtons': browser => functions.testRunner(browser, data.otherButtons),
    '35/7=5': browser => functions.testRunner(browser, data.simpleDivision)
}