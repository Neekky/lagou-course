module.exports = function (params) {
  /**
   * 步骤梳理：
   *  01 发送请求，获取仓库信息
   *  02 依据仓库现有内容提供下载选项： 模板名称  模板版本号 
   *  03 将指定内容下载至本地：提供缓存操作
   *  04 判断是否需要数据渲染：
   *    需要则先渲染数据，然后再拷贝至当前项目
   *    不需要则直接拷贝至当前项目 
   */
}