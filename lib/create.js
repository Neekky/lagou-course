const ora = require('ora')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const inquirer = require('inquirer')
const ncp = require('ncp')
const downloadFn = require('download-git-repo')
const {
  promisify
} = require('util')
const MetalSmith = require('metalsmith')
const { render } = require('consolidate').ejs

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
const downloadRepo = async function (repo, tag) {
  // 定义缓存目录
  const cacheDir = `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}/.tmp`
  // 处理下载API
  let api = `zcegg/${repo}`
  if (tag) {
    api += `#${tag}`
  }
  // 自定义模板下载输出目录
  const dest = path.resolve(cacheDir, repo)

  // todo，补充逻辑，怎么检验缓存和远端是否版本一致
  // todo，版本不一致则应该删除当前缓存，将新的缓存下来
  const flag = fs.existsSync(path.resolve(dest))
  // 执行下载操作

  // 如果没缓存，才下载模板
  if (!flag) {
    const spinner = ora('开始下载模板....')
    spinner.start()
    await promisifyDownloadFn(api, dest)
    spinner.succeed('模板下载成功')
  }

  // 将设置好的缓存目录返回
  return dest
}

module.exports = async function (proname) {
  // todo，校验文件名参数的合法性
  if (proname.length === 0) {
    const spinner = ora()
    spinner.warn('请输入项目名')
    return
  }
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

  // 获取 tags 列表
  const tags = await addLoading(() => fetchTagsList(repoName))
  let dest = ''
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
    dest = await downloadRepo(repoName, tagv)
  } else {
    const {
      isDownload
    } = await inquirer.prompt({
      type: 'confirm',
      name: 'isDownload',
      message: '当前不存在tag是否直接下载模板'
    })

    if (isDownload) {
      dest = await downloadRepo(repoName)
    } else {
      return false
    }
  }

  // 将缓存中的文件复制到执行命令的目录中
  // 判断是否有渲染
  if (fs.existsSync(path.resolve(dest, 'que.js'))) {
    await new Promise((resolve, reject) => {
      // 这里默认要传一个__dirname，不然会报错
      MetalSmith(__dirname)
        .source(dest)
        .destination(path.resolve(...proname))
        .use(async (files, metal, done) => {
          // files就是需要渲染的模板目录下的所有类型的文件
          // 加载当前存放问题的模块 que.js
          const quesArr = require(path.resolve(dest, 'que.js'))
          // 根据自定义问题数据，来定义问题
          const answers = await inquirer.prompt(quesArr)
          // 当前answers是传递过来的参数，需要在下一个use中进行使用
          // 就可以利用metal，它类似一个容器，可以对数据进行管理
          const meta = metal.metadata()
          Object.assign(meta, answers)

          // 这步完成后就不用que.js文件了
          delete files['que.js']
          done()
        })
        .use((files, metal, done) => {
          // 获取上一个use中拿到的答案
          const data = metal.metadata()
          // 找到需要渲染数据的具体文件，.js、.json
          // 将buffer转为字符串，然后根据字符串替换实现渲染
          Reflect.ownKeys(files).forEach(async file => {
            if (/\.(js|json)$/.test(file)) {
              let content = files[file].contents.toString()
              if (content.includes('<%')) {
                content = await render(content, data)
                files[file].contents = Buffer.from(content)
              }
            }
          })
          done()
        })
        .build((err) => {
          err ? reject(err) : resolve()
        })
    })
  } else {
    // 不需要渲染，直接拷贝
    ncp(dest, ...proname)
  }
}
