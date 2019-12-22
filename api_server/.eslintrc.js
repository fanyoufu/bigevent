module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        // 不使用; 如果使用就报错
        semi: ["error", "never"],
        // 不强制使用驼峰命令名
        camelcase:["off"],
        "no-multiple-empty-lines":["error"]
    }
};