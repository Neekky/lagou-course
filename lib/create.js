const ora = require('ora')
const chalk = require('chalk')
const axios = require('axios')
const inquirer = require('inquirer')
const downloadFn = require('download-git-repo')
const { promisify } = require('util')

const promisifyDownloadFn = promisify(downloadFn)

// 工具方法：添加耗时等待
const addLoading = async function (fn) {
  const spinner = ora('正在拉取.......')
  spinner.start()
  try {
    const ret = await fn()
    spinner.succeed('拉取成功！')
    return ret
  } catch (error) {
    console.log(error)
    spinner.fail('拉取失败！')
  }
}

// 工具方法：获取仓库列表
const fetchRepoList = async function () {
  // 查询仓库模板
  const retRepos = await axios('https://api.github.com/users/zcegg/repos').catch(err => {
    throw new Error(err)
  })
  return retRepos.data.map(item => item.name)
}

// 工具方法：获取 tags 列表
const fetchTagsList = async function (repoName) {
  const retTags = await axios(`https://api.github.com/repos/zcegg/${repoName}/tags`).catch(err => {
    throw new Error(err)
  })
  return retTags.data.map(item => item.name)
}

// 工具方法：下载 git 仓库
const downloadRepo = function (params) {

}

module.exports = async function (params) {
  // 获取模板列表
  const repos = await addLoading(fetchRepoList)

  // 交互问题设置
  const repoQuesList = {
    type: 'list',
    name: 'repoName',
    message: '请选择您要下载的模板',
    choices: repos
  }
  const {
    repoName
  } = await inquirer.prompt(repoQuesList)
  console.log(repoName)

  // 获取 tags 列表
  const tags = await addLoading(() => fetchTagsList(repoName))

  if (tags.length) {
    // 存在多个tag
    const {
      tagv
    } = await inquirer.prompt({
      type: 'list',
      name: 'tagv',
      message: '请选择目标版本',
      choices: tags
    })
    console.log('tag版本', tagv)
  } else {
    const {
      isDownload
    } = await inquirer.prompt({
      type: 'confirm',
      name: 'isDownload',
      message: '当前不存在tag是否直接下载模板'
    })

    if (isDownload) {
      console.log('直接下载模板')
    } else {
      return false
    }
  }
}
