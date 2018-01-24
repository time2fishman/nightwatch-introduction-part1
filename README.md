
# Nightwatch Introduction

## Outline and Overview

We have here a basic calculator app that you will be utilizing to start your test automation career.  NightwatchJS is our automation framework of choice, and step by step you will become familiar with the process of automating tests.  One step at a time we'll build a set of automated tests to cover the requirements and acceptance criteria, which can be found below.  For each step in the project, you will use the corresponding folder in the `nightwatch` folder.

**IMPORTANT** You will run your tests for each test with the command `npm run step#` where # is the number of the step you're on.  (`npm run step1`, `npm run step2`, etc.)

**ALSO IMPORTANT** You need to start the application before running tests, use the command `npm start` to do so.

* **[Setup and Requirements](https://github.com/devmtn-aj/nightwatch-introduction-part1#setup-and-requirements)** - READ.
> Read through the [requirements](https://github.com/devmtn-aj/nightwatch-introduction-part1#requirements) and the acceptance criteria.  These will give context to what you should be looking for when you test.  Click around in the calculator.  Make sure you understand how it works - THEN you can get started in automating tests.

* **[Step 1](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-1)** `nightwatch/step1`
> This will cover creating a test case using NightwatchJS

* **[Step 2](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-2)** `nightwatch/step2`
> This will refactor that test using a separate file for selectors

* **[Step 3](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-3)** `nightwatch/step3`
> We will create a function that will check the UI of the calculator, and another to click buttons

* **[Step 4](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-4)**
> This will introduce a data file, and another test using the new format

* **[Step 5](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-5)**
> With all the groundwork laid, we'll reach the end goal of our automation, a test runner that tests for us!

***

## Setup and Requirements

### Setup

To begin, fork and clone this repository. Once it has finished downloading `cd` into the project root and run `npm i` to fetch the project dependencies. After they are fetched run `npm start` and a browser window will open at `http://localhost:3000` displaying a (fully functional) calculator app.

* You will need to write up a `nightwatchProps.js` file, or copy one from another repository if you already have one.  There are some detailed instructions below on setting one up.

<details>

<summary> <code> nightwatchProps.js </code> </summary>

<br />

In this file we'll store the path to the `testing-resources` folder you created before, as well as the filenames for your `seleniumServer` and `chromedriver`.  **MAKE SURE** the version on your Selenium server matches the version on *your* machine.  Also the resource path needs to be to *your* testing resources folder, not to mine.

```js
module.exports = {
    resourcePath : "/Users/ajlarson/src/testing-resources/",
    seleniumServer: "selenium-server-standalone-3.6.0.jar",
    chromedriver: "chromedriver"
}
```

Note: For Windows computers, you have a different pathing format, so your `resourcePath` will look something like:
```js
    resourcePath : "C:\\Users\\AJ\\src\\testing-resources\\"
```
Note2: Also for Windows, your `chromedriver` listing needs to be `chromedriver.exe`
```js
    chromedriver: "chromedriver.exe"
```

</details>

### The Format

Every step is in a separate folder.  Look in the file explorer of the project, and compare it to the file tree below.  (Some of this is under construction, but this is what your starting file structure in the nightwatch folder will look like, before you've done ANY work)

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
|--etc.
|--etc.
```

</details>

***

### Requirements For The Calculator

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


Now that we have setup out of the way, and you've had a chance to review the app's requirements, we can start in on actually testing it.

***

## Step 1

### Summary

For this assignment, we will forgo the need of formal test plans and test cases in JIRA.  Instead, we should come up with a consistent set of steps we can use in our testing.  The fact that this is a single page application makes things a lot simpler in that regard - one set of steps can fulfill our needs.  We'll take those and write a simple automated test.

### Instructions

* Outline an acceptable set of steps to check whether the calculator can perform calculations provided in a test case
* The test case would consist of the calculation to perform, and the expected result
* Create one simple test in the `step1/tests/tests.js` file.
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

Your `tests.js` file already exists in the `nightwatch/step1/tests` folder, and is configured with its `beforeEach`, `after`, etc.  Now you can add a test to the exported object as a new property, like below:

```js
//In nightwatch, tests are "properties" of the exported "test object", and the name of the test
//is the property's "key" while the test function is the "value".
'2+2=4' : browser => {
	
}
```

Remember, in objects, you have comma separated properties, and each property is comprised of a key and a value.  So in our test object `'2+2=4'` is now the key of a new property, and `browser => {}` is the value of the new property.

Populating this new test ought to be fairly straightforward.  We need to click the buttons, then read the final solution.  Use the **Inspector** tool in Google Chrome to build your selectors.  Remember when building your selector that any CSS selector will work (you can get more info [here](https://www.w3schools.com/cssref/css_selectors.asp) on building selectors), but the ones that follow a `tag[attributeName=attributeValue]` format are the most effective in my experience.  These will help Nightwatch know EXACTLY what element (item in the page) to interact with.  For any test, you need selectors for anything you interact with, as well as anything you need to read/verify.  If I were going to pull selectors from this project, just for the test case listed above, they'll be for the `2`, `4`, `+` and `=` buttons.

<details>

<summary> Selectors for Step 1 </summary>

* `'button[name="2Button"]'`
* `'button[name="addButton"]'`
* `'button[name="equalsButton"]'`
* `'button[name="4Button"]'`
* `'span[name="result"]'`

</details>

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
            .click(selectors['2'])
            .expect.element(selectors['result']).text.to.equal('2')
        browser
            .click(selectors['='])
            .expect.element(selectors['result']).text.to.equal('4')
    }
}
```

</details>

## Step 3

### Summary

An important step to testing any application is to look over its UI.  While it is possible to check EVERYTHING, from physical location, to what CSS attributes an element has, we'll just get into the habit of testing the UI by checking to see that all the elements we expect to be able to interact with are present and accounted for.  

There will be one other function we'll write that will click a button and check the expected result for us.  This can reduce the amount of code we're writing for now.

### Instructions

* Write a function that will look over the UI of the application
* Presence, visibility, and text should be verified
* This function should be executed before any other tests are run
* Then we'll tackle the button clicker

<details>

<summary> Detailed Instructions </summary>

In Step 2 you created a new `supporting` folder for your `selectors.js` file.  You may have named them something else, but that's the same folder we'll use to create a `functions.js` file.  Model it's initial setup after your `selectors.js` file, meaning we'll use the `module.exports` format to export an object that will eventually contain our functions.  I won't be showing you that part of the code specifically in this step, I want you to be able to find it and write it yourself.

Now that we have somewhere to put our new functions, we'll look at the UI checker first.  We should do the following:
1. Check every button for visibility
1. Check every button for the text it ought to be displaying
1. Check the display for visibility and its default text

As I said in the summary, we can do more, but this is a GREAT start for our automated test.  So considering what we want our function to do, we'll need to figure out if we need any inputs/arguments, and if it needs to output/return anything.
1. We'll need the selectors for all of the buttons and the display
   * The good news here is that you gathered these in Step 2.  We can either pass them in when the function is called, or just require them and make them available to the whole functions file.  We'll do the latter.
1. We need the text for each button and the default displayed text
   * Since we're not going to be using these anywhere else, I'm happy to just define them right there in the function for now.
1. We need to pass or fail the UI check
   * The easiest way for us to do this will be to pass our function the `browser` object we've been using with Nightwatch, so that we can write our `expect` statements right in the function and it will pass or fail right there.

Now that we've identified what our function is going to do (check the buttons and display for visibility and displayed text), arguments it needs (the `browser`), and what it returns (nothing in this case), we can get writing.  We'll comment this function before we write it.  There is a format of comment called JSDoc that generates the popup prompt for us to use every time the function is called.  Not only does it explain what the function does, but it makes sure we (or any other developer using our function) knows how to use it correctly.

There are some great [docs on GitHub](https://github.com/shri/JSDoc-Style-Guide) for JSDoc.

To start, we'll open the comment explaining our function with `/** */` - you can see it's like a regular block comment, but has an extra asterisk right at the start.  Inside the opening and closing marks there we can explain what our function does.  Note:  Put this up at the top of the `functions.js` file, outside of the exported object.  We'll add our function to the export a bit later.

```js
/**
 * Looks over the UI to make sure needed elements are visible and displaying the right text.  (Buttons and the display)
 */
```

This will already give a bit more info when anyone wants to use the function in their test, but we'll go a step further.  We can use the `@param` syntax that JSDoc takes advantage of to make sure anyone using the function knows what parameters or arguments are needed... In this case, it's an `{object}`, the `browser`.

```js
/**
 * Looks over the UI to make sure needed elements are visible and displaying the right text.  (Buttons and the display)
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 */
```

For us, this is all we'll need for our JSDoc comment, since there are no other arguments and nothing is being returned.  Now we can start our function.  We're going to make it a `const` named `uiChecker`.  When we're done, we'll add it to the object being exported from the `functions.js` file.

```js
/**
 * Looks over the UI to make sure needed elements are visible and displaying the right text.  (Buttons and the display)
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 */
const uiChecker = browser => {

}
```

Since the function is declared right after we close the JSDoc comment, our code editor knows to match the comment to this function.  Now let's comment out in our function what we need to do so we don't forget.

```js
const uiChecker = browser => {
    //check elements for visibility
    
    //check elements for displayed text

}
```

Oh!  If we're going to check our elements, we need selectors!  We can't forget those.  At the very top of our file (just like we do in our test files) we'll use `require` to grab those selectors.

```js
const selectors = require('./selectors')
```

Because the `selectors.js` file is in the same `supporting` folder as our `functions.js` file, we can use `'./selectors'` for the require, where the `./` is telling the require statement we're just looking in the folder we're already in.

Now that we have our selectors available, we can actually start populating our function with the checks!  There are two ways we could go about this.
1. Check each element manually
1. Loop through all elements in the selectors file

I'm not going to loop through these selectors; where we are going to be defining the text to check for each manually, we'll need to write out a line or two for each anyway.

Let's get to it! `//check elements for visibility` was our first reminder, so let's write a `browser.expect` statment for each element to check that they are all visible!  You can always review the [NightwatchJS API Docs](http://nightwatchjs.org/api) (which I recommend) but I'll tell you this time, it's `browser.expect.element().to.be.visible`.  I'll give you a few examples below to get you started.

```js
    browser.expect.element(selectors['0']).to.be.visible
    browser.expect.element(selectors['1']).to.be.visible
    // and so on through all the buttons until you get to the end
    browser.expect.element(selectors['result']).to.be.visible
```

The next point is to `//check elements for displayed text` - again I'll give you just a few to get started.  This should be familiar  stuff as well (`browser.expect.element().text.to.equal()`).  The thing to remember here is just that we're setting the expected text manually, not pulling it from an external file.

```js
    browser.expect.element(selectors['0']).text.to.equal('0')
    browser.expect.element(selectors['1']).text.to.equal('1')
    // and so on through all the buttons until you get to the end
    browser.expect.element(selectors['result']).text.to.equal('0')
```

With our function checking visibility and the displayed text, we're good to go.  Let's add this to our exported object, and bring it into our test!

Remember how we assigned the function to the constant `uiChecker`?  We're going to make the value of a property on the exported object equal to `uiChecker`.  See below:

```js
module.exports = {
    uiChecker: uiChecker
}
```

Looks kind of funny right?  This is literally saying, "Set the property uiChecker = to some variable or constant that exists already and is named uiChecker."  Saying `billyBob: uiChecker` would work too, and might be a little clearer in some ways, but would be more confusing in others.

Now we can require the functions file in our `tests.js` file.

```js
const functions = require('../supporting/functions')
```

All that's left to do for this function is to create a new test, preferably the first test that runs.  This is so that if the UI is totally broken, we skip the rest of the tests on Nightwatch's current configuration.

We'll create the new test right after the `after` function is declared, and before the first custom test (one with a string name) is declared.

```js
    after : browser => {
        browser.end()
    },
    'UI Check' : browser => functions.uiChecker(browser),
    '2+2=4' : browser => {
```

Now lets run the test using `npm run step3`, and see how we do!

<img src="https://raw.githubusercontent.com/devmtn-aj/nightwatch-introduction/solution/readme-assets/step1Results.png"/>

I'm only showing the very end, but you can see that adding the `UI Check` test, which was really just running our `uiChecker()` function, we added 40 new assertions!  Good work.

With our first function out of the way, we can try one that's a little less striaghtforward.  This is the function that clicks a button and verifies the display.

*What follows for Step 3 is a stretch goal.*  It's pretty intensive compared to the code we've looked at so far.  Feel free to play with it, but I won't be going into too much detail on all of the steps.

<details>

<summary> <code> buttonClicker </code> Stretch Goal </summary>

```js
/**
 * Clicks a button and checks that the resulting display is correct.
 * If the button clicked is a '=', we won't check the result in this function. 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {string} button      the key of the button to click (corresponds to the keys in selectors.js)
 */
```

If you can read the above, you can see that this function will take a browser and a button as inputs.  With no `@return` defined, we know we won't bother returning any information either.

We can fully declare the function, as a constant again, and we'll give it a very creative name...

```js
/**
 * Clicks a button and checks that the resulting display is correct.
 * If the button clicked '=', we won't check the result in this function.
 * As the function won't reset with the test, we should click the clear button before each test
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {string} button      the key of the button to click (corresponds to the keys in selectors.js)
 */
const buttonClicker = (browser, button) => {
    //click the button

    //set the expected display per the requirements, and check it
    
}
```

Before we forget, we'll update our `beforeEach` in `tests.js` to call this function and click the 'AC' button.

```js
    beforeEach : browser => {
        browser.url('http://localhost:3000')
        functions.buttonClicker(browser, 'AC')
    },
```

We can set up the button click portion pretty easily.  Remember how we required the `selectors.js` export into `functions.js` earlier?  We only need to use Nightwatch's `.click()` function for that step.  The important thing here is that we'll use the selector named by the `button` parameter, which is defined as needing to be a key from that file anyway ('0', 'AC', etc).

```js
    //click the button
    browser.click(selectors[button])
```

That takes care of that.  Now to verify the display.  To do this, the first thing we need to do is have something that will track the display between button clicks (since hitting multiple numbers in a row can create a long string of numbers in the display, we can't just check one number at a time).  We'll do this by declaring a variable in the functions file (probably right above the JSDoc for `buttonClicker`) called `currentDisplay` and set it to `'0'`.

```js
// keeps track of the number on the calculator display screen based
// on button clicks
var currentDisplay = '0'
```

Now we'll evaluate the button for each of the values, and set the display appropriately.  We'll use a `switch` statement to do this.  In brief, switch statements take the value in the `()` and looks through the `case X:` statements for a match, running the matching code.
* I've updated the comments for what each `case` should do, you can fill it out and then compare it to the actual below.

```js
    //set the expected display per the requirements, and check it
    switch (button) {
        case 'AC': //clear the display (set to 0)

            break
        case '=': //end the function if '='

            break
        case '%': //if the display is not 0, divide it by 100

            break
        case '+/-': //flip the positive/negative status of the number

            break
        case '*': //if the button is any of these 4, default the screen back to 0
        case '/':
        case '+':
        case '-':

            break
        case '.': //if it's a decimal, check that the number doesn't already contain a . - if it does, leave currentDisplay alone,

            break
        default: //for any regular number, update the display appropriately

            break
    }

```

<details>

<summary> <code> cases in detail </code> </summary>

```js
    //set the expected display per the requirements, and check it
    switch (button) {
        case 'AC': //clear the display (set to 0)
            currentDisplay = '0'
            break
        case '=': //end the function if '='
            return
            break
        case '%': //if the display is not 0, divide it by 100
            if (currentDisplay !== '0')
                currentDisplay = (parseFloat(currentDisplay) / 100).toString()
            break
        case '+/-': //flip the positive/negative status of the number
            if (currentDisplay[0] === '-')
                currentDisplay = currentDisplay.substr(1)
            else
                currentDisplay = '-' + currentDisplay
            break
        case '*': //if the button is any of these 4, default the screen back to 0
        case '/':
        case '+':
        case '-':
            currentDisplay = '0'
            break
        case '.': //if it's a decimal, check that the number doesn't already contain a . - if it does, leave currentDisplay alone,
            if (currentDisplay.indexOf('.') === -1) //if there is no decimal, indexOf returns -1
                currentDisplay += '.'
            break
        default: //for any regular number, update the display appropriately
            if (currentDisplay === '0')
                currentDisplay = button
            else
                currentDisplay += button
            break
    }
```

</details>

All that's left now is to compare our expected `currentDisplay` to what's actually in the display

```js
    //now that currentDisplay has been updated appropraitely (matching the requirements) we can 'expect' the result
    browser.expect.element(selectors['result']).text.to.equal(currentDisplay)
```

The resulting function is a little complicated, but it will certainly work.  Finally, we can add the `buttonClicker` function to our exported object.

```js
module.exports = {
    uiChecker: uiChecker,
    buttonClicker: buttonClicker
}
```

We can now write up a new test, using the `buttonClicker`.

In our `tests.js` file, let's create a new test, 32.1*2=64.2.  This will check decimals, multi-digit, and a couple of operators.  We'll call `buttonClicker` for each button press, and then `expect` the proper result.

```js
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
```

This test gave our function a bit of a workout, but it works!  Run the tests again (`npm run step3`)

<img src="https://raw.githubusercontent.com/devmtn-aj/nightwatch-introduction/solution/readme-assets/step3Results.png"/>

You should get something similar to this!  If not, look back over your functions and test, you can also compare the files to the code solution below.

You can also rework your existing test(s) now with the `buttonClicker` function!

</details>

Good work easing into the world of functions - or diving in if you tackled the `buttonClicker`.  In our next step, we'll start incorporating a data file!

</details>

### Code Solution

*Note:* The solutions incorporate the `buttonClicker` stretch goal.

<details>

<summary> <code> functions.js </code> </summary>

```js
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
 * If the button clicked '=', we won't check the result in this function.
 * As the function won't reset with the test, we should click the clear button before each test
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {string} button      the key of the button to click (corresponds to the keys in selectors.js)
 */
const buttonClicker = (browser, button) => {
    //click the button
    browser.click(selectors[button])
    //set the expected display per the requirements, and check it
    switch (button) {
        case 'AC': //clear the display (set to 0)
            currentDisplay = '0'
            break
        case '=': //end the function if '='
            return
            break
        case '%': //if the display is not 0, divide it by 100
            if (currentDisplay !== '0')
                currentDisplay = (parseFloat(currentDisplay) / 100).toString()
            break
        case '+/-': //flip the positive/negative status of the number
            if (currentDisplay[0] === '-')
                currentDisplay = currentDisplay.substr(1)
            else
                currentDisplay = '-' + currentDisplay
            break
        case '*': //if the button is any of these 4, default the screen back to 0
        case '/':
        case '+':
        case '-':
            currentDisplay = '0'
            break
        case '.': //if it's a decimal, check that the number doesn't already contain a . - if it does, leave currentDisplay alone,
            if (currentDisplay.indexOf('.') === -1) //if there is no decimal, indexOf returns -1
                currentDisplay += '.'
            break
        default: //for any regular number, update the display appropriately
            if (currentDisplay === '0')
                currentDisplay = button
            else
                currentDisplay += button
    }
    //now that currentDisplay has been updated appropraitely (matching the requirements) we can 'expect' the result
    browser.expect.element(selectors['result']).text.to.equal(currentDisplay)
}

module.exports = {
    uiChecker: uiChecker,
    buttonClicker: buttonClicker
}

</details>

<details>

<summary> <code> tests.js </code> </summary>

```js
const selectors = require('../supporting/selectors')
const functions = require('../supporting/functions')

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
        functions.buttonClicker(browser, '2')
        functions.buttonClicker(browser, '+')
        functions.buttonClicker(browser, '2')
        functions.buttonClicker(browser, '=')
        browser.expect.element(selectors['result']).text.to.equal('4')
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
```

</details>

## Step 4

### Overview

This may well be the simplest step of the 5...  We're going to refactor our existing tests and write one new one using a data file.

### Instructions

* Create a file `data.js` in your `step4/supporting` folder
* Require this in the `tests.js` file and use it for all your data (inputs, expected results, etc)
* Ideally you can do this without referring to the detailed instructions
* We haven't tested the '%' button yet, or '+/-', so we'll do that in the new test

<details>

<summary> Detailed Instructions </summary>

In practice, you'll set up and call your `data.js` file the same way you set up and called `selectors.js`...

```js
module.exports = {
    //setting it up in data.js
}
```

```js
//adding it to the filed required in tests.js
const selectors = require('../supporting/selectors')
const functions = require('../supporting/functions')
const data = require('../supporting/data')
```

With this framework, we want to create objects in our `data.js` export that contain all the data for one test.  So, in the files prepped already for Step 4, we have two tests, so we'll need two corresponding objects in the `data.js` exported object.  And while our test names before were easily understood, `'32.1*2=64.2'` is a pain to write over and over again.  We'll name the object for our `2+2=4` function `simpleAddition`, and the other `decimalMultiplication`.

```js
module.exports = {
    simpleAddition : {

    },
    decimalMultiplication : {

    }
}
```

Now, each test data object should track all the inputs and the outputs.  For another app this may be more complicated, but for our simple calculator, we have buttons pressed, and expected results.  We don't need to worry about what the display should look like after each button, because our `buttonClicker` function checks those automatically.  We only need to worry about our final solution.  We can add a `buttons` property whose value will be an array of all the buttons to be clicked, and another `solution` property with the expected solution to the calculation.

```js
module.exports = {
    simpleAddition : {
        buttons: [],
        solution: ''
    },
    decimalMultiplication : {
        buttons: [],
        solution: ''
    }
}
```

With the framework in place, we can popluate the buttons and solution accordingly.

```js
module.exports = {
    simpleAddition : {
        buttons: ['2', '+', '2', '='],
        solution: '4'
    },
    decimalMultiplication : {
        buttons: ['3', '2', '.', '1', '*', '2', '='],
        solution: '64.2'
    }
}
```

Now that we have our data file ready to go for our existing tests, we'll refactor them, so that any time they declared an input or expected result, we'll get it from our data file.

For example, the first line of our first test in `tests.js` is:

```js
        functions.buttonClicker(browser, '2')
```

In this example, `'2'` is the declared input, the button to be clicked.  As it's the first button to be clicked in our first test data object in `data.js`, `simpleAddition`, and we've already required the `data.js` export in our `test.js` file, we can replace the `'2'` in this line like so:

```js
        functions.buttonClicker(browser, data.simpleAddition.buttons[0])
```

`data.simpleAddition.buttons[0]` grabs the `data` constant, which is our `data.js` export, then the `simpleAddition` property, which is our test data object, then the `buttons` property, which is the array of our buttons to click, and then `[0]`, the button click that's first in the list.

For the next line, we'll do the same thing, only calling `.buttons[1]` at the end, then so on until we've clicked all the buttons and we check the result.  The final product for our first test will be this:

```js
    '2+2=4' : browser => {
        //I click all the appropriate buttons and check the display for the appropriate results, per the steps of my test case
        functions.buttonClicker(browser, data.simpleAddition.buttons[0])
        functions.buttonClicker(browser, data.simpleAddition.buttons[1])
        functions.buttonClicker(browser, data.simpleAddition.buttons[2])
        functions.buttonClicker(browser, data.simpleAddition.buttons[3])
        browser.expect.element(selectors['result']).text.to.equal(data.simpleAddition.solution)
    },
```

Now you should be able to refactor the second test.

The next part of this step is to add a new test that will look at the % and +/- keys.  We'll create a test that will just enter a series of numbers, and then click both keys in sequence, to get '-52.21'.  In sequence that means we can click '5', '4', '2', '1', '%', '+/-', '+', '2', '='.  So, let's set up the test data object in `data.js` for that!  I'll name the property `otherButtons` since we're using it to test unchecked buttons.

```js
    otherButtons : {
        buttons: ['5', '4', '2', '1', '%', '+/-', '+', '2', '='],
        solution: '-52.21'
    }
```

We'll add another test to our `tests.js` file, an we'll just name it `'otherButtons'` as well for simplicity's sake.  Use the same format to declare the test that you did for `'2+2=4'`, using `buttonClicker` and `data`.  What the code ought to look like will be included in the code solution, but when all is said and done, and you run your tests (`npm run step4`), your results should look something like this:

<img src="https://raw.githubusercontent.com/devmtn-aj/nightwatch-introduction/solution/readme-assets/step4Results.png"/>

</details>

### Code Solution

<details>

<summary> <code> data.js </code> </summary>

```js
module.exports = {
    simpleAddition : {
        buttons: ['2', '+', '2', '='],
        solution: '4'
    },
    decimalMultiplication : {
        buttons: ['3', '2', '.', '1', '*', '2', '='],
        solution: '64.2'
    },
    otherButtons : {
        buttons: ['5', '4', '2', '1', '%', '+/-', '+', '2', '='],
        solution: '-52.21'
    }
}
```

</details>

<details>

<summary> <code> tests.js </code> </summary>

```js
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
```

</details>

## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2018. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">

# Nightwatch Introduction

## Outline and Overview

We have here a basic calculator app that you will be utilizing to start your test automation career.  NightwatchJS is our automation framework of choice, and step by step you will become familiar with the process of automating tests.  One step at a time we'll build a set of automated tests to cover the requirements and acceptance criteria, which can be found below.  For each step in the project, you will use the corresponding folder in the `nightwatch` folder.

**IMPORTANT** You will run your tests for each test with the command `npm run step#` where # is the number of the step you're on.  (`npm run step1`, `npm run step2`, etc.)

**ALSO IMPORTANT** You need to start the application before running tests, use the command `npm start` to do so.

* **[Setup and Requirements](https://github.com/devmtn-aj/nightwatch-introduction-part1#setup-and-requirements)** - READ.
> Read through the [requirements](https://github.com/devmtn-aj/nightwatch-introduction-part1#requirements) and the acceptance criteria.  These will give context to what you should be looking for when you test.  Click around in the calculator.  Make sure you understand how it works - THEN you can get started in automating tests.

* **[Step 1](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-1)** `nightwatch/step1`
> This will cover creating a test case using NightwatchJS

* **[Step 2](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-2)** `nightwatch/step2`
> This will refactor that test using a separate file for selectors

* **[Step 3](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-3)** `nightwatch/step3`
> We will create a function that will check the UI of the calculator, and another to click buttons

* **[Step 4](https://github.com/devmtn-aj/nightwatch-introduction-part1#step-4)**
> This will introduce a data file.

* **For Step 5** `nightwatch/step5`
> **UNDER CONSTRUCTION** Now we will create a function that will run a full test for us

***

## Setup and Requirements

### Setup

To begin, fork and clone this repository. Once it has finished downloading `cd` into the project root and run `npm i` to fetch the project dependencies. After they are fetched run `npm start` and a browser window will open at `http://localhost:3000` displaying a (fully functional) calculator app.

* You will need to write up a `nightwatchProps.js` file, or copy one from another repository if you already have one.  There are some detailed instructions below on setting one up.

<details>

<summary> <code> nightwatchProps.js </code> </summary>

<br />

In this file we'll store the path to the `testing-resources` folder you created before, as well as the filenames for your `seleniumServer` and `chromedriver`.  **MAKE SURE** the version on your Selenium server matches the version on *your* machine.  Also the resource path needs to be to *your* testing resources folder, not to mine.

```js
module.exports = {
    resourcePath : "/Users/ajlarson/src/testing-resources/",
    seleniumServer: "selenium-server-standalone-3.6.0.jar",
    chromedriver: "chromedriver"
}
```

Note: For Windows computers, you have a different pathing format, so your `resourcePath` will look something like:
```js
    resourcePath : "C:\\Users\\AJ\\src\\testing-resources\\"
```
Note2: Also for Windows, your `chromedriver` listing needs to be `chromedriver.exe`
```js
    chromedriver: "chromedriver.exe"
```

</details>

### The Format

Every step is in a separate folder.  Look in the file explorer of the project, and compare it to the file tree below.  (Some of this is under construction, but this is what your starting file structure in the nightwatch folder will look like, before you've done ANY work)

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
|--etc.
|--etc.
```

</details>

***

### Requirements For The Calculator

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


Now that we have setup out of the way, and you've had a chance to review the app's requirements, we can start in on actually testing it.

***

## Step 1

### Summary

For this assignment, we will forgo the need of formal test plans and test cases in JIRA.  Instead, we should come up with a consistent set of steps we can use in our testing.  The fact that this is a single page application makes things a lot simpler in that regard - one set of steps can fulfill our needs.  We'll take those and write a simple automated test.

### Instructions

* Outline an acceptable set of steps to check whether the calculator can perform calculations provided in a test case
* The test case would consist of the calculation to perform, and the expected result
* Create one simple test in the `step1/tests/tests.js` file.
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

Your `tests.js` file already exists in the `nightwatch/step1/tests` folder, and is configured with its `beforeEach`, `after`, etc.  Now you can add a test to the exported object as a new property, like below:

```js
//In nightwatch, tests are "properties" of the exported "test object", and the name of the test
//is the property's "key" while the test function is the "value".
'2+2=4' : browser => {
	
}
```

Remember, in objects, you have comma separated properties, and each property is comprised of a key and a value.  So in our test object `'2+2=4'` is now the key of a new property, and `browser => {}` is the value of the new property.

Populating this new test ought to be fairly straightforward.  We need to click the buttons, then read the final solution.  Use the **Inspector** tool in Google Chrome to build your selectors.  Remember when building your selector that any CSS selector will work (you can get more info [here](https://www.w3schools.com/cssref/css_selectors.asp) on building selectors), but the ones that follow a `tag[attributeName=attributeValue]` format are the most effective in my experience.  These will help Nightwatch know EXACTLY what element (item in the page) to interact with.  For any test, you need selectors for anything you interact with, as well as anything you need to read/verify.  If I were going to pull selectors from this project, just for the test case listed above, they'll be for the `2`, `4`, `+` and `=` buttons.

<details>

<summary> Selectors for Step 1 </summary>

* `'button[name="2Button"]'`
* `'button[name="addButton"]'`
* `'button[name="equalsButton"]'`
* `'button[name="4Button"]'`
* `'span[name="result"]'`

</details>

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
            .click(selectors['2'])
            .expect.element(selectors['result']).text.to.equal('2')
        browser
            .click(selectors['='])
            .expect.element(selectors['result']).text.to.equal('4')
    }
}
```

</details>

## Step 3

### Summary

An important step to testing any application is to look over its UI.  While it is possible to check EVERYTHING, from physical location, to what CSS attributes an element has, we'll just get into the habit of testing the UI by checking to see that all the elements we expect to be able to interact with are present and accounted for.  

There will be one other function we'll write that will click a button and check the expected result for us.  This can reduce the amount of code we're writing for now.

### Instructions

* Write a function that will look over the UI of the application
* Presence, visibility, and text should be verified
* This function should be executed before any other tests are run
* Then we'll tackle the button clicker

<details>

<summary> Detailed Instructions </summary>

In Step 2 you created a new `supporting` folder for your `selectors.js` file.  You may have named them something else, but that's the same folder we'll use to create a `functions.js` file.  Model it's initial setup after your `selectors.js` file, meaning we'll use the `module.exports` format to export an object that will eventually contain our functions.  I won't be showing you that part of the code specifically in this step, I want you to be able to find it and write it yourself.

Now that we have somewhere to put our new functions, we'll look at the UI checker first.  We should do the following:
1. Check every button for visibility
1. Check every button for the text it ought to be displaying
1. Check the display for visibility and its default text

As I said in the summary, we can do more, but this is a GREAT start for our automated test.  So considering what we want our function to do, we'll need to figure out if we need any inputs/arguments, and if it needs to output/return anything.
1. We'll need the selectors for all of the buttons and the display
   * The good news here is that you gathered these in Step 2.  We can either pass them in when the function is called, or just require them and make them available to the whole functions file.  We'll do the latter.
1. We need the text for each button and the default displayed text
   * Since we're not going to be using these anywhere else, I'm happy to just define them right there in the function for now.
1. We need to pass or fail the UI check
   * The easiest way for us to do this will be to pass our function the `browser` object we've been using with Nightwatch, so that we can write our `expect` statements right in the function and it will pass or fail right there.

Now that we've identified what our function is going to do (check the buttons and display for visibility and displayed text), arguments it needs (the `browser`), and what it returns (nothing in this case), we can get writing.  We'll comment this function before we write it.  There is a format of comment called JSDoc that generates the popup prompt for us to use every time the function is called.  Not only does it explain what the function does, but it makes sure we (or any other developer using our function) knows how to use it correctly.

There are some great [docs on GitHub](https://github.com/shri/JSDoc-Style-Guide) for JSDoc.

To start, we'll open the comment explaining our function with `/** */` - you can see it's like a regular block comment, but has an extra asterisk right at the start.  Inside the opening and closing marks there we can explain what our function does.  Note:  Put this up at the top of the `functions.js` file, outside of the exported object.  We'll add our function to the export a bit later.

```js
/**
 * Looks over the UI to make sure needed elements are visible and displaying the right text.  (Buttons and the display)
 */
```

This will already give a bit more info when anyone wants to use the function in their test, but we'll go a step further.  We can use the `@param` syntax that JSDoc takes advantage of to make sure anyone using the function knows what parameters or arguments are needed... In this case, it's an `{object}`, the `browser`.

```js
/**
 * Looks over the UI to make sure needed elements are visible and displaying the right text.  (Buttons and the display)
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 */
```

For us, this is all we'll need for our JSDoc comment, since there are no other arguments and nothing is being returned.  Now we can start our function.  We're going to make it a `const` named `uiChecker`.  When we're done, we'll add it to the object being exported from the `functions.js` file.

```js
/**
 * Looks over the UI to make sure needed elements are visible and displaying the right text.  (Buttons and the display)
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 */
const uiChecker = browser => {

}
```

Since the function is declared right after we close the JSDoc comment, our code editor knows to match the comment to this function.  Now let's comment out in our function what we need to do so we don't forget.

```js
const uiChecker = browser => {
    //check elements for visibility
    
    //check elements for displayed text

}
```

Oh!  If we're going to check our elements, we need selectors!  We can't forget those.  At the very top of our file (just like we do in our test files) we'll use `require` to grab those selectors.

```js
const selectors = require('./selectors')
```

Because the `selectors.js` file is in the same `supporting` folder as our `functions.js` file, we can use `'./selectors'` for the require, where the `./` is telling the require statement we're just looking in the folder we're already in.

Now that we have our selectors available, we can actually start populating our function with the checks!  There are two ways we could go about this.
1. Check each element manually
1. Loop through all elements in the selectors file

I'm not going to loop through these selectors; where we are going to be defining the text to check for each manually, we'll need to write out a line or two for each anyway.

Let's get to it! `//check elements for visibility` was our first reminder, so let's write a `browser.expect` statment for each element to check that they are all visible!  You can always review the [NightwatchJS API Docs](http://nightwatchjs.org/api) (which I recommend) but I'll tell you this time, it's `browser.expect.element().to.be.visible`.  I'll give you a few examples below to get you started.

```js
    browser.expect.element(selectors['0']).to.be.visible
    browser.expect.element(selectors['1']).to.be.visible
    // and so on through all the buttons until you get to the end
    browser.expect.element(selectors['result']).to.be.visible
```

The next point is to `//check elements for displayed text` - again I'll give you just a few to get started.  This should be familiar  stuff as well (`browser.expect.element().text.to.equal()`).  The thing to remember here is just that we're setting the expected text manually, not pulling it from an external file.

```js
    browser.expect.element(selectors['0']).text.to.equal('0')
    browser.expect.element(selectors['1']).text.to.equal('1')
    // and so on through all the buttons until you get to the end
    browser.expect.element(selectors['result']).text.to.equal('0')
```

With our function checking visibility and the displayed text, we're good to go.  Let's add this to our exported object, and bring it into our test!

Remember how we assigned the function to the constant `uiChecker`?  We're going to make the value of a property on the exported object equal to `uiChecker`.  See below:

```js
module.exports = {
    uiChecker: uiChecker
}
```

Looks kind of funny right?  This is literally saying, "Set the property uiChecker = to some variable or constant that exists already and is named uiChecker."  Saying `billyBob: uiChecker` would work too, and might be a little clearer in some ways, but would be more confusing in others.

Now we can require the functions file in our `tests.js` file.

```js
const functions = require('../supporting/functions')
```

All that's left to do for this function is to create a new test, preferably the first test that runs.  This is so that if the UI is totally broken, we skip the rest of the tests on Nightwatch's current configuration.

We'll create the new test right after the `after` function is declared, and before the first custom test (one with a string name) is declared.

```js
    after : browser => {
        browser.end()
    },
    'UI Check' : browser => functions.uiChecker(browser),
    '2+2=4' : browser => {
```

Now lets run the test using `npm run step3`, and see how we do!

<img src="https://raw.githubusercontent.com/devmtn-aj/nightwatch-introduction/solution/readme-assets/step1Results.png"/>

I'm only showing the very end, but you can see that adding the `UI Check` test, which was really just running our `uiChecker()` function, we added 40 new assertions!  Good work.

With our first function out of the way, we can try one that's a little less striaghtforward.  This is the function that clicks a button and verifies the display.

*What follows for Step 3 is a stretch goal.*  It's pretty intensive compared to the code we've looked at so far.  Feel free to play with it, but I won't be going into too much detail on all of the steps.

<details>

<summary> <code> buttonClicker </code> Stretch Goal </summary>

```js
/**
 * Clicks a button and checks that the resulting display is correct.
 * If the button clicked is a '=', we won't check the result in this function. 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {string} button      the key of the button to click (corresponds to the keys in selectors.js)
 */
```

If you can read the above, you can see that this function will take a browser and a button as inputs.  With no `@return` defined, we know we won't bother returning any information either.

We can fully declare the function, as a constant again, and we'll give it a very creative name...

```js
/**
 * Clicks a button and checks that the resulting display is correct.
 * If the button clicked '=', we won't check the result in this function.
 * As the function won't reset with the test, we should click the clear button before each test
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {string} button      the key of the button to click (corresponds to the keys in selectors.js)
 */
const buttonClicker = (browser, button) => {
    //click the button

    //set the expected display per the requirements, and check it
    
}
```

Before we forget, we'll update our `beforeEach` in `tests.js` to call this function and click the 'AC' button.

```js
    beforeEach : browser => {
        browser.url('http://localhost:3000')
        functions.buttonClicker(browser, 'AC')
    },
```

We can set up the button click portion pretty easily.  Remember how we required the `selectors.js` export into `functions.js` earlier?  We only need to use Nightwatch's `.click()` function for that step.  The important thing here is that we'll use the selector named by the `button` parameter, which is defined as needing to be a key from that file anyway ('0', 'AC', etc).

```js
    //click the button
    browser.click(selectors[button])
```

That takes care of that.  Now to verify the display.  To do this, the first thing we need to do is have something that will track the display between button clicks (since hitting multiple numbers in a row can create a long string of numbers in the display, we can't just check one number at a time).  We'll do this by declaring a variable in the functions file (probably right above the JSDoc for `buttonClicker`) called `currentDisplay` and set it to `'0'`.

```js
// keeps track of the number on the calculator display screen based
// on button clicks
var currentDisplay = '0'
```

Now we'll evaluate the button for each of the values, and set the display appropriately.  We'll use a `switch` statement to do this.  In brief, switch statements take the value in the `()` and looks through the `case X:` statements for a match, running the matching code.
* I've updated the comments for what each `case` should do, you can fill it out and then compare it to the actual below.

```js
    //set the expected display per the requirements, and check it
    switch (button) {
        case 'AC': //clear the display (set to 0)

            break
        case '=': //end the function if '='

            break
        case '%': //if the display is not 0, divide it by 100

            break
        case '+/-': //flip the positive/negative status of the number

            break
        case '*': //if the button is any of these 4, default the screen back to 0
        case '/':
        case '+':
        case '-':

            break
        case '.': //if it's a decimal, check that the number doesn't already contain a . - if it does, leave currentDisplay alone,

            break
        default: //for any regular number, update the display appropriately

            break
    }

```

<details>

<summary> <code> cases in detail </code> </summary>

```js
    //set the expected display per the requirements, and check it
    switch (button) {
        case 'AC': //clear the display (set to 0)
            currentDisplay = '0'
            break
        case '=': //end the function if '='
            return
            break
        case '%': //if the display is not 0, divide it by 100
            if (currentDisplay !== '0')
                currentDisplay = (parseFloat(currentDisplay) / 100).toString()
            break
        case '+/-': //flip the positive/negative status of the number
            if (currentDisplay[0] === '-')
                currentDisplay = currentDisplay.substr(1)
            else
                currentDisplay = '-' + currentDisplay
            break
        case '*': //if the button is any of these 4, default the screen back to 0
        case '/':
        case '+':
        case '-':
            currentDisplay = '0'
            break
        case '.': //if it's a decimal, check that the number doesn't already contain a . - if it does, leave currentDisplay alone,
            if (currentDisplay.indexOf('.') === -1) //if there is no decimal, indexOf returns -1
                currentDisplay += '.'
            break
        default: //for any regular number, update the display appropriately
            if (currentDisplay === '0')
                currentDisplay = button
            else
                currentDisplay += button
            break
    }
```

</details>

All that's left now is to compare our expected `currentDisplay` to what's actually in the display

```js
    //now that currentDisplay has been updated appropraitely (matching the requirements) we can 'expect' the result
    browser.expect.element(selectors['result']).text.to.equal(currentDisplay)
```

The resulting function is a little complicated, but it will certainly work.  Finally, we can add the `buttonClicker` function to our exported object.

```js
module.exports = {
    uiChecker: uiChecker,
    buttonClicker: buttonClicker
}
```

We can now write up a new test, using the `buttonClicker`.

In our `tests.js` file, let's create a new test, 32.1*2=64.2.  This will check decimals, multi-digit, and a couple of operators.  We'll call `buttonClicker` for each button press, and then `expect` the proper result.

```js
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
```

This test gave our function a bit of a workout, but it works!  Run the tests again (`npm run step3`)

<img src="https://raw.githubusercontent.com/devmtn-aj/nightwatch-introduction/solution/readme-assets/step3Results.png"/>

You should get something similar to this!  If not, look back over your functions and test, you can also compare the files to the code solution below.

You can also rework your existing test(s) now with the `buttonClicker` function!

</details>

Good work easing into the world of functions - or diving in if you tackled the `buttonClicker`.  In our next step, we'll start incorporating a data file!

</details>

### Code Solution

*Note:* The solutions incorporate the `buttonClicker` stretch goal.

<details>

<summary> <code> functions.js </code> </summary>

```js
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
 * If the button clicked '=', we won't check the result in this function.
 * As the function won't reset with the test, we should click the clear button before each test
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {string} button      the key of the button to click (corresponds to the keys in selectors.js)
 */
const buttonClicker = (browser, button) => {
    //click the button
    browser.click(selectors[button])
    //set the expected display per the requirements, and check it
    switch (button) {
        case 'AC': //clear the display (set to 0)
            currentDisplay = '0'
            break
        case '=': //end the function if '='
            return
            break
        case '%': //if the display is not 0, divide it by 100
            if (currentDisplay !== '0')
                currentDisplay = (parseFloat(currentDisplay) / 100).toString()
            break
        case '+/-': //flip the positive/negative status of the number
            if (currentDisplay[0] === '-')
                currentDisplay = currentDisplay.substr(1)
            else
                currentDisplay = '-' + currentDisplay
            break
        case '*': //if the button is any of these 4, default the screen back to 0
        case '/':
        case '+':
        case '-':
            currentDisplay = '0'
            break
        case '.': //if it's a decimal, check that the number doesn't already contain a . - if it does, leave currentDisplay alone,
            if (currentDisplay.indexOf('.') === -1) //if there is no decimal, indexOf returns -1
                currentDisplay += '.'
            break
        default: //for any regular number, update the display appropriately
            if (currentDisplay === '0')
                currentDisplay = button
            else
                currentDisplay += button
    }
    //now that currentDisplay has been updated appropraitely (matching the requirements) we can 'expect' the result
    browser.expect.element(selectors['result']).text.to.equal(currentDisplay)
}

module.exports = {
    uiChecker: uiChecker,
    buttonClicker: buttonClicker
}

</details>

<details>

<summary> <code> tests.js </code> </summary>

```js
const selectors = require('../supporting/selectors')
const functions = require('../supporting/functions')

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
        functions.buttonClicker(browser, '2')
        functions.buttonClicker(browser, '+')
        functions.buttonClicker(browser, '2')
        functions.buttonClicker(browser, '=')
        browser.expect.element(selectors['result']).text.to.equal('4')
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
```

</details>

## Step 4

### Overview

This may well be the simplest step of the 5...  We're going to refactor our existing tests and write one new one using a data file.

### Instructions

* Create a file `data.js` in your `step4/supporting` folder
* Require this in the `tests.js` file and use it for all your data (inputs, expected results, etc)
* Ideally you can do this without referring to the detailed instructions
* We haven't tested the '%' button yet, or '+/-', so we'll do that in the new test

<details>

<summary> Detailed Instructions </summary>

In practice, you'll set up and call your `data.js` file the same way you set up and called `selectors.js`...

```js
module.exports = {
    //setting it up in data.js
}
```

```js
//adding it to the filed required in tests.js
const selectors = require('../supporting/selectors')
const functions = require('../supporting/functions')
const data = require('../supporting/data')
```

With this framework, we want to create objects in our `data.js` export that contain all the data for one test.  So, in the files prepped already for Step 4, we have two tests, so we'll need two corresponding objects in the `data.js` exported object.  And while our test names before were easily understood, `'32.1*2=64.2'` is a pain to write over and over again.  We'll name the object for our `2+2=4` function `simpleAddition`, and the other `decimalMultiplication`.

```js
module.exports = {
    simpleAddition : {

    },
    decimalMultiplication : {

    }
}
```

Now, each test data object should track all the inputs and the outputs.  For another app this may be more complicated, but for our simple calculator, we have buttons pressed, and expected results.  We don't need to worry about what the display should look like after each button, because our `buttonClicker` function checks those automatically.  We only need to worry about our final solution.  We can add a `buttons` property whose value will be an array of all the buttons to be clicked, and another `solution` property with the expected solution to the calculation.

```js
module.exports = {
    simpleAddition : {
        buttons: [],
        solution: ''
    },
    decimalMultiplication : {
        buttons: [],
        solution: ''
    }
}
```

With the framework in place, we can popluate the buttons and solution accordingly.

```js
module.exports = {
    simpleAddition : {
        buttons: ['2', '+', '2', '='],
        solution: '4'
    },
    decimalMultiplication : {
        buttons: ['3', '2', '.', '1', '*', '2', '='],
        solution: '64.2'
    }
}
```

Now that we have our data file ready to go for our existing tests, we'll refactor them, so that any time they declared an input or expected result, we'll get it from our data file.

For example, the first line of our first test in `tests.js` is:

```js
        functions.buttonClicker(browser, '2')
```

In this example, `'2'` is the declared input, the button to be clicked.  As it's the first button to be clicked in our first test data object in `data.js`, `simpleAddition`, and we've already required the `data.js` export in our `test.js` file, we can replace the `'2'` in this line like so:

```js
        functions.buttonClicker(browser, data.simpleAddition.buttons[0])
```

`data.simpleAddition.buttons[0]` grabs the `data` constant, which is our `data.js` export, then the `simpleAddition` property, which is our test data object, then the `buttons` property, which is the array of our buttons to click, and then `[0]`, the button click that's first in the list.

For the next line, we'll do the same thing, only calling `.buttons[1]` at the end, then so on until we've clicked all the buttons and we check the result.  The final product for our first test will be this:

```js
    '2+2=4' : browser => {
        //I click all the appropriate buttons and check the display for the appropriate results, per the steps of my test case
        functions.buttonClicker(browser, data.simpleAddition.buttons[0])
        functions.buttonClicker(browser, data.simpleAddition.buttons[1])
        functions.buttonClicker(browser, data.simpleAddition.buttons[2])
        functions.buttonClicker(browser, data.simpleAddition.buttons[3])
        browser.expect.element(selectors['result']).text.to.equal(data.simpleAddition.solution)
    },
```

Now you should be able to refactor the second test.

The next part of this step is to add a new test that will look at the % and +/- keys.  We'll create a test that will just enter a series of numbers, and then click both keys in sequence, to get '-52.21'.  In sequence that means we can click '5', '4', '2', '1', '%', '+/-', '+', '2', '='.  So, let's set up the test data object in `data.js` for that!  I'll name the property `otherButtons` since we're using it to test unchecked buttons.

```js
    otherButtons : {
        buttons: ['5', '4', '2', '1', '%', '+/-', '+', '2', '='],
        solution: '-52.21'
    }
```

We'll add another test to our `tests.js` file, an we'll just name it `'otherButtons'` as well for simplicity's sake.  Use the same format to declare the test that you did for `'2+2=4'`, using `buttonClicker` and `data`.  What the code ought to look like will be included in the code solution, but when all is said and done, and you run your tests (`npm run step4`), your results should look something like this:

<img src="https://raw.githubusercontent.com/devmtn-aj/nightwatch-introduction/solution/readme-assets/step4Results.png"/>

</details>

### Code Solution

<details>

<summary> <code> data.js </code> </summary>

```js
module.exports = {
    simpleAddition : {
        buttons: ['2', '+', '2', '='],
        solution: '4'
    },
    decimalMultiplication : {
        buttons: ['3', '2', '.', '1', '*', '2', '='],
        solution: '64.2'
    },
    otherButtons : {
        buttons: ['5', '4', '2', '1', '%', '+/-', '+', '2', '='],
        solution: '-52.21'
    }
}
```

</details>

<details>

<summary> <code> tests.js </code> </summary>

```js
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
```

</details>

## Step 5

### Overview

Now that we have our data file in place, all the pieces are ready, we can get our tests down to ONE LINE ENTRIES.

### Instructions

* Create a new function called `testRunner` that will take a test data object passed in, and run all of the test steps for it
* Update existing tests to use the new testRunner
* Create new tests, which will entail creating a new test data object, and adding only ONE LINE to the `tests.js` file

<details>

<summary> Detailed Instructions </summary>

In our `functions.js` file, we're going to create one last function, a function that will take the usual `browser` argument, and a `data` argument, which we expect to be one of the test data objects we created in `data.js` back in Step 4.  Let's look at the JSDoc comment for the function:

```js
/**
 * runs a full test based on the test data object passed in
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {object} data        an object passed in containing test data in the expected format
 * { buttons: [], solution: ''}
 */
```

We can even add to the comment that little note of what the data object should be formatted like.  Matches those in our `data.js` file perfectly!

Then we can declare our function, and put comments in denoting what we'll do in each step.

```js
const testRunner = (browser, data) => {
    //click all the buttons

    //check the solution
}
```

It's really straightforward.  Two steps.  Now, 'click all the buttons' might sound a little complex up front, but if you remember that the `buttons` property is an array, there's a nifty little function we can use to make our life easier.

```js
    //click all the buttons
    data.buttons.forEach(button => {

    })
```

`.forEach` is handy because it will take each item in an array, in order, and do something with it in a callback, in this case the `button => {}` function.  We already know what we want to do with each button.  Click it!  And we already have the nice `buttonClicker` function too.

```js
    //click all the buttons
    data.buttons.forEach(button=>{
        buttonClicker(browser, button)
    })
```

All that's left for this function is to `check the solution`, which again, we know pretty well how to do.

```js
    //check the solution
    browser.expect.element(selectors['result']).text.to.equal(data.solution)
```

With that, our `testRunner` function is done!  All that's left is to update our export, and then we can move on.

```js
module.exports = {
    uiChecker: uiChecker,
    buttonClicker: buttonClicker,
    testRunner: testRunner
}
```

Now.  With our function ready to go, we can refactor an existing test.  I'll explain one.  Here's where `2+2=4` stands in our `tests.js` file:

```js
    '2+2=4' : browser => {
        //I click all the appropriate buttons and check the display for the appropriate results, per the steps of my test case
        functions.buttonClicker(browser, data.simpleAddition.buttons[0])
        functions.buttonClicker(browser, data.simpleAddition.buttons[1])
        functions.buttonClicker(browser, data.simpleAddition.buttons[2])
        functions.buttonClicker(browser, data.simpleAddition.buttons[3])
        browser.expect.element(selectors['result']).text.to.equal(data.simpleAddition.solution)
    },
```

Now, our function just needs the `browser` and the data object, or in this test's case, `data.simpleAddition`.  So we can refactor the `2+2=4` test to:

```js
    '2+2=4' : browser => functions.testRunner(browser, data.simpleAddition),
```

Seem too good to be true?  It's not!  Try it out.  Refactor the other tests, try them out.  You should see something like this:

<img src="https://raw.githubusercontent.com/devmtn-aj/nightwatch-introduction/solution/readme-assets/step4Results.png"/>

It really is that simple.  As a side note, you really can just drop your `const selectors...` from the `tests.js` file now too, we use all our selectors in the `functions.js` file.  Now all that `test.js` does is start the browser and keep the tests and data straight.  Nice and neat!

Finally, our last step is going to be adding any and all tests you want to your cycle, just to see things improve!  I'll give you one...

To add to `data.js`

```js
    simpleDivision: {
        buttons: ['3', '5', '/', '7', '='],
        solution: '5'
    }
```

To add to `tests.js`

```js
    '35/7=5' : browser => functions.testRunner(browser, data.simpleDivision)
```

Save it and run it!

If you have exactly the tests I've reproduced, you'll have 70 total assertions passed.  Good work!

Now, start thinking about everything else you could do to test the calculator.  I'll tell you this, there are bugs.  Write tests, run tests, learn!  Keep up the good work!

</details>

### Code Solution

<details>

<summary> <code> data.js </code> </summary>

```js
module.exports = {
    simpleAddition : {
        buttons: ['2', '+', '2', '='],
        solution: '4'
    },
    decimalMultiplication : {
        buttons: ['3', '2', '.', '1', '*', '2', '='],
        solution: '64.2'
    },
    otherButtons : {
        buttons: ['5', '4', '2', '1', '%', '+/-', '+', '2', '='],
        solution: '-52.21'
    },
    simpleDivision: {
        buttons: ['3', '5', '/', '7', '='],
        solution: '5'
    }
}
```

</details>

<details>

<summary> <code> functions.js </code> </summary>

```js
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
 * If the button clicked '=', we won't check the result in this function.
 * As the function won't reset with the test, we should click the clear button before each test
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {string} button      the key of the button to click (corresponds to the keys in selectors.js)
 */
const buttonClicker = (browser, button) => {
    //click the button
    browser.click(selectors[button])
    //set the expected display per the requirements, and check it
    switch (button) {
        case 'AC': //clear the display (set to 0)
            currentDisplay = '0'
            break
        case '=': //end the function if '='
            return
            break
        case '%': //if the display is not 0, divide it by 100
            if (currentDisplay !== '0')
                currentDisplay = (parseFloat(currentDisplay) / 100).toString()
            break
        case '+/-': //flip the positive/negative status of the number
            if (currentDisplay[0] === '-')
                currentDisplay = currentDisplay.substr(1)
            else
                currentDisplay = '-' + currentDisplay
            break
        case '*': //if the button is any of these 4, default the screen back to 0
        case '/':
        case '+':
        case '-':
            currentDisplay = '0'
            break
        case '.': //if it's a decimal, check that the number doesn't already contain a . - if it does, leave currentDisplay alone,
            if (currentDisplay.indexOf('.') === -1) //if there is no decimal, indexOf returns -1
                currentDisplay += '.'
            break
        default: //for any regular number, update the display appropriately
            if (currentDisplay === '0')
                currentDisplay = button
            else
                currentDisplay += button
    }
    //now that currentDisplay has been updated appropraitely (matching the requirements) we can 'expect' the result
    browser.expect.element(selectors['result']).text.to.equal(currentDisplay)
}


/**
 * runs a full test based on the test data object passed in
 * 
 * @param {object} browser     an object provided by NightwatchJS which hooks into the test browser
 * @param {object} data        an object passed in containing test data in the expected format
 * { buttons: [], solution: ''}
 */
const testRunner = (browser, data) => {
    //click all the buttons
    data.buttons.forEach(button=>{
        buttonClicker(browser, button)
    })
    //check the solution
    browser.expect.element(selectors['result']).text.to.equal(data.solution)
}

module.exports = {
    uiChecker: uiChecker,
    buttonClicker: buttonClicker,
    testRunner: testRunner
}
```

</details>

<details>

<summary> <code> tests.js </code> </summary>

```js
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
    '2+2=4' : browser => functions.testRunner(browser, data.simpleAddition),
    '32.1*2=64.2' : browser => functions.testRunner(browser, data.decimalMultiplication),
    'otherButtons' : browser => functions.testRunner(browser, data.otherButtons),
    '35/7=5' : browser => functions.testRunner(browser, data.simpleDivision)
}
```

</details>

## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2018. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
