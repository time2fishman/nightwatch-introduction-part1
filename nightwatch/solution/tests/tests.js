const data = require('../supporting/data')
const selectors = require('../supporting/selectors')
const functions = require('../supporting/functions')

module.exports = {
    beforeEach : browser => {
        browser.url('http://localhost:3000')
    },
    after : browser => {
        browser.end()
    },
    '2+2=4' : browser => {
        //I click all the appropriate buttons and check the display for the appropriate results, per the steps of my test case
        browser
            .click('button[name="2Button"]')
            .expect.element('span[name="result"]').text.to.equal('2')
        browser
            .click('button[name="addButton"]')
            .expect.element('span[name="result"]').text.to.equal('0')
        browser
            .click('button[name="2Button"]')
            .expect.element('span[name="result"]').text.to.equal('2')
        browser
            .click('button[name="equalsButton"]')
            .expect.element('span[name="result"]').text.to.equal('4')
    },
    'Check the page loads correctly' : browser => {
        functions.uiCheck(browser)
        browser.expect.element(selectors['result']).text.to.equal('0')        
    },
    'Check that simple math works' : browser => {
        browser
            .click(selectors['2'])
            .click(selectors['+'])
            .click(selectors['3'])
            .click(selectors['='])
            .expect.element(selectors['result']).text.to.equal('5')
    },
    'Check division' : browser => {
        functions.pressButton(browser, '5')
        functions.pressButton(browser, '*')
        functions.pressButton(browser, '3')
        functions.pressButton(browser, '=')
        browser.expect.element(selectors['result']).text.to.equal('15')
    },
    'Check test1' : browser => functions.runTest(browser, data.test1),
    'Check test2' : browser => functions.runTest(browser, data.test2)
}