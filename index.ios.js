import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import digestAuthRequest from 'digest-auth-request/digestAuthRequest';

function digest() {
  var url = 'http://frische-app.de.shopware-hosting.com/api/articles/1';
  var getRequest = new digestAuthRequest('GET', url, 'benni', 'Th2m3XUzQKXIKgfGzT5EhN3sHmV5UVr0uOkyitAZ');

  getRequest.request(function (data) {
    console.log('Data: ', data);
  }, function (error) {
    console.error('Error: ', error);
  })
}
digest();

/*
function apiAuth() {
  var params = {
    method: 'GET',
    headers: {
      'Accept': '*!/!*',
      'Content-Type': 'application/json',
      'Authorization': 'Digest',
      username: 'benni',
      realm: 'Shopware REST-API',
      nonce: 'b60920f74be06df116aa13847b841697',
      uri: '/api/articles/1',
      response: '84e6d53b03122b4407b9a025bf214416',
      opaque: 'd75db7b160fe72d1346d2bd1f67bfd10',
      algorithm: 'MD5',
      qop: 'auth',
      nc: '00000001',
      cnonce: '6801d4e79d66f979'
    },
  };

  fetch('http://frische-app.de.shopware-hosting.com/api/articles/1', params)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log (responseJson);
    })
    .catch((error) => {
      console.error('Fetch fehlgeschlagen: ', error);
    })
}
// apiAuth();
*/

/*
function xhr() {
  // https://forum.shopware.com/discussion/36056/rest-api-verbindung-pure-js
  var client = new XMLHttpRequest();
  client.open(
    'GET',
    'http://frische-app.de.shopware-hosting.com/api/articles',
    true,
    'benni',
    'Th2m3XUzQKXIKgfGzT5EhN3sHmV5UVr0uOkyitAZ'
  );
  client.setRequestHeader(
    'Content-Type: application/json; charset=utf-8'
  );
  client.onreadystatechange = function() {
    alert(this.responseText);
    console.log(this.responseText);
  };
  client.send();
}
// xhr();
*/


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
