// 导入模块成员
import _ from "lodash-es";
import {
    log
} from './logger';
import messages from './messages';
// import {
//     name,
//     version
// } from "../package.json";

// import cjs from "./cjs-module";

// 使用模块成员
const msg = messages.hi;

log(msg);

// console.log(name);
// console.log(version);
console.log(_.camelCase('hello world'));
// console.log(cjs);

import("./logger").then(({log}) => {
    log("1231232131")
})