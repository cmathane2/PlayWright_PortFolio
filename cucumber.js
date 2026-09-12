module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "ecommerce-framework/features/*.feature"
        ],
        require: [
            "ecommerce-framework/step-definitions/*.js",
            "ecommerce-framework/support/*.js"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "@cucumber/pretty-formatter",
            "html:cucumber-report.html"
        ],
        parallel: 2
    }
};
