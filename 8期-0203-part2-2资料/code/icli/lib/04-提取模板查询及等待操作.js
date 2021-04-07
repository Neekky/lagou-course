const ora = require('ora')
const axios = require('axios')
const inquirer = require('inquirer')

/****************start*****************/
// TODO: 定义工具方法查询模板信息
const fetchRepoInfo = async function () {
  let headers = { "Authorization": "token " + "39901eddb132ee53f6cde578bb959f4421fb8a3f" }
  let { data } = await axios({
    method: 'get',
    url: 'https://api.github.com/users/zcegg/repos',
    headers: headers
  })

  // 2 从结果中遍历出模板仓库名称  repository
  let repos = data.map(item => item.name)

  return repos
}

// TODO: 定义工具方法添加等待效果
const addLoading = async function (fn) {
  let spinner = ora('正在拉取......')
  spinner.start()
  let ret = await fn()
  spinner.succeed('拉取成功')
  return ret
}

// TODO: 定义工具方法查询版本信息

// TODO: 定义工具方法设置交互操作

/****************end*******************/

module.exports = async function (params) {
  // 1 查询模板仓库信息
  let repos = await addLoading(fetchRepoInfo)

  // 3 设置选项交互，查询指定模板的版本号
  let quesList = [
    {
      type: 'list',
      name: 'repoName',
      message: '请选择下载模板',
      choices: repos
    }
  ]

  // 4 处理选项问题
  let repo = await inquirer.prompt(quesList)

  console.log(repo)

}