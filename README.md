
## Nightwatch Introduction

**Setup**

To begin, fork and clone this repository. Once it has finished downloading `cd` into the project root and run `npm i` to fetch the project dependencies. After they are fetched run `npm start` and a browser window will open at `http://localhost:3000` displaying a (fully functional) calculator app. In another terminal window run `npm test` to run the test suite.

**The Plan**

You will, rotating through one piece at a time, build a set of automated tests to cover the requirements and acceptance criteria.  These can be found below.  For each step in the project, you will use the corresponding folder in the `nightwatch` folder.

### Requirements

#### Basic Functionality

1. The display defaults to '0'
1. When numbers are keyed, the appropriate number appears on the display.  Subsequent numbers will be appended to the existing display, and no leading zeros will be included.
   * Pressing "1", "2", "0" the resulting display will be "120"
1. One decimal can be added to the number.  Only the first decimal click will be accepted.
1. When a mathematical operator is selected, the display will display a '0' until the subsequent number in the calculation is entered.
   * Pressing "1", "+" will result in a "0" on the display
1. Mathematical operations are completed appropriately when the "=" button is selected
   * Pressing "1", "+", "2", "=" will result in a "3" on the display

#### Additional Functionality

1. "+/-" is a key which will flip the positive/negative value of the current number
   * If "2.5" is displayed and "+/-" is selected, "-2.5" will be displayed and used in calculations instead
1. "%" will divide a number by 100 -- showing "decimal notation" for the percentage
   * If "81" is on the screen and the "%" button is selected, "0.81" will be displayed and used in future calculations
1. "A/C" will clear all pre-existing calculations and start fresh from an empty "0" display

#### Acceptance Criteria

1. The buttons should appear in an order and configuration consistent with most simple calculators
1. Complex chains of calculations should be possible
   * 12 + 2 / 42 - 3, take the result and continue, '%' * 530, etc
   * At least one test should be completed with a set of at least 40 button presses 


### Step 1

**Summary**

For this assignment, we will forgo the need of formal test plans and test cases in JIRA.  Instead, we should come up with a consistent set of steps we can use in our testing.  The fact that this is a single page application makes things a lot simpler in that regard - one set of steps can fulfill our needs.  We'll take those and write a simple automated test.

**Instructions**

* Outline an acceptable set of steps to check whether the calculator can perform calculations provided in a test case
* The test case would consist of the calculation to perform, and the expected result
* Create one simple test in the `step1/tests/test.js` file.
* You can use plain strings for your `selectors` (i.e. `'button[name="equalsButton"]'` instead of something like `selectors.buttons.equal`)

<details>

<summary> Detailed Instructions </summary>

Based on the above rules, an effective set of test steps would be something like the following:

> 1. Click the listed buttons in sequence 
> 1. The display should update correctly after each button press

Super simple, but it would get the job done.

A matching test case could be like the following:

> **Precondition**: Open the calculator.  The calculation for the test is 2+2
> **Postcondition**: The displayed result is 4

Simplicity at its best, right?

Your `test.js` file already exists in the `nightwatch/step1/tests` folder, and is configured with its `beforeEach`, `after`, etc.  Now you can add a test.  You can start is with something like the following:

```js
//In nightwatch, tests are "properties" of the exported "test object", and the name of the test is the property's "key" while the test function is the "value".
'2+2=4' : browser => {
	
}
```

Populating the test ought to be fairly straightforward.  We need to click buttons, then read the finish.  Use the **Inspector** tool in Google Chrome to build your selectors.  Remember when building your selector that any CSS selector will work (you can get more info [here](https://www.w3schools.com/cssref/css_selectors.asp) on building selectors), but the ones that follow a `tag[attributeName=attributeValue]` format are the most effective in my experience.  These will help Nightwatch EXACTLY what element (item in the page) to interact with.  For any test, you need selectors for anything you interact with, as well as anything you need to read/verify.  If I were going to pull selectors from this project, for the test case listed above, they'd probably be:

* `'button[name="2Button"]'`
* `'button[name="addButton"]'`
* `'button[name="equalsButton"]'`
* `'button[name="4Button"]'`
* `'span[name="result"]'`

Now I have all I need to automate a test.

1. A test case that includes data
1. A test procedure / test steps
1. Selectors

Using `NightwatchJS` functions to write this test out, I should only need two.  `.click()` and `.expect.element().text.to.equal()`.  Both are properties of the `browser` object and work as follows:

`.click()`
> Only needs a selector as an argument, i.e. `.click('button[name="equalsButton"]')`

`.expect.element().text.to.equal()`
> A combination of functions, technically, all you really need to know is that the `.element()` part needs a selector, from which it will pull the text value.  The `.equal()` needs the value we expect to find in the element's text.  I.e. `.expect.element('span[name="result"]').text.to.equal('4')`
> Note: while you can chain `.click()`s and other functions one after another without having to type `browser` again, an `.expect` of any sort ends the chain.

Using these two bits of functionality from Nightwatch, I can write the simple test below.

```js
//In nightwatch, tests are "properties" of the exported "test object", and the name of the test is the property's "key" while the test function is the "value".
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
```

After I've saved this test, I can run the `step1` tests using the command `npm run step1`.  Your results should look like this:

<img src="https://raw.githubusercontent.com/devmtn-aj/nightwatch-introduction/solution/readme-assets/step1Results.png"/>

If you have any errors to debug, you can do so... You can also check your code against the solution below.

</details>

<details>

<summary> **Code Solution** </summary>

<details>

<summary> <code> tests.js </code> </summary>

```js
module.exports = {
    beforeEach : browser => {
        browser.url('http://localhost:3000')
    },
    after : browser => {
        browser.end()
    },'2+2=4' : browser => {
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
```

</details>

</details>

## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
