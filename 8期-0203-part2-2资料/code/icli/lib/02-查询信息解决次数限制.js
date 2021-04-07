const axios = require('axios')

module.exports = async function (params) {
  // 1 查询模板仓库信息：利用 axios 完成
  let headers = { "Authorization": "token " + "39901eddb132ee53f6cde578bb959f4421fb8a3f" }
  let { data } = await axios({
    method: 'get',
    url: 'https://api.github.com/users/zcegg/repos',
    headers: headers
  })

  // 2 从结果中遍历出模板仓库名称
  let props = data.map(item => item.name)

  console.log(props)
}