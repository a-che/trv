"use strict";
let { defineSupportCode } = require("cucumber");
const { expect } = require('chai');

defineSupportCode(function({ Given, When, Then, setDefaultTimeout }) {

    setDefaultTimeout(60 * 1000);

    function scrollTo(scrollToElement) {
        return scrollToElement.getLocation().then(function (loc) {
            return drv.executeScript('window.scrollTo(0,arguments[0]);', loc.y);
        });
    };

    Given(/^I reload the page$/, function(callback) {
        browser.refresh().then(callback);
        browser.sleep(20);
    });

    Given(/^I wait until "(.*?)" will be displayed on current page$/, function(text) {
        let EC = protractor.ExpectedConditions;
        let waitingElement = element(by.xpath('//*'));
        return browser.wait(EC.textToBePresentInElement(waitingElement, text), 10000);
    });

    Given(/^I go on "([^"]*)" url$/, (url) => {
        return drv.get(url)
    });

    When(/I sleep$/, () => {
        return browser.sleep(1000);
    });

    Then(/I should see "(.*?)" text on current page$/, (text) => {
        let EC = protractor.ExpectedConditions;
        let waitingElement = element(by.xpath('//*'));
        return drv.wait(EC.textToBePresentInElement(waitingElement, text), 10000)
            .then(() => element(by.xpath('//*[text()[contains(., "'+ text +'")]]')).isDisplayed())
    });

    When(/I scroll to link "(.*?)" and click$/, (text) => {
        let link = element(by.xpath('//a[text()[contains(., "'+ text +'")]]'));
        return scrollTo(link)
            .then(() => link.click())
    });

    When(/I press submit$/, () => {
        //TODO also can find by attribute name or id for example
        // let button = element(by.name("send_message"));
        let button = element(by.xpath("//*[@value='Submit']"));
        return button.click()
    });

    When(/I fill "(.*?)" to "(.*?)"$/, (text, input) => {
        //TODO we can find just by id, but I don't like when phrases like full_name will be used in scenarious, and I decided to user universal xpath for this case:
        // let input = element(by.id(input));
        let el = element(by.xpath("//label[text()='"+ input +"']/following-sibling::*"));
        return el.sendKeys(text)
    });

});
