const selectors = require('../supporting/selectors')
const functions = require('../supporting/functions')

module.exports = {
    beforeEach : browser => {
        browser.url('http://localhost:3000')
    },
    after : browser => {
        browser.end()
    },
    'UI Check' : browser => functions.uiChecker(browser),
    '2+2=4' : browser => {
        //I click all the appropriate buttons and check the display for the appropriate results, per the steps of my test case
        browser
            .click(selectors['2'])
            .expect.element(selectors['result']).text.to.equal('2')
        browser
            .click(selectors['+'])
            .expect.element(selectors['result']).text.to.equal('0')
        browser
            .click(selectors['2'])
            .expect.element(selectors['result']).text.to.equal('2')
        browser
            .click(selectors['='])
            .expect.element(selectors['result']).text.to.equal('4')
    },
    '32.1*2=64.2' : browser => {
        functions.buttonClicker(browser, '3')
        functions.buttonClicker(browser, '2')
        functions.buttonClicker(browser, '.')
        functions.buttonClicker(browser, '1')
        functions.buttonClicker(browser, '*')
        functions.buttonClicker(browser, '2')
        functions.buttonClicker(browser, '=')
        browser.expect.element(selectors['result']).text.to.equal('64.2')
    }
}