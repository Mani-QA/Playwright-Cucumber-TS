module.exports = {
    default: {
        
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/resources/features/"
        ],
        publish: true,
        dryRun: false,
        require: [
            "src/test/stepDefinitions/*.ts",
            "src/test/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:target/report/cucumber-report.html",
            "json:target/report/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 1
    },
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        publishQuiet: true,
        dryRun: false,
        require: [
            "src/test/stepDefinitions/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:target/report/cucumber-report.html",
            "json:target/report/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 1
    }
}