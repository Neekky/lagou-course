module.exports = function (actionName, params) {
    console.log(actionName);
    console.log(params);
    try {
        require(`./${actionName}.js`)(params)
    } catch (error) {
        console.log(error);
    }
}