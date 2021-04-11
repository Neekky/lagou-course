const ora = require("ora");
const chalk = require("chalk");
const axios = require('axios');
const inquirer = require('inquirer')

module.exports = async function (params) {
    const spinner = ora("正在拉取.......");
    spinner.start();
    let ret = await axios('https://api.github.com/users/zcegg/repos').catch(err => console.log(err));
    let repos = ret.data.map(item => item.name)
    console.log(repos);
    spinner.succeed("请求成功！")

    // 02 设置选项
    let quesList = {
        type: 'list',
        name: 'repoName',
        message: '请选择您要下载的模板',
        choices: repos
    }
    let {
        repoName
    } = await inquirer.prompt(quesList)
    console.log(repoName)
}