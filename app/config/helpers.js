'use strict';

const appHelpers = {
  currentHrs: new Date().getHours(),
  currentMins: new Date().getMinutes(),
};
console.debug('Time of Response: ' + appHelpers.currentHrs + ':' + appHelpers.currentMins);


function digestGet() {
  var url = apiCredentials_dev.url;
  var apiUser = apiCredentials_dev.apiUser;
  var apiKey = apiCredentials_dev.apiKey;
  var getRequest = new digestCall('GET', url, apiUser, apiKey);

  getRequest.request(function (data) {
    console.log('digestGET SUCCESS: ', data);
  }, function (error) {
    console.error('Error: ', error);
  })
} // later: ggf. raus
// digestGet();


function digestPost() {
  var postData = {
    name: 'Kat. via API (' + currentTime + ')',
    parentId: 5
  };

  var postReq = new digestCall('POST',
    'http://frische-app.de.shopware-hosting.com/api/categories', appConfig.apiCredentials_dev.apiUser, appConfig.apiCredentials_dev.apiKey);

  postReq.request(function (data) {
    console.log('digestPOST SUCCESS: ', data);
  }, function (errorCode) {
    console.error('digestPOST ERROR: ', errorCode)
  }, postData);
} // later: ggf. raus
// digestPost();


function digestPut() {
  var putData = {
    name: 'Kat.name geändert (' + currentTime + ')',
  };

  var putReq = new digestCall('PUT',
    'http://frische-app.de.shopware-hosting.com/api/categories/56', appConfig.apiCredentials_dev.apiUser,
    appConfig.apiCredentials_dev.apiKey);

  putReq.request(function (data) {
    console.log('digestPUT SUCCESS: ', data);
  }, function (errorCode) {
    console.error('digestPUT ERROR: ', errorCode)
  }, putData);
} // later: ggf. raus
// digestPut();


export default appHelpers;
