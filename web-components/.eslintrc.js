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
        "prefer-template": 0,
        "object-shorthand": 0,
        "no-restricted-globals": 0,
        "no-plusplus": 0,
        "semi": 0,
        "default-case": 0,
        "no-case-declarations": 0
    }
};