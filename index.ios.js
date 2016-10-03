import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

// import Node Packages
import digestCall from 'digest-auth-request-rn';
import { digestAuthHeader } from 'digest-auth-request-rn';

// import outsourced files
import appConfig from './app/config';
import appHelpers from './app/helpers';
import styles from './app/styles';
const {url} = appConfig.apiCredentials_dev;
const {apiUser} = appConfig.apiCredentials_dev;
const {apiKey} = appConfig.apiCredentials_dev;


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
}
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
}
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
}
// digestPut();


// Root Class, the App starts here
class frischeApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <GetCallTest/>
      </View>
    );
  }
}

class TextDefault extends Component {
  render() {
    return (
      <Text style={{fontSize: 20}}>
        {this.props.children}
      </Text>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <View style={[styles.headerBlock, styles.center]}>
        <Text style={styles.logoText}>FRISCHEPOST</Text>
      </View>
    )
  }
}

class GetCallTest extends Component {
  // TODO: Constructor?

  componentDidMount() {
  }

  render() {
    return (
      <TouchableHighlight onPress={this.getCall} style={[styles.center, styles.buttonBlock]}>
        <View style={styles.button}>
          <TextDefault>Lade GET Data</TextDefault>
        </View>
      </TouchableHighlight>
    )
  }

  getCall() {
    let req = new digestCall('GET', url + '/articles', apiUser, apiKey);
    req.request(function (data) {
      console.log(data);
    }, function (error) {
      console.error(error);
    })
  }
}

AppRegistry.registerComponent('frischeApp', () => frischeApp);
