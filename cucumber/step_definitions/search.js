"use strict";
let { defineSupportCode } = require("cucumber");
const { expect } = require('chai');

defineSupportCode(function({ Given, When, Then, setDefaultTimeout }) {

    setDefaultTimeout(60 * 1000);

    When(/^I click to search icon in header$/, () => {
        return drv.findElement(by.className('room5-icons-search')).click()
    });

    When(/^I wait until search input will be displayed on current page$/, () => {
        let EC = protractor.ExpectedConditions;
        let input = element(by.css('input#ajax-search-input'));
        return drv.wait(EC.presenceOf(input), 10000);
    });

    When(/^only "(.*?)" search result should be found$/, (value) => {
        let EC = protractor.ExpectedConditions;
        let waitingElement = element(by.xpath("//*[@class='suggested-post-title center uppercase' and text()='"+ value +" Search Result']"));
        return drv.wait(EC.presenceOf(waitingElement), 10000);
    });

    Given(/^I type "(.*?)" in search input$/, (text) => {
        let input = element(by.id('ajax-search-input'));
        return input.clear()
            .then(() => input.sendKeys(text))
    });

    Given(/^I clear data in search input$/, () => {
        let input = element(by.id('ajax-search-input'));
        return input.clear()
            .then(() => drv.actions().sendKeys(protractor.Key.ENTER).perform())
    });

    When(/^I should see post with title "(.*?)" in search results$/, (value) => {
        let EC = protractor.ExpectedConditions;
        let waitingElement = element(by.xpath("//div[@class='search-results']//div[@class='post-title']//*[text()='"+ value +"']"));
        return drv.wait(EC.presenceOf(waitingElement), 10000);
    });

    Given(/^search results should be reset$/, function() {
        return expect(element(by.xpath('//div[@class="search-results"]')).isPresent()).to.become(false);
    });
});
