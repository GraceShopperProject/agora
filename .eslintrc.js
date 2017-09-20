module.exports = {
    extends: "airbnb",
    root: true,
    rules: {
        "comma-dangle": [
            "error", "always-multiline", {
                "functions": "ignore"
            }],
        "camelcase": 0,
        "arrow-body-style": 0,
    },
};
