import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

// import Node Packages
import digestAuthRequestRn from 'digest-auth-request-rn';
import { digestAuthHeader } from 'digest-auth-request-rn';

// import outsourced files
import appConfig from './app/config';
import appHelpers from './app/helpers';
import styles from './app/styles';


function digestGet() {
  var url = apiCredentials_dev.url;
  var apiUser = apiCredentials_dev.apiUser;
  var apiKey = apiCredentials_dev.apiKey;
  var getRequest = new digestAuthRequestRn('GET', url, apiUser, apiKey);

  getRequest.request(function (data) {
    console.log('digestGET SUCCESS: ', data);
  }, function (error) {
    console.error('Error: ', error);
  })
}
// digestGet();


function digestPost() {
  var postData = {
    name: 'Kat. via API (' + currentTime + ')',
    parentId: 5
  };

  var postReq = new digestAuthRequestRn('POST',
    'http://frische-app.de.shopware-hosting.com/api/categories', appConfig.apiCredentials_dev.apiUser, appConfig.apiCredentials_dev.apiKey);

  postReq.request(function (data) {
    console.log('digestPOST SUCCESS: ', data);
  }, function (errorCode) {
    console.error('digestPOST ERROR: ', errorCode)
  }, postData);
}
// digestPost();


function digestPut() {
  var putData = {
    name: 'Kat.name geändert (' + currentTime + ')',
  };

  var putReq = new digestAuthRequestRn('PUT',
    'http://frische-app.de.shopware-hosting.com/api/categories/56', appConfig.apiCredentials_dev.apiUser,
    appConfig.apiCredentials_dev.apiKey);

  putReq.request(function (data) {
    console.log('digestPUT SUCCESS: ', data);
  }, function (errorCode) {
    console.error('digestPUT ERROR: ', errorCode)
  }, putData);
}
// digestPut();


class frischeApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          1234
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('frischeApp', () => frischeApp);
