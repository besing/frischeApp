import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import digestAuthRequestRn from 'digest-auth-request-rn';


// Auth via NPM DigestAuthRequest (forked)
function digest() {
  var url = 'http://frische-app.de.shopware-hosting.com/api/articles';
  var apiUser = 'benni';
  var apiKey = 'Th2m3XUzQKXIKgfGzT5EhN3sHmV5UVr0uOkyitAZ';
  var getRequest = new digestAuthRequestRn('GET', url, apiUser, apiKey);

  getRequest.request(function (data) {
    console.log('Auth Data: ', data);
  }, function (error) {
    console.error('Error: ', error);
  })
}
digest();


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
