import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import digestAuthRequestRn from 'digest-auth-request-rn';
import { digestAuthHeader } from 'digest-auth-request-rn';

const apiCredentials_test = {
  url: 'http://138.68.72.48/api/articles',
  apiUser: 'Benni',
  apiKey: 'Z1ZpvndKil5qq1xImrUZ0EAvTFehSFaQndTP6SVU'
};

const apiCredentials_dev = { // LATER?: Auth on /api, not on /api/... (e.g. /articles)
  url: 'http://frische-app.de.shopware-hosting.com/api/articles',
  apiUser: 'benni',
  apiKey: 'Th2m3XUzQKXIKgfGzT5EhN3sHmV5UVr0uOkyitAZ'
};

// Current Time Logging for info
const currentHrs = new Date().getHours();
const currentMins = new Date().getMinutes();
const currentTime = currentHrs + ':' + currentMins + ' Uhr';
console.debug('Time of Response: ' + currentTime);

/*
function digestGet() {
  var url = apiCredentials_dev.url;
  var apiUser = apiCredentials_dev.apiUser;
  var apiKey = apiCredentials_dev.apiKey;
  var getRequest = new digestAuthRequestRn('GET', url, apiUser, apiKey);

  getRequest.request(function (data) {
    console.log('Auth Data: ', data);

    function getCall() {
      fetch(apiCredentials_dev.url, { method: 'GET', headers: {'Authorization': digestAuthHeader} })
     .then((response) => response.json())
     .then((responseData) => {
       console.log('GET Product #3 (name): ', responseData.data[2].name);
     })
    }
    // getCall();

    function putCall() {
      fetch(apiCredentials_dev.url, {
        method: 'PUT',
        headers: {'Authorization': digestAuthHeader, 'Content-type': 'application/json'},
        body: JSON.stringify({
          name: 'Carbon D: Api-PUT-Updated!'
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('PUT Response: ', responseData);
      })
    }
    // putCall();

    function postCall() {
      fetch('http://frische-app.de.shopware-hosting.com/api/categories', {
        method: 'POST',
        headers: {'Authorization': digestAuthHeader, 'Content-type': 'application/json'},
        body: JSON.stringify({
          name: 'Kategorie via API #2',
          parentId: 5
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('POST Response: ', responseData);
      })
    }
    postCall();

  }, function (error) {
    console.error('Error: ', error);
  })
}
// digestGet();
*/

/*
function digestPost() {
  var postData = {
    name: 'Kat. via API (' + currentTime + ')',
    parentId: 5
  };

  var postReq = new digestAuthRequestRn('POST',
    'http://frische-app.de.shopware-hosting.com/api/categories', apiCredentials_dev.apiUser,
    apiCredentials_dev.apiKey);

  postReq.request(function (data) {
    console.log('digestPost SUCCESS: ', data);

/!*
    function getCallFromPostAuth() {
      fetch('http://frische-app.de.shopware-hosting.com/api/categories', { method: 'GET', headers: {'Authorization': digestAuthHeader} })
        .then((response) => response.json())
        .then((responseData) => {
          console.log('GET Result: ', responseData);
        })
    }
    // getCallFromPostAuth();
*!/

  }, function (errorCode) {
    console.error('digestPost ERROR: ', errorCode)
  }, postData);
}
digestPost();
*/


function digestPut() {
  var putData = {
    name: 'Kat.name geändert (' + currentTime + ')',
  };

  var putReq = new digestAuthRequestRn('PUT',
    'http://frische-app.de.shopware-hosting.com/api/categories/56', apiCredentials_dev.apiUser,
    apiCredentials_dev.apiKey);

  putReq.request(function (data) {
    console.log('digestPut SUCCESS: ', data);
  }, function (errorCode) {
    console.error('digestPut ERROR: ', errorCode)
  }, putData);
}
digestPut();



// TODO: Erst andere Calls ausführen, wenn authentifiziert! (React Lifecycle Methods?)



class frischeApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          1234
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('frischeApp', () => frischeApp);
