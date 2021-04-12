module.exports = function (actionName, params) {
  try {
    require(`./${actionName}.js`)(params)
  } catch (error) {
    console.log(error)
  }
}
