const ora = require('ora')
const inquirer = require('inquirer')
const axios = require('axios')

module.exports = async function (proName) {

  let spinner = ora('正在拉取......')
  spinner.start()
  // 01：查询仓库名称
  let headers = { "Authorization": "token " + "9e91aa54a6749920ba47e784208f5ec32c16bbe3" }
  let { data } = await axios({
    method: 'get',
    url: 'https://api.github.com/users/zcegg/repos',
    headers: headers
  })

  let repos = data.map(item => item.name)
  spinner.succeed('拉取成功')
  // 02 设置选项
  let quesList = {
    type: 'list',
    name: 'repoName',
    message: '请选择您要下载的模板',
    choices: repos
  }
  let { repoName } = await inquirer.prompt(quesList)
  console.log(repoName)
}