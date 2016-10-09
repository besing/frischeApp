'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

// import Node Packages
import digestCall from 'digest-auth-request-rn';
import { digestAuthHeader } from 'digest-auth-request-rn';

// import outsourced files
import appConfig from './app/config';
import appHelpers from './app/helpers';
import styles from './app/styles';
const {url} = appConfig.apiCredentials_test;
const {apiUser} = appConfig.apiCredentials_test;
const {apiKey} = appConfig.apiCredentials_test;


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


// Root Class, the App starts here ---------------------------------------
class frischeApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <GetUrl source="/articles" />
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

class GetUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
    this.getCall = this.getCall.bind(this); // important! (No Autobinding in ES6 Classes)
    this.iterateResults = this.iterateResults.bind(this);
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={[styles.buttonBlock, styles.center]}>
          <TouchableHighlight onPress={this.getCall} style={styles.button} underlayColor={'cornsilk'}>
            <View>
              <TextDefault>Lade Produkte</TextDefault>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.resultsBlock}>
          <View style={{marginBottom: 15}}>
            <TextDefault>{this.state.result ? 'Results:' : 'Klicke auf den Button!'}</TextDefault>
          </View>
          <View>{this.state.result}</View>
        </View>
      </ScrollView>
    )
  }

  getCall() {
    const req = new digestCall('GET', url + this.props.source, apiUser, apiKey);
    req.request((result) => { // changed to ES6-Fat-Arrow-Functions (for preserving 'this' -> no need for binding)

      this.output = result.data;
      // console.log(this.output);

      this.setState({
        result: this.iterateResults()
      });

    }, (error) => {
      console.error(error);
    });
  }

  iterateResults() {
    return (
      this.output.map((item) => {
        return (
          <Text key={item.id}>Name: {item.name}</Text>
        )
     })
    );
  }
}

AppRegistry.registerComponent('frischeApp', () => frischeApp);
