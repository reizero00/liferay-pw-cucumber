const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results",
    reportName: "Playwright Cucumber Report",
    pageTitle: "Boiler Plate Test Report",
    displayDuration: true,
    metadata: {
        browser: {
            name: "Chromium",
            version: "120",
        },
        device: "PC",
        platform: {
            name: "Ubuntu",
            version: "latest",
        },
    },
    customData: {
        title: "Iteration Info",
        data: [
            { label: "Project", value: "Boiler Plate Test" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});