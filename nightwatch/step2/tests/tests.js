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
    }
}