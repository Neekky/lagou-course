define(['./logger-98b2bd18'], function (logger) { 'use strict';

  var fetchApi = endpoint => {
    return fetch(`https://jsonplaceholder.typicode.com${endpoint}`)
      .then(response => response.json())
  };

  fetchApi('/photos?albumId=1').then(data => {
    data.forEach(item => {
      logger.log(item);
    });
  });

});
