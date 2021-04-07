const axios = require('axios')
const inquirer = require('inquirer')

module.exports = async function (params) {
  // 1 查询模板仓库信息：利用 axios 完成
  let headers = { "Authorization": "token " + "39901eddb132ee53f6cde578bb959f4421fb8a3f" }
  let { data } = await axios({
    method: 'get',
    url: 'https://api.github.com/users/zcegg/repos',
    headers: headers
  })

  // 2 从结果中遍历出模板仓库名称  repository
  let repos = data.map(item => item.name)

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

  console.log(data)
}