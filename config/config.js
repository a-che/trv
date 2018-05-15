// import * as path from "path";

let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let should = chai.should();
let reporter = require("cucumber-html-reporter");

exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    baseUrl: "http://room5.trivago.com/",
    capabilities: {
        'browserName': 'chrome'
    },
    allScriptsTimeout: 1000000,
    framework: "custom",
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        "../features/*.feature"
    ],
    exclude: "../features/database.feature",
    onPrepare: function() {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        global.expect = chai.expect;
        global.drv = browser.driver;
    },
    cucumberOpts: {
        strict: true,
        format: [
            "json:reports/cucumber-report.json", "node_modules/cucumber-pretty"
        ],
        plugin: ["pretty"],
        require: [
            "../cucumber/step_definitions/*.js",
            "report.js"
        ]
    },

    useAllAngular2AppRoots: true
};
