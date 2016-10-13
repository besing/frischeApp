'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import digestCall from 'digest-auth-request-rn';
import { digestAuthHeader } from 'digest-auth-request-rn'; // later: ggf. rausschmeißen falls unbenutzt

import appConfig from '../config/settings';
import appHelpers from '../config/helpers';
import globalStyles from '../config/styles';

import Header from '../components/Header';
import TextDefault from '../components/TextDefault';

const {url} = appConfig.apiCredentials_test;
const {apiUser} = appConfig.apiCredentials_test;
const {apiKey} = appConfig.apiCredentials_test;


export default class GetUrl extends Component {
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
        <View style={[globalStyles.buttonBlock, globalStyles.center]}>
          <TouchableHighlight onPress={this.getCall} style={globalStyles.button} underlayColor={'cornsilk'}>
            <View>
              <TextDefault>Lade Produkte</TextDefault>
            </View>
          </TouchableHighlight>
        </View>
        <View style={globalStyles.resultsBlock}>
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
