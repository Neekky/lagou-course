const axios = require('axios')

module.exports = async function (proName) {
  // 查询：
  // 我们使用 vue-cli 创建一个项目，其实就是下载一个模板回来，请思考我们是从哪个地方下载内容
  // 此时我们自己造了一轮子，可以用于新项目创建，就是把我们常用的项目结构从远端下载回来
  // 所以这里的远端应该是一个共有平台，常见的就是 github 
  // 当前我在远端仓库放置了二个项目模板，一个叫 create-vue create-nm 

  // 01 利用工具来查询信息(axios ,当前是 github )
  // 默认情况下 api 访问有一个次数限制，每小时 60 次
  let headers = { "Authorization": "token " + "9e91aa54a6749920ba47e784208f5ec32c16bbe3" }
  let ret = await axios({
    method: 'get',
    url: 'https://api.github.com/users/zcegg/repos',
    headers: headers
  })
  console.log(ret)

}