
## Nightwatch Introduction

**The Plan**

You will, rotating through one piece at a time, build a set of automated tests to cover the requirements and acceptance criteria.  These can be found below.  For each step in the project, you will use the corresponding folder in the `nightwatch` folder.
**IMPORTANT** You will run your tests for each test with `npm run step#` where # is the number of the step you're on.  `npm run step1`, `npm run step2`, etc.

* **[Setup and Requirements](https://github.com/devmtn-aj/nightwatch-introduction-part1#setup-and-requirements)** - READ.
> Read through the [requirements](https://github.com/devmtn-aj/nightwatch-introduction-part1#requirements) and the acceptance criteria.  These will give context to what you should be looking for when you test.  Click around in the calculator.  Make sure you understand how it works - THEN you can get started in automating tests.

* **[Step 1](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-1)** `nightwatch/step1`
> This will cover creating a test case using NightwatchJS

* **[Step 2](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-2)** `nightwatch/step2` - This will refactor that test using a separate file for selectors

* **Step 3** `nightwatch/step3` - **UNDER CONSTRUCTION** We will create a function that will check the UI of the calculator, and another to click buttons

* **Step 4** `nightwatch/step4` - **UNDER CONSTRUCTION** This will introduce a data file, and another test

* **For Step 5** `nightwatch/step5` - **UNDER CONSTRUCTION** Now we will create a function that will run a full test for us

## Setup and Requirements

### Setup

To begin, fork and clone this repository. Once it has finished downloading `cd` into the project root and run `npm i` to fetch the project dependencies. After they are fetched run `npm start` and a browser window will open at `http://localhost:3000` displaying a (fully functional) calculator app.

### The Format

Every step is in a separate folder.  Look in the file explorer of the project, and compare it to the file tree below.  (Some of this is under construction, but this is what your starting file structure in the nightwatch folder will look like)

<details>

<summary> File Tree </summary>

```
Nightwatch-Introduction
|
`--nightwatch
|  |--step1
|  |  `--tests
|  |     `--tests.js
|  |--step2
|  |  `--tests
|  |     `--tests.js
|  |--step3
|  |  |--supporting
|  |  |  `--selectors.js
|  |  `--tests
|  |     `--tests.js
|  |--step4
|  |  |--supporting
|  |  |  |--functions.js
|  |  |  `--selectors.jstests
|  |  `--tests
|  |     `--tests.js
|  `--step5
|     |--supporting
|     |  |--data.js
|     |  |--functions.js
|     |  `--selectors.js
|     `--tests
|        `--tests.js
|--node_modules
|--public
........
```

</details>

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


## Step 1

### Summary

For this assignment, we will forgo the need of formal test plans and test cases in JIRA.  Instead, we should come up with a consistent set of steps we can use in our testing.  The fact that this is a single page application makes things a lot simpler in that regard - one set of steps can fulfill our needs.  We'll take those and write a simple automated test.

### Instructions

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
//In nightwatch, tests are "properties" of the exported "test object", and the name of the test
//is the property's "key" while the test function is the "value".
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
> This will literally click whatever element the selector provided identifies, just as if we had clicked manually.

`.expect.element().text.to.equal()`
> A combination of functions, technically, all you really need to know is that the `.element()` part needs a selector, from which it will pull the text value.  The `.equal()` needs the value we expect to find in the element's text.  I.e. `.expect.element('span[name="result"]').text.to.equal('4')`
> This is an 'assertion', similar to `.assert` or `.verify` commands.  We use these to check and make sure results are as expected.  In this case, to check if the text contained within an element matches what we think it should be.
> Note: while you can chain `.click()`s and other functions one after another without having to type `browser` again, an `.expect` of any sort ends the chain.  Also, if an `.expect` fails, the test is marked failed, and all remaining steps are skipped.

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

### Code Solution

<details>

<summary> <code> tests.js </code> </summary>

```js
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
```

</details>

## Step 2

### Summary

Now that we've written a basic test and seen it run, now we can start to structure our test a little more clearly.  Here, we'll be using the `step2` folder inside of the `nightwatch` folder to define our selectors in one file, where they can be defined once and used multiple times.  This is much easier to use and much more maintainable.

### Instructions

* Create a folder for supporting files, I'm calling mine `supporting` this time.
* Inside of that folder, create a `selectors.js` file, and export an object containing all the selectors you may need for your tests.
* Require that object in your `tests.js` file, and refactor your original test to use the new selectors.

<details>

<summary> Detailed Instructions </summary>

First we need to create the `supporting` folder, inside of the `step2` folder, which is inside of the repository's `nightwatch` folder.  Then we can create the `selectors.js` file and start working with it.

In that `selectors.js` file we'll export our selectors object.

```js
module.exports = {

}
```

It's as simple as that.  Now we just need to populate the object with properites, where the key is the name of the selector, and the value is the selector itself.  I'm using the button's text to name my selectors personally.

The good news is that you already know how to build your selectors, `tag[attributeName=attributeValue]`.  We even had a few already in our last test.  So go out and start grabbing tags and attributes to build your selectors for all of the buttons in the calculator, and the display.

You can see how I got started below:

```js
module.exports = {
	'0' : 'button[name="0Button"]',
	'1' : 'button[name="1Button"]',
	//....
	'+/-' : 'button[name="negativeButton"]',
	//etc.
}
```

You get the idea.

With these selectors in our selector file, we can then require them in our `tests.js` file, back in the `tests` folder of `step2`.  It's already prepopulated with everything from `step1`, we just need to require the selectors now.

```js
//I'm making this a constant, so I don't accidentally change my selectors, 
//and then my require function uses the path from the tests.js file to the selectors file.
const selectors = require('../supporting/selectors')

module.exports = {
    beforeEach : browser => {
        browser.url('http://localhost:3000')
    },
```

That constant, `selectors`, in the `tests.js` file, now has assigned to it the object exported from our `selectors.js` file.  In other words, it has ALL the selectors we defined over there as its properties.

Now we're prepared to refactor our original `'2+2=4'` test with the selectors from our selectors file.  We can do this by replacing any of the plain string selectors (i.e. `'button[name="2Button"]'`) with a selector we defined in our `selectors.js` file.  We can access these by using the properties  on the `selectors` constant in the `tests.js` file (i.e. `selectors['2']`).

Here's an example of how I could do that.

```js
    '2+2=4' : browser => {
        //I click all the appropriate buttons and check the display for the appropriate results, per the steps of my test case
        browser
            .click(selectors['2'])
            .expect.element(selectors['result']).text.to.equal('2')
        browser
            .click(selectors['+'])
			.expect.element(selectors['result']).text.to.equal('0')
		//...
```

Now, after replacing all the string selectors with those from our `selectors.js` file, I can run my tests using the command `npm run step2` this time, with the following result:

<img src="https://raw.githubusercontent.com/devmtn-aj/nightwatch-introduction/solution/readme-assets/step1Results.png"/>

</details>

### Code Solution

<details>

<summary> <code> selectors.js </code> </summary>

```js
module.exports = {
    '0' : 'button[name="0Button"]',
    '1' : 'button[name="1Button"]',
    '2' : 'button[name="2Button"]',
    '3' : 'button[name="3Button"]',
    '4' : 'button[name="4Button"]',
    '5' : 'button[name="5Button"]',
    '6' : 'button[name="6Button"]',
    '7' : 'button[name="7Button"]',
    '8' : 'button[name="8Button"]',
    '9' : 'button[name="9Button"]',
    '+' : 'button[name="addButton"]',
    '-' : 'button[name="subtractButton"]',
    '*' : 'button[name="multiplyButton"]',
    '/' : 'button[name="divideButton"]',
    '=' : 'button[name="equalsButton"]',
    '%' : 'button[name="percentButton"]',
    '+/-' : 'button[name="negativeButton"]',
    'AC' : 'button[name="clearButton"]',
    '.' : 'button[name="decimalButton"]',
    'result' : 'span[name="result"]'
}
```

</details>

<details>

<summary> <code> tests.js </code> </summary>

```js
const selectors = require('../supporting/selectors')

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
            .click(selectors['2'])
            .expect.element(selectors['result']).text.to.equal('2')
        browser
            .click(selectors['+'])
            .expect.element(selectors['result']).text.to.equal('0')
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

## Step 3

Step 3 will be all about using functions to make life a little easier.  We'll introduce that next week...

## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
