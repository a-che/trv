let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

let expect = chai.expect;
chai.should();

    module.exports = function() {
        let Cucumber = require('cucumber');
        let fs = require('fs');
    
            let outputDir = './html_reports/';
        this.After(function(scenario, callback) {
                if (scenario.isFailed()) {
                        browser.takeScreenshot().then(function(base64png) {
                                let decodedImage = new Buffer(base64png, 'base64').toString('binary');
                                scenario.attach(decodedImage, 'image/png');
                                callback();
                            }, function(err) {
                                callback(err);
                            });
                    } else {
                        callback();
                    }
            });
    
            let createHtmlReport = function(sourceJson) {
                let CucumberHtmlReport = require('cucumber-html-report');
                let report = new CucumberHtmlReport({
                        source: sourceJson, // source json
                        dest: outputDir // target directory (will create if not exists)
                });
                report.createReport();
            };
    
            let JsonFormatter = Cucumber.Listener.JsonFormatter();
        JsonFormatter.log = function(string) {
                if (!fs.existsSync(outputDir)) {
                        fs.mkdirSync(outputDir);
                    }
        
                    let targetJson = outputDir + 'cucumber_report.json';
                fs.writeFile(targetJson, string, function(err) {
                        if (err) {
                                console.log('Failed to save cucumber test results to json file.');
                                console.log(err);
                            } else {
                                createHtmlReport(targetJson);
                            }
                    });
            };
    
            this.registerListener(JsonFormatter);
    }; 