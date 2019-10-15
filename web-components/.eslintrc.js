module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "class-methods-use-this": 1,
        "no-unused-vars": 1,
        "consistent-return": 1,
        "prefer-const": 1,
        "prefer-template": 1,
        "object-shorthand": 1,
        "no-restricted-globals": 1,
        "no-plusplus": 1,
        "semi": 1,
        "default-case": 1,
        "no-case-declarations": 1
    }
};