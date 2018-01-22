const selectors = require('../../test_data/selectors')

module.exports = {
    beforeEach: browser => {
        browser.url('http://localhost:3000')
    },

    after: browser => {
        browser.end()
    },

    '3*2=6': browser => {
        browser
            .click(selectors.numButtons.three)
            .expect.element(selectors.display.result).text.to.equal('3')
        browser
            .click(selectors.cmdButtons.multiply)
            .expect.element(selectors.display.result).text.to.equal('0')
        browser
            .click(selectors.numButtons.two)
            .expect.element(selectors.display.result).text.to.equal('2')
        browser
            .click(selectors.cmdButtons.equals)
            .expect.element(selectors.display.result).text.to.equal('6')
    }
}